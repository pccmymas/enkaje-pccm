export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    let body = req.body;
    if (typeof body === "string") body = JSON.parse(body);
    const prompt = (body?.prompt || "modern kitchen interior").slice(0, 4000);
    const imageBase64 = body?.image;

    if (imageBase64) {
      // CON FOTO — usar edits para transformar la imagen real
      const imageBuffer = Buffer.from(imageBase64, "base64");
      const FormData = (await import("formdata-node")).FormData;
      const { Blob } = await import("buffer");

      const formData = new FormData();
      formData.append("model", "gpt-image-1");
      formData.append("prompt", prompt);
      formData.append("n", "1");
      formData.append("size", "1024x1024");
      formData.append("image", new Blob([imageBuffer], { type: "image/jpeg" }), "room.jpg");

      const response = await fetch("https://api.openai.com/v1/images/edits", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: formData,
      });
      const data = await response.json();
      return res.status(200).json({ status: response.status, data });

    } else {
      // SIN FOTO — generations normal
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
