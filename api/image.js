export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  try {
    let body = req.body;
    if (typeof body === "string") body = JSON.parse(body);
    const promptText = (body?.prompt || "modern kitchen").slice(0, 900);
    const imageBase64 = body?.image;

    if (imageBase64) {
      const imgBuffer = Buffer.from(imageBase64, "base64");
      const boundary = "----FormBoundary" + Math.random().toString(36).slice(2);
      const promptFull = `Transform this exact kitchen/room keeping the same layout and dimensions. Apply this style: ${promptText}. Keep exact same spatial layout, same appliances positions. Photorealistic render, high-end Monterrey Mexico home, dramatic lighting, 4K quality.`;

      const parts = [];
      // model
      parts.push(`--${boundary}\r\nContent-Disposition: form-data; name="model"\r\n\r\ngpt-image-1`);
      // prompt
      parts.push(`--${boundary}\r\nContent-Disposition: form-data; name="prompt"\r\n\r\n${promptFull}`);
      // n
      parts.push(`--${boundary}\r\nContent-Disposition: form-data; name="n"\r\n\r\n1`);
      // size
      parts.push(`--${boundary}\r\nContent-Disposition: form-data; name="size"\r\n\r\n1024x1024`);

      const beforeFile = Buffer.from(`--${boundary}\r\nContent-Disposition: form-data; name="image[]"; filename="room.png"\r\nContent-Type: image/png\r\n\r\n`, "utf-8");
      const afterFile = Buffer.from(`\r\n--${boundary}--\r\n`, "utf-8");
      const textParts = Buffer.from(parts.join("\r\n") + "\r\n", "utf-8");

      const formBody = Buffer.concat([textParts, beforeFile, imgBuffer, afterFile]);

      const response = await fetch("https://api.openai.com/v1/images/edits", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": `multipart/form-data; boundary=${boundary}`,
          "Content-Length": formBody.length,
        },
        body: formBody
      });
      const data = await response.json();
      return res.status(200).json({ status: response.status, data });
    } else {
      const prompt = `Photorealistic interior design render: ${promptText}. Exact colors and materials as specified. Professional architectural visualization, dramatic lighting, high-end Monterrey Mexico home, 4K quality.`;
      const response = await fetch("https://api.openai.com/v1/images/generations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-image-1",
          prompt,
          n: 1,
          size: "1024x1024",
          output_format: "png",
        }),
      });
      const data = await response.json();
      return res.status(200).json({ status: response.status, data });
    }
  } catch (err) {
    return res.status(200).json({ error: err.message });
  }
}
