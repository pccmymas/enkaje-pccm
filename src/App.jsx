import { useState, useEffect } from "react";

const SUPABASE_URL = "https://iucoggyualkyojmmgael.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml1Y29nZ3l1YWxreW9qbW1nYWVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAwMTMxOTMsImV4cCI6MjA5NTU4OTE5M30.QNU604KcLaSxXxoZaxmVbt-sf-aFDTjrVoTR4K-wy5c";

const sb = async (path, opts = {}) => {
  const sep = path.includes("?") ? "&" : "?";
  const url = `${SUPABASE_URL}/rest/v1/${path}${sep}apikey=${SUPABASE_KEY}`;
  const fetchOpts = {
    method: opts.method || "GET",
    headers: {
      "Authorization": `Bearer ${SUPABASE_KEY}`,
      "Content-Type": "application/json",
      "Prefer": "return=representation"
    }
  };
  if (opts.body) fetchOpts.body = opts.body;
  const r = await fetch(url, fetchOpts);
  const text = await r.text();
  try { return JSON.parse(text); } catch { return text; }
};

const authFetch = async (path, body) => {
  const r = await fetch(`${SUPABASE_URL}/auth/v1/${path}`, {
    method: "POST",
    headers: { "apikey": SUPABASE_KEY, "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  return r.json();
};

const ESTILOS = [
  { key: "moderno", label: "Moderno", img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80&fit=crop", desc: "Lineas limpias, colores neutros" },
  { key: "minimalista", label: "Minimalista", img: "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=600&q=80&fit=crop", desc: "Lo esencial, espacios abiertos" },
  { key: "contemporaneo", label: "Contemporaneo", img: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&q=80&fit=crop", desc: "Mezcla de estilos actuales" },
  { key: "industrial", label: "Industrial", img: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=600&q=80&fit=crop", desc: "Metal, madera cruda, urbano" },
  { key: "clasico", label: "Clasico", img: "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=600&q=80&fit=crop", desc: "Molduras, detalles ornamentales" },
  { key: "rustico", label: "Rustico", img: "https://images.unsplash.com/photo-1588854337236-6a0e4de27897?w=600&q=80&fit=crop", desc: "Madera natural, texturas organicas" },
  { key: "nordico", label: "Nordico", img: "https://images.unsplash.com/photo-1565538810643-b5bdb974b832?w=600&q=80&fit=crop", desc: "Blanco, madera clara, acogedor" },
  { key: "lujo", label: "Lujo / Premium", img: "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?w=600&q=80&fit=crop", desc: "Materiales nobles, exclusividad" },
];

const FORM_INIT = {
  tipo_proyecto: "cocina",
  nombre: "", telefono: "", direccion: "", correo: "", fecha: new Date().toISOString().split("T")[0], atencion_por: "Felipe Santiago",
  tipo_cocina: [], tipo_cocina_otro: "",
  largo: "", altura: "", profundidad: "", medidas_isla: "", medidas_alacena: "", altura_superiores: "", area: "",
  estilo: [], estilo_otro: "",
  material: [], material_otro: "", grosor: [],
  color_principal: "", color_secundario: "", tipo_acabado: [], acabado_otro: "", textura: "",
  tipo_puertas: [], puertas_otro: "", jaladeras: [], jaladeras_otro: "",
  bisagras: [], correderas: [], accesorios: [], accesorios_otro: "",
  material_cubierta: [], cubierta_otro: "", color_cubierta: "",
  tarja: [], griferia: [],
  electrodomesticos: [], medidas_electro: "",
  iluminacion: [],
  observaciones: "",
  materiales_solicitados: "", herrajes_solicitados: "", nivel_calidad: "", comentarios_tecnicos: "",
  precio_fabricacion: "", precio_instalacion: "", precio_cubierta: "", precio_herrajes: "", precio_otros: "",
  incluye: "", no_incluye: "",
  tiempo_entrega: "20 a 30 dias habiles", anticipo: "60", pago_entrega: "30", pago_final: "10",
  garantia: "6 meses en instalacion y herrajes",
};

const FORM_CLOSET_INIT = {
  tipo_proyecto: "closet",
  nombre: "", telefono: "", direccion: "", correo: "", fecha: new Date().toISOString().split("T")[0], atencion_por: "Felipe Santiago",
  tipo_closet: [], tipo_closet_otro: "",
  largo: "", altura: "", profundidad: "", area: "",
  estilo: [],
  material: [], grosor: [],
  color_principal: "", color_secundario: "", tipo_acabado: [],
  tipo_puertas: [], jaladeras: [],
  bisagras: [], correderas: [], accesorios_closet: [],
  iluminacion: [],
  observaciones: "",
  materiales_solicitados: "", nivel_calidad: "", comentarios_tecnicos: "",
  precio_fabricacion: "", precio_instalacion: "", precio_herrajes: "", precio_otros: "",
  incluye: "", no_incluye: "",
  tiempo_entrega: "15 a 20 dias habiles", anticipo: "60", pago_entrega: "30", pago_final: "10",
  garantia: "6 meses en instalacion y herrajes",
};

const FORM_PUERTA_INIT = {
  tipo_proyecto: "puerta",
  nombre: "", telefono: "", direccion: "", correo: "", fecha: new Date().toISOString().split("T")[0], atencion_por: "Felipe Santiago",
  tipo_puerta: [], tipo_puerta_otro: "",
  ancho: "", alto: "", grosor_puerta: "",
  cantidad: "",
  estilo: [],
  material: [],
  color_principal: "", color_secundario: "", tipo_acabado: [],
  tipo_marco: [], herrajes_puerta: [],
  observaciones: "",
  materiales_solicitados: "", nivel_calidad: "", comentarios_tecnicos: "",
  precio_fabricacion: "", precio_instalacion: "", precio_herrajes: "", precio_otros: "",
  incluye: "", no_incluye: "",
  tiempo_entrega: "10 a 15 dias habiles", anticipo: "60", pago_entrega: "30", pago_final: "10",
  garantia: "6 meses en instalacion",
};

const FORM_MUEBLE_INIT = {
  tipo_proyecto: "mueble",
  nombre: "", telefono: "", direccion: "", correo: "", fecha: new Date().toISOString().split("T")[0], atencion_por: "Felipe Santiago",
  tipo_mueble: [], tipo_mueble_otro: "",
  largo: "", alto: "", profundidad: "",
  cantidad: "",
  estilo: [],
  material: [], grosor: [],
  color_principal: "", color_secundario: "", tipo_acabado: [],
  accesorios_mueble: [],
  observaciones: "",
  materiales_solicitados: "", nivel_calidad: "", comentarios_tecnicos: "",
  precio_fabricacion: "", precio_instalacion: "", precio_herrajes: "", precio_otros: "",
  incluye: "", no_incluye: "",
  tiempo_entrega: "15 a 20 dias habiles", anticipo: "60", pago_entrega: "30", pago_final: "10",
  garantia: "6 meses en instalacion",
};

const useIsMobile = () => {
  const [mobile, setMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const fn = () => setMobile(window.innerWidth < 768);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return mobile;
};

// Pill button - main interactive element
const PILL = ({ label, checked, onChange, color = "#d4af37" }) => (
  <button onClick={onChange} style={{
    padding: "8px 14px", borderRadius: 50, border: `1.5px solid ${checked ? color : "#2a2a20"}`,
    background: checked ? `${color}20` : "#0d0d0a", color: checked ? color : "#666",
    fontSize: 13, cursor: "pointer", fontWeight: checked ? 700 : 400,
    transition: "all .15s ease", display: "flex", alignItems: "center", gap: 6,
    boxShadow: checked ? `0 0 12px ${color}30` : "none",
    transform: checked ? "scale(1.03)" : "scale(1)",
    whiteSpace: "nowrap"
  }}>
    {checked && <span style={{ fontSize: 11, fontWeight: 900 }}>✓</span>}
    {label}
  </button>
);

// Single select pill (radio style)
const PILL_SINGLE = ({ label, checked, onChange, color = "#d4af37" }) => (
  <button onClick={onChange} style={{
    padding: "8px 14px", borderRadius: 50, border: `1.5px solid ${checked ? color : "#2a2a20"}`,
    background: checked ? color : "#0d0d0a", color: checked ? "#000" : "#666",
    fontSize: 13, cursor: "pointer", fontWeight: checked ? 700 : 400,
    transition: "all .15s ease", whiteSpace: "nowrap",
    boxShadow: checked ? `0 0 12px ${color}40` : "none",
    transform: checked ? "scale(1.03)" : "scale(1)",
  }}>
    {label}
  </button>
);

const PILLS_GROUP = ({ options, value, onChange, multi = true, color = "#d4af37" }) => (
  <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 4 }}>
    {options.map(op => multi ? (
      <PILL key={op} label={op} color={color}
        checked={Array.isArray(value) && value.includes(op)}
        onChange={() => onChange(Array.isArray(value) ? (value.includes(op) ? value.filter(x => x !== op) : [...value, op]) : [op])} />
    ) : (
      <PILL_SINGLE key={op} label={op} color={color}
        checked={value === op}
        onChange={() => onChange(value === op ? "" : op)} />
    ))}
  </div>
);

const INPUT = ({ label, value, onChange, placeholder, type = "text", style = {} }) => (
  <div style={{ marginBottom: 14, ...style }}>
    {label && <label style={{ fontSize: 11, color: "#555", display: "block", marginBottom: 5, textTransform: "uppercase", letterSpacing: 1 }}>{label}</label>}
    <input value={value} onChange={onChange} placeholder={placeholder} type={type}
      style={{ width: "100%", background: "#0d0d0a", border: "1px solid #2a2a20", borderRadius: 10, padding: "12px 14px", color: "#e8e0d0", fontSize: 15, boxSizing: "border-box", outline: "none" }} />
  </div>
);

const TEXTAREA = ({ label, value, onChange, placeholder, rows = 3 }) => (
  <div style={{ marginBottom: 14 }}>
    {label && <label style={{ fontSize: 11, color: "#555", display: "block", marginBottom: 5, textTransform: "uppercase", letterSpacing: 1 }}>{label}</label>}
    <textarea value={value} onChange={onChange} placeholder={placeholder} rows={rows}
      style={{ width: "100%", background: "#0d0d0a", border: "1px solid #2a2a20", borderRadius: 10, padding: "12px 14px", color: "#e8e0d0", fontSize: 14, boxSizing: "border-box", resize: "vertical" }} />
  </div>
);

const SECTION = ({ title, icon, children, subtitle }) => (
  <div style={{ marginBottom: 28, background: "#0f0f0a", border: "1px solid #1a1a12", borderRadius: 16, padding: "20px" }}>
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: subtitle ? 4 : 16 }}>
      {icon && <span style={{ fontSize: 18 }}>{icon}</span>}
      <h3 style={{ margin: 0, fontSize: 14, color: "#d4af37", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" }}>{title}</h3>
    </div>
    {subtitle && <p style={{ fontSize: 12, color: "#555", margin: "0 0 14px" }}>{subtitle}</p>}
    {children}
  </div>
);

const BTN = ({ onClick, children, color = "#d4af37", textColor = "#000", outline = false, style = {}, disabled = false }) => (
  <button onClick={onClick} disabled={disabled} style={{
    background: outline ? "transparent" : disabled ? "#333" : color,
    color: outline ? color : disabled ? "#666" : textColor,
    border: `1.5px solid ${disabled ? "#333" : color}`, borderRadius: 10,
    padding: "12px 20px", fontWeight: 700, fontSize: 13, cursor: disabled ? "not-allowed" : "pointer",
    transition: "all .2s", ...style
  }}>{children}</button>
);

function compartir(tipo, texto, titulo) {
  const msg = encodeURIComponent(`${titulo}\n\n${texto}`);
  if (tipo === "whatsapp") window.open(`https://wa.me/?text=${msg}`, "_blank");
  if (tipo === "email") window.open(`mailto:?subject=${encodeURIComponent(titulo)}&body=${msg}`, "_blank");
  if (tipo === "copiar") { navigator.clipboard.writeText(`${titulo}\n\n${texto}`); alert("Copiado"); }
}

const GLOBAL_CSS = `
  * { box-sizing: border-box; }
  body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
  input, select, textarea, button { font-family: inherit; }
  ::-webkit-scrollbar { width: 5px; height: 5px; }
  ::-webkit-scrollbar-track { background: #0a0a0a; }
  ::-webkit-scrollbar-thumb { background: #d4af3740; border-radius: 3px; }
  @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
  .fade-up { animation: fadeUp 0.5s ease forwards; }
  @keyframes pulse { 0%,100% { opacity:1 } 50% { opacity:.5 } }
`;

// ============ FORMULARIO COCINA ============
function FormularioCocina({ form, setF, role, isMobile }) {
  return (
    <div>
      <SECTION title="Datos del Cliente" icon="👤">
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 12 }}>
          <INPUT label="Nombre completo" value={form.nombre} onChange={e=>setF("nombre",e.target.value)} placeholder="Maria Gonzalez" />
          <INPUT label="Telefono" value={form.telefono} onChange={e=>setF("telefono",e.target.value)} placeholder="81-1234-5678" />
          <INPUT label="Correo electronico" value={form.correo} onChange={e=>setF("correo",e.target.value)} placeholder="correo@ejemplo.com" />
          <INPUT label="Direccion" value={form.direccion} onChange={e=>setF("direccion",e.target.value)} placeholder="Calle, Colonia, Ciudad" />
          <INPUT label="Fecha" value={form.fecha} onChange={e=>setF("fecha",e.target.value)} type="date" />
          <INPUT label="Atencion por" value={form.atencion_por} onChange={e=>setF("atencion_por",e.target.value)} placeholder="Felipe Santiago" />
        </div>
      </SECTION>

      <SECTION title="Tipo de Cocina" icon="🏠" subtitle="Selecciona uno o varios tipos">
        <PILLS_GROUP options={["Lineal","En L","En U","Con isla","Con peninsula","Departamento","Residencial premium"]} value={form.tipo_cocina} onChange={v=>setF("tipo_cocina",v)} />
        <INPUT label="Otro tipo" value={form.tipo_cocina_otro} onChange={e=>setF("tipo_cocina_otro",e.target.value)} placeholder="Especifica..." style={{marginTop:10}} />
      </SECTION>

      <SECTION title="Medidas" icon="📐">
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(3,1fr)", gap: 12 }}>
          <INPUT label="Largo total" value={form.largo} onChange={e=>setF("largo",e.target.value)} placeholder="3.20 m" />
          <INPUT label="Altura" value={form.altura} onChange={e=>setF("altura",e.target.value)} placeholder="2.40 m" />
          <INPUT label="Profundidad" value={form.profundidad} onChange={e=>setF("profundidad",e.target.value)} placeholder="0.60 m" />
          <INPUT label="Area aproximada" value={form.area} onChange={e=>setF("area",e.target.value)} placeholder="8 m2" />
          <INPUT label="Medidas isla" value={form.medidas_isla} onChange={e=>setF("medidas_isla",e.target.value)} placeholder="1.80 x 0.90 m" />
          <INPUT label="Altura muebles sup." value={form.altura_superiores} onChange={e=>setF("altura_superiores",e.target.value)} placeholder="70 cm" />
        </div>
      </SECTION>

      <SECTION title="Estilo de Diseno" icon="✨" subtitle="Puedes elegir varios estilos">
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4,1fr)", gap: 10 }}>
          {ESTILOS.map(e => {
            const sel = form.estilo.includes(e.label);
            return (
              <div key={e.key} onClick={() => setF("estilo", form.estilo.includes(e.label) ? form.estilo.filter(x=>x!==e.label) : [...form.estilo, e.label])}
                style={{ borderRadius: 12, overflow: "hidden", cursor: "pointer", border: `2px solid ${sel?"#d4af37":"transparent"}`, transition: "all .2s", boxShadow: sel?"0 0 16px #d4af3830":"none" }}>
                <div style={{ position: "relative", height: isMobile ? 90 : 110, background: "#1a1a10" }}>
                  <img src={e.img} alt={e.label} style={{ width: "100%", height: "100%", objectFit: "cover", filter: sel?"brightness(1)":"brightness(0.6)", transition: "all .3s" }} onError={ev=>ev.target.style.display="none"} />
                  {sel && <div style={{ position: "absolute", top: 6, right: 6, background: "#d4af37", color: "#000", borderRadius: "50%", width: 22, height: 22, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 12 }}>✓</div>}
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(transparent,rgba(0,0,0,0.85))", padding: "14px 8px 6px" }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: sel?"#d4af37":"#fff" }}>{e.label}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </SECTION>

      <SECTION title="Material Estructura" icon="🪵" subtitle="Selecciona el material principal">
        <PILLS_GROUP options={["MDF","MDF RH antihumedad","Melamina","Triplay","Madera solida","PVC"]} value={form.material} onChange={v=>setF("material",v)} />
        <div style={{ marginTop: 12 }}>
          <label style={{ fontSize: 11, color: "#555", display: "block", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>Grosor</label>
          <PILLS_GROUP options={["15 mm","18 mm","Otro"]} value={form.grosor} onChange={v=>setF("grosor",v)} />
        </div>
      </SECTION>

      <SECTION title="Acabado y Color" icon="🎨">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
          <INPUT label="Color principal" value={form.color_principal} onChange={e=>setF("color_principal",e.target.value)} placeholder="Blanco, Gris, Madera..." />
          <INPUT label="Color secundario" value={form.color_secundario} onChange={e=>setF("color_secundario",e.target.value)} placeholder="Negro, Dorado..." />
        </div>
        <label style={{ fontSize: 11, color: "#555", display: "block", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>Tipo de acabado</label>
        <PILLS_GROUP options={["Mate","Alto brillo","Satinado","Texturizado","Tipo madera","Liso"]} value={form.tipo_acabado} onChange={v=>setF("tipo_acabado",v)} />
        <INPUT label="Textura o diseno deseado" value={form.textura} onChange={e=>setF("textura",e.target.value)} placeholder="Describe la textura..." style={{marginTop:12}} />
      </SECTION>

      <SECTION title="Puertas" icon="🚪">
        <label style={{ fontSize: 11, color: "#555", display: "block", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>Tipo de puertas</label>
        <PILLS_GROUP options={["Lisas","Ranuradas","Con marco","Alto brillo","Tipo madera"]} value={form.tipo_puertas} onChange={v=>setF("tipo_puertas",v)} />
        <label style={{ fontSize: 11, color: "#555", display: "block", margin: "14px 0 8px", textTransform: "uppercase", letterSpacing: 1 }}>Jaladeras</label>
        <PILLS_GROUP options={["Ocultas","Perfil Gola","Metalicas","Negras","Doradas","Integradas","Push open"]} value={form.jaladeras} onChange={v=>setF("jaladeras",v)} />
      </SECTION>

      <SECTION title="Herrajes" icon="🔧">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 14 }}>
          <div>
            <label style={{ fontSize: 11, color: "#555", display: "block", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>Bisagras</label>
            <PILLS_GROUP options={["Normales","Cierre lento","Premium"]} value={form.bisagras} onChange={v=>setF("bisagras",v)} />
          </div>
          <div>
            <label style={{ fontSize: 11, color: "#555", display: "block", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>Correderas</label>
            <PILLS_GROUP options={["Normales","Telescopicas","Cierre lento"]} value={form.correderas} onChange={v=>setF("correderas",v)} />
          </div>
        </div>
        <label style={{ fontSize: 11, color: "#555", display: "block", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>Accesorios</label>
        <PILLS_GROUP options={["Especiero","Organizador cajones","Basurero oculto","Porta cubiertos","Esquinero magico","Canastillas","Despensero extraible","Pistones hidraulicos","Iluminacion LED"]} value={form.accesorios} onChange={v=>setF("accesorios",v)} />
      </SECTION>

      <SECTION title="Cubierta" icon="⬜">
        <PILLS_GROUP options={["Granito","Cuarzo","Marmol","Melamina","Acero inoxidable","Porcelanato"]} value={form.material_cubierta} onChange={v=>setF("material_cubierta",v)} />
        <INPUT label="Color de cubierta" value={form.color_cubierta} onChange={e=>setF("color_cubierta",e.target.value)} placeholder="Blanco Calacatta, Negro..." style={{marginTop:12}} />
      </SECTION>

      <SECTION title="Tarja y Griferia" icon="🚿">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div>
            <label style={{ fontSize: 11, color: "#555", display: "block", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>Tarja</label>
            <PILLS_GROUP options={["Sencilla","Doble","Submontada","Sobrepuesta"]} value={form.tarja} onChange={v=>setF("tarja",v)} />
          </div>
          <div>
            <label style={{ fontSize: 11, color: "#555", display: "block", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>Griferia</label>
            <PILLS_GROUP options={["Negra","Cromada","Dorada","Flexible","Premium"]} value={form.griferia} onChange={v=>setF("griferia",v)} />
          </div>
        </div>
      </SECTION>

      <SECTION title="Electrodomesticos" icon="⚡">
        <PILLS_GROUP options={["Parrilla","Campana","Horno","Microondas","Refrigerador panelable","Lavavajillas"]} value={form.electrodomesticos} onChange={v=>setF("electrodomesticos",v)} />
        <INPUT label="Medidas o modelos" value={form.medidas_electro} onChange={e=>setF("medidas_electro",e.target.value)} placeholder="Modelo o medidas de cada uno..." style={{marginTop:12}} />
      </SECTION>

      <SECTION title="Iluminacion" icon="💡">
        <PILLS_GROUP options={["LED inferior","LED interior","Luz calida","Luz fria","Sensores"]} value={form.iluminacion} onChange={v=>setF("iluminacion",v)} />
      </SECTION>

      <SECTION title="Observaciones" icon="📝">
        <TEXTAREA value={form.observaciones} onChange={e=>setF("observaciones",e.target.value)} placeholder="Notas adicionales, presupuesto aproximado, preferencias especiales..." rows={4} />
      </SECTION>

      {(role === "admin" || role === "taller") && (
        <SECTION title="Solo para Taller" icon="🏭">
          <TEXTAREA label="Materiales solicitados" value={form.materiales_solicitados} onChange={e=>setF("materiales_solicitados",e.target.value)} placeholder="Lista de materiales especificos..." />
          <label style={{ fontSize: 11, color: "#555", display: "block", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>Nivel de calidad</label>
          <PILLS_GROUP options={["Economico","Medio","Premium"]} value={form.nivel_calidad} onChange={v=>setF("nivel_calidad",v)} multi={false} color="#00bcd4" />
          <TEXTAREA label="Comentarios tecnicos" value={form.comentarios_tecnicos} onChange={e=>setF("comentarios_tecnicos",e.target.value)} placeholder="Notas tecnicas del taller..." style={{marginTop:12}} />
        </SECTION>
      )}
    </div>
  );
}

// ============ FORMULARIO CLOSET ============
function FormularioCloset({ form, setF, role, isMobile }) {
  return (
    <div>
      <SECTION title="Datos del Cliente" icon="👤">
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 12 }}>
          <INPUT label="Nombre completo" value={form.nombre} onChange={e=>setF("nombre",e.target.value)} placeholder="Maria Gonzalez" />
          <INPUT label="Telefono" value={form.telefono} onChange={e=>setF("telefono",e.target.value)} placeholder="81-1234-5678" />
          <INPUT label="Correo" value={form.correo} onChange={e=>setF("correo",e.target.value)} placeholder="correo@ejemplo.com" />
          <INPUT label="Direccion" value={form.direccion} onChange={e=>setF("direccion",e.target.value)} placeholder="Calle, Colonia, Ciudad" />
          <INPUT label="Fecha" value={form.fecha} onChange={e=>setF("fecha",e.target.value)} type="date" />
          <INPUT label="Atencion por" value={form.atencion_por} onChange={e=>setF("atencion_por",e.target.value)} placeholder="Felipe Santiago" />
        </div>
      </SECTION>

      <SECTION title="Tipo de Closet" icon="🚪" subtitle="Selecciona el tipo">
        <PILLS_GROUP options={["Closet empotrado","Closet walk-in","Closet con puertas corredizas","Closet con puertas abatibles","Closet abierto","Closet esquinero","Closet matrimonial","Vestidor completo"]} value={form.tipo_closet} onChange={v=>setF("tipo_closet",v)} />
        <INPUT label="Otro tipo" value={form.tipo_closet_otro} onChange={e=>setF("tipo_closet_otro",e.target.value)} placeholder="Especifica..." style={{marginTop:10}} />
      </SECTION>

      <SECTION title="Medidas" icon="📐">
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(3,1fr)", gap: 12 }}>
          <INPUT label="Largo / Ancho" value={form.largo} onChange={e=>setF("largo",e.target.value)} placeholder="2.40 m" />
          <INPUT label="Altura" value={form.altura} onChange={e=>setF("altura",e.target.value)} placeholder="2.40 m" />
          <INPUT label="Profundidad" value={form.profundidad} onChange={e=>setF("profundidad",e.target.value)} placeholder="0.60 m" />
          <INPUT label="Area aproximada" value={form.area} onChange={e=>setF("area",e.target.value)} placeholder="4 m2" />
        </div>
      </SECTION>

      <SECTION title="Estilo" icon="✨" subtitle="Elige el estilo visual">
        <PILLS_GROUP options={["Moderno","Minimalista","Contemporaneo","Clasico","Lujo / Premium","Industrial","Nordico"]} value={form.estilo} onChange={v=>setF("estilo",v)} />
      </SECTION>

      <SECTION title="Material" icon="🪵">
        <PILLS_GROUP options={["MDF","MDF RH antihumedad","Melamina","Triplay","Madera solida"]} value={form.material} onChange={v=>setF("material",v)} />
        <label style={{ fontSize: 11, color: "#555", display: "block", margin: "12px 0 8px", textTransform: "uppercase", letterSpacing: 1 }}>Grosor</label>
        <PILLS_GROUP options={["15 mm","18 mm","Otro"]} value={form.grosor} onChange={v=>setF("grosor",v)} />
      </SECTION>

      <SECTION title="Acabado y Color" icon="🎨">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
          <INPUT label="Color principal" value={form.color_principal} onChange={e=>setF("color_principal",e.target.value)} placeholder="Blanco, Gris, Madera..." />
          <INPUT label="Color secundario" value={form.color_secundario} onChange={e=>setF("color_secundario",e.target.value)} placeholder="Negro, Dorado..." />
        </div>
        <PILLS_GROUP options={["Mate","Alto brillo","Satinado","Tipo madera","Liso"]} value={form.tipo_acabado} onChange={v=>setF("tipo_acabado",v)} />
      </SECTION>

      <SECTION title="Puertas y Jaladeras" icon="🚪">
        <label style={{ fontSize: 11, color: "#555", display: "block", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>Tipo de puertas</label>
        <PILLS_GROUP options={["Sin puertas","Corredizas","Abatibles","Plegables","Espejo","Alto brillo","Tipo madera"]} value={form.tipo_puertas} onChange={v=>setF("tipo_puertas",v)} />
        <label style={{ fontSize: 11, color: "#555", display: "block", margin: "14px 0 8px", textTransform: "uppercase", letterSpacing: 1 }}>Jaladeras</label>
        <PILLS_GROUP options={["Ocultas","Perfil Gola","Metalicas","Negras","Doradas","Push open"]} value={form.jaladeras} onChange={v=>setF("jaladeras",v)} />
      </SECTION>

      <SECTION title="Herrajes" icon="🔧">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 14 }}>
          <div>
            <label style={{ fontSize: 11, color: "#555", display: "block", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>Bisagras</label>
            <PILLS_GROUP options={["Normales","Cierre lento","Premium"]} value={form.bisagras} onChange={v=>setF("bisagras",v)} />
          </div>
          <div>
            <label style={{ fontSize: 11, color: "#555", display: "block", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>Correderas</label>
            <PILLS_GROUP options={["Normales","Telescopicas","Cierre lento"]} value={form.correderas} onChange={v=>setF("correderas",v)} />
          </div>
        </div>
        <label style={{ fontSize: 11, color: "#555", display: "block", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>Accesorios de closet</label>
        <PILLS_GROUP options={["Zapatero","Cajones internos","Cajonera","Espejo interior","Iluminacion LED","Porta corbatas","Porta bolsas","Canastas extraibles","Barra para ropa","Doble barra"]} value={form.accesorios_closet} onChange={v=>setF("accesorios_closet",v)} />
      </SECTION>

      <SECTION title="Iluminacion" icon="💡">
        <PILLS_GROUP options={["LED superior","LED interior","Luz calida","Luz fria","Sensores de movimiento"]} value={form.iluminacion} onChange={v=>setF("iluminacion",v)} />
      </SECTION>

      <SECTION title="Observaciones" icon="📝">
        <TEXTAREA value={form.observaciones} onChange={e=>setF("observaciones",e.target.value)} placeholder="Notas adicionales, presupuesto aproximado..." rows={4} />
      </SECTION>

      {(role === "admin" || role === "taller") && (
        <SECTION title="Solo para Taller" icon="🏭">
          <TEXTAREA label="Materiales solicitados" value={form.materiales_solicitados} onChange={e=>setF("materiales_solicitados",e.target.value)} placeholder="Lista de materiales..." />
          <label style={{ fontSize: 11, color: "#555", display: "block", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>Nivel de calidad</label>
          <PILLS_GROUP options={["Economico","Medio","Premium"]} value={form.nivel_calidad} onChange={v=>setF("nivel_calidad",v)} multi={false} color="#00bcd4" />
          <TEXTAREA label="Comentarios tecnicos" value={form.comentarios_tecnicos} onChange={e=>setF("comentarios_tecnicos",e.target.value)} placeholder="Notas tecnicas..." style={{marginTop:12}} />
        </SECTION>
      )}
    </div>
  );
}

// ============ FORMULARIO PUERTAS ============
function FormularioPuerta({ form, setF, role, isMobile }) {
  return (
    <div>
      <SECTION title="Datos del Cliente" icon="👤">
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 12 }}>
          <INPUT label="Nombre completo" value={form.nombre} onChange={e=>setF("nombre",e.target.value)} placeholder="Maria Gonzalez" />
          <INPUT label="Telefono" value={form.telefono} onChange={e=>setF("telefono",e.target.value)} placeholder="81-1234-5678" />
          <INPUT label="Correo" value={form.correo} onChange={e=>setF("correo",e.target.value)} placeholder="correo@ejemplo.com" />
          <INPUT label="Direccion" value={form.direccion} onChange={e=>setF("direccion",e.target.value)} placeholder="Calle, Colonia, Ciudad" />
          <INPUT label="Fecha" value={form.fecha} onChange={e=>setF("fecha",e.target.value)} type="date" />
          <INPUT label="Atencion por" value={form.atencion_por} onChange={e=>setF("atencion_por",e.target.value)} placeholder="Felipe Santiago" />
        </div>
      </SECTION>

      <SECTION title="Tipo de Puerta" icon="🚪" subtitle="Selecciona el tipo">
        <PILLS_GROUP options={["Principal exterior","Interior recamara","Interior bano","Closet","Cochera","Canceleria","Puerta doble","Puerta con ventana"]} value={form.tipo_puerta} onChange={v=>setF("tipo_puerta",v)} />
        <INPUT label="Otro tipo" value={form.tipo_puerta_otro} onChange={e=>setF("tipo_puerta_otro",e.target.value)} placeholder="Especifica..." style={{marginTop:10}} />
      </SECTION>

      <SECTION title="Medidas y Cantidad" icon="📐">
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4,1fr)", gap: 12 }}>
          <INPUT label="Ancho" value={form.ancho} onChange={e=>setF("ancho",e.target.value)} placeholder="0.90 m" />
          <INPUT label="Alto" value={form.alto} onChange={e=>setF("alto",e.target.value)} placeholder="2.10 m" />
          <INPUT label="Grosor" value={form.grosor_puerta} onChange={e=>setF("grosor_puerta",e.target.value)} placeholder="45 mm" />
          <INPUT label="Cantidad" value={form.cantidad} onChange={e=>setF("cantidad",e.target.value)} placeholder="1" type="number" />
        </div>
      </SECTION>

      <SECTION title="Estilo" icon="✨">
        <PILLS_GROUP options={["Moderno","Minimalista","Clasico","Industrial","Rustico","Lujo / Premium"]} value={form.estilo} onChange={v=>setF("estilo",v)} />
      </SECTION>

      <SECTION title="Material" icon="🪵">
        <PILLS_GROUP options={["MDF","Madera solida","Pino","Cedro","Roble","Encino","Aluminio","PVC","Vidrio y madera"]} value={form.material} onChange={v=>setF("material",v)} />
      </SECTION>

      <SECTION title="Acabado y Color" icon="🎨">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
          <INPUT label="Color principal" value={form.color_principal} onChange={e=>setF("color_principal",e.target.value)} placeholder="Blanco, Negro, Madera..." />
          <INPUT label="Color secundario" value={form.color_secundario} onChange={e=>setF("color_secundario",e.target.value)} placeholder="Dorado, Gris..." />
        </div>
        <PILLS_GROUP options={["Mate","Barniz natural","Alto brillo","Laqueado","Tipo madera","Lacado"]} value={form.tipo_acabado} onChange={v=>setF("tipo_acabado",v)} />
      </SECTION>

      <SECTION title="Marco y Herrajes" icon="🔧">
        <label style={{ fontSize: 11, color: "#555", display: "block", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>Tipo de marco</label>
        <PILLS_GROUP options={["Marco de madera","Marco de aluminio","Sin marco (oculto)","Marco con moldura"]} value={form.tipo_marco} onChange={v=>setF("tipo_marco",v)} />
        <label style={{ fontSize: 11, color: "#555", display: "block", margin: "14px 0 8px", textTransform: "uppercase", letterSpacing: 1 }}>Herrajes</label>
        <PILLS_GROUP options={["Bisagras normales","Bisagras ocultas","Chapa con llave","Chapa sin llave","Manija negra","Manija dorada","Manija cromada","Amortiguador","Puerta pivotante"]} value={form.herrajes_puerta} onChange={v=>setF("herrajes_puerta",v)} />
      </SECTION>

      <SECTION title="Observaciones" icon="📝">
        <TEXTAREA value={form.observaciones} onChange={e=>setF("observaciones",e.target.value)} placeholder="Notas adicionales, uso de la puerta, presupuesto aproximado..." rows={4} />
      </SECTION>

      {(role === "admin" || role === "taller") && (
        <SECTION title="Solo para Taller" icon="🏭">
          <TEXTAREA label="Materiales solicitados" value={form.materiales_solicitados} onChange={e=>setF("materiales_solicitados",e.target.value)} placeholder="Lista de materiales..." />
          <label style={{ fontSize: 11, color: "#555", display: "block", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>Nivel de calidad</label>
          <PILLS_GROUP options={["Economico","Medio","Premium"]} value={form.nivel_calidad} onChange={v=>setF("nivel_calidad",v)} multi={false} color="#00bcd4" />
          <TEXTAREA label="Comentarios tecnicos" value={form.comentarios_tecnicos} onChange={e=>setF("comentarios_tecnicos",e.target.value)} placeholder="Notas tecnicas..." style={{marginTop:12}} />
        </SECTION>
      )}
    </div>
  );
}

// ============ FORMULARIO MUEBLES ============
function FormularioMueble({ form, setF, role, isMobile }) {
  return (
    <div>
      <SECTION title="Datos del Cliente" icon="👤">
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 12 }}>
          <INPUT label="Nombre completo" value={form.nombre} onChange={e=>setF("nombre",e.target.value)} placeholder="Maria Gonzalez" />
          <INPUT label="Telefono" value={form.telefono} onChange={e=>setF("telefono",e.target.value)} placeholder="81-1234-5678" />
          <INPUT label="Correo" value={form.correo} onChange={e=>setF("correo",e.target.value)} placeholder="correo@ejemplo.com" />
          <INPUT label="Direccion" value={form.direccion} onChange={e=>setF("direccion",e.target.value)} placeholder="Calle, Colonia, Ciudad" />
          <INPUT label="Fecha" value={form.fecha} onChange={e=>setF("fecha",e.target.value)} type="date" />
          <INPUT label="Atencion por" value={form.atencion_por} onChange={e=>setF("atencion_por",e.target.value)} placeholder="Felipe Santiago" />
        </div>
      </SECTION>

      <SECTION title="Tipo de Mueble" icon="🛋️" subtitle="Selecciona el tipo">
        <PILLS_GROUP options={["Mesa de comedor","Mesa de centro","Mesa de noche","Escritorio","Librero","Alacena","Barra desayunadora","Tocador","Cama","Cabecera","Mueble TV","Zapatero","Recibidor","Banco"]} value={form.tipo_mueble} onChange={v=>setF("tipo_mueble",v)} />
        <INPUT label="Otro tipo" value={form.tipo_mueble_otro} onChange={e=>setF("tipo_mueble_otro",e.target.value)} placeholder="Especifica..." style={{marginTop:10}} />
      </SECTION>

      <SECTION title="Medidas y Cantidad" icon="📐">
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4,1fr)", gap: 12 }}>
          <INPUT label="Largo / Ancho" value={form.largo} onChange={e=>setF("largo",e.target.value)} placeholder="1.80 m" />
          <INPUT label="Alto" value={form.alto} onChange={e=>setF("alto",e.target.value)} placeholder="0.75 m" />
          <INPUT label="Profundidad" value={form.profundidad} onChange={e=>setF("profundidad",e.target.value)} placeholder="0.45 m" />
          <INPUT label="Cantidad" value={form.cantidad} onChange={e=>setF("cantidad",e.target.value)} placeholder="1" type="number" />
        </div>
      </SECTION>

      <SECTION title="Estilo" icon="✨">
        <PILLS_GROUP options={["Moderno","Minimalista","Contemporaneo","Industrial","Clasico","Rustico","Nordico","Lujo / Premium"]} value={form.estilo} onChange={v=>setF("estilo",v)} />
      </SECTION>

      <SECTION title="Material" icon="🪵">
        <PILLS_GROUP options={["MDF","Melamina","Madera solida","Pino","Cedro","Roble","Encino","Triplay","Metal y madera"]} value={form.material} onChange={v=>setF("material",v)} />
        <label style={{ fontSize: 11, color: "#555", display: "block", margin: "12px 0 8px", textTransform: "uppercase", letterSpacing: 1 }}>Grosor</label>
        <PILLS_GROUP options={["15 mm","18 mm","25 mm","Madera maciza"]} value={form.grosor} onChange={v=>setF("grosor",v)} />
      </SECTION>

      <SECTION title="Acabado y Color" icon="🎨">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
          <INPUT label="Color principal" value={form.color_principal} onChange={e=>setF("color_principal",e.target.value)} placeholder="Blanco, Nogal, Negro..." />
          <INPUT label="Color secundario" value={form.color_secundario} onChange={e=>setF("color_secundario",e.target.value)} placeholder="Dorado, Gris..." />
        </div>
        <PILLS_GROUP options={["Mate","Alto brillo","Barniz natural","Laqueado","Tipo madera","Satinado"]} value={form.tipo_acabado} onChange={v=>setF("tipo_acabado",v)} />
      </SECTION>

      <SECTION title="Accesorios" icon="🔧">
        <PILLS_GROUP options={["Cajones con guias","Puertas abatibles","Puertas corredizas","Vidrio","Espejo","Iluminacion LED","Ruedas","Bisagras cierre lento","Herrajes dorados","Herrajes negros"]} value={form.accesorios_mueble} onChange={v=>setF("accesorios_mueble",v)} />
      </SECTION>

      <SECTION title="Observaciones" icon="📝">
        <TEXTAREA value={form.observaciones} onChange={e=>setF("observaciones",e.target.value)} placeholder="Notas adicionales, uso del mueble, presupuesto aproximado..." rows={4} />
      </SECTION>

      {(role === "admin" || role === "taller") && (
        <SECTION title="Solo para Taller" icon="🏭">
          <TEXTAREA label="Materiales solicitados" value={form.materiales_solicitados} onChange={e=>setF("materiales_solicitados",e.target.value)} placeholder="Lista de materiales..." />
          <label style={{ fontSize: 11, color: "#555", display: "block", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>Nivel de calidad</label>
          <PILLS_GROUP options={["Economico","Medio","Premium"]} value={form.nivel_calidad} onChange={v=>setF("nivel_calidad",v)} multi={false} color="#00bcd4" />
          <TEXTAREA label="Comentarios tecnicos" value={form.comentarios_tecnicos} onChange={e=>setF("comentarios_tecnicos",e.target.value)} placeholder="Notas tecnicas..." style={{marginTop:12}} />
        </SECTION>
      )}
    </div>
  );
}

// ============ PRESUPUESTO ============
function Presupuesto({ form, setF, isMobile, tipoProyecto }) {
  const total = [form.precio_fabricacion, form.precio_instalacion, form.precio_cubierta, form.precio_herrajes, form.precio_otros].reduce((a,v) => a+(parseFloat(v)||0), 0);

  function imprimir() {
    const w = window.open("","_blank");
    const tipoLabel = tipoProyecto === "cocina" ? "Cocina Integral" : tipoProyecto === "closet" ? "Closet" : tipoProyecto === "puerta" ? "Puerta" : "Mueble";
    w.document.write(`<html><head><title>Presupuesto EnKaje Pro</title><style>
      body{font-family:Georgia,serif;max-width:750px;margin:40px auto;color:#222;line-height:1.7;padding:0 20px}
      h1{text-align:center;color:#8B6914;font-size:22px;border-bottom:3px solid #d4af37;padding-bottom:12px}
      h2{font-size:13px;color:#666;text-transform:uppercase;letter-spacing:2px;margin-top:20px;border-left:4px solid #d4af37;padding-left:10px}
      table{width:100%;border-collapse:collapse;margin:12px 0}th{background:#f5f0e0;text-align:left;padding:8px 12px;font-size:12px}
      td{padding:8px 12px;border-bottom:1px solid #eee;font-size:13px}
      .total{font-size:18px;font-weight:900;color:#8B6914;text-align:right;padding:12px;background:#f5f0e0}
      .box{background:#f9f6ed;border:1px solid #d4af3740;border-radius:8px;padding:12px;margin:10px 0}
      .disclaimer{background:#fff3f3;border:1px solid #f4433640;border-radius:8px;padding:12px;margin-top:16px;font-size:11px;color:#666}
      .firma{display:flex;justify-content:space-between;margin-top:50px}
      .firma div{text-align:center;border-top:1px solid #333;padding-top:8px;width:45%;font-size:12px}
      .logo{text-align:center;font-size:26px;font-weight:900;color:#d4af37;letter-spacing:3px}
      .sub{text-align:center;font-size:10px;color:#888;letter-spacing:3px;margin-bottom:16px}
    </style></head><body>
    <div class="logo">EnKaje Pro</div><div class="sub">INTERMEDIACION - CARPINTERIA - MONTERREY</div>
    <h1>PRESUPUESTO PROFESIONAL - ${tipoLabel.toUpperCase()}</h1>
    <p><b>Fecha:</b> ${form.fecha} &nbsp; <b>Atencion por:</b> ${form.atencion_por}</p>
    <h2>Datos del Cliente</h2>
    <div class="box"><b>Nombre:</b> ${form.nombre||"---"}<br><b>Telefono:</b> ${form.telefono||"---"}<br><b>Direccion:</b> ${form.direccion||"---"}<br><b>Correo:</b> ${form.correo||"---"}</div>
    <h2>Proyecto</h2>
    <div class="box">${tipoLabel} - Estilo: <b>${Array.isArray(form.estilo)?form.estilo.join(", "):form.estilo||"por definir"}</b>${form.observaciones?`<br><b>Obs:</b> ${form.observaciones}`:""}</div>
    <h2>Incluye</h2><div class="box">${form.incluye||"Diseno, fabricacion, transporte, instalacion, ajustes y limpieza final"}</div>
    <h2>NO Incluye</h2><div class="box">${form.no_incluye||"Plomeria, electricidad, albanileria, cambios despues de aprobado"}</div>
    <h2>Precios</h2>
    <table><tr><th>Concepto</th><th style="text-align:right">Precio</th></tr>
    ${form.precio_fabricacion?`<tr><td>Fabricacion</td><td style="text-align:right">$${parseFloat(form.precio_fabricacion).toLocaleString("es-MX")} MXN</td></tr>`:""}
    ${form.precio_instalacion?`<tr><td>Instalacion</td><td style="text-align:right">$${parseFloat(form.precio_instalacion).toLocaleString("es-MX")} MXN</td></tr>`:""}
    ${form.precio_cubierta?`<tr><td>Acabados/Cubierta</td><td style="text-align:right">$${parseFloat(form.precio_cubierta).toLocaleString("es-MX")} MXN</td></tr>`:""}
    ${form.precio_herrajes?`<tr><td>Herrajes</td><td style="text-align:right">$${parseFloat(form.precio_herrajes).toLocaleString("es-MX")} MXN</td></tr>`:""}
    ${form.precio_otros?`<tr><td>Otros</td><td style="text-align:right">$${parseFloat(form.precio_otros).toLocaleString("es-MX")} MXN</td></tr>`:""}
    </table><div class="total">TOTAL: $${total.toLocaleString("es-MX")} MXN</div>
    <h2>Forma de Pago</h2>
    <div class="box">${form.anticipo}% anticipo: <b>$${(total*parseFloat(form.anticipo||0)/100).toLocaleString("es-MX")} MXN</b><br>${form.pago_entrega}% antes instalacion: <b>$${(total*parseFloat(form.pago_entrega||0)/100).toLocaleString("es-MX")} MXN</b><br>${form.pago_final}% contra entrega: <b>$${(total*parseFloat(form.pago_final||0)/100).toLocaleString("es-MX")} MXN</b></div>
    <h2>Tiempo</h2><div class="box">${form.tiempo_entrega}</div>
    <h2>Garantia</h2><div class="box">${form.garantia}</div>
    <div class="disclaimer"><b>NOTA:</b> EnKaje Pro actua como intermediario. La ejecucion es responsabilidad del taller seleccionado.</div>
    <div class="firma"><div>Felipe Santiago<br>EnKaje Pro</div><div>${form.nombre||"Cliente"}<br>Firma</div></div>
    </body></html>`);
    w.document.close(); w.print();
  }

  function textoPresupuesto() {
    const tipoLabel = tipoProyecto === "cocina" ? "Cocina Integral" : tipoProyecto === "closet" ? "Closet" : tipoProyecto === "puerta" ? "Puerta" : "Mueble";
    return `PRESUPUESTO - EnKaje Pro\n${tipoLabel}\nCliente: ${form.nombre}\nTel: ${form.telefono}\nTOTAL: $${total.toLocaleString("es-MX")} MXN\nAnticipo ${form.anticipo}%: $${(total*parseFloat(form.anticipo||0)/100).toLocaleString("es-MX")} MXN\nTiempo: ${form.tiempo_entrega}\nGarantia: ${form.garantia}`;
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 10 }}>
        <div>
          <h1 style={{ color: "#d4af37", margin: 0, fontSize: isMobile ? 20 : 24 }}>Presupuesto Profesional</h1>
          <p style={{ color: "#555", margin: "4px 0 0", fontSize: 13 }}>Completa los precios para generar</p>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <BTN onClick={imprimir} style={{ fontSize: 12, padding: "10px 14px" }}>🖨️ PDF</BTN>
          <BTN onClick={() => compartir("whatsapp", textoPresupuesto(), "Presupuesto EnKaje Pro")} color="#25D366" textColor="#fff" style={{ fontSize: 12, padding: "10px 14px" }}>WhatsApp</BTN>
          <BTN onClick={() => compartir("email", textoPresupuesto(), "Presupuesto EnKaje Pro")} outline color="#d4af37" style={{ fontSize: 12, padding: "10px 14px" }}>Email</BTN>
          <BTN onClick={() => compartir("copiar", textoPresupuesto(), "Presupuesto EnKaje Pro")} outline color="#555" style={{ fontSize: 12, padding: "10px 14px" }}>Copiar</BTN>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 20 }}>
        <div>
          <SECTION title="Que Incluye" icon="✅">
            <TEXTAREA value={form.incluye} onChange={e=>setF("incluye",e.target.value)} placeholder={"Diseno\nFabricacion\nTransporte\nInstalacion\nAjustes\nLimpieza final"} rows={5} />
          </SECTION>
          <SECTION title="Que NO Incluye" icon="❌">
            <TEXTAREA value={form.no_incluye} onChange={e=>setF("no_incluye",e.target.value)} placeholder={"Plomeria\nElectricidad\nAlbanileria\nElectrodomesticos\nCambios despues de aprobado"} rows={5} />
          </SECTION>
          <SECTION title="Forma de Pago" icon="💰">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
              <INPUT label="% Anticipo" value={form.anticipo} onChange={e=>setF("anticipo",e.target.value)} placeholder="60" type="number" />
              <INPUT label="% Antes inst." value={form.pago_entrega} onChange={e=>setF("pago_entrega",e.target.value)} placeholder="30" type="number" />
              <INPUT label="% Entrega" value={form.pago_final} onChange={e=>setF("pago_final",e.target.value)} placeholder="10" type="number" />
            </div>
          </SECTION>
          <SECTION title="Tiempo y Garantia" icon="⏱️">
            <INPUT label="Tiempo de entrega" value={form.tiempo_entrega} onChange={e=>setF("tiempo_entrega",e.target.value)} placeholder="20 a 30 dias habiles" />
            <INPUT label="Garantia" value={form.garantia} onChange={e=>setF("garantia",e.target.value)} placeholder="6 meses en instalacion y herrajes" />
          </SECTION>
        </div>

        <div>
          <SECTION title="Desglose de Precios" icon="📊">
            <INPUT label="Fabricacion (MXN)" value={form.precio_fabricacion} onChange={e=>setF("precio_fabricacion",e.target.value)} placeholder="35000" type="number" />
            <INPUT label="Instalacion (MXN)" value={form.precio_instalacion} onChange={e=>setF("precio_instalacion",e.target.value)} placeholder="8000" type="number" />
            <INPUT label="Acabados / Cubierta (MXN)" value={form.precio_cubierta} onChange={e=>setF("precio_cubierta",e.target.value)} placeholder="12000" type="number" />
            <INPUT label="Herrajes (MXN)" value={form.precio_herrajes} onChange={e=>setF("precio_herrajes",e.target.value)} placeholder="5000" type="number" />
            <INPUT label="Otros (MXN)" value={form.precio_otros} onChange={e=>setF("precio_otros",e.target.value)} placeholder="0" type="number" />
            {total > 0 && (
              <div style={{ background: "#1a1208", border: "1px solid #d4af3730", borderRadius: 12, padding: 16, marginTop: 8 }}>
                {[["Fabricacion",form.precio_fabricacion],["Instalacion",form.precio_instalacion],["Acabados",form.precio_cubierta],["Herrajes",form.precio_herrajes],["Otros",form.precio_otros]].filter(([,v])=>v).map(([l,v],i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#aaa", marginBottom: 6 }}>
                    <span>{l}</span><span>${parseFloat(v).toLocaleString("es-MX")} MXN</span>
                  </div>
                ))}
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 20, fontWeight: 900, color: "#d4af37", paddingTop: 10, borderTop: "1px solid #d4af3730", marginTop: 6 }}>
                  <span>TOTAL</span><span>${total.toLocaleString("es-MX")} MXN</span>
                </div>
                <div style={{ marginTop: 12, fontSize: 12, color: "#555", lineHeight: 1.9 }}>
                  Anticipo {form.anticipo}%: <b style={{color:"#d4af37"}}>${(total*parseFloat(form.anticipo||0)/100).toLocaleString("es-MX")} MXN</b><br/>
                  Antes inst. {form.pago_entrega}%: <b style={{color:"#d4af37"}}>${(total*parseFloat(form.pago_entrega||0)/100).toLocaleString("es-MX")} MXN</b><br/>
                  Entrega {form.pago_final}%: <b style={{color:"#d4af37"}}>${(total*parseFloat(form.pago_final||0)/100).toLocaleString("es-MX")} MXN</b>
                </div>
              </div>
            )}
          </SECTION>
        </div>
      </div>
    </div>
  );
}

// ============ MAIN APP ============
export default function App() {
  const isMobile = useIsMobile();
  const [screen, setScreen] = useState("welcome");
  const [role, setRole] = useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loginForm, setLoginForm] = useState({ email: "", password: "", nombre: "", role: "cliente" });
  const [loginMode, setLoginMode] = useState("login");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [tab, setTab] = useState("bienvenida");
  const [tipoForm, setTipoForm] = useState("cocina");
  const [formCocina, setFormCocina] = useState(FORM_INIT);
  const [formCloset, setFormCloset] = useState(FORM_CLOSET_INIT);
  const [formPuerta, setFormPuerta] = useState(FORM_PUERTA_INIT);
  const [formMueble, setFormMueble] = useState(FORM_MUEBLE_INIT);
  const [proyectos, setProyectos] = useState([]);
  const [proyectoSel, setProyectoSel] = useState(null);
  const [talleresMem, setTalleresMem] = useState([]);
  const [tallerSel, setTallerSel] = useState(null);
  const [showNuevoTaller, setShowNuevoTaller] = useState(false);
  const [nuevoTaller, setNuevoTaller] = useState({ nombre: "", email: "", telefono: "", especialidad: "", zona: "", municipio: "", plan: "basico", fecha_vencimiento: "", notas: "" });
  const [tallerMsg, setTallerMsg] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState("");
  const [savedMsg, setSavedMsg] = useState("");

  const getForm = () => tipoForm === "cocina" ? formCocina : tipoForm === "closet" ? formCloset : tipoForm === "puerta" ? formPuerta : formMueble;
  const setFormField = (key, val) => {
    if (tipoForm === "cocina") setFormCocina(p => ({...p, [key]: val}));
    else if (tipoForm === "closet") setFormCloset(p => ({...p, [key]: val}));
    else if (tipoForm === "puerta") setFormPuerta(p => ({...p, [key]: val}));
    else setFormMueble(p => ({...p, [key]: val}));
  };

  const nombreUsuario = user?.user_metadata?.nombre || user?.email?.split("@")[0] || "Usuario";

  async function login() {
    setLoginLoading(true); setLoginError("");
    const data = await authFetch("token?grant_type=password", { email: loginForm.email, password: loginForm.password });
    if (data.access_token) {
      setToken(data.access_token); setUser(data.user);
      const r = data.user?.user_metadata?.role || "cliente";
      setRole(r); setScreen("app"); setTab("bienvenida");
      // Cargar ultimo proyecto del cliente
      if (r === "cliente") {
        try {
          const proyData = await sb(`proyectos?user_email=eq.${data.user.email}&order=created_at.desc&limit=4`, {
            headers: { "Authorization": `Bearer ${data.access_token}` }
          });
          if (Array.isArray(proyData) && proyData.length > 0) {
            proyData.forEach(p => {
              if (p.tipo_proyecto === "cocina") setFormCocina(prev => ({...FORM_INIT, ...p}));
              else if (p.tipo_proyecto === "closet") setFormCloset(prev => ({...FORM_CLOSET_INIT, ...p}));
              else if (p.tipo_proyecto === "puerta") setFormPuerta(prev => ({...FORM_PUERTA_INIT, ...p}));
              else if (p.tipo_proyecto === "mueble") setFormMueble(prev => ({...FORM_MUEBLE_INIT, ...p}));
            });
          }
        } catch(e) {}
      }
    } else { setLoginError(data.error_description || data.message || "Error al iniciar sesion"); }
    setLoginLoading(false);
  }

  async function register() {
    setLoginLoading(true); setLoginError("");
    const data = await authFetch("signup", { email: loginForm.email, password: loginForm.password, data: { nombre: loginForm.nombre, role: loginForm.role } });
    if (data.user) { setLoginError("Cuenta creada exitosamente. Ya puedes iniciar sesion."); }
    else { setLoginError(data.error_description || data.message || "Error al registrar"); }
    setLoginLoading(false);
  }

  async function guardarFormulario() {
    setSavedMsg("Guardando...");
    try {
      const form = getForm();
      await sb("proyectos", { method: "POST", body: JSON.stringify({ ...form, user_id: user?.id, user_email: user?.email, estado: "nuevo", created_at: new Date().toISOString() }) });
      setSavedMsg("Guardado exitosamente"); setTimeout(() => setSavedMsg(""), 3000);
    } catch { setSavedMsg("Error al guardar"); }
  }

  async function cargarProyectos() {
    let url = "proyectos?order=created_at.desc";
    if (role === "cliente") url += `&user_email=eq.${user?.email}`;
    const data = await sb(url, { headers: { "Authorization": `Bearer ${token}` } });
    if (Array.isArray(data)) setProyectos(data);
  }

  async function cargarTalleres() {
    const data = await sb("talleres_membresia?order=created_at.desc", { headers: { "Authorization": `Bearer ${token}` } });
    if (Array.isArray(data)) setTalleresMem(data);
  }

  async function guardarNuevoTaller() {
    setTallerMsg("Guardando...");
    try {
      await sb("talleres_membresia", { method: "POST", body: JSON.stringify({ ...nuevoTaller, created_at: new Date().toISOString() }) });
      setTallerMsg("Taller agregado");
      // Generar email de bienvenida
      const planLabel = nuevoTaller.plan === "premium" ? "Premium $2,999/mes" : nuevoTaller.plan === "pro" ? "Pro $1,499/mes" : "Basico $699/mes";
      const emailBody = `Bienvenido a EnKaje Pro, ${nuevoTaller.nombre}.

Tu cuenta ha sido activada con el Plan ${planLabel}.

A partir de ahora recibiras leads de clientes en tu zona de ${nuevoTaller.municipio || nuevoTaller.zona} especializados en ${nuevoTaller.especialidad}.

Accede a la plataforma en: https://enkajepro.com
Tu correo de acceso: ${nuevoTaller.email}

Lo que incluye tu plan:
${nuevoTaller.plan === "basico" ? "- Hasta 5 leads por mes\n- Dashboard basico\n- Cotizaciones" : nuevoTaller.plan === "pro" ? "- Leads ilimitados\n- CRM completo\n- WhatsApp automatico\n- IA ilimitada\n- Contratos digitales" : "- Todo el Plan Pro\n- Exclusividad en tu zona\n- Primero en recibir leads\n- Perfil destacado en el mapa\n- Onboarding personal"}

Cualquier duda estamos contigo.

Felipe Santiago
EnKaje Pro
enkajepro.com`;
      window.open(`mailto:${nuevoTaller.email}?subject=Bienvenido a EnKaje Pro - Tu cuenta esta activa&body=${encodeURIComponent(emailBody)}`, "_blank");
      setNuevoTaller({ nombre: "", email: "", telefono: "", especialidad: "", zona: "", municipio: "", plan: "basico", fecha_vencimiento: "", notas: "" });
      setShowNuevoTaller(false);
      cargarTalleres();
      setTimeout(() => setTallerMsg(""), 3000);
    } catch { setTallerMsg("Error al guardar"); }
  }

  async function actualizarTaller(id, cambios) {
    await sb(`talleres_membresia?id=eq.${id}`, { method: "PATCH", body: JSON.stringify(cambios) });
    cargarTalleres();
  }

  useEffect(() => {
    if (screen === "app" && (tab === "bienvenida" || tab === "proyectos" || tab === "leads")) cargarProyectos();
    if (screen === "app" && tab === "membresias") cargarTalleres();
  }, [tab, screen]);

  async function analizarConIA() {
    const form = getForm();
    setAiLoading(true); setAiResult("");
    try {
      const prompt = `Eres experto disenador de ${tipoForm} en Monterrey. Cliente quiere: Tipo: ${Array.isArray(form.tipo_cocina)?form.tipo_cocina.join(", "):""}, Estilo: ${Array.isArray(form.estilo)?form.estilo.join(", "):"?"}, Material: ${Array.isArray(form.material)?form.material.join(", "):"?"}, Color: ${form.color_principal||"?"}, Acabado: ${Array.isArray(form.tipo_acabado)?form.tipo_acabado.join(", "):"?"}. Da: 1) Combinacion ideal materiales/colores 2) Accesorios sugeridos 3) Rango de precio en Monterrey 4) 3 tips profesionales. Usa emojis, max 280 palabras.`;
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json", "anthropic-dangerous-direct-browser-calls": "true" },
        body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 800, messages: [{ role: "user", content: prompt }] })
      });
      const data = await res.json();
      setAiResult(data.content?.[0]?.text || "Configura tu API key de Anthropic en Vercel.");
    } catch { setAiResult("Configura tu API key en Vercel > Settings > Environment Variables."); }
    setAiLoading(false);
  }

  const pad = isMobile ? "16px" : "28px 20px";

  // WELCOME
  if (screen === "welcome") return (
    <div style={{ minHeight: "100vh", background: "#070708", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: isMobile ? "24px 16px" : 40 }}>
      <style>{GLOBAL_CSS}</style>
      <div className="fade-up" style={{ textAlign: "center", width: "100%", maxWidth: 700 }}>
        <div style={{ fontSize: 11, color: "#555", letterSpacing: 6, marginBottom: 12 }}>BIENVENIDO A</div>
        <div style={{ fontSize: isMobile ? 42 : 68, fontWeight: 900, color: "#d4af37", letterSpacing: 4, marginBottom: 8, textShadow: "0 0 60px #d4af3730" }}>EnKaje Pro</div>
        <div style={{ fontSize: 12, color: "#444", letterSpacing: 4, marginBottom: 40 }}>PLATAFORMA DE CARPINTERIA · MONTERREY</div>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr", gap: 14, marginBottom: 40 }}>
          {[["Clientes","Diseña y cotiza tu proyecto ideal","#d4af37"],["Talleres","Recibe proyectos y cotiza en minutos","#00bcd4"],["Asesores","Gestiona tu negocio completo","#4caf50"]].map(([t,d,c],i) => (
            <div key={i} style={{ background: "#0f0f0a", border: `1px solid ${c}30`, borderRadius: 16, padding: "20px 18px", textAlign: "left" }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: c, marginBottom: 8, letterSpacing: 1 }}>{t}</div>
              <div style={{ fontSize: 12, color: "#555", lineHeight: 1.6 }}>{d}</div>
            </div>
          ))}
        </div>
        <button onClick={() => setScreen("login")} style={{ background: "#d4af37", color: "#000", border: "none", borderRadius: 14, padding: isMobile ? "16px 40px" : "18px 56px", fontWeight: 900, fontSize: isMobile ? 15 : 17, cursor: "pointer", letterSpacing: 2, width: isMobile ? "100%" : "auto" }}>
          ENTRAR A LA PLATAFORMA
        </button>
        <div style={{ marginTop: 24, fontSize: 10, color: "#333", letterSpacing: 2 }}>MONTERREY, MEXICO</div>
      </div>
    </div>
  );

  // LOGIN
  if (screen === "login") return (
    <div style={{ minHeight: "100vh", background: "#070708", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px 16px" }}>
      <style>{GLOBAL_CSS}</style>
      <div style={{ width: "100%", maxWidth: 420 }} className="fade-up">
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <button onClick={() => setScreen("welcome")} style={{ background: "transparent", border: "none", color: "#555", cursor: "pointer", fontSize: 13, marginBottom: 16, padding: "8px 0" }}>← Volver</button>
          <div style={{ fontSize: 28, fontWeight: 900, color: "#d4af37", letterSpacing: 4 }}>EnKaje Pro</div>
          <div style={{ fontSize: 10, color: "#444", letterSpacing: 3 }}>PLATAFORMA DE CARPINTERIA</div>
        </div>
        <div style={{ background: "#0f0f0a", border: "1px solid #d4af3725", borderRadius: 20, padding: isMobile ? 20 : 28 }}>
          <div style={{ display: "flex", gap: 4, marginBottom: 20, background: "#070708", borderRadius: 10, padding: 4 }}>
            {[["login","Iniciar Sesion"],["register","Crear Cuenta"]].map(([k,l]) => (
              <button key={k} onClick={() => setLoginMode(k)} style={{ flex: 1, padding: "11px 8px", borderRadius: 8, border: "none", background: loginMode===k?"#d4af37":"transparent", color: loginMode===k?"#000":"#555", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>{l}</button>
            ))}
          </div>
          {loginMode === "register" && <INPUT label="Nombre completo" value={loginForm.nombre} onChange={e => setLoginForm(p => ({...p, nombre: e.target.value}))} placeholder="Tu nombre" />}
          <INPUT label="Correo electronico" value={loginForm.email} onChange={e => setLoginForm(p => ({...p, email: e.target.value}))} placeholder="correo@ejemplo.com" type="email" />
          <INPUT label="Contrasena" value={loginForm.password} onChange={e => setLoginForm(p => ({...p, password: e.target.value}))} placeholder="••••••••" type="password" />
          {loginMode === "register" && (
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 11, color: "#555", display: "block", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>Tipo de cuenta</label>
              <div style={{ display: "flex", gap: 8 }}>
                {[["cliente","Cliente"],["taller","Taller"],["admin","Admin"]].map(([k,l]) => (
                  <button key={k} onClick={() => setLoginForm(p => ({...p, role: k}))} style={{ flex: 1, padding: "11px 4px", borderRadius: 10, border: `1px solid ${loginForm.role===k?"#d4af37":"#2a2a20"}`, background: loginForm.role===k?"#d4af3715":"transparent", color: loginForm.role===k?"#d4af37":"#555", fontSize: 13, cursor: "pointer", fontWeight: 700 }}>{l}</button>
                ))}
              </div>
            </div>
          )}
          {loginError && <div style={{ background: loginError.includes("exitosamente")?"#0a2a0a":"#1a0a0a", border: `1px solid ${loginError.includes("exitosamente")?"#4caf5040":"#f4433640"}`, borderRadius: 8, padding: "10px 14px", marginBottom: 14, fontSize: 13, color: loginError.includes("exitosamente")?"#4caf50":"#f44336" }}>{loginError}</div>}
          <button onClick={loginMode==="login"?login:register} disabled={loginLoading}
            style={{ width: "100%", background: "#d4af37", color: "#000", border: "none", borderRadius: 12, padding: "14px", fontWeight: 700, fontSize: 15, cursor: "pointer", letterSpacing: 1 }}>
            {loginLoading?"...":loginMode==="login"?"ENTRAR":"CREAR CUENTA"}
          </button>
        </div>
      </div>
    </div>
  );

  // APP
  const tabs = role === "admin"
    ? [["bienvenida","Inicio"],["formulario","Formulario"],["presupuesto","Presupuesto"],["proyectos","Proyectos"],["membresias","Talleres"],["ia","IA"]]
    : role === "taller"
    ? [["bienvenida","Inicio"],["leads","Proyectos"],["presupuesto","Cotizar"],["ia","IA"]]
    : [["bienvenida","Inicio"],["formulario","Mi Proyecto"],["estilos","Estilos"],["presupuesto","Presupuesto"],["ia","IA"]];

  const form = getForm();

  return (
    <div style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", background: "#070708", minHeight: "100vh", color: "#e8e0d0" }}>
      <style>{GLOBAL_CSS}</style>

      {/* HEADER */}
      <div style={{ background: "linear-gradient(135deg,#12100a,#070708)", borderBottom: "1px solid #d4af3720", padding: `0 ${isMobile?14:20}px`, position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 0" }}>
          <div style={{ cursor: "pointer" }} onClick={() => setTab("bienvenida")}>
            <div style={{ fontSize: isMobile?17:20, fontWeight: 900, color: "#d4af37", letterSpacing: 2 }}>EnKaje Pro</div>
            {!isMobile && <div style={{ fontSize: 9, color: "#444", letterSpacing: 3 }}>{role==="admin"?"ADMIN":role==="taller"?"TALLER":"CLIENTE"}</div>}
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            {!isMobile && <div style={{ fontSize: 12, color: "#555" }}>Hola, {nombreUsuario}</div>}
            <button onClick={() => { setScreen("welcome"); setRole(null); setUser(null); }} style={{ background: "transparent", border: "1px solid #2a2a20", color: "#555", borderRadius: 8, padding: "7px 12px", fontSize: 12, cursor: "pointer" }}>Salir</button>
          </div>
        </div>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", gap: 2, overflowX: "auto", paddingBottom: 1 }}>
          {tabs.map(([k,l]) => (
            <button key={k} onClick={() => setTab(k)} style={{ background: "transparent", border: "none", borderBottom: tab===k?"2px solid #d4af37":"2px solid transparent", color: tab===k?"#d4af37":"#555", padding: isMobile?"10px 12px":"10px 16px", cursor: "pointer", fontSize: isMobile?12:13, fontWeight: 700, whiteSpace: "nowrap" }}>{l}</button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: pad }}>

        {/* BIENVENIDA */}
        {tab === "bienvenida" && (
          <div className="fade-up">
            <div style={{ background: "linear-gradient(135deg,#1a1208,#0f0f0a)", border: "1px solid #d4af3730", borderRadius: 20, padding: isMobile?"24px 20px":"36px 32px", marginBottom: 20 }}>
              <div style={{ fontSize: 11, color: "#d4af37", letterSpacing: 2, marginBottom: 6 }}>
                {role==="admin"?"PANEL ADMINISTRATIVO":role==="taller"?"PANEL DE TALLER":"PORTAL DE CLIENTE"}
              </div>
              <h1 style={{ fontSize: isMobile?22:32, fontWeight: 900, color: "#e8e0d0", margin: "0 0 8px" }}>Bienvenido, {nombreUsuario}</h1>
              <p style={{ color: "#666", fontSize: 14, margin: "0 0 20px", lineHeight: 1.6 }}>
                {role==="admin"?"Gestionas todos los proyectos de EnKaje Pro.":role==="taller"?"Aqui recibes proyectos y cotizas directamente.":"Diseña y cotiza tu proyecto ideal con nosotros."}
              </p>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {role==="admin" && <>
                  <BTN onClick={() => setTab("formulario")}>Nuevo Levantamiento</BTN>
                  <BTN onClick={() => setTab("proyectos")} outline color="#d4af37">Ver Proyectos ({proyectos.length})</BTN>
                </>}
                {role==="taller" && <BTN onClick={() => setTab("leads")}>Ver Proyectos ({proyectos.length})</BTN>}
                {role==="cliente" && <>
                  <BTN onClick={() => setTab("formulario")}>Iniciar mi Proyecto</BTN>
                  <BTN onClick={() => setTab("estilos")} outline color="#d4af37">Ver Estilos</BTN>
                </>}
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: isMobile?"1fr 1fr":"repeat(4,1fr)", gap: 12 }}>
              {role==="admin" && [["Proyectos",proyectos.length,"#d4af37"],["Nuevos",proyectos.filter(p=>p.estado==="nuevo").length,"#00bcd4"],["En proceso",proyectos.filter(p=>p.estado==="proceso").length,"#f0a500"],["Cerrados",proyectos.filter(p=>p.estado==="cerrado").length,"#4caf50"]].map(([l,v,c],i) => (
                <div key={i} style={{ background: "#0f0f0a", border: `1px solid ${c}25`, borderRadius: 12, padding: isMobile?14:18, cursor: "pointer" }} onClick={() => setTab("proyectos")}>
                  <div style={{ fontSize: 9, color: "#444", letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>{l}</div>
                  <div style={{ fontSize: isMobile?26:32, fontWeight: 900, color: c }}>{v}</div>
                </div>
              ))}
              {role==="cliente" && [["Mi Proyecto","Llena el formulario","formulario","#d4af37"],["Estilos","Elige tu estilo","estilos","#00bcd4"],["Presupuesto","Ve el costo","presupuesto","#4caf50"],["IA Asesora","Recomendaciones","ia","#f0a500"]].map(([t,d,tab_,c],i) => (
                <div key={i} onClick={() => setTab(tab_)} style={{ background: "#0f0f0a", border: `1px solid ${c}25`, borderRadius: 12, padding: isMobile?14:18, cursor: "pointer" }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: c, marginBottom: 4 }}>{t}</div>
                  <div style={{ fontSize: 11, color: "#555", lineHeight: 1.5 }}>{d}</div>
                </div>
              ))}
              {role==="taller" && [["Proyectos nuevos",proyectos.filter(p=>p.estado==="nuevo").length,"#d4af37"],["Total",proyectos.length,"#00bcd4"]].map(([l,v,c],i) => (
                <div key={i} style={{ background: "#0f0f0a", border: `1px solid ${c}25`, borderRadius: 12, padding: isMobile?14:18 }}>
                  <div style={{ fontSize: 9, color: "#444", letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>{l}</div>
                  <div style={{ fontSize: 32, fontWeight: 900, color: c }}>{v}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FORMULARIO */}
        {tab === "formulario" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 10 }}>
              <div>
                <h1 style={{ color: "#d4af37", margin: 0, fontSize: isMobile?20:24 }}>Formulario de Levantamiento</h1>
                <p style={{ color: "#555", margin: "4px 0 0", fontSize: 13 }}>Especificaciones completas del proyecto</p>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                {savedMsg && <div style={{ background: savedMsg.includes("Error")?"#1a0a0a":"#0a2a0a", border: `1px solid ${savedMsg.includes("Error")?"#f4433640":"#4caf5040"}`, color: savedMsg.includes("Error")?"#f44336":"#4caf50", borderRadius: 8, padding: "8px 14px", fontSize: 12 }}>{savedMsg}</div>}
                <BTN onClick={guardarFormulario}>Guardar</BTN>
              </div>
            </div>

            {/* Selector tipo de proyecto */}
            <div style={{ background: "#0f0f0a", border: "1px solid #1a1a12", borderRadius: 16, padding: "16px 20px", marginBottom: 20 }}>
              <label style={{ fontSize: 11, color: "#555", display: "block", marginBottom: 10, textTransform: "uppercase", letterSpacing: 1 }}>Tipo de Proyecto</label>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {[["cocina","🍳 Cocina"],["closet","👔 Closet"],["puerta","🚪 Puerta"],["mueble","🛋️ Mueble"]].map(([k,l]) => (
                  <PILL_SINGLE key={k} label={l} checked={tipoForm===k} onChange={() => setTipoForm(k)} />
                ))}
              </div>
            </div>

            {tipoForm === "cocina" && <FormularioCocina form={formCocina} setF={(k,v) => setFormCocina(p=>({...p,[k]:v}))} role={role} isMobile={isMobile} />}
            {tipoForm === "closet" && <FormularioCloset form={formCloset} setF={(k,v) => setFormCloset(p=>({...p,[k]:v}))} role={role} isMobile={isMobile} />}
            {tipoForm === "puerta" && <FormularioPuerta form={formPuerta} setF={(k,v) => setFormPuerta(p=>({...p,[k]:v}))} role={role} isMobile={isMobile} />}
            {tipoForm === "mueble" && <FormularioMueble form={formMueble} setF={(k,v) => setFormMueble(p=>({...p,[k]:v}))} role={role} isMobile={isMobile} />}

            <div style={{ display: "flex", justifyContent: "center", marginTop: 24, gap: 12 }}>
              <BTN onClick={guardarFormulario} style={{ width: isMobile?"100%":"auto", padding: "15px 48px", fontSize: 15, letterSpacing: 1 }}>GUARDAR LEVANTAMIENTO</BTN>
            </div>
          </div>
        )}

        {/* ESTILOS */}
        {tab === "estilos" && (
          <div>
            <h1 style={{ color: "#d4af37", margin: "0 0 8px", fontSize: isMobile?20:24 }}>Estilos de Diseño</h1>
            <p style={{ color: "#555", margin: "0 0 20px", fontSize: 13 }}>Toca el estilo que te gusta para seleccionarlo</p>
            <div style={{ display: "grid", gridTemplateColumns: isMobile?"1fr 1fr":"repeat(auto-fill,minmax(220px,1fr))", gap: 12 }}>
              {ESTILOS.map(e => {
                const sel = formCocina.estilo.includes(e.label);
                return (
                  <div key={e.key} onClick={() => setFormCocina(p => ({...p, estilo: p.estilo.includes(e.label)?p.estilo.filter(x=>x!==e.label):[...p.estilo,e.label]}))}
                    style={{ background: "#0f0f0a", border: `2px solid ${sel?"#d4af37":"transparent"}`, borderRadius: 14, overflow: "hidden", cursor: "pointer", transition: "all .2s", boxShadow: sel?"0 0 20px #d4af3830":"none" }}>
                    <div style={{ position: "relative", height: isMobile?120:160, background: "#1a1a10" }}>
                      <img src={e.img} alt={e.label} style={{ width: "100%", height: "100%", objectFit: "cover", filter: sel?"brightness(1.05)":"brightness(0.65)", transition: "all .3s" }} onError={ev=>ev.target.style.display="none"} />
                      {sel && <div style={{ position: "absolute", top: 8, right: 8, background: "#d4af37", color: "#000", borderRadius: "50%", width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 14 }}>✓</div>}
                      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(transparent,rgba(0,0,0,0.85))", padding: "16px 12px 8px" }}>
                        <div style={{ fontWeight: 700, fontSize: isMobile?13:15, color: sel?"#d4af37":"#fff" }}>{e.label}</div>
                      </div>
                    </div>
                    {!isMobile && <div style={{ padding: "10px 12px" }}><div style={{ fontSize: 12, color: "#666", lineHeight: 1.5 }}>{e.desc}</div></div>}
                  </div>
                );
              })}
            </div>
            {formCocina.estilo.length > 0 && (
              <div style={{ marginTop: 16, background: "#0f0f0a", border: "1px solid #d4af3730", borderRadius: 12, padding: 16, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
                <div style={{ fontSize: 13, color: "#aaa" }}>Seleccionados: <b style={{ color: "#d4af37" }}>{formCocina.estilo.join(", ")}</b></div>
                <BTN onClick={() => setTab("ia")} style={{ fontSize: 12 }}>Ver Recomendacion IA</BTN>
              </div>
            )}
          </div>
        )}

        {/* PRESUPUESTO */}
        {tab === "presupuesto" && (
          <div>
            <div style={{ background: "#0f0f0a", border: "1px solid #1a1a12", borderRadius: 16, padding: "16px 20px", marginBottom: 20 }}>
              <label style={{ fontSize: 11, color: "#555", display: "block", marginBottom: 10, textTransform: "uppercase", letterSpacing: 1 }}>Tipo de Proyecto</label>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {[["cocina","🍳 Cocina"],["closet","👔 Closet"],["puerta","🚪 Puerta"],["mueble","🛋️ Mueble"]].map(([k,l]) => (
                  <PILL_SINGLE key={k} label={l} checked={tipoForm===k} onChange={() => setTipoForm(k)} />
                ))}
              </div>
            </div>
            <Presupuesto form={getForm()} setF={setFormField} isMobile={isMobile} tipoProyecto={tipoForm} />
          </div>
        )}

        {/* PROYECTOS ADMIN */}
        {tab === "proyectos" && role === "admin" && (
          <div>
            <h1 style={{ color: "#d4af37", margin: "0 0 20px", fontSize: isMobile?20:26 }}>Todos los Proyectos</h1>
            {proyectos.length === 0 && <div style={{ color: "#555", fontSize: 14, padding: 20 }}>No hay proyectos aun</div>}
            {proyectos.map((p,i) => (
              <div key={i} onClick={() => setProyectoSel(proyectoSel?.created_at===p.created_at?null:p)}
                style={{ background: "#0f0f0a", border: `1px solid ${proyectoSel?.created_at===p.created_at?"#d4af37":"#ffffff08"}`, borderRadius: 12, padding: 16, marginBottom: 10, cursor: "pointer" }}>
                <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15 }}>{p.nombre || p.user_email}</div>
                    <div style={{ fontSize: 12, color: "#555" }}>{p.tipo_proyecto?.toUpperCase()} - {p.created_at?.split("T")[0]}</div>
                  </div>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <span style={{ fontSize: 11, color: "#00bcd4", fontWeight: 700, textTransform: "uppercase" }}>{p.estado}</span>
                    <span style={{ fontSize: 10, background: "#d4af3720", color: "#d4af37", borderRadius: 20, padding: "2px 8px", fontWeight: 700 }}>{p.tipo_proyecto || "cocina"}</span>
                  </div>
                </div>
                {proyectoSel?.created_at === p.created_at && (
                  <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid #ffffff08" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, fontSize: 12, color: "#aaa", marginBottom: 12 }}>
                      {[["Tel",p.telefono],["Email",p.correo],["Material",Array.isArray(p.material)?p.material.join(", "):p.material],["Nivel",p.nivel_calidad]].filter(([,v])=>v).map(([l,v],j) => (
                        <div key={j}><b style={{color:"#d4af37"}}>{l}:</b> {v}</div>
                      ))}
                    </div>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      <BTN onClick={e => { e.stopPropagation(); setTipoForm(p.tipo_proyecto||"cocina"); setTab("presupuesto"); }} style={{ fontSize: 12 }}>Abrir en Presupuesto</BTN>
                      <BTN onClick={async e => { e.stopPropagation(); if(window.confirm("Eliminar este proyecto?")) { await sb(`proyectos?id=eq.${p.id}`, {method:"DELETE"}); cargarProyectos(); }}} outline color="#f44336" style={{ fontSize: 12 }}>Eliminar</BTN>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* LEADS TALLER */}
        {tab === "leads" && role === "taller" && (
          <div>
            <h1 style={{ color: "#d4af37", margin: "0 0 20px", fontSize: isMobile?20:26 }}>Proyectos Disponibles</h1>
            {proyectos.length === 0 && <div style={{ color: "#555", fontSize: 14, padding: 20 }}>No hay proyectos aun</div>}
            {proyectos.map((p,i) => (
              <div key={i} onClick={() => setProyectoSel(proyectoSel?.created_at===p.created_at?null:p)}
                style={{ background: "#0f0f0a", border: `1px solid ${proyectoSel?.created_at===p.created_at?"#d4af37":"#ffffff08"}`, borderRadius: 12, padding: 16, marginBottom: 10, cursor: "pointer" }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                  <div>
                    <div style={{ fontWeight: 700 }}>Proyecto #{i+1} - {(p.tipo_proyecto||"cocina").toUpperCase()}</div>
                    <div style={{ fontSize: 12, color: "#555" }}>{Array.isArray(p.estilo)?p.estilo.join(", "):""} - {p.created_at?.split("T")[0]}</div>
                  </div>
                  <div style={{ fontSize: 11, color: "#00bcd4", fontWeight: 700 }}>{p.nivel_calidad||"---"}</div>
                </div>
                {proyectoSel?.created_at === p.created_at && (
                  <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid #ffffff08" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, fontSize: 12, color: "#aaa", marginBottom: 12 }}>
                      {[["Tipo",p.tipo_proyecto],["Estilo",Array.isArray(p.estilo)?p.estilo.join(", "):p.estilo],["Material",Array.isArray(p.material)?p.material.join(", "):p.material],["Nivel",p.nivel_calidad]].filter(([,v])=>v).map(([l,v],j) => (
                        <div key={j}><b style={{color:"#d4af37"}}>{l}:</b> {v}</div>
                      ))}
                    </div>
                    <BTN onClick={e => { e.stopPropagation(); setTipoForm(p.tipo_proyecto||"cocina"); setTab("presupuesto"); }} style={{ fontSize: 12 }}>Hacer Cotizacion</BTN>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* MEMBRESIAS ADMIN */}
        {tab === "membresias" && role === "admin" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 10 }}>
              <div>
                <h1 style={{ color: "#d4af37", margin: 0, fontSize: isMobile?20:26 }}>Talleres Suscritos</h1>
                <p style={{ color: "#555", margin: "4px 0 0", fontSize: 13 }}>Gestiona membresías, planes y zonas</p>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                {tallerMsg && <div style={{ background: tallerMsg.includes("Error")?"#1a0a0a":"#0a2a0a", border: `1px solid ${tallerMsg.includes("Error")?"#f4433640":"#4caf5040"}`, color: tallerMsg.includes("Error")?"#f44336":"#4caf50", borderRadius: 8, padding: "8px 14px", fontSize: 12 }}>{tallerMsg}</div>}
                <BTN onClick={() => setShowNuevoTaller(true)}>+ Agregar Taller</BTN>
              </div>
            </div>

            {/* Stats membresías */}
            <div style={{ display: "grid", gridTemplateColumns: isMobile?"1fr 1fr":"repeat(4,1fr)", gap: 12, marginBottom: 20 }}>
              {[
                ["Total Talleres", talleresMem.length, "#d4af37"],
                ["Plan Basico", talleresMem.filter(t=>t.plan==="basico").length, "#888"],
                ["Plan Pro", talleresMem.filter(t=>t.plan==="pro").length, "#00bcd4"],
                ["Plan Premium", talleresMem.filter(t=>t.plan==="premium").length, "#d4af37"],
              ].map(([l,v,c],i) => (
                <div key={i} style={{ background: "#0f0f0a", border: `1px solid ${c}25`, borderRadius: 12, padding: isMobile?14:18 }}>
                  <div style={{ fontSize: 9, color: "#444", letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>{l}</div>
                  <div style={{ fontSize: isMobile?26:32, fontWeight: 900, color: c }}>{v}</div>
                </div>
              ))}
            </div>

            {/* Ingresos estimados */}
            <div style={{ background: "#1a1208", border: "1px solid #d4af3730", borderRadius: 12, padding: 16, marginBottom: 20 }}>
              <div style={{ fontSize: 11, color: "#555", letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>Ingresos Mensuales Estimados</div>
              <div style={{ fontSize: 28, fontWeight: 900, color: "#d4af37" }}>
                ${(talleresMem.filter(t=>t.plan==="basico"&&t.estado==="activo").length*699 + talleresMem.filter(t=>t.plan==="pro"&&t.estado==="activo").length*1499 + talleresMem.filter(t=>t.plan==="premium"&&t.estado==="activo").length*2999).toLocaleString("es-MX")} MXN
              </div>
              <div style={{ fontSize: 12, color: "#555", marginTop: 4 }}>
                {talleresMem.filter(t=>t.estado==="activo").length} talleres activos · Gastos operativos ~$2,000 MXN
              </div>
            </div>

            {/* Lista talleres */}
            {talleresMem.length === 0 && (
              <div style={{ background: "#0f0f0a", border: "1px solid #ffffff08", borderRadius: 12, padding: 32, textAlign: "center", color: "#555" }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>🏭</div>
                <div style={{ fontSize: 14 }}>No hay talleres registrados aun</div>
                <div style={{ fontSize: 12, marginTop: 6 }}>Agrega tu primer taller con el boton de arriba</div>
              </div>
            )}

            {talleresMem.map((t,i) => {
              const planColor = t.plan === "premium" ? "#d4af37" : t.plan === "pro" ? "#00bcd4" : "#888";
              const estadoColor = t.estado === "activo" ? "#4caf50" : "#f44336";
              const sel = tallerSel?.id === t.id;
              return (
                <div key={t.id} onClick={() => setTallerSel(sel?null:t)}
                  style={{ background: "#0f0f0a", border: `1px solid ${sel?planColor:"#ffffff08"}`, borderRadius: 12, padding: 16, marginBottom: 10, cursor: "pointer", transition: "all .2s" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
                    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                      <div style={{ width: 44, height: 44, borderRadius: "50%", background: `${planColor}20`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>🏭</div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 15 }}>{t.nombre}</div>
                        <div style={{ fontSize: 12, color: "#555" }}>{t.especialidad} · {t.municipio || t.zona}</div>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                      <span style={{ background: `${planColor}20`, border: `1px solid ${planColor}`, color: planColor, borderRadius: 20, padding: "3px 12px", fontSize: 11, fontWeight: 700, textTransform: "uppercase" }}>{t.plan}</span>
                      <span style={{ background: `${estadoColor}15`, border: `1px solid ${estadoColor}40`, color: estadoColor, borderRadius: 20, padding: "3px 12px", fontSize: 11, fontWeight: 700, textTransform: "uppercase" }}>{t.estado}</span>
                    </div>
                  </div>

                  {sel && (
                    <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid #ffffff08" }}>
                      <div style={{ display: "grid", gridTemplateColumns: isMobile?"1fr 1fr":"repeat(3,1fr)", gap: 10, marginBottom: 16, fontSize: 12, color: "#aaa" }}>
                        {[["Email",t.email],["Tel",t.telefono],["Especialidad",t.especialidad],["Zona",t.zona],["Municipio",t.municipio],["Vencimiento",t.fecha_vencimiento],["Leads recibidos",t.leads_recibidos],["Proyectos cerrados",t.proyectos_cerrados]].filter(([,v])=>v).map(([l,v],j) => (
                          <div key={j}><b style={{color:"#d4af37"}}>{l}:</b> {v}</div>
                        ))}
                      </div>
                      {t.notas && <div style={{ fontSize: 12, color: "#888", marginBottom: 14, background: "#0a0a0a", borderRadius: 8, padding: 10 }}>📝 {t.notas}</div>}

                      {/* Cambiar plan */}
                      <div style={{ marginBottom: 12 }}>
                        <div style={{ fontSize: 11, color: "#555", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>Cambiar Plan</div>
                        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                          {[["basico","Basico $699","#888"],["pro","Pro $1,499","#00bcd4"],["premium","Premium $2,999","#d4af37"]].map(([p,l,c]) => (
                            <button key={p} onClick={e => { e.stopPropagation(); actualizarTaller(t.id, {plan:p}); }}
                              style={{ padding: "7px 14px", borderRadius: 20, border: `1px solid ${t.plan===p?c:"#333"}`, background: t.plan===p?`${c}20`:"transparent", color: t.plan===p?c:"#666", fontSize: 12, cursor: "pointer", fontWeight: t.plan===p?700:400 }}>{l}</button>
                          ))}
                        </div>
                      </div>

                      {/* Activar/Desactivar */}
                      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                        <button onClick={e => { e.stopPropagation(); actualizarTaller(t.id, {estado: t.estado==="activo"?"inactivo":"activo"}); }}
                          style={{ padding: "8px 16px", borderRadius: 8, border: `1px solid ${t.estado==="activo"?"#f44336":"#4caf50"}`, background: "transparent", color: t.estado==="activo"?"#f44336":"#4caf50", fontSize: 12, cursor: "pointer", fontWeight: 600 }}>
                          {t.estado==="activo"?"Desactivar Taller":"Activar Taller"}
                        </button>
                        <button onClick={e => { e.stopPropagation(); actualizarTaller(t.id, {leads_recibidos: (t.leads_recibidos||0)+1}); }}
                          style={{ padding: "8px 16px", borderRadius: 8, border: "1px solid #d4af3740", background: "#d4af3710", color: "#d4af37", fontSize: 12, cursor: "pointer", fontWeight: 600 }}>
                          +1 Lead
                        </button>
                        <button onClick={e => { e.stopPropagation(); actualizarTaller(t.id, {proyectos_cerrados: (t.proyectos_cerrados||0)+1}); }}
                          style={{ padding: "8px 16px", borderRadius: 8, border: "1px solid #4caf5040", background: "#4caf5010", color: "#4caf50", fontSize: 12, cursor: "pointer", fontWeight: 600 }}>
                          +1 Cierre
                        </button>
                        <button onClick={async e => { e.stopPropagation(); if(window.confirm(`Eliminar ${t.nombre}?`)) { await sb(`talleres_membresia?id=eq.${t.id}`, {method:"DELETE"}); cargarTalleres(); setTallerSel(null); }}}
                          style={{ padding: "8px 16px", borderRadius: 8, border: "1px solid #f4433640", background: "#f443360a", color: "#f44336", fontSize: 12, cursor: "pointer", fontWeight: 600 }}>
                          Eliminar Taller
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Modal nuevo taller */}
            {showNuevoTaller && (
              <div style={{ position: "fixed", inset: 0, background: "#000000cc", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200, padding: 16 }}>
                <div style={{ background: "#0f0f0a", border: "1px solid #d4af3740", borderRadius: 20, padding: isMobile?20:28, width: "100%", maxWidth: 520, maxHeight: "90vh", overflowY: "auto" }}>
                  <h3 style={{ color: "#d4af37", margin: "0 0 20px", fontSize: 18, fontWeight: 900 }}>Agregar Taller</h3>
                  <div style={{ display: "grid", gridTemplateColumns: isMobile?"1fr":"1fr 1fr", gap: 12 }}>
                    <INPUT label="Nombre del taller" value={nuevoTaller.nombre} onChange={e=>setNuevoTaller(p=>({...p,nombre:e.target.value}))} placeholder="Carpinteria Regia" />
                    <INPUT label="Email" value={nuevoTaller.email} onChange={e=>setNuevoTaller(p=>({...p,email:e.target.value}))} placeholder="taller@email.com" />
                    <INPUT label="Telefono" value={nuevoTaller.telefono} onChange={e=>setNuevoTaller(p=>({...p,telefono:e.target.value}))} placeholder="81-1234-5678" />
                    <INPUT label="Especialidad" value={nuevoTaller.especialidad} onChange={e=>setNuevoTaller(p=>({...p,especialidad:e.target.value}))} placeholder="Cocinas, Closets..." />
                    <INPUT label="Zona / Colonia" value={nuevoTaller.zona} onChange={e=>setNuevoTaller(p=>({...p,zona:e.target.value}))} placeholder="San Pedro, Valle..." />
                    <INPUT label="Municipio" value={nuevoTaller.municipio} onChange={e=>setNuevoTaller(p=>({...p,municipio:e.target.value}))} placeholder="San Pedro Garza Garcia" />
                    <INPUT label="Fecha vencimiento" value={nuevoTaller.fecha_vencimiento} onChange={e=>setNuevoTaller(p=>({...p,fecha_vencimiento:e.target.value}))} type="date" />
                  </div>
                  <div style={{ marginBottom: 14 }}>
                    <label style={{ fontSize: 11, color: "#555", display: "block", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>Plan</label>
                    <div style={{ display: "flex", gap: 8 }}>
                      {[["basico","Basico $699","#888"],["pro","Pro $1,499","#00bcd4"],["premium","Premium $2,999","#d4af37"]].map(([p,l,c]) => (
                        <button key={p} onClick={() => setNuevoTaller(prev=>({...prev,plan:p}))}
                          style={{ flex: 1, padding: "10px 4px", borderRadius: 10, border: `1px solid ${nuevoTaller.plan===p?c:"#2a2a20"}`, background: nuevoTaller.plan===p?`${c}20`:"transparent", color: nuevoTaller.plan===p?c:"#555", fontSize: 12, cursor: "pointer", fontWeight: 700 }}>{l}</button>
                      ))}
                    </div>
                  </div>
                  <TEXTAREA label="Notas internas" value={nuevoTaller.notas} onChange={e=>setNuevoTaller(p=>({...p,notas:e.target.value}))} placeholder="Notas sobre el taller, acuerdos, etc..." rows={2} />
                  <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
                    <BTN onClick={() => setShowNuevoTaller(false)} outline color="#555" style={{ flex: 1 }}>Cancelar</BTN>
                    <BTN onClick={guardarNuevoTaller} style={{ flex: 2 }}>Guardar Taller</BTN>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* IA */}
        {tab === "ia" && (
          <div>
            <h1 style={{ color: "#d4af37", margin: "0 0 8px", fontSize: isMobile?20:24 }}>IA Asesora de Diseño</h1>
            <p style={{ color: "#555", margin: "0 0 20px", fontSize: 13 }}>Recomendaciones personalizadas para tu proyecto</p>

            <div style={{ background: "#0f0f0a", border: "1px solid #1a1a12", borderRadius: 16, padding: "16px 20px", marginBottom: 20 }}>
              <label style={{ fontSize: 11, color: "#555", display: "block", marginBottom: 10, textTransform: "uppercase", letterSpacing: 1 }}>Analizar proyecto tipo</label>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {[["cocina","🍳 Cocina"],["closet","👔 Closet"],["puerta","🚪 Puerta"],["mueble","🛋️ Mueble"]].map(([k,l]) => (
                  <PILL_SINGLE key={k} label={l} checked={tipoForm===k} onChange={() => setTipoForm(k)} />
                ))}
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: isMobile?"1fr":"1fr 1fr", gap: 20 }}>
              <div style={{ background: "#0f0f0a", border: "1px solid #d4af3720", borderRadius: 16, padding: isMobile?16:20 }}>
                <h3 style={{ color: "#d4af37", margin: "0 0 14px", fontSize: 13, letterSpacing: 1 }}>RESUMEN DEL PROYECTO</h3>
                {[
                  ["Tipo", Array.isArray(form.tipo_cocina)?form.tipo_cocina.join(", "):form.tipo_closet?.[0]||""],
                  ["Estilo", Array.isArray(form.estilo)?form.estilo.join(", "):""],
                  ["Material", Array.isArray(form.material)?form.material.join(", "):""],
                  ["Acabado", Array.isArray(form.tipo_acabado)?form.tipo_acabado.join(", "):""],
                  ["Color", form.color_principal],
                ].map(([l,v],i) => (
                  <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8, fontSize: 13 }}>
                    <span style={{ color: "#555", minWidth: 70 }}>{l}:</span>
                    <span style={{ color: v?"#e8e0d0":"#333" }}>{v || "Sin especificar"}</span>
                  </div>
                ))}
                <BTN onClick={analizarConIA} style={{ width: "100%", marginTop: 16, fontSize: 13, padding: "13px", letterSpacing: 1, background: aiLoading?"#1a1a10":"#d4af37", color: aiLoading?"#555":"#000", cursor: aiLoading?"not-allowed":"pointer" }}>
                  {aiLoading?"Analizando...":"ANALIZAR CON IA"}
                </BTN>
              </div>

              <div style={{ background: "#0f0f0a", border: "1px solid #ffffff08", borderRadius: 16, padding: isMobile?16:20, minHeight: 250 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14, flexWrap: "wrap", gap: 8 }}>
                  <h3 style={{ color: "#d4af37", margin: 0, fontSize: 13, letterSpacing: 1 }}>RECOMENDACION</h3>
                  {aiResult && (
                    <div style={{ display: "flex", gap: 6 }}>
                      <BTN onClick={() => compartir("whatsapp", aiResult, "Recomendacion IA - EnKaje Pro")} color="#25D366" textColor="#fff" style={{ fontSize: 10, padding: "6px 10px" }}>WA</BTN>
                      <BTN onClick={() => compartir("email", aiResult, "Recomendacion IA - EnKaje Pro")} outline color="#d4af37" style={{ fontSize: 10, padding: "6px 10px" }}>Email</BTN>
                      <BTN onClick={() => { const w=window.open("","_blank"); w.document.write(`<html><body style="font-family:Georgia;max-width:700px;margin:40px auto;padding:0 20px;line-height:1.8"><h1 style="color:#8B6914">Recomendacion IA - EnKaje Pro</h1><pre style="white-space:pre-wrap">${aiResult}</pre></body></html>`); w.document.close(); w.print(); }} style={{ fontSize: 10, padding: "6px 10px" }}>PDF</BTN>
                    </div>
                  )}
                </div>
                {!aiResult && !aiLoading && <div style={{ textAlign: "center", padding: "30px 20px", color: "#333", fontSize: 13 }}>Llena el formulario y presiona Analizar con IA</div>}
                {aiLoading && <div style={{ color: "#d4af37", fontSize: 13, padding: "20px 0" }}>Analizando especificaciones...</div>}
                {aiResult && <div style={{ fontSize: 13, color: "#e8e0d0", lineHeight: 1.9, whiteSpace: "pre-wrap" }}>{aiResult}</div>}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
