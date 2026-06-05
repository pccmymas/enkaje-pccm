import { useState, useRef, useEffect } from "react";

// ─── CONSTANTES ───────────────────────────────────────────────────────────────
const SUPABASE_URL = "https://iucoggyualkyojmmgael.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml1Y29nZ3l1YWxreW9qbW1nYWVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAwMTMxOTMsImV4cCI6MjA5NTU4OTE5M30.QNU604KcLaSxXxoZaxmVbt-sf-aFDTjrVoTR4K-wy5c";

const sb = async (path, opts = {}) => {
  const sep = path.includes("?") ? "&" : "?";
  const url = `${SUPABASE_URL}/rest/v1/${path}${sep}apikey=${SUPABASE_KEY}`;
  const r = await fetch(url, {
    method: opts.method || "GET",
    headers: {
      "apikey": SUPABASE_KEY,
      "Authorization": `Bearer ${SUPABASE_KEY}`,
      "Content-Type": "application/json",
      "Prefer": "return=minimal"
    },
    body: opts.body
  });
  const text = await r.text();
  try { return JSON.parse(text); } catch { return text; }
};

const TIPOS_PROYECTO = [
  { key: "cocina",     label: "Cocina",      emoji: "🍳", desc: "Integral, isla, americana" },
  { key: "closet",     label: "Closet",      emoji: "👔", desc: "Walk-in, empotrado, vestidor" },
  { key: "puerta",     label: "Puerta",      emoji: "🚪", desc: "Interior, exterior, cancelería" },
  { key: "mueble",     label: "Mueble",      emoji: "🛋️", desc: "TV, librero, comedor, bar" },
  { key: "panel",      label: "Panel",       emoji: "🪵", desc: "Lambrin, decorativo, duela" },
  { key: "bano",       label: "Baño",        emoji: "🚿", desc: "Vanity, mueble flotante, espejo" },
];

const ESTILOS = [
  { key: "moderno",       label: "Moderno",        desc: "Líneas limpias, colores neutros",    emoji: "⬜", color: "#e8e0d0" },
  { key: "minimalista",   label: "Minimalista",     desc: "Lo esencial, espacios abiertos",     emoji: "◻️", color: "#ffffff" },
  { key: "contemporaneo", label: "Contemporáneo",   desc: "Mezcla de estilos actuales",         emoji: "🔷", color: "#d0d8e8" },
  { key: "industrial",    label: "Industrial",      desc: "Metal, madera cruda, urbano",        emoji: "⚙️", color: "#888" },
  { key: "clasico",       label: "Clásico",         desc: "Molduras, detalles ornamentales",    emoji: "🏛️", color: "#d4af37" },
  { key: "rustico",       label: "Rústico",         desc: "Madera natural, texturas orgánicas", emoji: "🌿", color: "#8B6914" },
  { key: "nordico",       label: "Nórdico",         desc: "Blanco, madera clara, acogedor",     emoji: "❄️", color: "#c0d8e0" },
  { key: "lujo",          label: "Lujo / Premium",  desc: "Materiales nobles, exclusividad",    emoji: "✨", color: "#d4af37" },
];

const COLORES = [
  { key: "blanco_mate",  label: "Blanco mate",   hex: "#F5F5F0" },
  { key: "negro_mate",   label: "Negro mate",    hex: "#1a1a1a" },
  { key: "gris",         label: "Gris",          hex: "#888888" },
  { key: "madera_clara", label: "Madera clara",  hex: "#C8A96E" },
  { key: "madera_oscura",label: "Madera oscura", hex: "#5C3D1E" },
  { key: "verde_salvia", label: "Verde salvia",  hex: "#8FAF8F" },
  { key: "azul_marino",  label: "Azul marino",   hex: "#2C3E6B" },
  { key: "beige",        label: "Beige",         hex: "#E8D5B0" },
];

const ACABADOS = ["Mate", "Alto brillo", "Satinado", "Tipo madera", "Lacado", "Texturizado"];

const RANGOS = {
  cocina:  { min: 35000,  max: 120000 },
  closet:  { min: 18000,  max: 65000  },
  puerta:  { min: 8000,   max: 28000  },
  mueble:  { min: 12000,  max: 55000  },
  panel:   { min: 6000,   max: 35000  },
  bano:    { min: 12000,  max: 50000  },
};

const TIEMPOS = {
  cocina:  "20 a 35 días hábiles",
  closet:  "15 a 20 días hábiles",
  puerta:  "8 a 15 días hábiles",
  mueble:  "15 a 25 días hábiles",
  panel:   "5 a 10 días hábiles",
  bano:    "10 a 18 días hábiles",
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

function calcularScore({ nivel_decision, foto_url, medidas, fecha_inicio, descripcion }) {
  let score = 0;
  if (nivel_decision === "urgente")   score += 40;
  if (nivel_decision === "decidido")  score += 30;
  if (nivel_decision === "evaluando") score += 15;
  if (nivel_decision === "explorando")score += 5;
  if (foto_url)    score += 20;
  if (medidas)     score += 10;
  if (descripcion) score += 10;
  if (fecha_inicio)score += 20;
  return Math.min(score, 100);
}

function scoreLabel(score) {
  if (score >= 80) return "prioritario";
  if (score >= 55) return "listo";
  if (score >= 30) return "evaluando";
  return "en_exploracion";
}

// ─── CSS ─────────────────────────────────────────────────────────────────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@300;400;500;600&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'DM Sans', sans-serif; background: #070708; color: #e8e0d0; }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-thumb { background: #d4af3740; border-radius: 2px; }
  input, textarea, button { font-family: 'DM Sans', sans-serif; }
  @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
  @keyframes spin { from { transform:rotate(0deg); } to { transform:rotate(360deg); } }
  .portal-step { animation: fadeUp 0.45s ease forwards; }
`;

const ProgressBar = ({ step, total }) => (
  <div style={{ width:"100%", height:3, background:"#1a1a12", borderRadius:2, overflow:"hidden", marginBottom:8 }}>
    <div style={{ height:"100%", width:`${(step/total)*100}%`, background:"linear-gradient(90deg,#d4af37,#f0c84a)", borderRadius:2, transition:"width 0.5s ease" }} />
  </div>
);

const StepLabel = ({ step, total, label }) => (
  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:6 }}>
    <span style={{ fontSize:11, color:"#d4af37", fontWeight:600, letterSpacing:2, textTransform:"uppercase" }}>{label}</span>
    <span style={{ fontSize:11, color:"#444" }}>{step} / {total}</span>
  </div>
);

const Btn = ({ onClick, children, disabled, outline, color="#d4af37", style={} }) => (
  <button onClick={onClick} disabled={disabled} style={{
    background: outline ? "transparent" : disabled ? "#1a1a12" : color,
    color: outline ? color : disabled ? "#444" : "#000",
    border: `1.5px solid ${disabled ? "#2a2a20" : color}`,
    borderRadius:12, padding:"13px 28px", fontWeight:700, fontSize:14,
    cursor: disabled ? "not-allowed" : "pointer", transition:"all .2s",
    letterSpacing:0.5, ...style
  }}>{children}</button>
);

const Watermark = () => (
  <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center", pointerEvents:"none", zIndex:10 }}>
    <div style={{ fontFamily:"'Playfair Display',serif", fontSize:22, fontWeight:900, color:"rgba(212,175,55,0.35)", letterSpacing:4, transform:"rotate(-30deg)", userSelect:"none", whiteSpace:"nowrap" }}>
      EnKaje Pro · Vista Previa
    </div>
  </div>
);

// ─── PORTAL ──────────────────────────────────────────────────────────────────
export default function Portal() {
  const TOTAL_STEPS = 8;
  const [step, setStep]               = useState(0);
  const [tipoProyecto, setTipo]       = useState("");
  const [foto, setFoto]               = useState(null);
  const [fotoUrl, setFotoUrl]         = useState(null);
  const [descripcion, setDescripcion] = useState("");
  const [estilo, setEstilo]           = useState("");
  const [colorElegido, setColor]      = useState("");
  const [acabado, setAcabado]         = useState("");
  const [renderUrl, setRenderUrl]     = useState(null);
  const [renderLoading, setRenderLoading] = useState(false);
  const [renderMsg, setRenderMsg]     = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [nivelDecision, setNivelDecision] = useState("");
  const [medidas, setMedidas]         = useState("");
  const [nombre, setNombre]           = useState("");
  const [telefono, setTelefono]       = useState("");
  const [correo, setCorreo]           = useState("");
  const [saving, setSaving]           = useState(false);
  const [sinCuenta]                   = useState(true);
  const [renderBloqueado, setRenderBloqueado] = useState(false); 
  const fileRef = useRef();

  useEffect(() => { document.title = "Portal Cliente · EnKaje Pro"; }, []);

  const handleFoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFoto(file);
    setFotoUrl(URL.createObjectURL(file));
  };

 const generarRender = async () => {
  if (!estilo || !tipoProyecto) return;
  const LIMITE = sinCuenta ? 1 : 3;
  const usados = parseInt(localStorage.getItem("enkaje_renders") || "0", 10);
  if (usados >= LIMITE) { setRenderBloqueado(true); return; }
  setRenderLoading(true);
    setRenderMsg("");
    setRenderUrl(null);
    const estiloData = ESTILOS.find(e => e.key === estilo);
    const tipoLabel = tipoProyecto === "cocina" ? "kitchen" : tipoProyecto === "closet" ? "walk-in closet" : tipoProyecto === "puerta" ? "interior door" : tipoProyecto === "mueble" ? "custom furniture" : tipoProyecto === "panel" ? "decorative wall panel" : "bathroom vanity";
    const colorLabel = COLORES.find(c => c.key === colorElegido)?.label || "";
  const colorInstruccion = colorLabel
      ? `Apply ${colorLabel} color ONLY to cabinet doors and drawer fronts. Do NOT add wood grain or brown tones unless explicitly requested.`
      : "";
    const acabadoInstruccion = acabado
      ? `Cabinet finish must be ${acabado}. Apply this finish strictly, no substitutions.`
      : "";
    const prompt = [
      `Photorealistic interior design render. Transform this exact space keeping the SAME room dimensions, SAME counter position, SAME appliance locations, SAME layout.`,
      `Project type: custom ${tipoLabel}.`,
      `Style: ${estiloData?.label} — ${estiloData?.desc}.`,
      colorInstruccion,
      acabadoInstruccion,
      descripcion && `Client specifications: ${descripcion}.`,
      `Materials: ${MATERIALES_SUGERIDOS[estilo]}.`,
      `Strict rules: maintain exact spatial layout, do not add furniture that was not in original photo, do not change room shape or window positions.`,
      `Quality: dramatic professional lighting, high-end Monterrey Mexico home, architectural photography, 4K ultra detailed.`
    ].filter(Boolean).join(" ");

    try {
     let fotoBase64 = null;
      if (foto) {
        fotoBase64 = await new Promise((resolve) => {
         const canvas = document.createElement("canvas");
const img = new Image();
img.onload = () => {
  const maxSize = 400;
  let w = img.width, h = img.height;
  if (w > h) { h = Math.round(h * maxSize / w); w = maxSize; }
  else { w = Math.round(w * maxSize / h); h = maxSize; }
  canvas.width = w; canvas.height = h;
  canvas.getContext("2d").drawImage(img, 0, 0, w, h);
  resolve(canvas.toDataURL("image/jpeg", 0.5).split(",")[1]);
};
img.src = URL.createObjectURL(foto);
        });
      }
      const res = await fetch("/api/image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
       body: JSON.stringify({ prompt, image: fotoBase64 })
      });
      const data = await res.json();
      const imgData = data.data?.data?.[0] || data.data?.[0];
      const imgUrl  = imgData?.url;
      const imgB64  = imgData?.b64_json;

      if (imgUrl) {
        setRenderUrl(imgUrl);
        setRenderMsg("✅ Render generado");
      } else if (imgB64) {
        // Subir a Supabase Storage
        try {
          const byteString = atob(imgB64);
          const ab = new ArrayBuffer(byteString.length);
          const ia = new Uint8Array(ab);
          for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);
          const blob = new Blob([ab], { type: "image/png" });
          const fileName = `render_${Date.now()}.png`;
          const uploadRes = await fetch(`${SUPABASE_URL}/storage/v1/object/renders/${fileName}`, {
            method: "POST",
            headers: {
              "apikey": SUPABASE_KEY,
              "Authorization": `Bearer ${SUPABASE_KEY}`,
              "Content-Type": "image/png",
              "x-upsert": "true"
            },
            body: blob
          });
          if (uploadRes.ok) {
            const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/renders/${fileName}`;
            setRenderUrl(publicUrl);
            localStorage.setItem("enkaje_renders", String(usados + 1));
            setRenderMsg("✅ Render generado");
          } else {
            // Si falla el upload, usar base64 local
            setRenderUrl("data:image/png;base64," + imgB64);
            localStorage.setItem("enkaje_renders", String(usados + 1));
            localStorage.setItem("enkaje_renders", String(usados + 1));
            setRenderMsg("✅ Render generado");
          }
        } catch {
          setRenderUrl("data:image/png;base64," + imgB64);
          setRenderMsg("✅ Render generado");
        }
      } else {
        setRenderMsg("❌ " + (data?.error?.message || "Error al generar"));
      }
    } catch(e) { setRenderMsg("❌ " + e.message); }
    setRenderLoading(false);
  };

  const guardarExpediente = async () => {
    setSaving(true);
    const resumen = `🆕 *NUEVO LEAD — EnKaje Pro*\n\n📋 Proyecto: ${tipoProyecto.toUpperCase()}\n🎨 Estilo: ${estilo}\n🎨 Color: ${colorElegido}\n📝 Descripción: ${descripcion || "no especificada"}\n👤 Nombre: ${nombre}\n📱 Tel: ${telefono}\n📧 Correo: ${correo}\n📅 Fecha deseada: ${fechaInicio}\n🎯 Decisión: ${nivelDecision}\n📐 Medidas: ${medidas || "no especificadas"}\n💰 Rango: $${(RANGOS[tipoProyecto]?.min||0).toLocaleString("es-MX")} – $${(RANGOS[tipoProyecto]?.max||0).toLocaleString("es-MX")} MXN\n\nenkajepro.com`;
    window.open(`https://wa.me/528127176786?text=${encodeURIComponent(resumen)}`, "_blank");
    const rango = RANGOS[tipoProyecto] || { min:0, max:0 };
    try {
      const score = calcularScore({ nivel_decision: nivelDecision, foto_url: fotoUrl, medidas, fecha_inicio: fechaInicio, descripcion });
      const label = scoreLabel(score);
      const payload = {
        tipo_proyecto:        tipoProyecto,
        foto_url:             fotoUrl || null,
        render_url:           (renderUrl && !renderUrl.startsWith("data:")) ? renderUrl : null,
        estilo_elegido:       estilo,
        materiales_sugeridos: [MATERIALES_SUGERIDOS[estilo], colorElegido && `Color: ${colorElegido}`, acabado && `Acabado: ${acabado}`].filter(Boolean).join(" | "),
        rango_inversion_min:  rango.min,
        rango_inversion_max:  rango.max,
        tiempo_fabricacion:   TIEMPOS[tipoProyecto] || null,
        fecha_inicio_deseada: fechaInicio || null,
        nivel_decision:       nivelDecision,
        medidas_sketch_url:   medidas || null,
        observaciones:        `Nombre: ${nombre} | Tel: ${telefono} | Correo: ${correo} | Desc: ${descripcion}`,
        score,
        score_label:          label,
        estado_lead:          "nuevo",
        created_at:           new Date().toISOString(),
      };
      await sb("expedientes", { method:"POST", body:JSON.stringify(payload) });
    } catch(e) { console.error("ERROR:", e); }
    setSaving(false);
  };

  const next = () => setStep(s => Math.min(s+1, TOTAL_STEPS));
  const back = () => setStep(s => Math.max(s-1, 0));
  const reset = () => { setStep(0); setTipo(""); setFoto(null); setFotoUrl(null); setDescripcion(""); setEstilo(""); setColor(""); setAcabado(""); setRenderUrl(null); setRenderMsg(""); setFechaInicio(""); setNivelDecision(""); setMedidas(""); setNombre(""); setTelefono(""); setCorreo(""); };

  return (
    <>
      <style>{CSS}</style>

      {/* HEADER */}
      <div style={{ position:"sticky", top:0, zIndex:100, background:"rgba(7,7,8,0.95)", backdropFilter:"blur(12px)", borderBottom:"1px solid #d4af3718", padding:"14px 24px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <a href="/" style={{ textDecoration:"none" }}>
          <span style={{ fontFamily:"'Playfair Display',serif", fontSize:20, fontWeight:900, color:"#d4af37", letterSpacing:2 }}>EnKaje</span>
          <span style={{ fontFamily:"'Playfair Display',serif", fontSize:13, color:"#c8a97a", marginLeft:4, letterSpacing:3 }}>PRO</span>
        </a>
        {step > 0 && step < TOTAL_STEPS && (
          <div style={{ flex:1, maxWidth:300, margin:"0 24px" }}>
            <ProgressBar step={step} total={TOTAL_STEPS} />
          </div>
        )}
       <a href="/app" onClick={() => { sessionStorage.removeItem("enkaje_token"); sessionStorage.removeItem("enkaje_user"); sessionStorage.removeItem("enkaje_role"); sessionStorage.removeItem("enkaje_tab"); }} style={{ fontSize:12, color:"#555", textDecoration:"none", border:"1px solid #2a2a20", borderRadius:8, padding:"6px 14px" }}>Soy un taller →</a>
      </div>

      <div style={{ maxWidth:680, margin:"0 auto", padding:"32px 20px 80px" }}>

        {/* PASO 0 — INTRO + TIPO */}
        {step === 0 && (
          <div className="portal-step" style={{ textAlign:"center", paddingTop:32 }}>
            <div style={{ fontSize:48, marginBottom:16 }}>🪵</div>
            <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:36, fontWeight:900, color:"#f0e8dc", lineHeight:1.15, marginBottom:16 }}>
              Visualiza tu proyecto<br /><span style={{ color:"#d4af37" }}>antes de gastar un peso</span>
            </h1>
            <p style={{ fontSize:15, color:"#888", lineHeight:1.8, maxWidth:460, margin:"0 auto 36px" }}>
              Describe tu idea, sube una foto del espacio y nuestra IA genera un render personalizado en segundos. Gratis, sin compromiso.
            </p>
            <p style={{ fontSize:12, color:"#555", marginBottom:20, letterSpacing:2, textTransform:"uppercase" }}>¿Qué quieres crear?</p>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10, maxWidth:480, margin:"0 auto 32px" }}>
              {TIPOS_PROYECTO.map(t => (
                <button key={t.key} onClick={() => { setTipo(t.key); setTimeout(() => next(), 150); }} style={{
                  background: tipoProyecto === t.key ? "#d4af3720" : "#0f0f0a",
                  border: `1.5px solid ${tipoProyecto === t.key ? "#d4af37" : "#1a1a12"}`,
                  borderRadius:14, padding:"18px 10px", cursor:"pointer",
                  color: tipoProyecto === t.key ? "#d4af37" : "#888",
                  transition:"all .2s", textAlign:"center"
                }}>
                  <div style={{ fontSize:28, marginBottom:6 }}>{t.emoji}</div>
                  <div style={{ fontWeight:700, fontSize:13, marginBottom:2 }}>{t.label}</div>
                  <div style={{ fontSize:10, color:"#444", lineHeight:1.4 }}>{t.desc}</div>
                </button>
              ))}
            </div>
            <p style={{ fontSize:11, color:"#333" }}>Sin registro · Sin tarjeta · 100% gratis</p>
          </div>
        )}

        {/* PASO 1 — FOTO + DESCRIPCIÓN */}
        {step === 1 && (
          <div className="portal-step">
            <StepLabel step={1} total={TOTAL_STEPS} label="Tu idea" />
            <ProgressBar step={1} total={TOTAL_STEPS} />
            <div style={{ marginTop:28, marginBottom:20 }}>
              <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:26, fontWeight:700, color:"#f0e8dc", marginBottom:8 }}>
                Cuéntanos tu idea
              </h2>
              <p style={{ color:"#666", fontSize:14, lineHeight:1.7 }}>
                Entre más detalles nos des, más preciso será el render. Puedes subir una foto del espacio actual y/o describir lo que tienes en mente.
              </p>
            </div>

            {/* Subir foto */}
            <div onClick={() => fileRef.current.click()} style={{
              border: `2px dashed ${fotoUrl ? "#d4af37" : "#2a2a20"}`,
              borderRadius:16, padding: fotoUrl ? 0 : "36px 24px",
              textAlign:"center", cursor:"pointer", background:"#0f0f0a",
              overflow:"hidden", minHeight:180, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:16
            }}>
              {fotoUrl ? (
                <div style={{ position:"relative", width:"100%" }}>
                  <img src={fotoUrl} alt="Tu espacio" style={{ width:"100%", maxHeight:300, objectFit:"cover", display:"block", borderRadius:14 }} />
                  <div style={{ position:"absolute", bottom:12, right:12, background:"#d4af37", color:"#000", borderRadius:8, padding:"6px 12px", fontSize:12, fontWeight:700 }}>✓ Foto cargada · Toca para cambiar</div>
                </div>
              ) : (
                <div>
                  <div style={{ fontSize:36, marginBottom:10 }}>📷</div>
                  <p style={{ color:"#555", fontSize:14, marginBottom:6 }}>Sube una foto del espacio (opcional)</p>
                  <p style={{ color:"#333", fontSize:12 }}>JPG, PNG · Máximo 10MB</p>
                </div>
              )}
            </div>
            <input ref={fileRef} type="file" accept="image/*" onChange={handleFoto} style={{ display:"none" }} />

            {/* Descripción */}
            <div style={{ marginBottom:24 }}>
              <label style={{ fontSize:11, color:"#555", display:"block", marginBottom:8, letterSpacing:1, textTransform:"uppercase" }}>
                Describe lo que quieres <span style={{ color:"#333" }}>(opcional pero muy útil)</span>
              </label>
              <textarea
                value={descripcion}
                onChange={e => setDescripcion(e.target.value)}
                placeholder={
                  tipoProyecto === "cocina" ? "Ej: Quiero una cocina negra mate con isla blanca, cubierta de cuarzo, sin manijas, iluminación LED debajo de los muebles superiores..." :
                  tipoProyecto === "closet" ? "Ej: Closet walk-in con puertas de vidrio, iluminación LED interior, cajones en el centro, color gris claro..." :
                  tipoProyecto === "bano"   ? "Ej: Vanity flotante con LED inferior efecto levitación, color blanco mate, espejo con luz, tarja submontada negra..." :
                  "Describe el color, materiales, estilo, dimensiones aproximadas o cualquier detalle que tengas en mente..."
                }
                rows={4}
                style={{ width:"100%", background:"#0f0f0a", border:"1px solid #2a2a20", borderRadius:12, padding:"13px 16px", color:"#e8e0d0", fontSize:14, resize:"vertical", lineHeight:1.6 }}
              />
              <p style={{ fontSize:11, color:"#333", marginTop:6 }}>💡 Ejemplo: "negro mate con herrajes dorados, sin manijas, con isla de 1.80m"</p>
            </div>

            <div style={{ display:"flex", gap:10 }}>
              <Btn onClick={back} outline style={{ flex:1 }}>← Atrás</Btn>
              <Btn onClick={next} style={{ flex:2 }}>Continuar →</Btn>
            </div>
          </div>
        )}

        {/* PASO 2 — ESTILO + COLOR + ACABADO */}
        {step === 2 && (
          <div className="portal-step">
            <StepLabel step={2} total={TOTAL_STEPS} label="Estilo y color" />
            <ProgressBar step={2} total={TOTAL_STEPS} />
            <div style={{ marginTop:28, marginBottom:20 }}>
              <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:26, fontWeight:700, color:"#f0e8dc", marginBottom:8 }}>
                Elige el estilo y color
              </h2>
              <p style={{ color:"#666", fontSize:14 }}>Esto define la personalidad visual de tu proyecto.</p>
            </div>

            {/* Estilos */}
            <div style={{ marginBottom:24 }}>
              <label style={{ fontSize:11, color:"#d4af37", fontWeight:700, letterSpacing:2, textTransform:"uppercase", display:"block", marginBottom:12 }}>Estilo de diseño</label>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
                {ESTILOS.map(e => (
                  <button key={e.key} onClick={() => setEstilo(e.key)} style={{
                    background: estilo === e.key ? "#d4af3715" : "#0f0f0a",
                    border: `1.5px solid ${estilo === e.key ? "#d4af37" : "#1a1a12"}`,
                    borderRadius:12, padding:"14px", cursor:"pointer", textAlign:"left",
                    transition:"all .2s", boxShadow: estilo === e.key ? "0 0 16px #d4af3820" : "none"
                  }}>
                    <div style={{ fontSize:20, marginBottom:4 }}>{e.emoji}</div>
                    <div style={{ fontWeight:700, color: estilo === e.key ? "#d4af37" : "#e8e0d0", fontSize:13, marginBottom:2 }}>{e.label}</div>
                    <div style={{ fontSize:11, color:"#555" }}>{e.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Colores */}
            <div style={{ marginBottom:20 }}>
              <label style={{ fontSize:11, color:"#d4af37", fontWeight:700, letterSpacing:2, textTransform:"uppercase", display:"block", marginBottom:12 }}>Color principal <span style={{ color:"#333", fontWeight:400 }}>(opcional)</span></label>
              <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
                {COLORES.map(c => (
                  <button key={c.key} onClick={() => setColor(colorElegido === c.key ? "" : c.key)} style={{
                    display:"flex", alignItems:"center", gap:8,
                    background: colorElegido === c.key ? "#d4af3715" : "#0f0f0a",
                    border: `1.5px solid ${colorElegido === c.key ? "#d4af37" : "#1a1a12"}`,
                    borderRadius:20, padding:"7px 14px", cursor:"pointer", transition:"all .2s"
                  }}>
                    <div style={{ width:14, height:14, borderRadius:"50%", background:c.hex, border:"1px solid #ffffff20", flexShrink:0 }} />
                    <span style={{ fontSize:12, color: colorElegido === c.key ? "#d4af37" : "#888", fontWeight: colorElegido === c.key ? 700 : 400 }}>{c.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Acabado */}
            <div style={{ marginBottom:24 }}>
              <label style={{ fontSize:11, color:"#d4af37", fontWeight:700, letterSpacing:2, textTransform:"uppercase", display:"block", marginBottom:12 }}>Acabado <span style={{ color:"#333", fontWeight:400 }}>(opcional)</span></label>
              <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                {ACABADOS.map(a => (
                  <button key={a} onClick={() => setAcabado(acabado === a ? "" : a)} style={{
                    background: acabado === a ? "#d4af3715" : "#0f0f0a",
                    border: `1.5px solid ${acabado === a ? "#d4af37" : "#1a1a12"}`,
                    borderRadius:20, padding:"8px 16px", cursor:"pointer",
                    color: acabado === a ? "#d4af37" : "#888",
                    fontSize:13, fontWeight: acabado === a ? 700 : 400, transition:"all .2s"
                  }}>{a}</button>
                ))}
              </div>
            </div>

            <div style={{ display:"flex", gap:10 }}>
              <Btn onClick={back} outline style={{ flex:1 }}>← Atrás</Btn>
              <Btn onClick={async () => { next(); await generarRender(); }} disabled={!estilo} style={{ flex:2 }}>
                🤖 Generar render con IA →
              </Btn>
            </div>
          </div>
        )}

        {/* PASO 3 — RENDER */}
        {step === 3 && (
          <div className="portal-step">
            <StepLabel step={3} total={TOTAL_STEPS} label="Tu render" />
            <ProgressBar step={3} total={TOTAL_STEPS} />
            <div style={{ marginTop:28, marginBottom:20 }}>
              <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:26, fontWeight:700, color:"#f0e8dc", marginBottom:8 }}>Tu propuesta visual</h2>
              <p style={{ color:"#666", fontSize:14 }}>Así podría verse tu proyecto terminado.</p>
            </div>
            {renderBloqueado && (
  <div style={{ background:"#1a0808", border:"1px solid #d4af3740", borderRadius:16, padding:32, textAlign:"center", marginBottom:16 }}>
    <div style={{ fontSize:36, marginBottom:12 }}>🔒</div>
    <h3 style={{ fontFamily:"'Playfair Display',serif", color:"#f0e8dc", fontSize:20, marginBottom:8 }}>
      {sinCuenta ? "Ya usaste tu render gratuito" : "Llegaste al límite de renders"}
    </h3>
    <p style={{ color:"#666", fontSize:13, lineHeight:1.7, marginBottom:20 }}>
      {sinCuenta
        ? "Crea una cuenta gratis y obtén 3 renders sin marca de agua."
        : "Has usado tus 3 renders del mes. Actualiza tu plan para más."}
    </p>
    {sinCuenta && (
      <a href="/app" style={{ display:"block", background:"#d4af37", color:"#000", borderRadius:12, padding:"13px 24px", fontWeight:900, fontSize:14, textDecoration:"none" }}>
        Crear cuenta gratis → 3 renders
      </a>
    )}
  </div>
)}
{renderLoading && (
            {renderLoading && (
              <div style={{ background:"#0f0f0a", border:"1px solid #d4af3730", borderRadius:16, padding:"60px 24px", textAlign:"center" }}>
                <div style={{ width:40, height:40, border:"3px solid #d4af3730", borderTop:"3px solid #d4af37", borderRadius:"50%", animation:"spin 1s linear infinite", margin:"0 auto 20px" }} />
                <p style={{ color:"#d4af37", fontWeight:700, fontSize:14, marginBottom:8 }}>Generando tu render personalizado...</p>
                <p style={{ color:"#444", fontSize:12 }}>15-30 segundos</p>
              </div>
            )}

            {!renderLoading && renderUrl && (
              <>
                <div style={{ position:"relative", borderRadius:16, overflow:"hidden", border:"1px solid #d4af3730", marginBottom:16 }}>
                  <img src={renderUrl} alt="Render" style={{ width:"100%", display:"block" }} />
                  {sinCuenta && <Watermark />}
                  {sinCuenta && (
                    <div style={{ position:"absolute", bottom:0, left:0, right:0, background:"linear-gradient(transparent,rgba(7,7,8,0.95))", padding:"40px 20px 20px", textAlign:"center" }}>
                      <p style={{ fontSize:12, color:"#d4af37", fontWeight:700 }}>🔓 Crea cuenta gratis para descargar sin marca de agua</p>
                    </div>
                  )}
                </div>
                <div style={{ background:"#0f0f0a", border:"1px solid #1a1a12", borderRadius:16, padding:20, marginBottom:16 }}>
                  <div style={{ fontSize:11, color:"#d4af37", fontWeight:700, letterSpacing:2, textTransform:"uppercase", marginBottom:14 }}>
                    Detalles · {ESTILOS.find(e=>e.key===estilo)?.label} {colorElegido && `· ${COLORES.find(c=>c.key===colorElegido)?.label}`}
                  </div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
                    {[
                      ["Materiales", MATERIALES_SUGERIDOS[estilo]],
                      ["Tiempo estimado", TIEMPOS[tipoProyecto]],
                      ["Inversión aprox.", `$${(RANGOS[tipoProyecto]?.min||0).toLocaleString("es-MX")} – $${(RANGOS[tipoProyecto]?.max||0).toLocaleString("es-MX")} MXN`],
                      ["Mantenimiento", ["lujo","clasico"].includes(estilo) ? "Alto" : ["rustico","industrial"].includes(estilo) ? "Medio" : "Bajo"],
                    ].map(([l,v],i) => (
                      <div key={i} style={{ background:"#0a0a08", borderRadius:10, padding:12 }}>
                        <div style={{ fontSize:10, color:"#555", letterSpacing:1, textTransform:"uppercase", marginBottom:4 }}>{l}</div>
                        <div style={{ fontSize:12, color:"#e8e0d0", fontWeight:600, lineHeight:1.5 }}>{v}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop:12, background:"#1a1208", border:"1px solid #d4af3720", borderRadius:10, padding:12, fontSize:12, color:"#888" }}>
                    💡 Este render es una propuesta referencial. El resultado final lo define el taller al cotizarte.
                  </div>
                </div>
              </>
            )}

            {!renderLoading && !renderUrl && renderMsg && (
              <div style={{ background:"#1a0a0a", border:"1px solid #f4433640", borderRadius:12, padding:20, textAlign:"center", marginBottom:16 }}>
                <p style={{ color:"#f44336", fontSize:13, marginBottom:12 }}>{renderMsg}</p>
                <Btn onClick={generarRender} style={{ fontSize:13 }}>Reintentar</Btn>
              </div>
            )}

            <div style={{ display:"flex", gap:10, marginTop:8 }}>
              <Btn onClick={back} outline style={{ flex:1 }}>← Atrás</Btn>
              <Btn onClick={next} disabled={renderLoading} style={{ flex:2 }}>
                {renderLoading ? "Generando..." : "Ver inversión estimada →"}
              </Btn>
            </div>
          </div>
        )}

        {/* PASO 4 — INVERSIÓN */}
        {step === 4 && (
          <div className="portal-step">
            <StepLabel step={4} total={TOTAL_STEPS} label="Inversión" />
            <ProgressBar step={4} total={TOTAL_STEPS} />
            <div style={{ marginTop:28, marginBottom:28 }}>
              <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:26, fontWeight:700, color:"#f0e8dc", marginBottom:8 }}>Rango de inversión estimada</h2>
              <p style={{ color:"#666", fontSize:14, lineHeight:1.7 }}>Basado en proyectos similares en Monterrey. El precio final lo define el taller.</p>
            </div>
            <div style={{ background:"linear-gradient(135deg,#1a1208,#0f0f0a)", border:"1px solid #d4af3730", borderRadius:20, padding:"32px 24px", textAlign:"center", marginBottom:20 }}>
              <div style={{ fontSize:11, color:"#d4af37", letterSpacing:3, textTransform:"uppercase", marginBottom:12 }}>
                {TIPOS_PROYECTO.find(t=>t.key===tipoProyecto)?.emoji} {TIPOS_PROYECTO.find(t=>t.key===tipoProyecto)?.label} · {ESTILOS.find(e=>e.key===estilo)?.label}
              </div>
              <div style={{ fontFamily:"'Playfair Display',serif", fontSize:40, fontWeight:900, color:"#d4af37", marginBottom:8 }}>
                ${(RANGOS[tipoProyecto]?.min||0).toLocaleString("es-MX")} – ${(RANGOS[tipoProyecto]?.max||0).toLocaleString("es-MX")}
              </div>
              <div style={{ fontSize:13, color:"#555" }}>MXN · Fabricación e instalación</div>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10, marginBottom:24 }}>
              {[
                ["Anticipo típico","60%",`$${Math.round((RANGOS[tipoProyecto]?.min||0)*0.6).toLocaleString("es-MX")}`],
                ["Tiempo",TIEMPOS[tipoProyecto],"hábiles"],
                ["Garantía","6 meses","instalación"],
              ].map(([l,v,s],i) => (
                <div key={i} style={{ background:"#0f0f0a", border:"1px solid #1a1a12", borderRadius:12, padding:"14px 10px", textAlign:"center" }}>
                  <div style={{ fontSize:10, color:"#444", letterSpacing:1, textTransform:"uppercase", marginBottom:6 }}>{l}</div>
                  <div style={{ fontSize:15, fontWeight:900, color:"#e8e0d0" }}>{v}</div>
                  <div style={{ fontSize:10, color:"#555", marginTop:2 }}>{s}</div>
                </div>
              ))}
            </div>
            <div style={{ display:"flex", gap:10 }}>
              <Btn onClick={back} outline style={{ flex:1 }}>← Atrás</Btn>
              <Btn onClick={next} style={{ flex:2 }}>¿Cuándo lo necesitas? →</Btn>
            </div>
          </div>
        )}

        {/* PASO 5 — FECHA */}
        {step === 5 && (
          <div className="portal-step">
            <StepLabel step={5} total={TOTAL_STEPS} label="Fecha" />
            <ProgressBar step={5} total={TOTAL_STEPS} />
            <div style={{ marginTop:28, marginBottom:28 }}>
              <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:26, fontWeight:700, color:"#f0e8dc", marginBottom:8 }}>¿Cuándo quieres que empiece?</h2>
              <p style={{ color:"#666", fontSize:14 }}>Ayuda a los talleres a planificar su agenda.</p>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:20 }}>
              {[
                { label:"Lo antes posible", value:new Date().toISOString().split("T")[0], emoji:"🔥" },
                { label:"Este mes", value:new Date(Date.now()+14*24*60*60*1000).toISOString().split("T")[0], emoji:"📅" },
                { label:"El próximo mes", value:new Date(Date.now()+35*24*60*60*1000).toISOString().split("T")[0], emoji:"🗓️" },
                { label:"Estoy explorando", value:new Date(Date.now()+90*24*60*60*1000).toISOString().split("T")[0], emoji:"👀" },
              ].map((op,i) => (
                <button key={i} onClick={() => setFechaInicio(op.value)} style={{
                  background: fechaInicio===op.value ? "#d4af3715" : "#0f0f0a",
                  border: `1.5px solid ${fechaInicio===op.value ? "#d4af37" : "#1a1a12"}`,
                  borderRadius:12, padding:"16px 14px", cursor:"pointer",
                  color: fechaInicio===op.value ? "#d4af37" : "#888",
                  fontWeight: fechaInicio===op.value ? 700 : 400,
                  fontSize:14, transition:"all .2s", textAlign:"left"
                }}>
                  <span style={{ fontSize:20, marginRight:8 }}>{op.emoji}</span>{op.label}
                </button>
              ))}
            </div>
            <div style={{ marginBottom:24 }}>
              <label style={{ fontSize:11, color:"#555", display:"block", marginBottom:8, letterSpacing:1, textTransform:"uppercase" }}>O elige fecha específica</label>
              <input type="date" value={fechaInicio} onChange={e => setFechaInicio(e.target.value)} min={new Date().toISOString().split("T")[0]}
                style={{ width:"100%", background:"#0f0f0a", border:"1px solid #2a2a20", borderRadius:12, padding:"13px 16px", color:"#e8e0d0", fontSize:14 }} />
            </div>
            <div style={{ display:"flex", gap:10 }}>
              <Btn onClick={back} outline style={{ flex:1 }}>← Atrás</Btn>
              <Btn onClick={next} style={{ flex:2 }}>Siguiente →</Btn>
            </div>
          </div>
        )}

        {/* PASO 6 — NIVEL DECISIÓN */}
        {step === 6 && (
          <div className="portal-step">
            <StepLabel step={6} total={TOTAL_STEPS} label="Tu decisión" />
            <ProgressBar step={6} total={TOTAL_STEPS} />
            <div style={{ marginTop:28, marginBottom:28 }}>
              <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:26, fontWeight:700, color:"#f0e8dc", marginBottom:8 }}>¿Qué tan listo estás?</h2>
              <p style={{ color:"#666", fontSize:14 }}>Sé honesto — esto ayuda a los talleres a priorizar tu proyecto.</p>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:24 }}>
              {[
                { value:"explorando", emoji:"👀", label:"Solo explorando",    desc:"Estoy viendo opciones, sin urgencia" },
                { value:"evaluando",  emoji:"🤔", label:"Evaluando opciones", desc:"Comparando talleres y precios" },
                { value:"decidido",   emoji:"✅", label:"Listo para cotizar", desc:"Ya sé lo que quiero, necesito precio" },
                { value:"urgente",    emoji:"🔥", label:"Urgente",            desc:"Necesito empezar muy pronto" },
              ].map((op,i) => (
                <button key={i} onClick={() => setNivelDecision(op.value)} style={{
                  background: nivelDecision===op.value ? "#d4af3715" : "#0f0f0a",
                  border: `1.5px solid ${nivelDecision===op.value ? "#d4af37" : "#1a1a12"}`,
                  borderRadius:12, padding:"16px 18px", cursor:"pointer",
                  display:"flex", alignItems:"center", gap:14, transition:"all .2s"
                }}>
                  <span style={{ fontSize:24, flexShrink:0 }}>{op.emoji}</span>
                  <div style={{ flex:1, textAlign:"left" }}>
                    <div style={{ fontWeight:700, color: nivelDecision===op.value ? "#d4af37" : "#e8e0d0", fontSize:14, marginBottom:2 }}>{op.label}</div>
                    <div style={{ fontSize:12, color:"#555" }}>{op.desc}</div>
                  </div>
                  {nivelDecision===op.value && <span style={{ color:"#d4af37" }}>✓</span>}
                </button>
              ))}
            </div>
            <div style={{ display:"flex", gap:10 }}>
              <Btn onClick={back} outline style={{ flex:1 }}>← Atrás</Btn>
              <Btn onClick={next} disabled={!nivelDecision} style={{ flex:2 }}>Siguiente →</Btn>
            </div>
          </div>
        )}

        {/* PASO 7 — CONTACTO */}
        {step === 7 && (
          <div className="portal-step">
            <StepLabel step={7} total={TOTAL_STEPS} label="Contacto" />
            <ProgressBar step={7} total={TOTAL_STEPS} />
            <div style={{ marginTop:28, marginBottom:24 }}>
              <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:26, fontWeight:700, color:"#f0e8dc", marginBottom:8 }}>¿A dónde te mandamos las cotizaciones?</h2>
              <p style={{ color:"#666", fontSize:14 }}>Los talleres te contactarán directamente. Sin spam, prometido.</p>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:14, marginBottom:16 }}>
              {[
                { label:"Nombre", value:nombre, set:setNombre, placeholder:"Tu nombre", type:"text" },
                { label:"WhatsApp / Teléfono", value:telefono, set:setTelefono, placeholder:"81-1234-5678", type:"tel" },
                { label:"Correo electrónico", value:correo, set:setCorreo, placeholder:"correo@ejemplo.com", type:"email" },
              ].map(({ label, value, set, placeholder, type }) => (
                <div key={label}>
                  <label style={{ fontSize:11, color:"#555", display:"block", marginBottom:6, letterSpacing:1, textTransform:"uppercase" }}>{label}</label>
                  <input type={type} value={value} onChange={e => set(e.target.value)} placeholder={placeholder}
                    style={{ width:"100%", background:"#0f0f0a", border:"1px solid #2a2a20", borderRadius:12, padding:"13px 16px", color:"#e8e0d0", fontSize:14 }} />
                </div>
              ))}
            </div>

            {/* Medidas opcionales */}
            <div style={{ marginBottom:20 }}>
              <label style={{ fontSize:11, color:"#555", display:"block", marginBottom:8, letterSpacing:1, textTransform:"uppercase" }}>Medidas aproximadas <span style={{ color:"#333", fontWeight:400 }}>(opcional)</span></label>
              <textarea value={medidas} onChange={e => setMedidas(e.target.value)}
                placeholder={tipoProyecto === "cocina" ? "Ej: Largo 3.20m, Alto 2.40m, Profundidad 0.60m" : "Ej: Ancho 2.40m, Alto 2.40m, Profundidad 0.60m"}
                rows={2} style={{ width:"100%", background:"#0f0f0a", border:"1px solid #2a2a20", borderRadius:12, padding:"13px 16px", color:"#e8e0d0", fontSize:14, resize:"vertical" }} />
            </div>

            <div style={{ background:"#0f0f0a", border:"1px solid #1a1a12", borderRadius:12, padding:14, marginBottom:24, fontSize:12, color:"#555", lineHeight:1.7 }}>
              🔒 Tu información solo se comparte con talleres verificados de EnKaje Pro. No la vendemos ni la usamos para publicidad.
            </div>
            <div style={{ display:"flex", gap:10 }}>
              <Btn onClick={back} outline style={{ flex:1 }}>← Atrás</Btn>
              <Btn onClick={async () => { await guardarExpediente(); next(); }} disabled={!nombre || !telefono || saving} style={{ flex:2 }}>
                {saving ? "Guardando..." : "Solicitar cotizaciones →"}
              </Btn>
            </div>
          </div>
        )}

        {/* PASO 8 — CONFIRMACIÓN */}
        {step === 8 && (
          <div className="portal-step" style={{ textAlign:"center", paddingTop:32 }}>
            <div style={{ fontSize:56, marginBottom:20 }}>🎉</div>
            <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:30, fontWeight:900, color:"#f0e8dc", marginBottom:12 }}>¡Expediente enviado!</h2>
            <p style={{ color:"#888", fontSize:15, lineHeight:1.8, maxWidth:440, margin:"0 auto 32px" }}>
              Los talleres verificados de EnKaje Pro en Monterrey recibirán tu proyecto y te contactarán pronto.
            </p>
            <div style={{ background:"#0f0f0a", border:"1px solid #d4af3730", borderRadius:16, padding:24, textAlign:"left", marginBottom:24 }}>
              <div style={{ fontSize:11, color:"#d4af37", fontWeight:700, letterSpacing:2, textTransform:"uppercase", marginBottom:16 }}>Tu expediente</div>
              {renderUrl && (
                <div style={{ position:"relative", borderRadius:10, overflow:"hidden", marginBottom:16 }}>
                  <img src={renderUrl} alt="Render" style={{ width:"100%", maxHeight:220, objectFit:"cover" }} />
                  {sinCuenta && <Watermark />}
                </div>
              )}
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
                {[
                  ["Proyecto", `${TIPOS_PROYECTO.find(t=>t.key===tipoProyecto)?.emoji} ${TIPOS_PROYECTO.find(t=>t.key===tipoProyecto)?.label}`],
                  ["Estilo", ESTILOS.find(e=>e.key===estilo)?.label],
                  ["Color", COLORES.find(c=>c.key===colorElegido)?.label || "No especificado"],
                  ["Decisión", nivelDecision],
                  ["Inversión", `$${(RANGOS[tipoProyecto]?.min||0).toLocaleString("es-MX")} – $${(RANGOS[tipoProyecto]?.max||0).toLocaleString("es-MX")}`],
                  ["Tiempo", TIEMPOS[tipoProyecto]],
                ].map(([l,v],i) => (
                  <div key={i} style={{ background:"#0a0a08", borderRadius:8, padding:10 }}>
                    <div style={{ fontSize:10, color:"#444", marginBottom:3, textTransform:"uppercase", letterSpacing:1 }}>{l}</div>
                    <div style={{ fontSize:12, color:"#e8e0d0", fontWeight:600, textTransform:"capitalize" }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
            {sinCuenta && (
              <div style={{ background:"linear-gradient(135deg,#1a1208,#0f0f0a)", border:"1px solid #d4af3740", borderRadius:16, padding:24, marginBottom:24 }}>
                <div style={{ fontSize:11, color:"#d4af37", fontWeight:700, letterSpacing:2, textTransform:"uppercase", marginBottom:12 }}>🔓 Desbloquea tu render</div>
                <p style={{ color:"#888", fontSize:13, lineHeight:1.7, marginBottom:16 }}>Crea una cuenta gratis y descarga tu render sin marca de agua, además de 2 generaciones adicionales.</p>
                <a href="/app" style={{ display:"block", background:"#d4af37", color:"#000", borderRadius:12, padding:"13px 24px", fontWeight:900, fontSize:14, textDecoration:"none" }}>Crear cuenta gratis →</a>
              </div>
            )}
            <div style={{ display:"flex", gap:10, justifyContent:"center", flexWrap:"wrap" }}>
              <Btn onClick={reset} outline style={{ fontSize:13 }}>Nuevo proyecto</Btn>
              <Btn onClick={() => {
                const msg = `Hola! Acabo de solicitar cotización en EnKaje Pro para mi proyecto de ${TIPOS_PROYECTO.find(t=>t.key===tipoProyecto)?.label} estilo ${ESTILOS.find(e=>e.key===estilo)?.label}. ¿Me pueden ayudar?`;
                window.open(`https://wa.me/528127176786?text=${encodeURIComponent(msg)}`, "_blank");
              }} color="#25D366" textColor="#fff" style={{ fontSize:13 }}>
                💬 Hablar por WhatsApp
              </Btn>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
