export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    let body = req.body;
    if (typeof body === "string") body = JSON.parse(body);
    const promptOriginal = body?.prompt || "cocina moderna";
    // DALL-E 2 tiene limite de 1000 chars
    const prompt = `Interior design render: ${promptOriginal}`.slice(0, 900);

    const response = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "dall-e-2",
        prompt,
        n: 1,
        size: "1024x1024",
      }),
    });

    const data = await response.json();
    // Devolver siempre 200 para ver el error completo
    return res.status(200).json({ status: response.status, data });
  } catch (err) {
    return res.status(200).json({ error: err.message });
  }
}
