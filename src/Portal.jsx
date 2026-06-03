import { useState, useRef, useEffect } from "react";

// ─── CONSTANTES ───────────────────────────────────────────────────────────────
const SUPABASE_URL = "https://iucoggyualkyojmmgael.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml1Y29nZ3l1YWxreW9qbW1nYWVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAwMTMxOTMsImV4cCI6MjA5NTU4OTE5M30.QNU604KcLaSxXxoZaxmVbt-sf-aFDTjrVoTR4K-wy5c";

const sb = async (path, opts = {}) => {
  const sep = path.includes("?") ? "&" : "?";
  const url = `${SUPABASE_URL}/rest/v1/${path}${sep}apikey=${SUPABASE_KEY}`;
  const r = await fetch(url, {
    method: opts.method || "GET",
    headers: { "Authorization": `Bearer ${SUPABASE_KEY}`, "Content-Type": "application/json", "Prefer": "return=representation" },
    body: opts.body
  });
  const text = await r.text();
  try { return JSON.parse(text); } catch { return text; }
};

const ESTILOS = [
  { key: "moderno",       label: "Moderno",        desc: "Líneas limpias, colores neutros",     emoji: "⬜" },
  { key: "minimalista",   label: "Minimalista",     desc: "Lo esencial, espacios abiertos",      emoji: "◻️" },
  { key: "contemporaneo", label: "Contemporáneo",   desc: "Mezcla de estilos actuales",          emoji: "🔷" },
  { key: "industrial",    label: "Industrial",      desc: "Metal, madera cruda, urbano",         emoji: "⚙️" },
  { key: "clasico",       label: "Clásico",         desc: "Molduras, detalles ornamentales",     emoji: "🏛️" },
  { key: "rustico",       label: "Rústico",         desc: "Madera natural, texturas orgánicas",  emoji: "🌿" },
  { key: "nordico",       label: "Nórdico",         desc: "Blanco, madera clara, acogedor",      emoji: "❄️" },
  { key: "lujo",          label: "Lujo / Premium",  desc: "Materiales nobles, exclusividad",     emoji: "✨" },
];

const TIPOS_PROYECTO = [
  { key: "cocina",  label: "Cocina",   emoji: "🍳" },
  { key: "closet",  label: "Closet",   emoji: "👔" },
  { key: "puerta",  label: "Puerta",   emoji: "🚪" },
  { key: "mueble",  label: "Mueble",   emoji: "🛋️" },
];

const RANGOS = {
  cocina:  { min: 35000,  max: 120000 },
  closet:  { min: 18000,  max: 65000  },
  puerta:  { min: 8000,   max: 28000  },
  mueble:  { min: 12000,  max: 55000  },
};

const TIEMPOS = {
  cocina:  "20 a 35 días hábiles",
  closet:  "15 a 20 días hábiles",
  puerta:  "8 a 15 días hábiles",
  mueble:  "15 a 25 días hábiles",
};

const MATERIALES_SUGERIDOS = {
  moderno:       "MDF lacado mate, cubierta de cuarzo, herrajes ocultos",
  minimalista:   "MDF blanco mate, sin manijas, bisagras push-open",
  contemporaneo: "Combinación MDF y madera enchapada, cubierta porcelanato",
  industrial:    "Madera sólida, herrajes negros mate, acentos metálicos",
  clasico:       "Madera sólida con molduras, bisagras doradas, cubierta granito",
  rustico:       "Madera de pino o cedro natural, textura veteada, herrajes rústicos",
  nordico:       "MDF blanco, madera clara tipo abedul, herrajes discretos plateados",
  lujo:          "Madera noble enchapada, cubierta mármol, herrajes dorados premium",
};

// ─── CALCULAR SCORE ───────────────────────────────────────────────────────────
function calcularScore({ nivel_decision, foto_url, medidas, fecha_inicio }) {
  let score = 0;
  if (nivel_decision === "urgente")  score += 40;
  if (nivel_decision === "decidido") score += 30;
  if (nivel_decision === "evaluando")score += 15;
  if (nivel_decision === "explorando")score += 5;
  if (foto_url)    score += 20;
  if (medidas)     score += 15;
  if (fecha_inicio)score += 25;
  return Math.min(score, 100);
}

function scoreLabel(score) {
  if (score >= 80) return "prioritario";
  if (score >= 55) return "listo";
  if (score >= 30) return "evaluando";
  return "en_exploracion";
}

// ─── GLOBAL CSS ───────────────────────────────────────────────────────────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@300;400;500;600&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'DM Sans', sans-serif; background: #070708; color: #e8e0d0; }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: #0a0a0a; }
  ::-webkit-scrollbar-thumb { background: #d4af3740; border-radius: 2px; }
  input, textarea, button { font-family: 'DM Sans', sans-serif; }
  @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.5; } }
  @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
  @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  .fade-up { animation: fadeUp 0.5s ease forwards; }
  .fade-in { animation: fadeIn 0.4s ease forwards; }
  .portal-step { animation: fadeUp 0.45s ease forwards; }
`;

// ─── COMPONENTES ──────────────────────────────────────────────────────────────
const ProgressBar = ({ step, total }) => (
  <div style={{ width: "100%", height: 3, background: "#1a1a12", borderRadius: 2, overflow: "hidden" }}>
    <div style={{ height: "100%", width: `${(step / total) * 100}%`, background: "linear-gradient(90deg,#d4af37,#f0c84a)", borderRadius: 2, transition: "width 0.5s ease" }} />
  </div>
);

const StepLabel = ({ step, total, label }) => (
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
    <span style={{ fontSize: 11, color: "#d4af37", fontWeight: 600, letterSpacing: 2, textTransform: "uppercase" }}>{label}</span>
    <span style={{ fontSize: 11, color: "#444", letterSpacing: 1 }}>{step} / {total}</span>
  </div>
);

const Btn = ({ onClick, children, disabled, outline, color = "#d4af37", style = {} }) => (
  <button onClick={onClick} disabled={disabled} style={{
    background: outline ? "transparent" : disabled ? "#1a1a12" : color,
    color: outline ? color : disabled ? "#444" : "#000",
    border: `1.5px solid ${disabled ? "#2a2a20" : color}`,
    borderRadius: 12, padding: "13px 28px", fontWeight: 700, fontSize: 14,
    cursor: disabled ? "not-allowed" : "pointer", transition: "all .2s",
    letterSpacing: 0.5, ...style
  }}>{children}</button>
);

const Watermark = () => (
  <div style={{
    position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
    pointerEvents: "none", zIndex: 10
  }}>
    <div style={{
      fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 900,
      color: "rgba(212,175,55,0.35)", letterSpacing: 4, transform: "rotate(-30deg)",
      textShadow: "0 2px 8px rgba(0,0,0,0.5)", userSelect: "none", whiteSpace: "nowrap"
    }}>EnKaje Pro · Vista Previa</div>
  </div>
);

// ─── PORTAL PRINCIPAL ─────────────────────────────────────────────────────────
export default function Portal() {
  const [step, setStep]           = useState(0); // 0=intro, 1-9=pasos
  const [tipoProyecto, setTipo]   = useState("");
  const [foto, setFoto]           = useState(null);      // File object
  const [fotoUrl, setFotoUrl]     = useState(null);      // preview URL
  const [estilo, setEstilo]       = useState("");
  const [renderUrl, setRenderUrl] = useState(null);
  const [renderLoading, setRenderLoading] = useState(false);
  const [renderMsg, setRenderMsg] = useState("");
  const [inversion, setInversion] = useState({ min: 0, max: 0 });
  const [fechaInicio, setFechaInicio] = useState("");
  const [nivelDecision, setNivelDecision] = useState("");
  const [medidas, setMedidas]     = useState("");
  const [medidasFile, setMedidasFile] = useState(null);
  const [nombre, setNombre]       = useState("");
  const [telefono, setTelefono]   = useState("");
  const [correo, setCorreo]       = useState("");
  const [saving, setSaving]       = useState(false);
  const [saved, setSaved]         = useState(false);
  const [sinCuenta, setSinCuenta] = useState(true); // true = usuario sin cuenta (freemium)
  const fileRef  = useRef();
  const sketchRef = useRef();
  const TOTAL_STEPS = 9;

  useEffect(() => { document.title = "Portal Cliente · EnKaje Pro"; }, []);

  // ─── SUBIR FOTO ─────────────────────────────────────────────────────────────
  const handleFoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFoto(file);
    setFotoUrl(URL.createObjectURL(file));
  };

  // ─── GENERAR RENDER CON IA ───────────────────────────────────────────────────
  const generarRender = async () => {
    if (!estilo || !tipoProyecto) return;
    setRenderLoading(true);
    setRenderMsg("");
    setRenderUrl(null);
    const estiloData = ESTILOS.find(e => e.key === estilo);
    const prompt = `Professional interior design render of a custom ${tipoProyecto === "cocina" ? "kitchen" : tipoProyecto === "closet" ? "walk-in closet" : tipoProyecto === "puerta" ? "door" : "furniture piece"}, ${estiloData?.label} style: ${estiloData?.desc}. ${MATERIALES_SUGERIDOS[estilo]}. Photorealistic, high-end Monterrey Mexico home, dramatic lighting, architectural photography style, 4K quality.`;
    try {
      const res = await fetch("/api/image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt })
      });
      const data = await res.json();
      const imgData = data.data?.data?.[0] || data.data?.[0];
      const imgUrl  = imgData?.url;
      const imgB64  = imgData?.b64_json;
      if (imgUrl)       { setRenderUrl(imgUrl);                              setRenderMsg("✅ Render generado"); }
      else if (imgB64)  { setRenderUrl("data:image/png;base64," + imgB64);   setRenderMsg("✅ Render generado"); }
      else              { setRenderMsg("❌ " + (data?.error?.message || "Error al generar")); }
    } catch(e) {
      setRenderMsg("❌ " + e.message);
    }
    setRenderLoading(false);
  };

  // ─── GUARDAR EXPEDIENTE ──────────────────────────────────────────────────────
  const guardarExpediente = async () => {
    setSaving(true)// Notificar a EnKaje Pro por WhatsApp
const resumen = `🆕 *NUEVO LEAD — EnKaje Pro*\n\n📋 Proyecto: ${tipoProyecto.toUpperCase()}\n🎨 Estilo: ${estilo}\n👤 Nombre: ${nombre}\n📱 Tel: ${telefono}\n📧 Correo: ${correo}\n📅 Fecha deseada: ${fechaInicio}\n🎯 Decisión: ${nivelDecision}\n📐 Medidas: ${medidas || "no especificadas"}\n💰 Rango: $${(RANGOS[tipoProyecto]?.min||0).toLocaleString("es-MX")} – $${(RANGOS[tipoProyecto]?.max||0).toLocaleString("es-MX")} MXN\n\nenkajepro.com`;
window.open(`https://wa.me/528127176786?text=${encodeURIComponent(resumen)}`, "_blank");;
    const score = calcularScore({ nivel_decision: nivelDecision, foto_url: fotoUrl, medidas, fecha_inicio: fechaInicio });
    const label = scoreLabel(score);
    const rango = RANGOS[tipoProyecto] || { min: 0, max: 0 };
    try {
      console.log("Guardando expediente...", JSON.stringify({
  tipo_proyecto: tipoProyecto,
  estilo_elegido: estilo,
  nivel_decision: nivelDecision,
  score: calcularScore({ nivel_decision: nivelDecision, foto_url: fotoUrl, medidas, fecha_inicio: fechaInicio }),
}));
      await sb("expedientes", {
        method: "POST",
        body: JSON.stringify({
          tipo_proyecto:        tipoProyecto,
          foto_url:             fotoUrl || null,
          render_url:           renderUrl || null,
          estilo_elegido:       estilo,
          materiales_sugeridos: MATERIALES_SUGERIDOS[estilo] || null,
          rango_inversion_min:  rango.min,
          rango_inversion_max:  rango.max,
          tiempo_fabricacion:   TIEMPOS[tipoProyecto] || null,
          fecha_inicio_deseada: fechaInicio || null,
          nivel_decision:       nivelDecision,
          medidas_sketch_url:   medidas || null,
          observaciones:        `Nombre: ${nombre} | Tel: ${telefono} | Correo: ${correo}`,
          score,
          score_label:          label,
          estado_lead:          "nuevo",
          created_at:           new Date().toISOString(),
        })
      });
      setSaved(true);
  } catch(e) {
      console.error("ERROR EXPEDIENTE:", e);
      alert("Error: " + e.message);
    } 
    setSaving(false);
  };

  // ─── STEP NAVIGATION ────────────────────────────────────────────────────────
  const next = () => setStep(s => Math.min(s + 1, TOTAL_STEPS));
  const back = () => setStep(s => Math.max(s - 1, 0));

  // ─── RENDER ─────────────────────────────────────────────────────────────────
  return (
    <>
      <style>{CSS}</style>

      {/* HEADER */}
      <div style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "rgba(7,7,8,0.92)", backdropFilter: "blur(12px)",
        borderBottom: "1px solid #d4af3718", padding: "14px 24px",
        display: "flex", justifyContent: "space-between", alignItems: "center"
      }}>
        <a href="/" style={{ textDecoration: "none" }}>
          <span style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, fontWeight: 900, color: "#d4af37", letterSpacing: 2 }}>EnKaje</span>
          <span style={{ fontFamily: "'Playfair Display',serif", fontSize: 13, color: "#c8a97a", marginLeft: 4, letterSpacing: 3 }}>PRO</span>
        </a>
        {step > 0 && step < TOTAL_STEPS && (
          <div style={{ flex: 1, maxWidth: 300, margin: "0 24px" }}>
            <ProgressBar step={step} total={TOTAL_STEPS} />
          </div>
        )}
        <a href="/app" style={{ fontSize: 12, color: "#555", textDecoration: "none", letterSpacing: 1, border: "1px solid #2a2a20", borderRadius: 8, padding: "6px 14px" }}>
          Soy un taller →
        </a>
      </div>

      {/* CONTENIDO */}
      <div style={{ maxWidth: 680, margin: "0 auto", padding: "32px 20px 80px" }}>

        {/* ── PASO 0: INTRO ── */}
        {step === 0 && (
          <div className="portal-step" style={{ textAlign: "center", paddingTop: 40 }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🪵</div>
            <h1 style={{
              fontFamily: "'Playfair Display',serif", fontSize: 38, fontWeight: 900,
              color: "#f0e8dc", lineHeight: 1.15, marginBottom: 16
            }}>
              Visualiza tu proyecto<br />
              <span style={{ color: "#d4af37" }}>antes de gastar un peso</span>
            </h1>
            <p style={{ fontSize: 16, color: "#888", lineHeight: 1.8, maxWidth: 480, margin: "0 auto 32px" }}>
              Sube una foto de tu espacio, elige el estilo que te gusta y nuestra IA genera un render realista en segundos. Gratis, sin compromiso.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 40 }}>
              {["📸 Sube tu foto","🎨 Elige estilo","🤖 IA genera render","💰 Ve el costo estimado"].map((item, i) => (
                <div key={i} style={{ background: "#0f0f0a", border: "1px solid #d4af3720", borderRadius: 20, padding: "8px 16px", fontSize: 13, color: "#aaa" }}>
                  {item}
                </div>
              ))}
            </div>

            {/* Tipo de proyecto */}
            <div style={{ marginBottom: 32 }}>
              <p style={{ fontSize: 13, color: "#666", marginBottom: 16, letterSpacing: 1, textTransform: "uppercase" }}>¿Qué quieres hacer?</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, maxWidth: 400, margin: "0 auto" }}>
                {TIPOS_PROYECTO.map(t => (
                  <button key={t.key} onClick={() => setTipo(t.key)} style={{
                    background: tipoProyecto === t.key ? "#d4af3720" : "#0f0f0a",
                    border: `1.5px solid ${tipoProyecto === t.key ? "#d4af37" : "#1a1a12"}`,
                    borderRadius: 12, padding: "16px 12px", cursor: "pointer",
                    color: tipoProyecto === t.key ? "#d4af37" : "#888",
                    fontWeight: tipoProyecto === t.key ? 700 : 400,
                    transition: "all .2s", fontSize: 14
                  }}>
                    <div style={{ fontSize: 24, marginBottom: 6 }}>{t.emoji}</div>
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            <Btn onClick={next} disabled={!tipoProyecto} style={{ fontSize: 15, padding: "15px 40px" }}>
              Comenzar gratis →
            </Btn>
            <p style={{ fontSize: 11, color: "#333", marginTop: 16 }}>Sin registro · Sin tarjeta · 100% gratis</p>
          </div>
        )}

        {/* ── PASO 1: SUBIR FOTO ── */}
        {step === 1 && (
          <div className="portal-step">
            <StepLabel step={1} total={TOTAL_STEPS} label="Tu espacio" />
            <ProgressBar step={1} total={TOTAL_STEPS} />
            <div style={{ marginTop: 32, marginBottom: 12 }}>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 26, fontWeight: 700, color: "#f0e8dc", marginBottom: 8 }}>
                Sube una foto de tu espacio
              </h2>
              <p style={{ color: "#666", fontSize: 14, lineHeight: 1.7 }}>
                Entre más clara la foto, mejor será el render. Puede ser del estado actual del espacio.
              </p>
            </div>

            <div
              onClick={() => fileRef.current.click()}
              style={{
                border: `2px dashed ${fotoUrl ? "#d4af37" : "#2a2a20"}`,
                borderRadius: 16, padding: fotoUrl ? 0 : "48px 24px",
                textAlign: "center", cursor: "pointer", marginTop: 24,
                background: "#0f0f0a", overflow: "hidden",
                transition: "border-color .2s", minHeight: 220,
                display: "flex", alignItems: "center", justifyContent: "center"
              }}
            >
              {fotoUrl ? (
                <div style={{ position: "relative", width: "100%" }}>
                  <img src={fotoUrl} alt="Tu espacio" style={{ width: "100%", maxHeight: 360, objectFit: "cover", display: "block", borderRadius: 14 }} />
                  <div style={{ position: "absolute", bottom: 12, right: 12, background: "#d4af37", color: "#000", borderRadius: 8, padding: "6px 12px", fontSize: 12, fontWeight: 700 }}>
                    ✓ Foto cargada · Toca para cambiar
                  </div>
                </div>
              ) : (
                <div>
                  <div style={{ fontSize: 40, marginBottom: 12 }}>📷</div>
                  <p style={{ color: "#555", fontSize: 14, marginBottom: 8 }}>Toca para subir una foto</p>
                  <p style={{ color: "#333", fontSize: 12 }}>JPG, PNG · Máximo 10MB</p>
                </div>
              )}
            </div>
            <input ref={fileRef} type="file" accept="image/*" onChange={handleFoto} style={{ display: "none" }} />

            <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
              <Btn onClick={back} outline style={{ flex: 1 }}>← Atrás</Btn>
              <Btn onClick={next} style={{ flex: 2 }}>
                {fotoUrl ? "Continuar →" : "Continuar sin foto →"}
              </Btn>
            </div>
            {!fotoUrl && <p style={{ fontSize: 11, color: "#333", textAlign: "center", marginTop: 12 }}>Puedes continuar sin foto, pero el render será más genérico</p>}
          </div>
        )}

        {/* ── PASO 2: ELEGIR ESTILO ── */}
        {step === 2 && (
          <div className="portal-step">
            <StepLabel step={2} total={TOTAL_STEPS} label="Estilo" />
            <ProgressBar step={2} total={TOTAL_STEPS} />
            <div style={{ marginTop: 32, marginBottom: 24 }}>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 26, fontWeight: 700, color: "#f0e8dc", marginBottom: 8 }}>
  Medidas del espacio <span style={{ color: "#444", fontSize: 18 }}>(opcional)</span>
</h2>
<p style={{ color: "#666", fontSize: 14, lineHeight: 1.7 }}>
  Entre más info, más precisa será la cotización. Puedes escribir las medidas o subir una foto — puede ser una foto del espacio con un metro, o un dibujito en papel con los números. No tiene que ser perfecto. 📏
</p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {ESTILOS.map(e => (
                <button key={e.key} onClick={() => setEstilo(e.key)} style={{
                  background: estilo === e.key ? "#d4af3715" : "#0f0f0a",
                  border: `1.5px solid ${estilo === e.key ? "#d4af37" : "#1a1a12"}`,
                  borderRadius: 12, padding: "16px 14px", cursor: "pointer",
                  textAlign: "left", transition: "all .2s",
                  boxShadow: estilo === e.key ? "0 0 20px #d4af3820" : "none"
                }}>
                  <div style={{ fontSize: 24, marginBottom: 6 }}>{e.emoji}</div>
                  <div style={{ fontWeight: 700, color: estilo === e.key ? "#d4af37" : "#e8e0d0", fontSize: 14, marginBottom: 4 }}>{e.label}</div>
                  <div style={{ fontSize: 12, color: "#555", lineHeight: 1.5 }}>{e.desc}</div>
                </button>
              ))}
            </div>

            <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
              <Btn onClick={back} outline style={{ flex: 1 }}>← Atrás</Btn>
              <Btn onClick={async () => { next(); await generarRender(); }} disabled={!estilo} style={{ flex: 2 }}>
                Generar render con IA →
              </Btn>
            </div>
          </div>
        )}

        {/* ── PASO 3: RENDER ── */}
        {step === 3 && (
          <div className="portal-step">
            <StepLabel step={3} total={TOTAL_STEPS} label="Tu render" />
            <ProgressBar step={3} total={TOTAL_STEPS} />
            <div style={{ marginTop: 32, marginBottom: 24 }}>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 26, fontWeight: 700, color: "#f0e8dc", marginBottom: 8 }}>
                Tu propuesta visual
              </h2>
              <p style={{ color: "#666", fontSize: 14 }}>Así podría verse tu proyecto terminado.</p>
            </div>

            {renderLoading && (
              <div style={{ background: "#0f0f0a", border: "1px solid #d4af3730", borderRadius: 16, padding: "60px 24px", textAlign: "center" }}>
                <div style={{ width: 40, height: 40, border: "3px solid #d4af3730", borderTop: "3px solid #d4af37", borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto 20px" }} />
                <p style={{ color: "#d4af37", fontWeight: 700, fontSize: 14, marginBottom: 8 }}>Generando tu render con IA...</p>
                <p style={{ color: "#444", fontSize: 12 }}>Esto puede tomar 15-30 segundos</p>
              </div>
            )}

            {!renderLoading && renderUrl && (
              <div style={{ position: "relative", borderRadius: 16, overflow: "hidden", border: "1px solid #d4af3730" }}>
                <img src={renderUrl} alt="Render de tu proyecto" style={{ width: "100%", display: "block" }} />
                {sinCuenta && <Watermark />}
                {sinCuenta && (
                  <div style={{
                    position: "absolute", bottom: 0, left: 0, right: 0,
                    background: "linear-gradient(transparent, rgba(7,7,8,0.95))",
                    padding: "40px 20px 20px", textAlign: "center"
                  }}>
                    <p style={{ fontSize: 12, color: "#d4af37", fontWeight: 700, marginBottom: 6 }}>🔓 Crea una cuenta gratis para descargar sin marca de agua</p>
                  </div>
                )}
              </div>
            )}

            {!renderLoading && !renderUrl && renderMsg && (
              <div style={{ background: "#1a0a0a", border: "1px solid #f4433640", borderRadius: 12, padding: 20, textAlign: "center" }}>
                <p style={{ color: "#f44336", fontSize: 13 }}>{renderMsg}</p>
                <Btn onClick={generarRender} style={{ marginTop: 16, fontSize: 13 }}>Reintentar</Btn>
              </div>
            )}

            {/* Panel post-render */}
            {!renderLoading && renderUrl && (
              <div style={{ marginTop: 16, background: "#0f0f0a", border: "1px solid #1a1a12", borderRadius: 16, padding: 20 }}>
                <div style={{ fontSize: 11, color: "#d4af37", fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 }}>
                  Detalles del estilo {ESTILOS.find(e=>e.key===estilo)?.label}
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
                  {[
                    ["Materiales sugeridos", MATERIALES_SUGERIDOS[estilo]],
                    ["Tiempo estimado", TIEMPOS[tipoProyecto]],
                    ["Inversión aprox.", `$${(RANGOS[tipoProyecto]?.min||0).toLocaleString("es-MX")} – $${(RANGOS[tipoProyecto]?.max||0).toLocaleString("es-MX")} MXN`],
                    ["Nivel de mantenimiento", ["lujo","clasico"].includes(estilo) ? "Alto" : ["rustico","industrial"].includes(estilo) ? "Medio" : "Bajo"],
                  ].map(([l,v],i) => (
                    <div key={i} style={{ background: "#0a0a08", borderRadius: 10, padding: 12 }}>
                      <div style={{ fontSize: 10, color: "#555", letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>{l}</div>
                      <div style={{ fontSize: 13, color: "#e8e0d0", fontWeight: 600, lineHeight: 1.5 }}>{v}</div>
                    </div>
                  ))}
                </div>
                <div style={{ background: "#1a1208", border: "1px solid #d4af3720", borderRadius: 10, padding: 12, fontSize: 12, color: "#888", lineHeight: 1.7 }}>
                  💡 <strong style={{color:"#d4af3799"}}>Consejo:</strong> Este render es una propuesta referencial. Los materiales y precios finales los define el taller al cotizarte.
                </div>
              </div>
            )}

            <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
              <Btn onClick={back} outline style={{ flex: 1 }}>← Atrás</Btn>
              <Btn onClick={next} disabled={renderLoading} style={{ flex: 2 }}>
                {renderLoading ? "Esperando render..." : "Ver inversión estimada →"}
              </Btn>
            </div>
          </div>
        )}

        {/* ── PASO 4: INVERSIÓN ── */}
        {step === 4 && (
          <div className="portal-step">
            <StepLabel step={4} total={TOTAL_STEPS} label="Inversión" />
            <ProgressBar step={4} total={TOTAL_STEPS} />
            <div style={{ marginTop: 32, marginBottom: 32 }}>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 26, fontWeight: 700, color: "#f0e8dc", marginBottom: 8 }}>
                Rango de inversión estimada
              </h2>
              <p style={{ color: "#666", fontSize: 14, lineHeight: 1.7 }}>
                Basado en proyectos similares en Monterrey. El precio final lo define el taller al cotizarte.
              </p>
            </div>

            <div style={{ background: "linear-gradient(135deg,#1a1208,#0f0f0a)", border: "1px solid #d4af3730", borderRadius: 20, padding: "32px 24px", textAlign: "center", marginBottom: 20 }}>
              <div style={{ fontSize: 11, color: "#d4af37", letterSpacing: 3, textTransform: "uppercase", marginBottom: 12 }}>
                {TIPOS_PROYECTO.find(t=>t.key===tipoProyecto)?.emoji} {TIPOS_PROYECTO.find(t=>t.key===tipoProyecto)?.label} · Estilo {ESTILOS.find(e=>e.key===estilo)?.label}
              </div>
              <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 40, fontWeight: 900, color: "#d4af37", marginBottom: 8 }}>
                ${(RANGOS[tipoProyecto]?.min||0).toLocaleString("es-MX")} – ${(RANGOS[tipoProyecto]?.max||0).toLocaleString("es-MX")}
              </div>
              <div style={{ fontSize: 13, color: "#555" }}>MXN · Fabricación e instalación</div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 24 }}>
              {[
                ["Anticipo típico", "60%", `$${Math.round((RANGOS[tipoProyecto]?.min||0)*0.6).toLocaleString("es-MX")}`],
                ["Tiempo", TIEMPOS[tipoProyecto], "días hábiles"],
                ["Garantía", "6 meses", "instalación"],
              ].map(([l,v,s],i) => (
                <div key={i} style={{ background: "#0f0f0a", border: "1px solid #1a1a12", borderRadius: 12, padding: "14px 10px", textAlign: "center" }}>
                  <div style={{ fontSize: 10, color: "#444", letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>{l}</div>
                  <div style={{ fontSize: 16, fontWeight: 900, color: "#e8e0d0" }}>{v}</div>
                  <div style={{ fontSize: 10, color: "#555", marginTop: 2 }}>{s}</div>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              <Btn onClick={back} outline style={{ flex: 1 }}>← Atrás</Btn>
              <Btn onClick={next} style={{ flex: 2 }}>¿Cuándo lo necesitas? →</Btn>
            </div>
          </div>
        )}

        {/* ── PASO 5: FECHA ── */}
        {step === 5 && (
          <div className="portal-step">
            <StepLabel step={5} total={TOTAL_STEPS} label="Fecha" />
            <ProgressBar step={5} total={TOTAL_STEPS} />
            <div style={{ marginTop: 32, marginBottom: 32 }}>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 26, fontWeight: 700, color: "#f0e8dc", marginBottom: 8 }}>
                ¿Cuándo quieres que empiece?
              </h2>
              <p style={{ color: "#666", fontSize: 14 }}>Esto ayuda a los talleres a planificar su agenda.</p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
              {[
                { label: "Lo antes posible", value: new Date().toISOString().split("T")[0], emoji: "🔥" },
                { label: "Este mes", value: new Date(Date.now() + 14*24*60*60*1000).toISOString().split("T")[0], emoji: "📅" },
                { label: "El próximo mes", value: new Date(Date.now() + 35*24*60*60*1000).toISOString().split("T")[0], emoji: "🗓️" },
                { label: "Estoy explorando", value: new Date(Date.now() + 90*24*60*60*1000).toISOString().split("T")[0], emoji: "👀" },
              ].map((op, i) => (
                <button key={i} onClick={() => setFechaInicio(op.value)} style={{
                  background: fechaInicio === op.value ? "#d4af3715" : "#0f0f0a",
                  border: `1.5px solid ${fechaInicio === op.value ? "#d4af37" : "#1a1a12"}`,
                  borderRadius: 12, padding: "16px 14px", cursor: "pointer",
                  color: fechaInicio === op.value ? "#d4af37" : "#888",
                  fontWeight: fechaInicio === op.value ? 700 : 400,
                  fontSize: 14, transition: "all .2s", textAlign: "left"
                }}>
                  <span style={{ fontSize: 20, marginRight: 8 }}>{op.emoji}</span>
                  {op.label}
                </button>
              ))}
            </div>

            <div style={{ marginBottom: 24 }}>
              <label style={{ fontSize: 11, color: "#555", display: "block", marginBottom: 8, letterSpacing: 1, textTransform: "uppercase" }}>O elige una fecha específica</label>
              <input type="date" value={fechaInicio} onChange={e => setFechaInicio(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                style={{ width: "100%", background: "#0f0f0a", border: "1px solid #2a2a20", borderRadius: 12, padding: "13px 16px", color: "#e8e0d0", fontSize: 14 }} />
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              <Btn onClick={back} outline style={{ flex: 1 }}>← Atrás</Btn>
              <Btn onClick={next} style={{ flex: 2 }}>Siguiente →</Btn>
            </div>
          </div>
        )}

        {/* ── PASO 6: NIVEL DE DECISIÓN ── */}
        {step === 6 && (
          <div className="portal-step">
            <StepLabel step={6} total={TOTAL_STEPS} label="Tu decisión" />
            <ProgressBar step={6} total={TOTAL_STEPS} />
            <div style={{ marginTop: 32, marginBottom: 32 }}>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 26, fontWeight: 700, color: "#f0e8dc", marginBottom: 8 }}>
                ¿Qué tan listo estás?
              </h2>
              <p style={{ color: "#666", fontSize: 14 }}>Sé honesto — esto ayuda a los talleres a priorizar tu proyecto.</p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
              {[
                { value: "explorando",  emoji: "👀", label: "Solo explorando",    desc: "Estoy viendo opciones, sin urgencia" },
                { value: "evaluando",   emoji: "🤔", label: "Evaluando opciones", desc: "Comparando talleres y precios" },
                { value: "decidido",    emoji: "✅", label: "Listo para cotizar", desc: "Ya sé lo que quiero, necesito precio" },
                { value: "urgente",     emoji: "🔥", label: "Urgente",            desc: "Necesito empezar muy pronto" },
              ].map((op, i) => (
                <button key={i} onClick={() => setNivelDecision(op.value)} style={{
                  background: nivelDecision === op.value ? "#d4af3715" : "#0f0f0a",
                  border: `1.5px solid ${nivelDecision === op.value ? "#d4af37" : "#1a1a12"}`,
                  borderRadius: 12, padding: "16px 18px", cursor: "pointer",
                  display: "flex", alignItems: "center", gap: 14,
                  transition: "all .2s", textAlign: "left"
                }}>
                  <span style={{ fontSize: 24, flexShrink: 0 }}>{op.emoji}</span>
                  <div>
                    <div style={{ fontWeight: 700, color: nivelDecision === op.value ? "#d4af37" : "#e8e0d0", fontSize: 14, marginBottom: 2 }}>{op.label}</div>
                    <div style={{ fontSize: 12, color: "#555" }}>{op.desc}</div>
                  </div>
                  {nivelDecision === op.value && <div style={{ marginLeft: "auto", color: "#d4af37", fontSize: 16 }}>✓</div>}
                </button>
              ))}
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              <Btn onClick={back} outline style={{ flex: 1 }}>← Atrás</Btn>
              <Btn onClick={next} disabled={!nivelDecision} style={{ flex: 2 }}>Siguiente →</Btn>
            </div>
          </div>
        )}

        {/* ── PASO 7: MEDIDAS (OPCIONAL) ── */}
        {step === 7 && (
          <div className="portal-step">
            <StepLabel step={7} total={TOTAL_STEPS} label="Medidas" />
            <ProgressBar step={7} total={TOTAL_STEPS} />
            <div style={{ marginTop: 32, marginBottom: 24 }}>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 26, fontWeight: 700, color: "#f0e8dc", marginBottom: 8 }}>
                Medidas o croquis <span style={{ color: "#444", fontSize: 18 }}>(opcional)</span>
              </h2>
              <p style={{ color: "#666", fontSize: 14, lineHeight: 1.7 }}>
                Entre más información, más precisa será la cotización. Puedes agregar medidas en texto o subir un croquis.
              </p>
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 11, color: "#555", display: "block", marginBottom: 8, letterSpacing: 1, textTransform: "uppercase" }}>Medidas aproximadas</label>
              <textarea
                value={medidas}
                onChange={e => setMedidas(e.target.value)}
                placeholder={tipoProyecto === "cocina" ? "Ej: Largo 3.20m, Alto 2.40m, Profundidad 0.60m, con isla de 1.80x0.90m" : "Ej: Ancho 2.40m, Alto 2.40m, Profundidad 0.60m"}
                rows={3}
                style={{ width: "100%", background: "#0f0f0a", border: "1px solid #2a2a20", borderRadius: 12, padding: "13px 16px", color: "#e8e0d0", fontSize: 14, resize: "vertical" }}
              />
            </div>

            <div
              onClick={() => sketchRef.current.click()}
              style={{
                border: `2px dashed ${medidasFile ? "#d4af37" : "#2a2a20"}`,
                borderRadius: 12, padding: "20px", textAlign: "center",
                cursor: "pointer", background: "#0f0f0a", marginBottom: 24
              }}
            >
              {medidasFile ? (
                <p style={{ color: "#d4af37", fontWeight: 700, fontSize: 13 }}>✓ {medidasFile.name} · Toca para cambiar</p>
              ) : (
                <div>
                  <div style={{ fontSize: 28, marginBottom: 8 }}>📐</div>
                 <p style={{ color: "#555", fontSize: 13 }}>Subir foto de medidas o dibujito del espacio (opcional)</p>
                </div>
              )}
            </div>
            <input ref={sketchRef} type="file" accept="image/*,.pdf" onChange={e => setMedidasFile(e.target.files[0])} style={{ display: "none" }} />

            <div style={{ display: "flex", gap: 10 }}>
              <Btn onClick={back} outline style={{ flex: 1 }}>← Atrás</Btn>
              <Btn onClick={next} style={{ flex: 2 }}>Continuar →</Btn>
            </div>
          </div>
        )}

        {/* ── PASO 8: DATOS DE CONTACTO ── */}
        {step === 8 && (
          <div className="portal-step">
            <StepLabel step={8} total={TOTAL_STEPS} label="Contacto" />
            <ProgressBar step={8} total={TOTAL_STEPS} />
            <div style={{ marginTop: 32, marginBottom: 24 }}>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 26, fontWeight: 700, color: "#f0e8dc", marginBottom: 8 }}>
                ¿A dónde te mandamos las cotizaciones?
              </h2>
              <p style={{ color: "#666", fontSize: 14 }}>Los talleres te contactarán directamente. Sin spam, prometido.</p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 24 }}>
              {[
                { label: "Nombre", value: nombre, set: setNombre, placeholder: "Tu nombre", type: "text" },
                { label: "WhatsApp / Teléfono", value: telefono, set: setTelefono, placeholder: "81-1234-5678", type: "tel" },
                { label: "Correo electrónico", value: correo, set: setCorreo, placeholder: "correo@ejemplo.com", type: "email" },
              ].map(({ label, value, set, placeholder, type }) => (
                <div key={label}>
                  <label style={{ fontSize: 11, color: "#555", display: "block", marginBottom: 6, letterSpacing: 1, textTransform: "uppercase" }}>{label}</label>
                  <input
                    type={type} value={value} onChange={e => set(e.target.value)} placeholder={placeholder}
                    style={{ width: "100%", background: "#0f0f0a", border: "1px solid #2a2a20", borderRadius: 12, padding: "13px 16px", color: "#e8e0d0", fontSize: 14 }}
                  />
                </div>
              ))}
            </div>

            <div style={{ background: "#0f0f0a", border: "1px solid #1a1a12", borderRadius: 12, padding: 14, marginBottom: 24, fontSize: 12, color: "#555", lineHeight: 1.7 }}>
              🔒 Tu información solo se comparte con talleres verificados de EnKaje Pro. No la vendemos ni la usamos para publicidad.
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              <Btn onClick={back} outline style={{ flex: 1 }}>← Atrás</Btn>
              <Btn
                onClick={async () => { await guardarExpediente(); next(); }}
                disabled={!nombre || !telefono || saving}
                style={{ flex: 2 }}
              >
                {saving ? "Guardando..." : "Solicitar cotizaciones →"}
              </Btn>
            </div>
          </div>
        )}

        {/* ── PASO 9: CONFIRMACIÓN ── */}
        {step === 9 && (
          <div className="portal-step" style={{ textAlign: "center", paddingTop: 32 }}>
            <div style={{ fontSize: 56, marginBottom: 20 }}>🎉</div>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 30, fontWeight: 900, color: "#f0e8dc", marginBottom: 12 }}>
              ¡Expediente enviado!
            </h2>
            <p style={{ color: "#888", fontSize: 15, lineHeight: 1.8, maxWidth: 440, margin: "0 auto 32px" }}>
              Los talleres verificados de EnKaje Pro en Monterrey recibirán tu proyecto y te contactarán pronto con cotizaciones.
            </p>

            {/* Resumen */}
            <div style={{ background: "#0f0f0a", border: "1px solid #d4af3730", borderRadius: 16, padding: 24, textAlign: "left", marginBottom: 24 }}>
              <div style={{ fontSize: 11, color: "#d4af37", fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 }}>Tu expediente</div>
              {renderUrl && (
                <div style={{ position: "relative", borderRadius: 10, overflow: "hidden", marginBottom: 16 }}>
                  <img src={renderUrl} alt="Render" style={{ width: "100%", maxHeight: 200, objectFit: "cover" }} />
                  {sinCuenta && <Watermark />}
                </div>
              )}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {[
                  ["Proyecto", `${TIPOS_PROYECTO.find(t=>t.key===tipoProyecto)?.emoji} ${TIPOS_PROYECTO.find(t=>t.key===tipoProyecto)?.label}`],
                  ["Estilo", ESTILOS.find(e=>e.key===estilo)?.label],
                  ["Inversión", `$${(RANGOS[tipoProyecto]?.min||0).toLocaleString("es-MX")} – $${(RANGOS[tipoProyecto]?.max||0).toLocaleString("es-MX")}`],
                  ["Decisión", nivelDecision],
                ].map(([l,v],i) => (
                  <div key={i} style={{ background: "#0a0a08", borderRadius: 8, padding: 10 }}>
                    <div style={{ fontSize: 10, color: "#444", marginBottom: 3, textTransform: "uppercase", letterSpacing: 1 }}>{l}</div>
                    <div style={{ fontSize: 13, color: "#e8e0d0", fontWeight: 600, textTransform: "capitalize" }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>

            {sinCuenta && (
              <div style={{ background: "linear-gradient(135deg,#1a1208,#0f0f0a)", border: "1px solid #d4af3740", borderRadius: 16, padding: 24, marginBottom: 24 }}>
                <div style={{ fontSize: 11, color: "#d4af37", fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>🔓 Desbloquea tu render</div>
                <p style={{ color: "#888", fontSize: 13, lineHeight: 1.7, marginBottom: 16 }}>
                  Crea una cuenta gratis y descarga tu render sin marca de agua, además de 2 generaciones adicionales.
                </p>
                <a href="/app" style={{
                  display: "block", background: "#d4af37", color: "#000", borderRadius: 12,
                  padding: "13px 24px", fontWeight: 900, fontSize: 14, textDecoration: "none",
                  letterSpacing: 0.5
                }}>Crear cuenta gratis →</a>
              </div>
            )}

            <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
              <Btn onClick={() => { setStep(0); setTipo(""); setFoto(null); setFotoUrl(null); setEstilo(""); setRenderUrl(null); setFechaInicio(""); setNivelDecision(""); setMedidas(""); setNombre(""); setTelefono(""); setCorreo(""); setSaved(false); }} outline style={{ fontSize: 13 }}>
                Nuevo proyecto
              </Btn>
              <Btn onClick={() => {
                const msg = `Hola! Acabo de solicitar cotización en EnKaje Pro para mi proyecto de ${TIPOS_PROYECTO.find(t=>t.key===tipoProyecto)?.label} estilo ${ESTILOS.find(e=>e.key===estilo)?.label}. ¿Me pueden ayudar?`;
                window.open(`https://wa.me/https://wa.me/528127176786?text=${encodeURIComponent(msg)}`, "_blank");
              }} color="#25D366" textColor="#fff" style={{ fontSize: 13 }}>
                💬 Contactar por WhatsApp
              </Btn>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
