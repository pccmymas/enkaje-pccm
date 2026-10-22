// src/renderPrompt.js
// Constructor del prompt de render de EnKaje Pro.
// 6 tipos (cocina, closet, puerta, mueble, panel, bano) x 8 estilos x 3 variantes de diseño.
// La variante se elige al azar la primera vez y se conserva al ajustar (para no cambiar el diseño).

const COLOR_EN = {
  blanco_mate: "matte white",
  negro_mate: "matte black",
  gris: "medium grey",
  madera_clara: "light oak wood tone",
  madera_oscura: "dark walnut wood tone",
  verde_salvia: "sage green",
  azul_marino: "navy blue",
  beige: "warm beige",
};
const COLORES_MADERA = ["madera_clara", "madera_oscura"];

const ESTILO_EN = {
  moderno: "Modern",
  minimalista: "Minimalist",
  contemporaneo: "Contemporary",
  industrial: "Industrial",
  clasico: "Classic",
  rustico: "Rustic",
  nordico: "Scandinavian",
  lujo: "Luxury premium",
};

// Paleta por defecto del estilo, solo se usa si el cliente NO eligió color.
const ESTILO_PALETA = {
  moderno: "neutral palette of warm white and soft grey with one natural wood accent",
  minimalista: "monochrome palette of white and pale grey with very little contrast",
  contemporaneo: "two-tone palette combining a light neutral with a warm wood tone",
  industrial: "dark charcoal and black accents with raw wood tones",
  clasico: "cream and warm white tones with rich wood accents",
  rustico: "warm natural wood tones with earthy textures",
  nordico: "white and very light birch wood tones, soft and airy",
  lujo: "deep rich tones with marble veining and brass accents",
};

const TIPOS = {
  cocina: {
    subject: "custom fitted kitchen (cocina integral)",
    target: "cabinet doors and drawer fronts",
    elements:
      "upper and lower cabinets, drawer bank, countertop, backsplash, integrated appliances (one refrigerator, one cooktop, one hood, one sink with faucet)",
    dims:
      "Countertop height 90 cm, about 55 cm gap between countertop and upper cabinets, upper cabinets 70 cm tall, base cabinets 60 cm deep, island at least 100 cm clear walkway around it.",
    camera: "Wide-angle, eye-level view of the whole kitchen: upper cabinets, base cabinets, countertop, backsplash and appliances all visible.",
    lighting: "Warm 2700K-3000K LED strip under the upper cabinets, recessed ceiling spots, soft natural daylight.",
    avoid:
      "Exactly one sink, one cooktop, one hood and one refrigerator. Doors and drawers form a clean aligned grid with 2-3 mm gaps. Handles identical and evenly placed.",
  },
  closet: {
    subject: "custom walk-in closet or built-in wardrobe (closet a medida)",
    target: "closet doors, drawer fronts and shelf edges",
    elements:
      "hanging rails at realistic heights, folded-clothes shelving, drawer bank, shoe area, internal LED lighting, a few neatly arranged garments in neutral colors",
    dims:
      "Standard hanging rail at 1.70 m for long hang and double rails at 1.05 m and 1.80 m, drawers 18-25 cm tall, shelves 35-40 cm deep, wardrobe height 2.40 m.",
    camera: "Wide-angle, eye-level view showing the full closet wall or the full interior, hanging zone, shelves and drawers visible.",
    lighting: "Warm 2700K internal LED strips inside the closet, soft ambient room light, boutique atmosphere.",
    avoid:
      "Shelves and rails perfectly straight and level, drawer fronts equal height, clothing sparse, tidy and undistorted, no clutter, no hangers merging together.",
  },
  puerta: {
    subject: "custom door (puerta a medida)",
    target: "door leaf and frame surface",
    elements: "one full-height door leaf, frame and casing, hinges, premium handle set, a little wall and floor context on each side",
    dims:
      "Door height between 2.10 m and 2.40 m in proportion to the room, width 90 cm for interior doors or 1.00-1.20 m for entrance doors, leaf thickness 4-5 cm.",
    camera: "Straight-on, eye-level view of the whole door from floor to the top of the frame, door closed, wall context visible.",
    lighting: "Soft directional side light that reveals surface texture, warm and natural.",
    avoid:
      "Exactly one door leaf unless a double door is requested. Handle placed on the side opposite to the hinges at about 1.00 m height. Edges perfectly straight, no extra doors, no signs.",
  },
  mueble: {
    subject: "custom TV entertainment center (centro de entretenimiento / mueble de TV a medida)",
    target: "cabinet doors, drawer fronts and shelf surfaces",
    elements:
      "one wall-mounted flat TV, closed storage, open display niches, floating or low console, integrated LED lighting, a few minimal decorative objects (books, a plant, a ceramic vase)",
    dims:
      "TV 65 inch with its center at 1.10 m from the floor, console 35-45 cm high and 40-45 cm deep, open niches 30-35 cm deep, tall side units up to 2.40 m, total unit width 2.80-4.00 m.",
    camera: "Wide-angle, eye-level frontal view of the entire TV wall unit with the sofa edge or room context partly visible.",
    lighting: "Warm 2700K LED strips behind the TV panel and inside the niches, soft ambient light.",
    avoid:
      "Exactly one TV: flat, dark, switched off, no logos and no on-screen content, correct 16:9 proportions, centered on the unit. Shelves straight and level, doors aligned, cables hidden, no floating items.",
  },
  panel: {
    subject: "custom decorative wall paneling (panel decorativo / lambrin a medida)",
    target: "panel surface, slats, boards and moldings",
    elements: "a wall covered with the paneling, edge trims, a subtle LED lighting detail, minimal furniture in front of the wall",
    dims:
      "Full-height paneling runs from floor to ceiling (about 2.40-2.70 m). Half-height lambrin (wainscot) runs 90-110 cm from the floor with a cap molding. Slats and boards are uniform in width and spacing.",
    camera: "Straight-on, eye-level view of the whole paneled wall, floor to ceiling, perspective correct.",
    lighting: "Warm 2700K grazing light from a ceiling LED strip that reveals every groove and joint.",
    avoid:
      "Slats, grooves and boards perfectly parallel, evenly spaced and continuous without random breaks. Follow the design direction for panel height. No switches, outlets or text on the wall.",
  },
  bano: {
    subject: "custom bathroom vanity and cabinetry (mueble de baño / vanity a medida)",
    target: "vanity cabinet doors and drawer fronts",
    elements:
      "vanity cabinet with drawers or doors, countertop with sink and faucet, mirror with lighting, wall tile, towels folded neatly",
    dims:
      "Vanity height 80-85 cm, depth 45-50 cm, mirror bottom 20 cm above the countertop, faucet centered on the sink, large-format tiles 60x120 cm.",
    camera: "Wide-angle, eye-level view of the whole vanity wall with mirror, countertop and cabinet visible.",
    lighting: "Warm 2700K backlit mirror glow, soft daylight, spa atmosphere.",
    avoid:
      "One faucet per sink, centered. Mirror and vanity aligned. Plumbing hidden, no clutter, no text, no reflections of a person or the camera.",
  },
};

// 3 direcciones de diseño por tipo y estilo. No fijan color del mueble: el color lo decide el cliente.
const VARIANTES = {
  cocina: {
    moderno: [
      "L-shaped layout with a large island. Flat slab doors with full-length recessed finger-pull channels in matte black, tall pantry tower with column oven, thin quartz countertop, full-height porcelain slab backsplash, flush hood.",
      "Linear layout along one wall with a tall appliance column and a peninsula with bar seating. Flat slab doors, slim black bar pulls, quartz countertop, large-format tile backsplash, under-cabinet LED.",
      "U-shaped kitchen open to a dining area. Flat slab doors, concealed handles, quartz countertop with a waterfall end on the island, one glass-front upper cabinet section.",
    ],
    minimalista: [
      "Handleless push-open doors with Gola profile, floating upper cabinets, seamless integrated appliances, one continuous slab countertop, no visible hardware.",
      "Single-wall kitchen hidden behind full-height flat doors, appliances concealed, thin monolithic island with a seamless sink.",
      "Galley kitchen, ultra-thin countertop, backsplash in the same material as the countertop, one open shelf only, no clutter.",
    ],
    contemporaneo: [
      "Mixed-material composition: upper cabinets flat, lower cabinets with vertical grooved fronts, porcelain countertop, island with a wood-look waterfall end, black bar pulls, pendant lights.",
      "Kitchen with open shelving section next to a tall pantry, flat fronts, stone-look porcelain countertop and backsplash, integrated LED in the shelves.",
      "Peninsula kitchen with fluted island front, framed shaker-flat doors, thin black hardware, large pendant above the peninsula.",
    ],
    industrial: [
      "Raw steel open shelving, flat doors with black powder-coated frames, concrete-look countertop, microcement backsplash, black matte pipe pulls, Edison pendants.",
      "Loft kitchen with exposed brick wall, steel-framed glass upper doors, thick butcher-block island top, matte black faucet.",
      "Island kitchen with a metal pot rail, riveted-look steel hardware, dark stone countertop, subway tile backsplash.",
    ],
    clasico: [
      "Shaker doors with recessed center panel, crown molding on the upper cabinets, farmhouse apron sink, marble-look countertop, antique brass cup pulls and knobs.",
      "Raised-panel doors with decorative corbels, cabinet-style range hood with molding, granite countertop, glass-front display cabinets, pendant lanterns.",
      "Furniture-style island with turned legs, beaded-panel doors, tile backsplash with a decorative inset behind the cooktop, polished brass hardware.",
    ],
    rustico: [
      "Shaker doors with visible wood character, exposed ceiling beams, farmhouse sink, stone countertop, terracotta tile backsplash, hand-forged iron pulls.",
      "Open timber shelving, plank-style doors, thick wood island top, wrought iron pendants, stone arch behind the cooktop.",
      "Cabin-style kitchen with beadboard-style fronts, butcher-block countertop, enamel farmhouse sink, black iron latches.",
    ],
    nordico: [
      "Flat doors with slim brushed-nickel pulls, white subway tile backsplash, light birch accents, light stone countertop, bright airy feeling.",
      "Open shelves in light wood next to closed cabinets, ceramic dishes and plants on display, round pendant lights.",
      "Bench seating nook next to a simple island, rounded corners on the doors, soft matte textures, pale wood floor.",
    ],
    lujo: [
      "Book-matched marble slab backsplash and island waterfall, integrated brass hardware, hidden appliances, dramatic pendant chandelier.",
      "Glass and brass display cabinets, fluted island with stone top, built-in coffee station, gold-trimmed hood.",
      "Symmetrical kitchen with a monumental stone-clad hood, double island, bar seating, ambient cove lighting.",
    ],
  },
  closet: {
    moderno: [
      "U-shaped walk-in with flat drawer fronts, central island with a glass top, LED strips under every shelf.",
      "Wall-to-wall built-in wardrobe with flat sliding doors in slim aluminium frames and one full-length mirror panel.",
      "Reach-in wardrobe with hinged flat doors and recessed pulls, interior with double hanging, drawers and an accessory tray.",
    ],
    minimalista: [
      "Full-width sliding doors with no visible hardware, interior in a single tone, push-latch drawers.",
      "Open minimal wardrobe with a single hanging rail and floating shelves, no doors, plenty of empty space.",
      "Wardrobe with push-open flat doors, a floating bench and hidden LED line.",
    ],
    contemporaneo: [
      "Mix of opaque and frosted glass doors, internal warm LED, combination of open and closed sections.",
      "Vertical grooved door fronts on the left and flat doors on the right, integrated vanity table with mirror.",
      "Walk-in with an open shoe wall, glass-front accessories cabinet and a central ottoman.",
    ],
    industrial: [
      "Open system with black steel frame uprights, exposed hanging rails, raw wood shelves, Edison bulbs.",
      "Wardrobe with steel-framed glass doors in black and wood shelving inside.",
      "Walk-in with pipe rails, leather straps as pulls, brick wall side.",
    ],
    clasico: [
      "Raised-panel doors with crown molding, brass cup pulls, interior with cedar-lined drawers.",
      "Built-in wardrobe flanking a window seat, paneled doors, glass-front accessory cabinet.",
      "Walk-in with beaded fronts, pull-out valet rod, a chandelier and an ottoman.",
    ],
    rustico: [
      "Barn-style sliding doors on a black steel track, natural wood interior shelves.",
      "Open wood wardrobe with wooden pegs, woven baskets and a bench.",
      "Plank-style doors with iron hardware, rope handles, wooden hanging rails.",
    ],
    nordico: [
      "Sliding doors in a light tone, interior in pale birch, simple chrome rails, wicker baskets.",
      "Open wardrobe with a light wood frame, hanging rail, baskets and a small bench.",
      "Wardrobe with flat doors and slim round pulls, soft lighting, plants on top.",
    ],
    lujo: [
      "Boutique-style walk-in with glass-fronted doors in thin brass frames, illuminated shelving for bags and shoes, velvet-lined drawers, central marble island.",
      "Full-height mirror doors, gold-trim lighting channel, jewelry drawer with glass top.",
      "Hotel-suite dressing room with a vanity table, backlit mirror, chandelier, curated displays.",
    ],
  },
  puerta: {
    moderno: [
      "Full-height flush door with a recessed handle channel and a hidden frame, monolithic look.",
      "Door with one narrow vertical groove line and an architectural lever handle in matte black.",
      "Door with a narrow vertical glass slit and slim black frame, long vertical pull.",
    ],
    minimalista: [
      "Flush pivot door that disappears into the wall, no visible frame, push-open.",
      "Flat door with a shadow-gap frame and a handle-less latch.",
      "Floor-to-ceiling flat door aligned with the wall, only a recessed finger pull.",
    ],
    contemporaneo: [
      "Door with horizontal groove lines in a regular rhythm and an architectural lever handle.",
      "Door with a fluted vertical surface and a long vertical bar pull.",
      "Door with a geometric two-material inlay (wood and metal line).",
    ],
    industrial: [
      "Steel-framed door with ribbed glass, black powder-coated frame and hardware.",
      "Solid door with black strap hinges and a barn-style sliding track.",
      "Door with a black grid of metal bars and clear glass.",
    ],
    clasico: [
      "Six-panel raised door with traditional casing and a crown pediment, antique brass knob.",
      "Double door with raised panels and a transom window above.",
      "Door with an arched top, raised moldings and an ornate escutcheon.",
    ],
    rustico: [
      "Solid plank door with visible grain and knots, hand-forged iron straps and a ring pull.",
      "Door with a Z-brace plank design and a wrought-iron latch.",
      "Arched entrance door with iron studs and a small grilled window.",
    ],
    nordico: [
      "Simple flat door with a thin frame and a brushed nickel handle.",
      "Door with a vertical groove, clean frame, minimal round handle.",
      "Door with a small glass panel at the top and slim hardware.",
    ],
    lujo: [
      "Oversized pivot entrance door, 2.40 m tall, with a book-matched grain pattern and a long brass pull.",
      "Double entrance door with vertical brass inlays and sidelights.",
      "Door with large fluted panels and an integrated brass handle bar.",
    ],
  },
  mueble: {
    moderno: [
      "Floating TV wall: flat closed cabinets and open niches above a thin floating console, LED halo behind the TV, matte black handles.",
      "Full-height TV wall with tall flanking towers (closed below, open niches above) and the TV on a recessed center panel with LED edges.",
      "Low long console with push-open doors under the TV, a slim shelf above it on each side and a wall panel behind the TV.",
    ],
    minimalista: [
      "Seamless floating wall unit with the TV flush to the wall and all storage behind handle-less doors.",
      "Thin floating shelf and a long handle-less console under the TV, hidden light line, almost no objects.",
      "Monolithic wall panel with the TV integrated and a push-open door hiding the media equipment.",
    ],
    contemporaneo: [
      "TV wall with a fluted accent panel behind the TV, flanking open shelves and a floating console.",
      "Asymmetrical composition: closed cabinets on the left, open display shelves on the right, TV centered on a textured panel, linear LED.",
      "Console with grooved fronts, a wall panel in a second material behind the TV, a slim linear fireplace beside it.",
    ],
    industrial: [
      "Black steel frame with wooden shelves around a centered TV, Edison strip lights.",
      "Raw concrete-look wall panel behind the TV, a heavy wood console on black steel legs, open metal shelving on the side.",
      "Wall-wide steel and wood unit with sliding barn-style cabinet doors and exposed pipe details.",
    ],
    clasico: [
      "Symmetrical entertainment unit with a cornice and raised-panel cabinets below, the TV set between glass-front display cabinets.",
      "Wall paneled with boiserie frames, the TV framed by a molded surround, a console with brass knobs under it.",
      "Built-in unit with arched niches on both sides, raised panel doors, brass hardware and picture lights.",
    ],
    rustico: [
      "Built-in entertainment center with plank doors, a stone fireplace beside the TV, wrought iron hardware.",
      "Thick wood mantel shelf and open timber shelving around the TV, woven baskets.",
      "Low wood console with iron handles, reclaimed plank wall behind the TV, warm Edison lights.",
    ],
    nordico: [
      "Light floating shelves around a small TV, simple storage cabinets, plants and baskets.",
      "Low console on slim legs with sliding doors, a white wall behind the TV, wood shelves on the side.",
      "Wall unit with rounded corners, a mix of open and closed modules, soft textiles and plants.",
    ],
    lujo: [
      "Full-wall millwork with the TV recessed into a book-matched panel, flanking display niches with spotlights, floating marble-look console.",
      "Floor-to-ceiling stone-look wall with the TV, a linear fireplace below and a brass-trimmed console.",
      "Fluted panel wall with backlit niches, hidden LED cove, a floating console with a stone top and brass inserts.",
    ],
  },
  panel: {
    moderno: [
      "Full-height vertical fluted slats, 4 cm wide with 1.5 cm deep shadow grooves, LED strip at the top.",
      "Half-height flat picture-frame lambrin at 100 cm with a slim black cap line, upper wall painted plain.",
      "Wide vertical V-groove boards from floor to ceiling, thin black reveal at the base.",
    ],
    minimalista: [
      "Seamless flat panel with thin shadow-gap reveals in a simple grid, grazing LED.",
      "Narrow horizontal V-groove boards, full height, very subtle relief.",
      "Low flat lambrin 100 cm high with a slim aluminium cap, plain wall above.",
    ],
    contemporaneo: [
      "Fluted section on one half and flat panel on the other, a thin LED line at the junction.",
      "Herringbone wood-pattern headboard panel with a slim backlit frame.",
      "Vertical slats with a dark acoustic felt backing visible between them.",
    ],
    industrial: [
      "Corrugated metal panels alternating with raw wood planks.",
      "Board-formed concrete-look panels with a black steel trim.",
      "Black steel grid frame with wood infill panels.",
    ],
    clasico: [
      "Raised-panel wainscoting at 105 cm with a chair rail and cap molding, upper wall plain.",
      "Full-height boiserie frames made of applied moldings in rectangles, ceiling cornice.",
      "Board-and-batten lambrin at 120 cm with a shelf-style cap and decorative brackets.",
    ],
    rustico: [
      "Rough-sawn vertical planks with natural gaps and visible knots.",
      "Reclaimed horizontal shiplap boards with aged character.",
      "Board-and-batten with exposed beams at the ceiling.",
    ],
    nordico: [
      "Horizontal shiplap boards, full height, clean joints.",
      "Narrow tongue-and-groove lambrin at 100 cm with a peg rail and hooks.",
      "Slim light-wood fluted slats floor to ceiling.",
    ],
    lujo: [
      "Book-matched veneer panel with thin brass inlay lines and hidden LED cove top and bottom.",
      "Boiserie with fluted channels and brass inserts, mirrored accents.",
      "Marble-look slab wall with LED backlighting and a floating console.",
    ],
  },
  bano: {
    moderno: [
      "Floating vanity with flat drawer fronts, rectangular undermount sink, quartz top, full-width mirror with LED, matte black faucet.",
      "Double vanity with two sinks, two round backlit mirrors, wall-mounted faucets.",
      "Vanity with an open shelf below, vessel sink, tall narrow side tower.",
    ],
    minimalista: [
      "Ultra-minimal floating vanity with an integrated sink, no handles, mirror flush with the wall.",
      "Slab countertop extended as a shelf, wall-mounted tap, seamless tiles.",
      "Single drawer vanity with a frameless mirror and hidden light.",
    ],
    contemporaneo: [
      "Vanity with grooved drawer fronts, white ceramic vessel sink, framed LED mirror, black faucet.",
      "Floating vanity with open niche and a tall mirror cabinet.",
      "Double vanity with a central tower and two oval mirrors.",
    ],
    industrial: [
      "Vanity with a black steel frame, concrete top, subway tile wall, black round mirror.",
      "Open-pipe vanity with a wood shelf, vessel sink, Edison wall lights.",
      "Steel and wood vanity with a metal-framed mirror and matte black tap.",
    ],
    clasico: [
      "Furniture-style vanity with raised-panel doors, marble top, oval undermount sink, brass faucet, beveled mirror.",
      "Double vanity with turned legs, arched mirrors and wall sconces.",
      "Pedestal-style vanity with marble top, crown molding and a framed mirror.",
    ],
    rustico: [
      "Wood vanity with a live-edge countertop, stone vessel sink, bronze faucet, round wood-framed mirror.",
      "Trough sink vanity with plank doors and iron hardware.",
      "Vanity with a rough stone countertop and woven baskets below.",
    ],
    nordico: [
      "Floating vanity with a round mirror in a simple wood frame, chrome fixtures, plants.",
      "Vanity with open shelf, white sink, hooks for towels.",
      "Double drawer vanity with rounded corners, matte fixtures.",
    ],
    lujo: [
      "Marble slab wall and countertop, floating vanity, full-wall backlit mirror, brass fixtures.",
      "Double vanity with a central makeup table, crystal sconces and a freestanding bath behind.",
      "Fluted-front vanity with a stone vessel sink, gold faucet and a backlit niche.",
    ],
  },
};

// Nivel de gama que eligió el cliente (económico / medio / alta gama).
// Manda sobre el estilo: un estilo "Lujo" en gama económica sale sencillo.
const GAMA = {
  eco: {
    casa: "an ordinary middle-class Mexican home in Monterrey (typical Infonavit-type house or apartment), modest size, simple finishes, not a showroom",
    regla: "BUDGET LEVEL: ECONOMY (económico). This MUST look like an affordable, well-made custom piece that a typical Monterrey family buys: flat doors, simple standard handles (plain bar or edge pulls), standard hinges and drawer slides, plain white or light interior, laminate (formica) countertop for kitchens, standard sink and faucet. NO LED strips, NO glass doors, NO marble or stone slabs, NO brass or gold, NO decorative moldings, NO chandeliers, NO island and NO walk-in unless the client explicitly asked for it. Keep the piece compact and practical. This budget level overrides any premium detail mentioned in the design direction or style; only an explicit client request can add something.",
    luz: "Bright, even natural daylight and an ordinary ceiling light. No LED strips.",
  },
  medio: {
    casa: "a comfortable middle-class Mexican home in Monterrey, realistic size, tidy and well kept",
    regla: "BUDGET LEVEL: MID-RANGE (medio). A good-quality custom piece with a few nice details: good standard hardware, at most one simple LED strip or one open shelf section, quartz-look or laminate countertop for kitchens. NO marble slabs, NO brass or gold trims, NO chandeliers, NO glass display cabinets. Nice but not luxurious. This budget level overrides any luxury detail in the design direction or style unless the client explicitly asked for it.",
    luz: null,
  },
  premium: {
    casa: "a realistic upscale Mexican home in Monterrey",
    regla: "BUDGET LEVEL: HIGH-END (alta gama). Premium materials and details are welcome: stone countertops, integrated LED lighting, designer hardware, glass fronts where they fit the style.",
    luz: null,
  },
};

// Diseño base sencillo para gama económica (el estilo solo cambia colores y jaladeras).
const DISENO_ECO = {
  cocina: "Linear or L-shaped kitchen along the walls, no island. Flat doors with simple bar pulls, laminate (formica) countertop, standard ceramic tile backsplash, standard stainless sink, freestanding stove and fridge.",
  closet: "Built-in reach-in wardrobe on one wall (not a walk-in), with flat sliding or hinged doors. Simple interior: one or two hanging rails, plain shelves and a small bank of 2-3 drawers.",
  puerta: "Simple flat or lightly grooved interior door with a standard lever handle and a plain frame.",
  mueble: "Low TV console with closed doors and one or two open shelves, plus a simple floating shelf on one side. Compact and practical.",
  panel: "Simple vertical slat panel or a half-height flat lambrin on one wall, clean and modest.",
  bano: "Simple vanity with one sink, two doors or drawers, laminate or simple ceramic top, plain mirror above.",
};

const sinLed = (t) => t
  .replace(/,?\s*(?:a subtle )?(?:internal |integrated )?LED lighting(?: detail)?/gi, "")
  .replace(/,\s*,/g, ",");

// Memoria de variante: misma combinación -> mismo diseño (para que "ajustar" no cambie la base).
const variantMemo = new Map();

function elegirVariante(tipo, estilo, firma, forzada) {
  const lista = VARIANTES[tipo]?.[estilo] || [];
  if (!lista.length) return "";
  if (Number.isInteger(forzada)) return lista[Math.abs(forzada) % lista.length];
  if (!variantMemo.has(firma)) variantMemo.set(firma, Math.floor(Math.random() * lista.length));
  return lista[variantMemo.get(firma)];
}

export function buildRenderPrompt(o) {
  const {
    tipo, estilo, color, acabadoData, material, vidaHints, descripcion,
    promptAdicional, foto, variante, gama,
  } = o;
  const G = GAMA[gama] || GAMA.medio;
  const esEco = (gama || "medio") === "eco";
  // Estilo "Lujo" con gama económica o media: se usa el diseño moderno (elegante pero sin mármol ni latón).
  const estiloBase = estilo === "lujo" && gama && gama !== "premium" ? "moderno" : estilo;
  const T = TIPOS[tipo] || TIPOS.cocina;
  const tipoKey = TIPOS[tipo] ? tipo : "cocina";
  const estiloTxt = estiloBase !== estilo ? "Elegant modern" : (ESTILO_EN[estilo] || "Modern");
  const colorTxt = color ? COLOR_EN[color] : "";
  const esMadera = COLORES_MADERA.includes(color);
  const firma = [tipoKey, estilo, color, material, acabadoData?.key, descripcion, gama].join("|");
  const diseno = esEco && gama ? DISENO_ECO[tipoKey] : elegirVariante(tipoKey, estiloBase, firma, variante);

  const materialTxt = {
    melamina: `The ${T.target} are melamine boards: flat panel construction with thin ABS edge banding. Solid colors are uniform; wood tones are printed wood grain.`,
    mdf: `The ${T.target} are painted MDF (MDF lacado). Perfectly smooth painted surface, zero wood grain, zero texture, uniform color.`,
    enchapado: `The ${T.target} are real wood veneer on MDF. Clear natural grain flowing in one consistent direction, perfectly flat.`,
    madera_solida: `The ${T.target} are solid hardwood. Visibly thick, deep rich grain with natural variation, end grain visible at the edges.`,
  }[material] || "";

  const colorReglaBase = colorTxt
    ? `Color: apply ${colorTxt} ONLY to the ${T.target}. Walls, floor, ceiling, countertops, tiles and appliances keep their own natural colors.`
    : `Palette: ${ESTILO_PALETA[estiloBase] || ESTILO_PALETA.moderno}.`;

  let colorNota = "";
  if (colorTxt && material === "mdf" && esMadera) {
    colorNota = `The ${colorTxt} here is a painted color on smooth MDF. Do NOT draw wood grain.`;
  } else if (colorTxt && material === "enchapado" && !esMadera) {
    colorNota = `The veneer is stained in ${colorTxt}, with wood grain still visible under the tint. Not solid paint.`;
  } else if (colorTxt && material === "madera_solida" && !esMadera) {
    colorNota = `The solid wood is painted ${colorTxt}, edges may show wood character.`;
  } else if (colorTxt && material === "melamina" && esMadera) {
    colorNota = `Wood-grain melamine in a ${colorTxt}.`;
  }

  const modo = foto
    ? `Edit the attached photo of the real room. Keep the room exactly as it is: same walls, floor, ceiling, windows, doors, perspective angle and light direction. Only install the new ${T.subject} where it belongs in this room, scaled to the real proportions. Do not invent extra rooms or add furniture that was not requested.`
    : `The attached image is only a loose reference for the type of space and the camera angle. Design a brand-new ${T.subject} in ${G.casa}, you may change anything in the reference to match the specification below.`;

  const reglaMueble = tipoKey === "mueble"
    ? "The default piece is a TV entertainment center. Only if the client request or household requirements clearly name a different piece (bookshelf, bar, dining sideboard, desk), build that piece instead and use the style only as design language."
    : "";

  return [
    modo,
    `Subject: ${T.subject}. Design direction: ${diseno}`,
    `Elements: ${esEco ? sinLed(T.elements) : T.elements}.`,
    G.regla,
    `Dimensions: ${T.dims}`,
    `Style: ${estiloTxt}.`,
    materialTxt,
    colorReglaBase,
    colorNota,
    acabadoData && `Finish of the ${T.target}: ${acabadoData.prompt}. Applies only to those surfaces.`,
    `Apply the ${estiloTxt} style to proportions, hardware, door or panel profile and layout. It must not override the material or color above.`,
    vidaHints && `Household requirements: ${vidaHints}.`,
    reglaMueble,
    descripcion && `Client request: ${descripcion}.`,
    promptAdicional && `Client adjustment, apply exactly and keep everything else the same: "${promptAdicional}".`,
    `Camera: ${T.camera} Sharp focus throughout.`,
    `Lighting: ${G.luz || T.lighting}`,
    `Quality: photorealistic architectural interior photography, real materials, believable reflections and shadows, straight vertical and horizontal lines, correct perspective.`,
    `Avoid: ${T.avoid} Consistent finish across all matching doors and drawers. No text, letters, logos, watermarks or people. No warped, melted or duplicated parts.`,
  ].filter(Boolean).join(" ");
}
