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
  @keyframes float { 0%,100% { transform:translateY(0px); } 50% { transform:translateY(-10px); } }
  @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
  .fade-up { animation: fadeUp 0.7s ease forwards; }
  .fade-up-d2 { animation: fadeUp 0.7s 0.2s ease both; }
  .float { animation: float 5s ease-in-out infinite; }
  .btn-gold { background: #d4af37; color: #000; border: none; border-radius: 14px; padding: 15px 28px; font-weight: 700; font-size: 15px; cursor: pointer; transition: all .25s; font-family: 'DM Sans', sans-serif; display: inline-flex; align-items: center; gap: 8px; }
  .btn-gold:hover { background: #e8c84a; transform: translateY(-3px); box-shadow: 0 12px 32px #d4af3750; }
  .btn-outline { background: transparent; color: #e8e0d0; border: 1.5px solid #333; border-radius: 14px; padding: 15px 28px; font-weight: 600; font-size: 15px; cursor: pointer; transition: all .25s; font-family: 'DM Sans', sans-serif; display: inline-flex; align-items: center; gap: 8px; }
  .btn-outline:hover { border-color: #d4af37; color: #d4af37; transform: translateY(-2px); }
  .btn-wa { background: #25D366; color: #fff; border: none; border-radius: 14px; padding: 15px 28px; font-weight: 700; font-size: 15px; cursor: pointer; transition: all .25s; font-family: 'DM Sans', sans-serif; text-decoration: none; display: inline-flex; align-items: center; gap: 8px; }
  .btn-wa:hover { background: #20b858; transform: translateY(-2px); box-shadow: 0 8px 24px #25D36650; }
  .card { background: #0f0f0a; border: 1px solid #1a1a12; border-radius: 20px; padding: 24px; transition: all .3s; }
  .card:hover { border-color: #d4af3740; transform: translateY(-4px); box-shadow: 0 20px 48px rgba(0,0,0,0.5); }
  .pill { display: inline-block; background: #d4af3715; border: 1px solid #d4af3740; color: #d4af37; border-radius: 50px; padding: 5px 16px; font-size: 11px; font-weight: 700; letter-spacing: 2px; }
  .nav-link { color: #666; text-decoration: none; font-size: 14px; transition: color .2s; font-weight: 500; }
  .nav-link:hover { color: #d4af37; }
  .legal-link { font-size: 13px; color: #444; background: transparent; border: none; cursor: pointer; transition: color .2s; text-decoration: underline; font-family: 'DM Sans', sans-serif; }
  .legal-link:hover { color: #d4af37; }
  .tab-btn { background: transparent; border: none; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all .2s; }
  .filter-btn { background: transparent; border: 1px solid #1a1a12; border-radius: 50px; padding: 7px 16px; font-size: 12px; font-weight: 600; cursor: pointer; transition: all .2s; font-family: 'DM Sans', sans-serif; color: #555; }
  .filter-btn.active, .filter-btn:hover { background: #d4af3715; border-color: #d4af37; color: #d4af37; }
  .mockup-window { background: #0a0a08; border: 1px solid #2a2a20; border-radius: 12px; overflow: hidden; }
  .mockup-bar { background: #1a1a12; padding: 8px 12px; display: flex; align-items: center; gap: 6px; }
  .mockup-dot { width: 8px; height: 8px; border-radius: 50%; }
  @media (max-width: 768px) {
    .hide-mobile { display: none !important; }
    .grid-mobile-1 { grid-template-columns: 1fr !important; }
    .hero-title { font-size: 32px !important; line-height: 1.15 !important; }
    .section-title { font-size: 26px !important; }
    .container { padding: 0 16px !important; }
    .nav-links { display: none !important; }
    .hero-btns { flex-direction: column !important; align-items: stretch !important; }
    .hero-btns button, .hero-btns a { justify-content: center; }
  }
`;

const FOTOS = [
  { label: "Cocina Moderna", img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=700&q=85&fit=crop&crop=center", tag: "Lo más pedido" },
  { label: "Closet Premium", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=85&fit=crop&crop=center", tag: "Tendencia 2026" },
  { label: "Área de Entretenimiento", img: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=700&q=85&fit=crop&crop=center", tag: "Muy solicitado" },
  { label: "Mueble a Medida", img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=700&q=85&fit=crop&crop=center", tag: "Personalizable" },
];

const PASOS_CLIENTE = [
  { num:"01", emoji:"📸", titulo:"Sube tu foto", desc:"Del espacio actual. Así como está, sin preparar nada." },
  { num:"02", emoji:"🎨", titulo:"Elige el estilo", desc:"Moderno, rústico, nórdico, industrial y más." },
  { num:"03", emoji:"🤖", titulo:"IA genera el render", desc:"En segundos ves cómo quedaría tu proyecto terminado." },
  { num:"04", emoji:"💬", titulo:"Recibe cotizaciones", desc:"Talleres verificados te contactan con precios reales." },
];

const PASOS_TALLER = [
  { num:"01", emoji:"📋", titulo:"Levantamiento digital", desc:"Formulario profesional de cocina, closet, puerta, mueble o panel decorativo con todas las especificaciones." },
  { num:"02", emoji:"💰", titulo:"Presupuesto en PDF", desc:"Genera cotización profesional con desglose, formas de pago y tiempo de entrega. Lista para compartir por WhatsApp." },
  { num:"03", emoji:"📄", titulo:"Contrato digital", desc:"Contrato de fabricación con cláusulas, penalizaciones y pagos. Sin papel, sin riesgos." },
  { num:"04", emoji:"⭐", titulo:"Leads calificados", desc:"Recibes clientes con foto, medidas, estilo y nivel de decisión declarado. Tú decides a quién atender primero." },
];

const FUNCIONES_TALLER = [
  { icon:"📋", titulo:"Levantamiento digital", desc:"5 formularios especializados: cocina, closet, puerta, mueble y panel/lambrin. Checkboxes de materiales, acabados, herrajes y accesorios.", color:"#d4af37" },
  { icon:"🖨️", titulo:"Presupuesto profesional", desc:"PDF con logo, desglose de precios, incluye/no incluye, formas de pago y firma. Comparte por WhatsApp, email o descarga.", color:"#00bcd4" },
  { icon:"📄", titulo:"Contratos digitales", desc:"Contrato de fabricación con cláusulas de garantía, penalizaciones, pagos escalonados y firma del cliente.", color:"#4caf50" },
  { icon:"🤖", titulo:"IA cotizadora de materiales", desc:"Describe el proyecto y la IA genera lista de materiales con cantidades y precios actualizados en Monterrey.", color:"#f0a500" },
  { icon:"🎨", titulo:"Renders de diseño", desc:"Genera renders fotorrealistas para mostrarle al cliente cómo quedaría su proyecto antes de fabricarlo.", color:"#e91e63" },
  { icon:"📊", titulo:"Pipeline de proyectos", desc:"Kanban visual: Nuevo → Revisando → Cotizado → Cerrado. Seguimiento de cada proyecto desde tu celular.", color:"#9c27b0" },
  { icon:"⭐", titulo:"Leads con scoring IA", desc:"Cada lead llega con foto, medidas, estilo y puntuación 0–100 de intención de compra. Atiende primero a los urgentes.", color:"#d4af37" },
  { icon:"📱", titulo:"Contenido para redes", desc:"IA genera captions e hashtags para Instagram, Facebook y TikTok en segundos. Nunca más pantalla en blanco.", color:"#00bcd4" },
];

const ZONAS = ["San Pedro Garza García","Monterrey Centro","San Nicolás de los Garza","Guadalupe","Santa Catarina","Apodaca","Escobedo","García"];

const PLANES = [
  { nombre:"Básico", precio:"699", color:"#888", features:["Hasta 5 leads/mes","Formularios de levantamiento","Presupuesto en PDF","Perfil en el directorio","Soporte por email"] },
  { nombre:"Pro", precio:"1,499", color:"#00bcd4", popular:true, features:["Leads ilimitados","Scoring de leads visible","Contratos digitales","IA cotizadora de materiales","Renders de diseño","Contenido para redes sociales","Soporte prioritario"] },
  { nombre:"Premium", precio:"2,999", color:"#d4af37", features:["Todo el Plan Pro","Expediente completo del cliente","Leads prioritarios primero","IA sugiere respuesta al lead","Perfil destacado en directorio","Onboarding personal","Soporte 24/7"] },
];

export default function Landing() {
  const [scrolled, setScrolled] = useState(false);
  const [audiencia, setAudiencia] = useState("cliente");
  const [fotoIdx, setFotoIdx] = useState(0);
  const [filtro, setFiltro] = useState("Todos");
  const intervalRef = useRef(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    intervalRef.current = setInterval(() => setFotoIdx(i => (i+1) % FOTOS.length), 3800);
    return () => clearInterval(intervalRef.current);
  }, []);

  const goPortal = () => window.location.href = "/portal";
  const goApp = () => window.location.href = "/app";
  const goLegal = (p) => window.location.href = `/app?legal=${p}`;
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div style={{ background:"#070708", minHeight:"100vh" }}>
      <style>{CSS}</style>

      {/* NAV */}
      <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:100, background:scrolled?"rgba(7,7,8,0.96)":"transparent", backdropFilter:scrolled?"blur(12px)":"none", borderBottom:scrolled?"1px solid #1a1a12":"none", transition:"all .3s", padding:"0 24px" }}>
        <div className="container" style={{ maxWidth:1100, margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"space-between", padding:"16px 0" }}>
          <div style={{ cursor:"pointer" }} onClick={() => window.scrollTo({top:0,behavior:"smooth"})}>
            <LogoInline size="nav" />
          </div>
          <div className="nav-links" style={{ display:"flex", gap:32, alignItems:"center" }}>
            <a href="#como-funciona" className="nav-link">Cómo funciona</a>
            <a href="#directorio" className="nav-link">Talleres</a>
            {audiencia === "taller" && <a href="#precios" className="nav-link">Precios</a>}
          </div>
          <div style={{ display:"flex", gap:8, alignItems:"center" }}>
            <button onClick={goApp} className="btn-outline" style={{ padding:"9px 18px", fontSize:13 }}>Iniciar sesión</button>
            <button onClick={goPortal} className="btn-gold" style={{ padding:"9px 18px", fontSize:13 }}>Visualizar gratis →</button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", padding:"120px 24px 80px", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:"15%", left:"50%", transform:"translateX(-50%)", width:700, height:700, background:"radial-gradient(circle, #d4af3712 0%, transparent 65%)", pointerEvents:"none" }} />
        <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(#d4af3706 1px, transparent 1px), linear-gradient(90deg, #d4af3706 1px, transparent 1px)", backgroundSize:"48px 48px", pointerEvents:"none" }} />

        <div style={{ maxWidth:1000, margin:"0 auto", position:"relative", zIndex:1 }}>
          {/* Toggle */}
          <div style={{ display:"flex", justifyContent:"center", marginBottom:32 }}>
            <div style={{ background:"#0f0f0a", border:"1px solid #1a1a12", borderRadius:50, padding:4, display:"flex", gap:4 }}>
              {[["cliente","🏠 Tengo un proyecto"],["taller","🏭 Tengo un taller"]].map(([k,l]) => (
                <button key={k} onClick={() => setAudiencia(k)} className="tab-btn" style={{ padding:"9px 20px", borderRadius:50, fontSize:13, fontWeight:700, background:audiencia===k?"#d4af37":"transparent", color:audiencia===k?"#000":"#555" }}>{l}</button>
              ))}
            </div>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:60, alignItems:"center" }} className="grid-mobile-1">
            {/* Texto */}
            <div className="fade-up">
              <div className="pill" style={{ marginBottom:20 }}>
                {audiencia==="cliente" ? "VISUALIZA. DECIDE. COTIZA." : "MÁS CLIENTES. MENOS TIEMPO PERDIDO."}
              </div>
              <h1 className="hero-title" style={{ fontSize:50, fontWeight:900, lineHeight:1.1, marginBottom:16, color:"#f0e8dc" }}>
                {audiencia==="cliente"
                  ? (<>Tu proyecto de carpintería,<br /><span style={{ color:"#d4af37" }}>visto antes de construirse</span></>)
                  : (<>Clientes que llegan<br /><span style={{ color:"#d4af37" }}>listos para comprar</span></>)}
              </h1>
              <p style={{ fontSize:16, color:"#666", lineHeight:1.8, marginBottom:32 }}>
                {audiencia==="cliente"
                  ? "Sube una foto de tu espacio, elige el estilo que te gusta y en segundos tienes un render de cómo quedaría. Gratis, sin registro, sin compromiso."
                  : "Formularios de levantamiento, presupuestos PDF, contratos digitales, IA de materiales, renders y leads calificados. Todo en una sola plataforma, desde tu celular."}
              </p>
              <div className="hero-btns" style={{ display:"flex", gap:12, flexWrap:"wrap", marginBottom:28 }}>
                {audiencia==="cliente" ? (
                  <>
                    <button onClick={goPortal} className="btn-gold" style={{ fontSize:15, padding:"15px 28px" }}>📸 Visualizar mi proyecto gratis</button>
                    <a href="https://wa.me/528127176786" target="_blank" rel="noreferrer" className="btn-wa" style={{ fontSize:15, padding:"15px 22px" }}>💬 Hablar con asesor</a>
                  </>
                ) : (
                  <>
                    <button onClick={goApp} className="btn-gold" style={{ fontSize:15, padding:"15px 28px" }}>🚀 Quiero más clientes →</button>
                    <a href="https://wa.me/528127176786" target="_blank" rel="noreferrer" className="btn-wa" style={{ fontSize:15, padding:"15px 22px" }}>💬 Hablar con Felipe</a>
                  </>
                )}
              </div>
              <div style={{ display:"flex", gap:20, flexWrap:"wrap" }}>
                {(audiencia==="cliente"
                  ? ["✓ Gratis","✓ Sin registro","✓ Render en segundos"]
                  : ["✓ 1er mes gratis","✓ Sin permanencia","✓ Leads calificados"]
                ).map((t,i) => <span key={i} style={{ fontSize:13, color:"#444", fontWeight:500 }}>{t}</span>)}
              </div>
            </div>

            {/* Visual */}
            <div className="float fade-up-d2">
              {audiencia==="cliente" ? (
                <div style={{ position:"relative" }}>
                  <div style={{ background:"#0f0f0a", border:"1px solid #d4af3730", borderRadius:20, overflow:"hidden" }}>
                    <div style={{ position:"relative", height:260, overflow:"hidden", background:"#1a1a12" }}>
                      <img key={fotoIdx} src={FOTOS[fotoIdx].img} alt={FOTOS[fotoIdx].label} style={{ width:"100%", height:"100%", objectFit:"cover", animation:"fadeIn 0.6s ease", display:"block" }} onError={e=>{e.target.style.display="none";}} />
                      <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center", pointerEvents:"none" }}>
                        <div style={{ fontFamily:"'Playfair Display',serif", fontSize:14, fontWeight:900, color:"rgba(212,175,55,0.3)", transform:"rotate(-25deg)", letterSpacing:3, userSelect:"none" }}>EnKaje Pro · Vista Previa</div>
                      </div>
                      <div style={{ position:"absolute", top:12, left:12, background:"#d4af37", color:"#000", borderRadius:20, padding:"4px 12px", fontSize:11, fontWeight:700 }}>{FOTOS[fotoIdx].tag}</div>
                      <div style={{ position:"absolute", top:12, right:12, background:"rgba(7,7,8,0.85)", color:"#d4af37", borderRadius:20, padding:"4px 12px", fontSize:11, fontWeight:700 }}>{FOTOS[fotoIdx].label}</div>
                      <div style={{ position:"absolute", bottom:12, left:"50%", transform:"translateX(-50%)", display:"flex", gap:6 }}>
                        {FOTOS.map((_,i) => (<button key={i} onClick={()=>setFotoIdx(i)} style={{ width:i===fotoIdx?20:6, height:6, borderRadius:3, background:i===fotoIdx?"#d4af37":"#ffffff40", border:"none", cursor:"pointer", transition:"all .3s", padding:0 }} />))}
                      </div>
                    </div>
                    <div style={{ padding:"16px 20px" }}>
                      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8 }}>
                        {[["$35K–$120K","Inversión est."],["15–35 días","Tiempo típico"],["6 meses","Garantía"]].map(([v,l],i) => (
                          <div key={i} style={{ background:"#0a0a08", borderRadius:8, padding:"8px 10px", textAlign:"center" }}>
                            <div style={{ fontSize:12, fontWeight:700, color:"#d4af37" }}>{v}</div>
                            <div style={{ fontSize:9, color:"#444", marginTop:2 }}>{l}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div style={{ position:"absolute", bottom:-16, right:-16, background:"#0f0f0a", border:"1px solid #d4af3740", borderRadius:14, padding:"10px 16px", fontSize:12, color:"#d4af37", fontWeight:700, boxShadow:"0 8px 24px rgba(0,0,0,0.5)" }}>🤖 IA en 20 segundos</div>
                </div>
              ) : (
                <div style={{ background:"#0f0f0a", border:"1px solid #d4af3730", borderRadius:20, padding:24 }}>
                  <div style={{ fontSize:11, color:"#d4af37", fontWeight:700, letterSpacing:2, marginBottom:16 }}>🛠️ PLATAFORMA COMPLETA</div>
                  {[["📋","Levantamiento digital","Cocina, closet, puerta, mueble, panel"],["💰","Presupuesto PDF","Desglose + forma de pago + firma"],["📄","Contrato digital","Cláusulas y protección para ambas partes"],["🤖","IA cotizadora","Lista de materiales con precios MTY"],["🎨","Renders de diseño","Fotorrealistas para mostrar al cliente"],["⭐","Leads calificados","Con foto, medidas, estilo y scoring"]].map(([e,l,d],i) => (
                    <div key={i} style={{ display:"flex", gap:12, padding:"9px 0", borderBottom:i<5?"1px solid #1a1a12":"none", alignItems:"center" }}>
                      <span style={{ fontSize:18, flexShrink:0 }}>{e}</span>
                      <div style={{ flex:1 }}>
                        <div style={{ fontSize:13, fontWeight:700, color:"#e8e0d0" }}>{l}</div>
                        <div style={{ fontSize:11, color:"#444" }}>{d}</div>
                      </div>
                      <span style={{ color:"#4caf50", fontSize:12, flexShrink:0 }}>✓</span>
                    </div>
                  ))}
                  <button onClick={() => scrollTo("funciones")} className="btn-gold" style={{ width:"100%", justifyContent:"center", marginTop:16, fontSize:13, padding:"12px" }}>Ver todas las funciones ↓</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section id="como-funciona" style={{ padding:"80px 24px", background:"#0f0f0a" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:48 }}>
            <div className="pill" style={{ marginBottom:16 }}>ASÍ FUNCIONA</div>
            <h2 className="section-title" style={{ fontSize:38, fontWeight:900, marginBottom:16, color:"#f0e8dc" }}>
              {audiencia==="cliente" ? "De la foto a la cotización en minutos" : "4 herramientas que cambian tu operación"}
            </h2>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16 }} className="grid-mobile-1">
            {(audiencia==="cliente" ? PASOS_CLIENTE : PASOS_TALLER).map((p,i) => (
              <div key={i} className="card" style={{ textAlign:"center", position:"relative" }}>
                <div style={{ fontSize:11, color:"#d4af37", fontWeight:700, letterSpacing:2, marginBottom:12 }}>{p.num}</div>
                <div style={{ fontSize:36, marginBottom:14 }}>{p.emoji}</div>
                <div style={{ fontWeight:700, fontSize:15, marginBottom:10, color:"#e8e0d0" }}>{p.titulo}</div>
                <div style={{ fontSize:13, color:"#555", lineHeight:1.7 }}>{p.desc}</div>
                {i<3 && <div className="hide-mobile" style={{ position:"absolute", top:"42%", right:-16, color:"#d4af3740", fontSize:22, zIndex:1 }}>→</div>}
              </div>
            ))}
          </div>
          <div style={{ textAlign:"center", marginTop:40 }}>
            <button onClick={audiencia==="cliente" ? goPortal : goApp} className="btn-gold" style={{ fontSize:15, padding:"14px 36px" }}>
              {audiencia==="cliente" ? "Probar gratis ahora →" : "Quiero empezar →"}
            </button>
          </div>
        </div>
      </section>

      {/* FUNCIONES TALLER con mockups */}
      {audiencia==="taller" && (
        <section id="funciones" style={{ padding:"80px 24px" }}>
          <div style={{ maxWidth:1100, margin:"0 auto" }}>
            <div style={{ textAlign:"center", marginBottom:56 }}>
              <div className="pill" style={{ marginBottom:16 }}>FUNCIONES</div>
              <h2 style={{ fontSize:38, fontWeight:900, marginBottom:16, color:"#f0e8dc" }}>Todo en una sola <span style={{ color:"#d4af37" }}>plataforma</span></h2>
              <p style={{ fontSize:15, color:"#555", maxWidth:500, margin:"0 auto" }}>Sin saltar entre WhatsApp, Excel y correo. Todo desde tu celular o computadora.</p>
            </div>

            {/* Mockups visuales */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:16, marginBottom:48 }} className="grid-mobile-1">
              {/* Mockup 1 — Formulario */}
              <div className="mockup-window">
                <div className="mockup-bar">
                  {["#ff5f57","#ffbd2e","#28c840"].map((c,i) => <div key={i} className="mockup-dot" style={{ background:c }} />)}
                  <span style={{ fontSize:11, color:"#444", marginLeft:6, letterSpacing:1 }}>Levantamiento · Cocina</span>
                </div>
                <div style={{ padding:16 }}>
                  <div style={{ fontSize:10, color:"#d4af37", fontWeight:700, letterSpacing:1, marginBottom:10 }}>TIPO DE COCINA</div>
                  <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:14 }}>
                    {["En L","Con isla","Lineal"].map((t,i) => (
                      <span key={i} style={{ background:i===1?"#d4af3720":"#1a1a12", border:`1px solid ${i===1?"#d4af37":"#2a2a20"}`, color:i===1?"#d4af37":"#555", borderRadius:20, padding:"4px 10px", fontSize:11, fontWeight:i===1?700:400 }}>{i===1&&"✓ "}{t}</span>
                    ))}
                  </div>
                  <div style={{ fontSize:10, color:"#d4af37", fontWeight:700, letterSpacing:1, marginBottom:10 }}>MATERIAL</div>
                  <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:14 }}>
                    {["MDF","Melamina","Madera sólida"].map((t,i) => (
                      <span key={i} style={{ background:i===0?"#d4af3720":"#1a1a12", border:`1px solid ${i===0?"#d4af37":"#2a2a20"}`, color:i===0?"#d4af37":"#555", borderRadius:20, padding:"4px 10px", fontSize:11, fontWeight:i===0?700:400 }}>{i===0&&"✓ "}{t}</span>
                    ))}
                  </div>
                  <div style={{ fontSize:10, color:"#d4af37", fontWeight:700, letterSpacing:1, marginBottom:8 }}>MEDIDAS</div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:6 }}>
                    {[["Largo","3.20 m"],["Altura","2.40 m"]].map(([l,v],i) => (
                      <div key={i} style={{ background:"#1a1a12", borderRadius:6, padding:"6px 8px" }}>
                        <div style={{ fontSize:9, color:"#444" }}>{l}</div>
                        <div style={{ fontSize:12, color:"#e8e0d0", fontWeight:600 }}>{v}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop:12, background:"#d4af37", borderRadius:8, padding:"8px", textAlign:"center", fontSize:11, fontWeight:700, color:"#000" }}>🖨️ Generar PDF</div>
                </div>
              </div>

              {/* Mockup 2 — Presupuesto */}
              <div className="mockup-window">
                <div className="mockup-bar">
                  {["#ff5f57","#ffbd2e","#28c840"].map((c,i) => <div key={i} className="mockup-dot" style={{ background:c }} />)}
                  <span style={{ fontSize:11, color:"#444", marginLeft:6, letterSpacing:1 }}>Presupuesto · EP-481923</span>
                </div>
                <div style={{ padding:16 }}>
                  <div style={{ fontSize:10, color:"#555", marginBottom:4 }}>CLIENTE</div>
                  <div style={{ fontSize:13, fontWeight:700, color:"#e8e0d0", marginBottom:12 }}>María González · 81-1234-5678</div>
                  {[["Fabricación","$42,000"],["Instalación","$8,000"],["Cubierta","$12,000"],["Herrajes","$5,500"]].map(([l,v],i) => (
                    <div key={i} style={{ display:"flex", justifyContent:"space-between", padding:"5px 0", borderBottom:"1px solid #1a1a12", fontSize:12 }}>
                      <span style={{ color:"#666" }}>{l}</span>
                      <span style={{ color:"#e8e0d0", fontWeight:600 }}>{v}</span>
                    </div>
                  ))}
                  <div style={{ display:"flex", justifyContent:"space-between", padding:"10px 0", fontSize:15, fontWeight:900 }}>
                    <span style={{ color:"#d4af37" }}>TOTAL</span>
                    <span style={{ color:"#d4af37" }}>$67,500 MXN</span>
                  </div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:6, marginTop:4 }}>
                    <div style={{ background:"#25D36615", border:"1px solid #25D36640", borderRadius:8, padding:"7px", textAlign:"center", fontSize:11, color:"#25D366", fontWeight:700 }}>💬 WhatsApp</div>
                    <div style={{ background:"#d4af3715", border:"1px solid #d4af3740", borderRadius:8, padding:"7px", textAlign:"center", fontSize:11, color:"#d4af37", fontWeight:700 }}>📄 PDF</div>
                  </div>
                </div>
              </div>

              {/* Mockup 3 — Lead scoring */}
              <div className="mockup-window">
                <div className="mockup-bar">
                  {["#ff5f57","#ffbd2e","#28c840"].map((c,i) => <div key={i} className="mockup-dot" style={{ background:c }} />)}
                  <span style={{ fontSize:11, color:"#444", marginLeft:6, letterSpacing:1 }}>Lead · Expediente</span>
                </div>
                <div style={{ padding:16 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
                    <div style={{ fontSize:13, fontWeight:700, color:"#e8e0d0" }}>Cocina Moderna</div>
                    <div style={{ background:"#d4af3720", border:"1px solid #d4af3740", borderRadius:20, padding:"3px 10px", fontSize:11, color:"#d4af37", fontWeight:700 }}>⭐ Prioritario</div>
                  </div>
                  {[["📸 Foto","Subida ✓"],["🎨 Estilo","Moderno"],["📐 Medidas","3.2×2.4m"],["📅 Inicio","Lo antes posible 🔥"],["🎯 Decisión","Listo para cotizar"]].map(([l,v],i) => (
                    <div key={i} style={{ display:"flex", justifyContent:"space-between", padding:"5px 0", borderBottom:i<4?"1px solid #1a1a12":"none", fontSize:12 }}>
                      <span style={{ color:"#555" }}>{l}</span>
                      <span style={{ color:"#e8e0d0", fontWeight:500 }}>{v}</span>
                    </div>
                  ))}
                  <div style={{ marginTop:12, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                    <div style={{ fontSize:10, color:"#555" }}>Score de compra</div>
                    <div style={{ fontSize:22, fontWeight:900, color:"#4caf50" }}>87/100</div>
                  </div>
                  <div style={{ height:4, background:"#1a1a12", borderRadius:2, marginTop:6, overflow:"hidden" }}>
                    <div style={{ width:"87%", height:"100%", background:"linear-gradient(90deg,#4caf50,#d4af37)", borderRadius:2 }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Grid de funciones */}
            <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16 }} className="grid-mobile-1">
              {FUNCIONES_TALLER.map((f,i) => (
                <div key={i} className="card">
                  <div style={{ fontSize:28, marginBottom:12 }}>{f.icon}</div>
                  <div style={{ fontWeight:700, fontSize:14, color:f.color, marginBottom:8 }}>{f.titulo}</div>
                  <div style={{ fontSize:12, color:"#555", lineHeight:1.7 }}>{f.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* COMPARACIÓN TALLER */}
      {audiencia==="taller" && (
        <section style={{ padding:"0 24px 80px" }}>
          <div style={{ maxWidth:900, margin:"0 auto" }}>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }} className="grid-mobile-1">
              <div style={{ background:"#0f0f0a", border:"1px solid #f4433620", borderRadius:16, padding:24 }}>
                <div style={{ fontSize:13, color:"#f44336", fontWeight:700, letterSpacing:1, marginBottom:16 }}>❌ SIN ENKAJE PRO</div>
                {["Mensajes de WhatsApp sin información","El cliente no sabe qué quiere","Cotizas sin ver el espacio","Tiempo perdido en visitas que no cierran","Sin contrato, sin protección","Sin seguimiento del proyecto"].map((t,i) => (
                  <div key={i} style={{ display:"flex", gap:10, padding:"7px 0", borderBottom:i<5?"1px solid #1a1a12":"none", fontSize:13, color:"#555" }}>
                    <span style={{ color:"#f44336", flexShrink:0 }}>✕</span>{t}
                  </div>
                ))}
              </div>
              <div style={{ background:"#0a2a0a", border:"1px solid #4caf5030", borderRadius:16, padding:24 }}>
                <div style={{ fontSize:13, color:"#4caf50", fontWeight:700, letterSpacing:1, marginBottom:16 }}>✅ CON ENKAJE PRO</div>
                {["Lead con foto, medidas y estilo elegido","El cliente ya sabe lo que quiere","Cotizas con toda la información","Solo atiendes a los que van en serio","Contrato digital que te protege","Dashboard completo de proyectos"].map((t,i) => (
                  <div key={i} style={{ display:"flex", gap:10, padding:"7px 0", borderBottom:i<5?"1px solid #1a2a12":"none", fontSize:13, color:"#aaa" }}>
                    <span style={{ color:"#4caf50", flexShrink:0 }}>✓</span>{t}
                  </div>
                ))}
              </div>
            </div>
            <div style={{ textAlign:"center", marginTop:32, display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
              <button onClick={goApp} className="btn-gold" style={{ fontSize:15, padding:"14px 32px" }}>Quiero más clientes →</button>
              <a href="https://wa.me/528127176786" target="_blank" rel="noreferrer" className="btn-wa" style={{ fontSize:15, padding:"14px 24px" }}>💬 Hablar con Felipe</a>
            </div>
          </div>
        </section>
      )}

      {/* DEMO VISUAL CLIENTE */}
      {audiencia==="cliente" && (
        <section style={{ padding:"80px 24px", background:"linear-gradient(180deg,#070708 0%,#0f0f0a 50%,#070708 100%)" }}>
          <div style={{ maxWidth:1100, margin:"0 auto" }}>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:60, alignItems:"center" }} className="grid-mobile-1">
              <div>
                <div className="pill" style={{ marginBottom:16 }}>LO QUE PUEDES VISUALIZAR</div>
                <h2 style={{ fontSize:38, fontWeight:900, lineHeight:1.2, marginBottom:20, color:"#f0e8dc" }}>
                  Cualquier proyecto<br /><span style={{ color:"#d4af37" }}>en segundos</span>
                </h2>
                <p style={{ fontSize:15, color:"#666", lineHeight:1.8, marginBottom:28 }}>
                  No importa si es una cocina completa o un mueble de televisión. La IA genera la propuesta visual y tú decides si te gusta antes de contratar a alguien.
                </p>
                <div style={{ display:"flex", flexDirection:"column", gap:14, marginBottom:32 }}>
                  {[["🍳","Cocinas integrales — modernas, rústicas, de lujo"],["👔","Closets y walk-ins — con iluminación LED y accesorios"],["📺","Áreas de entretenimiento — lambrin, panel TV, estantes"],["🛋️","Muebles a medida — mesa, librero, tocador, bar"],["🚪","Puertas y cancelería — madera sólida o aluminio"]].map(([icon,text],i) => (
                    <div key={i} style={{ display:"flex", gap:12, alignItems:"flex-start" }}>
                      <span style={{ fontSize:20, flexShrink:0, marginTop:2 }}>{icon}</span>
                      <span style={{ fontSize:14, color:"#aaa", lineHeight:1.6 }}>{text}</span>
                    </div>
                  ))}
                </div>
                <button onClick={goPortal} className="btn-gold" style={{ fontSize:15, padding:"14px 32px" }}>Visualizar mi proyecto →</button>
              </div>
              <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                {[{step:"1",label:"Subes tu foto",desc:"Así como está el espacio ahora",highlight:false},{step:"2",label:"Eliges el estilo",desc:"Moderno, rústico, nórdico, industrial...",highlight:false},{step:"3",label:"IA genera el render",desc:"Fotorrealista en 20 segundos",highlight:true},{step:"4",label:"Recibes cotizaciones reales",desc:"De talleres verificados en tu zona",highlight:false}].map((s,i) => (
                  <div key={i} style={{ background:s.highlight?"#1a1208":"#0f0f0a", border:`1px solid ${s.highlight?"#d4af3740":"#1a1a12"}`, borderRadius:14, padding:"14px 18px", display:"flex", gap:14, alignItems:"center", boxShadow:s.highlight?"0 0 24px #d4af3818":"none" }}>
                    <div style={{ width:36, height:36, borderRadius:"50%", background:s.highlight?"#d4af3720":"#1a1a12", border:`1.5px solid ${s.highlight?"#d4af37":"#333"}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, fontWeight:900, color:s.highlight?"#d4af37":"#555", flexShrink:0 }}>{s.step}</div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontWeight:700, fontSize:14, color:"#e8e0d0", marginBottom:2 }}>{s.label}</div>
                      <div style={{ fontSize:12, color:"#555" }}>{s.desc}</div>
                    </div>
                    {s.highlight && <span style={{ fontSize:11, color:"#d4af37", fontWeight:700, background:"#d4af3715", borderRadius:20, padding:"3px 10px", whiteSpace:"nowrap" }}>IA ✨</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CONFIANZA CLIENTE */}
      {audiencia==="cliente" && (
        <section style={{ padding:"80px 24px", background:"#0f0f0a" }}>
          <div style={{ maxWidth:1100, margin:"0 auto" }}>
            <div style={{ textAlign:"center", marginBottom:48 }}>
              <div className="pill" style={{ marginBottom:16 }}>TALLERES VERIFICADOS</div>
              <h2 style={{ fontSize:38, fontWeight:900, marginBottom:16, color:"#f0e8dc" }}>¿Por qué confiar en<br /><span style={{ color:"#d4af37" }}>los talleres de EnKaje Pro?</span></h2>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:20 }} className="grid-mobile-1">
              {[
                {icon:"🔍",titulo:"Verificados manualmente",desc:"Cada taller pasa por validación de identificación oficial, RFC, ubicación y portafolio antes de activar su cuenta.",color:"#d4af37"},
                {icon:"📋",titulo:"Expediente completo",desc:"El taller recibe tu foto, medidas, estilo y presupuesto estimado antes de contactarte. Llegan preparados, no a adivinar.",color:"#00bcd4"},
                {icon:"⭐",titulo:"Reseñas verificadas",desc:"Solo clientes que contrataron pueden dejar reseña. Sin reseñas falsas ni perfiles inflados.",color:"#4caf50"},
                {icon:"📄",titulo:"Contrato que te protege",desc:"Todos los proyectos pueden formalizarse con contrato digital que incluye garantías, penalizaciones y pagos escalonados.",color:"#f0a500"},
                {icon:"🗺️",titulo:"Talleres en tu zona",desc:"Conectamos con talleres de San Pedro, Monterrey, San Nicolás, Guadalupe, Santa Catarina y toda el área metro.",color:"#e91e63"},
                {icon:"💬",titulo:"Sin comisión al cliente",desc:"El pago va directo al taller. EnKaje Pro cobra membresía al taller, nunca porcentaje de tu proyecto.",color:"#9c27b0"},
              ].map((f,i) => (
                <div key={i} className="card">
                  <div style={{ fontSize:32, marginBottom:14 }}>{f.icon}</div>
                  <div style={{ fontWeight:700, fontSize:15, color:f.color, marginBottom:8 }}>{f.titulo}</div>
                  <div style={{ fontSize:13, color:"#555", lineHeight:1.7 }}>{f.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* DIRECTORIO */}
      <section id="directorio" style={{ padding:"80px 24px" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:48 }}>
            <div className="pill" style={{ marginBottom:16 }}>DIRECTORIO</div>
            <h2 style={{ fontSize:38, fontWeight:900, marginBottom:16, color:"#f0e8dc" }}>Talleres verificados<br /><span style={{ color:"#d4af37" }}>en Monterrey y área metropolitana</span></h2>
            <p style={{ fontSize:15, color:"#555", maxWidth:500, margin:"0 auto 12px" }}>Así se verá el directorio cuando los talleres completen su verificación. Cada semana se incorporan nuevos.</p>
            <div style={{ display:"inline-block", background:"#1a1208", border:"1px solid #d4af3730", borderRadius:20, padding:"6px 16px", fontSize:12, color:"#d4af37", fontWeight:600, marginBottom:32 }}>🔄 Directorio en construcción · Incorporando talleres verificados</div>
            <div style={{ display:"flex", gap:8, justifyContent:"center", flexWrap:"wrap" }}>
              {["Todos","Cocinas","Closets","Puertas","Muebles","Entretenimiento"].map(f => (
                <button key={f} onClick={()=>setFiltro(f)} className={`filter-btn ${filtro===f?"active":""}`}>{f}</button>
              ))}
            </div>
          </div>

          {/* Cards de ejemplo */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16, opacity:0.7 }} className="grid-mobile-1">
            {[
              {emoji:"🍳",nombre:"Taller de Cocinas",especialidad:"Cocinas integrales",zona:"San Pedro Garza García",plan:"premium",anos:"+10 años",badge:"⭐ Destacado"},
              {emoji:"👔",nombre:"Closets a Medida",especialidad:"Closets y vestidores",zona:"Monterrey Centro",plan:"pro",anos:"+8 años",badge:null},
              {emoji:"📺",nombre:"Muebles y Lambrin",especialidad:"Paneles y entretenimiento",zona:"San Nicolás de los Garza",plan:"pro",anos:"+5 años",badge:null},
              {emoji:"🚪",nombre:"Puertas Premium",especialidad:"Puertas y cancelería",zona:"Guadalupe",plan:"premium",anos:"+15 años",badge:"⭐ Destacado"},
              {emoji:"🛋️",nombre:"Carpintería Fina",especialidad:"Muebles a medida",zona:"Santa Catarina",plan:"pro",anos:"+6 años",badge:null},
              {emoji:"🍳",nombre:"Ebanistería MTY",especialidad:"Cocinas y muebles",zona:"Apodaca",plan:"pro",anos:"+12 años",badge:null},
            ].map((t,i) => (
              <div key={i} style={{ background:"#0f0f0a", border:"1px solid #1a1a12", borderRadius:16, padding:20, position:"relative" }}>
                <div style={{ position:"absolute", top:12, right:12, background:"#1a1208", border:"1px solid #d4af3730", borderRadius:20, padding:"3px 10px", fontSize:10, color:"#d4af37", fontWeight:700 }}>Ejemplo</div>
                <div style={{ display:"flex", gap:14, alignItems:"center", marginBottom:14 }}>
                  <div style={{ width:44, height:44, borderRadius:"50%", background:"#d4af3715", border:"1px solid #d4af3730", display:"flex", alignItems:"center", justifyContent:"center", fontSize:20 }}>{t.emoji}</div>
                  <div>
                    <div style={{ fontWeight:700, fontSize:14, color:"#e8e0d0" }}>{t.nombre}</div>
                    <div style={{ fontSize:12, color:"#d4af37" }}>{t.especialidad}</div>
                  </div>
                </div>
                <div style={{ fontSize:12, color:"#555", marginBottom:10 }}>📍 {t.zona}</div>
                <div style={{ display:"flex", justifyContent:"space-between", fontSize:12, color:"#444", marginBottom:10 }}>
                  <span>⏱️ {t.anos} de experiencia</span>
                  <span style={{ color:t.plan==="premium"?"#d4af37":"#00bcd4", fontWeight:700, textTransform:"uppercase", fontSize:10 }}>{t.plan}</span>
                </div>
                <div style={{ display:"flex", gap:3 }}>
                  {[1,2,3,4,5].map(s => <span key={s} style={{ color:"#d4af37", fontSize:12 }}>★</span>)}
                  <span style={{ fontSize:11, color:"#555", marginLeft:4 }}>5.0</span>
                </div>
              </div>
            ))}
          </div>

          {/* CTA unirse al directorio */}
          <div style={{ marginTop:32, background:"linear-gradient(135deg,#1a1208,#0f0f0a)", border:"1px solid #d4af3730", borderRadius:16, padding:"28px 32px", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:16 }}>
            <div>
              <div style={{ fontWeight:700, fontSize:16, color:"#f0e8dc", marginBottom:6 }}>¿Tienes un taller en Monterrey?</div>
              <div style={{ fontSize:13, color:"#666" }}>Sé parte de los talleres fundadores. Primer mes completamente gratis.</div>
            </div>
            <button onClick={goApp} className="btn-gold" style={{ fontSize:14, padding:"12px 24px", whiteSpace:"nowrap" }}>Unirme al directorio →</button>
          </div>

          {/* Zonas */}
          <div style={{ marginTop:24, background:"#0f0f0a", border:"1px solid #1a1a12", borderRadius:16, padding:24 }}>
            <div style={{ fontSize:12, color:"#555", letterSpacing:2, textTransform:"uppercase", marginBottom:16 }}>Zonas de cobertura</div>
            <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
              {ZONAS.map(z => (<span key={z} style={{ background:"#1a1a12", border:"1px solid #2a2a20", borderRadius:20, padding:"6px 14px", fontSize:13, color:"#aaa" }}>📍 {z}</span>))}
            </div>
          </div>

          <div style={{ textAlign:"center", marginTop:32 }}>
            <button onClick={goPortal} className="btn-gold" style={{ fontSize:15, padding:"14px 32px" }}>Solicitar cotización gratis →</button>
          </div>
        </div>
      </section>

      {/* PRECIOS TALLER */}
      {audiencia==="taller" && (
        <section id="precios" style={{ padding:"80px 24px", background:"#0f0f0a" }}>
          <div style={{ maxWidth:1100, margin:"0 auto" }}>
            <div style={{ textAlign:"center", marginBottom:56 }}>
              <div className="pill" style={{ marginBottom:16 }}>PLANES Y PRECIOS</div>
              <h2 style={{ fontSize:38, fontWeight:900, marginBottom:16, color:"#f0e8dc" }}>Elige el plan <span style={{ color:"#d4af37" }}>perfecto para tu taller</span></h2>
              <p style={{ fontSize:15, color:"#555" }}>Primer mes gratis. Sin permanencia. Cancelas cuando quieras.</p>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:20, alignItems:"start" }} className="grid-mobile-1">
              {PLANES.map((p,i) => (
                <div key={i} style={{ background:"#070708", border:`2px solid ${p.popular?p.color:"#1a1a12"}`, borderRadius:20, padding:28, position:"relative", boxShadow:p.popular?`0 0 48px ${p.color}18`:"none" }}>
                  {p.popular && <div style={{ position:"absolute", top:-14, left:"50%", transform:"translateX(-50%)", background:p.color, color:"#000", borderRadius:50, padding:"4px 18px", fontSize:11, fontWeight:900, letterSpacing:1, whiteSpace:"nowrap" }}>MÁS POPULAR</div>}
                  <div style={{ fontSize:13, color:p.color, fontWeight:700, letterSpacing:1, marginBottom:8 }}>PLAN {p.nombre.toUpperCase()}</div>
                  <div style={{ display:"flex", alignItems:"baseline", gap:4, marginBottom:4 }}>
                    <span style={{ fontSize:13, color:"#555" }}>$</span>
                    <span style={{ fontFamily:"'Playfair Display',serif", fontSize:44, fontWeight:900, color:p.color }}>{p.precio}</span>
                    <span style={{ fontSize:13, color:"#555" }}>MXN/mes</span>
                  </div>
                  <div style={{ fontSize:12, color:"#444", marginBottom:24 }}>Primer mes gratis</div>
                  <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:28 }}>
                    {p.features.map((f,j) => (<div key={j} style={{ display:"flex", gap:10, alignItems:"flex-start" }}><span style={{ color:p.color, fontSize:13, fontWeight:900, flexShrink:0, marginTop:1 }}>✓</span><span style={{ fontSize:13, color:"#aaa", lineHeight:1.5 }}>{f}</span></div>))}
                  </div>
                  <button onClick={goApp} style={{ width:"100%", background:p.popular?p.color:"transparent", color:p.popular?"#000":p.color, border:`1.5px solid ${p.color}`, borderRadius:12, padding:"13px", fontWeight:700, fontSize:14, cursor:"pointer", transition:"all .2s", fontFamily:"'DM Sans',sans-serif" }}>Comenzar gratis</button>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA FINAL */}
      <section style={{ padding:"100px 24px", textAlign:"center", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:600, height:600, background:"radial-gradient(circle, #d4af3710 0%, transparent 65%)", pointerEvents:"none" }} />
        <div style={{ maxWidth:700, margin:"0 auto", position:"relative", zIndex:1 }}>
          {audiencia==="cliente" ? (
            <>
              <div className="pill" style={{ marginBottom:20 }}>EMPIEZA GRATIS HOY</div>
              <h2 style={{ fontSize:44, fontWeight:900, lineHeight:1.15, marginBottom:20, color:"#f0e8dc" }}>Tu proyecto merece<br /><span style={{ color:"#d4af37" }}>un render antes de una decisión</span></h2>
              <p style={{ fontSize:16, color:"#555", marginBottom:40, lineHeight:1.7 }}>Visualiza tu cocina, closet, área de entretenimiento o mueble con IA antes de contratar. En segundos, gratis, sin registro.</p>
              <div style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap", marginBottom:24 }}>
                <button onClick={goPortal} className="btn-gold" style={{ fontSize:16, padding:"16px 36px" }}>📸 Visualizar mi proyecto gratis</button>
                <a href="https://wa.me/528127176786" target="_blank" rel="noreferrer" className="btn-wa" style={{ fontSize:16, padding:"16px 28px" }}>💬 Hablar con un asesor</a>
              </div>
              <div style={{ display:"flex", gap:24, justifyContent:"center", flexWrap:"wrap" }}>
                {["✓ 100% gratis","✓ Sin registro","✓ Render en segundos","✓ Talleres verificados"].map((t,i) => <span key={i} style={{ fontSize:13, color:"#444" }}>{t}</span>)}
              </div>
            </>
          ) : (
            <>
              <div className="pill" style={{ marginBottom:20 }}>ÚNETE A ENKAJE PRO</div>
              <h2 style={{ fontSize:44, fontWeight:900, lineHeight:1.15, marginBottom:20, color:"#f0e8dc" }}>Lleva tu taller al<br /><span style={{ color:"#d4af37" }}>siguiente nivel</span></h2>
              <p style={{ fontSize:16, color:"#555", marginBottom:40, lineHeight:1.7 }}>Sé parte de los talleres fundadores en Monterrey. Primer mes gratis, sin permanencia, sin tarjeta de crédito.</p>
              <div style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap", marginBottom:24 }}>
                <button onClick={goApp} className="btn-gold" style={{ fontSize:16, padding:"16px 36px" }}>🚀 Quiero más clientes →</button>
                <a href="https://wa.me/528127176786" target="_blank" rel="noreferrer" className="btn-wa" style={{ fontSize:16, padding:"16px 28px" }}>💬 Hablar con Felipe</a>
              </div>
              <div style={{ display:"flex", gap:24, justifyContent:"center", flexWrap:"wrap" }}>
                {["✓ Primer mes gratis","✓ Sin permanencia","✓ Leads calificados","✓ Soporte directo"].map((t,i) => <span key={i} style={{ fontSize:13, color:"#444" }}>{t}</span>)}
              </div>
            </>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background:"#0f0f0a", borderTop:"1px solid #1a1a12", padding:"40px 24px" }}>
        <div style={{ maxWidth:1100, margin:"0 auto", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:20 }}>
          <div>
            <LogoInline size="sm" />
            <div style={{ fontSize:11, color:"#333", letterSpacing:2, marginTop:6 }}>MONTERREY, MÉXICO · 2026</div>
          </div>
          <div style={{ display:"flex", gap:20, flexWrap:"wrap", alignItems:"center" }}>
            <button className="legal-link" onClick={()=>goLegal("privacidad")}>Privacidad</button>
            <button className="legal-link" onClick={()=>goLegal("terminos")}>Términos</button>
            <button className="legal-link" onClick={()=>goLegal("cookies")}>Cookies</button>
            <button onClick={goPortal} style={{ fontSize:13, color:"#555", background:"none", border:"none", cursor:"pointer", fontFamily:"'DM Sans',sans-serif" }} onMouseEnter={e=>e.target.style.color="#d4af37"} onMouseLeave={e=>e.target.style.color="#555"}>Portal cliente</button>
            <button onClick={goApp} style={{ fontSize:13, color:"#555", background:"none", border:"none", cursor:"pointer", fontFamily:"'DM Sans',sans-serif" }} onMouseEnter={e=>e.target.style.color="#d4af37"} onMouseLeave={e=>e.target.style.color="#555"}>Acceso talleres</button>
          </div>
          <div style={{ fontSize:12, color:"#2a2a20" }}>© 2026 EnKaje Pro. Todos los derechos reservados.</div>
        </div>
      </footer>
    </div>
  );
}
