import { useState, useEffect, useRef } from "react";
import { LogoInline } from "./Logo.jsx";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@300;400;500;600;700&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'DM Sans', sans-serif; background: #070708; color: #e8e0d0; overflow-x: hidden; }
  h1,h2,h3 { font-family: 'Playfair Display', serif; }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-thumb { background: #d4af3740; border-radius: 2px; }
  @keyframes fadeUp { from { opacity:0; transform:translateY(32px); } to { opacity:1; transform:translateY(0); } }
  @keyframes float { 0%,100% { transform:translateY(0px); } 50% { transform:translateY(-12px); } }
  @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
  .fade-up { animation: fadeUp 0.7s ease forwards; }
  .fade-up-d2 { animation: fadeUp 0.7s 0.2s ease both; }
  .float { animation: float 5s ease-in-out infinite; }
  .btn-cliente { background: #d4af37; color: #000; border: none; border-radius: 14px; padding: 16px 32px; font-weight: 700; font-size: 15px; cursor: pointer; transition: all .25s; font-family: 'DM Sans', sans-serif; display: inline-flex; align-items: center; gap: 8px; }
  .btn-cliente:hover { background: #e8c84a; transform: translateY(-3px); box-shadow: 0 12px 32px #d4af3750; }
  .btn-taller { background: transparent; color: #e8e0d0; border: 1.5px solid #333; border-radius: 14px; padding: 16px 32px; font-weight: 600; font-size: 15px; cursor: pointer; transition: all .25s; font-family: 'DM Sans', sans-serif; display: inline-flex; align-items: center; gap: 8px; }
  .btn-taller:hover { border-color: #d4af37; color: #d4af37; transform: translateY(-2px); }
  .btn-wa { background: #25D366; color: #fff; border: none; border-radius: 14px; padding: 16px 32px; font-weight: 700; font-size: 15px; cursor: pointer; transition: all .25s; font-family: 'DM Sans', sans-serif; text-decoration: none; display: inline-flex; align-items: center; gap: 8px; }
  .btn-wa:hover { background: #20b858; transform: translateY(-2px); box-shadow: 0 8px 24px #25D36650; }
  .card { background: #0f0f0a; border: 1px solid #1a1a12; border-radius: 20px; padding: 28px; transition: all .3s; }
  .card:hover { border-color: #d4af3740; transform: translateY(-4px); box-shadow: 0 20px 48px rgba(0,0,0,0.5); }
  .pill { display: inline-block; background: #d4af3715; border: 1px solid #d4af3740; color: #d4af37; border-radius: 50px; padding: 5px 16px; font-size: 11px; font-weight: 700; letter-spacing: 2px; font-family: 'DM Sans', sans-serif; }
  .nav-link { color: #666; text-decoration: none; font-size: 14px; transition: color .2s; font-weight: 500; }
  .nav-link:hover { color: #d4af37; }
  .legal-link { font-size: 13px; color: #444; background: transparent; border: none; cursor: pointer; transition: color .2s; text-decoration: underline; font-family: 'DM Sans', sans-serif; }
  .legal-link:hover { color: #d4af37; }
  .tab-btn { background: transparent; border: none; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all .2s; }
  .taller-card { background: #0f0f0a; border: 1px solid #1a1a12; border-radius: 16px; padding: 20px; transition: all .3s; cursor: pointer; }
  .taller-card:hover { border-color: #d4af3750; transform: translateY(-3px); box-shadow: 0 16px 40px rgba(0,0,0,0.4); }
  .filter-btn { background: transparent; border: 1px solid #1a1a12; border-radius: 50px; padding: 7px 16px; font-size: 12px; font-weight: 600; cursor: pointer; transition: all .2s; font-family: 'DM Sans', sans-serif; color: #555; }
  .filter-btn.active { background: #d4af3715; border-color: #d4af37; color: #d4af37; }
  .filter-btn:hover { border-color: #d4af3740; color: #d4af37; }
  @media (max-width: 768px) {
    .hide-mobile { display: none !important; }
    .grid-mobile-1 { grid-template-columns: 1fr !important; }
    .hero-title { font-size: 34px !important; line-height: 1.15 !important; }
    .section-title { font-size: 28px !important; }
    .container { padding: 0 16px !important; }
    .nav-links { display: none !important; }
    .hero-btns { flex-direction: column !important; align-items: stretch !important; }
    .hero-btns button, .hero-btns a { text-align: center; justify-content: center; }
  }
`;

const TALLERES_DEMO = [
  { nombre: "Cocinas Regia", especialidad: "Cocinas integrales", zona: "San Pedro Garza García", plan: "premium", anos: 12, emoji: "🍳", proyectos: 148, badge: "⭐ Destacado" },
  { nombre: "Closets del Norte", especialidad: "Closets y vestidores", zona: "Monterrey Centro", plan: "pro", anos: 8, emoji: "👔", proyectos: 94, badge: null },
  { nombre: "Carpintería Moderna MTY", especialidad: "Muebles a medida", zona: "San Nicolás de los Garza", plan: "pro", anos: 6, emoji: "🛋️", proyectos: 72, badge: null },
  { nombre: "Puertas y Cancelería RG", especialidad: "Puertas y cancelería", zona: "Guadalupe", plan: "premium", anos: 15, emoji: "🚪", proyectos: 210, badge: "⭐ Destacado" },
  { nombre: "Ebanistería Premium", especialidad: "Cocinas y muebles", zona: "Santa Catarina", plan: "pro", anos: 10, emoji: "🍳", proyectos: 115, badge: null },
  { nombre: "Muebles y Lambrin MTY", especialidad: "Paneles y entretenimiento", zona: "Apodaca", plan: "pro", anos: 5, emoji: "📺", proyectos: 58, badge: null },
];

const FILTROS = ["Todos", "Cocinas", "Closets", "Puertas", "Muebles", "Entretenimiento"];

const FOTOS_ESTILOS = [
  { label: "Cocina Moderna", img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=700&q=85&fit=crop", tag: "Lo más pedido" },
  { label: "Closet Walk-in", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=85&fit=crop", tag: "Tendencia 2026" },
  { label: "Área de Entretenimiento", img: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=700&q=85&fit=crop", tag: "Muy solicitado" },
  { label: "Mueble a Medida", img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=700&q=85&fit=crop", tag: "Personalizable" },
];

const PASOS_CLIENTE = [
  { num: "01", emoji: "📸", titulo: "Sube una foto", desc: "De tu cocina, recámara o espacio actual. Así como está." },
  { num: "02", emoji: "🎨", titulo: "Elige el estilo", desc: "Moderno, rústico, nórdico, industrial y más opciones." },
  { num: "03", emoji: "🤖", titulo: "IA genera el render", desc: "En segundos ves cómo quedaría tu proyecto terminado." },
  { num: "04", emoji: "💬", titulo: "Recibe cotizaciones", desc: "Talleres verificados te contactan con precios reales." },
];

const PASOS_TALLER = [
  { num: "01", emoji: "📋", titulo: "Llena el levantamiento", desc: "Formulario profesional de cocina, closet, puerta o mueble con todas las especificaciones." },
  { num: "02", emoji: "💰", titulo: "Genera el presupuesto", desc: "PDF profesional con desglose de precios, formas de pago y garantías listo para compartir." },
  { num: "03", emoji: "📄", titulo: "Firma el contrato", desc: "Contrato digital con cláusulas, penalizaciones y datos del cliente. Todo protegido." },
  { num: "04", emoji: "⭐", titulo: "Recibe reseñas", desc: "El cliente califica el trabajo. Tu reputación crece con cada proyecto cerrado." },
];

const FUNCIONES_TALLER = [
  { icon: "📋", titulo: "Levantamiento digital", desc: "4 formularios especializados: cocina, closet, puerta y mueble. Con checkboxes de materiales, acabados y herrajes.", color: "#d4af37" },
  { icon: "🖨️", titulo: "Presupuesto en PDF", desc: "Cotizaciones profesionales con logo, desglose de precios, forma de pago y tiempo de entrega. Comparte por WhatsApp.", color: "#00bcd4" },
  { icon: "📄", titulo: "Contratos digitales", desc: "Contrato de fabricación con cláusulas de garantía, penalizaciones y pagos. Sin papel, sin riesgos.", color: "#4caf50" },
  { icon: "🤖", titulo: "IA cotizadora", desc: "Describe el proyecto y la IA genera lista de materiales con precios en Monterrey. Lista para compartir.", color: "#f0a500" },
  { icon: "🎨", titulo: "Renders de diseño", desc: "Genera renders fotorrealistas para mostrarle al cliente cómo quedaría su proyecto antes de fabricarlo.", color: "#e91e63" },
  { icon: "📊", titulo: "Pipeline visual", desc: "Kanban de proyectos: Nuevo → Revisando → Cotizado → Cerrado. Todo en un solo lugar desde tu celular.", color: "#9c27b0" },
  { icon: "⭐", titulo: "Leads con scoring", desc: "Cada lead llega con foto, medidas, estilo y puntuación 0–100 de intención de compra.", color: "#d4af37" },
  { icon: "📱", titulo: "Contenido para redes", desc: "IA genera captions e hashtags para Instagram, Facebook y TikTok con un clic.", color: "#00bcd4" },
];

const ZONAS = ["San Pedro Garza García", "Monterrey Centro", "San Nicolás de los Garza", "Guadalupe", "Santa Catarina", "Apodaca", "Escobedo", "García"];

const PLANES = [
  { nombre: "Básico", precio: "699", color: "#888", features: ["Hasta 5 leads/mes", "Formularios de levantamiento", "Presupuesto en PDF", "Perfil en el directorio", "Soporte por email"] },
  { nombre: "Pro", precio: "1,499", color: "#00bcd4", popular: true, features: ["Leads ilimitados", "Scoring de leads visible", "Contratos digitales", "IA cotizadora de materiales", "Renders de diseño", "Contenido para redes sociales", "Soporte prioritario"] },
  { nombre: "Premium", precio: "2,999", color: "#d4af37", features: ["Todo el Plan Pro", "Expediente completo del cliente", "Leads prioritarios primero", "Sugerencia IA de respuesta", "Perfil destacado en directorio", "Onboarding personal", "Soporte 24/7"] },
];

export default function Landing() {
  const [scrolled, setScrolled] = useState(false);
  const [audiencia, setAudiencia] = useState("cliente");
  const [fotoIdx, setFotoIdx] = useState(0);
  const [filtroTaller, setFiltroTaller] = useState("Todos");
  const intervalRef = useRef(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    intervalRef.current = setInterval(() => setFotoIdx(i => (i + 1) % FOTOS_ESTILOS.length), 3800);
    return () => clearInterval(intervalRef.current);
  }, []);

  const goPortal = () => window.location.href = "/portal";
  const goApp = () => window.location.href = "/app";
  const goLegal = (p) => window.location.href = `/app?legal=${p}`;

  const talleresFiltrados = filtroTaller === "Todos" ? TALLERES_DEMO : TALLERES_DEMO.filter(t =>
    filtroTaller === "Cocinas" ? t.especialidad.toLowerCase().includes("cocina") :
    filtroTaller === "Closets" ? t.especialidad.toLowerCase().includes("closet") :
    filtroTaller === "Puertas" ? t.especialidad.toLowerCase().includes("puerta") :
    filtroTaller === "Muebles" ? t.especialidad.toLowerCase().includes("mueble") :
    t.especialidad.toLowerCase().includes("panel") || t.especialidad.toLowerCase().includes("entret")
  );

  return (
    <div style={{ background: "#070708", minHeight: "100vh" }}>
      <style>{CSS}</style>

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: scrolled ? "rgba(7,7,8,0.96)" : "transparent", backdropFilter: scrolled ? "blur(12px)" : "none", borderBottom: scrolled ? "1px solid #1a1a12" : "none", transition: "all .3s", padding: "0 24px" }}>
        <div className="container" style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 0" }}>
          <div style={{ cursor: "pointer" }} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <LogoInline size="nav" />
          </div>
          <div className="nav-links" style={{ display: "flex", gap: 32, alignItems: "center" }}>
            {[["#como-funciona","Cómo funciona"],["#directorio","Talleres"],["#precios","Precios"]].map(([h,l]) => (
              <a key={h} href={h} className="nav-link">{l}</a>
            ))}
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <button onClick={goApp} className="btn-taller" style={{ padding: "9px 18px", fontSize: 13 }}>Soy un taller</button>
            <button onClick={goPortal} className="btn-cliente" style={{ padding: "9px 18px", fontSize: 13 }}>Visualizar gratis →</button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "120px 24px 80px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "15%", left: "50%", transform: "translateX(-50%)", width: 700, height: 700, background: "radial-gradient(circle, #d4af3712 0%, transparent 65%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(#d4af3706 1px, transparent 1px), linear-gradient(90deg, #d4af3706 1px, transparent 1px)", backgroundSize: "48px 48px", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1000, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 32 }}>
            <div style={{ background: "#0f0f0a", border: "1px solid #1a1a12", borderRadius: 50, padding: 4, display: "flex", gap: 4 }}>
              {[["cliente","🏠 Tengo un proyecto"],["taller","🏭 Tengo un taller"]].map(([k,l]) => (
                <button key={k} onClick={() => setAudiencia(k)} className="tab-btn" style={{ padding: "9px 20px", borderRadius: 50, fontSize: 13, fontWeight: 700, background: audiencia === k ? "#d4af37" : "transparent", color: audiencia === k ? "#000" : "#555" }}>{l}</button>
              ))}
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }} className="grid-mobile-1">
            <div className="fade-up">
              <div className="pill" style={{ marginBottom: 20 }}>{audiencia === "cliente" ? "VISUALIZA ANTES DE GASTAR" : "MÁS CLIENTES, MENOS TIEMPO PERDIDO"}</div>
              <h1 className="hero-title" style={{ fontSize: 50, fontWeight: 900, lineHeight: 1.1, marginBottom: 20, color: "#f0e8dc" }}>
                {audiencia === "cliente" ? (<>Ve cómo quedará tu<br /><span style={{ color: "#d4af37" }}>proyecto antes de pagarlo</span></>) : (<>Recibe clientes<br /><span style={{ color: "#d4af37" }}>listos para comprar</span></>)}
              </h1>
              <p style={{ fontSize: 16, color: "#666", lineHeight: 1.8, marginBottom: 32 }}>
                {audiencia === "cliente" ? "Sube una foto de tu espacio, elige el estilo y nuestra IA genera un render realista en segundos. Gratis, sin registro, sin compromiso." : "Formularios de levantamiento, presupuestos en PDF, contratos digitales, IA de materiales, renders y leads calificados. Todo en una sola plataforma."}
              </p>
              <div className="hero-btns" style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 28 }}>
                {audiencia === "cliente" ? (
                  <>
                    <button onClick={goPortal} className="btn-cliente" style={{ fontSize: 15, padding: "15px 28px" }}>📸 Visualizar mi proyecto gratis</button>
                    <a href="https://wa.me/528127176786" target="_blank" rel="noreferrer" className="btn-wa" style={{ fontSize: 15, padding: "15px 24px" }}>💬 Hablar con asesor</a>
                  </>
                ) : (
                  <>
                    <button onClick={goApp} className="btn-cliente" style={{ fontSize: 15, padding: "15px 28px" }}>🚀 Quiero más clientes →</button>
                    <a href="https://wa.me/528127176786" target="_blank" rel="noreferrer" className="btn-wa" style={{ fontSize: 15, padding: "15px 24px" }}>💬 Hablar con Felipe</a>
                  </>
                )}
              </div>
              <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
                {(audiencia === "cliente" ? ["✓ Gratis","✓ Sin registro","✓ Render en segundos"] : ["✓ 1er mes gratis","✓ Sin permanencia","✓ Leads calificados"]).map((t,i) => <span key={i} style={{ fontSize: 13, color: "#444", fontWeight: 500 }}>{t}</span>)}
              </div>
            </div>
            <div className="float fade-up-d2">
              {audiencia === "cliente" ? (
                <div style={{ position: "relative" }}>
                  <div style={{ background: "#0f0f0a", border: "1px solid #d4af3730", borderRadius: 20, overflow: "hidden" }}>
                    <div style={{ position: "relative", height: 260, overflow: "hidden" }}>
                      <img key={fotoIdx} src={FOTOS_ESTILOS[fotoIdx].img} alt={FOTOS_ESTILOS[fotoIdx].label} style={{ width: "100%", height: "100%", objectFit: "cover", animation: "fadeIn 0.6s ease", display: "block" }} onError={e => { e.target.style.display="none"; }} />
                      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
                        <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 15, fontWeight: 900, color: "rgba(212,175,55,0.28)", transform: "rotate(-25deg)", letterSpacing: 3, userSelect: "none" }}>EnKaje Pro · Vista Previa</div>
                      </div>
                      <div style={{ position: "absolute", top: 12, left: 12, background: "#d4af37", color: "#000", borderRadius: 20, padding: "4px 12px", fontSize: 11, fontWeight: 700 }}>{FOTOS_ESTILOS[fotoIdx].tag}</div>
                      <div style={{ position: "absolute", top: 12, right: 12, background: "rgba(7,7,8,0.8)", color: "#d4af37", borderRadius: 20, padding: "4px 12px", fontSize: 11, fontWeight: 700 }}>{FOTOS_ESTILOS[fotoIdx].label}</div>
                      <div style={{ position: "absolute", bottom: 12, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 6 }}>
                        {FOTOS_ESTILOS.map((_,i) => (<button key={i} onClick={() => setFotoIdx(i)} style={{ width: i===fotoIdx?20:6, height: 6, borderRadius: 3, background: i===fotoIdx?"#d4af37":"#ffffff40", border: "none", cursor: "pointer", transition: "all .3s", padding: 0 }} />))}
                      </div>
                    </div>
                    <div style={{ padding: "16px 20px" }}>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
                        {[["$35K–$120K","Inversión estimada"],["15–35 días","Tiempo típico"],["6 meses","Garantía"]].map(([v,l],i) => (
                          <div key={i} style={{ background: "#0a0a08", borderRadius: 8, padding: "8px 10px", textAlign: "center" }}>
                            <div style={{ fontSize: 12, fontWeight: 700, color: "#d4af37" }}>{v}</div>
                            <div style={{ fontSize: 9, color: "#444", marginTop: 2 }}>{l}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div style={{ position: "absolute", bottom: -16, right: -16, background: "#0f0f0a", border: "1px solid #d4af3740", borderRadius: 14, padding: "10px 16px", fontSize: 12, color: "#d4af37", fontWeight: 700, boxShadow: "0 8px 24px rgba(0,0,0,0.5)" }}>🤖 Generado con IA en 20s</div>
                </div>
              ) : (
                <div style={{ background: "#0f0f0a", border: "1px solid #d4af3730", borderRadius: 20, padding: 24 }}>
                  <div style={{ fontSize: 11, color: "#d4af37", fontWeight: 700, letterSpacing: 2, marginBottom: 16 }}>🛠️ HERRAMIENTAS DEL TALLER</div>
                  {[["📋","Levantamiento digital","Cocina, closet, puerta, mueble"],["💰","Presupuesto PDF","Con desglose y forma de pago"],["📄","Contrato digital","Cláusulas y firmas protegidas"],["🤖","IA de materiales","Lista con precios en Monterrey"],["🎨","Renders de diseño","Fotorrealistas en segundos"],["⭐","Leads calificados","Con foto, medidas y scoring"]].map(([e,l,d],i) => (
                    <div key={i} style={{ display: "flex", gap: 12, padding: "9px 0", borderBottom: i<5?"1px solid #1a1a12":"none", alignItems: "center" }}>
                      <span style={{ fontSize: 18, flexShrink: 0 }}>{e}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: "#e8e0d0" }}>{l}</div>
                        <div style={{ fontSize: 11, color: "#444" }}>{d}</div>
                      </div>
                      <span style={{ color: "#4caf50", fontSize: 12 }}>✓</span>
                    </div>
                  ))}
                  <button onClick={goApp} className="btn-cliente" style={{ width: "100%", justifyContent: "center", marginTop: 16, fontSize: 13, padding: "12px" }}>Ver todas las funciones →</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section id="como-funciona" style={{ padding: "80px 24px", background: "#0f0f0a" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div className="pill" style={{ marginBottom: 16 }}>ASÍ FUNCIONA</div>
            <h2 className="section-title" style={{ fontSize: 38, fontWeight: 900, marginBottom: 16, color: "#f0e8dc" }}>
              {audiencia === "cliente" ? "De la idea a la cotización en 4 pasos" : "Todo lo que necesitas para cerrar más proyectos"}
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }} className="grid-mobile-1">
            {(audiencia === "cliente" ? PASOS_CLIENTE : PASOS_TALLER).map((p,i) => (
              <div key={i} className="card" style={{ textAlign: "center", position: "relative" }}>
                <div style={{ fontSize: 11, color: "#d4af37", fontWeight: 700, letterSpacing: 2, marginBottom: 12 }}>{p.num}</div>
                <div style={{ fontSize: 36, marginBottom: 14 }}>{p.emoji}</div>
                <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 10, color: "#e8e0d0" }}>{p.titulo}</div>
                <div style={{ fontSize: 13, color: "#555", lineHeight: 1.7 }}>{p.desc}</div>
                {i < 3 && <div className="hide-mobile" style={{ position: "absolute", top: "42%", right: -16, color: "#d4af3740", fontSize: 22, zIndex: 1 }}>→</div>}
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 40 }}>
            <button onClick={audiencia === "cliente" ? goPortal : goApp} className="btn-cliente" style={{ fontSize: 15, padding: "14px 36px" }}>
              {audiencia === "cliente" ? "Probar gratis ahora →" : "Quiero empezar →"}
            </button>
          </div>
        </div>
      </section>

      {/* FUNCIONES TALLER */}
      {audiencia === "taller" && (
        <section style={{ padding: "80px 24px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <div className="pill" style={{ marginBottom: 16 }}>FUNCIONES</div>
              <h2 style={{ fontSize: 38, fontWeight: 900, marginBottom: 16, color: "#f0e8dc" }}>Todo en una sola <span style={{ color: "#d4af37" }}>plataforma</span></h2>
              <p style={{ fontSize: 15, color: "#555", maxWidth: 500, margin: "0 auto" }}>Sin saltar entre WhatsApp, Excel y correo. Todo desde tu celular o computadora.</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }} className="grid-mobile-1">
              {FUNCIONES_TALLER.map((f,i) => (
                <div key={i} className="card">
                  <div style={{ fontSize: 32, marginBottom: 14 }}>{f.icon}</div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: f.color, marginBottom: 8 }}>{f.titulo}</div>
                  <div style={{ fontSize: 12, color: "#555", lineHeight: 1.7 }}>{f.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* COMPARACION TALLER */}
      {audiencia === "taller" && (
        <section style={{ padding: "0 24px 80px" }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }} className="grid-mobile-1">
              <div style={{ background: "#0f0f0a", border: "1px solid #f4433620", borderRadius: 16, padding: 24 }}>
                <div style={{ fontSize: 13, color: "#f44336", fontWeight: 700, letterSpacing: 1, marginBottom: 16 }}>❌ SIN ENKAJE PRO</div>
                {["Mensajes de WhatsApp sin información","El cliente no sabe qué quiere","Cotizas sin ver el espacio","Tiempo perdido en visitas que no cierran","Sin contrato, sin protección","Sin seguimiento del proyecto"].map((t,i) => (
                  <div key={i} style={{ display: "flex", gap: 10, padding: "7px 0", borderBottom: i<5?"1px solid #1a1a12":"none", fontSize: 13, color: "#555" }}>
                    <span style={{ color: "#f44336", flexShrink: 0 }}>✕</span> {t}
                  </div>
                ))}
              </div>
              <div style={{ background: "#0a2a0a", border: "1px solid #4caf5030", borderRadius: 16, padding: 24 }}>
                <div style={{ fontSize: 13, color: "#4caf50", fontWeight: 700, letterSpacing: 1, marginBottom: 16 }}>✅ CON ENKAJE PRO</div>
                {["Lead con foto, medidas y estilo elegido","El cliente ya sabe lo que quiere","Cotizas con toda la información","Solo atiendes a los que van en serio","Contrato digital que te protege","Dashboard completo de proyectos"].map((t,i) => (
                  <div key={i} style={{ display: "flex", gap: 10, padding: "7px 0", borderBottom: i<5?"1px solid #1a2a12":"none", fontSize: 13, color: "#aaa" }}>
                    <span style={{ color: "#4caf50", flexShrink: 0 }}>✓</span> {t}
                  </div>
                ))}
              </div>
            </div>
            <div style={{ textAlign: "center", marginTop: 32 }}>
              <button onClick={goApp} className="btn-cliente" style={{ fontSize: 15, padding: "14px 36px", marginRight: 12 }}>Quiero más clientes →</button>
              <a href="https://wa.me/528127176786" target="_blank" rel="noreferrer" className="btn-wa" style={{ fontSize: 15, padding: "14px 28px" }}>💬 Hablar con Felipe</a>
            </div>
          </div>
        </section>
      )}

      {/* DEMO VISUAL CLIENTE */}
      {audiencia === "cliente" && (
        <section style={{ padding: "80px 24px", background: "linear-gradient(180deg,#070708 0%,#0f0f0a 50%,#070708 100%)" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }} className="grid-mobile-1">
              <div>
                <div className="pill" style={{ marginBottom: 16 }}>VISUALIZA PRIMERO</div>
                <h2 style={{ fontSize: 38, fontWeight: 900, lineHeight: 1.2, marginBottom: 20, color: "#f0e8dc" }}>Ve cómo quedará antes<br /><span style={{ color: "#d4af37" }}>de gastar un peso</span></h2>
                <p style={{ fontSize: 15, color: "#666", lineHeight: 1.8, marginBottom: 28 }}>La mayoría de proyectos de carpintería fallan porque el cliente no sabía exactamente lo que quería. Con EnKaje Pro lo ves antes de decidir.</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 32 }}>
                  {[["🍳","Cocinas integrales — modernas, rústicas, de lujo"],["👔","Closets y walk-ins — con iluminación y accesorios"],["📺","Áreas de entretenimiento — con lambrin y panel de TV"],["🛋️","Muebles a medida — mesa, librero, tocador y más"],["🚪","Puertas y cancelería — madera sólida o aluminio"]].map(([icon,text],i) => (
                    <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                      <span style={{ fontSize: 20, flexShrink: 0, marginTop: 2 }}>{icon}</span>
                      <span style={{ fontSize: 14, color: "#aaa", lineHeight: 1.6 }}>{text}</span>
                    </div>
                  ))}
                </div>
                <button onClick={goPortal} className="btn-cliente" style={{ fontSize: 15, padding: "14px 32px" }}>Visualizar mi proyecto →</button>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[{step:"1",label:"Subes tu foto",desc:"Así como está el espacio ahora",highlight:false},{step:"2",label:"Eliges el estilo",desc:"Moderno, rústico, nórdico, industrial...",highlight:false},{step:"3",label:"IA genera el render",desc:"Fotorrealista en 20 segundos",highlight:true},{step:"4",label:"Recibes cotizaciones reales",desc:"De talleres verificados en tu zona",highlight:false}].map((s,i) => (
                  <div key={i} style={{ background: s.highlight?"#1a1208":"#0f0f0a", border: `1px solid ${s.highlight?"#d4af3740":"#1a1a12"}`, borderRadius: 14, padding:"14px 18px", display:"flex", gap:14, alignItems:"center", boxShadow: s.highlight?"0 0 24px #d4af3818":"none" }}>
                    <div style={{ width:36,height:36,borderRadius:"50%",background:s.highlight?"#d4af3720":"#1a1a12",border:`1.5px solid ${s.highlight?"#d4af37":"#333"}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:900,color:s.highlight?"#d4af37":"#555",flexShrink:0 }}>{s.step}</div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontWeight:700,fontSize:14,color:"#e8e0d0",marginBottom:2 }}>{s.label}</div>
                      <div style={{ fontSize:12,color:"#555" }}>{s.desc}</div>
                    </div>
                    {s.highlight && <span style={{ fontSize:11,color:"#d4af37",fontWeight:700,background:"#d4af3715",borderRadius:20,padding:"3px 10px",whiteSpace:"nowrap" }}>IA ✨</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CONFIANZA CLIENTE */}
      {audiencia === "cliente" && (
        <section style={{ padding: "80px 24px", background: "#0f0f0a" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <div className="pill" style={{ marginBottom: 16 }}>TALLERES VERIFICADOS</div>
              <h2 style={{ fontSize: 38, fontWeight: 900, marginBottom: 16, color: "#f0e8dc" }}>¿Por qué confiar en<br /><span style={{ color: "#d4af37" }}>los talleres de EnKaje Pro?</span></h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }} className="grid-mobile-1">
              {[
                {icon:"🔍",titulo:"Verificados manualmente",desc:"Cada taller pasa por validación de identidad, ubicación y portafolio antes de aparecer en el directorio.",color:"#d4af37"},
                {icon:"📋",titulo:"Expediente completo",desc:"El taller recibe tu foto, medidas, estilo y presupuesto estimado antes de contactarte. Llegan preparados.",color:"#00bcd4"},
                {icon:"⭐",titulo:"Reseñas reales",desc:"Solo clientes que contrataron pueden dejar reseña. Sin reseñas falsas, sin perfiles inflados.",color:"#4caf50"},
                {icon:"📄",titulo:"Contrato digital",desc:"Todos los proyectos pueden formalizarse con contrato digital que protege al cliente y al taller.",color:"#f0a500"},
                {icon:"🗺️",titulo:"Talleres en tu zona",desc:"Conectamos con talleres de San Pedro, Monterrey, San Nicolás, Guadalupe, Santa Catarina y más.",color:"#e91e63"},
                {icon:"💬",titulo:"Sin intermediarios en el pago",desc:"El pago va directo al taller. EnKaje Pro cobra membresía al taller, nunca comisión al cliente.",color:"#9c27b0"},
              ].map((f,i) => (
                <div key={i} className="card">
                  <div style={{ fontSize: 32, marginBottom: 14 }}>{f.icon}</div>
                  <div style={{ fontWeight:700,fontSize:15,color:f.color,marginBottom:8 }}>{f.titulo}</div>
                  <div style={{ fontSize:13,color:"#555",lineHeight:1.7 }}>{f.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* DIRECTORIO */}
      <section id="directorio" style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div className="pill" style={{ marginBottom: 16 }}>DIRECTORIO</div>
            <h2 style={{ fontSize: 38, fontWeight: 900, marginBottom: 16, color: "#f0e8dc" }}>Talleres verificados<br /><span style={{ color: "#d4af37" }}>en Monterrey y área metropolitana</span></h2>
            <p style={{ fontSize: 15, color: "#555", maxWidth: 500, margin: "0 auto 32px" }}>Cada taller en EnKaje Pro pasó por un proceso de verificación. Compara especialidades, zonas y reseñas.</p>
            <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
              {FILTROS.map(f => (<button key={f} onClick={() => setFiltroTaller(f)} className={`filter-btn ${filtroTaller===f?"active":""}`}>{f}</button>))}
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }} className="grid-mobile-1">
            {talleresFiltrados.map((t,i) => (
              <div key={i} className="taller-card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                  <div style={{ width:48,height:48,borderRadius:"50%",background:"#d4af3715",border:"1px solid #d4af3730",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22 }}>{t.emoji}</div>
                  <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                    {t.badge && <span style={{ fontSize:10,color:"#d4af37",fontWeight:700,background:"#d4af3715",borderRadius:20,padding:"3px 8px" }}>{t.badge}</span>}
                    <span style={{ fontSize:10,color:t.plan==="premium"?"#d4af37":"#00bcd4",fontWeight:700,background:t.plan==="premium"?"#d4af3715":"#00bcd415",borderRadius:20,padding:"3px 8px",textTransform:"uppercase" }}>{t.plan}</span>
                  </div>
                </div>
                <div style={{ fontWeight:700,fontSize:15,color:"#e8e0d0",marginBottom:4 }}>{t.nombre}</div>
                <div style={{ fontSize:13,color:"#d4af37",marginBottom:6 }}>{t.especialidad}</div>
                <div style={{ fontSize:12,color:"#555",marginBottom:12 }}>📍 {t.zona}</div>
                <div style={{ display:"flex",justifyContent:"space-between",fontSize:12,color:"#444" }}>
                  <span>🏆 {t.proyectos} proyectos</span>
                  <span>⏱️ {t.anos} años de exp.</span>
                </div>
                <div style={{ display:"flex",gap:4,marginTop:10 }}>
                  {[1,2,3,4,5].map(s => <span key={s} style={{ color:"#d4af37",fontSize:12 }}>★</span>)}
                  <span style={{ fontSize:11,color:"#555",marginLeft:4 }}>5.0</span>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop:40,background:"#0f0f0a",border:"1px solid #1a1a12",borderRadius:16,padding:24 }}>
            <div style={{ fontSize:12,color:"#555",letterSpacing:2,textTransform:"uppercase",marginBottom:16 }}>Zonas de cobertura</div>
            <div style={{ display:"flex",gap:10,flexWrap:"wrap" }}>
              {ZONAS.map(z => (<span key={z} style={{ background:"#1a1a12",border:"1px solid #2a2a20",borderRadius:20,padding:"6px 14px",fontSize:13,color:"#aaa" }}>📍 {z}</span>))}
            </div>
          </div>
          <div style={{ textAlign:"center",marginTop:32 }}>
            <button onClick={goPortal} className="btn-cliente" style={{ fontSize:15,padding:"14px 32px" }}>Solicitar cotización gratis →</button>
          </div>
        </div>
      </section>

      {/* PRECIOS TALLER */}
      {audiencia === "taller" && (
        <section id="precios" style={{ padding:"80px 24px",background:"#0f0f0a" }}>
          <div style={{ maxWidth:1100,margin:"0 auto" }}>
            <div style={{ textAlign:"center",marginBottom:56 }}>
              <div className="pill" style={{ marginBottom:16 }}>PLANES Y PRECIOS</div>
              <h2 style={{ fontSize:38,fontWeight:900,marginBottom:16,color:"#f0e8dc" }}>Elige el plan <span style={{ color:"#d4af37" }}>perfecto para tu taller</span></h2>
              <p style={{ fontSize:15,color:"#555" }}>Primer mes gratis. Sin permanencia. Cancelas cuando quieras.</p>
            </div>
            <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:20,alignItems:"start" }} className="grid-mobile-1">
              {PLANES.map((p,i) => (
                <div key={i} style={{ background:"#070708",border:`2px solid ${p.popular?p.color:"#1a1a12"}`,borderRadius:20,padding:28,position:"relative",boxShadow:p.popular?`0 0 48px ${p.color}18`:"none" }}>
                  {p.popular && <div style={{ position:"absolute",top:-14,left:"50%",transform:"translateX(-50%)",background:p.color,color:"#000",borderRadius:50,padding:"4px 18px",fontSize:11,fontWeight:900,letterSpacing:1,whiteSpace:"nowrap" }}>MÁS POPULAR</div>}
                  <div style={{ fontSize:13,color:p.color,fontWeight:700,letterSpacing:1,marginBottom:8 }}>PLAN {p.nombre.toUpperCase()}</div>
                  <div style={{ display:"flex",alignItems:"baseline",gap:4,marginBottom:4 }}>
                    <span style={{ fontSize:13,color:"#555" }}>$</span>
                    <span style={{ fontFamily:"'Playfair Display',serif",fontSize:44,fontWeight:900,color:p.color }}>{p.precio}</span>
                    <span style={{ fontSize:13,color:"#555" }}>MXN/mes</span>
                  </div>
                  <div style={{ fontSize:12,color:"#444",marginBottom:24 }}>Primer mes gratis</div>
                  <div style={{ display:"flex",flexDirection:"column",gap:10,marginBottom:28 }}>
                    {p.features.map((f,j) => (<div key={j} style={{ display:"flex",gap:10,alignItems:"flex-start" }}><span style={{ color:p.color,fontSize:13,fontWeight:900,flexShrink:0,marginTop:1 }}>✓</span><span style={{ fontSize:13,color:"#aaa",lineHeight:1.5 }}>{f}</span></div>))}
                  </div>
                  <button onClick={goApp} style={{ width:"100%",background:p.popular?p.color:"transparent",color:p.popular?"#000":p.color,border:`1.5px solid ${p.color}`,borderRadius:12,padding:"13px",fontWeight:700,fontSize:14,cursor:"pointer",transition:"all .2s",fontFamily:"'DM Sans',sans-serif" }}>Comenzar gratis</button>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA FINAL */}
      <section style={{ padding:"100px 24px",textAlign:"center",position:"relative",overflow:"hidden" }}>
        <div style={{ position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:600,height:600,background:"radial-gradient(circle, #d4af3710 0%, transparent 65%)",pointerEvents:"none" }} />
        <div style={{ maxWidth:700,margin:"0 auto",position:"relative",zIndex:1 }}>
          {audiencia === "cliente" ? (
            <>
              <div className="pill" style={{ marginBottom:20 }}>EMPIEZA GRATIS HOY</div>
              <h2 style={{ fontSize:44,fontWeight:900,lineHeight:1.15,marginBottom:20,color:"#f0e8dc" }}>Tu proyecto merece<br /><span style={{ color:"#d4af37" }}>verse antes de pagarse</span></h2>
              <p style={{ fontSize:16,color:"#555",marginBottom:40,lineHeight:1.7 }}>Visualiza tu cocina, closet, mueble o área de entretenimiento con IA antes de contratar. Gratis, sin registro, en segundos.</p>
              <div style={{ display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap",marginBottom:24 }}>
                <button onClick={goPortal} className="btn-cliente" style={{ fontSize:16,padding:"16px 36px" }}>📸 Visualizar mi proyecto gratis</button>
                <a href="https://wa.me/528127176786" target="_blank" rel="noreferrer" className="btn-wa" style={{ fontSize:16,padding:"16px 28px" }}>💬 Hablar con un asesor</a>
              </div>
              <div style={{ display:"flex",gap:24,justifyContent:"center",flexWrap:"wrap" }}>
                {["✓ 100% gratis","✓ Sin registro","✓ Render en segundos","✓ Talleres verificados"].map((t,i) => <span key={i} style={{ fontSize:13,color:"#444" }}>{t}</span>)}
              </div>
            </>
          ) : (
            <>
              <div className="pill" style={{ marginBottom:20 }}>ÚNETE A ENKAJE PRO</div>
              <h2 style={{ fontSize:44,fontWeight:900,lineHeight:1.15,marginBottom:20,color:"#f0e8dc" }}>Lleva tu taller al<br /><span style={{ color:"#d4af37" }}>siguiente nivel</span></h2>
              <p style={{ fontSize:16,color:"#555",marginBottom:40,lineHeight:1.7 }}>Sé parte de los primeros talleres fundadores en Monterrey. Primer mes gratis, sin permanencia, sin tarjeta de crédito.</p>
              <div style={{ display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap",marginBottom:24 }}>
                <button onClick={goApp} className="btn-cliente" style={{ fontSize:16,padding:"16px 36px" }}>🚀 Quiero más clientes →</button>
                <a href="https://wa.me/528127176786" target="_blank" rel="noreferrer" className="btn-wa" style={{ fontSize:16,padding:"16px 28px" }}>💬 Hablar con Felipe</a>
              </div>
              <div style={{ display:"flex",gap:24,justifyContent:"center",flexWrap:"wrap" }}>
                {["✓ Primer mes gratis","✓ Sin permanencia","✓ Leads calificados","✓ Soporte directo"].map((t,i) => <span key={i} style={{ fontSize:13,color:"#444" }}>{t}</span>)}
              </div>
            </>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background:"#0f0f0a",borderTop:"1px solid #1a1a12",padding:"40px 24px" }}>
        <div style={{ maxWidth:1100,margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:20 }}>
          <div>
            <LogoInline size="sm" />
            <div style={{ fontSize:11,color:"#333",letterSpacing:2,marginTop:6 }}>MONTERREY, MÉXICO · 2026</div>
          </div>
          <div style={{ display:"flex",gap:20,flexWrap:"wrap",alignItems:"center" }}>
            <button className="legal-link" onClick={() => goLegal("privacidad")}>Privacidad</button>
            <button className="legal-link" onClick={() => goLegal("terminos")}>Términos</button>
            <button className="legal-link" onClick={() => goLegal("cookies")}>Cookies</button>
            <button onClick={goPortal} style={{ fontSize:13,color:"#555",background:"none",border:"none",cursor:"pointer",fontFamily:"'DM Sans',sans-serif" }} onMouseEnter={e=>e.target.style.color="#d4af37"} onMouseLeave={e=>e.target.style.color="#555"}>Portal cliente</button>
            <button onClick={goApp} style={{ fontSize:13,color:"#555",background:"none",border:"none",cursor:"pointer",fontFamily:"'DM Sans',sans-serif" }} onMouseEnter={e=>e.target.style.color="#d4af37"} onMouseLeave={e=>e.target.style.color="#555"}>Acceso talleres</button>
          </div>
          <div style={{ fontSize:12,color:"#2a2a20" }}>© 2026 EnKaje Pro. Todos los derechos reservados.</div>
        </div>
      </footer>
    </div>
  );
}
