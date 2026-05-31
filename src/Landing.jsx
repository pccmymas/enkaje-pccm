import { useState, useEffect } from "react";
import { LogoInline } from "./Logo.jsx";

const CSS = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #070708; color: #e8e0d0; overflow-x: hidden;h1, h2, h3, h4, h5, h6 { color: #e8e0d0; } }
  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-thumb { background: #d4af3740; border-radius: 3px; }
  @keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
  @keyframes glow { 0%,100% { box-shadow: 0 0 20px #d4af3730; } 50% { box-shadow: 0 0 40px #d4af3760; } }
  @keyframes slideIn { from { opacity: 0; transform: translateX(-20px); } to { opacity: 1; transform: translateX(0); } }
  .fade-up { animation: fadeUp 0.7s ease forwards; }
  .float { animation: float 4s ease-in-out infinite; }
  .glow { animation: glow 3s ease-in-out infinite; }
  .nav-link { color: #888; text-decoration: none; font-size: 14px; transition: color .2s; }
  .nav-link:hover { color: #d4af37; }
  .btn-primary { background: #d4af37; color: #000; border: none; border-radius: 12px; padding: 14px 28px; font-weight: 700; font-size: 15px; cursor: pointer; transition: all .2s; letter-spacing: 0.5px; }
  .btn-primary:hover { background: #e8c84a; transform: translateY(-2px); box-shadow: 0 8px 24px #d4af3740; }
  .btn-secondary { background: transparent; color: #e8e0d0; border: 1px solid #333; border-radius: 12px; padding: 14px 28px; font-weight: 600; font-size: 15px; cursor: pointer; transition: all .2s; }
  .btn-secondary:hover { border-color: #d4af37; color: #d4af37; }
  .card { background: #0f0f0a; border: 1px solid #1a1a12; border-radius: 20px; padding: 28px; transition: all .3s; }
  .card:hover { border-color: #d4af3740; transform: translateY(-4px); box-shadow: 0 20px 40px rgba(0,0,0,0.4); }
  .pill { display: inline-block; background: #d4af3715; border: 1px solid #d4af3740; color: #d4af37; border-radius: 50px; padding: 6px 16px; font-size: 12px; font-weight: 700; letter-spacing: 1px; }
  .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
  .grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; }
  .grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
  @media (max-width: 768px) {
    .grid-2, .grid-3, .grid-4 { grid-template-columns: 1fr; }
    .hide-mobile { display: none; }
    .hero-title { font-size: 36px !important; }
    .hero-sub { font-size: 16px !important; }
    .section-title { font-size: 28px !important; }
    .nav-links { display: none; }
    .container { padding: 0 16px !important; }
  }
`;

const PASOS = [
  { num: "01", icon: "📱", titulo: "Cliente te contacta", desc: "Desde Instagram, TikTok, Facebook o tu enlace personalizado de EnKaje Pro." },
  { num: "02", icon: "🤖", titulo: "IA genera el diseno", desc: "El cliente visualiza como se vera su cocina, closet o mueble antes de fabricarlo." },
  { num: "03", icon: "📋", titulo: "Cotizacion automatica", desc: "El sistema genera el presupuesto con materiales, medidas y tiempos al instante." },
  { num: "04", icon: "🏭", titulo: "Produccion", desc: "Organiza tareas, asigna responsables y controla el avance del proyecto." },
  { num: "05", icon: "✅", titulo: "Entrega y seguimiento", desc: "El cliente sigue todo el proceso desde su celular en tiempo real." },
];

const PLANES = [
  {
    nombre: "Basico", precio: "699", color: "#888", features: [
      "Hasta 5 leads por mes",
      "Dashboard basico",
      "Cotizaciones en la app",
      "Perfil en el mapa",
      "Soporte por email",
    ], popular: false
  },
  {
    nombre: "Pro", precio: "1,499", color: "#00bcd4", features: [
      "Leads ilimitados",
      "CRM completo de clientes",
      "WhatsApp automatico",
      "Conectar redes sociales",
      "IA ilimitada",
      "Contratos digitales",
      "Soporte prioritario",
    ], popular: true
  },
  {
    nombre: "Premium", precio: "2,999", color: "#d4af37", features: [
      "Todo el Plan Pro",
      "Exclusividad en tu zona",
      "Primero en recibir leads",
      "Perfil destacado en mapa",
      "Renders IA premium",
      "Onboarding personal",
      "Soporte 24/7",
    ], popular: false
  },
];

const TESTIMONIOS = [
  { nombre: "Carlos M.", taller: "Taller de Cocinas Premium", texto: "EnKaje Pro transformo mi negocio. Ahora cierro mas ventas y mis clientes estan increiblemente satisfechos.", zona: "San Pedro Garza Garcia" },
  { nombre: "Ana R.", taller: "Closets & Muebles Regia", texto: "Los leads que llegan ya vienen con especificaciones completas. Ahorro horas de trabajo en cada proyecto.", zona: "Monterrey Centro" },
  { nombre: "Roberto S.", taller: "Carpinteria del Norte", texto: "La IA que genera disenos es increible. Los clientes se enamoran del proyecto antes de firmar el contrato.", zona: "San Nicolas de los Garza" },
];

const INTEGRACIONES = [
  { nombre: "WhatsApp", color: "#25D366", icon: "💬" },
  { nombre: "Instagram", color: "#E1306C", icon: "📸" },
  { nombre: "Facebook", color: "#1877F2", icon: "👥" },
  { nombre: "Messenger", color: "#0084FF", icon: "💭" },
  { nombre: "OpenAI", color: "#74aa9c", icon: "🤖" },
  { nombre: "TikTok", color: "#ff0050", icon: "🎵" },
];

export default function Landing() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const goToApp = () => window.location.href = "/app";

  return (
    <div style={{ background: "#070708", minHeight: "100vh" }}>
      <style>{CSS}</style>

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: scrolled ? "rgba(7,7,8,0.95)" : "transparent", backdropFilter: scrolled ? "blur(10px)" : "none", borderBottom: scrolled ? "1px solid #1a1a12" : "none", transition: "all .3s", padding: "0 24px" }}>
        <div className="container" style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 0" }}>
          <div style={{ cursor: "pointer" }} onClick={() => window.scrollTo(0,0)}>
            <LogoInline size="nav" />
          </div>
          <div className="nav-links" style={{ display: "flex", gap: 32, alignItems: "center" }}>
            {[["#funciones","Funciones"],["#precios","Precios"],["#talleres","Talleres"],["#contacto","Contacto"]].map(([h,l]) => (
              <a key={h} href={h} className="nav-link">{l}</a>
            ))}
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={goToApp} className="btn-secondary" style={{ padding: "10px 20px", fontSize: 13 }}>Iniciar sesion</button>
            <button onClick={goToApp} className="btn-primary" style={{ padding: "10px 20px", fontSize: 13 }}>Comenzar gratis</button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "120px 24px 80px", position: "relative", overflow: "hidden" }}>
        {/* Background glow */}
        <div style={{ position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)", width: 600, height: 600, background: "radial-gradient(circle, #d4af3715 0%, transparent 70%)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }} className="fade-up">
          <div className="pill" style={{ marginBottom: 24 }}>IA + DISENO + PRODUCCION</div>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
            <LogoInline size="lg" />
          </div>

          <h1 className="hero-title" style={{ fontSize: 64, fontWeight: 900, lineHeight: 1.1, marginBottom: 24, letterSpacing: -1 }}>
            Convierte ideas en
            <span style={{ color: "#d4af37", display: "block" }}>muebles reales con IA</span>
          </h1>

          <p className="hero-sub" style={{ fontSize: 20, color: "#888", lineHeight: 1.7, maxWidth: 600, margin: "0 auto 40px" }}>
            La plataforma todo-en-uno para talleres que quieren vender mas, organizarse mejor y ofrecer experiencias increibles a sus clientes.
          </p>

          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", marginBottom: 56 }}>
            <button onClick={goToApp} className="btn-primary" style={{ fontSize: 16, padding: "16px 36px" }}>
              Comenzar ahora →
            </button>
            <button onClick={goToApp} className="btn-secondary" style={{ fontSize: 16, padding: "16px 36px" }}>
              Ver como funciona ▶
            </button>
          </div>

          {/* Social proof */}
          <div style={{ display: "flex", gap: 8, justifyContent: "center", alignItems: "center", flexWrap: "wrap" }}>
            <span style={{ fontSize: 13, color: "#555" }}>Integrado con tus canales favoritos:</span>
            {INTEGRACIONES.slice(0,4).map(i => (
              <span key={i.nombre} style={{ background: `${i.color}20`, border: `1px solid ${i.color}40`, color: i.color, borderRadius: 20, padding: "4px 12px", fontSize: 12, fontWeight: 600 }}>{i.icon} {i.nombre}</span>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ padding: "0 24px 80px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="grid-4" style={{ gap: 16 }}>
            {[["500+","Proyectos completados"],["98%","Clientes satisfechos"],["3x","Mas ventas por taller",""],["24/7","Soporte disponible"]].map(([n,l],i) => (
              <div key={i} style={{ background: "#0f0f0a", border: "1px solid #1a1a12", borderRadius: 16, padding: "24px", textAlign: "center" }}>
                <div style={{ fontSize: 36, fontWeight: 900, color: "#d4af37", marginBottom: 6 }}>{n}</div>
                <div style={{ fontSize: 13, color: "#555" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section id="funciones" style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div className="pill" style={{ marginBottom: 16 }}>ASI FUNCIONA</div>
            <h2 className="section-title" style={{ fontSize: 40, fontWeight: 900, marginBottom: 16 }}>
              Asi funciona <span style={{ color: "#d4af37" }}>EnKaje Pro</span>
            </h2>
            <p style={{ fontSize: 16, color: "#555", maxWidth: 500, margin: "0 auto" }}>
              De la idea al mueble terminado en 5 pasos simples
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16 }}>
            {PASOS.map((p, i) => (
              <div key={i} className="card" style={{ textAlign: "center", position: "relative" }}>
                <div style={{ fontSize: 11, color: "#d4af37", fontWeight: 700, letterSpacing: 2, marginBottom: 12 }}>PASO {p.num}</div>
                <div style={{ fontSize: 36, marginBottom: 14 }}>{p.icon}</div>
                <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 10 }}>{p.titulo}</div>
                <div style={{ fontSize: 13, color: "#555", lineHeight: 1.6 }}>{p.desc}</div>
                {i < PASOS.length - 1 && (
                  <div className="hide-mobile" style={{ position: "absolute", top: "50%", right: -20, transform: "translateY(-50%)", color: "#d4af3740", fontSize: 20, zIndex: 1 }}>→</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DISENOS IA */}
      <section style={{ padding: "80px 24px", background: "linear-gradient(180deg, #070708 0%, #0f0f0a 50%, #070708 100%)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="grid-2" style={{ alignItems: "center", gap: 60 }}>
            <div>
              <div className="pill" style={{ marginBottom: 16 }}>IA GENERATIVA</div>
              <h2 style={{ fontSize: 40, fontWeight: 900, lineHeight: 1.2, marginBottom: 20 }}>
                Tu cocina antes
                <span style={{ color: "#d4af37", display: "block" }}>de fabricarla</span>
              </h2>
              <p style={{ fontSize: 16, color: "#888", lineHeight: 1.8, marginBottom: 28 }}>
                El cliente escribe "Quiero una cocina moderna negra mate con isla" y en segundos ve como quedaria. Eso genera emocion inmediata y cierra ventas mas rapido.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 32 }}>
                {[
                  ["🎨", "Genera renders realistas en segundos"],
                  ["📐", "Calcula medidas y materiales automaticamente"],
                  ["💰", "Cotizacion instantanea segun especificaciones"],
                  ["📱", "El cliente aprueba desde su celular"],
                ].map(([icon, text], i) => (
                  <div key={i} style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <span style={{ fontSize: 20 }}>{icon}</span>
                    <span style={{ fontSize: 14, color: "#aaa" }}>{text}</span>
                  </div>
                ))}
              </div>
              <button onClick={goToApp} className="btn-primary">Probar IA gratis →</button>
            </div>
            <div style={{ position: "relative" }}>
              <div className="float" style={{ background: "#0f0f0a", border: "1px solid #d4af3730", borderRadius: 20, padding: 24, position: "relative" }}>
                <div style={{ fontSize: 12, color: "#555", marginBottom: 12, letterSpacing: 1 }}>CLIENTE ESCRIBE:</div>
                <div style={{ background: "#1a1208", border: "1px solid #d4af3730", borderRadius: 12, padding: "12px 16px", marginBottom: 16, fontSize: 14, color: "#e8e0d0" }}>
                  "Quiero una cocina moderna negra mate con isla y cubierta de cuarzo blanco"
                </div>
                <div style={{ fontSize: 12, color: "#555", marginBottom: 12, letterSpacing: 1 }}>IA GENERA:</div>
                <div style={{ background: "#1a1a10", borderRadius: 12, overflow: "hidden", marginBottom: 16, height: 160, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <img src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&q=80&fit=crop" alt="Cocina moderna" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 12 }} />
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <div style={{ flex: 1, background: "#d4af3720", border: "1px solid #d4af3740", borderRadius: 8, padding: "8px 12px", textAlign: "center" }}>
                    <div style={{ fontSize: 10, color: "#d4af37", fontWeight: 700, marginBottom: 2 }}>PRESUPUESTO</div>
                    <div style={{ fontSize: 14, fontWeight: 900, color: "#d4af37" }}>$45,000 MXN</div>
                  </div>
                  <div style={{ flex: 1, background: "#4caf5020", border: "1px solid #4caf5040", borderRadius: 8, padding: "8px 12px", textAlign: "center" }}>
                    <div style={{ fontSize: 10, color: "#4caf50", fontWeight: 700, marginBottom: 2 }}>TIEMPO</div>
                    <div style={{ fontSize: 14, fontWeight: 900, color: "#4caf50" }}>25 dias</div>
                  </div>
                </div>
                <div style={{ marginTop: 12, background: "#d4af37", borderRadius: 10, padding: "10px", textAlign: "center", fontWeight: 700, fontSize: 14, color: "#000", cursor: "pointer" }}>
                  Me encanta, quiero cotizacion real ✓
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <h2 style={{ fontSize: 40, fontWeight: 900, marginBottom: 16 }}>
              Todo lo que tu taller necesita
              <span style={{ color: "#d4af37", display: "block" }}>en un solo lugar</span>
            </h2>
          </div>
          <div className="grid-3">
            {[
              ["👥", "CRM de Clientes", "Gestiona todos tus clientes, proyectos y cotizaciones desde un dashboard elegante.", "#d4af37"],
              ["🤖", "IA Asesora", "Recomendaciones de materiales, colores y presupuestos basadas en inteligencia artificial.", "#00bcd4"],
              ["💬", "WhatsApp Automatico", "Notifica a talleres cuando llega un nuevo lead. Todo automatico, sin hacer nada.", "#25D366"],
              ["📊", "Dashboard Completo", "Ingresos, proyectos activos, pagos pendientes y metricas en tiempo real.", "#f0a500"],
              ["📋", "Cotizaciones Pro", "Genera presupuestos profesionales con PDF, desglose de precios y forma de pago.", "#d4af37"],
              ["🗺️", "Mapa de Talleres", "Encuentra talleres verificados cerca del cliente segun especialidad y zona.", "#00bcd4"],
            ].map(([icon, titulo, desc, color], i) => (
              <div key={i} className="card">
                <div style={{ fontSize: 32, marginBottom: 16 }}>{icon}</div>
                <div style={{ fontWeight: 700, fontSize: 16, color, marginBottom: 10 }}>{titulo}</div>
                <div style={{ fontSize: 13, color: "#555", lineHeight: 1.7 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRECIOS */}
      <section id="precios" style={{ padding: "80px 24px", background: "#0f0f0a" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div className="pill" style={{ marginBottom: 16 }}>PLANES Y PRECIOS</div>
            <h2 style={{ fontSize: 40, fontWeight: 900, marginBottom: 16 }}>
              Elige el plan <span style={{ color: "#d4af37" }}>perfecto para ti</span>
            </h2>
            <p style={{ fontSize: 16, color: "#555" }}>14 dias gratis en todos los planes. Sin tarjeta de credito.</p>
          </div>

          <div className="grid-3" style={{ alignItems: "start" }}>
            {PLANES.map((p, i) => (
              <div key={i} style={{ background: "#070708", border: `2px solid ${p.popular ? p.color : "#1a1a12"}`, borderRadius: 20, padding: 28, position: "relative", boxShadow: p.popular ? `0 0 40px ${p.color}20` : "none" }}>
                {p.popular && (
                  <div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", background: p.color, color: "#000", borderRadius: 50, padding: "4px 16px", fontSize: 11, fontWeight: 900, letterSpacing: 1, whiteSpace: "nowrap" }}>MAS POPULAR</div>
                )}
                <div style={{ fontSize: 13, color: p.color, fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>PLAN {p.nombre.toUpperCase()}</div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 6 }}>
                  <span style={{ fontSize: 14, color: "#555" }}>$</span>
                  <span style={{ fontSize: 44, fontWeight: 900, color: p.color }}>{p.precio}</span>
                  <span style={{ fontSize: 14, color: "#555" }}>MXN/mes</span>
                </div>
                <div style={{ fontSize: 12, color: "#555", marginBottom: 24 }}>14 dias gratis para empezar</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
                  {p.features.map((f, j) => (
                    <div key={j} style={{ display: "flex", gap: 10, alignItems: "center" }}>
                      <span style={{ color: p.color, fontSize: 14, fontWeight: 900 }}>✓</span>
                      <span style={{ fontSize: 13, color: "#aaa" }}>{f}</span>
                    </div>
                  ))}
                </div>
                <button onClick={goToApp} style={{ width: "100%", background: p.popular ? p.color : "transparent", color: p.popular ? "#000" : p.color, border: `1.5px solid ${p.color}`, borderRadius: 12, padding: "13px", fontWeight: 700, fontSize: 14, cursor: "pointer", transition: "all .2s" }}>
                  Comenzar gratis
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INTEGRACIONES */}
      <section style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
          <div className="pill" style={{ marginBottom: 16 }}>INTEGRACIONES</div>
          <h2 style={{ fontSize: 36, fontWeight: 900, marginBottom: 16 }}>
            Conecta con tus <span style={{ color: "#d4af37" }}>herramientas favoritas</span>
          </h2>
          <p style={{ fontSize: 15, color: "#555", marginBottom: 40 }}>EnKaje Pro se integra con las plataformas que ya usas</p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            {INTEGRACIONES.map(int => (
              <div key={int.nombre} style={{ background: "#0f0f0a", border: `1px solid ${int.color}30`, borderRadius: 16, padding: "16px 24px", display: "flex", alignItems: "center", gap: 10, transition: "all .2s", cursor: "default" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = int.color}
                onMouseLeave={e => e.currentTarget.style.borderColor = `${int.color}30`}>
                <span style={{ fontSize: 22 }}>{int.icon}</span>
                <span style={{ fontWeight: 700, color: int.color, fontSize: 14 }}>{int.nombre}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section style={{ padding: "80px 24px", background: "#0f0f0a" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div className="pill" style={{ marginBottom: 16 }}>TESTIMONIOS</div>
            <h2 style={{ fontSize: 36, fontWeight: 900 }}>
              Talleres que ya <span style={{ color: "#d4af37" }}>confian en EnKaje Pro</span>
            </h2>
          </div>
          <div className="grid-3">
            {TESTIMONIOS.map((t, i) => (
              <div key={i} className="card">
                <div style={{ display: "flex", gap: 4, marginBottom: 16 }}>
                  {[1,2,3,4,5].map(s => <span key={s} style={{ color: "#d4af37", fontSize: 16 }}>★</span>)}
                </div>
                <p style={{ fontSize: 14, color: "#aaa", lineHeight: 1.7, marginBottom: 20, fontStyle: "italic" }}>"{t.texto}"</p>
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#d4af3720", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>👤</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>{t.nombre}</div>
                    <div style={{ fontSize: 12, color: "#555" }}>{t.taller}</div>
                    <div style={{ fontSize: 11, color: "#d4af37" }}>{t.zona}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section id="contacto" style={{ padding: "100px 24px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 500, height: 500, background: "radial-gradient(circle, #d4af3710 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 700, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div className="pill" style={{ marginBottom: 20 }}>EMPIEZA HOY</div>
          <h2 style={{ fontSize: 48, fontWeight: 900, lineHeight: 1.15, marginBottom: 20 }}>
            Lleva tu taller al
            <span style={{ color: "#d4af37", display: "block" }}>siguiente nivel</span>
          </h2>
          <p style={{ fontSize: 17, color: "#555", marginBottom: 40, lineHeight: 1.7 }}>
            Unete a cientos de talleres que ya estan creciendo con EnKaje Pro. 14 dias gratis, sin tarjeta de credito, cancelas cuando quieras.
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", marginBottom: 32 }}>
            <button onClick={goToApp} className="btn-primary" style={{ fontSize: 16, padding: "16px 40px" }}>Comenzar ahora →</button>
            <a href="https://wa.me/521234567890" target="_blank" rel="noreferrer" style={{ background: "#25D366", color: "#fff", border: "none", borderRadius: 12, padding: "16px 32px", fontWeight: 700, fontSize: 16, cursor: "pointer", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8 }}>
              💬 Hablar con un asesor
            </a>
          </div>
          <div style={{ display: "flex", gap: 24, justifyContent: "center", flexWrap: "wrap" }}>
            {["✓ 14 dias gratis","✓ Sin tarjeta de credito","✓ Cancelas cuando quieras","✓ Soporte 24/7"].map((t,i) => (
              <span key={i} style={{ fontSize: 13, color: "#555" }}>{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#0f0f0a", borderTop: "1px solid #1a1a12", padding: "40px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
          <div>
            <LogoInline size="sm" />
            <div style={{ fontSize: 11, color: "#444", letterSpacing: 2, marginTop: 6 }}>MONTERREY, MEXICO</div>
          </div>
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            {[["Privacidad","#"],["Terminos","#"],["Contacto","#"],["Iniciar sesion","/app"]].map(([l,h]) => (
              <a key={l} href={h} style={{ fontSize: 13, color: "#555", textDecoration: "none", transition: "color .2s" }}
                onMouseEnter={e => e.target.style.color="#d4af37"}
                onMouseLeave={e => e.target.style.color="#555"}>{l}</a>
            ))}
          </div>
          <div style={{ fontSize: 12, color: "#333" }}>© 2025 EnKaje Pro. Todos los derechos reservados.</div>
        </div>
      </footer>
    </div>
  );
}
