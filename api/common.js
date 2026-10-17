// common.js — proxy para Anthropic/Claude (protegido)
// Reglas:
// 1) Solo acepta llamadas desde enkajepro.com (o pruebas locales / Vercel).
// 2) Con sesión iniciada (token de Supabase válido): hasta 3000 tokens de respuesta.
// 3) Sin sesión (portal de clientes): solo textos cortos (descripción del render).
// 4) El modelo lo decide el servidor, no el navegador.

const SUPABASE_URL = "https://iucoggyualkyojmmgael.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml1Y29nZ3l1YWxreW9qbW1nYWVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAwMTMxOTMsImV4cCI6MjA5NTU4OTE5M30.QNU604KcLaSxXxoZaxmVbt-sf-aFDTjrVoTR4K-wy5c";

const MODELO = "claude-sonnet-4-6";
const MAX_TOKENS_SESION = 3000;
const MAX_TOKENS_ANON = 400;
const MAX_CARACTERES_SESION = 40000;
const MAX_CARACTERES_ANON = 5000;

function origenPermitido(origin) {
  if (!origin) return false;
  try {
    const host = new URL(origin).hostname;
    return host === "enkajepro.com" || host === "www.enkajepro.com"
      || host.endsWith(".vercel.app") || host === "localhost" || host === "127.0.0.1";
  } catch { return false; }
}

async function sesionValida(token) {
  if (!token || token === SUPABASE_KEY) return false;
  try {
    const r = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
      headers: { "apikey": SUPABASE_KEY, "Authorization": `Bearer ${token}` },
    });
    return r.ok;
  } catch { return false; }
}

const largoTexto = (c) => typeof c === "string" ? c.length
  : Array.isArray(c) ? c.reduce((n, p) => n + (typeof p?.text === "string" ? p.text.length : 0), 0) : 0;

const rechazo = (res, status, message) => res.status(status).json({ error: { message } });

export default async function handler(req, res) {
  const origin = req.headers.origin || "";
  if (origenPermitido(origin)) res.setHeader("Access-Control-Allow-Origin", origin);
  res.setHeader("Vary", "Origin");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return rechazo(res, 405, "Método no permitido");
  if (!origenPermitido(origin)) return rechazo(res, 403, "Acceso no permitido");

  try {
    let body = req.body;
    if (typeof body === "string") body = JSON.parse(body);
    const messages = Array.isArray(body?.messages) ? body.messages : [];
    const system = typeof body?.system === "string" ? body.system : undefined;
    if (messages.length === 0 || messages.length > 40) return rechazo(res, 400, "Solicitud inválida");
    if (!messages.every(m => (m?.role === "user" || m?.role === "assistant") && largoTexto(m.content) > 0)) {
      return rechazo(res, 400, "Solicitud inválida");
    }

    const auth = req.headers["authorization"] || "";
    const token = auth.startsWith("Bearer ") ? auth.slice(7).trim() : "";
    const conSesion = await sesionValida(token);

    const caracteres = messages.reduce((n, m) => n + largoTexto(m.content), 0) + (system ? system.length : 0);
    const pedidos = Number(body?.max_tokens) || 500;
    let maxTokens;
    if (conSesion) {
      if (caracteres > MAX_CARACTERES_SESION) return rechazo(res, 413, "El mensaje es demasiado largo");
      maxTokens = Math.min(pedidos, MAX_TOKENS_SESION);
    } else {
      if (system || messages.length > 1 || caracteres > MAX_CARACTERES_ANON) {
        return rechazo(res, 401, "Inicia sesión para usar esta función");
      }
      maxTokens = Math.min(pedidos, MAX_TOKENS_ANON);
    }

    const payload = { model: MODELO, max_tokens: maxTokens, messages };
    if (system) payload.system = system;

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    return res.status(200).json({ anthropic_status: response.status, data });
  } catch (err) {
    return res.status(200).json({ error: { message: "No se pudo procesar la solicitud" } });
  }
}
