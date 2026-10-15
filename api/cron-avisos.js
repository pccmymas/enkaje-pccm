// api/cron-avisos.js — corre una vez al día (Vercel Cron).
// Variables: CRON_SECRET, RESEND_API_KEY, SUPABASE_SERVICE_ROLE_KEY (opcionales: ADMIN_EMAIL, MAIL_FROM)
// 1) recordatorio al cliente a las 48 h si tiene cotizaciones sin elegir
// 2) caduca la solicitud a los 7 días (deja de verse en Oportunidades; el proyecto queda guardado)
// 3) resumen para el admin de solicitudes con más de 48 h sin ninguna cotización
const SB = process.env.SUPABASE_URL || "https://iucoggyualkyojmmgael.supabase.co";
const SR = process.env.SUPABASE_SERVICE_ROLE_KEY;
const RESEND = process.env.RESEND_API_KEY;
const FROM = process.env.MAIL_FROM || "EnKaje Pro <avisos@mail.enkajepro.com>";
const ADMIN = process.env.ADMIN_EMAIL || "pccmymas@gmail.com";
// Las llaves nuevas (sb_secret_...) no son JWT: van solo en apikey. Las viejas (eyJ...) van en las dos.
const H = (SR || "").startsWith("sb_") ? { apikey: SR, "Content-Type": "application/json" } : { apikey: SR, Authorization: `Bearer ${SR}`, "Content-Type": "application/json" };
const rest = async (path, opts = {}) => {
  const r = await fetch(`${SB}/rest/v1/${path}`, { ...opts, headers: { ...H, ...(opts.headers || {}) } });
  const t = await r.text(); try { return JSON.parse(t); } catch { return t; }
};
const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
async function claim(clave) {
  const r = await rest("avisos_enviados?on_conflict=clave", { method: "POST", headers: { Prefer: "resolution=ignore-duplicates,return=representation" }, body: JSON.stringify({ clave }) });
  return Array.isArray(r) && r.length > 0;
}
const aTexto = h => String(h)
  .replace(/<br\s*\/?>/gi, "\n").replace(/<\/(p|h2|li|div)>/gi, "\n")
  .replace(/<a [^>]*href="([^"]+)"[^>]*>([^<]*)<\/a>/gi, "$2: $1")
  .replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"')
  .replace(/\n{3,}/g, "\n\n").trim();
async function enviar(to, subject, html) {
  if (!RESEND || !to) return false;
  const r = await fetch("https://api.resend.com/emails", { method: "POST", headers: { Authorization: `Bearer ${RESEND}`, "Content-Type": "application/json" }, body: JSON.stringify({ from: FROM, to: [to], reply_to: "hola@enkajepro.com", subject, html, text: aTexto(html) }) });
  if (!r.ok) console.error("resend", r.status, await r.text());
  return r.ok;
}
const wrap = (t, b, btn) => `<div style="font-family:-apple-system,Segoe UI,Arial,sans-serif;background:#f6f3ec;padding:24px"><div style="max-width:520px;margin:0 auto;background:#fff;border-radius:14px;overflow:hidden;border:1px solid #eadfc5"><div style="background:#12100a;padding:18px 24px;color:#d4af37;font-size:20px;font-weight:800;letter-spacing:1px">EnKaje <span style="font-size:12px;color:#c8a97a;letter-spacing:3px">PRO</span></div><div style="padding:24px;color:#222;font-size:15px;line-height:1.6"><h2 style="margin:0 0 12px;font-size:20px;color:#12100a">${t}</h2>${b}${btn ? `<p style="margin:24px 0 8px"><a href="https://enkajepro.com/app" style="background:#d4af37;color:#000;text-decoration:none;font-weight:800;padding:12px 22px;border-radius:10px;display:inline-block">${btn}</a></p>` : ""}</div><div style="padding:14px 24px;background:#faf7ef;color:#888;font-size:12px">EnKaje Pro · Monterrey · ¿Dudas? Solo responde este correo.</div></div></div>`;

export default async function handler(req, res) {
  if (!process.env.CRON_SECRET || req.headers["authorization"] !== `Bearer ${process.env.CRON_SECRET}`) return res.status(401).json({ error: "No autorizado" });
  if (!SR) return res.status(200).json({ ok: false, motivo: "falta SUPABASE_SERVICE_ROLE_KEY" });
  const out = { recordatorios: 0, caducadas: 0, sinCotizar: 0 };
  try {
    const ps = await rest("proyectos?etapa_seguimiento=eq.solicitud&or=(taller_email.is.null,taller_email.eq.)&select=enkaje,user_email,nombre,tipo_proyecto,zona,created_at");
    const cots = await rest("cotizaciones?select=proyecto_enkaje");
    const cuenta = {}; for (const c of (Array.isArray(cots) ? cots : [])) cuenta[String(c.proyecto_enkaje)] = (cuenta[String(c.proyecto_enkaje)] || 0) + 1;
    const excepciones = [];
    for (const p of (Array.isArray(ps) ? ps : [])) {
      const horas = (Date.now() - new Date(p.created_at).getTime()) / 36e5;
      const n = cuenta[String(p.enkaje)] || 0;
      const que = `${p.tipo_proyecto || "proyecto"} en ${p.zona || "tu zona"}`;
      if (horas >= 24 * 7) {
        await rest(`proyectos?enkaje=eq.${encodeURIComponent(p.enkaje)}`, { method: "PATCH", headers: { Prefer: "return=minimal" }, body: JSON.stringify({ etapa_seguimiento: "guardado" }) });
        out.caducadas++;
        if (await claim(`cad:${p.enkaje}`)) await enviar(p.user_email, "Tu solicitud de cotización se cerró", wrap("Tu solicitud se cerró", `<p>Pasaron 7 días y tu solicitud de <b>${esc(que)}</b> se cerró. Tu proyecto sigue guardado: puedes volver a solicitar cotización cuando quieras.</p>`, "Ver mi proyecto"));
      } else if (horas >= 48 && n > 0) {
        if (await claim(`rec:${p.enkaje}`)) { if (await enviar(p.user_email, `Tienes ${n} cotización(es) esperando`, wrap("Tus cotizaciones te esperan", `<p>Tu solicitud de <b>${esc(que)}</b> ya tiene <b>${n}</b> cotización(es). Compáralas y elige con qué taller quieres trabajar.</p>`, "Ver cotizaciones"))) out.recordatorios++; }
      } else if (horas >= 48 && n === 0) {
        excepciones.push(`${que} · ${new Date(p.created_at).toLocaleDateString("es-MX")}`);
      }
    }
    out.sinCotizar = excepciones.length;
    if (excepciones.length && (await claim(`exc:${new Date().toISOString().slice(0, 10)}`)))
      await enviar(ADMIN, `${excepciones.length} solicitud(es) sin cotización por más de 48 h`, wrap("Solicitudes sin cotización", `<ul>${excepciones.map(e => `<li>${esc(e)}</li>`).join("")}</ul><p>Revisa si faltan talleres en esa zona o tipo de proyecto.</p>`, "Abrir panel"));
    return res.status(200).json({ ok: true, ...out });
  } catch (e) { console.error(e); return res.status(200).json({ ok: false, error: String(e.message || e) }); }
}
