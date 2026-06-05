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
    desc: "Económico · Más popular",
    badge: "💚 Más económico",
    badgeColor: "#4caf50",
    foto: "/mat-melamina.png",
    color: "#4caf50",
    prompt: "melamine board finish, smooth uniform surface, economic and durable material",
    info: "El material más usado en Monterrey. Resistente a la humedad, fácil de limpiar y disponible en cientos de colores. Ideal para proyectos con buen presupuesto sin sacrificar calidad.",
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

  const buildVidaPromptHints = () => {
    return PREGUNTAS_VIDA.map(p => {
      const respKey = vidaResp[p.key];
      if (!respKey) return "";
      const opcion = p.opciones.find(o => o.value === respKey);
      return opcion?.prompt || "";
    }).filter(Boolean).join(", ");
  };

  const generarRender = async () => {
    if (!estilo || !tipoProyecto) return;
    const LIMITE = sinCuenta ? 1 : 3;
    const usados = parseInt(localStorage.getItem("enkaje_renders") || "0", 10);
    if (usados >= LIMITE) { setRenderBloqueado(true); return; }
    setRenderLoading(true);
    setRenderMsg("");
    setRenderUrl(null);
    setDescripcionIA(null);

    const estiloData   = ESTILOS.find(e => e.key === estilo);
    const colorData    = COLORES.find(c => c.key === colorElegido);
    const acabadoData  = ACABADOS.find(a => a.key === acabado);
    const materialData = MATERIALES.find(m => m.key === material);
    const vidaHints    = buildVidaPromptHints();

    const tipoLabel = tipoProyecto === "cocina" ? "kitchen"
      : tipoProyecto === "closet" ? "walk-in closet"
      : tipoProyecto === "puerta" ? "interior door"
      : tipoProyecto === "mueble" ? "custom furniture"
      : tipoProyecto === "panel"  ? "decorative wall panel"
      : "bathroom vanity";

    // ── Descripción técnica de material para prompt ──────────────────────────
    const MATERIAL_PROMPT_DETAIL = {
      melamina: `Cabinet material: melamine-coated particleboard (tablero aglomerado con melamina). Surface must look perfectly smooth, uniform, matte or satin texture with no visible wood grain. Edges have thin ABS edge banding, perfectly flush. The surface reflects light softly and evenly. This is the most common Mexican residential kitchen material — it should look clean, practical and modern, NOT cheap.`,
      mdf: `Cabinet material: MDF with lacquered paint finish (MDF lacado). Surface must look ultra-smooth, perfectly flat, zero texture, like a painted automotive surface. Solid color, no wood grain visible whatsoever. Edges are perfectly sharp and clean. The paint gives a premium, almost plastic-smooth appearance. Very high-end finish.`,
      enchapado: `Cabinet material: MDF base with real wood veneer surface (enchapado de madera). The surface shows genuine natural wood grain texture — visible, tactile-looking, organic. Grain runs consistently in one direction. Color varies naturally across panels as real wood does. Edges show matching wood veneer. The wood veneer creates warmth and visual richness that painted surfaces cannot replicate.`,
      madera_solida: `Cabinet material: solid hardwood (madera sólida maciza). Each panel and door is made from a single piece or glued solid wood boards. The grain is deep, rich, three-dimensional — NOT a veneer or print. You can see the natural variation between boards, knots if rustic style, end grain on edges. The wood has depth and warmth that reads as genuinely natural. Surface may be oiled, waxed, or lacquered but the solid wood character must be unmistakable.`,
    };

    const materialPromptDetail = material ? (MATERIAL_PROMPT_DETAIL[material] || materialData?.prompt) : "";

    const prompt = [
      // Base y calidad
      `Hyperrealistic architectural interior render, photographic quality, indistinguishable from a real photograph.`,
      `Shot with a professional architectural camera, wide-angle lens, perfect exposure, no lens distortion.`,
      `Lighting: dramatic yet natural, combination of warm ambient light and precise accent lighting, soft shadows, no blown highlights.`,
      `Setting: high-end residential home in Monterrey, Mexico, upper-middle class neighborhood.`,

      // Tipo de proyecto
      `The space features a brand new custom-built ${tipoLabel} as the centerpiece.`,

      // Estilo
      `Design style: ${estiloData?.label}. ${estiloData?.prompt_hint}. Every design decision must reflect this style consistently.`,

      // Material — descripción técnica detallada
      materialPromptDetail && `MATERIAL SPECIFICATION (critical): ${materialPromptDetail}`,

      // Color
      colorData && `Cabinet door color: ${colorData.prompt}. Apply this color consistently to ALL cabinet doors and drawer fronts. Do NOT apply to walls, countertop, or appliances.`,

      // Acabado
      acabadoData && `Surface finish on all cabinet doors: ${acabadoData.prompt}. This finish must be clearly visible in the render — pay attention to how light interacts with the surface.`,

      // Vida
      vidaHints && `Functional design requirements based on the household: ${vidaHints}.`,

      // Descripción del cliente
      descripcion && `Client's specific requests: ${descripcion}.`,

      // Reglas estrictas de layout
      foto ? `LAYOUT RULES: preserve the EXACT same room geometry, wall positions, window locations, ceiling height, and floor area from the reference photo. Only replace or redesign the ${tipoLabel} itself.` : `Create a realistic, well-proportioned ${tipoLabel} that looks naturally integrated in a Mexican home.`,

      // Calidad final
      `Final quality requirements: 8K resolution detail, sharp focus throughout, realistic material textures with proper specularity and micro-detail, professional interior photography composition, no watermarks, no text, no artificial-looking elements.`,
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
        localStorage.setItem("enkaje_renders", String(usados + 1));
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
          localStorage.setItem("enkaje_renders", String(usados + 1));
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
                  {sinCuenta ? "Ya usaste tu render gratuito" : "Llegaste al límite de renders"}
                </h3>
                <p style={{ color:"#666", fontSize:13, lineHeight:1.7, marginBottom:20 }}>
                  {sinCuenta ? "Crea una cuenta gratis y obtén 3 renders sin marca de agua." : "Has usado tus 3 renders del mes."}
                </p>
                {sinCuenta && <a href="/app" style={{ display:"block", background:"#d4af37", color:"#000", borderRadius:12, padding:"13px 24px", fontWeight:900, fontSize:14, textDecoration:"none" }}>Crear cuenta gratis → 3 renders</a>}
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
