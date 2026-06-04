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
    const prompt = `Photorealistic interior design render. ${promptText}. Exact colors and materials as specified, no substitutions. Professional architectural visualization, dramatic lighting, high-end Monterrey Mexico home, 4K quality, ultra detailed.`;
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
  } catch (err) {
    return res.status(200).json({ error: err.message });
  }
}
