import { useState, useRef, useEffect } from "react";
import { buildRenderPrompt } from "./renderPrompt.js";
import { COLORES_MELAMINA, TIPOS_COLOR, CANTOS, NOTA_LINEA, ACABADO_LINEA, colorPorKey, fotoColor } from "./colores.js";
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
  { key: "cocina",  label: "Cocina",  emoji: "🍳", desc: "Integral, isla, americana",     base: "/moderno.png" },
  { key: "closet",  label: "Closet",  emoji: "👔", desc: "Walk-in, empotrado, vestidor",  base: "/tipo-closet.png" },
  { key: "puerta",  label: "Puerta",  emoji: "🚪", desc: "Interior, exterior, cancelería", base: "/tipo-puerta.png" },
  { key: "mueble",  label: "Mueble",  emoji: "🛋️", desc: "TV, librero, comedor, bar",     base: "/tipo-entretenimiento.png" },
  { key: "panel",   label: "Panel",   emoji: "🪵", desc: "Lambrin, decorativo, duela",    base: "/tipo-entretenimiento.png" },
  { key: "bano",    label: "Baño",    emoji: "🚿", desc: "Vanity, mueble flotante, espejo", base: "/tipo-bano.png" },
];

const ZONAS = [
  "Monterrey", "San Pedro Garza García", "San Nicolás de los Garza", "Guadalupe",
  "Apodaca", "Santa Catarina", "Escobedo", "García", "Juárez", "Cadereyta Jiménez",
];

const ESTILOS = [
  { key: "moderno",       label: "Moderno",       desc: "Líneas limpias, sin adornos",     foto: "/moderno.png",       prompt_hint: "modern clean lines, flat panel cabinets, neutral tones, hidden hardware" },
  { key: "minimalista",   label: "Minimalista",   desc: "Lo esencial, espacios abiertos",  foto: "/minimalista.png",   prompt_hint: "minimalist, handleless cabinets, push-open doors, white matte, open space" },
  { key: "contemporaneo", label: "Contemporáneo", desc: "Mezcla de estilos actuales",      foto: "/contemporaneo.png", prompt_hint: "contemporary style, mix of wood and lacquer, porcelain countertop" },
  { key: "industrial",    label: "Industrial",    desc: "Metal, madera cruda, urbano",     foto: "/industrial.png",    prompt_hint: "industrial style, raw wood, black matte metal hardware, exposed textures, urban loft" },
  { key: "clasico",       label: "Clásico",       desc: "Molduras, detalles ornamentales", foto: "/clasico.png",       prompt_hint: "classic style, raised panel doors, ornamental moldings, solid wood, warm tones" },
  { key: "rustico",       label: "Rústico",       desc: "Madera natural, texturas orgánicas", foto: "/rustico.png",    prompt_hint: "rustic style, natural pine or cedar wood, visible grain, organic textures, warm earthy tones" },
  { key: "nordico",       label: "Nórdico",       desc: "Blanco, madera clara, acogedor",  foto: "/nordico.png",       prompt_hint: "scandinavian nordic style, white cabinets, light birch wood accents, cozy warm lighting" },
  { key: "lujo",          label: "Lujo / Premium", desc: "Materiales nobles, exclusividad", foto: "/lujo.png",         prompt_hint: "luxury premium style, veined marble countertop, gold brass hardware, noble wood veneer, dramatic lighting" },
];

const COLORES = [
  { key: "blanco_mate",   label: "Blanco mate",   hex: "#F5F5F0", desc: "Limpio, atemporal",   prompt: "white matte cabinets" },
  { key: "negro_mate",    label: "Negro mate",    hex: "#1a1a1a", desc: "Dramático, elegante",  prompt: "black matte cabinets" },
  { key: "gris",          label: "Gris",          hex: "#888888", desc: "Neutro, versátil",     prompt: "grey cabinets" },
  { key: "madera_clara",  label: "Madera clara",  hex: "#C8A96E", desc: "Cálido, natural",      prompt: "light wood oak finish cabinets" },
  { key: "madera_oscura", label: "Madera oscura", hex: "#5C3D1E", desc: "Rico, sofisticado",    prompt: "dark walnut wood finish cabinets" },
  { key: "verde_salvia",  label: "Verde salvia",  hex: "#8FAF8F", desc: "Fresco, de tendencia", prompt: "sage green cabinets" },
  { key: "azul_marino",   label: "Azul marino",   hex: "#2C3E6B", desc: "Profundo, premium",   prompt: "navy blue cabinets" },
  { key: "beige",         label: "Beige",         hex: "#E8D5B0", desc: "Suave, acogedor",      prompt: "warm beige cabinets" },
];

const ACABADOS = [
  { key: "mate",        label: "Mate",        desc: "Sin brillo, disimula huellas", consejo: "Disimula huellas y rayones mejor que el brillo. Si es súper mate antihuella, casi no marca dedos.", foto: "/acabados.png", pos: "0% 0%",     prompt: "matte finish, no gloss, fingerprint resistant surface" },
  { key: "alto_brillo", label: "Alto brillo", desc: "Brilla, marca huellas", consejo: "Se ve moderno y refleja la luz, pero es el que más marca huellas, manchas y rayones. Se limpia fácil con trapo suave, pero hay que hacerlo seguido.",     foto: "/acabados.png", pos: "50% 0%",   prompt: "high gloss finish, reflective shiny surface, lacquered" },
  { key: "satinado",    label: "Satinado",    desc: "Intermedio, fácil de cuidar", consejo: "Un brillo suave: marca menos que el alto brillo y se limpia fácil. Buen punto medio para cocina.",      foto: "/acabados.png", pos: "100% 0%",  prompt: "satin finish, soft sheen, semi-gloss" },
  { key: "tipo_madera", label: "Tipo madera", desc: "Veta visible, disimula", consejo: "La veta disimula huellas, polvo y rayones pequeños. Muy práctico para uso diario.",   foto: "/acabados.png", pos: "0% 100%",  prompt: "wood grain texture finish, natural veneer look, visible wood grain pattern" },
  { key: "lacado",      label: "Lacado",      desc: "Color parejo, cuida golpes", consejo: "Es MDF pintado: color muy parejo y elegante, pero se puede despostillar con golpes y cuesta más retocarlo.",  foto: "/acabados.png", pos: "50% 100%", prompt: "lacquered finish, solid color, premium painted surface" },
  { key: "texturizado", label: "Texturizado", desc: "Con relieve, cuesta limpiar", consejo: "Se siente y se ve como madera real, pero el relieve junta polvo y grasa. En cocina se limpia con más trabajo.",      foto: "/acabados.png", pos: "100% 100%", prompt: "textured finish, embossed surface, tactile relief pattern" },
];

const MATERIALES = [
  {
    key: "melamina", label: "Melamina", desc: "Liso + veta madera · Lo más popular",
    badge: "💚 Más económico", badgeColor: "#4caf50", foto: "/mat-melamina.png", color: "#4caf50",
    prompt: "melamine board finish, smooth uniform surface, economic and durable material",
    info: "El material más usado en Monterrey. Disponible en cientos de colores lisos y también en acabados tipo madera. Resistente a la humedad y fácil de limpiar.",
  },
  {
    key: "mdf", label: "MDF lacado", desc: "Acabado fino · Colores exactos",
    badge: "🔵 Precio medio", badgeColor: "#00bcd4", foto: "/mat-mdf.png", color: "#00bcd4",
    prompt: "MDF lacquered finish, smooth painted surface, premium color finish",
    info: "Permite colores sólidos perfectamente lisos y uniformes. Mejor acabado que la melamina — ideal si el color y la presentación son prioridad.",
  },
  {
    key: "enchapado", label: "Madera enchapada", desc: "Aspecto madera · Precio medio-alto",
    badge: "🟡 Medio-alto", badgeColor: "#d4af37", foto: "/mat-enchapado.png", color: "#d4af37",
    prompt: "wood veneer finish, real wood surface layer on MDF base, natural wood appearance",
    info: "Capa real de madera sobre base de MDF. Tiene la calidez y veta natural de la madera sólida a un costo más accesible.",
  },
  {
    key: "madera_solida", label: "Madera sólida", desc: "Premium · Máxima durabilidad",
    badge: "⭐ Premium", badgeColor: "#f0a500", foto: "/mat-madera.png", color: "#f0a500",
    prompt: "solid wood construction, natural grain visible, premium hardwood material",
    info: "La opción de mayor valor y durabilidad. Cada pieza es única. Puede restaurarse y repintarse con los años. Inversión que dura décadas.",
  },
];

// Nivel de gama que elige el cliente. La clave coincide con RANGOS_BASE (eco / medio / premium).
const GAMAS = [
  { key: "eco",     label: "Económico", desc: "Sencillo y bien hecho" },
  { key: "medio",   label: "Medio",     desc: "Buen equilibrio" },
  { key: "premium", label: "Alta gama", desc: "Acabados de lujo" },
];

const BASE_POR_TIPO = {
  cocina: "/moderno.png", closet: "/tipo-closet.png", puerta: "/tipo-puerta.png",
  mueble: "/tipo-entretenimiento.png", panel: "/tipo-entretenimiento.png", bano: "/tipo-bano.png",
};
const PREGUNTAS_VIDA_POR_TIPO = {
  cocina: [
    {
      key: "ninos_mascotas", pregunta: "¿Hay niños o mascotas en casa?",
      opciones: [
        { value: "si_ninos",    emoji: "👶",    label: "Sí, niños",    prompt: "child-safe design, no sharp island corners, scratch-resistant durable materials, soft-close hinges" },
        { value: "si_mascotas", emoji: "🐾",    label: "Sí, mascotas", prompt: "pet-friendly materials, easy to clean surfaces, durable scratch-resistant finish" },
        { value: "ambos",       emoji: "👨‍👩‍👧🐕", label: "Ambos",       prompt: "child and pet safe, no sharp edges, extra durable easy-clean surfaces" },
        { value: "no",          emoji: "🧑‍💼",   label: "No",           prompt: "" },
      ]
    },
    {
      key: "cocina_uso", pregunta: "¿Cómo usan la cocina?",
      opciones: [
        { value: "cocino_mucho", emoji: "👨‍🍳", label: "Cocinamos seguido",    prompt: "heavy-use kitchen, durable countertop quartz or granite, strong ventilation hood, oil-resistant surfaces" },
        { value: "basico",       emoji: "🥗",  label: "Uso básico diario",    prompt: "practical everyday kitchen, standard laminate countertop" },
        { value: "social",       emoji: "🥂",  label: "Para recibir visitas", prompt: "open concept kitchen for entertaining, island or peninsula, aesthetic statement piece" },
      ]
    },
    {
      key: "limpieza", pregunta: "¿Cuánto tiempo quieres dedicar a limpiar?",
      opciones: [
        { value: "minimo",  emoji: "⚡", label: "Lo mínimo",           prompt: "anti-fingerprint matte finish, handleless Gola profile, easy-clean seamless surfaces" },
        { value: "normal",  emoji: "🧹", label: "Limpieza normal",     prompt: "easy maintenance surfaces, practical finish" },
        { value: "detalle", emoji: "✨", label: "Me gusta el detalle", prompt: "decorative details acceptable, premium finish" },
      ]
    },
  ],
  closet: [
    {
      key: "usuario", pregunta: "¿Para quién es el closet?",
      opciones: [
        { value: "pareja",  emoji: "👫", label: "Pareja",         prompt: "dual-sided wardrobe, his and hers sections, double hanging rails, balanced storage" },
        { value: "mujer",   emoji: "👗", label: "Solo para mí",   prompt: "feminine wardrobe, shoe display area, accessory drawers, full-length mirror" },
        { value: "hombre",  emoji: "👔", label: "Para caballero", prompt: "suit hanging section, tie rack, shoe storage, shirt shelving, minimal design" },
        { value: "nino",    emoji: "👶", label: "Para niño/a",    prompt: "child-height hanging rails, colorful storage bins, adjustable shelving" },
      ]
    },
    {
      key: "organizacion", pregunta: "¿Cómo organizas tu ropa?",
      opciones: [
        { value: "colgada", emoji: "👚", label: "Mucho colgado",   prompt: "maximum hanging space, double rail system, long hang section for dresses" },
        { value: "doblada", emoji: "📦", label: "Mucho doblado",   prompt: "maximum shelf space, deep shelves, folded clothing storage priority" },
        { value: "mixto",   emoji: "🔄", label: "Mitad y mitad",   prompt: "balanced hanging and shelving, versatile storage combination" },
      ]
    },
    {
      key: "estilo_vida", pregunta: "¿Cómo describes tu guardarropa?",
      opciones: [
        { value: "minimalista", emoji: "⬜", label: "Minimalista",    prompt: "minimal wardrobe, clean open shelving, few items well organized" },
        { value: "coleccion",   emoji: "👠", label: "Gran colección", prompt: "extensive wardrobe storage, maximum capacity, shoe wall display" },
        { value: "practico",    emoji: "🎒", label: "Práctico",       prompt: "functional wardrobe, easy access, practical storage solutions" },
      ]
    },
  ],
  bano: [
    {
      key: "estilo_bano", pregunta: "¿Qué ambiente quieres en tu baño?",
      opciones: [
        { value: "spa",      emoji: "🧖", label: "Spa / relax",      prompt: "spa atmosphere, warm LED lighting, floating vanity, clean surfaces, zen feel" },
        { value: "moderno",  emoji: "⬛", label: "Moderno y limpio",  prompt: "modern clean bathroom, minimal design, matte black fixtures, geometric forms" },
        { value: "calido",   emoji: "🪵", label: "Cálido con madera", prompt: "warm bathroom, wood veneer accents, brass fixtures, organic textures" },
        { value: "practico", emoji: "🔧", label: "Práctico",          prompt: "functional bathroom, durable materials, easy clean surfaces" },
      ]
    },
    {
      key: "uso_bano", pregunta: "¿Cuántas personas usan este baño?",
      opciones: [
        { value: "personal", emoji: "🧍",   label: "Solo yo",   prompt: "personal bathroom, single sink, compact design, personalized storage" },
        { value: "pareja",   emoji: "👫",   label: "En pareja", prompt: "couple bathroom, double sink vanity, his and hers storage, generous counter space" },
        { value: "familia",  emoji: "👨‍👩‍👧", label: "Familia",  prompt: "family bathroom, durable materials, extra storage, practical and easy to clean" },
      ]
    },
    {
      key: "almacenamiento_bano", pregunta: "¿Cuánto almacenamiento necesitas?",
      opciones: [
        { value: "mucho",  emoji: "📦", label: "Mucho",                    prompt: "maximum storage, tall tower unit, drawers and cabinets, medicine cabinet" },
        { value: "normal", emoji: "🗄️", label: "Lo normal",               prompt: "standard storage, cabinet below sink, mirror cabinet above" },
        { value: "minimo", emoji: "✨", label: "Lo mínimo, es para diseño", prompt: "design-forward minimal storage, floating shelf, clean visual impact" },
      ]
    },
  ],
  puerta: [
    {
      key: "uso_puerta", pregunta: "¿Para dónde es la puerta?",
      opciones: [
        { value: "principal", emoji: "🏠", label: "Entrada principal",   prompt: "impressive entrance door, statement piece, strong and secure, premium hardware" },
        { value: "interior",  emoji: "🚪", label: "Interior / recámara", prompt: "interior bedroom door, privacy, sound dampening, quality finish" },
        { value: "bano",      emoji: "🚿", label: "Baño",               prompt: "bathroom door, moisture resistant materials, privacy" },
        { value: "closet",    emoji: "👗", label: "Closet",             prompt: "wardrobe door, smooth sliding or swing, integrated with wardrobe design" },
      ]
    },
    {
      key: "seguridad", pregunta: "¿Qué tan importante es la seguridad?",
      opciones: [
        { value: "alta",     emoji: "🔒", label: "Muy importante",     prompt: "security door, solid core construction, premium lock system, reinforced frame" },
        { value: "normal",   emoji: "🔑", label: "Normal",             prompt: "standard security, quality lock, solid construction" },
        { value: "estetica", emoji: "🎨", label: "Priorizo el diseño", prompt: "design-forward door, aesthetic priority, statement hardware" },
      ]
    },
    {
      key: "mantenimiento_puerta", pregunta: "¿Cuánto mantenimiento aceptas?",
      opciones: [
        { value: "ninguno", emoji: "⚡", label: "Cero mantenimiento", prompt: "low maintenance door, painted MDF, durable finish" },
        { value: "poco",    emoji: "🧹", label: "Poco",               prompt: "minimal maintenance, quality lacquer finish, durable coating" },
        { value: "madera",  emoji: "🪵", label: "Acepto barnizar",    prompt: "natural wood door, visible grain, accepts periodic refinishing" },
      ]
    },
  ],
  mueble: [
    {
      key: "uso_mueble", pregunta: "¿Para qué espacio es el mueble?",
      opciones: [
        { value: "sala",     emoji: "🛋️", label: "Sala / comedor",    prompt: "living room furniture, statement piece, entertaining space, social area design" },
        { value: "recamara", emoji: "🛏️", label: "Recámara",          prompt: "bedroom furniture, personal space, cozy and functional, storage integration" },
        { value: "oficina",  emoji: "💼", label: "Oficina / estudio",  prompt: "office furniture, productive workspace, cable management, organized storage" },
        { value: "otro",     emoji: "📦", label: "Otro espacio",       prompt: "custom space furniture, tailored design" },
      ]
    },
    {
      key: "almacenamiento_mueble", pregunta: "¿Qué prioridad tiene el almacenamiento?",
      opciones: [
        { value: "mucho",      emoji: "📦", label: "Necesito mucho espacio",             prompt: "maximum storage furniture, drawers, cabinets, hidden storage solutions" },
        { value: "equilibrio", emoji: "⚖️", label: "Equilibrio diseño/almacenamiento",   prompt: "balanced furniture, mix of open display and closed storage" },
        { value: "diseno",     emoji: "✨", label: "Priorizo el diseño",                 prompt: "design-first furniture, minimal storage, visual impact priority" },
      ]
    },
    {
      key: "uso_diario", pregunta: "¿Qué tan intenso será el uso?",
      opciones: [
        { value: "intenso",    emoji: "💪", label: "Uso intenso diario", prompt: "heavy-duty furniture, durable materials, scratch-resistant, practical finish" },
        { value: "normal",     emoji: "🏠", label: "Uso normal",         prompt: "everyday furniture, standard durability, quality materials" },
        { value: "decorativo", emoji: "🎨", label: "Más decorativo",     prompt: "decorative furniture, display piece, premium finish, visual statement" },
      ]
    },
  ],
  panel: [
    {
      key: "ambiente_panel", pregunta: "¿Qué ambiente quieres crear?",
      opciones: [
        { value: "calido",   emoji: "🪵", label: "Cálido y acogedor",   prompt: "warm panel wall, natural wood tones, cozy atmosphere, organic textures" },
        { value: "moderno",  emoji: "⬛", label: "Moderno y dramático",  prompt: "dramatic modern panel wall, deep tones, bold geometric pattern, statement wall" },
        { value: "natural",  emoji: "🌿", label: "Natural y relajado",   prompt: "natural panel wall, light wood grain, calm atmosphere, biophilic design" },
        { value: "premium",  emoji: "✨", label: "Premium y exclusivo",  prompt: "luxury panel wall, book-matched veneer, dramatic LED lighting, exclusive feel" },
      ]
    },
    {
      key: "ubicacion_uso", pregunta: "¿En qué espacio va el panel?",
      opciones: [
        { value: "sala",     emoji: "🛋️", label: "Sala principal",    prompt: "living room feature wall, focal point, entertaining backdrop" },
        { value: "recamara", emoji: "🛏️", label: "Recámara",          prompt: "bedroom headboard wall, intimate atmosphere, bedroom focal point" },
        { value: "comedor",  emoji: "🍽️", label: "Comedor",           prompt: "dining room accent wall, sophisticated backdrop, warm ambient lighting" },
        { value: "estudio",  emoji: "💼", label: "Estudio / oficina",  prompt: "office feature wall, professional backdrop, productive atmosphere" },
      ]
    },
    {
      key: "iluminacion_panel", pregunta: "¿Quieres iluminación LED integrada?",
      opciones: [
        { value: "si_led",    emoji: "💡", label: "Sí, con LED",         prompt: "LED integrated panel wall, dramatic lighting effect, floating panel appearance" },
        { value: "indirecta", emoji: "🌙", label: "Luz indirecta sutil", prompt: "subtle indirect LED, soft glow, ambient lighting" },
        { value: "sin_led",   emoji: "🪵", label: "Sin LED, natural",    prompt: "no LED lighting, natural wood panel, pure material beauty" },
      ]
    },
  ],
};
// Por qué hacemos cada pregunta (se muestra debajo de la pregunta)
const POR_QUE_PREGUNTA = {
  ninos_mascotas:        "Así elegimos esquinas sin filo, bisagras que cierran suave y acabados que aguantan rayones y manitas (el alto brillo los marca más).",
  cocina_uso:            "Si cocinan seguido conviene un acabado liso que se limpie fácil de grasa (el texturizado la guarda en el relieve), y cubierta y campana resistentes; si es para recibir, una isla o barra.",
  limpieza:              "El mate y las vetas de madera disimulan huellas; el alto brillo las marca y el texturizado junta polvo y grasa en el relieve.",
  usuario:               "Cambia la altura de los tubos y cómo se reparte el espacio.",
  organizacion:          "Define cuánto espacio va para colgar y cuánto para repisas y cajones.",
  estilo_vida:           "Nos dice cuánto espacio necesitas, por ejemplo para zapatos y accesorios.",
  estilo_bano:           "Define los materiales y la luz que van con el ambiente que buscas.",
  uso_bano:              "Ayuda a decidir si lleva uno o dos lavabos y cuánto espacio para guardar.",
  almacenamiento_bano:   "Así sabemos si lleva torre, cajones o solo una repisa.",
  uso_puerta:            "Una puerta de entrada necesita más resistencia y seguridad; la de baño, aguantar la humedad.",
  seguridad:             "Cambia el tipo de puerta, el marco y la chapa.",
  mantenimiento_puerta:  "La madera natural se ve muy bien, pero hay que barnizarla cada cierto tiempo; el MDF pintado casi no pide mantenimiento.",
  uso_mueble:            "Un mueble se diseña distinto si va en la sala, en la recámara o en una oficina.",
  almacenamiento_mueble: "Define cuántas puertas y cajones lleva y cuánto queda abierto para decorar.",
  uso_diario:            "Si el uso es intenso, conviene un material y un acabado más resistentes.",
  ambiente_panel:        "Define el tono y la textura del panel.",
  ubicacion_uso:         "La altura, la luz y el diseño cambian según el lugar.",
  iluminacion_panel:     "La luz LED se planea desde el principio, porque lleva cableado.",
};

const PREGUNTAS_VIDA_DEFAULT = [
  {
    key: "ninos_mascotas", pregunta: "¿Hay niños o mascotas en casa?",
    opciones: [
      { value: "si_ninos",    emoji: "👶",    label: "Sí, niños",    prompt: "child-safe design, no sharp island corners, scratch-resistant durable materials, soft-close hinges" },
      { value: "si_mascotas", emoji: "🐾",    label: "Sí, mascotas", prompt: "pet-friendly materials, easy to clean surfaces, durable scratch-resistant finish" },
      { value: "ambos",       emoji: "👨‍👩‍👧🐕", label: "Ambos",       prompt: "child and pet safe, no sharp edges, extra durable easy-clean surfaces" },
      { value: "no",          emoji: "🧑‍💼",   label: "No",           prompt: "" },
    ]
  },
  {
    key: "limpieza", pregunta: "¿Cuánto tiempo quieres dedicar a limpiar?",
    opciones: [
      { value: "minimo",  emoji: "⚡", label: "Lo mínimo",          prompt: "anti-fingerprint matte finish, handleless Gola profile, easy-clean seamless surfaces, no ornamental moldings" },
      { value: "normal",  emoji: "🧹", label: "Limpieza normal",    prompt: "easy maintenance surfaces, practical finish" },
      { value: "detalle", emoji: "✨", label: "Me gusta el detalle", prompt: "decorative details acceptable, premium finish" },
    ]
  },
  {
    key: "cocina_uso", pregunta: "¿Cómo usan la cocina principalmente?",
    opciones: [
      { value: "cocino_mucho", emoji: "👨‍🍳", label: "Cocinamos seguido",    prompt: "heavy-use kitchen, durable countertop quartz or granite, strong ventilation hood, oil-resistant surfaces" },
      { value: "basico",       emoji: "🥗",  label: "Uso básico diario",    prompt: "practical everyday kitchen, standard laminate countertop" },
      { value: "social",       emoji: "🥂",  label: "Para recibir visitas", prompt: "open concept kitchen for entertaining, island or peninsula, aesthetic statement piece" },
    ]
  },
];

// ── RANGOS DINÁMICOS — Precios reales Monterrey 2025 ─────────────────────────
// Fuente: ZenHome Monterrey, Habitissimo NL, Cronoshare MX
const RANGOS_BASE = {
  cocina:  { eco: [35000, 60000],  medio: [55000, 95000],  premium: [90000, 160000] },
  closet:  { eco: [18000, 35000],  medio: [35000, 65000],  premium: [65000, 130000] },
  puerta:  { eco: [8000,  16000],  medio: [15000, 28000],  premium: [26000, 55000]  },
  mueble:  { eco: [12000, 25000],  medio: [24000, 45000],  premium: [42000, 90000]  },
  panel:   { eco: [6000,  14000],  medio: [13000, 28000],  premium: [25000, 55000]  },
  bano:    { eco: [12000, 24000],  medio: [22000, 42000],  premium: [40000, 85000]  },
};

const NIVEL_ESTILO = {
  moderno: "eco", minimalista: "eco", nordico: "eco",
  contemporaneo: "medio", rustico: "medio", industrial: "medio",
  clasico: "premium", lujo: "premium",
};

const FACTOR_MATERIAL = {
  melamina: 1.0, mdf: 1.2, enchapado: 1.5, madera_solida: 2.0,
};

function calcularRango(tipo, estilo, mat, gama) {
  const nivel = gama || NIVEL_ESTILO[estilo] || "eco";
  const base  = RANGOS_BASE[tipo]?.[nivel] || RANGOS_BASE.cocina.eco;
  const factor = FACTOR_MATERIAL[mat] || 1.0;
  return {
    min: Math.round(base[0] * factor / 1000) * 1000,
    max: Math.round(base[1] * factor / 1000) * 1000,
  };
}
// ─────────────────────────────────────────────────────────────────────────────

const TIEMPOS = {
  cocina: "20 a 35 días hábiles", closet: "15 a 20 días hábiles",
  puerta: "8 a 15 días hábiles",  mueble: "15 a 25 días hábiles",
  panel:  "5 a 10 días hábiles",  bano:   "10 a 18 días hábiles",
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

async function generarDescripcionIA({ tipoProyecto, estilo, color, acabado, material, vidaResp, descripcion, preguntasVida, gama, colorInterior, canto }) {
  const gamaData     = GAMAS.find(g => g.key === gama);
  const estiloData   = ESTILOS.find(e => e.key === estilo);
  const colorTexto   = resumenColores(color, colorInterior, canto);
  const acabadoData  = ACABADOS.find(a => a.key === acabado);
  const materialData = MATERIALES.find(m => m.key === material);
  const tipoData     = TIPOS_PROYECTO.find(t => t.key === tipoProyecto);
 const vidaResumen  = preguntasVida.map(p => { 
    const r = vidaResp[p.key];
    const op = p.opciones.find(o => o.value === r);
    return op ? op.label : null;
  }).filter(Boolean).join(", ");

  const prompt = `Eres un diseñador de interiores experto en carpintería residencial en Monterrey, México. 
Escribe una descripción de 3-4 oraciones en español, en segunda persona (tú), sobre este proyecto de carpintería.
Sé específico, cálido y práctico. Menciona cómo el diseño se adapta a su estilo de vida.
Datos: Tipo: ${tipoData?.label}, Nivel: ${gamaData?.label || "no especificado"} (no lo describas como más lujoso de lo que es), Estilo: ${estiloData?.label} (${estiloData?.desc}), Colores: ${colorTexto || "no especificado"}, Acabado: ${acabadoData?.label || "no especificado"}, Material: ${materialData?.label || "no especificado"} — ${materialData?.info || ""}, Perfil del hogar: ${vidaResumen || "no especificado"}, Notas: ${descripcion || "ninguna"}
Responde SOLO la descripción, sin títulos ni listas. Máximo 4 oraciones.`;

  try {
    const res = await fetch("/api/common", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model: "claude-sonnet-4-6", max_tokens: 300, messages: [{ role: "user", content: prompt }] })
    });
    const data = await res.json();
    console.log("RENDER RESPONSE:", JSON.stringify(data));
    return data?.data?.content?.[0]?.text?.trim() || null;
  } catch { return null; }
}

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

// Nombre del color (catálogo nuevo o los 8 colores anteriores, para borradores viejos)
const nombreColor = (key) => colorPorKey(key)?.nombre || COLORES.find(c => c.key === key)?.label || key || "";

// "Exterior: Nogal · Interior: Blanco · Canto: igual al exterior"
const resumenColores = (ext, int, canto) => {
  if (!ext) return null;
  const interior = int === "igual" ? nombreColor(ext) : nombreColor(int || "blanco");
  const cantoTxt = (CANTOS.find(c => c.key === (canto || "igual"))?.label || "").toLowerCase();
  return `Exterior: ${nombreColor(ext)} · Interior: ${interior} · Canto: ${cantoTxt}`;
};

// Selector compacto: pestañas Lisos / Maderas / Especiales, cuadritos con foto, "Ver más"
function SelectorColor({ value, onChange, quitar }) {
  const [tab, setTab] = useState(() => colorPorKey(value)?.grupo || "madera");
  const [todos, setTodos] = useState(false);
  const lista = COLORES_MELAMINA.filter(c => c.grupo === tab);
  const idxSel = lista.findIndex(c => c.key === value);
  const visibles = todos || idxSel >= 8 ? lista : lista.slice(0, 8);
  return (
    <div>
      <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:10 }}>
        {TIPOS_COLOR.map(t => (
          <button key={t.key} onClick={() => { setTab(t.key); setTodos(false); }} style={{
            background: tab === t.key ? "#d4af37" : "transparent", color: tab === t.key ? "#000" : "#888",
            border: `1px solid ${tab === t.key ? "#d4af37" : "#2a2a20"}`, borderRadius: 50,
            padding: "5px 12px", fontSize: 12, fontWeight: 600, cursor: "pointer"
          }}>{t.label}</button>
        ))}
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap:8 }}>
        {visibles.map(c => {
          const sel = value === c.key;
          return (
            <button key={c.key} onClick={() => onChange(sel && quitar ? "" : c.key)} title={c.nombre} style={{
              background:"transparent", border:"none", padding:0, cursor:"pointer", textAlign:"center"
            }}>
              <div style={{
                position:"relative", aspectRatio:"1", borderRadius:10, overflow:"hidden", background:c.hex,
                border:`2px solid ${sel ? "#d4af37" : "#1a1a12"}`, boxShadow: sel ? "0 0 12px #d4af3750" : "none"
              }}>
                <img src={fotoColor(c.key)} alt={c.nombre} loading="lazy" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} onError={ev => { ev.target.style.display = "none"; }} />
                {sel && <div style={{ position:"absolute", top:4, right:4, background:"#d4af37", borderRadius:"50%", width:18, height:18, display:"flex", alignItems:"center", justifyContent:"center", fontSize:10, fontWeight:900, color:"#000" }}>✓</div>}
              </div>
              <div style={{ fontSize:10, marginTop:4, lineHeight:1.2, color: sel ? "#d4af37" : "#888", fontWeight: sel ? 700 : 400 }}>{c.corto || c.nombre}</div>
            </button>
          );
        })}
      </div>
      {!todos && idxSel < 8 && lista.length > 8 && (
        <button onClick={() => setTodos(true)} style={{ marginTop:10, background:"none", border:"none", color:"#d4af37", fontSize:12, fontWeight:600, cursor:"pointer", padding:0 }}>
          Ver más colores ({lista.length - 8}) ▾
        </button>
      )}
    </div>
  );
}

// Avisos según el acabado/material y lo que contestó el cliente
function avisosAcabado({ tipo, acabado, material, vida }) {
  const v = vida || {};
  const conNinos = ["si_ninos", "si_mascotas", "ambos"].includes(v.ninos_mascotas);
  const limpiaPoco = v.limpieza === "minimo";
  const cocinaMucho = tipo === "cocina" && v.cocina_uso === "cocino_mucho";
  const a = [];
  if (acabado === "texturizado" && cocinaMucho) a.push("Cocinas seguido: el texturizado guarda grasa en el relieve y cuesta más limpiarlo. Para la cocina conviene mate, satinado o tipo madera liso.");
  if (acabado === "texturizado" && limpiaPoco && !cocinaMucho) a.push("Quieres limpiar poco: el relieve del texturizado junta polvo. Un acabado liso se limpia más rápido.");
  if (acabado === "alto_brillo" && limpiaPoco) a.push("Quieres limpiar poco: el alto brillo marca huellas y se nota todo. El mate o el tipo madera disimulan mucho más.");
  if (acabado === "alto_brillo" && conNinos) a.push("Con niños o mascotas, el alto brillo marca rayones y manitas. El mate o el tipo madera aguantan mejor la vista.");
  if ((acabado === "lacado" || material === "mdf") && conNinos) a.push("El MDF pintado se puede despostillar con golpes. Con niños o mascotas, la melamina aguanta más.");
  if (material === "madera_solida" && limpiaPoco) a.push("La madera sólida necesita barniz o sellador cada cierto tiempo. Si quieres cero mantenimiento, la melamina es más práctica.");
  return a;
}

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
    cursor: disabled ? "not-allowed" : "pointer", transition:"all .2s", letterSpacing:0.5, ...style
  }}>{children}</button>
);

const Watermark = () => (
  <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center", pointerEvents:"none", zIndex:10 }}>
    <div style={{ fontFamily:"'Playfair Display',serif", fontSize:22, fontWeight:900, color:"rgba(212,175,55,0.35)", letterSpacing:4, transform:"rotate(-30deg)", userSelect:"none", whiteSpace:"nowrap" }}>
      EnKaje Pro · Vista Previa
    </div>
  </div>
);

// ─── Registro / login dentro del portal (sin salir a /app) ───────────────
function AuthInline({ titulo, onSuccess }) {
  const [modo, setModo] = useState("registro");
  const [nom, setNom] = useState("");
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const inp = { width:"100%", background:"#0f0f0a", border:"1px solid #2a2a20", borderRadius:12, padding:"12px 14px", color:"#e8e0d0", fontSize:14, marginBottom:10 };
  const enviar = async () => {
    setErr("");
    if (modo === "registro" && !nom.trim()) { setErr("Escribe tu nombre."); return; }
    if (!mail.includes("@")) { setErr("Correo inválido."); return; }
    if (pass.length < 6) { setErr("La contraseña debe tener al menos 6 caracteres."); return; }
    setLoading(true);
    try {
      const path = modo === "registro" ? "signup" : "token?grant_type=password";
      const body = modo === "registro"
        ? { email: mail.trim(), password: pass, data: { nombre: nom.trim(), role: "cliente" } }
        : { email: mail.trim(), password: pass };
      const r = await fetch(`${SUPABASE_URL}/auth/v1/${path}`, {
        method: "POST",
        headers: { "apikey": SUPABASE_KEY, "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      const d = await r.json();
      const token = d.access_token || d.session?.access_token;
      const user = d.user;
      if (token && user) {
        const rol = user.user_metadata?.role || "cliente";
        if (rol !== "cliente") { setErr("Esta cuenta es de taller o administrador. Entra desde enkajepro.com/app."); setLoading(false); return; }
        await onSuccess({ token, user });
      } else if (modo === "registro" && d.user && !d.session) {
        setErr("Cuenta creada. Revisa tu correo para confirmarla y luego inicia sesión aquí.");
        setModo("login");
      } else {
        const m = d.error_description || d.msg || d.message || "No se pudo continuar";
        setErr(/already registered/i.test(m) ? "Ese correo ya tiene cuenta. Inicia sesión." : /invalid login/i.test(m) ? "Correo o contraseña incorrectos." : m);
        if (/already registered/i.test(m)) setModo("login");
      }
    } catch { setErr("Error de conexión. Intenta de nuevo."); }
    setLoading(false);
  };
  return (
    <div style={{ background:"linear-gradient(135deg,#1a1208,#0f0f0a)", border:"1px solid #d4af3740", borderRadius:16, padding:20, textAlign:"left", marginBottom:16 }}>
      <div style={{ fontSize:13, fontWeight:700, color:"#d4af37", marginBottom:12 }}>{titulo}</div>
      {modo === "registro" && <input value={nom} onChange={e => setNom(e.target.value)} placeholder="Tu nombre" style={inp} />}
      <input type="email" value={mail} onChange={e => setMail(e.target.value)} placeholder="Correo electrónico" style={inp} />
      <input type="password" value={pass} onChange={e => setPass(e.target.value)} placeholder="Contraseña (mínimo 6 caracteres)" style={inp} onKeyDown={e => { if (e.key === "Enter") enviar(); }} />
      {err && <div style={{ color:"#ff8a80", fontSize:12, marginBottom:10 }}>{err}</div>}
      <button onClick={enviar} disabled={loading} style={{ width:"100%", background:"#d4af37", color:"#000", border:"none", borderRadius:12, padding:"13px 24px", fontWeight:900, fontSize:14, cursor: loading ? "wait" : "pointer" }}>
        {loading ? "Un momento..." : modo === "registro" ? "Crear cuenta y continuar →" : "Iniciar sesión y continuar →"}
      </button>
      <div style={{ textAlign:"center", marginTop:10 }}>
        <button onClick={() => { setModo(modo === "registro" ? "login" : "registro"); setErr(""); }} style={{ background:"none", border:"none", color:"#888", fontSize:12, cursor:"pointer", textDecoration:"underline" }}>
          {modo === "registro" ? "¿Ya tienes cuenta? Inicia sesión" : "¿No tienes cuenta? Créala gratis"}
        </button>
      </div>
    </div>
  );
}

// ─── Cotización sin render ────────────────────────────────────────────────
// Para quien ya sabe lo que quiere (o llega desde un anuncio): un solo formulario
// con fotos del espacio. Crea la solicitud igual que el flujo con render, así que
// llega a los mismos talleres (zona + especialidad, máximo 4).
const PRESUPUESTOS = [
  { key: "bajo",  label: "Hasta $25,000",       min: 0,     max: 25000 },
  { key: "medio", label: "$25,000 – $60,000",   min: 25000, max: 60000 },
  { key: "alto",  label: "$60,000 – $120,000",  min: 60000, max: 120000 },
  { key: "top",   label: "Más de $120,000",     min: 120000, max: 250000 },
  { key: "nose",  label: "Aún no sé",           min: null,  max: null },
];
const NIVELES_MATERIAL = [
  { key: "basico",  label: "Básico",  desc: "Melamina, buen precio" },
  { key: "medio",   label: "Medio",   desc: "MDF, mejores herrajes" },
  { key: "premium", label: "Premium", desc: "Enchapado o madera sólida" },
];
const CUANDO = [
  { key: "urgente",    label: "Lo antes posible" },
  { key: "decidido",   label: "En 1 a 3 meses" },
  { key: "evaluando",  label: "Más adelante" },
  { key: "explorando", label: "Solo estoy cotizando" },
];
const MAX_FOTOS = 3;
const RAPIDA_KEY = "enkaje_cotizacion_rapida";

const comprimirFoto = (file) => new Promise((resolve) => {
  const img = new Image();
  const url = URL.createObjectURL(file);
  img.onload = () => {
    const max = 1600;
    const esc = Math.min(1, max / Math.max(img.width, img.height));
    const c = document.createElement("canvas");
    c.width = Math.round(img.width * esc);
    c.height = Math.round(img.height * esc);
    c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
    c.toBlob(b => { URL.revokeObjectURL(url); resolve(b || file); }, "image/jpeg", 0.82);
  };
  img.onerror = () => { URL.revokeObjectURL(url); resolve(file); };
  img.src = url;
});

function CotizacionRapida({ tipoInicial, onSalir, onAutenticar }) {
  const leerBorrador = () => {
    try {
      const d = JSON.parse(localStorage.getItem(RAPIDA_KEY) || "null");
      if (d && Date.now() - d.ts < 7 * 24 * 3600 * 1000) return d;
    } catch {}
    return {};
  };
  const b0 = useRef(leerBorrador()).current;
  const usr0 = (() => { try { return JSON.parse(sessionStorage.getItem("enkaje_user") || "null"); } catch { return null; } })();
  const [tipo, setTipo]           = useState(tipoInicial || b0.tipo || "");
  const [zona, setZona]           = useState(b0.zona || usr0?.user_metadata?.zona || "");
  const [colonia, setColonia]     = useState(b0.colonia || "");
  const [medidas, setMedidas]     = useState(b0.medidas || "");
  const [nivel, setNivel]         = useState(b0.nivel || "");
  const [presupuesto, setPresup]  = useState(b0.presupuesto || "");
  const [cuando, setCuando]       = useState(b0.cuando || "");
  const [descripcion, setDesc]    = useState(b0.descripcion || "");
  const [telefono, setTelefono]   = useState(b0.telefono || usr0?.user_metadata?.telefono || "");
  const [fotos, setFotos]         = useState(Array.isArray(b0.fotos) ? b0.fotos : []);
  const [subiendo, setSubiendo]   = useState(false);
  const [enviando, setEnviando]   = useState(false);
  const [err, setErr]             = useState("");
  const [enviada, setEnviada]     = useState(false);
  const [sesion, setSesion]       = useState(!!sessionStorage.getItem("enkaje_token"));
  const fileRef = useRef();

  useEffect(() => {
    document.title = "Cotiza tu proyecto · EnKaje Pro";
    try { window.scrollTo(0, 0); } catch {}
  }, []);

  useEffect(() => {
    if (enviada) return;
    try {
      localStorage.setItem(RAPIDA_KEY, JSON.stringify({ ts: Date.now(), tipo, zona, colonia, medidas, nivel, presupuesto, cuando, descripcion, telefono, fotos }));
    } catch {}
  }, [tipo, zona, colonia, medidas, nivel, presupuesto, cuando, descripcion, telefono, fotos, enviada]);

  const subirFotos = async (e) => {
    const files = Array.from(e.target.files || []).slice(0, MAX_FOTOS - fotos.length);
    e.target.value = "";
    if (files.length === 0) return;
    setSubiendo(true); setErr("");
    const nuevas = [];
    for (let i = 0; i < files.length; i++) {
      try {
        const blob = await comprimirFoto(files[i]);
        const fileName = `espacio_${Date.now()}_${Math.random().toString(36).slice(2, 8)}.jpg`;
        const up = await fetch(`${SUPABASE_URL}/storage/v1/object/renders/${fileName}`, {
          method: "POST",
          headers: { "apikey": SUPABASE_KEY, "Authorization": `Bearer ${SUPABASE_KEY}`, "x-upsert": "true", "Content-Type": blob.type || "image/jpeg" },
          body: blob,
        });
        if (up.ok) nuevas.push(`${SUPABASE_URL}/storage/v1/object/public/renders/${fileName}`);
        else setErr("No se pudo subir una foto. Revisa tu conexión e intenta de nuevo.");
      } catch { setErr("No se pudo subir una foto. Revisa tu conexión e intenta de nuevo."); }
    }
    setFotos(f => [...f, ...nuevas].slice(0, MAX_FOTOS));
    setSubiendo(false);
  };

  const faltantes = [
    !tipo && "el tipo de proyecto",
    !zona && "la zona",
    fotos.length === 0 && "al menos 1 foto del espacio",
    !nivel && "el nivel de material",
    !presupuesto && "el presupuesto",
    !cuando && "cuándo lo quieres",
    descripcion.trim().length < 15 && "una descripción corta (mínimo 15 letras)",
    telefono.replace(/\D/g, "").length < 10 && "tu teléfono (10 dígitos)",
  ].filter(Boolean);
  const listo = faltantes.length === 0 && !subiendo;

  const enviar = async (ses) => {
    const token = ses?.token || sessionStorage.getItem("enkaje_token");
    const user  = ses?.user  || JSON.parse(sessionStorage.getItem("enkaje_user") || "{}");
    if (!token || !user?.email) { setErr("Necesitas una cuenta para enviar la solicitud."); return; }
    if (!listo) { setErr("Te falta: " + faltantes.join(", ") + "."); return; }
    setEnviando(true); setErr("");
    const nivelData = NIVELES_MATERIAL.find(n => n.key === nivel);
    const presData = PRESUPUESTOS.find(p => p.key === presupuesto);
    const cuandoData = CUANDO.find(c => c.key === cuando);
    const nom = user.user_metadata?.nombre || "";
    const notas = [
      "📷 Solicitud sin render: el cliente mandó fotos de su espacio.",
      colonia.trim() && `Colonia: ${colonia.trim()}`,
      medidas.trim() && `Medidas aprox.: ${medidas.trim()}`,
      nivelData && `Material: ${nivelData.label} (${nivelData.desc})`,
      presData && `Presupuesto: ${presData.label}`,
      cuandoData && `Cuándo: ${cuandoData.label}`,
    ].filter(Boolean).join("\n");
    const base = {
      tipo_proyecto: tipo,
      render_url: fotos[0],
      fotos_espacio: fotos.join(","),
      material: nivelData ? `${nivelData.label} (${nivelData.desc})` : null,
      observaciones: descripcion.trim(),
      nombre: nom || null,
      correo: user.email,
      telefono: telefono || null,
      zona,
      comentarios_tecnicos: notas,
      estado: "nuevo",
      etapa_seguimiento: "solicitud",
      user_email: user.email,
      created_at: new Date().toISOString(),
    };
    const clean = Object.fromEntries(Object.entries(base).filter(([, v]) => v !== null && v !== ""));
    const headers = { "apikey": SUPABASE_KEY, "Authorization": `Bearer ${token}`, "Content-Type": "application/json", "Prefer": "return=minimal" };
    let ok = false, detalle = "";
    try {
      let rp = await fetch(`${SUPABASE_URL}/rest/v1/proyectos`, { method: "POST", headers, body: JSON.stringify(clean) });
      if (!rp.ok) {
        detalle = await rp.text();
        // Si todavía no existe la columna fotos_espacio, se envía sin ella (la 1ª foto va en render_url)
        if (/fotos_espacio/i.test(detalle)) {
          const { fotos_espacio, ...sinCol } = clean;
          rp = await fetch(`${SUPABASE_URL}/rest/v1/proyectos`, { method: "POST", headers, body: JSON.stringify(sinCol) });
          if (!rp.ok) detalle = await rp.text();
        }
      }
      ok = rp.ok;
    } catch (e) { detalle = e.message; }
    if (!ok) { setEnviando(false); setErr("No pudimos enviar tu solicitud. Intenta de nuevo. " + String(detalle).slice(0, 120)); return; }

    // Recordar zona y teléfono en la cuenta (best-effort)
    try {
      const ru = await fetch(`${SUPABASE_URL}/auth/v1/user`, { method: "PUT", headers: { "apikey": SUPABASE_KEY, "Authorization": `Bearer ${token}`, "Content-Type": "application/json" }, body: JSON.stringify({ data: { zona, telefono } }) });
      if (ru.ok) { const u2 = await ru.json(); if (u2?.email) sessionStorage.setItem("enkaje_user", JSON.stringify(u2)); }
    } catch {}
    // Expediente para el panel admin (mismo formato que el flujo con render)
    try {
      const score = calcularScore({ nivel_decision: cuando, foto_url: fotos[0], medidas, fecha_inicio: cuando !== "explorando" ? cuandoData?.label : "", descripcion });
      await sb("expedientes", { method: "POST", body: JSON.stringify({
        tipo_proyecto: tipo,
        foto_url: fotos[0] || null,
        render_url: null,
        estilo_elegido: null,
        materiales_sugeridos: nivelData ? `Material: ${nivelData.label}` : null,
        rango_inversion_min: presData?.min ?? null,
        rango_inversion_max: presData?.max ?? null,
        tiempo_fabricacion: TIEMPOS[tipo] || null,
        fecha_inicio_deseada: cuandoData?.label || null,
        nivel_decision: cuando,
        medidas_sketch_url: medidas || null,
        observaciones: `SIN RENDER | Nombre: ${nom} | Tel: ${telefono} | Correo: ${user.email} | Colonia: ${colonia} | Desc: ${descripcion} | Fotos: ${fotos.join(" ")}`,
        zona,
        score, score_label: scoreLabel(score), estado_lead: "nuevo", created_at: new Date().toISOString(),
      }) });
    } catch {}
    try { fetch("/api/notify", { method: "POST", headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` }, body: JSON.stringify({ evento: "solicitud_nueva" }) }).catch(() => {}); } catch {}
    try { localStorage.removeItem(RAPIDA_KEY); } catch {}
    setEnviando(false);
    setEnviada(true);
    try { window.scrollTo(0, 0); } catch {}
  };

  const lbl = { fontSize:11, color:"#555", display:"block", marginBottom:8, letterSpacing:1, textTransform:"uppercase" };
  const inp = { width:"100%", background:"#0f0f0a", border:"1px solid #2a2a20", borderRadius:12, padding:"13px 16px", color:"#e8e0d0", fontSize:14 };
  const pill = (activo) => ({ background: activo ? "#d4af3718" : "#0f0f0a", border:`1.5px solid ${activo ? "#d4af37" : "#1a1a12"}`, color: activo ? "#d4af37" : "#888", borderRadius:50, padding:"9px 14px", fontSize:13, cursor:"pointer", fontWeight: activo ? 700 : 400 });
  const bloque = { marginBottom:22 };

  if (enviada) {
    return (
      <div className="portal-step" style={{ textAlign:"center", paddingTop:32 }}>
        <div style={{ fontSize:56, marginBottom:20 }}>🎉</div>
        <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:30, fontWeight:900, color:"#f0e8dc", marginBottom:12 }}>¡Solicitud enviada!</h2>
        <p style={{ color:"#888", fontSize:15, lineHeight:1.8, maxWidth:440, margin:"0 auto 28px" }}>Los talleres verificados de tu zona ya pueden ver tu proyecto y te enviarán su cotización en rango. Tú eliges con cuál trabajar y solo entonces compartimos tu contacto.</p>
        <div style={{ display:"flex", gap:8, justifyContent:"center", marginBottom:24 }}>
          {fotos.map(u => <img key={u} src={u} alt="Tu espacio" style={{ width:90, height:90, objectFit:"cover", borderRadius:10 }} />)}
        </div>
        <div style={{ display:"flex", gap:10, justifyContent:"center", flexWrap:"wrap" }}>
          <Btn onClick={() => { sessionStorage.setItem("enkaje_tab", "mis_proyectos"); window.location.href = "/app"; }} color="#4caf50" style={{ fontSize:13 }}>Ver mis cotizaciones →</Btn>
          <Btn onClick={onSalir} outline style={{ fontSize:13 }}>Ver cómo quedaría (render)</Btn>
        </div>
      </div>
    );
  }

  return (
    <div className="portal-step" style={{ textAlign:"left" }}>
      <button onClick={onSalir} style={{ background:"none", border:"none", color:"#666", fontSize:12, cursor:"pointer", padding:0, marginBottom:18 }}>← Prefiero ver cómo quedaría primero (render gratis)</button>
      <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:28, fontWeight:900, color:"#f0e8dc", lineHeight:1.2, marginBottom:8 }}>Cotiza tu proyecto</h1>
      <p style={{ color:"#777", fontSize:14, lineHeight:1.7, marginBottom:26 }}>Cuéntanos qué necesitas y manda fotos de tu espacio. Hasta 4 talleres verificados de tu zona te envían su cotización en rango. Gratis y sin compromiso.</p>

      <div style={bloque}>
        <label style={lbl}>¿Qué necesitas?</label>
        <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
          {TIPOS_PROYECTO.map(t => <button key={t.key} onClick={() => setTipo(t.key)} style={pill(tipo === t.key)}>{t.emoji} {t.label}</button>)}
        </div>
      </div>

      <div style={bloque}>
        <label style={lbl}>¿En qué municipio será?</label>
        <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:10 }}>
          {ZONAS.map(z => <button key={z} onClick={() => setZona(z)} style={pill(zona === z)}>{zona === z && "✓ "}{z}</button>)}
        </div>
        <input value={colonia} onChange={e => setColonia(e.target.value)} placeholder="Colonia (opcional)" style={inp} />
      </div>

      <div style={bloque}>
        <label style={lbl}>Fotos de tu espacio <span style={{ color:"#333", textTransform:"none", letterSpacing:0 }}>(1 a {MAX_FOTOS})</span></label>
        <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
          {fotos.map(u => (
            <div key={u} style={{ position:"relative" }}>
              <img src={u} alt="Tu espacio" style={{ width:96, height:96, objectFit:"cover", borderRadius:10, border:"1px solid #2a2a20" }} />
              <button onClick={() => setFotos(f => f.filter(x => x !== u))} aria-label="Quitar foto" style={{ position:"absolute", top:4, right:4, background:"#000c", color:"#fff", border:"none", borderRadius:"50%", width:24, height:24, fontSize:13, cursor:"pointer" }}>×</button>
            </div>
          ))}
          {fotos.length < MAX_FOTOS && (
            <button onClick={() => fileRef.current?.click()} disabled={subiendo} style={{ width:96, height:96, borderRadius:10, border:"1.5px dashed #d4af3760", background:"#0f0f0a", color:"#d4af37", fontSize:12, cursor: subiendo ? "wait" : "pointer" }}>
              {subiendo ? "Subiendo..." : "📷 Agregar foto"}
            </button>
          )}
        </div>
        <input ref={fileRef} type="file" accept="image/*" multiple onChange={subirFotos} style={{ display:"none" }} />
        <div style={{ fontSize:11, color:"#555", marginTop:8 }}>Toma la foto de frente y de lejos, que se vea la pared completa. Con eso el taller te cotiza mejor.</div>
      </div>

      <div style={bloque}>
        <label style={lbl}>Cuéntanos qué quieres</label>
        <textarea value={descripcion} onChange={e => setDesc(e.target.value)} rows={3}
          placeholder={tipo === "cocina" ? "Ej: Cocina en L con alacena hasta el techo y espacio para refri de dos puertas" : "Ej: Closet de pared a pared con cajones y zapatera"}
          style={{ ...inp, resize:"vertical" }} />
      </div>

      <div style={bloque}>
        <label style={lbl}>Medidas aproximadas <span style={{ color:"#333", textTransform:"none", letterSpacing:0 }}>(opcional)</span></label>
        <input value={medidas} onChange={e => setMedidas(e.target.value)} placeholder="Ej: 3.20 m de largo × 2.40 m de alto" style={inp} />
      </div>

      <div style={bloque}>
        <label style={lbl}>Nivel de material</label>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8 }}>
          {NIVELES_MATERIAL.map(n => (
            <button key={n.key} onClick={() => setNivel(n.key)} style={{ ...pill(nivel === n.key), borderRadius:12, padding:"12px 8px", textAlign:"center" }}>
              <div style={{ fontWeight:700, fontSize:13 }}>{n.label}</div>
              <div style={{ fontSize:10, color:"#555", marginTop:3 }}>{n.desc}</div>
            </button>
          ))}
        </div>
      </div>

      <div style={bloque}>
        <label style={lbl}>¿Cuánto piensas invertir?</label>
        <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
          {PRESUPUESTOS.map(p => <button key={p.key} onClick={() => setPresup(p.key)} style={pill(presupuesto === p.key)}>{p.label}</button>)}
        </div>
      </div>

      <div style={bloque}>
        <label style={lbl}>¿Para cuándo lo quieres?</label>
        <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
          {CUANDO.map(c => <button key={c.key} onClick={() => setCuando(c.key)} style={pill(cuando === c.key)}>{c.label}</button>)}
        </div>
      </div>

      <div style={bloque}>
        <label style={{ ...lbl, marginBottom:6 }}>WhatsApp / Teléfono</label>
        <input type="tel" value={telefono} onChange={e => setTelefono(e.target.value)} placeholder="81-1234-5678" style={inp} />
        <div style={{ fontSize:11, color:"#555", marginTop:6 }}>🔒 Los talleres NO ven tu teléfono ni tu correo. Solo lo compartimos con el taller que tú elijas.</div>
      </div>

      {err && <div style={{ color:"#ff8a80", fontSize:13, marginBottom:12 }}>{err}</div>}

      {!listo ? (
        <div style={{ background:"#0f0f0a", border:"1px solid #1a1a12", borderRadius:12, padding:14, fontSize:12, color:"#777", lineHeight:1.7 }}>
          {subiendo ? "Subiendo fotos..." : `Para enviar te falta: ${faltantes.join(", ")}.`}
        </div>
      ) : sesion ? (
        <Btn onClick={() => enviar()} disabled={enviando} style={{ width:"100%" }}>{enviando ? "Enviando..." : "Solicitar cotizaciones →"}</Btn>
      ) : (
        <AuthInline titulo="Último paso: crea tu cuenta gratis para enviar tu solicitud y ver las cotizaciones"
          onSuccess={async ses => { onAutenticar(ses); setSesion(true); await enviar(ses); }} />
      )}
    </div>
  );
}

export default function Portal() {
  // Cotización sin render: /portal?cotizar=cocina (para anuncios) o botón en el paso 0
  const [modoRapido, setModoRapido] = useState(() => {
    try { return new URLSearchParams(window.location.search).has("cotizar"); } catch { return false; }
  });
  const tipoRapido = (() => {
    try { const t = new URLSearchParams(window.location.search).get("cotizar"); return TIPOS_PROYECTO.some(x => x.key === t) ? t : ""; } catch { return ""; }
  })();
  const salirDeRapido = () => {
    setModoRapido(false);
    try { window.history.replaceState(null, "", "/portal"); window.scrollTo(0, 0); } catch {}
  };
  const [zona, setZona] = useState("");
  const TOTAL_STEPS = 8;
  const [step, setStep]               = useState(0);
  const [tipoProyecto, setTipo]       = useState("");
  const [foto, setFoto]               = useState(null);
  const [fotoUrl, setFotoUrl]         = useState(null);
  const [descripcion, setDescripcion] = useState("");
  const [estilo, setEstilo]           = useState("");
  const [colorElegido, setColor]      = useState("");
  const [colorInterior, setColorInterior] = useState("blanco");
  const [canto, setCanto]             = useState("igual");
  const [verInteriorOtro, setVerInteriorOtro] = useState(false);
  const [acabado, setAcabado]         = useState("");
  const [material, setMaterial]       = useState("");
  const [gama, setGama]               = useState("");
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
  const [ajusteTexto, setAjusteTexto]           = useState("");
  const [regenerandoConAjuste, setRegenerandoConAjuste] = useState(false);
  const fileRef = useRef();
  const [authTick, setAuthTick] = useState(0);
  const [restaurado, setRestaurado] = useState(false);
  const [errSolicitud, setErrSolicitud] = useState("");
  const draftListo = useRef(false);
  const autoRender = useRef(false);

  const tieneCuenta    = !!sessionStorage.getItem("enkaje_token");
  const sinCuenta      = !tieneCuenta;
  const LIMITE_RENDERS = tieneCuenta ? 3 : 1;
  const STORAGE_KEY    = tieneCuenta ? "enkaje_renders_cuenta" : "enkaje_renders";
  const [restantes, setRestantes] = useState(null);
  const [ajustesLibres, setAjustesLibres] = useState(null);
  const cargarRestantes = async () => {
    const t = sessionStorage.getItem("enkaje_token");
    if (!t) return;
    try {
      const r = await fetch(`${SUPABASE_URL}/rest/v1/rpc/render_restantes`, {
        method: "POST",
        headers: { "apikey": SUPABASE_KEY, "Authorization": `Bearer ${t}`, "Content-Type": "application/json" },
        body: "{}"
      });
      if (r.ok) setRestantes(await r.json());
      const r2 = await fetch(`${SUPABASE_URL}/rest/v1/rpc/ajustes_disponibles`, {
        method: "POST",
        headers: { "apikey": SUPABASE_KEY, "Authorization": `Bearer ${t}`, "Content-Type": "application/json" },
        body: "{}"
      });
      if (r2.ok) setAjustesLibres(await r2.json());
    } catch {}
  };

  // Rango dinámico — se recalcula cuando cambian tipo, estilo o material
   const rango = calcularRango(tipoProyecto, estilo, material, gama);
   const preguntasVida = tipoProyecto
    ? (PREGUNTAS_VIDA_POR_TIPO[tipoProyecto] || PREGUNTAS_VIDA_DEFAULT)
    : PREGUNTAS_VIDA_DEFAULT;

  useEffect(() => {
    if (!modoRapido) document.title = "Portal Cliente · EnKaje Pro";
    try {
      const d = JSON.parse(localStorage.getItem("enkaje_portal_draft") || "null");
      if (d && Date.now() - d.ts < 7*24*3600*1000 && d.tipoProyecto) {
        setTipo(d.tipoProyecto); setEstilo(d.estilo || ""); setColor(d.colorElegido || ""); setColorInterior(d.colorInterior || "blanco"); setCanto(d.canto || "igual"); setAcabado(d.acabado || "");
        setMaterial(d.material || ""); setGama(d.gama || ""); setVidaResp(d.vidaResp || {}); setDescripcion(d.descripcion || "");
        setRenderUrl(d.renderUrl || null); setDescripcionIA(d.descripcionIA || null);
        setFechaInicio(d.fechaInicio || ""); setNivelDecision(d.nivelDecision || ""); setMedidas(d.medidas || "");
        setZona(d.zona || ""); setTelefono(d.telefono || "");
        setStep(Math.min(d.step || 0, 7));
        if ((d.step || 0) > 0) setRestaurado(true);
      }
    } catch {}
    draftListo.current = true;
    try {
      const u = JSON.parse(sessionStorage.getItem("enkaje_user") || "null");
      if (sessionStorage.getItem("enkaje_token") && u) {
        const m = u.user_metadata || {};
        if (m.nombre) setNombre(m.nombre);
        if (u.email) setCorreo(u.email);
        if (m.zona) setZona(z => z || m.zona);
        if (m.telefono) setTelefono(t => t || m.telefono);
      }
    } catch {}
   if (tieneCuenta) {
  const stored = parseInt(localStorage.getItem("enkaje_renders_cuenta") || "0", 10);
  if (stored >= 3) localStorage.setItem("enkaje_renders_cuenta", "0");
  cargarRestantes();
    }
  }, []);

   // Guardar el render en el navegador si no hay cuenta, para pasarlo al perfil al registrarse
  useEffect(() => {
    if (!sinCuenta || !renderUrl || !/^https?:/.test(renderUrl)) return;
    try {
      localStorage.setItem("enkaje_render_pendiente", JSON.stringify({
        render_url: renderUrl,
        tipo_proyecto: tipoProyecto,
        estilo: estilo,
        material: MATERIALES.find(m => m.key === material)?.label || material || null,
        color_principal: resumenColores(colorElegido, colorInterior, canto),
        tipo_acabado: ACABADOS.find(a => a.key === acabado)?.label || acabado || null,
        observaciones: descripcion || null,
        descripcion_ia: descripcionIA || null,
        ts: Date.now(),
      }));
    } catch {}
   }, [renderUrl, descripcionIA]);

  // Borrador: para que el cliente pueda volver donde se quedó
  useEffect(() => {
    if (!draftListo.current || !tipoProyecto || step >= TOTAL_STEPS) return;
    try {
      localStorage.setItem("enkaje_portal_draft", JSON.stringify({
        ts: Date.now(), step, tipoProyecto, estilo, colorElegido, colorInterior, canto, acabado, material, gama, vidaResp, descripcion,
        renderUrl: renderUrl && !renderUrl.startsWith("data:") ? renderUrl : null,
        descripcionIA, fechaInicio, nivelDecision, medidas, zona, telefono,
      }));
    } catch {}
  }, [step, tipoProyecto, estilo, colorElegido, colorInterior, canto, acabado, material, gama, vidaResp, descripcion, renderUrl, descripcionIA, fechaInicio, nivelDecision, medidas, zona, telefono]);

  // Cada paso empieza arriba de la página (y al recargar no se queda a media página)
  useEffect(() => {
    try { if ("scrollRestoration" in window.history) window.history.scrollRestoration = "manual"; } catch {}
    try { window.scrollTo({ top: 0, left: 0, behavior: "instant" }); } catch { try { window.scrollTo(0, 0); } catch {} }
  }, [step]);

  // Si se creó la cuenta desde el bloqueo de renders: generar el render solo y mostrarlo
  useEffect(() => {
    if (!autoRender.current || !tieneCuenta || step !== 3) return;
    autoRender.current = false;
    try { document.getElementById("render-area")?.scrollIntoView({ behavior: "smooth", block: "start" }); } catch {}
    generarRender();
  }, [authTick]);

  // Tras registrarse / iniciar sesión dentro del portal
  const alAutenticar = ({ token, user }) => {
    sessionStorage.setItem("enkaje_token", token);
    sessionStorage.setItem("enkaje_user", JSON.stringify(user));
    sessionStorage.setItem("enkaje_role", "cliente");
    localStorage.removeItem("enkaje_renders");
    localStorage.setItem("enkaje_renders_cuenta", "0");
    const m = user.user_metadata || {};
    if (m.nombre) setNombre(m.nombre);
    if (user.email) setCorreo(user.email);
    if (m.zona) setZona(z => z || m.zona);
    if (m.telefono) setTelefono(t => t || m.telefono);
    setRenderBloqueado(false);
    setAuthTick(t => t + 1);
    cargarRestantes();
  };

  // Crea la solicitud (etapa "solicitud") para que llegue a Oportunidades
  const enviarSolicitud = async (ses) => {
    const token = ses?.token || sessionStorage.getItem("enkaje_token");
    const user  = ses?.user  || JSON.parse(sessionStorage.getItem("enkaje_user") || "{}");
    if (!token || !user?.email) { setErrSolicitud("Necesitas una cuenta para enviar la solicitud."); return false; }
    setSaving(true); setErrSolicitud("");
    const nom = user.user_metadata?.nombre || nombre || "";
    const materialData = MATERIALES.find(m => m.key === material);
    const acabadoData  = ACABADOS.find(a => a.key === acabado);
    const notas = [medidas && `Medidas aprox.: ${medidas}`, fechaInicio && `Inicio deseado: ${fechaInicio}`].filter(Boolean).join(" · ");
    const base = {
      tipo_proyecto: tipoProyecto,
      render_url: renderUrl && !renderUrl.startsWith("data:") ? renderUrl : null,
      estilo,
      material: materialData?.label || material || null,
      color_principal: resumenColores(colorElegido, colorInterior, canto),
      tipo_acabado: acabadoData?.label || acabado || null,
      observaciones: descripcion || null,
      descripcion_ia: descripcionIA || null,
      nombre: nom || null,
      correo: user.email,
      telefono: telefono || null,
      zona: zona || null,
      comentarios_tecnicos: notas || null,
      estado: "nuevo",
      etapa_seguimiento: "solicitud",
    };
    const clean = Object.fromEntries(Object.entries(base).filter(([,v]) => v !== null));
    const headers = { "apikey": SUPABASE_KEY, "Authorization": `Bearer ${token}`, "Content-Type": "application/json" };
    let ok = false, detalle = "";
    try {
      // Si ya la había guardado en su perfil, la convertimos en solicitud (sin duplicar)
      if (clean.render_url) {
        const rp = await fetch(`${SUPABASE_URL}/rest/v1/proyectos?user_email=eq.${encodeURIComponent(user.email)}&etapa_seguimiento=eq.guardado&render_url=eq.${encodeURIComponent(clean.render_url)}`, {
          method: "PATCH", headers: { ...headers, "Prefer": "return=representation" }, body: JSON.stringify(clean)
        });
        if (rp.ok) { const arr = await rp.json(); if (Array.isArray(arr) && arr.length > 0) ok = true; }
      }
      if (!ok) {
        const rp = await fetch(`${SUPABASE_URL}/rest/v1/proyectos`, {
          method: "POST", headers: { ...headers, "Prefer": "return=minimal" },
          body: JSON.stringify({ ...clean, user_email: user.email, created_at: new Date().toISOString() })
        });
        ok = rp.ok; if (!ok) detalle = await rp.text();
      }
    } catch (e) { detalle = e.message; }
    if (!ok) { setSaving(false); setErrSolicitud("No pudimos enviar tu solicitud. Intenta de nuevo. " + detalle.slice(0, 120)); return false; }
    // Recordar zona y teléfono en la cuenta (best-effort)
    try {
      const ru = await fetch(`${SUPABASE_URL}/auth/v1/user`, { method: "PUT", headers, body: JSON.stringify({ data: { zona, telefono } }) });
      if (ru.ok) { const u2 = await ru.json(); if (u2?.email) sessionStorage.setItem("enkaje_user", JSON.stringify(u2)); }
    } catch {}
    await guardarExpediente({ nombre: nom, correo: user.email });
    try { fetch("/api/notify", { method: "POST", headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` }, body: JSON.stringify({ evento: "solicitud_nueva" }) }).catch(() => {}); } catch {}
    localStorage.removeItem("enkaje_portal_draft");
    localStorage.removeItem("enkaje_render_pendiente");
    setGuardadoEnPerfil(true);
    setSaving(false);
    return true;
  };

  const handleFoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFoto(file);
    setFotoUrl(URL.createObjectURL(file));
  };

  const buildVidaPromptHints = () =>
   preguntasVida.map(p => {
      const respKey = vidaResp[p.key];
      if (!respKey) return "";
      const opcion = p.opciones.find(o => o.value === respKey);
      return opcion?.prompt || "";
    }).filter(Boolean).join(", ");

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
    } catch { window.open(renderUrl, "_blank"); }
  };

const guardarEnPerfil = async () => {
    if (!sessionStorage.getItem("enkaje_token") || !renderUrl || guardadoEnPerfil) return;
    setGuardandoPerfil(true);
    const token = sessionStorage.getItem("enkaje_token");
    const user  = JSON.parse(sessionStorage.getItem("enkaje_user") || "{}");
    const materialData = MATERIALES.find(m => m.key === material);
    const acabadoData  = ACABADOS.find(a => a.key === acabado);
    try {
     const payload = {
        tipo_proyecto:  tipoProyecto,
        render_url:     renderUrl && !renderUrl.startsWith("data:") ? renderUrl : null,
        estilo:         estilo,
        material:       materialData?.label || material || null,
        color_principal: resumenColores(colorElegido, colorInterior, canto),
        tipo_acabado:   acabadoData?.label || acabado || null,
        observaciones:  descripcion || null,
        descripcion_ia: descripcionIA || null,
        nombre:         user?.user_metadata?.nombre || null,
        correo:         user?.email || null,
        user_email:     user?.email || null,
        estado:         "guardado",
        etapa_seguimiento: "guardado",
        created_at:     new Date().toISOString(),
      };
      const clean = Object.fromEntries(Object.entries(payload).filter(([,v]) => v !== null));
      console.log("PAYLOAD:", JSON.stringify(clean));
      const res = await fetch(`${SUPABASE_URL}/rest/v1/proyectos`, {
        method: "POST",
        headers: {
          "apikey": SUPABASE_KEY,
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
          "Prefer": "return=minimal"
        },
        body: JSON.stringify(clean)
      });
      const txt = await res.text();
      if (res.ok) { setGuardadoEnPerfil(true); localStorage.removeItem("enkaje_render_pendiente"); }
      else alert("Error al guardar: " + res.status + " — " + txt);
    } catch(e) { alert("Error al guardar: " + e.message); }
    setGuardandoPerfil(false);
  };
    const generarRender = async (promptAdicional = "") => {
    if (!estilo || !tipoProyecto) return;
    const usados = parseInt(localStorage.getItem(STORAGE_KEY) || "0", 10);
    if (!tieneCuenta && usados >= LIMITE_RENDERS) { setRenderBloqueado(true); return; }
    setRenderLoading(true); setRenderMsg(""); setRenderUrl(null); setDescripcionIA(null);

    const estiloData   = ESTILOS.find(e => e.key === estilo);
    const colorData    = COLORES.find(c => c.key === colorElegido);
    const acabadoData  = ACABADOS.find(a => a.key === acabado);
    const materialData = MATERIALES.find(m => m.key === material);
    const vidaHints    = buildVidaPromptHints();

    const TIPO_CONTEXT = {
      cocina: {
        subject: "custom kitchen (cocina integral)",
        elements: "kitchen cabinets, upper and lower cabinet doors, drawer fronts, island if applicable, countertop, backsplash, integrated appliances",
        layout_hint: "Show full kitchen from a wide angle — upper cabinets, lower cabinets, countertop, backsplash, and appliances all visible.",
        lighting: "LED strips under upper cabinets illuminating the countertop, recessed ceiling spots, warm 2700K-3000K.",
        material_target: "cabinet doors and drawer fronts",
        detail: "Kitchen layout: upper wall cabinets and lower base cabinets with countertop. Island or peninsula if space allows. Countertop in quartz or porcelain slab. Backsplash in large format tile or stone slab. Integrated appliances flush with cabinet faces. Hardware: handleless push-open OR matte black bar pulls.",
      },
      closet: {
        subject: "custom walk-in closet or built-in wardrobe (closet a medida)",
        elements: "closet door panels or open system, hanging rails at two heights, folded clothing shelves, shoe display area, drawer bank, internal LED strip lighting, full-length mirror panel",
        layout_hint: "Show the full closet wall or walk-in interior — hanging section, shelving, drawers, and internal lighting all visible.",
        lighting: "Internal LED strip lighting mounted inside the closet. Warm 2700K glow creating luxury boutique feel.",
        material_target: "closet door panels, drawer fronts, and shelf edge banding",
        detail: "Closet interior: double hanging rail, long hang section, open shelving, full-length mirror panel, drawer bank. LED strip mounted at top interior edge. Interior looks like a luxury boutique fitting room.",
      },
      puerta: {
        subject: "custom interior door (puerta interior a medida)",
        elements: "full height door panel with design detail, solid door frame and architrave, premium door handle set",
        layout_hint: "Show the door full height from floor to ceiling visible, with wall context on each side.",
        lighting: "Dramatic directional side lighting raking across the door surface to reveal texture.",
        material_target: "door panel face and frame surface",
        detail: "Full height flush panel OR grooved/slat design — floor-to-ceiling height 2.40m minimum. Premium lever handle. Hinge detail visible at frame.",
      },
      mueble: {
        subject: "custom entertainment center and TV wall (mueble de entretenimiento a medida)",
        elements: "TV panel with floating TV mount, flanking tall cabinets, floating media console below TV, integrated LED lighting behind TV and inside niches",
        layout_hint: "Show the full entertainment wall — TV centered, tall flanking units, floating console below.",
        lighting: "LED strip behind TV panel creating warm halo glow. LED inside open display niches. All warm 2700K.",
        material_target: "cabinet door panels, floating console faces, and decorative panel surfaces",
        detail: "TV mounted floating at center, full-height custom millwork. Flanking towers with closed doors (lower) and open display niches (upper). Floating console at 40cm height.",
      },
      panel: {
        subject: "custom decorative wall panel or lambrin (panel decorativo / lambrin a medida)",
        elements: "full wall decorative panel system, vertical or horizontal slat design, integrated LED lighting strip",
        layout_hint: "Show the full decorative wall floor to ceiling, full width visible.",
        lighting: "Grazing light from ceiling-mounted LED strip washing down the surface revealing every ridge and groove.",
        material_target: "panel face, slat surfaces, and visible edges",
        detail: "Vertical fluted/slat design (most popular Monterrey 2024-2026) OR horizontal V-groove panel. If slat: uniform 3-5cm wide slats with 1-2cm deep shadow gaps. Panel runs floor to ceiling.",
      },
      bano: {
        subject: "custom bathroom vanity and cabinetry (mueble de baño / vanity a medida)",
        elements: "floating vanity cabinet with doors and drawers, undermount or vessel sink, stone or quartz countertop, large format illuminated mirror, premium faucet set, large format wall tiles",
        layout_hint: "Show the full vanity wall — mirror above, countertop with sink, cabinet below.",
        lighting: "LED strip behind mirror creating floating mirror halo effect. Warm 2700K throughout.",
        material_target: "vanity cabinet door and drawer front surfaces",
        detail: "Floating vanity at 85cm height. Countertop in Calacatta marble or white quartz. Full-width illuminated mirror with LED behind. Large format 60x120 wall tiles. The bathroom feels like a 5-star hotel spa.",
      },
    };

    const tipoCtx = TIPO_CONTEXT[tipoProyecto] || TIPO_CONTEXT.cocina;

    const TIPO_ESTILO_DETAIL = {
      cocina: {
        moderno: "Flat panel doors, handleless or thin bar pulls in matte black, quartz countertop in light grey or white, large format porcelain backsplash slab, integrated hood flush with upper cabinets.",
        minimalista: "Handleless push-open doors with Gola profile, seamless integrated appliances, no visible hardware, monochromatic palette, floating upper cabinets.",
        contemporaneo: "Upper wall cabinets in matte lacquer (beige/cream). ALL lower base cabinets and island in light wood veneer (oak finish) — consistent wood on every lower cabinet and drawer front without exception. Porcelain countertop in white, matte black bar pulls, open wood shelving section, pendant lights over island.",
        industrial: "Open shelving in raw steel, concrete-look countertop, black matte pipe hardware, exposed brick or microcement backsplash, Edison bulb pendants.",
        clasico: "Shaker-style cabinet doors with recessed center panel, cream or white painted finish, farmhouse sink, brass or antique bronze hardware.",
        rustico: "Solid wood doors with visible grain, knotty pine or cedar, hand-forged iron hardware, stone countertop, terracotta tile backsplash.",
        nordico: "White or light grey flat panel doors, light birch wood accents, simple brushed nickel hardware, white subway tile backsplash, clean and airy feel.",
        lujo: "Book-matched stone slab backsplash and countertop in Calacatta marble, wood veneer doors in dark walnut, integrated brass hardware, dramatic pendant lighting.",
        default: "Clean flat panel doors, quartz countertop, large format backsplash tile, recessed lighting.",
      },
      closet: {
        moderno: "Sliding or hinged flat panel doors in matte lacquer, integrated LED strip, brushed aluminum frame detail, open niches with floating shelves, mirror panel flush with door system.",
        minimalista: "Full-width sliding doors in white matte, no visible hardware, push-latch system, interior all white. Clean empty luxury feel.",
        contemporaneo: "Mix of opaque and frosted glass door panels, internal warm LED, combination of open and closed sections.",
        industrial: "Open system — no doors, exposed black steel pipe hanging rails, raw wood shelves, vintage Edison bulb lighting inside.",
        clasico: "Paneled door fronts with raised center panel, cream painted, brass cup pulls, interior with cedar-lined shelves.",
        rustico: "Barn-style sliding doors on black steel track, reclaimed wood panels, rope or iron handles, interior with natural wood shelves.",
        nordico: "White or light grey sliding doors, interior in light birch wood, simple chrome rails, clean organized shelving with wicker baskets.",
        lujo: "Full-height glass and metal framed doors showing interior — boutique luxury store feel. Illuminated display shelving for bags and shoes, velvet drawer inserts, mirror wall.",
        default: "Flat panel doors, internal LED lighting, organized shelving and hanging sections.",
      },
      puerta: {
        moderno: "Full-height flush door in matte lacquer, no visible molding, integrated handle in recessed channel, monolithic appearance from floor to ceiling.",
        minimalista: "Pivot door OR flush panel door that disappears into wall — handle-less push system, no frame visible.",
        contemporaneo: "Door with horizontal groove detail or fluted surface pattern, combined materials, architectural lever handle in matte black.",
        industrial: "Steel-framed glass door OR solid door with black powder-coated steel frame and hardware.",
        clasico: "Raised panel door with traditional molding profile, cream or white painted, oval or round knob in antique brass, pediment detail at top.",
        rustico: "Solid wood plank door with visible grain and natural knots, hand-forged iron strap hinges as design feature.",
        nordico: "Simple flat door in white or light grey, minimal hardware in brushed nickel, clean frame, no ornamentation.",
        lujo: "Oversized pivot door in book-matched wood veneer, architectural hardware in brushed gold or smoked bronze, full-height 2.80m minimum.",
        default: "Full-height door, quality hardware, clean frame detail.",
      },
      mueble: {
        moderno: "Floating TV wall with flat panel closed cabinets and open niches above, LED halo behind TV panel, thin console, matte black hardware.",
        minimalista: "Seamless floating wall system — TV recessed or mounted flush, all storage behind handle-less doors, monolithic wall appearance.",
        contemporaneo: "Mix of closed lacquered cabinets and open display shelving, background accent wall in fluted wood panel, integrated LED in niches.",
        industrial: "Open steel and wood shelving system, exposed black pipe frame, Edison bulb strip lighting, raw concrete background wall.",
        clasico: "Traditional bookcase with cornice detail and raised panel cabinet doors below, cream painted, brass hardware, symmetrical composition.",
        rustico: "Solid wood built-in entertainment center, barn wood planks as background wall, wrought iron hardware, warm Edison lighting.",
        nordico: "White floating shelves system, light wood accents, simple TV mount flush to wall, plants and minimal decorative objects.",
        lujo: "Dramatic full-wall millwork in book-matched dark walnut veneer, TV recessed into panel flush, flanking display niches with museum-quality lighting, floating console in marble slab.",
        default: "TV wall with floating shelves, integrated LED lighting, mix of open and closed storage.",
      },
      panel: {
        moderno: "Vertical fluted panel in matte lacquer or wood veneer — 4cm wide slats with 1.5cm deep shadow grooves, floor to ceiling, LED strip at top.",
        minimalista: "Seamless solid panel with subtle horizontal V-groove lines — white or off-white, LED grazing light reveals groove depth.",
        contemporaneo: "Mix of fluted section and solid panel section on same wall, two materials or two tones, integrated LED in transition.",
        industrial: "Corrugated metal panel OR raw concrete panel, alternating with raw wood planks, industrial LED strip at top.",
        clasico: "Traditional wainscoting panel with raised molding profile, chair rail dividing wall, lower panel in painted wood.",
        rustico: "Rough-sawn wood plank paneling with visible grain and natural gaps between planks, reclaimed or aged wood texture.",
        nordico: "Horizontal shiplap boards in white or light grey, subtle horizontal rhythm, clean and airy.",
        lujo: "Book-matched stone slab panel — Calacatta marble, travertine, or quartzite — OR dark smoked oak fluted panel, hidden LED cove at top and bottom creating floating effect.",
        default: "Vertical slat or fluted panel, floor to ceiling, LED lighting from above.",
      },
      bano: {
        moderno: "Floating vanity in matte lacquer at 85cm, flat panel doors, undermount rectangular sink, quartz countertop, full-width illuminated mirror, large format 60x120 tiles, matte black faucet.",
        minimalista: "Ultra-minimal floating vanity — single slab countertop extending as shelf, integrated sink, no visible hardware, mirror flush with wall, seamless tile floor-to-ceiling.",
        contemporaneo: "Floating vanity mixing wood veneer and lacquered panels, vessel sink in white ceramic, framed mirror with integrated LED border.",
        industrial: "Exposed pipe under vanity, concrete countertop, black steel mirror frame, subway tile wall, matte black faucet.",
        clasico: "Furniture-style vanity with raised panel doors, marble countertop, undermount oval sink, polished chrome or brass faucet, beveled edge mirror.",
        rustico: "Vanity in natural wood — live edge countertop, vessel sink in natural stone or ceramic, bronze faucet, round rustic mirror.",
        nordico: "White floating vanity, light oak wood drawer fronts, white quartz countertop, round mirror in simple wood frame, chrome fixtures, plants on counter.",
        lujo: "Full book-matched marble slab — wall, countertop, and floor in Calacatta marble, floating vanity in dark wood veneer, backlit mirror full wall width, gold or brushed brass fixtures.",
        default: "Floating vanity, quartz countertop, undermount sink, illuminated mirror, large format tiles.",
      },
    };

    const MATERIAL_PROMPT_DETAIL = {
      melamina:      `${tipoCtx.material_target} are MELAMINE (melamina) — smooth solid color panels AND sections with printed wood grain. Flat panel construction, thin ABS edge banding.`,
      mdf:           `OVERRIDE: ${tipoCtx.material_target} are MDF LACADO (painted MDF). NO wood grain anywhere. Surface is painted solid color, smooth as glass — zero texture, zero grain, zero variation. Perfectly uniform color.`,
      enchapado:     `OVERRIDE: ${tipoCtx.material_target} are MADERA ENCHAPADA (real wood veneer on MDF). Surface shows clear natural wood grain in consistent direction. Warm natural wood appearance but perfectly flat.`,
      madera_solida: `OVERRIDE: ${tipoCtx.material_target} are MADERA SOLIDA MACIZA (solid hardwood). Visibly thick solid wood. Deep rich grain with natural variation. Possible subtle knots. End grain visible at edges.`,
    };

    const materialPromptDetail = material ? (MATERIAL_PROMPT_DETAIL[material] || materialData?.prompt) : "";

    const prompt = [
      `Professional photorealistic interior design render. Ultra-realistic, indistinguishable from a professional 3D visualization studio output. High quality, detailed, realistic materials, 4K quality, architectural visualization.`,
      `Lighting: ${tipoCtx.lighting}`,
      `Camera: wide angle lens, eye-level shot. ${tipoCtx.layout_hint} Sharp focus throughout, no bokeh.`,
      `Setting: luxury residential home in Monterrey, Mexico — San Pedro Garza García or Cumbres style, upper class neighborhood.`,
      `The centerpiece of this render is a brand new ${tipoCtx.subject}.`,
      `Elements to include: ${tipoCtx.elements}.`,
      `Design specification: ${tipoCtx.detail}`,
      `Style-specific design language for this ${tipoCtx.subject}: ${TIPO_ESTILO_DETAIL[tipoProyecto]?.[estilo] || TIPO_ESTILO_DETAIL[tipoProyecto]?.default || ""}`,
      material === "mdf" && `CRITICAL RULE: NO wood grain on any ${tipoCtx.material_target}. Painted smooth surface ONLY.`,
      materialPromptDetail,
      colorData && `COLOR RULE: Apply ${colorData.prompt} EXCLUSIVELY to the ${tipoCtx.material_target}. Do NOT apply this color to walls, floor, ceiling, countertop, tiles, or any other surface. Everything else keeps its own natural color.`,
      acabadoData && `FINISH RULE: The ${tipoCtx.material_target} has a ${acabadoData.label} finish (${acabadoData.prompt}). This finish applies ONLY to the ${tipoCtx.material_target}.`,
      material === "enchapado" && colorData && ["blanco_mate","negro_mate","gris","verde_salvia","azul_marino"].includes(colorElegido) && `NOTE: Wood veneer (enchapado) with ${colorData.label} means the veneer has been stained or tinted in this tone — the wood grain is still visible but with a color wash. NOT painted solid.`,
      material === "madera_solida" && colorData && ["blanco_mate","negro_mate","gris"].includes(colorElegido) && `NOTE: Solid wood in ${colorData.label} means painted solid wood — edges and any exposed end grain may show wood character.`,
      `STYLE RULE: Apply ${estiloData?.label} style ONLY to proportions, hardware style, door profile shape, layout composition, and decorative details. Do NOT override the material or color specifications above.`,
      `${estiloData?.label} style details: ${estiloData?.prompt_hint}.`,
      vidaHints && (tipoProyecto === "cocina" || tipoProyecto === "bano") && `Functional household requirements: ${vidaHints}.`,
      descripcion && `Client specific requests: ${descripcion}.`,
      promptAdicional && `CLIENT ADJUSTMENT: The client wants these specific changes: "${promptAdicional}". Apply exactly as described.`,
      foto 
        ? `CRITICAL LAYOUT INSTRUCTION: The reference photo shows the ACTUAL room where this project will be installed. You MUST use this exact room as your base — same walls, same floor, same ceiling height, same windows, same proportions, same perspective angle, same lighting direction. DO NOT create a new room. Transform ONLY the ${tipoCtx.subject} in this specific room. Everything else (walls, floor, ceiling, windows) must remain identical to the reference photo.`
        : `Create a realistic well-proportioned ${tipoCtx.subject} naturally integrated in a Monterrey home.`,
      `Final output: professional 3D visualization studio quality, ultra-sharp, perfect warm LED lighting, rich material textures, premium Monterrey residential aesthetic. No watermarks, no text, no artifacts.`,
    ].filter(Boolean).join(" ");

    try {
      let fotoBase64 = null;
      if (foto) {
        fotoBase64 = await new Promise((resolve) => {
          const canvas = document.createElement("canvas");
          const img = new Image();
          img.onload = () => {
            const maxSize = 800;
            let w = img.width, h = img.height;
            if (w > h) { h = Math.round(h * maxSize / w); w = maxSize; }
            else { w = Math.round(w * maxSize / h); h = maxSize; }
            canvas.width = w; canvas.height = h;
            canvas.getContext("2d").drawImage(img, 0, 0, w, h);
            resolve(canvas.toDataURL("image/jpeg", 0.85).split(",")[1]);
          };
          img.src = URL.createObjectURL(foto);
        });
      } else {
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
          } catch { }
        }
      }

      const res = await fetch("/api/image", {
        method: "POST",
        headers: { "Content-Type": "application/json", ...(sessionStorage.getItem("enkaje_token") ? { "Authorization": `Bearer ${sessionStorage.getItem("enkaje_token")}` } : {}) },
        body: JSON.stringify({ prompt: buildRenderPrompt({ tipo: tipoProyecto, estilo, color: colorElegido, colorInterior, canto, acabadoData, material, gama, vidaHints, descripcion, promptAdicional, foto }), image: fotoBase64, ajuste: !!promptAdicional })
      });
      const texto = await res.text();
      let data;
      try { data = JSON.parse(texto); }
      catch { data = { error: { message: res.status === 504 || /timeout|timed out|An error occurred/i.test(texto) ? "El render tardó demasiado. Dale Reintentar, normalmente sale a la segunda." : "No se pudo generar el render. Intenta de nuevo." } }; }
      console.log("IMAGE RESPONSE:", JSON.stringify(data));
      const imgData = data.data?.data?.[0] || data.data?.[0];
      const imgUrl  = imgData?.url;
      const imgB64  = imgData?.b64_json;

      if (imgUrl) {
        setRenderUrl(imgUrl);
        localStorage.setItem(STORAGE_KEY, String(usados + 1)); cargarRestantes();
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
          const publicUrl = uploadRes.ok
            ? `${SUPABASE_URL}/storage/v1/object/public/renders/${fileName}`
            : "data:image/png;base64," + imgB64;
          setRenderUrl(publicUrl);
          localStorage.setItem(STORAGE_KEY, String(usados + 1)); cargarRestantes();
          setRenderMsg("✅ Render generado");
        } catch {
          setRenderUrl("data:image/png;base64," + imgB64);
          setRenderMsg("✅ Render generado");
        }
      } else {
        if (data?.limite) { setRenderBloqueado(true); cargarRestantes(); }
        else setRenderMsg("❌ " + (data?.error?.message || "Error al generar"));
      }
    } catch(e) { setRenderMsg("❌ " + e.message); }
    setRenderLoading(false);

    setDescripcionLoading(true);
    const desc = await generarDescripcionIA({ tipoProyecto, estilo, color: colorElegido, colorInterior, canto, acabado, material, vidaResp, descripcion, preguntasVida, gama });
    setDescripcionIA(desc);
    setDescripcionLoading(false);
  };

    const regenerarConAjuste = async () => {
    if (!ajusteTexto.trim()) return;
    setRegenerandoConAjuste(true);
    await generarRender(ajusteTexto);
    setRegenerandoConAjuste(false);
  };

  const guardarExpediente = async (ov = {}) => {
    const nom = ov.nombre ?? nombre; const cor = ov.correo ?? correo;
    const vidaResumen = preguntasVida.map(p => {
      const r = vidaResp[p.key];
      const op = p.opciones.find(o => o.value === r);
      return op ? `${p.pregunta}: ${op.label}` : null;
    }).filter(Boolean).join(" | ");

    const materialData = MATERIALES.find(m => m.key === material);

    try {
      const score = calcularScore({ nivel_decision: nivelDecision, foto_url: fotoUrl, medidas, fecha_inicio: fechaInicio, descripcion });
      const label = scoreLabel(score);
      const acabadoData = ACABADOS.find(a => a.key === acabado);
      const payload = {
        tipo_proyecto:        tipoProyecto,
        foto_url:             fotoUrl || null,
        render_url:           (renderUrl && !renderUrl.startsWith("data:")) ? renderUrl : null,
        estilo_elegido:       estilo,
        materiales_sugeridos: [GAMAS.find(g => g.key === gama) && `Nivel: ${GAMAS.find(g => g.key === gama).label}`, MATERIALES_SUGERIDOS[estilo], resumenColores(colorElegido, colorInterior, canto), acabadoData && `Acabado: ${acabadoData.label}`, materialData && `Material: ${materialData.label}`].filter(Boolean).join(" | "),
        rango_inversion_min:  rango.min,
        rango_inversion_max:  rango.max,
        tiempo_fabricacion:   TIEMPOS[tipoProyecto] || null,
        fecha_inicio_deseada: fechaInicio || null,
        nivel_decision:       nivelDecision,
        medidas_sketch_url:   medidas || null,
        observaciones:        `Nombre: ${nom} | Tel: ${telefono} | Correo: ${cor} | Desc: ${descripcion} | Vida: ${vidaResumen} | DescIA: ${descripcionIA || ""}`,
        zona: zona || null,
        score, score_label: label, estado_lead: "nuevo", created_at: new Date().toISOString(),
      };
      await sb("expedientes", { method: "POST", body: JSON.stringify(payload) });
    } catch(e) { console.error("ERROR:", e); }
  };

  const next  = () => setStep(s => Math.min(s+1, TOTAL_STEPS));
  const back  = () => setStep(s => Math.max(s-1, 0));
  const reset = () => {
    setStep(0); setTipo(""); setFoto(null); setFotoUrl(null); setDescripcion("");
    setEstilo(""); setColor(""); setColorInterior("blanco"); setCanto("igual"); setVerInteriorOtro(false); setAcabado(""); setMaterial(""); setGama(""); setVidaResp({});
    setRenderUrl(null); setRenderMsg(""); setDescripcionIA(null);
    setGuardadoEnPerfil(false); setGuardandoPerfil(false);
    setFechaInicio(""); setNivelDecision(""); setMedidas(""); setNombre(""); setTelefono(""); setCorreo("");
    setAjusteTexto(""); setRegenerandoConAjuste(false); setZona(""); setRestaurado(false); setErrSolicitud("");
    try { localStorage.removeItem("enkaje_portal_draft"); } catch {}
  };

  const vidaCompleta = preguntasVida.every(p => vidaResp[p.key]);

  return (
    <>
      <style>{CSS}</style>

      {/* HEADER */}
      <div style={{ position:"sticky", top:0, zIndex:100, background:"rgba(7,7,8,0.95)", backdropFilter:"blur(12px)", borderBottom:"1px solid #d4af3718", padding:"14px 24px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <a href="/" style={{ textDecoration:"none" }}>
          <span style={{ fontFamily:"'Playfair Display',serif", fontSize:20, fontWeight:900, color:"#d4af37", letterSpacing:2 }}>EnKaje</span>
          <span style={{ fontFamily:"'Playfair Display',serif", fontSize:13, color:"#c8a97a", marginLeft:4, letterSpacing:3 }}>PRO</span>
        </a>
        {!modoRapido && step > 0 && step < TOTAL_STEPS && (
          <div style={{ flex:1, maxWidth:300, margin:"0 24px" }}>
            <ProgressBar step={step} total={TOTAL_STEPS} />
          </div>
        )}
        <a href="/app" onClick={() => { sessionStorage.removeItem("enkaje_token"); sessionStorage.removeItem("enkaje_user"); sessionStorage.removeItem("enkaje_role"); sessionStorage.removeItem("enkaje_tab"); }} style={{ fontSize:12, color:"#555", textDecoration:"none", border:"1px solid #2a2a20", borderRadius:8, padding:"6px 14px" }}>Soy un taller →</a>
      </div>

      <div style={{ maxWidth:680, margin:"0 auto", padding:"32px 20px 80px" }}>
        {modoRapido ? (
          <CotizacionRapida tipoInicial={tipoRapido} onSalir={salirDeRapido} onAutenticar={alAutenticar} />
        ) : (<>
        {restaurado && step > 0 && step < TOTAL_STEPS && (
          <div style={{ background:"#0f2a0f", border:"1px solid #4caf5030", borderRadius:12, padding:"10px 14px", marginBottom:16, display:"flex", justifyContent:"space-between", alignItems:"center", gap:10, fontSize:12, color:"#8bc34a" }}>
            <span>↩️ Retomamos tu proyecto donde te quedaste.</span>
            <button onClick={reset} style={{ background:"none", border:"1px solid #4caf5050", color:"#8bc34a", borderRadius:8, padding:"4px 10px", fontSize:11, cursor:"pointer" }}>Empezar de nuevo</button>
          </div>
        )}

        {/* PASO 0 — INTRO + TIPO */}
        {step === 0 && (
          <div className="portal-step" style={{ textAlign:"center", paddingTop:32 }}>
            <div style={{ fontSize:48, marginBottom:16 }}>🪵</div>
            {tieneCuenta && (
              <div style={{ background:"#0f2a0f", border:"1px solid #4caf5040", borderRadius:14, padding:"12px 20px", marginBottom:20, display:"inline-flex", alignItems:"center", gap:10 }}>
                <span style={{ fontSize:18 }}>✅</span>
                <div style={{ textAlign:"left" }}>
                  <div style={{ fontSize:13, fontWeight:700, color:"#4caf50" }}>Sesión activa</div>
                  <div style={{ fontSize:11, color:"#555" }}>Tienes {restantes ?? "…"} render(s) disponibles este mes · Envía una solicitud de cotización y ganas 1 más (máximo 2 extra al mes)</div>
                </div>
              </div>
            )}
            <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:36, fontWeight:900, color:"#f0e8dc", lineHeight:1.15, marginBottom:16 }}>
              Visualiza tu proyecto<br /><span style={{ color:"#d4af37" }}>antes de gastar un peso</span>
            </h1>
            <p style={{ fontSize:15, color:"#888", lineHeight:1.8, maxWidth:460, margin:"0 auto 36px" }}>
              Elige el tipo de proyecto, responde 3 preguntas rápidas y la IA genera un render personalizado en segundos. Gratis, sin compromiso.
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
            <p style={{ fontSize:11, color:"#333", marginBottom:28 }}>Sin registro · Sin tarjeta · 100% gratis</p>
            <div style={{ borderTop:"1px solid #1a1a12", paddingTop:22, maxWidth:480, margin:"0 auto" }}>
              <p style={{ fontSize:13, color:"#777", marginBottom:12 }}>¿Ya sabes lo que quieres y no necesitas render?</p>
              <button onClick={() => { setModoRapido(true); try { window.scrollTo(0, 0); } catch {} }} style={{ background:"transparent", border:"1.5px solid #d4af37", color:"#d4af37", borderRadius:12, padding:"12px 22px", fontWeight:700, fontSize:14, cursor:"pointer" }}>
                📷 Cotizar con fotos de mi espacio →
              </button>
            </div>
          </div>
        )}

        {/* PASO 1 — FOTO + PREGUNTAS DE VIDA */}
        {step === 1 && (
          <div className="portal-step">
            <StepLabel step={1} total={TOTAL_STEPS} label="Tu espacio y estilo de vida" />
            <ProgressBar step={1} total={TOTAL_STEPS} />
            <div style={{ marginTop:28, marginBottom:20 }}>
              <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:26, fontWeight:700, color:"#f0e8dc", marginBottom:8 }}>Cuéntanos sobre tu espacio</h2>
              <p style={{ color:"#666", fontSize:14, lineHeight:1.7 }}>Esto ayuda a la IA a generar un render que realmente funcione para tu vida diaria.</p>
            </div>
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
            {!fotoUrl && (
              <div style={{ background:"#1a1208", border:"1px solid #d4af3720", borderRadius:10, padding:"10px 14px", marginBottom:16, fontSize:12, color:"#888" }}>
                💡 Sin foto, la IA usará una referencia de <strong style={{ color:"#d4af37" }}>{TIPOS_PROYECTO.find(t=>t.key===tipoProyecto)?.label}</strong> como base.
              </div>
            )}
            <div style={{ marginBottom:20 }}>
              <div style={{ fontSize:11, color:"#d4af37", fontWeight:700, letterSpacing:2, textTransform:"uppercase", marginBottom:4 }}>3 preguntas rápidas</div>
              <p style={{ fontSize:12, color:"#555", marginBottom:16 }}>Con tus respuestas ajustamos el diseño y los materiales a tu casa.</p>
              {preguntasVida.map((pregunta) => (
                <div key={pregunta.key} style={{ marginBottom:18 }}>
                  <p style={{ fontSize:14, fontWeight:600, color:"#e8e0d0", marginBottom: POR_QUE_PREGUNTA[pregunta.key] ? 3 : 10 }}>{pregunta.pregunta}</p>
                  {POR_QUE_PREGUNTA[pregunta.key] && (
                    <p style={{ fontSize:12, color:"#6f6a60", lineHeight:1.45, marginBottom:10 }}>{POR_QUE_PREGUNTA[pregunta.key]}</p>
                  )}
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
            <div style={{ marginBottom:24 }}>
              <label style={{ fontSize:11, color:"#555", display:"block", marginBottom:8, letterSpacing:1, textTransform:"uppercase" }}>
                ¿Algo más? <span style={{ color:"#333", fontWeight:400 }}>(opcional)</span>
              </label>
              <textarea value={descripcion} onChange={e => setDescripcion(e.target.value)}
                placeholder={tipoProyecto === "cocina" ? "Ej: Quiero isla, iluminación LED, sin manijas..." : tipoProyecto === "closet" ? "Ej: Con cajones en el centro, puertas de vidrio..." : "Describe colores, materiales, dimensiones..."}
                rows={3} style={{ width:"100%", background:"#0f0f0a", border:"1px solid #2a2a20", borderRadius:12, padding:"13px 16px", color:"#e8e0d0", fontSize:14, resize:"vertical", lineHeight:1.6 }} />
              <div style={{ fontSize:11, color:"#555", marginTop:6 }}>🔒 No escribas teléfono ni correo aquí: los talleres ven esta descripción antes de que los elijas.</div>
            </div>
            <div style={{ display:"flex", gap:10 }}>
              <Btn onClick={back} outline style={{ flex:1 }}>← Atrás</Btn>
              <Btn onClick={next} disabled={!vidaCompleta} style={{ flex:2 }}>
                {vidaCompleta ? "Elegir estilo →" : "Responde las 3 preguntas"}
              </Btn>
            </div>
           {!vidaCompleta && <p style={{ fontSize:11, color:"#555", textAlign:"center", marginTop:8 }}>{preguntasVida.filter(p => !vidaResp[p.key]).length} pregunta(s) pendientes</p>}
          </div>
        )}

        {/* PASO 2 — ESTILO + MATERIAL + COLOR + ACABADO */}
        {step === 2 && (
          <div className="portal-step">
            <StepLabel step={2} total={TOTAL_STEPS} label="Estilo, acabados y material" />
            <ProgressBar step={2} total={TOTAL_STEPS} />
            <div style={{ marginTop:28, marginBottom:20 }}>
              <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:26, fontWeight:700, color:"#f0e8dc", marginBottom:8 }}>¿Con qué te identificas?</h2>
              <p style={{ color:"#666", fontSize:14 }}>Elige por las fotos — no tienes que saber los nombres.</p>
            </div>

            {/* Nivel de gama */}
            <div style={{ marginBottom:24 }}>
              <label style={{ fontSize:11, color:"#d4af37", fontWeight:700, letterSpacing:2, textTransform:"uppercase", display:"block", marginBottom:12 }}>¿Qué nivel buscas?</label>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8 }}>
                {GAMAS.map(g => {
                  const sel = gama === g.key;
                  return (
                    <button key={g.key} onClick={() => setGama(g.key)} style={{
                      background:sel?"#d4af3712":"#0f0f0a", border:`1.5px solid ${sel?"#d4af37":"#1a1a12"}`,
                      borderRadius:12, padding:"12px 8px", cursor:"pointer", textAlign:"center", transition:"all .2s"
                    }}>
                      <div style={{ fontWeight:700, fontSize:13, color:sel?"#d4af37":"#e8e0d0" }}>{g.label}</div>
                      <div style={{ fontSize:10, color:"#555", marginTop:3 }}>{g.desc}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Estilos */}
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

            {/* Material */}
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
                      transition:"all .25s", padding:0, boxShadow:sel?`0 0 16px ${m.color}30`:"none"
                    }}>
                      <div style={{ position:"relative", height:72, overflow:"hidden", background:"#1a1a12" }}>
                        <img src={m.foto} alt={m.label} style={{ width:"100%", height:"100%", objectFit:"cover", filter:sel?"brightness(1)":"brightness(0.6)" }} onError={ev=>{ev.target.style.display="none";}} />
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

            {/* Preview rango dinámico */}
            {estilo && gama && (
              <div style={{ background:"#1a1208", border:"1px solid #d4af3730", borderRadius:12, padding:"12px 16px", marginBottom:20, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <div style={{ fontSize:12, color:"#888" }}>Inversión estimada para tu selección</div>
                <div style={{ fontSize:16, fontWeight:900, color:"#d4af37" }}>
                  ${rango.min.toLocaleString("es-MX")} – ${rango.max.toLocaleString("es-MX")} MXN
                </div>
              </div>
            )}

            {/* Colores */}
            <div style={{ marginBottom:20 }}>
              <label style={{ fontSize:11, color:"#d4af37", fontWeight:700, letterSpacing:2, textTransform:"uppercase", display:"block", marginBottom:4 }}>
                Color exterior <span style={{ color:"#333", fontWeight:400 }}>(opcional)</span>
              </label>
              <p style={{ fontSize:11, color:"#555", marginBottom:10 }}>Puertas y frentes. Colores de melamina que se consiguen en Monterrey; el render muestra un tono aproximado.</p>
              <SelectorColor value={colorElegido} quitar onChange={(k) => {
                setColor(k);
                const lin = colorPorKey(k)?.linea;
                if (ACABADO_LINEA[lin]) setAcabado(ACABADO_LINEA[lin]);
              }} />
              {NOTA_LINEA[colorPorKey(colorElegido)?.linea] && (
                <div style={{ marginTop:10, background:"#0f0f0a", border:"1px solid #2a2618", borderRadius:10, padding:"10px 14px", fontSize:12, color:"#888", lineHeight:1.5 }}>
                  💡 {NOTA_LINEA[colorPorKey(colorElegido).linea]} El acabado se marcó solo abajo.
                </div>
              )}

              {colorElegido && (() => {
                const chipStyle = (sel) => ({ background: sel ? "#d4af3712" : "#0f0f0a", border: `1.5px solid ${sel ? "#d4af37" : "#1a1a12"}`, color: sel ? "#d4af37" : "#e8e0d0", borderRadius: 50, padding: "7px 12px", fontSize: 12, fontWeight: sel ? 700 : 500, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6 });
                const mini = (key) => <span style={{ width:14, height:14, borderRadius:4, background:colorPorKey(key)?.hex || "#fff", border:"1px solid #333", display:"inline-block" }} />;
                const intEsOtro = colorInterior !== "blanco" && colorInterior !== "igual";
                return (
                  <div style={{ marginTop:16, background:"#0b0b08", border:"1px solid #1a1a12", borderRadius:12, padding:"12px 12px 4px" }}>
                    <div style={{ fontSize:11, color:"#d4af37", fontWeight:700, letterSpacing:1.5, textTransform:"uppercase", marginBottom:8 }}>Color interior</div>
                    <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:10 }}>
                      <button onClick={() => { setColorInterior("blanco"); setVerInteriorOtro(false); }} style={chipStyle(colorInterior === "blanco")}>{mini("blanco")} Blanco</button>
                      <button onClick={() => { setColorInterior("igual"); setVerInteriorOtro(false); }} style={chipStyle(colorInterior === "igual")}>{mini(colorElegido)} Igual al exterior</button>
                      <button onClick={() => setVerInteriorOtro(v => !v)} style={chipStyle(intEsOtro)}>{intEsOtro ? <>{mini(colorInterior)} {nombreColor(colorInterior)}</> : "Otro color"}</button>
                    </div>
                    {verInteriorOtro && (
                      <div style={{ marginBottom:12 }}>
                        <SelectorColor value={intEsOtro ? colorInterior : ""} onChange={(k) => { setColorInterior(k); setVerInteriorOtro(false); }} />
                      </div>
                    )}
                    <div style={{ fontSize:11, color:"#d4af37", fontWeight:700, letterSpacing:1.5, textTransform:"uppercase", marginBottom:8 }}>Canto <span style={{ color:"#555", fontWeight:400, textTransform:"none", letterSpacing:0 }}>(la orilla de puertas y repisas)</span></div>
                    <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:10 }}>
                      {CANTOS.map(c => <button key={c.key} onClick={() => setCanto(c.key)} style={chipStyle(canto === c.key)}>{c.label}</button>)}
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Acabados */}
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
              {acabado && ACABADOS.find(a => a.key === acabado)?.consejo && (
                <div style={{ marginTop:10, background:"#0f0f0a", border:"1px solid #2a2618", borderRadius:10, padding:"10px 14px", fontSize:12, color:"#888", lineHeight:1.5 }}>
                  💡 {ACABADOS.find(a => a.key === acabado).consejo}
                </div>
              )}
              {avisosAcabado({ tipo: tipoProyecto, acabado, material, vida: vidaResp }).map((t, i) => (
                <div key={i} style={{ marginTop:8, background:"#1a1208", border:"1px solid #d4af3740", borderRadius:10, padding:"10px 14px", fontSize:12, color:"#d9c38a", lineHeight:1.5 }}>
                  ⚠️ {t}
                </div>
              ))}
            </div>

            <div style={{ display:"flex", gap:10 }}>
              <Btn onClick={back} outline style={{ flex:1 }}>← Atrás</Btn>
              <Btn onClick={async () => { next(); await generarRender(); }} disabled={!estilo || !gama} style={{ flex:2 }}>
                🤖 Generar render con IA →
              </Btn>
            </div>
          </div>
        )}

        {/* PASO 3 — RENDER */}
        {step === 3 && (
          <div className="portal-step" id="render-area">
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
    {sinCuenta ? "Ya usaste tus renders gratis de hoy" : "Ya usaste tus renders de este mes"}
    </h3>
    <p style={{ color:"#666", fontSize:13, lineHeight:1.7, marginBottom:20 }}>
      "Se renuevan el próximo mes. Si envías una solicitud de cotización a los talleres desde Mis Proyectos, ganas 1 render más (máximo 2 extra al mes)."
    </p>
    {sinCuenta && <AuthInline titulo="Crea tu cuenta gratis y sigue con 3 renders al mes" onSuccess={ses => { autoRender.current = true; alAutenticar(ses); }} />}
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
             {sinCuenta && <AuthInline titulo="🔓 Crea tu cuenta gratis: descarga sin marca de agua, ajusta tu render y guarda tu proyecto" onSuccess={async ses => { alAutenticar(ses); await guardarEnPerfil(); }} />}
             {tieneCuenta && (
                  <div style={{ background:"#0f0f0a", border:"1px solid #d4af3730", borderRadius:16, padding:20, marginBottom:16 }}>
                    <div style={{ fontSize:11, color:"#d4af37", fontWeight:700, letterSpacing:2, textTransform:"uppercase", marginBottom:8 }}>🔧 ¿Qué le cambiarías?</div>
                    <p style={{ fontSize:12, color:"#555", marginBottom:12, lineHeight:1.6 }}>Describe exactamente qué quieres cambiar y regeneramos con esos ajustes.</p>
                    <textarea value={ajusteTexto} onChange={e => setAjusteTexto(e.target.value)}
                      placeholder="Ej: Cambia el color a blanco mate, agrega isla, quita las manijas, pon puertas de vidrio..."
                      rows={3} style={{ width:"100%", background:"#0a0a08", border:"1px solid #2a2a20", borderRadius:10, padding:"12px 14px", color:"#e8e0d0", fontSize:13, resize:"vertical", fontFamily:"inherit", marginBottom:12 }} />
                    <div style={{ display:"flex", gap:10, alignItems:"center" }}>
                      <button onClick={regenerarConAjuste} disabled={!ajusteTexto.trim() || regenerandoConAjuste || renderLoading}
                        style={{ background: ajusteTexto.trim() && !regenerandoConAjuste ? "linear-gradient(135deg,#d4af37,#f0c84a)" : "#1a1a12", color: ajusteTexto.trim() && !regenerandoConAjuste ? "#000" : "#555", border:"none", borderRadius:10, padding:"11px 22px", fontWeight:900, fontSize:13, cursor: ajusteTexto.trim() && !regenerandoConAjuste ? "pointer" : "not-allowed" }}>
                        {regenerandoConAjuste ? "⏳ Regenerando..." : "✨ Regenerar con ajustes"}
                      </button>
                      {ajusteTexto.trim() && <button onClick={() => setAjusteTexto("")} style={{ background:"transparent", border:"1px solid #333", color:"#555", borderRadius:8, padding:"9px 14px", fontSize:12, cursor:"pointer" }}>Limpiar</button>}
                    </div>
                    <div style={{ marginTop:10, fontSize:11, color:"#333" }}>💡 Sé específico para mejores resultados.{ajustesLibres !== null && ajustesLibres < 999 && (ajustesLibres > 0 ? ` Te quedan ${ajustesLibres} ajuste(s) gratis para este render.` : " Ya no tienes ajustes gratis; el siguiente usará uno de tus renders.")}</div>
                  </div>
                )}
                <div style={{ display:"flex", gap:8, marginBottom:16 }}>
                  <button onClick={descargarRender} style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", gap:8, background:"#0f0f0a", border:"1.5px solid #2a2a20", borderRadius:12, padding:"12px", cursor:"pointer", color:"#e8e0d0", fontSize:13, fontWeight:600 }}>
                    ⬇️ Descargar render
                  </button>
                  {tieneCuenta && (
                    <button onClick={guardarEnPerfil} disabled={guardandoPerfil || guardadoEnPerfil} style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", gap:8, background: guardadoEnPerfil ? "#0a2a0a" : "#0f0f0a", border: `1.5px solid ${guardadoEnPerfil ? "#4caf50" : "#2a2a20"}`, borderRadius:12, padding:"12px", cursor: guardadoEnPerfil ? "default" : "pointer", color: guardadoEnPerfil ? "#4caf50" : "#e8e0d0", fontSize:13, fontWeight:600 }}>
                      {guardandoPerfil ? "Guardando..." : guardadoEnPerfil ? "✓ Guardado en perfil" : "🔖 Guardar en mis proyectos"}
                    </button>
                  )}
                </div>
                <div style={{ background:"#0f0f0a", border:"1px solid #d4af3720", borderRadius:16, padding:20, marginBottom:16 }}>
                  <div style={{ fontSize:11, color:"#d4af37", fontWeight:700, letterSpacing:2, textTransform:"uppercase", marginBottom:12, display:"flex", alignItems:"center", gap:8 }}>
                    <span>🤖 Análisis de tu proyecto</span>
                    {descripcionLoading && <span style={{ fontSize:10, color:"#555", fontWeight:400, animation:"pulse 1.5s ease infinite" }}>Generando descripción...</span>}
                  </div>
                  {descripcionLoading && (
                    <div style={{ display:"flex", gap:6, alignItems:"center" }}>
                      {[0,1,2].map(i => <div key={i} style={{ width:6, height:6, borderRadius:"50%", background:"#d4af3760", animation:`pulse 1.5s ${i*0.3}s ease infinite` }} />)}
                    </div>
                  )}
                  {descripcionIA && !descripcionLoading && <p style={{ fontSize:14, color:"#aaa", lineHeight:1.85, fontStyle:"italic" }}>"{descripcionIA}"</p>}
                  {!descripcionIA && !descripcionLoading && <p style={{ fontSize:13, color:"#444" }}>No se pudo generar la descripción. El render sí está listo.</p>}
                </div>
                <div style={{ background:"#0f0f0a", border:"1px solid #1a1a12", borderRadius:16, padding:20, marginBottom:16 }}>
                  <div style={{ fontSize:11, color:"#d4af37", fontWeight:700, letterSpacing:2, textTransform:"uppercase", marginBottom:14 }}>
                    Detalles · {ESTILOS.find(e=>e.key===estilo)?.label}
                    {colorElegido && ` · ${nombreColor(colorElegido)}`}
                    {acabado && ` · ${ACABADOS.find(a=>a.key===acabado)?.label}`}
                    {material && ` · ${MATERIALES.find(m=>m.key===material)?.label}`}
                  </div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
                    {[
                      ["Materiales", MATERIALES_SUGERIDOS[estilo]],
                      ["Tiempo estimado", TIEMPOS[tipoProyecto]],
                      ["Inversión aprox.", `$${rango.min.toLocaleString("es-MX")} – $${rango.max.toLocaleString("es-MX")} MXN`],
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
                {material && ` · ${MATERIALES.find(m=>m.key===material)?.label}`}
              </div>
              <div style={{ fontFamily:"'Playfair Display',serif", fontSize:40, fontWeight:900, color:"#d4af37", marginBottom:8 }}>
                ${rango.min.toLocaleString("es-MX")} – ${rango.max.toLocaleString("es-MX")}
              </div>
              <div style={{ fontSize:13, color:"#555" }}>MXN · Fabricación e instalación</div>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10, marginBottom:24 }}>
              {[
                ["Anticipo típico", "60%", `$${Math.round(rango.min * 0.6).toLocaleString("es-MX")}`],
                ["Tiempo", TIEMPOS[tipoProyecto], "hábiles"],
                ["Garantía", "6 meses", "instalación"],
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

        {/* PASO 7 — ENVIAR SOLICITUD */}
        {step === 7 && (
          <div className="portal-step">
            <StepLabel step={7} total={TOTAL_STEPS} label="Solicitud" />
            <ProgressBar step={7} total={TOTAL_STEPS} />
            <div style={{ marginTop:28, marginBottom:24 }}>
              <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:26, fontWeight:700, color:"#f0e8dc", marginBottom:8 }}>Último paso: ¿dónde será el proyecto?</h2>
              <p style={{ color:"#666", fontSize:14 }}>Con esto los talleres de tu zona te mandan su cotización en rango.</p>
            </div>
            {tieneCuenta && (
              <div style={{ background:"#0f0f0a", border:"1px solid #1a1a12", borderRadius:12, padding:"10px 14px", marginBottom:16, fontSize:13, color:"#aaa" }}>
                👤 {nombre || "Tu cuenta"}{correo ? ` · ${correo}` : ""}
              </div>
            )}
            <div style={{ marginBottom:20 }}>
              <label style={{ fontSize:11, color:"#555", display:"block", marginBottom:8, letterSpacing:1, textTransform:"uppercase" }}>¿En qué zona será el proyecto?</label>
              <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                {ZONAS.map(z => (
                  <button key={z} onClick={() => setZona(z)} style={{ background: zona===z ? "#d4af3718" : "#0f0f0a", border:`1.5px solid ${zona===z ? "#d4af37" : "#1a1a12"}`, color: zona===z ? "#d4af37" : "#888", borderRadius:50, padding:"9px 14px", fontSize:13, cursor:"pointer", fontWeight: zona===z ? 700 : 400 }}>
                    {zona===z && "✓ "}{z}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ marginBottom:20 }}>
              <label style={{ fontSize:11, color:"#555", display:"block", marginBottom:6, letterSpacing:1, textTransform:"uppercase" }}>WhatsApp / Teléfono</label>
              <input type="tel" value={telefono} onChange={e => setTelefono(e.target.value)} placeholder="81-1234-5678"
                style={{ width:"100%", background:"#0f0f0a", border:"1px solid #2a2a20", borderRadius:12, padding:"13px 16px", color:"#e8e0d0", fontSize:14 }} />
              <div style={{ fontSize:11, color:"#555", marginTop:6 }}>🔒 Los talleres NO ven tu teléfono ni tu correo. Solo lo compartimos con el taller que tú elijas.</div>
            </div>
            <div style={{ marginBottom:20 }}>
              <label style={{ fontSize:11, color:"#555", display:"block", marginBottom:8, letterSpacing:1, textTransform:"uppercase" }}>Medidas aproximadas <span style={{ color:"#333", fontWeight:400 }}>(opcional)</span></label>
              <textarea value={medidas} onChange={e => setMedidas(e.target.value)}
                placeholder={tipoProyecto === "cocina" ? "Ej: Largo 3.20m, Alto 2.40m, Profundidad 0.60m" : "Ej: Ancho 2.40m, Alto 2.40m, Profundidad 0.60m"}
                rows={2} style={{ width:"100%", background:"#0f0f0a", border:"1px solid #2a2a20", borderRadius:12, padding:"13px 16px", color:"#e8e0d0", fontSize:14, resize:"vertical" }} />
            </div>
            {errSolicitud && <div style={{ color:"#ff8a80", fontSize:13, marginBottom:12 }}>{errSolicitud}</div>}
            {sinCuenta && (zona && telefono.replace(/\D/g,"").length >= 10 ? (
              <AuthInline titulo="Crea tu cuenta gratis para enviar tu solicitud y ver las cotizaciones" onSuccess={async ses => { alAutenticar(ses); const ok = await enviarSolicitud(ses); if (ok) next(); }} />
            ) : (
              <div style={{ background:"#0f0f0a", border:"1px solid #1a1a12", borderRadius:12, padding:14, marginBottom:20, fontSize:12, color:"#666", lineHeight:1.7 }}>
                Elige tu zona y escribe tu teléfono; después creas tu cuenta gratis (nombre, correo y contraseña) y se envía tu solicitud.
              </div>
            ))}
            <div style={{ display:"flex", gap:10 }}>
              <Btn onClick={back} outline style={{ flex:1 }}>← Atrás</Btn>
              {tieneCuenta && (
                <Btn onClick={async () => { const ok = await enviarSolicitud(); if (ok) next(); }} disabled={!zona || telefono.replace(/\D/g,"").length < 10 || saving} style={{ flex:2 }}>
                  {saving ? "Enviando..." : "Solicitar cotizaciones →"}
                </Btn>
              )}
            </div>
          </div>
        )}

        {/* PASO 8 — CONFIRMACIÓN */}
        {step === 8 && (
          <div className="portal-step" style={{ textAlign:"center", paddingTop:32 }}>
            <div style={{ fontSize:56, marginBottom:20 }}>🎉</div>
            <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:30, fontWeight:900, color:"#f0e8dc", marginBottom:12 }}>¡Solicitud enviada!</h2>
            <p style={{ color:"#888", fontSize:15, lineHeight:1.8, maxWidth:440, margin:"0 auto 32px" }}>Los talleres verificados de tu zona ya pueden ver tu proyecto y te enviarán su cotización en rango. Tú eliges con cuál trabajar y solo entonces compartimos tu contacto.</p>
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
                  ["Inversión", `$${rango.min.toLocaleString("es-MX")} – $${rango.max.toLocaleString("es-MX")}`],
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
                <a href="/app" onClick={() => { localStorage.removeItem("enkaje_renders"); localStorage.removeItem("enkaje_renders_cuenta"); }} style={{ display:"block", background:"#d4af37", color:"#000", borderRadius:12, padding:"13px 24px", fontWeight:900, fontSize:14, textDecoration:"none" }}>Crear cuenta gratis →</a>
              </div>
            )}
            {tieneCuenta && (
              <div style={{ background:"#0f2a0f", border:"1px solid #4caf5030", borderRadius:14, padding:16, marginBottom:16, display:"flex", justifyContent:"space-between", alignItems:"center", gap:12, flexWrap:"wrap" }}>
                <div>
                  <div style={{ fontSize:13, fontWeight:700, color:"#4caf50", marginBottom:2 }}>¿Quieres ver tus cotizaciones?</div>
                  <div style={{ fontSize:11, color:"#555" }}>Aquí verás las cotizaciones que lleguen</div>
                </div>
                <button onClick={() => { window.location.href = "/app"; sessionStorage.setItem("enkaje_tab", "mis_proyectos"); }} style={{ background:"#4caf50", color:"#000", border:"none", borderRadius:10, padding:"10px 18px", fontWeight:700, fontSize:13, cursor:"pointer", whiteSpace:"nowrap" }}>Ver mis cotizaciones →</button>
              </div>
            )}
            <div style={{ display:"flex", gap:10, justifyContent:"center", flexWrap:"wrap" }}>
              <Btn onClick={reset} outline style={{ fontSize:13 }}>Nuevo proyecto</Btn>
              <Btn onClick={() => {
                const msg = `Hola! Acabo de solicitar cotización en EnKaje Pro para mi proyecto de ${TIPOS_PROYECTO.find(t=>t.key===tipoProyecto)?.label} estilo ${ESTILOS.find(e=>e.key===estilo)?.label}. ¿Me pueden ayudar?`;
                window.open(`https://wa.me/528127176786?text=${encodeURIComponent(msg)}`, "_blank");
              }} color="#25D366" style={{ fontSize:13 }}>💬 ¿Dudas? Escríbenos</Btn>
            </div>
          </div>
        )}
        </>)}

      </div>
    </>
  );
}
