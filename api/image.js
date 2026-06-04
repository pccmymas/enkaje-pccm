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
      // Image-to-image: usar la foto del cliente como referencia
      const { default: FormData } = await import("form-data");
      const imgBuffer = Buffer.from(imageBase64, "base64");
      const form = new FormData();
      form.append("model", "gpt-image-1");
      form.append("prompt", `Transform this space into a photorealistic interior design render: ${promptText}. Keep the exact same room dimensions and layout. Apply the specified style, colors and materials precisely. High-end Monterrey Mexico home, dramatic lighting, 4K quality.`);
      form.append("n", "1");
      form.append("size", "1024x1024");
      form.append("image[]", imgBuffer, { filename: "room.png", contentType: "image/png" });

      const response = await fetch("https://api.openai.com/v1/images/edits", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
          ...form.getHeaders()
        },
        body: form
      });
      const data = await response.json();
      return res.status(200).json({ status: response.status, data });
    } else {
      // Text-to-image normal
      const prompt = `Interior design photorealistic render: ${promptText}`;
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
