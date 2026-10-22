// src/colores.js
// Catálogo de colores de melamina (catálogo Mirenza, se vende en Monterrey).
// La foto de cada color está en /public/colores/<key>.webp. "en" es la descripción para el render (tono aproximado).
// linea: estandar | ultramate (antihuella) | altobrillo | syncro (poro sincronizado, texturizado)

export const COLORES_MELAMINA = [
  { key: "fiorano", nombre: "Fiorano", corto: "Fiorano", tipo: "madera", linea: "estandar", grupo: "madera", hex: "#7d756d", en: "rustic grey weathered oak woodgrain with knots and cracks" },
  { key: "nogal-albura", nombre: "Nogal Albura", corto: "Nogal Albura", tipo: "madera", linea: "estandar", grupo: "madera", hex: "#956e4f", en: "medium warm walnut woodgrain with soft knots" },
  { key: "parota", nombre: "Parota", corto: "Parota", tipo: "madera", linea: "estandar", grupo: "madera", hex: "#8c6750", en: "parota woodgrain with fine straight brown streaks" },
  { key: "nogal", nombre: "Nogal", corto: "Nogal", tipo: "madera", linea: "estandar", grupo: "madera", hex: "#866751", en: "walnut woodgrain with strong contrasting dark and light brown streaks" },
  { key: "moscato", nombre: "Moscato", corto: "Moscato", tipo: "madera", linea: "estandar", grupo: "madera", hex: "#987351", en: "light-medium honey walnut woodgrain" },
  { key: "tzalam", nombre: "Tzalam", corto: "Tzalam", tipo: "madera", linea: "estandar", grupo: "madera", hex: "#806248", en: "tzalam woodgrain with dramatic dark brown and light golden streaks" },
  { key: "nogal-pakaan", nombre: "Nogal Pakaan", corto: "Nogal Pakaan", tipo: "madera", linea: "estandar", grupo: "madera", hex: "#855f3e", en: "rustic medium-brown walnut woodgrain with many small knots" },
  { key: "cedro", nombre: "Cedro", corto: "Cedro", tipo: "madera", linea: "estandar", grupo: "madera", hex: "#64382f", en: "deep reddish-brown cedar woodgrain" },
  { key: "caribe", nombre: "Caribe", corto: "Caribe", tipo: "madera", linea: "estandar", grupo: "madera", hex: "#dadada", en: "white woodgrain with very subtle light grey grain" },
  { key: "modena", nombre: "Modena", corto: "Modena", tipo: "madera", linea: "estandar", grupo: "madera", hex: "#bc8b63", en: "golden honey oak woodgrain with fine straight grain" },
  { key: "mantova", nombre: "Mantova", corto: "Mantova", tipo: "madera", linea: "estandar", grupo: "madera", hex: "#c19d79", en: "light natural rustic oak woodgrain with small knots" },
  { key: "chiara-latte-polar", nombre: "Chiara Latte Polar", corto: "Chiara Latte", tipo: "madera", linea: "estandar", grupo: "madera", hex: "#787065", en: "warm grey-taupe oak woodgrain" },
  { key: "wengue", nombre: "Wengué", corto: "Wengué", tipo: "madera", linea: "estandar", grupo: "madera", hex: "#38261d", en: "very dark chocolate-brown wenge woodgrain" },
  { key: "textil", nombre: "Textil", corto: "Textil", tipo: "especial", linea: "estandar", grupo: "especial", hex: "#b9b4ab", en: "light beige-grey linen fabric texture" },
  { key: "carrara-blanco", nombre: "Carrara Blanco", corto: "Carrara Blanco", tipo: "especial", linea: "estandar", grupo: "especial", hex: "#b8c4cd", en: "printed white Carrara marble pattern with grey-brown veining" },
  { key: "nero-marquina", nombre: "Nero Marquina", corto: "Nero Marquina", tipo: "especial", linea: "estandar", grupo: "especial", hex: "#494844", en: "printed black Marquina marble pattern with thin white veining" },
  { key: "dazzling", nombre: "Dazzling (blanco)", corto: "Dazzling", tipo: "liso", linea: "estandar", grupo: "liso", hex: "#ffffff", en: "pure bright white solid color" },
  { key: "frosty", nombre: "Frosty Importado", corto: "Frosty", tipo: "liso", linea: "estandar", grupo: "liso", hex: "#ededed", en: "cool white solid color" },
  { key: "gris-oxford", nombre: "Gris Oxford", corto: "Gris Oxford", tipo: "liso", linea: "estandar", grupo: "liso", hex: "#737373", en: "medium-dark grey solid color" },
  { key: "negro", nombre: "Negro", corto: "Negro", tipo: "liso", linea: "estandar", grupo: "liso", hex: "#06070c", en: "deep black solid color" },
  { key: "negro-onix", nombre: "Negro Onix", corto: "Negro Onix", tipo: "liso", linea: "estandar", grupo: "liso", hex: "#191919", en: "soft black charcoal solid color" },
  { key: "um-bianco-cremona", nombre: "Bianco Cremona Ultra Mate", corto: "Bianco Cremona", tipo: "liso", linea: "ultramate", grupo: "ultramate", hex: "#fbf4e2", en: "warm cream ivory solid color, super-matte anti-fingerprint finish with a soft velvety look and no shine" },
  { key: "um-duna", nombre: "Duna Ultra Mate", corto: "Duna", tipo: "liso", linea: "ultramate", grupo: "ultramate", hex: "#e1dedb", en: "light warm greige solid color, super-matte anti-fingerprint finish with a soft velvety look and no shine" },
  { key: "um-verde-tive", nombre: "Verde Tive Ultra Mate", corto: "Verde Tive", tipo: "liso", linea: "ultramate", grupo: "ultramate", hex: "#9ba08c", en: "muted sage green solid color, super-matte anti-fingerprint finish with a soft velvety look and no shine" },
  { key: "um-gris", nombre: "Gris Ultra Mate", corto: "Gris", tipo: "liso", linea: "ultramate", grupo: "ultramate", hex: "#e0e0e0", en: "light grey solid color, super-matte anti-fingerprint finish with a soft velvety look and no shine" },
  { key: "um-negro", nombre: "Negro Ultra Mate", corto: "Negro", tipo: "liso", linea: "ultramate", grupo: "ultramate", hex: "#2b2b2b", en: "charcoal black solid color, super-matte anti-fingerprint finish with a soft velvety look and no shine" },
  { key: "ab-blanco", nombre: "Alto Brillo Blanco", corto: "Blanco", tipo: "liso", linea: "altobrillo", grupo: "altobrillo", hex: "#fefdf9", en: "white high-gloss mirror-like lacquered finish with strong reflections" },
  { key: "ab-gris", nombre: "Alto Brillo Gris", corto: "Gris", tipo: "liso", linea: "altobrillo", grupo: "altobrillo", hex: "#635b59", en: "warm taupe grey high-gloss mirror-like lacquered finish with strong reflections" },
  { key: "ab-negro", nombre: "Alto Brillo Negro", corto: "Negro", tipo: "liso", linea: "altobrillo", grupo: "altobrillo", hex: "#222224", en: "black high-gloss mirror-like lacquered finish with strong reflections" },
  { key: "sy-boreal", nombre: "Boreal Syncro", corto: "Boreal", tipo: "madera", linea: "syncro", grupo: "syncro", hex: "#cac6c5", en: "light grey-white oak woodgrain, synchronized-pore textured finish where the embossed relief follows the woodgrain" },
  { key: "sy-encino", nombre: "Encino Syncro", corto: "Encino", tipo: "madera", linea: "syncro", grupo: "syncro", hex: "#d4c4b1", en: "light natural beige oak woodgrain, synchronized-pore textured finish where the embossed relief follows the woodgrain" },
  { key: "sy-toscano", nombre: "Toscano Syncro", corto: "Toscano", tipo: "madera", linea: "syncro", grupo: "syncro", hex: "#d3b59f", en: "light pinkish-beige woodgrain, synchronized-pore textured finish where the embossed relief follows the woodgrain" },
  { key: "sy-roble-nordico", nombre: "Roble Nórdico Syncro", corto: "Roble Nórdico", tipo: "madera", linea: "syncro", grupo: "syncro", hex: "#9d9389", en: "grey-taupe Nordic oak woodgrain, synchronized-pore textured finish where the embossed relief follows the woodgrain" },
  { key: "sy-tribecca", nombre: "Tribecca Syncro", corto: "Tribecca", tipo: "madera", linea: "syncro", grupo: "syncro", hex: "#ac7f67", en: "warm medium reddish-brown woodgrain, synchronized-pore textured finish where the embossed relief follows the woodgrain" },
  { key: "sy-milano", nombre: "Milano Syncro", corto: "Milano", tipo: "madera", linea: "syncro", grupo: "syncro", hex: "#938177", en: "grey-brown woodgrain, synchronized-pore textured finish where the embossed relief follows the woodgrain" },
  { key: "sy-nogal", nombre: "Nogal Syncro", corto: "Nogal", tipo: "madera", linea: "syncro", grupo: "syncro", hex: "#817370", en: "dark grey-brown walnut woodgrain, synchronized-pore textured finish where the embossed relief follows the woodgrain" },
];

// Pestañas del selector
export const TIPOS_COLOR = [
  { key: "madera",     label: "Maderas" },
  { key: "liso",       label: "Lisos" },
  { key: "especial",   label: "Mármol y textil" },
  { key: "ultramate",  label: "Ultra mate" },
  { key: "altobrillo", label: "Alto brillo" },
  { key: "syncro",     label: "Texturizado" },
];

// Nota corta por línea, se muestra al escoger un color de esa línea
export const NOTA_LINEA = {
  ultramate:  "Ultra mate antihuella: casi no marca dedos, tacto sedoso.",
  altobrillo: "Alto brillo: se ve moderno, pero marca huellas y rayones.",
  syncro:     "Texturizado (poro sincronizado): el relieve sigue la veta y se siente como madera real.",
};

// Acabado que ya trae cada línea (para marcarlo solo en el portal)
export const ACABADO_LINEA = { ultramate: "mate", altobrillo: "alto_brillo", syncro: "texturizado" };

// Canto: la orilla de puertas, frentes y repisas.
export const CANTOS = [
  { key: "igual",    label: "Igual al exterior" },
  { key: "interior", label: "Igual al interior" },
  { key: "negro",    label: "Negro" },
  { key: "aluminio", label: "Aluminio" },
];

// Colores del catálogo anterior (para borradores viejos)
const ANTERIORES = { blanco: "dazzling" };

export const colorPorKey = (key) =>
  COLORES_MELAMINA.find(c => c.key === key) || COLORES_MELAMINA.find(c => c.key === ANTERIORES[key]) || null;
export const fotoColor = (key) => `/colores/${key}.webp`;
