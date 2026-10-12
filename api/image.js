const SUPABASE_URL = "https://iucoggyualkyojmmgael.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml1Y29nZ3l1YWxreW9qbW1nYWVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAwMTMxOTMsImV4cCI6MjA5NTU4OTE5M30.QNU604KcLaSxXxoZaxmVbt-sf-aFDTjrVoTR4K-wy5c";

// Llama una función de Supabase (RPC). Devuelve true/false o lanza error.
async function rpc(nombre, token, args) {
  const r = await fetch(`${SUPABASE_URL}/rest/v1/rpc/${nombre}`, {
    method: "POST",
    headers: {
      "apikey": SUPABASE_KEY,
      "Authorization": `Bearer ${token || SUPABASE_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(args || {}),
  });
  if (!r.ok) throw new Error("rpc " + nombre + " " + r.status);
  return await r.json();
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    let body = req.body;
    if (typeof body === "string") body = JSON.parse(body);
    const prompt = (body?.prompt || "modern kitchen interior").slice(0, 4000);
    const imageBase64 = body?.image;

    // ---- LÍMITE DE RENDERS (se cuenta en el servidor, no en el navegador) ----
    const auth = req.headers["authorization"] || "";
    const token = auth.startsWith("Bearer ") ? auth.slice(7).trim() : "";
    let permitido = false;
    try {
      if (token && token !== SUPABASE_KEY) {
        // Usuario con sesión: 3 al mes + extras por solicitudes enviadas
        permitido = (await rpc("usar_render", token)) === true;
      } else {
        // Sin sesión: tope diario por dirección IP
        const ip = String(req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "")
          .split(",")[0].trim();
        permitido = (await rpc("usar_render_anon", null, { p_ip: ip })) === true;
      }
    } catch (e) {
      return res.status(200).json({ error: { message: "No pudimos verificar tu límite de renders. Intenta de nuevo en un momento." } });
    }
    if (!permitido) {
      return res.status(200).json({
        limite: true,
        error: { message: token
          ? "Ya usaste tus renders de este mes. Envía una solicitud de cotización a los talleres y ganas 2 renders más."
          : "Ya usaste tus renders gratis de hoy. Crea una cuenta gratis para generar más." },
      });
    }
    // --------------------------------------------------------------------------

    if (imageBase64) {
      // CON FOTO — usar edits para transformar la imagen real
      const imageBuffer = Buffer.from(imageBase64, "base64");

      // FormData y Blob vienen integrados en Node (no hace falta importarlos)
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
