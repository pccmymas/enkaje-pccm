import { useState, useEffect } from "react";
import { LogoInline } from "./Logo.jsx";

// Páginas públicas: /talleres (directorio) y /trabajos (todas las publicaciones)
const SUPABASE_URL = "https://iucoggyualkyojmmgael.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml1Y29nZ3l1YWxreW9qbW1nYWVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAwMTMxOTMsImV4cCI6MjA5NTU4OTE5M30.QNU604KcLaSxXxoZaxmVbt-sf-aFDTjrVoTR4K-wy5c";
const GOLD = "#d4af37";

const ZONAS = [
  "Monterrey", "San Pedro Garza García", "San Nicolás de los Garza", "Guadalupe",
  "Apodaca", "Santa Catarina", "Escobedo", "García", "Juárez", "Cadereyta Jiménez",
];
const TIPOS = [
  ["cocina", "🍳 Cocinas"], ["closet", "👔 Closets"], ["puerta", "🚪 Puertas"],
  ["mueble", "🛋️ Muebles"], ["panel", "🪵 Paneles"], ["bano", "🚿 Baños"],
];
const TIPO_LBL = { cocina: "Cocina", closet: "Closet", puerta: "Puerta", mueble: "Mueble", panel: "Panel", bano: "Baño" };

const norm = x => String(x || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();
const lista = x => String(x || "").split(",").map(norm).filter(Boolean);
const fotosDe = p => String(p?.fotos || "").split(",").filter(Boolean);

const CSS = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #070708; color: #e8e0d0; }
  .btn-gold { background: ${GOLD}; color: #000; border: none; border-radius: 12px; padding: 12px 22px; font-weight: 700; font-size: 14px; cursor: pointer; text-decoration: none; display: inline-block; }
  .btn-gold:hover { background: #e8c84a; }
  .btn-out { background: transparent; color: #e8e0d0; border: 1.5px solid #333; border-radius: 12px; padding: 11px 20px; font-weight: 600; font-size: 14px; cursor: pointer; text-decoration: none; display: inline-block; }
  .btn-out:hover { border-color: ${GOLD}; color: ${GOLD}; }
  .tarjeta { background: #0f0f0a; border: 1px solid #1a1a12; border-radius: 16px; overflow: hidden; transition: all .2s; cursor: pointer; text-decoration: none; color: inherit; display: block; }
  .tarjeta:hover { border-color: ${GOLD}50; transform: translateY(-3px); }
  .nav-a { color: #888; text-decoration: none; font-size: 14px; font-weight: 600; }
  .nav-a:hover, .nav-a.on { color: ${GOLD}; }
  .grid3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
  @media (max-width: 860px) { .grid3 { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 560px) { .grid3 { grid-template-columns: 1fr; } .hide-m { display: none !important; } }
`;

const pill = on => ({
  padding: "7px 14px", borderRadius: 50, border: `1.5px solid ${on ? GOLD : "#2a2a20"}`,
  background: on ? `${GOLD}20` : "transparent", color: on ? GOLD : "#999",
  fontSize: 13, fontWeight: on ? 700 : 500, cursor: "pointer", whiteSpace: "nowrap",
});

function useFiltros() {
  const q = new URLSearchParams(window.location.search);
  const [zona, setZona] = useState(ZONAS.find(z => norm(z) === norm(q.get("zona"))) || "");
  const [tipo, setTipo] = useState(TIPOS.find(([k]) => k === q.get("tipo"))?.[0] || "");
  useEffect(() => {
    const p = new URLSearchParams();
    if (zona) p.set("zona", zona);
    if (tipo) p.set("tipo", tipo);
    const s = p.toString();
    window.history.replaceState({}, "", window.location.pathname + (s ? "?" + s : ""));
  }, [zona, tipo]);
  return { zona, setZona, tipo, setTipo };
}

function Filtros({ zona, setZona, tipo, setTipo }) {
  return (
    <div style={{ background: "#0f0f0a", border: "1px solid #1a1a12", borderRadius: 16, padding: 16, marginBottom: 24 }}>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
        <button onClick={() => setTipo("")} style={pill(!tipo)}>Todo</button>
        {TIPOS.map(([k, l]) => <button key={k} onClick={() => setTipo(tipo === k ? "" : k)} style={pill(tipo === k)}>{l}</button>)}
      </div>
      <select value={zona} onChange={e => setZona(e.target.value)}
        style={{ width: "100%", maxWidth: 340, padding: "10px 12px", background: "#0a0a08", border: "1px solid #2a2a20", borderRadius: 10, color: "#e8e0d0", fontSize: 14 }}>
        <option value="">📍 Todas las zonas</option>
        {ZONAS.map(z => <option key={z} value={z}>{z}</option>)}
      </select>
    </div>
  );
}

function Nav({ vista }) {
  return (
    <nav style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(7,7,8,0.96)", borderBottom: "1px solid #1a1a12", padding: "14px 20px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
        <a href="/" style={{ textDecoration: "none" }}><LogoInline size="nav" /></a>
        <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
          <a href="/talleres" className={`nav-a ${vista === "talleres" ? "on" : ""}`}>Talleres</a>
          <a href="/trabajos" className={`nav-a ${vista === "trabajos" ? "on" : ""}`}>Trabajos</a>
          <a href="/blog" className="nav-a hide-m">Blog</a>
          <a href="/portal" className="btn-gold hide-m" style={{ padding: "9px 16px", fontSize: 13 }}>Pedir cotización</a>
        </div>
      </div>
    </nav>
  );
}

function Vacio({ texto }) {
  return (
    <div style={{ background: "#0f0f0a", border: "1px solid #1a1a12", borderRadius: 16, padding: "36px 24px", textAlign: "center" }}>
      <div style={{ fontSize: 36, marginBottom: 12 }}>🔨</div>
      <div style={{ fontSize: 15, color: "#ccc", marginBottom: 6 }}>{texto}</div>
      <div style={{ fontSize: 13, color: "#777", marginBottom: 20, lineHeight: 1.6 }}>Estamos verificando talleres en todo Monterrey y su área metropolitana.<br />Igual puedes pedir tu cotización: le llega a los talleres verificados de tu zona.</div>
      <a href="/portal" className="btn-gold">Pedir cotización gratis →</a>
    </div>
  );
}

function ModalTrabajo({ pub, onClose }) {
  if (!pub) return null;
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.9)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div onClick={e => e.stopPropagation()} style={{ background: "#0f0f0a", border: `1px solid ${GOLD}40`, borderRadius: 18, maxWidth: 620, width: "100%", maxHeight: "90vh", overflowY: "auto", position: "relative" }}>
        <button onClick={onClose} style={{ position: "absolute", top: 10, right: 10, zIndex: 2, background: GOLD, color: "#000", border: "none", borderRadius: "50%", width: 36, height: 36, fontSize: 16, fontWeight: 900, cursor: "pointer" }}>✕</button>
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {fotosDe(pub).map(u => <img key={u} src={u} alt={`${TIPO_LBL[pub.tipo_proyecto] || "Trabajo"} en ${pub.municipio}`} style={{ width: "100%", display: "block" }} />)}
        </div>
        <div style={{ padding: 20 }}>
          <div style={{ fontSize: 16, fontWeight: 700 }}>{TIPO_LBL[pub.tipo_proyecto] || pub.tipo_proyecto} · <span style={{ color: "#888", fontWeight: 400 }}>{pub.municipio}</span></div>
          <div style={{ fontSize: 13, color: GOLD, margin: "4px 0 12px" }}>✓ {pub.taller_nombre} · Verificado por EnKaje Pro</div>
          {pub.descripcion && <p style={{ fontSize: 14, color: "#aaa", lineHeight: 1.7, marginBottom: 16 }}>{pub.descripcion}</p>}
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <a href={`/taller/${pub.taller_slug}`} className="btn-out">Ver taller</a>
            <a href="/portal" className="btn-gold">Pedir cotización →</a>
          </div>
        </div>
      </div>
    </div>
  );
}

function PaginaTalleres() {
  const { zona, setZona, tipo, setTipo } = useFiltros();
  const [talleres, setTalleres] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    fetch(`${SUPABASE_URL}/rest/v1/directorio_talleres?apikey=${SUPABASE_KEY}`, { headers: { "Authorization": `Bearer ${SUPABASE_KEY}` } })
      .then(r => r.json()).then(d => { if (Array.isArray(d)) setTalleres(d); })
      .catch(() => {}).finally(() => setCargando(false));
  }, []);

  useEffect(() => {
    document.title = zona ? `Talleres de carpintería en ${zona} · EnKaje Pro` : "Talleres de carpintería verificados en Monterrey · EnKaje Pro";
  }, [zona]);

  const filtrados = talleres
    .filter(t => !zona || lista(t.zonas_cobertura || t.municipio).includes(norm(zona)))
    .filter(t => !tipo || lista(t.tipos_proyecto).includes(tipo))
    .sort((a, b) => (b.verificado === true) - (a.verificado === true)
      || new Date(b.ultima_publicacion || 0) - new Date(a.ultima_publicacion || 0)
      || String(a.nombre).localeCompare(String(b.nombre)));

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 20px 80px" }}>
      <h1 style={{ fontSize: 30, fontWeight: 900, color: "#f0e8dc", marginBottom: 8 }}>
        Talleres de carpintería <span style={{ color: GOLD }}>{zona ? `en ${zona}` : "verificados"}</span>
      </h1>
      <p style={{ fontSize: 14, color: "#888", marginBottom: 20, lineHeight: 1.6 }}>Cada taller pasó una verificación por videollamada o visita antes de aparecer aquí.</p>
      <Filtros zona={zona} setZona={setZona} tipo={tipo} setTipo={setTipo} />
      {cargando ? <div style={{ color: GOLD, padding: 20 }}>Cargando talleres...</div>
        : filtrados.length === 0 ? <Vacio texto={zona || tipo ? "Todavía no hay talleres verificados con ese filtro." : "Todavía no hay talleres en el directorio."} />
        : (
          <>
            <div style={{ fontSize: 12, color: "#777", marginBottom: 12 }}>{filtrados.length} {filtrados.length === 1 ? "taller" : "talleres"}</div>
            <div className="grid3">
              {filtrados.map(t => {
                const tipos = lista(t.tipos_proyecto).map(k => TIPO_LBL[k]).filter(Boolean);
                return (
                  <a key={t.slug} href={`/taller/${t.slug}`} className="tarjeta">
                    <div style={{ aspectRatio: "16/10", background: "#1a1a12", position: "relative" }}>
                      {t.foto_portada
                        ? <img src={t.foto_portada} alt={`Trabajo de ${t.nombre}`} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} onError={e => { e.target.style.display = "none"; }} />
                        : <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40 }}>🏭</div>}
                      {Number(t.num_trabajos) > 0 && <div style={{ position: "absolute", bottom: 8, right: 8, background: "rgba(7,7,8,0.85)", color: GOLD, borderRadius: 20, padding: "3px 10px", fontSize: 11, fontWeight: 700 }}>📷 {t.num_trabajos} {Number(t.num_trabajos) === 1 ? "trabajo" : "trabajos"}</div>}
                    </div>
                    <div style={{ padding: 16 }}>
                      <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 8 }}>
                        <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#fff", overflow: "hidden", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                          {t.logo_url ? <img src={t.logo_url} alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }} /> : <span style={{ fontSize: 16 }}>🏭</span>}
                        </div>
                        <div style={{ fontWeight: 700, fontSize: 15, color: "#e8e0d0" }}>{t.nombre}</div>
                      </div>
                      {tipos.length > 0 && <div style={{ fontSize: 12, color: GOLD, marginBottom: 6 }}>{tipos.join(" · ")}</div>}
                      <div style={{ fontSize: 12, color: "#888", marginBottom: 6 }}>📍 {t.municipio}{t.anos_experiencia ? ` · ${t.anos_experiencia} años de experiencia` : ""}</div>
                      <div style={{ fontSize: 11, color: "#4caf50", fontWeight: 700 }}>✓ Verificado por EnKaje Pro</div>
                    </div>
                  </a>
                );
              })}
            </div>
          </>
        )}
    </div>
  );
}

function PaginaTrabajos() {
  const { zona, setZona, tipo, setTipo } = useFiltros();
  const [pubs, setPubs] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [sel, setSel] = useState(null);

  useEffect(() => {
    fetch(`${SUPABASE_URL}/rest/v1/publicaciones_publicas?order=created_at.desc&limit=120&apikey=${SUPABASE_KEY}`, { headers: { "Authorization": `Bearer ${SUPABASE_KEY}` } })
      .then(r => r.json()).then(d => { if (Array.isArray(d)) setPubs(d); })
      .catch(() => {}).finally(() => setCargando(false));
  }, []);

  useEffect(() => {
    document.title = "Trabajos de carpintería en Monterrey · EnKaje Pro";
  }, []);

  const filtrados = pubs
    .filter(p => !zona || norm(p.municipio) === norm(zona))
    .filter(p => !tipo || p.tipo_proyecto === tipo);

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 20px 80px" }}>
      <h1 style={{ fontSize: 30, fontWeight: 900, color: "#f0e8dc", marginBottom: 8 }}>
        Trabajos de <span style={{ color: GOLD }}>talleres verificados</span>
      </h1>
      <p style={{ fontSize: 14, color: "#888", marginBottom: 20, lineHeight: 1.6 }}>Proyectos terminados que publicaron los talleres de EnKaje Pro. Toca uno para ver todas sus fotos.</p>
      <Filtros zona={zona} setZona={setZona} tipo={tipo} setTipo={setTipo} />
      {cargando ? <div style={{ color: GOLD, padding: 20 }}>Cargando trabajos...</div>
        : filtrados.length === 0 ? <Vacio texto={zona || tipo ? "Todavía no hay trabajos publicados con ese filtro." : "Todavía no hay trabajos publicados."} />
        : (
          <div className="grid3">
            {filtrados.map(p => (
              <div key={p.id} className="tarjeta" onClick={() => setSel(p)}>
                <div style={{ aspectRatio: "4/3", background: "#1a1a12", position: "relative" }}>
                  <img src={fotosDe(p)[0]} alt={`${TIPO_LBL[p.tipo_proyecto] || "Trabajo"} en ${p.municipio}`} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  {fotosDe(p).length > 1 && <div style={{ position: "absolute", bottom: 8, right: 8, background: "rgba(7,7,8,0.85)", color: GOLD, borderRadius: 20, padding: "3px 10px", fontSize: 11, fontWeight: 700 }}>📷 {fotosDe(p).length}</div>}
                </div>
                <div style={{ padding: "12px 16px" }}>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{TIPO_LBL[p.tipo_proyecto] || p.tipo_proyecto} · <span style={{ color: "#888", fontWeight: 400 }}>{p.municipio}</span></div>
                  <div style={{ fontSize: 12, color: GOLD, marginTop: 4 }}>✓ {p.taller_nombre}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      <ModalTrabajo pub={sel} onClose={() => setSel(null)} />
    </div>
  );
}

export default function Directorio({ vista }) {
  return (
    <div style={{ background: "#070708", minHeight: "100vh" }}>
      <style>{CSS}</style>
      <Nav vista={vista} />
      {vista === "trabajos" ? <PaginaTrabajos /> : <PaginaTalleres />}
      <footer style={{ borderTop: "1px solid #1a1a12", padding: "24px 20px", textAlign: "center", fontSize: 12, color: "#777" }}>
        <a href="/" style={{ color: GOLD, textDecoration: "none", fontWeight: 700 }}>EnKaje Pro</a> · Talleres de carpintería verificados en Monterrey
        <div style={{ marginTop: 10 }}><a href="/app?registro=taller" style={{ color: "#999" }}>¿Tienes un taller? Regístralo gratis</a></div>
      </footer>
    </div>
  );
}
