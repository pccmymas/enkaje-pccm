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
  { key: "cocina",  label: "Cocina",  emoji: "🍳", desc: "Integral, isla, americana",    base: "/moderno.png" },
  { key: "closet",  label: "Closet",  emoji: "👔", desc: "Walk-in, empotrado, vestidor", base: "/tipo-closet.png" },
  { key: "puerta",  label: "Puerta",  emoji: "🚪", desc: "Interior, exterior, cancelería",base: "/tipo-puerta.png" },
  { key: "mueble",  label: "Mueble",  emoji: "🛋️", desc: "TV, librero, comedor, bar",    base: "/tipo-entretenimiento.png" },
  { key: "panel",   label: "Panel",   emoji: "🪵", desc: "Lambrin, decorativo, duela",   base: "/tipo-entretenimiento.png" },
  { key: "bano",    label: "Baño",    emoji: "🚿", desc: "Vanity, mueble flotante, espejo",base: "/tipo-bano.png" },
];

const ESTILOS = [
  { key: "moderno",       label: "Moderno",       desc: "Líneas limpias, sin adornos",    foto: "/moderno.png",       prompt_hint: "modern clean lines, flat panel cabinets, neutral tones, hidden hardware" },
  { key: "minimalista",   label: "Minimalista",   desc: "Lo esencial, espacios abiertos", foto: "/minimalista.png",   prompt_hint: "minimalist, handleless cabinets, push-open doors, white matte, open space" },
  { key: "contemporaneo", label: "Contemporáneo", desc: "Mezcla de estilos actuales",     foto: "/contemporaneo.png", prompt_hint: "contemporary style, mix of wood and lacquer, porcelain countertop" },
  { key: "industrial",    label: "Industrial",    desc: "Metal, madera cruda, urbano",    foto: "/industrial.png",    prompt_hint: "industrial style, raw wood, black matte metal hardware, exposed textures, urban loft" },
  { key: "clasico",       label: "Clásico",       desc: "Molduras, detalles ornamentales",foto: "/clasico.png",       prompt_hint: "classic style, raised panel doors, ornamental moldings, solid wood, warm tones" },
  { key: "rustico",       label: "Rústico",       desc: "Madera natural, texturas orgánicas",foto: "/rustico.png",    prompt_hint: "rustic style, natural pine or cedar wood, visible grain, organic textures, warm earthy tones" },
  { key: "nordico",       label: "Nórdico",       desc: "Blanco, madera clara, acogedor", foto: "/nordico.png",       prompt_hint: "scandinavian nordic style, white cabinets, light birch wood accents, cozy warm lighting" },
  { key: "lujo",          label: "Lujo / Premium",desc: "Materiales nobles, exclusividad",foto: "/lujo.png",          prompt_hint: "luxury premium style, veined marble countertop, gold brass hardware, noble wood veneer, dramatic lighting" },
];

const COLORES = [
  { key: "blanco_mate",   label: "Blanco mate",   hex: "#F5F5F0", desc: "Limpio, atemporal",    prompt: "white matte cabinets" },
  { key: "negro_mate",    label: "Negro mate",    hex: "#1a1a1a", desc: "Dramático, elegante",   prompt: "black matte cabinets" },
  { key: "gris",          label: "Gris",          hex: "#888888", desc: "Neutro, versátil",      prompt: "grey cabinets" },
  { key: "madera_clara",  label: "Madera clara",  hex: "#C8A96E", desc: "Cálido, natural",       prompt: "light wood oak finish cabinets" },
  { key: "madera_oscura", label: "Madera oscura", hex: "#5C3D1E", desc: "Rico, sofisticado",     prompt: "dark walnut wood finish cabinets" },
  { key: "verde_salvia",  label: "Verde salvia",  hex: "#8FAF8F", desc: "Fresco, de tendencia",  prompt: "sage green cabinets" },
  { key: "azul_marino",   label: "Azul marino",   hex: "#2C3E6B", desc: "Profundo, premium",     prompt: "navy blue cabinets" },
  { key: "beige",         label: "Beige",         hex: "#E8D5B0", desc: "Suave, acogedor",       prompt: "warm beige cabinets" },
];

const ACABADOS = [
  { key: "mate",        label: "Mate",        desc: "Sin brillo, antihuella", foto: "/acabados.png", pos: "0% 0%",    prompt: "matte finish, no gloss, fingerprint resistant surface" },
  { key: "alto_brillo", label: "Alto brillo", desc: "Brillante, moderno",     foto: "/acabados.png", pos: "50% 0%",   prompt: "high gloss finish, reflective shiny surface, lacquered" },
  { key: "satinado",    label: "Satinado",    desc: "Suave, intermedio",      foto: "/acabados.png", pos: "100% 0%",  prompt: "satin finish, soft sheen, semi-gloss" },
  { key: "tipo_madera", label: "Tipo madera", desc: "Veta natural visible",   foto: "/acabados.png", pos: "0% 100%",  prompt: "wood grain texture finish, natural veneer look, visible wood grain pattern" },
  { key: "lacado",      label: "Lacado",      desc: "Color sólido, premium",  foto: "/acabados.png", pos: "50% 100%", prompt: "lacquered finish, solid color, premium painted surface" },
  { key: "texturizado", label: "Texturizado", desc: "Relieves táctiles",      foto: "/acabados.png", pos: "100% 100%",prompt: "textured finish, embossed surface, tactile relief pattern" },
];

// ─── MATERIALES CON FOTO ── ordenados de más económico a más premium ──────────
const MATERIALES = [
  {
    key: "melamina",
    label: "Melamina",
    desc: "Liso + veta madera · Lo más popular",
    badge: "💚 Más económico",
    badgeColor: "#4caf50",
    foto: "/mat-melamina.png",
    color: "#4caf50",
    prompt: "melamine board finish, smooth uniform surface, economic and durable material",
    info: "El material más usado en Monterrey. Disponible en cientos de colores lisos y también en acabados tipo madera. Resistente a la humedad y fácil de limpiar.",
  },
  {
    key: "mdf",
    label: "MDF lacado",
    desc: "Acabado fino · Colores exactos",
    badge: "🔵 Precio medio",
    badgeColor: "#00bcd4",
    foto: "/mat-mdf.png",
    color: "#00bcd4",
    prompt: "MDF lacquered finish, smooth painted surface, premium color finish",
    info: "Permite colores sólidos perfectamente lisos y uniformes. Mejor acabado que la melamina — ideal si el color y la presentación son prioridad. Se pinta en el tono exacto que quieras.",
  },
  {
    key: "enchapado",
    label: "Madera enchapada",
    desc: "Aspecto madera · Precio medio-alto",
    badge: "🟡 Medio-alto",
    badgeColor: "#d4af37",
    foto: "/mat-enchapado.png",
    color: "#d4af37",
    prompt: "wood veneer finish, real wood surface layer on MDF base, natural wood appearance",
    info: "Capa real de madera sobre base de MDF. Tiene la calidez y veta natural de la madera sólida a un costo más accesible. Muy usado en proyectos de diseño de alto impacto visual.",
  },
  {
    key: "madera_solida",
    label: "Madera sólida",
    desc: "Premium · Máxima durabilidad",
    badge: "⭐ Premium",
    badgeColor: "#f0a500",
    foto: "/mat-madera.png",
    color: "#f0a500",
    prompt: "solid wood construction, natural grain visible, premium hardwood material",
    info: "La opción de mayor valor y durabilidad. Cada pieza es única — la veta natural nunca se repite. Puede restaurarse y repintarse con los años. Inversión que dura décadas.",
  },
];

// ─── IMÁGENES BASE POR TIPO (cuando no hay foto del cliente) ──────────────────
const BASE_POR_TIPO = {
  cocina:  "/moderno.png",
  closet:  "/tipo-closet.png",
  puerta:  "/tipo-puerta.png",
  mueble:  "/tipo-entretenimiento.png",
  panel:   "/tipo-entretenimiento.png",
  bano:    "/tipo-bano.png",
};

// ─── PREGUNTAS DE VIDA ────────────────────────────────────────────────────────
const PREGUNTAS_VIDA = [
  {
    key: "ninos_mascotas",
    pregunta: "¿Hay niños o mascotas en casa?",
    opciones: [
      { value: "si_ninos",    emoji: "👶",    label: "Sí, niños",    prompt: "child-safe design, no sharp island corners, scratch-resistant durable materials, soft-close hinges" },
      { value: "si_mascotas", emoji: "🐾",    label: "Sí, mascotas", prompt: "pet-friendly materials, easy to clean surfaces, durable scratch-resistant finish" },
      { value: "ambos",       emoji: "👨‍👩‍👧🐕", label: "Ambos",       prompt: "child and pet safe, no sharp edges, extra durable easy-clean surfaces" },
      { value: "no",          emoji: "🧑‍💼",   label: "No",           prompt: "" },
    ]
  },
  {
    key: "limpieza",
    pregunta: "¿Cuánto tiempo quieres dedicar a limpiar?",
    opciones: [
      { value: "minimo",  emoji: "⚡", label: "Lo mínimo",          prompt: "anti-fingerprint matte finish, handleless Gola profile, easy-clean seamless surfaces, no ornamental moldings" },
      { value: "normal",  emoji: "🧹", label: "Limpieza normal",    prompt: "easy maintenance surfaces, practical finish" },
      { value: "detalle", emoji: "✨", label: "Me gusta el detalle", prompt: "decorative details acceptable, premium finish" },
    ]
  },
  {
    key: "cocina_uso",
    pregunta: "¿Cómo usan la cocina principalmente?",
    opciones: [
      { value: "cocino_mucho", emoji: "👨‍🍳", label: "Cocinamos seguido",   prompt: "heavy-use kitchen, durable countertop quartz or granite, strong ventilation hood, oil-resistant surfaces" },
      { value: "basico",       emoji: "🥗",  label: "Uso básico diario",   prompt: "practical everyday kitchen, standard laminate countertop" },
      { value: "social",       emoji: "🥂",  label: "Para recibir visitas", prompt: "open concept kitchen for entertaining, island or peninsula, aesthetic statement piece" },
    ]
  },
];

const RANGOS = {
  cocina: { min: 35000, max: 120000 },
  closet: { min: 18000, max: 65000  },
  puerta: { min: 8000,  max: 28000  },
  mueble: { min: 12000, max: 55000  },
  panel:  { min: 6000,  max: 35000  },
  bano:   { min: 12000, max: 50000  },
};

const TIEMPOS = {
  cocina: "20 a 35 días hábiles",
  closet: "15 a 20 días hábiles",
  puerta: "8 a 15 días hábiles",
  mueble: "15 a 25 días hábiles",
  panel:  "5 a 10 días hábiles",
  bano:   "10 a 18 días hábiles",
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
  if (nivel_decision === "urgente")    score += 40;
  if (nivel_decision === "decidido")   score += 30;
  if (nivel_decision === "evaluando")  score += 15;
  if (nivel_decision === "explorando") score += 5;
  if (foto_url)     score += 20;
  if (medidas)      score += 10;
  if (descripcion)  score += 10;
  if (fecha_inicio) score += 20;
  return Math.min(score, 100);
}

function scoreLabel(score) {
  if (score >= 80) return "prioritario";
  if (score >= 55) return "listo";
  if (score >= 30) return "evaluando";
  return "en_exploracion";
}

// ─── GENERAR DESCRIPCIÓN IA ───────────────────────────────────────────────────
async function generarDescripcionIA({ tipoProyecto, estilo, color, acabado, material, vidaResp, descripcion }) {
  const estiloData   = ESTILOS.find(e => e.key === estilo);
  const colorData    = COLORES.find(c => c.key === color);
  const acabadoData  = ACABADOS.find(a => a.key === acabado);
  const materialData = MATERIALES.find(m => m.key === material);
  const tipoData     = TIPOS_PROYECTO.find(t => t.key === tipoProyecto);

  const vidaResumen = PREGUNTAS_VIDA.map(p => {
    const r = vidaResp[p.key];
    const op = p.opciones.find(o => o.value === r);
    return op ? op.label : null;
  }).filter(Boolean).join(", ");

  const prompt = `Eres un diseñador de interiores experto en carpintería residencial en Monterrey, México. 
Escribe una descripción de 3-4 oraciones en español, en segunda persona (tú), sobre este proyecto de carpintería.
Sé específico, cálido y práctico. Menciona cómo el diseño se adapta a su estilo de vida.

Datos del proyecto:
- Tipo: ${tipoData?.label}
- Estilo: ${estiloData?.label} (${estiloData?.desc})
- Color: ${colorData?.label || "no especificado"}
- Acabado: ${acabadoData?.label || "no especificado"}
- Material: ${materialData?.label || "no especificado"} — ${materialData?.info || ""}
- Perfil del hogar: ${vidaResumen || "no especificado"}
- Notas del cliente: ${descripcion || "ninguna"}

Responde SOLO la descripción, sin títulos ni listas. Máximo 4 oraciones.`;

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 300,
        messages: [{ role: "user", content: prompt }]
      })
    });
    const data = await res.json();
    return data.content?.[0]?.text?.trim() || null;
  } catch { return null; }
}

// ─── CSS ──────────────────────────────────────────────────────────────────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@300;400;500;600&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'DM Sans', sans-serif; background: #070708; color: #e8e0d0; }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-thumb { background: #d4af3740; border-radius: 2px; }
  input, textarea, button { font-family: 'DM Sans', sans-serif; }
  @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
  @keyframes spin { from { transform:rotate(0deg); } to { transform:rotate(360deg); } }
  @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.5; } }
  .portal-step { animation: fadeUp 0.45s ease forwards; }
  .estilo-card:hover { border-color: #d4af3780 !important; transform: translateY(-2px); }
  .acabado-card:hover { border-color: #d4af3780 !important; }
  .color-chip:hover { transform: scale(1.05); }
  .vida-btn:hover { border-color: #d4af3780 !important; }
  .mat-card:hover { border-color: #d4af3780 !important; transform: translateY(-2px); }
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
  const [material, setMaterial]       = useState("");
  const [vidaResp, setVidaResp]       = useState({});
  const [renderUrl, setRenderUrl]     = useState(null);
  const [renderLoading, setRenderLoading] = useState(false);
  const [renderMsg, setRenderMsg]     = useState("");
  const [descripcionIA, setDescripcionIA] = useState(null);
  const [descripcionLoading, setDescripcionLoading] = useState(false);
  const [fechaInicio, setFechaInicio] = useState("");
  const [nivelDecision, setNivelDecision] = useState("");
  const [medidas, setMedidas]         = useState("");
  const [nombre, setNombre]           = useState("");
  const [telefono, setTelefono]       = useState("");
  const [correo, setCorreo]           = useState("");
  const [saving, setSaving]           = useState(false);
  const [renderBloqueado, setRenderBloqueado] = useState(false);
  const [guardadoEnPerfil, setGuardadoEnPerfil] = useState(false);
  const [guardandoPerfil, setGuardandoPerfil]   = useState(false);
  const fileRef = useRef();

  // Detectar si tiene cuenta activa
  const tieneCuenta = !!sessionStorage.getItem("enkaje_token");
  const sinCuenta = !tieneCuenta;
  const LIMITE_RENDERS = tieneCuenta ? 3 : 1;
  // Clave de localStorage separada por tipo de usuario
  const STORAGE_KEY = tieneCuenta ? "enkaje_renders_cuenta" : "enkaje_renders";

  useEffect(() => {
    document.title = "Portal Cliente · EnKaje Pro";
    // Si tiene cuenta y nunca ha usado renders de cuenta, inicializar en 0
    if (tieneCuenta && !localStorage.getItem("enkaje_renders_cuenta")) {
      localStorage.setItem("enkaje_renders_cuenta", "0");
    }
  }, []);

  const handleFoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFoto(file);
    setFotoUrl(URL.createObjectURL(file));
  };

  const buildVidaPromptHints = () => {
    return PREGUNTAS_VIDA.map(p => {
      const respKey = vidaResp[p.key];
      if (!respKey) return "";
      const opcion = p.opciones.find(o => o.value === respKey);
      return opcion?.prompt || "";
    }).filter(Boolean).join(", ");
  };

  const descargarRender = async () => {
    if (!renderUrl) return;
    try {
      const res = await fetch(renderUrl);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `enkaje-render-${tipoProyecto}-${estilo}-${Date.now()}.png`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      // Si falla el fetch (CORS), abrir en nueva pestaña
      window.open(renderUrl, "_blank");
    }
  };

  const guardarEnPerfil = async () => {
    if (!tieneCuenta || !renderUrl || guardadoEnPerfil) return;
    setGuardandoPerfil(true);
    const token = sessionStorage.getItem("enkaje_token");
    const user  = JSON.parse(sessionStorage.getItem("enkaje_user") || "{}");
    const materialData = MATERIALES.find(m => m.key === material);
    const acabadoData  = ACABADOS.find(a => a.key === acabado);
    const vidaResumen  = PREGUNTAS_VIDA.map(p => {
      const r = vidaResp[p.key];
      const op = p.opciones.find(o => o.value === r);
      return op ? op.label : null;
    }).filter(Boolean).join(", ");
    const rango = RANGOS[tipoProyecto] || { min:0, max:0 };
    try {
      const payload = {
        tipo_proyecto:        tipoProyecto,
        render_url:           renderUrl.startsWith("data:") ? null : renderUrl,
        estilo_elegido:       estilo,
        materiales_sugeridos: [MATERIALES_SUGERIDOS[estilo], colorElegido && `Color: ${colorElegido}`, acabadoData && `Acabado: ${acabadoData.label}`, materialData && `Material: ${materialData.label}`].filter(Boolean).join(" | "),
        rango_inversion_min:  rango.min,
        rango_inversion_max:  rango.max,
        tiempo_fabricacion:   TIEMPOS[tipoProyecto] || null,
        nivel_decision:       "explorando",
        observaciones:        `Guardado desde portal | Vida: ${vidaResumen} | Desc: ${descripcion} | DescIA: ${descripcionIA || ""}`,
        score:                30,
        score_label:          "evaluando",
        estado_lead:          "guardado",
        user_id:              user?.id || null,
        created_at:           new Date().toISOString(),
      };
      const url = `${SUPABASE_URL}/rest/v1/expedientes?apikey=${SUPABASE_KEY}`;
      await fetch(url, {
        method: "POST",
        headers: {
          "apikey": SUPABASE_KEY,
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
          "Prefer": "return=minimal"
        },
        body: JSON.stringify(payload)
      });
      setGuardadoEnPerfil(true);
    } catch(e) { console.error("Error guardando en perfil:", e); }
    setGuardandoPerfil(false);
  };

  const generarRender = async () => {
    if (!estilo || !tipoProyecto) return;
    const usados = parseInt(localStorage.getItem(STORAGE_KEY) || "0", 10);
    if (usados >= LIMITE_RENDERS) { setRenderBloqueado(true); return; }
    setRenderLoading(true);
    setRenderMsg("");
    setRenderUrl(null);
    setDescripcionIA(null);

    const estiloData   = ESTILOS.find(e => e.key === estilo);
    const colorData    = COLORES.find(c => c.key === colorElegido);
    const acabadoData  = ACABADOS.find(a => a.key === acabado);
    const materialData = MATERIALES.find(m => m.key === material);
    const vidaHints    = buildVidaPromptHints();

    // ── Contexto específico por tipo de proyecto ─────────────────────────────
    const TIPO_CONTEXT = {
      cocina: {
        subject: "custom kitchen (cocina integral)",
        elements: "kitchen cabinets, upper and lower cabinet doors, drawer fronts, island if applicable, countertop, backsplash, integrated appliances",
        layout_hint: "Show full kitchen from a wide angle — upper cabinets, lower cabinets, countertop, backsplash, and appliances all visible.",
        lighting: "LED strips under upper cabinets illuminating the countertop, recessed ceiling spots, warm 2700K-3000K. Classic Monterrey premium kitchen lighting.",
        material_target: "cabinet doors and drawer fronts",
        detail: `Kitchen layout: upper wall cabinets and lower base cabinets with countertop. Island or peninsula if space allows. Integrated hood or ceiling-mounted extraction. Countertop in quartz or porcelain slab — light grey or white veined. Backsplash in large format tile or stone slab. Integrated appliances flush with cabinet faces. Hardware: handleless push-open OR matte black bar pulls — consistent throughout. Toe kick detail at base. Soft-close hinges implied. Plinth lighting or under-cabinet LED strips active in render.`,
      },
      closet: {
        subject: "custom walk-in closet or built-in wardrobe (closet a medida)",
        elements: "closet door panels or open system, hanging rails at two heights, folded clothing shelves, shoe display area, drawer bank, internal LED strip lighting, full-length mirror panel",
        layout_hint: "Show the full closet wall or walk-in interior — hanging section, shelving, drawers, and internal lighting all visible. Clothing neatly organized inside.",
        lighting: "Internal LED strip lighting mounted inside the closet illuminating hanging clothes and shelves from above. Warm 2700K glow creating luxury boutique feel. Recessed ceiling spot outside. The interior of the closet glows warmly.",
        material_target: "closet door panels, drawer fronts, and shelf edge banding",
        detail: `Closet interior organization: double hanging rail section for shirts and jackets, long hang section for dresses and pants, open shelving for folded items, full-length mirror panel on one side, 3-4 drawer bank for accessories. Shoe display shelf with individual slots or open floating shelves. All interior surfaces in the same material and color as door fronts for cohesion. LED strip mounted at top interior edge. Hardware: minimal brushed nickel or matte black. Interior looks like a luxury boutique fitting room.`,
      },
      puerta: {
        subject: "custom interior door (puerta interior a medida)",
        elements: "full height door panel with design detail, solid door frame and architrave, premium door handle set, door closer hardware, wall context on both sides",
        layout_hint: "Show the door as the absolute hero of the image — full height from floor to ceiling visible, with 50cm of wall visible on each side. Room behind slightly visible through door if ajar. Dramatic lighting.",
        lighting: "Dramatic directional side lighting raking across the door surface to reveal texture, grain, or panel depth. Warm ambient room light from both sides. The door surface is the focal point — lighting must make the material beautiful.",
        material_target: "door panel face and frame surface",
        detail: `Door design: full height flush panel OR grooved/slat design OR raised panel design — depending on style. Floor-to-ceiling height (2.40m minimum). Door frame and architrave in matching or contrasting material. Hardware: lever handle in matte black or brushed gold depending on style — premium quality feel. If solid wood or veneer: grain direction runs vertically on door panel. If MDF lacado: perfectly smooth painted surface. Door has visible weight and solidity — not hollow-core look. Hinge detail visible at frame. Threshold transition clean at floor level.`,
      },
      mueble: {
        subject: "custom entertainment center and TV wall (mueble de entretenimiento a medida)",
        elements: "TV panel with floating TV mount, flanking tall cabinets with closed doors and open display niches, floating media console below TV, integrated LED lighting behind TV and inside niches, decorative objects in open shelves",
        layout_hint: "Show the full entertainment wall — TV centered at eye level, tall flanking units, floating console below, open niches with objects. The LED lighting behind TV creates a dramatic halo effect. Wide angle shot showing the complete wall.",
        lighting: "LED strip behind TV panel creating warm halo glow — this is the signature element. LED inside open display niches illuminating objects from above. Recessed ceiling spots. All warm 2700K. Deep shadows between cabinet sections. The wall feels dramatic and luxurious.",
        material_target: "cabinet door panels, floating console faces, and decorative panel surfaces",
        detail: `TV wall layout: TV mounted floating at center, surrounded by full-height custom millwork. Flanking towers with mix of closed cabinet doors (lower) and open display niches (upper). Floating console/credenza below TV at 40cm height. Open niches have LED strip inside at top — showcasing books, plants, decorative objects. Background wall behind TV panel in contrasting texture: fluted wood panel, stone slab, or microcement. Console has thin legs or floating mount — reveals floor beneath. Hardware: handleless push-open or integrated Gola profile. The overall composition feels like a high-end hotel lobby feature wall.`,
      },
      panel: {
        subject: "custom decorative wall panel or lambrin (panel decorativo / lambrin a medida)",
        elements: "full wall decorative panel system, vertical or horizontal slat design OR solid panel with texture, integrated LED lighting strip, clean transition to ceiling and floor",
        layout_hint: "Show the full decorative wall as the hero — floor to ceiling, full width visible. The panel texture, depth, and lighting are everything. Show it in context with the room — sofa in front if living room, bed headboard context if bedroom.",
        lighting: "Grazing light from ceiling-mounted LED strip at top of panel — light washes down the surface revealing every ridge, groove, and texture detail. LED strip hidden at top edge creating a warm curtain of light down the panel face. Side lighting from room lamps adds depth. This lighting is critical — it transforms a flat panel into a dramatic architectural feature.",
        material_target: "panel face, slat surfaces, and visible edges",
        detail: `Panel design: vertical fluted/slat design (most popular in Monterrey 2024-2026) OR horizontal V-groove panel OR solid textured panel. If slat design: uniform spacing of 3-5cm wide slats with 1-2cm deep shadow gaps between — the shadow lines are as important as the slats themselves. If solid panel: surface has visible texture — brushed, sandblasted, or natural grain. Panel runs floor to ceiling OR from dado rail height to ceiling. Clean aluminum or wood reveal at ceiling and floor transitions. The panel should feel like a feature you would see in a luxury hotel or high-end Monterrey residence.`,
      },
      bano: {
        subject: "custom bathroom vanity and cabinetry (mueble de baño / vanity a medida)",
        elements: "floating vanity cabinet with doors and drawers, undermount or vessel sink, stone or quartz countertop, large format mirror or illuminated mirror cabinet, wall-mounted storage tower, premium faucet set, large format wall tiles",
        layout_hint: "Show the full vanity wall — mirror above, countertop with sink, cabinet below, and side tower if applicable. Clean spa-like composition. Wide enough to show full design.",
        lighting: "LED strip behind mirror creating a floating mirror halo effect — very popular in Monterrey luxury bathrooms. Recessed ceiling spots above vanity. Warm 2700K throughout. The LED behind mirror is the signature lighting element. Countertop surface lit from above — reflections visible in countertop.",
        material_target: "vanity cabinet door and drawer front surfaces, and mirror cabinet frame",
        detail: `Vanity layout: floating wall-mounted vanity at 85cm height (standard Mexican bathroom). Cabinet below sink has 2-3 drawers OR push-open doors. Countertop in Calacatta marble slab, white quartz, or light grey stone — undermount rectangular sink OR vessel sink in white ceramic. Mirror: full-width illuminated mirror with LED strip behind (floating mirror effect) OR framed mirror with side sconces. Faucet: wall-mounted OR deck-mounted — matte black or brushed gold. Large format wall tiles: 60x120cm or slab panels in marble-look or concrete-look. Floor: herringbone tile or large format stone. The bathroom feels like a 5-star hotel spa.`,
      },
    };

    const tipoCtx = TIPO_CONTEXT[tipoProyecto] || TIPO_CONTEXT.cocina;

    // ── Detalle por tipo × estilo ─────────────────────────────────────────────
    const TIPO_ESTILO_DETAIL = {
      cocina: {
        moderno:       "Flat panel doors, handleless or thin bar pulls in matte black, quartz countertop in light grey or white, large format porcelain backsplash slab, integrated hood flush with upper cabinets, island with waterfall countertop edge.",
        minimalista:   "Handleless push-open doors with Gola profile, seamless integrated appliances, no visible hardware, monochromatic palette, floating upper cabinets, countertop flush with backsplash creating a continuous surface.",
        contemporaneo: "Mix of lacquered panels and wood veneer sections, porcelain countertop, mixed hardware styles, open shelving section, pendant lights over island, layered materials.",
        industrial:    "Open shelving in raw steel, concrete-look countertop, black matte pipe hardware, exposed brick or microcement backsplash, Edison bulb pendants, raw wood open shelves mixed with matte black cabinets.",
        clasico:       "Shaker-style cabinet doors with recessed center panel, cream or white painted finish, farmhouse sink, beadboard backsplash or subway tile, brass or antique bronze hardware, wood butcher block countertop section.",
        rustico:       "Solid wood doors with visible grain, knotty pine or cedar, hand-forged iron hardware, stone countertop, terracotta or hand-painted tile backsplash, open wood beam ceiling visible, antique-look fixtures.",
        nordico:       "White or light grey flat panel doors, light birch wood accents on island or open shelf, simple brushed nickel hardware, white subway tile backsplash, pendant wicker or white lights, clean and airy feel.",
        lujo:          "Book-matched stone slab backsplash and countertop in continuous Calacatta marble or quartzite, wood veneer doors in dark walnut or smoked oak, integrated brass or gold hardware, wine cooler integrated, dramatic pendant lighting, lacquered ceiling detail.",
        default:       "Clean flat panel doors, quartz countertop, large format backsplash tile, recessed lighting.",
      },
      closet: {
        moderno:       "Sliding or hinged flat panel doors in matte lacquer, integrated LED strip at top interior, brushed aluminum frame detail, open niches with floating shelves, drawer bank in matching finish, mirror panel flush with door system.",
        minimalista:   "Full-width sliding doors in white matte, no visible hardware, push-latch system, interior in all white — white shelves, white hanging rails, white drawer fronts. Minimal visible objects inside. Clean empty luxury feel.",
        contemporaneo: "Mix of opaque and frosted glass door panels, internal warm LED, combination of open and closed sections, wood veneer drawer bank contrasting with lacquered doors.",
        industrial:    "Open system — no doors, exposed black steel pipe hanging rails, raw wood or concrete-look shelves, vintage Edison bulb lighting inside, visible clothing as decorative element.",
        clasico:       "Paneled door fronts with raised center panel, cream or white painted, brass cup pulls, interior with cedar-lined shelves, traditional organized appearance, tie and belt rack visible.",
        rustico:       "Barn-style sliding doors on black steel track, reclaimed wood panels, rope or iron handles, interior with natural wood shelves and rails, warm Edison bulb strip lighting.",
        nordico:       "White or light grey sliding doors, interior in light birch wood, simple chrome rails, integrated lighting from above, clean organized shelving with wicker baskets, natural light feel.",
        lujo:          "Full-height glass and metal framed doors showing interior — boutique luxury store feel. Interior: illuminated display shelving for bags and shoes, velvet drawer inserts, chandelier or LED chandelier inside, mirror wall, island with jewelry storage, premium hotel dressing room.",
        default:       "Flat panel doors, internal LED lighting, organized shelving and hanging sections.",
      },
      puerta: {
        moderno:       "Full-height flush door in matte lacquer, no visible molding, integrated handle in recessed channel or minimal bar pull, clean shadow gap at frame, monolithic appearance from floor to ceiling.",
        minimalista:   "Pivot door OR flush panel door that disappears into wall — handle-less push system or minimal recessed pull, no frame visible, perfect flush installation, door appears as continuation of wall.",
        contemporaneo: "Door with horizontal groove detail or fluted surface pattern, combined materials — wood veneer center panel with lacquered frame, architectural lever handle in matte black.",
        industrial:    "Steel-framed glass door OR solid door with black powder-coated steel frame and hardware, glass panel option for industrial loft feel, visible black hinges as design element.",
        clasico:       "Raised panel door with traditional molding profile, cream or white painted, oval or round knob in antique brass, pediment detail at top, visible hinge in brass, architrave with detailed profile.",
        rustico:       "Solid wood plank door with visible grain and natural knots, hand-forged iron strap hinges as visible design feature, iron ring pull or rustic lever, aged wood patina, visible wood joinery.",
        nordico:       "Simple flat door in white or light grey, minimal hardware in brushed nickel, clean frame, no ornamentation, Scandinavian simplicity — the beauty is in the proportions.",
        lujo:          "Oversized pivot door in book-matched wood veneer or lacquered in rich dark color, architectural hardware in brushed gold or smoked bronze, full-height 2.80m minimum, door has commanding presence and visual weight.",
        default:       "Full-height door, quality hardware, clean frame detail.",
      },
      mueble: {
        moderno:       "Floating TV wall with flat panel closed cabinets below and open niches above, LED halo behind TV panel, thin console, matte black hardware, clean horizontal lines, background panel in dark wood veneer or microcement.",
        minimalista:   "Seamless floating wall system — TV recessed or mounted flush, all storage behind handle-less doors, no visible objects, monolithic wall appearance, hidden LED at ceiling creates indirect glow on wall.",
        contemporaneo: "Mix of closed lacquered cabinets and open display shelving, background accent wall in fluted wood panel, integrated LED in niches, mix of wood and lacquer materials, pendant light over console.",
        industrial:    "Open steel and wood shelving system, exposed black pipe frame, Edison bulb strip lighting, raw concrete or brick background wall, record player or bar cart visible on open shelves, industrial brackets.",
        clasico:       "Traditional bookcase with cornice detail and raised panel cabinet doors below, cream painted, brass hardware, wood countertop shelf, traditional books and objects on display shelves, symmetrical composition.",
        rustico:       "Solid wood built-in entertainment center with natural grain, barn wood planks as background wall, wrought iron hardware, vintage objects on open shelves, warm Edison lighting, organic asymmetrical design.",
        nordico:       "White floating shelves system, light wood accents, simple TV mount flush to wall, plants and minimal decorative objects, white walls, clean composition, pendant in natural material above.",
        lujo:          "Dramatic full-wall millwork in book-matched dark walnut veneer, TV recessed into panel flush, flanking display niches with museum-quality lighting inside, floating console in marble slab, brass hardware details, luxury hotel lobby level design.",
        default:       "TV wall with floating shelves, integrated LED lighting, mix of open and closed storage.",
      },
      panel: {
        moderno:       "Vertical fluted panel in matte lacquer or wood veneer — 4cm wide slats with 1.5cm deep shadow grooves, floor to ceiling height, LED strip hidden at top washing light down the surface, clean aluminum reveal at ceiling.",
        minimalista:   "Seamless solid panel with subtle horizontal V-groove lines — the texture is minimal but visible, white or off-white, LED grazing light from ceiling reveals the groove depth, the beauty is in the simplicity.",
        contemporaneo: "Mix of fluted section and solid panel section on same wall, two materials or two tones, integrated LED in transition between sections, creates visual depth and interest.",
        industrial:    "Corrugated metal panel OR raw concrete panel with visible form-tie holes, alternating with raw wood planks, industrial LED strip lighting at top, raw unfinished edge details.",
        clasico:       "Traditional wainscoting panel with raised molding profile, chair rail dividing wall, lower panel in painted wood, upper wall in contrasting wallpaper or paint, classic proportions.",
        rustico:       "Rough-sawn wood plank paneling with visible grain and natural gaps between planks, reclaimed or aged wood texture, wall-mounted lantern style sconces, organic imperfect installation.",
        nordico:       "Horizontal shiplap boards in white or light grey, subtle horizontal rhythm, clean and airy, natural wood accent strip at ceiling, simple pendant lighting in front of panel.",
        lujo:          "Book-matched stone slab panel covering full wall — Calacatta marble, travertine, or quartzite — OR dark smoked oak fluted panel floor to ceiling, hidden LED cove at top and bottom creating floating effect, dramatic and expensive looking.",
        default:       "Vertical slat or fluted panel, floor to ceiling, LED lighting from above.",
      },
      bano: {
        moderno:       "Floating vanity in matte lacquer at 85cm, flat panel doors, undermount rectangular sink, quartz countertop, full-width illuminated mirror with LED behind, large format 60x120 porcelain tiles in grey or white, matte black faucet and hardware.",
        minimalista:   "Ultra-minimal floating vanity — single slab countertop extending as shelf, integrated sink carved from countertop material, no visible hardware, mirror flush with wall or frameless, seamless tile floor-to-ceiling in same material, hidden LED cove.",
        contemporaneo: "Floating vanity mixing wood veneer and lacquered panels, vessel sink in white ceramic, mixed material countertop, framed mirror with integrated LED border, combination wall tile and microcement.",
        industrial:    "Exposed pipe under vanity, concrete countertop with undermount sink, black steel mirror frame, subway tile wall, matte black faucet, open towel display on black pipe rail.",
        clasico:       "Furniture-style vanity with raised panel doors and turned legs OR fitted vanity with molding detail, marble countertop, undermount oval sink, polished chrome or brass faucet, beveled edge mirror with brass frame, subway tile in classic pattern.",
        rustico:       "Vanity in natural wood — live edge countertop or reclaimed wood base, vessel sink in natural stone or ceramic, bronze faucet, round rustic mirror with wood frame, stone tile wall in natural texture.",
        nordico:       "White floating vanity, light oak wood drawer fronts, white quartz countertop, round mirror in simple wood frame, white tiles with light grout, chrome fixtures, plants on counter, airy and light bathroom feel.",
        lujo:          "Full book-matched marble slab — wall, countertop, and floor in continuous Calacatta or Statuario marble, floating vanity in dark wood veneer, backlit mirror full wall width, gold or brushed brass fixtures, freestanding bathtub if space allows, spa-level luxury.",
        default:       "Floating vanity, quartz countertop, undermount sink, illuminated mirror, large format tiles.",
      },
    };

    // ── Material por tipo ─────────────────────────────────────────────────────
    const MATERIAL_PROMPT_DETAIL = {
      melamina: `${tipoCtx.material_target} are MELAMINE (melamina) — a combination of smooth solid color panels AND sections with printed wood grain pattern (tipo madera). This mix is very common in Mexican homes. Flat panel construction, thin ABS edge banding. The wood grain is printed/laminated — uniform repeat pattern, NOT real wood depth.`,
      mdf: `OVERRIDE: ${tipoCtx.material_target} are MDF LACADO (painted MDF). NO wood grain anywhere. Surface is painted solid color, smooth as glass — zero texture, zero grain, zero variation. Perfectly uniform color. Sharp clean edges. If wood grain appears, the render is WRONG.`,
      enchapado: `OVERRIDE: ${tipoCtx.material_target} are MADERA ENCHAPADA (real wood veneer on MDF). Surface shows clear natural wood grain in consistent direction. Organic color variation between panels. Warm natural wood appearance but perfectly flat — NOT solid timber thickness. Edge banding matches veneer.`,
      madera_solida: `OVERRIDE: ${tipoCtx.material_target} are MADERA SOLIDA MACIZA (solid hardwood). Visibly thick solid wood. Deep rich grain with natural variation. Possible subtle knots. Three-dimensional wood depth. End grain visible at edges. Solid timber character unmistakable.`,
    };

    const materialPromptDetail = material ? (MATERIAL_PROMPT_DETAIL[material] || materialData?.prompt) : "";

    const prompt = [
      // Calidad base
      `Ultra-realistic architectural interior render, premium quality, indistinguishable from a professional 3D visualization studio output.`,
      `Lighting: ${tipoCtx.lighting}`,
      `Camera: wide angle lens, eye-level shot. ${tipoCtx.layout_hint} Sharp focus throughout, no bokeh. Professional architectural visualization.`,
      `The render looks like output from a high-end 3D studio — perfect geometry, precise reflections, ultra-sharp details on every surface.`,
      `Setting: luxury residential home in Monterrey, Mexico — San Pedro Garza García or Cumbres style, upper class neighborhood.`,

      // Tipo de proyecto específico — detalle completo cruzado con estilo
      `The centerpiece of this render is a brand new ${tipoCtx.subject}.`,
      `Elements to include: ${tipoCtx.elements}.`,
      `Design specification: ${tipoCtx.detail}`,
      `Style-specific design language for this ${tipoCtx.subject}: ${TIPO_ESTILO_DETAIL[tipoProyecto]?.[estilo] || TIPO_ESTILO_DETAIL[tipoProyecto]?.default || ""}`,

      // Material — máxima prioridad sobre todo
      material === "mdf" && `CRITICAL RULE: NO wood grain on any ${tipoCtx.material_target}. Painted smooth surface ONLY.`,
      materialPromptDetail,

      // Color — aplicado SOLO al elemento principal, no a paredes, piso ni techo
      colorData && `COLOR RULE: Apply ${colorData.prompt} EXCLUSIVELY to the ${tipoCtx.material_target}. Do NOT apply this color to walls, floor, ceiling, countertop, tiles, or any other surface. Everything else keeps its own natural color. The ${tipoCtx.material_target} color is ${colorData.label} — this is the ONLY surface that changes color.`,

      // Acabado — solo al elemento principal
      acabadoData && `FINISH RULE: The ${tipoCtx.material_target} has a ${acabadoData.label} finish (${acabadoData.prompt}). This finish applies ONLY to the ${tipoCtx.material_target}. Other surfaces in the room have their own natural finishes.`,

      // Compatibilidad material + color
      material === "enchapado" && colorData && (colorElegido === "blanco_mate" || colorElegido === "negro_mate" || colorElegido === "gris" || colorElegido === "verde_salvia" || colorElegido === "azul_marino") && `NOTE: Wood veneer (enchapado) with ${colorData.label} means the veneer has been stained or tinted in this tone — the wood grain is still visible but with a ${colorData.label} color wash or stain over it. NOT painted solid.`,
      material === "madera_solida" && colorData && (colorElegido === "blanco_mate" || colorElegido === "negro_mate" || colorElegido === "gris") && `NOTE: Solid wood in ${colorData.label} means painted solid wood — the wood is painted this color but edges and any exposed end grain may show wood character.`,

      // Estilo — solo forma, proporciones y herrajes. Material y color ya están definidos arriba.
      `STYLE RULE: Apply ${estiloData?.label} style ONLY to: proportions, hardware style, door profile shape, overall layout composition, and decorative details. Do NOT override the material or color specifications already defined above. Style affects HOW it looks, material and color affect WHAT it is made of.`,
      `${estiloData?.label} style details: ${estiloData?.prompt_hint}.`,

      // Vida (solo aplica cuando es cocina o baño principalmente)
      vidaHints && (tipoProyecto === "cocina" || tipoProyecto === "bano") && `Functional household requirements: ${vidaHints}.`,

      // Cliente
      descripcion && `Client specific requests: ${descripcion}.`,

      // Layout
      foto
        ? `LAYOUT: preserve the EXACT room geometry, wall positions, window locations, ceiling height from the reference photo. Only replace the ${tipoCtx.subject}.`
        : `Create a realistic well-proportioned ${tipoCtx.subject} naturally integrated in a Monterrey home.`,

      // Calidad final
      `Final output: professional 3D visualization studio quality, ultra-sharp, perfect warm LED lighting, rich material textures, premium Monterrey residential aesthetic. No watermarks, no text, no artifacts.`,
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
      } else {
        // Sin foto — usar imagen base del tipo de proyecto
        const baseImg = BASE_POR_TIPO[tipoProyecto];
        if (baseImg) {
          try {
            const imgRes = await fetch(baseImg);
            const blob = await imgRes.blob();
            fotoBase64 = await new Promise((resolve) => {
              const reader = new FileReader();
              reader.onload = () => resolve(reader.result.split(",")[1]);
              reader.readAsDataURL(blob);
            });
          } catch { /* sin imagen base, continuar sin foto */ }
        }
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
        localStorage.setItem(STORAGE_KEY, String(usados + 1));
        setRenderMsg("✅ Render generado");
      } else if (imgB64) {
        try {
          const byteString = atob(imgB64);
          const ab = new ArrayBuffer(byteString.length);
          const ia = new Uint8Array(ab);
          for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);
          const blob = new Blob([ab], { type: "image/png" });
          const fileName = `render_${Date.now()}.png`;
          const uploadRes = await fetch(`${SUPABASE_URL}/storage/v1/object/renders/${fileName}`, {
            method: "POST",
            headers: { "apikey": SUPABASE_KEY, "Authorization": `Bearer ${SUPABASE_KEY}`, "Content-Type": "image/png", "x-upsert": "true" },
            body: blob
          });
          const publicUrl = uploadRes.ok ? `${SUPABASE_URL}/storage/v1/object/public/renders/${fileName}` : "data:image/png;base64," + imgB64;
          setRenderUrl(publicUrl);
          localStorage.setItem(STORAGE_KEY, String(usados + 1));
          setRenderMsg("✅ Render generado");
        } catch {
          setRenderUrl("data:image/png;base64," + imgB64);
          setRenderMsg("✅ Render generado");
        }
      } else {
        setRenderMsg("❌ " + (data?.error?.message || "Error al generar"));
      }
    } catch(e) { setRenderMsg("❌ " + e.message); }
    setRenderLoading(false);

    // Generar descripción IA después del render
    setDescripcionLoading(true);
    const desc = await generarDescripcionIA({ tipoProyecto, estilo, color: colorElegido, acabado, material, vidaResp, descripcion });
    setDescripcionIA(desc);
    setDescripcionLoading(false);
  };

  const guardarExpediente = async () => {
    setSaving(true);
    const vidaResumen = PREGUNTAS_VIDA.map(p => {
      const r = vidaResp[p.key];
      const op = p.opciones.find(o => o.value === r);
      return op ? `${p.pregunta}: ${op.label}` : null;
    }).filter(Boolean).join(" | ");

    const materialData = MATERIALES.find(m => m.key === material);
    const resumen = `🆕 *NUEVO LEAD — EnKaje Pro*\n\n📋 Proyecto: ${tipoProyecto.toUpperCase()}\n🎨 Estilo: ${estilo}\n🎨 Color: ${colorElegido}\n✨ Acabado: ${acabado}\n🪵 Material: ${materialData?.label || "no especificado"}\n🏠 Perfil hogar: ${vidaResumen}\n📝 Descripción: ${descripcion || "no especificada"}\n👤 Nombre: ${nombre}\n📱 Tel: ${telefono}\n📧 Correo: ${correo}\n📅 Fecha deseada: ${fechaInicio}\n🎯 Decisión: ${nivelDecision}\n📐 Medidas: ${medidas || "no especificadas"}\n💰 Rango: $${(RANGOS[tipoProyecto]?.min||0).toLocaleString("es-MX")} – $${(RANGOS[tipoProyecto]?.max||0).toLocaleString("es-MX")} MXN\n\nenkajepro.com`;
    window.open(`https://wa.me/528127176786?text=${encodeURIComponent(resumen)}`, "_blank");

    const rango = RANGOS[tipoProyecto] || { min:0, max:0 };
    try {
      const score = calcularScore({ nivel_decision: nivelDecision, foto_url: fotoUrl, medidas, fecha_inicio: fechaInicio, descripcion });
      const label = scoreLabel(score);
      const acabadoData = ACABADOS.find(a => a.key === acabado);
      const payload = {
        tipo_proyecto:        tipoProyecto,
        foto_url:             fotoUrl || null,
        render_url:           (renderUrl && !renderUrl.startsWith("data:")) ? renderUrl : null,
        estilo_elegido:       estilo,
        materiales_sugeridos: [MATERIALES_SUGERIDOS[estilo], colorElegido && `Color: ${colorElegido}`, acabadoData && `Acabado: ${acabadoData.label}`, materialData && `Material: ${materialData.label}`].filter(Boolean).join(" | "),
        rango_inversion_min:  rango.min,
        rango_inversion_max:  rango.max,
        tiempo_fabricacion:   TIEMPOS[tipoProyecto] || null,
        fecha_inicio_deseada: fechaInicio || null,
        nivel_decision:       nivelDecision,
        medidas_sketch_url:   medidas || null,
        observaciones:        `Nombre: ${nombre} | Tel: ${telefono} | Correo: ${correo} | Desc: ${descripcion} | Vida: ${vidaResumen} | DescIA: ${descripcionIA || ""}`,
        score,
        score_label:          label,
        estado_lead:          "nuevo",
        created_at:           new Date().toISOString(),
      };
      await sb("expedientes", { method:"POST", body:JSON.stringify(payload) });
    } catch(e) { console.error("ERROR:", e); }
    setSaving(false);
  };

  const next  = () => setStep(s => Math.min(s+1, TOTAL_STEPS));
  const back  = () => setStep(s => Math.max(s-1, 0));
  const reset = () => {
    setStep(0); setTipo(""); setFoto(null); setFotoUrl(null); setDescripcion("");
    setEstilo(""); setColor(""); setAcabado(""); setMaterial(""); setVidaResp({});
    setRenderUrl(null); setRenderMsg(""); setDescripcionIA(null);
    setGuardadoEnPerfil(false); setGuardandoPerfil(false);
    setFechaInicio(""); setNivelDecision("");
    setMedidas(""); setNombre(""); setTelefono(""); setCorreo("");
  };

  const vidaCompleta = PREGUNTAS_VIDA.every(p => vidaResp[p.key]);

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

        {/* ── PASO 0 — INTRO + TIPO ── */}
        {step === 0 && (
          <div className="portal-step" style={{ textAlign:"center", paddingTop:32 }}>
            <div style={{ fontSize:48, marginBottom:16 }}>🪵</div>
            {tieneCuenta && (
              <div style={{ background:"#0f2a0f", border:"1px solid #4caf5040", borderRadius:14, padding:"12px 20px", marginBottom:20, display:"inline-flex", alignItems:"center", gap:10 }}>
                <span style={{ fontSize:18 }}>✅</span>
                <div style={{ textAlign:"left" }}>
                  <div style={{ fontSize:13, fontWeight:700, color:"#4caf50" }}>Sesión activa</div>
                  <div style={{ fontSize:11, color:"#555" }}>
                    Tienes {LIMITE_RENDERS - parseInt(localStorage.getItem(STORAGE_KEY)||"0",10)} render(s) disponibles este mes
                  </div>
                </div>
              </div>
            )}
            <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:36, fontWeight:900, color:"#f0e8dc", lineHeight:1.15, marginBottom:16 }}>
              Visualiza tu proyecto<br /><span style={{ color:"#d4af37" }}>antes de gastar un peso</span>
            </h1>
            <p style={{ fontSize:15, color:"#888", lineHeight:1.8, maxWidth:460, margin:"0 auto 36px" }}>
              Elige el tipo de proyecto, responde 3 preguntas rápidas y la IA genera un render personalizado con descripción en segundos. Gratis, sin compromiso.
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

        {/* ── PASO 1 — FOTO + PREGUNTAS DE VIDA ── */}
        {step === 1 && (
          <div className="portal-step">
            <StepLabel step={1} total={TOTAL_STEPS} label="Tu espacio y estilo de vida" />
            <ProgressBar step={1} total={TOTAL_STEPS} />
            <div style={{ marginTop:28, marginBottom:20 }}>
              <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:26, fontWeight:700, color:"#f0e8dc", marginBottom:8 }}>Cuéntanos sobre tu espacio</h2>
              <p style={{ color:"#666", fontSize:14, lineHeight:1.7 }}>Esto ayuda a la IA a generar un render que realmente funcione para tu vida diaria.</p>
            </div>

            {/* Foto */}
            <div onClick={() => fileRef.current.click()} style={{
              border: `2px dashed ${fotoUrl ? "#d4af37" : "#2a2a20"}`,
              borderRadius:16, padding: fotoUrl ? 0 : "28px 24px",
              textAlign:"center", cursor:"pointer", background:"#0f0f0a",
              overflow:"hidden", minHeight:140, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:16
            }}>
              {fotoUrl ? (
                <div style={{ position:"relative", width:"100%" }}>
                  <img src={fotoUrl} alt="Tu espacio" style={{ width:"100%", maxHeight:240, objectFit:"cover", display:"block", borderRadius:14 }} />
                  <div style={{ position:"absolute", bottom:12, right:12, background:"#d4af37", color:"#000", borderRadius:8, padding:"6px 12px", fontSize:12, fontWeight:700 }}>✓ Foto cargada · Toca para cambiar</div>
                </div>
              ) : (
                <div>
                  <div style={{ fontSize:32, marginBottom:8 }}>📷</div>
                  <p style={{ color:"#555", fontSize:14, marginBottom:3 }}>Sube una foto del espacio <span style={{ color:"#d4af37" }}>(recomendado)</span></p>
                  <p style={{ color:"#333", fontSize:12 }}>Sin foto usamos una imagen de referencia del tipo de proyecto</p>
                </div>
              )}
            </div>
            <input ref={fileRef} type="file" accept="image/*" onChange={handleFoto} style={{ display:"none" }} />

            {/* Nota si no sube foto */}
            {!fotoUrl && (
              <div style={{ background:"#1a1208", border:"1px solid #d4af3720", borderRadius:10, padding:"10px 14px", marginBottom:16, fontSize:12, color:"#888" }}>
                💡 Sin foto, la IA usará una referencia de <strong style={{ color:"#d4af37" }}>{TIPOS_PROYECTO.find(t=>t.key===tipoProyecto)?.label}</strong> como base. El resultado es menos personalizado pero igual útil para ver el estilo.
              </div>
            )}

            {/* 3 preguntas de vida */}
            <div style={{ marginBottom:20 }}>
              <div style={{ fontSize:11, color:"#d4af37", fontWeight:700, letterSpacing:2, textTransform:"uppercase", marginBottom:4 }}>3 preguntas rápidas</div>
              <p style={{ fontSize:12, color:"#555", marginBottom:16 }}>La IA ajusta los materiales y diseño según tus respuestas.</p>
              {PREGUNTAS_VIDA.map((pregunta) => (
                <div key={pregunta.key} style={{ marginBottom:18 }}>
                  <p style={{ fontSize:14, fontWeight:600, color:"#e8e0d0", marginBottom:10 }}>{pregunta.pregunta}</p>
                  <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                    {pregunta.opciones.map(op => {
                      const sel = vidaResp[pregunta.key] === op.value;
                      return (
                        <button key={op.value} className="vida-btn" onClick={() => setVidaResp(v => ({ ...v, [pregunta.key]: op.value }))} style={{
                          display:"flex", alignItems:"center", gap:8,
                          background: sel ? "#d4af3718" : "#0f0f0a",
                          border: `1.5px solid ${sel ? "#d4af37" : "#1a1a12"}`,
                          borderRadius:12, padding:"10px 16px", cursor:"pointer", transition:"all .2s", flexShrink:0
                        }}>
                          <span style={{ fontSize:22 }}>{op.emoji}</span>
                          <span style={{ fontSize:13, fontWeight: sel ? 700 : 400, color: sel ? "#d4af37" : "#888" }}>{op.label}</span>
                          {sel && <span style={{ color:"#d4af37", fontSize:12 }}>✓</span>}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Descripción opcional */}
            <div style={{ marginBottom:24 }}>
              <label style={{ fontSize:11, color:"#555", display:"block", marginBottom:8, letterSpacing:1, textTransform:"uppercase" }}>
                ¿Algo más? <span style={{ color:"#333", fontWeight:400 }}>(opcional)</span>
              </label>
              <textarea value={descripcion} onChange={e => setDescripcion(e.target.value)}
                placeholder={tipoProyecto === "cocina" ? "Ej: Quiero isla, iluminación LED, sin manijas..." : tipoProyecto === "closet" ? "Ej: Con cajones en el centro, puertas de vidrio..." : "Describe colores, materiales, dimensiones..."}
                rows={3} style={{ width:"100%", background:"#0f0f0a", border:"1px solid #2a2a20", borderRadius:12, padding:"13px 16px", color:"#e8e0d0", fontSize:14, resize:"vertical", lineHeight:1.6 }} />
            </div>

            <div style={{ display:"flex", gap:10 }}>
              <Btn onClick={back} outline style={{ flex:1 }}>← Atrás</Btn>
              <Btn onClick={next} disabled={!vidaCompleta} style={{ flex:2 }}>
                {vidaCompleta ? "Elegir estilo →" : "Responde las 3 preguntas"}
              </Btn>
            </div>
            {!vidaCompleta && <p style={{ fontSize:11, color:"#555", textAlign:"center", marginTop:8 }}>{PREGUNTAS_VIDA.filter(p => !vidaResp[p.key]).length} pregunta(s) pendientes</p>}
          </div>
        )}

        {/* ── PASO 2 — ESTILO + COLOR + ACABADO + MATERIAL ── */}
        {step === 2 && (
          <div className="portal-step">
            <StepLabel step={2} total={TOTAL_STEPS} label="Estilo, acabados y material" />
            <ProgressBar step={2} total={TOTAL_STEPS} />
            <div style={{ marginTop:28, marginBottom:20 }}>
              <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:26, fontWeight:700, color:"#f0e8dc", marginBottom:8 }}>¿Con qué te identificas?</h2>
              <p style={{ color:"#666", fontSize:14 }}>Elige por las fotos — no tienes que saber los nombres.</p>
            </div>

            {/* ESTILOS CON FOTO */}
            <div style={{ marginBottom:24 }}>
              <label style={{ fontSize:11, color:"#d4af37", fontWeight:700, letterSpacing:2, textTransform:"uppercase", display:"block", marginBottom:12 }}>Estilo de diseño</label>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
                {ESTILOS.map(e => {
                  const sel = estilo === e.key;
                  return (
                    <button key={e.key} className="estilo-card" onClick={() => setEstilo(e.key)} style={{
                      background:"#0f0f0a", border:`2px solid ${sel?"#d4af37":"#1a1a12"}`,
                      borderRadius:14, cursor:"pointer", textAlign:"left", overflow:"hidden",
                      transition:"all .25s", boxShadow:sel?"0 0 20px #d4af3830":"none", padding:0
                    }}>
                      <div style={{ position:"relative", width:"100%", height:110, overflow:"hidden" }}>
                        <img src={e.foto} alt={e.label} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block", filter:sel?"brightness(1.05)":"brightness(0.75)" }} onError={ev=>{ev.target.style.display="none";}} />
                        {sel && <div style={{ position:"absolute", top:8, right:8, background:"#d4af37", borderRadius:"50%", width:24, height:24, display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:900, color:"#000" }}>✓</div>}
                      </div>
                      <div style={{ padding:"10px 12px" }}>
                        <div style={{ fontWeight:700, color:sel?"#d4af37":"#e8e0d0", fontSize:13, marginBottom:2 }}>{e.label}</div>
                        <div style={{ fontSize:11, color:"#555", lineHeight:1.4 }}>{e.desc}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* MATERIAL CON FOTO */}
            <div style={{ marginBottom:24 }}>
              <label style={{ fontSize:11, color:"#d4af37", fontWeight:700, letterSpacing:2, textTransform:"uppercase", display:"block", marginBottom:12 }}>
                Material <span style={{ color:"#333", fontWeight:400 }}>(opcional)</span>
              </label>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
                {MATERIALES.map(m => {
                  const sel = material === m.key;
                  return (
                    <button key={m.key} className="mat-card" onClick={() => setMaterial(material === m.key ? "" : m.key)} style={{
                      background:"#0f0f0a", border:`1.5px solid ${sel?m.color:"#1a1a12"}`,
                      borderRadius:12, cursor:"pointer", overflow:"hidden",
                      transition:"all .25s", padding:0,
                      boxShadow:sel?`0 0 16px ${m.color}30`:"none"
                    }}>
                      {/* Foto material */}
                      <div style={{ position:"relative", height:72, overflow:"hidden", background:"#1a1a12" }}>
                        <img src={m.foto} alt={m.label} style={{ width:"100%", height:"100%", objectFit:"cover", filter:sel?"brightness(1)":"brightness(0.6)" }} onError={ev=>{ev.target.style.display="none";}} />
                        {/* Badge de precio */}
                        <div style={{ position:"absolute", top:6, left:6, background:"rgba(7,7,8,0.85)", borderRadius:20, padding:"2px 8px", fontSize:9, fontWeight:700, color:m.badgeColor, whiteSpace:"nowrap" }}>{m.badge}</div>
                        {sel && <div style={{ position:"absolute", top:6, right:6, background:m.color, borderRadius:"50%", width:20, height:20, display:"flex", alignItems:"center", justifyContent:"center", fontSize:10, fontWeight:900, color:"#000" }}>✓</div>}
                      </div>
                      <div style={{ padding:"8px 12px" }}>
                        <div style={{ fontWeight:700, fontSize:13, color:sel?m.color:"#e8e0d0", marginBottom:2 }}>{m.label}</div>
                        <div style={{ fontSize:10, color:"#555" }}>{m.desc}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
              {material && (
                <div style={{ marginTop:10, background:"#0f0f0a", border:`1px solid ${MATERIALES.find(m=>m.key===material)?.color}30`, borderRadius:10, padding:"10px 14px", fontSize:12, color:"#888" }}>
                  💡 {MATERIALES.find(m=>m.key===material)?.info}
                </div>
              )}
            </div>

            {/* COLORES */}
            <div style={{ marginBottom:20 }}>
              <label style={{ fontSize:11, color:"#d4af37", fontWeight:700, letterSpacing:2, textTransform:"uppercase", display:"block", marginBottom:12 }}>
                Color principal <span style={{ color:"#333", fontWeight:400 }}>(opcional)</span>
              </label>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
                {COLORES.map(c => {
                  const sel = colorElegido === c.key;
                  return (
                    <button key={c.key} className="color-chip" onClick={() => setColor(colorElegido===c.key?"":c.key)} style={{
                      display:"flex", alignItems:"center", gap:12,
                      background:sel?"#d4af3712":"#0f0f0a", border:`1.5px solid ${sel?"#d4af37":"#1a1a12"}`,
                      borderRadius:12, padding:"10px 14px", cursor:"pointer", transition:"all .2s", textAlign:"left"
                    }}>
                      <div style={{ width:36, height:36, borderRadius:8, background:c.hex, flexShrink:0, border:"1px solid rgba(255,255,255,0.12)", boxShadow:sel?`0 0 10px ${c.hex}60`:"none" }} />
                      <div>
                        <div style={{ fontSize:13, fontWeight:sel?700:500, color:sel?"#d4af37":"#e8e0d0" }}>{c.label}</div>
                        <div style={{ fontSize:11, color:"#555" }}>{c.desc}</div>
                      </div>
                      {sel && <span style={{ marginLeft:"auto", color:"#d4af37", fontSize:14 }}>✓</span>}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ACABADOS CON FOTO */}
            <div style={{ marginBottom:28 }}>
              <label style={{ fontSize:11, color:"#d4af37", fontWeight:700, letterSpacing:2, textTransform:"uppercase", display:"block", marginBottom:12 }}>
                Acabado <span style={{ color:"#333", fontWeight:400 }}>(opcional)</span>
              </label>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8 }}>
                {ACABADOS.map(a => {
                  const sel = acabado === a.key;
                  return (
                    <button key={a.key} className="acabado-card" onClick={() => setAcabado(acabado===a.key?"":a.key)} style={{
                      background:"#0f0f0a", border:`1.5px solid ${sel?"#d4af37":"#1a1a12"}`,
                      borderRadius:12, cursor:"pointer", overflow:"hidden", transition:"all .2s", padding:0,
                      boxShadow:sel?"0 0 14px #d4af3825":"none"
                    }}>
                      <div style={{ position:"relative", height:64, overflow:"hidden" }}>
                        <img src={a.foto} alt={a.label} style={{
                          position:"absolute", width:"300%", height:"200%",
                          top:a.pos.endsWith("100%")?"-100%":"0",
                          left:a.pos.startsWith("100%")?"-200%":a.pos.startsWith("50%")?"-100%":"0",
                          objectFit:"cover", filter:sel?"brightness(1)":"brightness(0.6)"
                        }} onError={ev=>{ev.target.style.background="#1a1a12";ev.target.style.display="none";}} />
                        {sel && <div style={{ position:"absolute", inset:0, background:"#d4af3715", display:"flex", alignItems:"center", justifyContent:"center" }}><span style={{ color:"#d4af37", fontSize:18, fontWeight:900 }}>✓</span></div>}
                      </div>
                      <div style={{ padding:"8px 10px" }}>
                        <div style={{ fontWeight:700, fontSize:12, color:sel?"#d4af37":"#e8e0d0", marginBottom:2 }}>{a.label}</div>
                        <div style={{ fontSize:10, color:"#555" }}>{a.desc}</div>
                      </div>
                    </button>
                  );
                })}
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

        {/* ── PASO 3 — RENDER + DESCRIPCIÓN IA ── */}
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
                  {sinCuenta ? "Ya usaste tu render gratuito" : "Usaste tus 3 renders del mes"}
                </h3>
                <p style={{ color:"#666", fontSize:13, lineHeight:1.7, marginBottom:20 }}>
                  {sinCuenta
                    ? "Crea una cuenta gratis y obtén 3 renders sin marca de agua."
                    : "Tu cuenta incluye 3 renders. Se renuevan el próximo mes."}
                </p>
                {sinCuenta && (
                 <a href="/app" onClick={() => localStorage.removeItem("enkaje_renders")} style={{ display:"block", background:"#d4af37", color:"#000", borderRadius:12, padding:"13px 24px", fontWeight:900, fontSize:14, textDecoration:"none" }}>
                   Crear cuenta gratis → 3 renders </a>
                )}
              </div>
            )} 
                     
               
            {renderLoading && (
              <div style={{ background:"#0f0f0a", border:"1px solid #d4af3730", borderRadius:16, padding:"60px 24px", textAlign:"center" }}>
                <div style={{ width:40, height:40, border:"3px solid #d4af3730", borderTop:"3px solid #d4af37", borderRadius:"50%", animation:"spin 1s linear infinite", margin:"0 auto 20px" }} />
                <p style={{ color:"#d4af37", fontWeight:700, fontSize:14, marginBottom:8 }}>Generando tu render personalizado...</p>
                <p style={{ color:"#444", fontSize:12 }}>Aplicando: estilo + color + acabado + material + perfil de hogar</p>
                <p style={{ color:"#333", fontSize:11, marginTop:4 }}>15-30 segundos</p>
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

                {/* ── BOTONES DESCARGAR Y GUARDAR ── */}
                <div style={{ display:"flex", gap:8, marginBottom:16 }}>
                  <button onClick={descargarRender} style={{
                    flex:1, display:"flex", alignItems:"center", justifyContent:"center", gap:8,
                    background:"#0f0f0a", border:"1.5px solid #2a2a20",
                    borderRadius:12, padding:"12px", cursor:"pointer", transition:"all .2s",
                    color:"#e8e0d0", fontSize:13, fontWeight:600
                  }}>
                    ⬇️ Descargar render
                  </button>
                  {tieneCuenta && (
                    <button onClick={guardarEnPerfil} disabled={guardandoPerfil || guardadoEnPerfil} style={{
                      flex:1, display:"flex", alignItems:"center", justifyContent:"center", gap:8,
                      background: guardadoEnPerfil ? "#0a2a0a" : "#0f0f0a",
                      border: `1.5px solid ${guardadoEnPerfil ? "#4caf50" : "#2a2a20"}`,
                      borderRadius:12, padding:"12px", cursor: guardadoEnPerfil ? "default" : "pointer",
                      transition:"all .2s", color: guardadoEnPerfil ? "#4caf50" : "#e8e0d0",
                      fontSize:13, fontWeight:600
                    }}>
                      {guardandoPerfil ? "Guardando..." : guardadoEnPerfil ? "✓ Guardado en perfil" : "🔖 Guardar en mis proyectos"}
                    </button>
                  )}
                </div>

                {/* ── DESCRIPCIÓN IA ── */}
                <div style={{ background:"#0f0f0a", border:"1px solid #d4af3720", borderRadius:16, padding:20, marginBottom:16 }}>
                  <div style={{ fontSize:11, color:"#d4af37", fontWeight:700, letterSpacing:2, textTransform:"uppercase", marginBottom:12, display:"flex", alignItems:"center", gap:8 }}>
                    <span>🤖 Análisis de tu proyecto</span>
                    {descripcionLoading && <span style={{ fontSize:10, color:"#555", fontWeight:400, animation:"pulse 1.5s ease infinite" }}>Generando descripción...</span>}
                  </div>
                  {descripcionLoading && (
                    <div style={{ display:"flex", gap:6, alignItems:"center" }}>
                      {[0,1,2].map(i => (
                        <div key={i} style={{ width:6, height:6, borderRadius:"50%", background:"#d4af3760", animation:`pulse 1.5s ${i*0.3}s ease infinite` }} />
                      ))}
                    </div>
                  )}
                  {descripcionIA && !descripcionLoading && (
                    <p style={{ fontSize:14, color:"#aaa", lineHeight:1.85, fontStyle:"italic" }}>"{descripcionIA}"</p>
                  )}
                  {!descripcionIA && !descripcionLoading && (
                    <p style={{ fontSize:13, color:"#444" }}>No se pudo generar la descripción. El render sí está listo.</p>
                  )}
                </div>

                {/* Panel de datos */}
                <div style={{ background:"#0f0f0a", border:"1px solid #1a1a12", borderRadius:16, padding:20, marginBottom:16 }}>
                  <div style={{ fontSize:11, color:"#d4af37", fontWeight:700, letterSpacing:2, textTransform:"uppercase", marginBottom:14 }}>
                    Detalles · {ESTILOS.find(e=>e.key===estilo)?.label}
                    {colorElegido && ` · ${COLORES.find(c=>c.key===colorElegido)?.label}`}
                    {acabado && ` · ${ACABADOS.find(a=>a.key===acabado)?.label}`}
                    {material && ` · ${MATERIALES.find(m=>m.key===material)?.label}`}
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

        {/* ── PASO 4 — INVERSIÓN ── */}
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

        {/* ── PASO 5 — FECHA ── */}
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
                  background:fechaInicio===op.value?"#d4af3715":"#0f0f0a",
                  border:`1.5px solid ${fechaInicio===op.value?"#d4af37":"#1a1a12"}`,
                  borderRadius:12, padding:"16px 14px", cursor:"pointer",
                  color:fechaInicio===op.value?"#d4af37":"#888",
                  fontWeight:fechaInicio===op.value?700:400,
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

        {/* ── PASO 6 — NIVEL DECISIÓN ── */}
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
                  background:nivelDecision===op.value?"#d4af3715":"#0f0f0a",
                  border:`1.5px solid ${nivelDecision===op.value?"#d4af37":"#1a1a12"}`,
                  borderRadius:12, padding:"16px 18px", cursor:"pointer",
                  display:"flex", alignItems:"center", gap:14, transition:"all .2s"
                }}>
                  <span style={{ fontSize:24, flexShrink:0 }}>{op.emoji}</span>
                  <div style={{ flex:1, textAlign:"left" }}>
                    <div style={{ fontWeight:700, color:nivelDecision===op.value?"#d4af37":"#e8e0d0", fontSize:14, marginBottom:2 }}>{op.label}</div>
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

        {/* ── PASO 7 — CONTACTO ── */}
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

        {/* ── PASO 8 — CONFIRMACIÓN ── */}
        {step === 8 && (
          <div className="portal-step" style={{ textAlign:"center", paddingTop:32 }}>
            <div style={{ fontSize:56, marginBottom:20 }}>🎉</div>
            <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:30, fontWeight:900, color:"#f0e8dc", marginBottom:12 }}>¡Expediente enviado!</h2>
            <p style={{ color:"#888", fontSize:15, lineHeight:1.8, maxWidth:440, margin:"0 auto 32px" }}>Los talleres verificados de EnKaje Pro en Monterrey recibirán tu proyecto y te contactarán pronto.</p>
            <div style={{ background:"#0f0f0a", border:"1px solid #d4af3730", borderRadius:16, padding:24, textAlign:"left", marginBottom:24 }}>
              <div style={{ fontSize:11, color:"#d4af37", fontWeight:700, letterSpacing:2, textTransform:"uppercase", marginBottom:16 }}>Tu expediente</div>
              {renderUrl && (
                <div style={{ position:"relative", borderRadius:10, overflow:"hidden", marginBottom:16 }}>
                  <img src={renderUrl} alt="Render" style={{ width:"100%", maxHeight:220, objectFit:"cover" }} />
                  {sinCuenta && <Watermark />}
                </div>
              )}
              {descripcionIA && (
                <div style={{ background:"#0a0a08", borderRadius:10, padding:14, marginBottom:14 }}>
                  <div style={{ fontSize:10, color:"#d4af37", letterSpacing:1, textTransform:"uppercase", marginBottom:6 }}>Descripción IA</div>
                  <p style={{ fontSize:12, color:"#aaa", lineHeight:1.7, fontStyle:"italic" }}>"{descripcionIA}"</p>
                </div>
              )}
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
                {[
                  ["Proyecto", `${TIPOS_PROYECTO.find(t=>t.key===tipoProyecto)?.emoji} ${TIPOS_PROYECTO.find(t=>t.key===tipoProyecto)?.label}`],
                  ["Estilo", ESTILOS.find(e=>e.key===estilo)?.label],
                  ["Material", MATERIALES.find(m=>m.key===material)?.label || "No especificado"],
                  ["Acabado", ACABADOS.find(a=>a.key===acabado)?.label || "No especificado"],
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
                <div style={{ fontSize:11, color:"#d4af37", fontWeight:700, letterSpacing:2, textTransform:"uppercase", marginBottom:12 }}>🔓 Descarga tu render</div>
                <p style={{ color:"#888", fontSize:13, lineHeight:1.7, marginBottom:16 }}>Crea una cuenta gratis y descarga sin marca de agua, más 2 renders adicionales.</p>
                <a href="/app" style={{ display:"block", background:"#d4af37", color:"#000", borderRadius:12, padding:"13px 24px", fontWeight:900, fontSize:14, textDecoration:"none" }}>Crear cuenta gratis →</a>
              </div>
            )}
            {tieneCuenta && (
              <div style={{ background:"#0f2a0f", border:"1px solid #4caf5030", borderRadius:14, padding:16, marginBottom:16, display:"flex", justifyContent:"space-between", alignItems:"center", gap:12, flexWrap:"wrap" }}>
                <div>
                  <div style={{ fontSize:13, fontWeight:700, color:"#4caf50", marginBottom:2 }}>¿Quieres ver todos tus proyectos?</div>
                  <div style={{ fontSize:11, color:"#555" }}>Tus renders guardados están en Mis Proyectos</div>
                </div>
                <button onClick={() => { window.location.href = "/app"; sessionStorage.setItem("enkaje_tab", "mis_proyectos"); }} style={{
                  background:"#4caf50", color:"#000", border:"none", borderRadius:10,
                  padding:"10px 18px", fontWeight:700, fontSize:13, cursor:"pointer", whiteSpace:"nowrap"
                }}>Ver mis proyectos →</button>
              </div>
            )}
            <div style={{ display:"flex", gap:10, justifyContent:"center", flexWrap:"wrap" }}>
              <Btn onClick={reset} outline style={{ fontSize:13 }}>Nuevo proyecto</Btn>
              <Btn onClick={() => {
                const msg = `Hola! Acabo de solicitar cotización en EnKaje Pro para mi proyecto de ${TIPOS_PROYECTO.find(t=>t.key===tipoProyecto)?.label} estilo ${ESTILOS.find(e=>e.key===estilo)?.label}. ¿Me pueden ayudar?`;
                window.open(`https://wa.me/528127176786?text=${encodeURIComponent(msg)}`, "_blank");
              }} color="#25D366" style={{ fontSize:13 }}>💬 Hablar por WhatsApp</Btn>
            </div>
          </div>
        )}

      </div>
    </>
  );
}
