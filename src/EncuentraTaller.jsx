import { useState } from "react";
import { LogoInline } from "./Logo.jsx";

const SUPABASE_URL = "https://iucoggyualkyojmmgael.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml1Y29nZ3l1YWxreW9qbW1nYWVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAwMTMxOTMsImV4cCI6MjA5NTU4OTE5M30.QNU604KcLaSxXxoZaxmVbt-sf-aFDTjrVoTR4K-wy5c";

const GOLD = "#d4af37";

const TIPOS = [
  { key: "cocina", label: "🍳 Cocina", keywords: ["cocina"] },
  { key: "closet", label: "👔 Closet", keywords: ["closet", "clóset", "vestidor"] },
  { key: "puerta", label: "🚪 Puerta", keywords: ["puerta"] },
  { key: "mueble", label: "🛋️ Mueble", keywords: ["mueble"] },
  { key: "bano", label: "🚿 Baño", keywords: ["baño", "bano", "vanity"] },
  { key: "panel", label: "🪵 Panel", keywords: ["panel"] },
];

const ZONAS = [
  "Monterrey", "San Pedro Garza García", "San Nicolás de los Garza", "Guadalupe",
  "Apodaca", "Santa Catarina", "Escobedo", "García", "Juárez", "Cadereyta Jiménez",
];

const NIVELES = [
  { key: "economico", label: "Económico" },
  { key: "medio", label: "Medio" },
  { key: "alto", label: "Alto" },
  { key: "premium", label: "Premium" },
];

const CSS = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #070708; color: #e8e0d0; }
  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-thumb { background: #d4af3740; border-radius: 3px; }
  @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
  .fade-up { animation: fadeUp .4s ease forwards; }
`;

const PILL_OPT = ({ label, checked, onClick }) => (
  <button onClick={onClick} style={{
    padding: "14px 18px", borderRadius: 14, border: `1.5px solid ${checked ? GOLD : "#2a2a20"}`,
    background: checked ? `${GOLD}20` : "#0f0f0a", color: checked ? GOLD : "#e8e0d0",
    fontSize: 15, fontWeight: checked ? 700 : 500, cursor: "pointer", textAlign: "left",
    width: "100%", transition: "all .15s ease", boxShadow: checked ? `0 0 14px ${GOLD}25` : "none",
  }}>
    {checked && <span style={{ marginRight: 8 }}>✓</span>}{label}
  </button>
);

const sb = async (path, opts = {}) => {
  const sep = path.includes("?") ? "&" : "?";
  const url = `${SUPABASE_URL}/rest/v1/${path}${sep}apikey=${SUPABASE_KEY}`;
  const r = await fetch(url, {
    method: opts.method || "GET",
    headers: { "Authorization": `Bearer ${SUPABASE_KEY}`, "Content-Type": "application/json", "Prefer": opts.prefer || "return=representation" },
    body: opts.body,
  });
  const text = await r.text();
  try { return JSON.parse(text); } catch { return text; }
};

// ─── LÓGICA DE MATCH ────────────────────────────────────────────────────
function elegirTaller(talleres, respuestas) {
  let candidatos = talleres.filter(t => t.estado === "activo");
  if (candidatos.length === 0) return null;

  // Filtrar por zona — si nadie coincide, se abre a todas
  const porZona = candidatos.filter(t => (t.municipio || "").trim().toLowerCase() === respuestas.zona.toLowerCase());
  if (porZona.length > 0) candidatos = porZona;

  // Filtrar por nivel de precio — si nadie coincide, se abre a todos
  const porPrecio = candidatos.filter(t => (t.niveles_precio || "").split(",").map(s => s.trim()).includes(respuestas.precio));
  if (porPrecio.length > 0) candidatos = porPrecio;

  const tipoInfo = TIPOS.find(t => t.key === respuestas.tipo);
  const planScore = { premium: 3, pro: 2, basico: 1 };

  const puntuados = candidatos.map(t => {
    let score = 0;
    const esp = (t.especialidad || "").toLowerCase();
    if (tipoInfo && tipoInfo.keywords.some(k => esp.includes(k))) score += 10;
    score += planScore[t.plan] || 0;
    return { taller: t, score };
  });

  puntuados.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return (a.taller.leads_recibidos || 0) - (b.taller.leads_recibidos || 0);
  });

  return puntuados[0]?.taller || null;
}

export default function EncuentraTaller() {
  const [paso, setPaso] = useState(0); // 0=tipo, 1=zona, 2=precio, 3=contacto, 4=resultado
  const [respuestas, setRespuestas] = useState({ tipo: "", zona: "", precio: "" });
  const [contacto, setContacto] = useState({ nombre: "", telefono: "" });
  const [enviando, setEnviando] = useState(false);
  const [tallerAsignado, setTallerAsignado] = useState(null);
  const [sinMatch, setSinMatch] = useState(false);
  const [error, setError] = useState("");

  const avanzar = () => setPaso(p => p + 1);

  async function finalizar() {
    if (!contacto.nombre.trim() || !contacto.telefono.trim()) {
      setError("Falta tu nombre o teléfono.");
      return;
    }
    setError("");
    setEnviando(true);
    try {
      const talleres = await sb("talleres_membresia?estado=eq.activo");
      const match = Array.isArray(talleres) ? elegirTaller(talleres, respuestas) : null;

      const tipoLabel = TIPOS.find(t => t.key === respuestas.tipo)?.label.replace(/^[^\s]+\s/, "") || respuestas.tipo;
      const nivelLabel = NIVELES.find(n => n.key === respuestas.precio)?.label || respuestas.precio;

      const payload = {
        nombre: contacto.nombre,
        telefono: contacto.telefono,
        tipo_proyecto: respuestas.tipo,
        observaciones: `Lead desde cuestionario · Zona: ${respuestas.zona} · Presupuesto: ${nivelLabel}`,
        estado: "nuevo",
        atencion_por: match?.nombre || "Sin asignar",
        canal_origen: "cuestionario",
        taller_slug: match?.slug || null,
        created_at: new Date().toISOString(),
      };
      const limpio = Object.fromEntries(Object.entries(payload).filter(([, v]) => v !== null && v !== ""));
      await sb("proyectos", { method: "POST", body: JSON.stringify(limpio), prefer: "return=minimal" });

      if (match) {
        await sb(`talleres_membresia?id=eq.${match.id}`, {
          method: "PATCH",
          body: JSON.stringify({ leads_recibidos: (match.leads_recibidos || 0) + 1 }),
          prefer: "return=minimal",
        });
        const telTaller = (match.telefono || "").replace(/\D/g, "");
        if (telTaller) {
          const sep = "━".repeat(22);
          const msg = `🔔 *NUEVA SOLICITUD — Cuestionario*\n${sep}\n👤 *Cliente:* ${contacto.nombre}\n📱 *Tel:* ${contacto.telefono}\n🔨 *Proyecto:* ${tipoLabel}\n📍 *Zona:* ${respuestas.zona}\n💰 *Presupuesto:* ${nivelLabel}\n${sep}\nenkajepro.com`;
          window.open(`https://wa.me/52${telTaller}?text=${encodeURIComponent(msg)}`, "_blank");
        }
        setTallerAsignado(match);
      } else {
        setSinMatch(true);
      }
      setPaso(4);
    } catch (e) {
      setError("Error al enviar: " + e.message);
    }
    setEnviando(false);
  }

  return (
    <div style={{ background: "#070708", minHeight: "100vh" }}>
      <style>{CSS}</style>
      <nav style={{ borderBottom: "1px solid #1a1a12", padding: "14px 24px", display: "flex", justifyContent: "center" }}>
        <div onClick={() => window.location.href = "/"} style={{ cursor: "pointer" }}>
          <LogoInline size="nav" />
        </div>
      </nav>

      <div style={{ maxWidth: 520, margin: "0 auto", padding: "40px 24px 80px" }}>
        {paso < 4 && (
          <div style={{ display: "flex", gap: 6, marginBottom: 32 }}>
            {[0, 1, 2, 3].map(i => (
              <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: i <= paso ? GOLD : "#1a1a12" }} />
            ))}
          </div>
        )}

        {paso === 0 && (
          <div className="fade-up">
            <h1 style={{ fontSize: 24, fontWeight: 900, marginBottom: 6 }}>¿Qué necesitas?</h1>
            <p style={{ color: "#999", fontSize: 14, marginBottom: 24 }}>Elige el tipo de proyecto</p>
            <div style={{ display: "grid", gap: 10 }}>
              {TIPOS.map(t => (
                <PILL_OPT key={t.key} label={t.label} checked={respuestas.tipo === t.key}
                  onClick={() => { setRespuestas(p => ({ ...p, tipo: t.key })); setTimeout(avanzar, 150); }} />
              ))}
            </div>
          </div>
        )}

        {paso === 1 && (
          <div className="fade-up">
            <h1 style={{ fontSize: 24, fontWeight: 900, marginBottom: 6 }}>¿En qué zona vives?</h1>
            <p style={{ color: "#999", fontSize: 14, marginBottom: 24 }}>Área Metropolitana de Monterrey</p>
            <div style={{ display: "grid", gap: 10 }}>
              {ZONAS.map(z => (
                <PILL_OPT key={z} label={z} checked={respuestas.zona === z}
                  onClick={() => { setRespuestas(p => ({ ...p, zona: z })); setTimeout(avanzar, 150); }} />
              ))}
            </div>
          </div>
        )}

        {paso === 2 && (
          <div className="fade-up">
            <h1 style={{ fontSize: 24, fontWeight: 900, marginBottom: 6 }}>¿Qué tipo de presupuesto buscas?</h1>
            <p style={{ color: "#999", fontSize: 14, marginBottom: 24 }}>Así te conectamos con el taller correcto</p>
            <div style={{ display: "grid", gap: 10 }}>
              {NIVELES.map(n => (
                <PILL_OPT key={n.key} label={n.label} checked={respuestas.precio === n.key}
                  onClick={() => { setRespuestas(p => ({ ...p, precio: n.key })); setTimeout(avanzar, 150); }} />
              ))}
            </div>
          </div>
        )}

        {paso === 3 && (
          <div className="fade-up">
            <h1 style={{ fontSize: 24, fontWeight: 900, marginBottom: 6 }}>Casi listo</h1>
            <p style={{ color: "#999", fontSize: 14, marginBottom: 24 }}>Dinos cómo contactarte</p>
            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 11, color: "#999", display: "block", marginBottom: 5, textTransform: "uppercase", letterSpacing: 1 }}>Nombre completo</label>
              <input value={contacto.nombre} onChange={e => setContacto(p => ({ ...p, nombre: e.target.value }))} placeholder="Tu nombre"
                style={{ width: "100%", background: "#0a0a08", border: "1px solid #2a2a20", borderRadius: 10, padding: "12px 14px", color: "#e8e0d0", fontSize: 15, outline: "none" }} />
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 11, color: "#999", display: "block", marginBottom: 5, textTransform: "uppercase", letterSpacing: 1 }}>Teléfono</label>
              <input value={contacto.telefono} onChange={e => setContacto(p => ({ ...p, telefono: e.target.value }))} placeholder="81-1234-5678"
                style={{ width: "100%", background: "#0a0a08", border: "1px solid #2a2a20", borderRadius: 10, padding: "12px 14px", color: "#e8e0d0", fontSize: 15, outline: "none" }} />
            </div>
            {error && <div style={{ color: "#f44336", fontSize: 13, marginBottom: 14 }}>{error}</div>}
            <button onClick={finalizar} disabled={enviando} style={{
              width: "100%", background: enviando ? "#1a1a10" : GOLD, color: enviando ? "#555" : "#000",
              border: "none", borderRadius: 12, padding: "15px", fontWeight: 900, fontSize: 15, cursor: enviando ? "not-allowed" : "pointer",
            }}>
              {enviando ? "Buscando tu taller..." : "Ver mi taller recomendado →"}
            </button>
          </div>
        )}

        {paso === 4 && tallerAsignado && (
          <div className="fade-up" style={{ textAlign: "center" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
            <h2 style={{ fontSize: 22, fontWeight: 900, color: GOLD, marginBottom: 8 }}>¡Encontramos tu taller!</h2>
            <p style={{ color: "#ccc", fontSize: 15, marginBottom: 4 }}>{tallerAsignado.nombre}</p>
            <p style={{ color: "#888", fontSize: 13, marginBottom: 24 }}>te contactará muy pronto al {contacto.telefono}</p>
            <a href={`/taller/${tallerAsignado.slug}`} style={{ display: "inline-block", background: "transparent", border: `1.5px solid ${GOLD}`, color: GOLD, borderRadius: 10, padding: "12px 24px", fontWeight: 700, fontSize: 14, textDecoration: "none" }}>
              Ver perfil del taller →
            </a>
          </div>
        )}

        {paso === 4 && sinMatch && (
          <div className="fade-up" style={{ textAlign: "center" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🙌</div>
            <h2 style={{ fontSize: 22, fontWeight: 900, color: GOLD, marginBottom: 8 }}>¡Recibimos tu solicitud!</h2>
            <p style={{ color: "#ccc", fontSize: 15 }}>Aún no tenemos un taller activo en tu zona, pero te contactaremos personalmente en menos de 24 horas.</p>
          </div>
        )}
      </div>

      <footer style={{ borderTop: "1px solid #1a1a12", padding: "20px 24px", textAlign: "center" }}>
        <div style={{ fontSize: 12, color: "#888" }}>
          Powered by <span style={{ color: GOLD, fontWeight: 700 }}>EnKaje Pro</span> · enkajepro.com
        </div>
      </footer>
    </div>
  );
}
