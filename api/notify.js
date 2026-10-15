// api/notify.js — avisos por correo con Resend.
// Variables en Vercel: RESEND_API_KEY, SUPABASE_SERVICE_ROLE_KEY  (opcionales: MAIL_FROM, SUPABASE_URL)
// El navegador solo manda {evento, enkaje} + su token. Los destinatarios y los datos se calculan aquí,
// así nadie puede mandar correos a quien quiera ni leer contactos.
const SB = process.env.SUPABASE_URL || "https://iucoggyualkyojmmgael.supabase.co";
const SR = process.env.SUPABASE_SERVICE_ROLE_KEY;
const RESEND = process.env.RESEND_API_KEY;
const FROM = process.env.MAIL_FROM || "EnKaje Pro <avisos@mail.enkajepro.com>";
const APP = "https://enkajepro.com/app";
const ADMIN = String(process.env.ADMIN_EMAIL || "pccmymas@gmail.com").toLowerCase();

// Las llaves nuevas (sb_secret_...) no son JWT: van solo en apikey. Las viejas (eyJ...) van en las dos.
const H = (SR || "").startsWith("sb_") ? { apikey: SR, "Content-Type": "application/json" } : { apikey: SR, Authorization: `Bearer ${SR}`, "Content-Type": "application/json" };
const rest = async (path, opts = {}) => {
  const r = await fetch(`${SB}/rest/v1/${path}`, { ...opts, headers: { ...H, ...(opts.headers || {}) } });
  const t = await r.text(); try { return JSON.parse(t); } catch { return t; }
};
const norm = s => String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").trim().toLowerCase();
const lista = s => String(s || "").split(",").map(norm).filter(Boolean);
const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const money = n => "$" + Number(n).toLocaleString("es-MX");
const fecha = iso => new Date(iso).toLocaleString("es-MX", { timeZone: "America/Monterrey", weekday: "long", day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" });

// Evita mandar dos veces el mismo aviso
async function claim(clave) {
  const r = await rest("avisos_enviados?on_conflict=clave", {
    method: "POST", headers: { Prefer: "resolution=ignore-duplicates,return=representation" }, body: JSON.stringify({ clave }),
  });
  return Array.isArray(r) && r.length > 0;
}

function plantilla(titulo, cuerpoHtml, boton) {
  return `<div style="font-family:-apple-system,Segoe UI,Arial,sans-serif;background:#f6f3ec;padding:24px">
  <div style="max-width:520px;margin:0 auto;background:#fff;border-radius:14px;overflow:hidden;border:1px solid #eadfc5">
    <div style="background:#12100a;padding:18px 24px;color:#d4af37;font-size:20px;font-weight:800;letter-spacing:1px">EnKaje <span style="font-size:12px;color:#c8a97a;letter-spacing:3px">PRO</span></div>
    <div style="padding:24px;color:#222;font-size:15px;line-height:1.6">
      <h2 style="margin:0 0 12px;font-size:20px;color:#12100a">${titulo}</h2>
      ${cuerpoHtml}
      ${boton ? `<p style="margin:24px 0 8px"><a href="${boton[1]}" style="background:#d4af37;color:#000;text-decoration:none;font-weight:800;padding:12px 22px;border-radius:10px;display:inline-block">${esc(boton[0])}</a></p>` : ""}
    </div>
    <div style="padding:14px 24px;background:#faf7ef;color:#888;font-size:12px">EnKaje Pro · Monterrey · ¿Dudas? Solo responde este correo.</div>
  </div></div>`;
}

const aTexto = h => String(h)
  .replace(/<br\s*\/?>/gi, "\n").replace(/<\/(p|h2|li|div)>/gi, "\n")
  .replace(/<a [^>]*href="([^"]+)"[^>]*>([^<]*)<\/a>/gi, "$2: $1")
  .replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"')
  .replace(/\n{3,}/g, "\n\n").trim();

async function enviar(to, subject, html) {
  if (!RESEND || !to) return false;
  const r = await fetch("https://api.resend.com/emails", {
    method: "POST", headers: { Authorization: `Bearer ${RESEND}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: FROM, to: [to], reply_to: "hola@enkajepro.com", subject, html, text: aTexto(html) }),
  });
  if (!r.ok) console.error("resend", r.status, await r.text());
  return r.ok;
}

async function usuario(token) {
  const r = await fetch(`${SB}/auth/v1/user`, { headers: { apikey: SR, Authorization: `Bearer ${token}` } });
  if (!r.ok) return null;
  const u = await r.json();
  return u?.email ? { email: String(u.email).toLowerCase(), meta: u.user_metadata || {} } : null;
}

const TIPOS = { cocina: "cocina", closet: "closet", puerta: "puerta", mueble: "mueble", panel: "panel", bano: "baño" };

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  if (!SR) return res.status(200).json({ ok: false, motivo: "falta SUPABASE_SERVICE_ROLE_KEY" });

  try {
    let body = req.body; if (typeof body === "string") body = JSON.parse(body);
    const evento = String(body?.evento || "");
    // ---- Registro de taller (público): solo avisa si ese correo tiene una solicitud pendiente reciente ----
    if (evento === "taller_registrado") {
      const correo = String(body?.email || "").trim().toLowerCase();
      const r = await rest(`talleres_membresia?email=eq.${encodeURIComponent(correo)}&estado=eq.pendiente&select=*&limit=1`);
      const t = Array.isArray(r) ? r[0] : null;
      if (!t || Date.now() - new Date(t.created_at).getTime() > 30 * 60 * 1000) return res.status(200).json({ ok: false, motivo: "no aplica" });
      let n = 0;
      if (await claim(`reg:${correo}`)) {
        if (await enviar(correo, "Recibimos tu registro en EnKaje Pro",
          plantilla("Recibimos tu registro", `<p>Hola ${esc(t.representante || "")}, gracias por registrar <b>${esc(t.nombre)}</b> en EnKaje Pro.</p><p>Tu solicitud está <b>en evaluación</b>. Nos pondremos en contacto contigo por teléfono o WhatsApp para agendar una <b>visita o videollamada</b> de verificación. No necesitas hacer nada más por ahora.</p><p>Cuando quedes aprobado te avisaremos por este mismo medio y podrás entrar con tu correo y contraseña.</p>`, null))) n++;
        const lineas = [["Taller", t.nombre], ["Representante", t.representante], ["Teléfono", t.telefono], ["Correo", t.email], ["Municipio", t.municipio], ["Zonas", t.zonas_cobertura], ["Especialidades", t.tipos_proyecto], ["Experiencia", t.anos_experiencia]].filter(([, v]) => v);
        if (await enviar(ADMIN, `Nuevo taller registrado: ${t.nombre}`,
          plantilla("Se registró un taller", `<p>${lineas.map(([l, v]) => `<b>${esc(l)}:</b> ${esc(v)}`).join("<br>")}</p><p>Quedó en estado <b>pendiente</b>. Agenda su visita o videollamada y apruébalo desde Admin → Talleres.</p>`, ["Abrir panel", APP]))) n++;
      }
      return res.status(200).json({ ok: true, enviados: n });
    }

    const token = (req.headers["authorization"] || "").replace(/^Bearer\s+/i, "").trim();
    const yo = token ? await usuario(token) : null;
    if (!yo) return res.status(401).json({ error: "No autorizado" });

    // ---- Aprobación / rechazo de taller (solo admin) ----
    if (evento === "taller_aprobado" || evento === "taller_rechazado") {
      let admin = yo.email === ADMIN;
      if (!admin) { const ad = await rest(`admins?email=eq.${encodeURIComponent(yo.email)}&select=*&limit=1`); admin = Array.isArray(ad) && ad.length > 0; }
      if (!admin) return res.status(403).json({ error: "Solo admin" });
      const correo = String(body?.email || "").trim().toLowerCase();
      const r = await rest(`talleres_membresia?email=eq.${encodeURIComponent(correo)}&select=*&limit=1`);
      const t = Array.isArray(r) ? r[0] : null;
      const si = evento === "taller_aprobado";
      if (!t || t.estado !== (si ? "activo" : "rechazado")) return res.status(200).json({ ok: false, motivo: "el estado no coincide" });
      let n = 0;
      if (await claim(`${si ? "apr" : "rech"}:${correo}`)) {
        const ok = si
          ? await enviar(correo, "Tu taller fue aprobado en EnKaje Pro",
              plantilla("¡Felicidades, tu taller fue aprobado!", `<p>Hola ${esc(t.representante || "")}, <b>${esc(t.nombre)}</b> ya forma parte de EnKaje Pro como taller verificado.</p><p>Ya puedes entrar con tu correo y la contraseña que creaste. Para empezar:</p><p>1. Completa <b>Mi Perfil</b>: logo, horario y fotos de tus trabajos.<br>2. Cuando un cliente de tus zonas pida cotización de algo de tu especialidad, te avisaremos por correo.<br>3. Cotiza en rango y, si el cliente te elige, recibirás sus datos de contacto.</p><p>Te pedimos responder las oportunidades en menos de 48 horas. Bienvenido.</p>`, ["Entrar a mi panel", APP]))
          : await enviar(correo, "Sobre tu solicitud en EnKaje Pro",
              plantilla("Sobre tu solicitud", `<p>Hola ${esc(t.representante || "")}, gracias por tu interés en EnKaje Pro. Por ahora no pudimos aprobar la solicitud de <b>${esc(t.nombre)}</b>.</p><p>Si quieres saber más o volver a intentarlo, responde este correo y con gusto lo platicamos.</p>`, null));
        if (ok) n++;
      }
      return res.status(200).json({ ok: true, enviados: n });
    }

    // Proyecto (si no mandan enkaje, el más reciente en solicitud del propio usuario)
    let p = null;
    if (body.enkaje) {
      const r = await rest(`proyectos?enkaje=eq.${encodeURIComponent(body.enkaje)}&select=*`);
      p = Array.isArray(r) ? r[0] : null;
    } else if (evento === "solicitud_nueva") {
      const r = await rest(`proyectos?user_email=eq.${encodeURIComponent(yo.email)}&etapa_seguimiento=eq.solicitud&order=created_at.desc&limit=1&select=*`);
      p = Array.isArray(r) ? r[0] : null;
    }
    if (!p) return res.status(200).json({ ok: false, motivo: "proyecto no encontrado" });

    const dueno = String(p.user_email || "").toLowerCase();
    const tallerAsig = String(p.taller_email || "").toLowerCase();
    const tipo = TIPOS[p.tipo_proyecto] || p.tipo_proyecto || "proyecto";
    const enk = String(p.enkaje);
    let enviados = 0;

    if (evento === "solicitud_nueva") {
      if (dueno !== yo.email || p.etapa_seguimiento !== "solicitud" || tallerAsig) return res.status(200).json({ ok: false, motivo: "no aplica" });
      const talleres = await rest("talleres_membresia?estado=eq.activo&select=email,nombre,zonas_cobertura,municipio,tipos_proyecto");
      const zona = norm(p.zona), tp = norm(p.tipo_proyecto);
      const aptos = (Array.isArray(talleres) ? talleres : []).filter(t =>
        zona && lista(t.zonas_cobertura || t.municipio).includes(zona) && lista(t.tipos_proyecto).includes(tp)).slice(0, 10);
      for (const t of aptos) {
        if (!(await claim(`sol:${enk}:${norm(t.email)}`))) continue;
        const ok = await enviar(t.email, `Nueva oportunidad: ${tipo} en ${p.zona}`,
          plantilla("Tienes una nueva oportunidad", `<p>Un cliente de <b>${esc(p.zona)}</b> pidió cotización para una <b>${esc(tipo)}</b>${p.estilo ? ` estilo ${esc(p.estilo)}` : ""}.</p><p>Entra para ver el render y las medidas, y envía tu cotización en rango. Las solicitudes llegan a pocos talleres, así que responder rápido ayuda a que te elijan.</p>`, ["Ver oportunidad", APP]));
        if (ok) enviados++;
      }
    }

    else if (evento === "cotizacion_nueva") {
      const c = await rest(`cotizaciones?proyecto_enkaje=eq.${encodeURIComponent(enk)}&taller_email=eq.${encodeURIComponent(yo.email)}&select=monto_min,monto_max,tiempo_estimado&limit=1`);
      const cot = Array.isArray(c) ? c[0] : null;
      if (!cot) return res.status(200).json({ ok: false, motivo: "sin cotización" });
      if (await claim(`cot:${enk}:${yo.email}`)) {
        const tm = await rest(`talleres_membresia?email=eq.${encodeURIComponent(yo.email)}&select=nombre&limit=1`);
        const nombreTaller = (Array.isArray(tm) && tm[0]?.nombre) || "Un taller";
        const ok = await enviar(dueno, `Recibiste una cotización para tu ${tipo}`,
          plantilla("Llegó una cotización", `<p><b>${esc(nombreTaller)}</b> te envió una cotización en rango:</p><p style="font-size:18px;font-weight:bold;margin:6px 0">${money(cot.monto_min)} – ${money(cot.monto_max)} MXN</p>${cot.tiempo_estimado ? `<p>Tiempo estimado: ${esc(cot.tiempo_estimado)}</p>` : ""}<p>El precio final se confirma después de la visita. Cuando tengas varias cotizaciones, compáralas y elige con quién trabajar; solo entonces compartimos tu contacto.</p>`, ["Ver mis cotizaciones", APP]));
        if (ok) enviados++;
      }
    }

    else if (evento === "taller_elegido") {
      if (dueno !== yo.email || !tallerAsig) return res.status(200).json({ ok: false, motivo: "no aplica" });
      if (await claim(`eleg:${enk}:${tallerAsig}`)) {
        const ok = await enviar(tallerAsig, `Te eligieron para una ${tipo} en ${p.zona}`,
          plantilla("Te eligieron", `<p>El cliente escogió tu cotización. Estos son sus datos de contacto:</p><p><b>${esc(p.nombre || "Cliente")}</b><br>Teléfono: ${esc(p.telefono || "—")}<br>Correo: ${esc(p.correo || dueno)}</p><p>Contáctalo pronto y propón la fecha de la visita desde tu panel (Proyectos → Proponer visita).</p>`, ["Abrir mi panel", APP]));
        if (ok) enviados++;
      }
      const otras = await rest(`cotizaciones?proyecto_enkaje=eq.${encodeURIComponent(enk)}&select=taller_email`);
      for (const o of (Array.isArray(otras) ? otras : [])) {
        const te = String(o.taller_email || "").toLowerCase();
        if (!te || te === tallerAsig) continue;
        if (!(await claim(`otro:${enk}:${te}`))) continue;
        const ok = await enviar(te, `La solicitud de ${tipo} en ${p.zona} se cerró`,
          plantilla("El cliente eligió a otro taller", `<p>Gracias por cotizar. El cliente escogió a otro taller para esta solicitud. Habrá más oportunidades en tu zona.</p>`, ["Ver más oportunidades", APP]));
        if (ok) enviados++;
      }
    }

    else if (evento === "visita_propuesta") {
      if (tallerAsig !== yo.email || !p.fecha_visita) return res.status(200).json({ ok: false, motivo: "no aplica" });
      if (await claim(`vp:${enk}:${p.fecha_visita}`)) {
        const ok = await enviar(dueno, `Tu taller propone una visita: ${fecha(p.fecha_visita)}`,
          plantilla("Propuesta de visita", `<p>Tu taller propone visitarte para tomar medidas el:</p><p style="font-weight:bold">${esc(fecha(p.fecha_visita))}</p><p>Entra para confirmar o pedir otra fecha.</p>`, ["Confirmar visita", APP]));
        if (ok) enviados++;
      }
    }

    else if (evento === "visita_confirmada" || evento === "visita_rechazada") {
      if (dueno !== yo.email || !tallerAsig || !p.fecha_visita) return res.status(200).json({ ok: false, motivo: "no aplica" });
      if (await claim(`${evento}:${enk}:${p.fecha_visita}`)) {
        const si = evento === "visita_confirmada";
        const ok = await enviar(tallerAsig, si ? `Visita confirmada: ${fecha(p.fecha_visita)}` : "El cliente pidió otra fecha de visita",
          plantilla(si ? "Visita confirmada" : "Propón otra fecha", si ? `<p>El cliente confirmó la visita:</p><p style="font-weight:bold">${esc(fecha(p.fecha_visita))}</p>` : `<p>La fecha propuesta no le funciona al cliente. Propón otra desde tu panel.</p>`, ["Abrir mi panel", APP]));
        if (ok) enviados++;
      }
    }

    else return res.status(400).json({ error: "Evento desconocido" });

    return res.status(200).json({ ok: true, enviados });
  } catch (e) {
    console.error(e);
    return res.status(200).json({ ok: false, error: String(e.message || e) });
  }
}
