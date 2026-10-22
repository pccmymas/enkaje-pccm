// src/colores.js
// Catálogo de colores de melamina (catálogo Navetta). La foto de cada color está en /public/colores/<key>.webp.
// "en" es la descripción en inglés que usa el render. El tono del render es aproximado.

export const COLORES_MELAMINA = [
  { key: "avellana", nombre: "Avellana", tipo: "madera", hex: "#ba9b80", en: "light hazelnut oak woodgrain, warm light brown with a soft grey cast" },
  { key: "cedro", nombre: "Cedro", tipo: "madera", hex: "#af5f45", en: "reddish cedar woodgrain, strong red-orange brown tone" },
  { key: "duna", nombre: "Duna", tipo: "madera", hex: "#a1785f", en: "medium warm brown woodgrain" },
  { key: "encino-europeo", nombre: "Encino Europeo", tipo: "madera", hex: "#b18d78", en: "European oak woodgrain, medium warm brown with small knots and cathedral grain" },
  { key: "fiorano", nombre: "Fiorano", tipo: "madera", hex: "#756d6c", en: "rustic dark greyish-brown oak woodgrain with saw-cut texture" },
  { key: "linoza", nombre: "Linoza", tipo: "madera", hex: "#8f8e88", en: "weathered grey woodgrain with strong cathedral grain" },
  { key: "lisboa", nombre: "Lisboa", tipo: "madera", hex: "#ac977c", en: "light natural oak woodgrain with golden beige vertical streaks" },
  { key: "marfil", nombre: "Marfil", tipo: "madera", hex: "#ebd4bb", en: "very light ivory cream woodgrain with fine straight grain" },
  { key: "modena", nombre: "Modena", tipo: "madera", hex: "#c19464", en: "golden honey oak woodgrain with fine straight grain" },
  { key: "nogal", nombre: "Nogal", tipo: "madera", hex: "#866d5c", en: "walnut woodgrain with strong contrasting dark and light brown streaks" },
  { key: "nogal-albura", nombre: "Nogal Albura", tipo: "madera", hex: "#775547", en: "dark reddish-brown walnut woodgrain" },
  { key: "parota", nombre: "Parota", tipo: "madera", hex: "#9d7d67", en: "parota woodgrain, medium brown with dark vertical streaks" },
  { key: "polar", nombre: "Polar", tipo: "madera", hex: "#eae4de", en: "white-washed woodgrain with light grey streaks" },
  { key: "roble-blanco", nombre: "Roble Blanco", tipo: "madera", hex: "#cca892", en: "light pinkish-beige white oak woodgrain" },
  { key: "roble-cenizo", nombre: "Roble Cenizo", tipo: "madera", hex: "#a49c93", en: "ash-grey oak woodgrain with knots" },
  { key: "rosa-morada", nombre: "Rosa Morada", tipo: "madera", hex: "#a48e77", en: "medium brown woodgrain with fine straight streaks" },
  { key: "tabaco", nombre: "Tabaco", tipo: "madera", hex: "#403c34", en: "very dark brown almost black woodgrain with subtle grain" },
  { key: "tzalam", nombre: "Tzalam", tipo: "madera", hex: "#7c5c48", en: "tzalam woodgrain with dramatic contrast of dark brown and golden streaks" },
  { key: "tzalam-natura", nombre: "Tzalam Natura", tipo: "madera", hex: "#9c7f63", en: "light-medium natural brown woodgrain with soft streaks" },
  { key: "wengue", nombre: "Wengue", tipo: "madera", hex: "#422b25", en: "very dark chocolate-brown wenge woodgrain" },
  { key: "carrara", nombre: "Carrara", tipo: "especial", hex: "#f6f6f4", en: "printed white Carrara marble pattern with thin grey veining" },
  { key: "marquina", nombre: "Marquina", tipo: "especial", hex: "#353530", en: "printed black Marquina marble pattern with thin white veining" },
  { key: "textil", nombre: "Textil", tipo: "especial", hex: "#e5ddd6", en: "light beige linen fabric texture" },
  { key: "azul-milano", nombre: "Azul Milano", tipo: "liso", hex: "#38505f", en: "dark slate blue solid color" },
  { key: "beige-siena", nombre: "Beige Siena", tipo: "liso", hex: "#ebebe7", en: "very light warm off-white solid color" },
  { key: "blanco", nombre: "Blanco", tipo: "liso", hex: "#fcfbf6", en: "pure white solid color" },
  { key: "capuchino", nombre: "Capuchino", tipo: "liso", hex: "#d3c1b3", en: "light cappuccino beige solid color" },
  { key: "castana", nombre: "Castaña", tipo: "liso", hex: "#9a8c70", en: "khaki taupe olive-brown solid color" },
  { key: "gris-claro", nombre: "Gris Claro", tipo: "liso", hex: "#79787e", en: "medium cool grey solid color" },
  { key: "frosty", nombre: "Frosty", tipo: "liso", hex: "#f4f7fb", en: "bright cool white solid color" },
  { key: "negro", nombre: "Negro", tipo: "liso", hex: "#262729", en: "black solid color" },
  { key: "oxford", nombre: "Oxford", tipo: "liso", hex: "#64686b", en: "dark charcoal grey solid color" },
];

export const TIPOS_COLOR = [
  { key: "liso",     label: "Lisos" },
  { key: "madera",   label: "Maderas" },
  { key: "especial", label: "Especiales" },
];

// Canto: la orilla de puertas, frentes y repisas.
export const CANTOS = [
  { key: "igual",    label: "Igual al exterior" },
  { key: "interior", label: "Igual al interior" },
  { key: "negro",    label: "Negro" },
  { key: "aluminio", label: "Aluminio" },
];

export const colorPorKey = (key) => COLORES_MELAMINA.find(c => c.key === key) || null;
export const fotoColor = (key) => `/colores/${key}.webp`;
