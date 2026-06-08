import { useState, useEffect } from "react";
import { LogoInline } from "./Logo.jsx";

// ============ PÁGINAS LEGALES ============
const LEGAL_S = {
  page: { minHeight:"100vh", background:"#070708", color:"#e8e0d0", fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif" },
  hdr:  { borderBottom:"1px solid #d4af3720", padding:"16px 24px", display:"flex", justifyContent:"space-between", alignItems:"center", position:"sticky", top:0, background:"#070708", zIndex:10 },
  back: { background:"transparent", border:"1px solid #2a2a20", color:"#888", borderRadius:8, padding:"7px 14px", fontSize:12, cursor:"pointer", fontWeight:600 },
  wrap: { maxWidth:780, margin:"0 auto", padding:"40px 24px 80px" },
  badge:{ display:"inline-block", background:"#d4af3715", border:"1px solid #d4af3740", color:"#d4af37", borderRadius:20, padding:"4px 14px", fontSize:11, fontWeight:700, letterSpacing:2, marginBottom:12 },
  h1:   { fontSize:28, fontWeight:900, color:"#e8e0d0", margin:"0 0 6px", lineHeight:1.2 },
  meta: { fontSize:12, color:"#555", marginBottom:36 },
  h2:   { fontSize:13, fontWeight:700, color:"#d4af37", margin:"32px 0 10px", letterSpacing:1, textTransform:"uppercase" },
  p:    { fontSize:14, color:"#aaa", lineHeight:1.8, margin:"0 0 12px" },
  li:   { fontSize:14, color:"#aaa", lineHeight:1.8, marginBottom:5 },
  box:  { background:"#0f0f0a", border:"1px solid #d4af3725", borderRadius:12, padding:"16px 20px", margin:"20px 0" },
  warn: { background:"#1a0a0a", border:"1px solid #f4433630", borderRadius:12, padding:"14px 18px", margin:"16px 0" },
  div:  { height:1, background:"#1a1a12", margin:"28px 0" },
  foot: { background:"#0f0f0a", border:"1px solid #d4af3730", borderRadius:12, padding:"18px 22px", marginTop:36 },
};
const LegalHdr = ({ onBack }) => (
  <div style={LEGAL_S.hdr}>
    <LogoInline size="nav" />
    <button style={LEGAL_S.back} onClick={onBack}>← Volver</button>
  </div>
);
const LegalUL = ({ items }) => (
  <ul style={{ paddingLeft:20, margin:"0 0 12px" }}>
    {items.map((item,i) => <li key={i} style={LEGAL_S.li}>{item}</li>)}
  </ul>
);

function PaginaPrivacidad({ onBack }) {
  useEffect(() => window.scrollTo(0,0), []);
  return (
    <div style={LEGAL_S.page}>
      <LegalHdr onBack={onBack} />
      <div style={LEGAL_S.wrap}>
        <div style={LEGAL_S.badge}>LEGAL</div>
        <h1 style={LEGAL_S.h1}>Aviso de Privacidad</h1>
        <p style={LEGAL_S.meta}>Última actualización: junio 2026 · Monterrey, Nuevo León, México</p>
        <div style={LEGAL_S.box}><p style={{...LEGAL_S.p,color:"#d4af37",margin:0,fontWeight:600}}>En cumplimiento con la Ley Federal de Protección de Datos Personales en Posesión de Particulares (LFPDPPP), EnKaje Pro pone a disposición el presente Aviso de Privacidad.</p></div>
        <h2 style={LEGAL_S.h2}>1. Responsable del Tratamiento</h2>
        <p style={LEGAL_S.p}><strong style={{color:"#e8e0d0"}}>EnKaje Pro</strong> · Monterrey, Nuevo León, México · <span style={{color:"#d4af37"}}>hola@enkajepro.com</span></p>
        <p style={{...LEGAL_S.p,color:"#555",fontStyle:"italic",fontSize:12}}>Nota: La razón social y RFC serán actualizados una vez formalizado el registro ante el SAT.</p>
        <h2 style={LEGAL_S.h2}>2. Datos que Recabamos</h2>
        <LegalUL items={["Nombre completo","Correo electrónico","Teléfono","Dirección del proyecto","Especificaciones del proyecto de carpintería","Fotografías del espacio o proyecto subidas voluntariamente por el usuario","Imágenes de renders generadas por inteligencia artificial a partir de las fotos proporcionadas","Datos de navegación y uso de la plataforma"]} />
        <p style={LEGAL_S.p}>No recabamos datos sensibles como información financiera completa, biométricos ni datos de salud.</p>
        <h2 style={LEGAL_S.h2}>3. Finalidad del Tratamiento</h2>
        <LegalUL items={["Conectar clientes con talleres de carpintería en Monterrey","Generar presupuestos y levantamientos de proyectos","Procesar imágenes mediante sistemas de inteligencia artificial para generar propuestas visuales (renders) del proyecto","Crear y gestionar el expediente digital del cliente para facilitar la cotización con talleres","Enviar comunicaciones relacionadas con su proyecto","Mejorar los servicios y algoritmos de la plataforma","Cumplir con obligaciones legales"]} />
        <div style={LEGAL_S.div}/>
        <h2 style={LEGAL_S.h2}>4. Uso de Inteligencia Artificial</h2>
        <p style={LEGAL_S.p}>EnKaje Pro utiliza sistemas de inteligencia artificial para generar propuestas visuales (renders) a partir de las imágenes y especificaciones proporcionadas por el usuario. Al subir una fotografía a la plataforma, el usuario autoriza expresamente su procesamiento por dichos sistemas con la finalidad de generar la propuesta visual solicitada.</p>
        <p style={LEGAL_S.p}>Los renders generados son propuestas visuales de carácter referencial y no constituyen una garantía del resultado final del proyecto. El resultado real puede diferir del render generado debido a materiales, condiciones del espacio, interpretación del taller u otros factores. Los rangos de precio estimados son igualmente referenciales y no representan cotizaciones formales.</p>
        <p style={LEGAL_S.p}>EnKaje Pro retiene los derechos sobre los renders generados por sus sistemas. El usuario obtiene una licencia de uso personal, no comercial, sobre el render asociado a su proyecto.</p>
        <h2 style={LEGAL_S.h2}>5. Transferencia de Datos</h2>
        <p style={LEGAL_S.p}>Sus datos, incluyendo fotografías del proyecto y renders generados, podrán ser compartidos con los talleres registrados y verificados en la plataforma, únicamente para la gestión y cotización de su proyecto. Esta transferencia es necesaria para la prestación del servicio y se considera aceptada al usar la plataforma.</p>
        <p style={LEGAL_S.p}>No vendemos ni comercializamos sus datos personales a terceros con fines publicitarios o de mercadotecnia.</p>
        <h2 style={LEGAL_S.h2}>6. Derechos ARCO</h2>
        <p style={LEGAL_S.p}>Tiene derecho a <strong style={{color:"#e8e0d0"}}>Acceder, Rectificar, Cancelar u Oponerse</strong> al tratamiento de sus datos. Envíe su solicitud a <span style={{color:"#d4af37"}}>privacidad@enkajepro.com</span> con nombre completo, descripción del derecho y copia de ID. Respuesta en máximo 20 días hábiles.</p>
        <h2 style={LEGAL_S.h2}>7. Seguridad</h2>
        <p style={LEGAL_S.p}>Implementamos medidas técnicas y administrativas para proteger sus datos, incluyendo cifrado en tránsito y en reposo mediante Supabase. Las fotografías e imágenes subidas se almacenan en servidores seguros con acceso restringido.</p>
        <h2 style={LEGAL_S.h2}>8. Cambios al Aviso</h2>
        <p style={LEGAL_S.p}>Nos reservamos el derecho de modificar este Aviso. Los cambios se notificarán con al menos 30 días de anticipación mediante correo electrónico o aviso visible en la plataforma. El uso continuado del servicio tras la notificación implica la aceptación de los cambios.</p>
        <div style={LEGAL_S.foot}><p style={{...LEGAL_S.p,margin:0,fontWeight:600,color:"#e8e0d0",marginBottom:6}}>¿Preguntas sobre tu privacidad?</p><p style={{...LEGAL_S.p,margin:0}}>Escríbenos a <span style={{color:"#d4af37"}}>privacidad@enkajepro.com</span></p></div>
      </div>
    </div>
  );
}

function PaginaTerminos({ onBack }) {
  useEffect(() => window.scrollTo(0,0), []);
  return (
    <div style={LEGAL_S.page}>
      <LegalHdr onBack={onBack} />
      <div style={LEGAL_S.wrap}>
        <div style={LEGAL_S.badge}>LEGAL</div>
        <h1 style={LEGAL_S.h1}>Términos y Condiciones</h1>
        <p style={LEGAL_S.meta}>Última actualización: junio 2026 · Monterrey, Nuevo León, México</p>
        <div style={LEGAL_S.box}><p style={{...LEGAL_S.p,color:"#d4af37",margin:0,fontWeight:600}}>Al usar EnKaje Pro, aceptas estos términos en su totalidad. Si no estás de acuerdo, te pedimos no usar la plataforma.</p></div>
        <h2 style={LEGAL_S.h2}>1. Descripción del Servicio</h2>
        <p style={LEGAL_S.p}><strong style={{color:"#e8e0d0"}}>EnKaje Pro actúa exclusivamente como intermediario</strong> digital que conecta clientes con talleres de carpintería independientes. EnKaje Pro no es parte del contrato entre cliente y taller, y no es responsable de la ejecución, calidad, tiempos, entrega ni precio final de los trabajos acordados entre las partes.</p>
        <p style={LEGAL_S.p}>Adicionalmente, EnKaje Pro ofrece herramientas de inteligencia artificial para generación de propuestas visuales (renders) y estimaciones de inversión, cuyo carácter es estrictamente referencial.</p>
        <h2 style={LEGAL_S.h2}>2. Registro y Cuentas</h2>
        <LegalUL items={["Debes ser mayor de 18 años para registrarte","Eres responsable de mantener la confidencialidad de tu contraseña","Debes proporcionar información verídica al registrarte","Las cuentas de taller son activadas exclusivamente por el equipo EnKaje Pro tras completar el proceso de verificación","Nos reservamos el derecho de suspender o eliminar cuentas que violen estos términos"]} />
        <h2 style={LEGAL_S.h2}>3. Verificación de Talleres</h2>
        <p style={LEGAL_S.p}>EnKaje Pro aplica un proceso de verificación básica antes de activar la cuenta de cualquier taller, que incluye validación de identidad del responsable, datos de contacto y ubicación del negocio. Este proceso tiene como finalidad mantener un directorio de talleres confiables, sin que ello constituya garantía alguna sobre la calidad, legalidad o resultado de sus servicios.</p>
        <p style={LEGAL_S.p}>EnKaje Pro no es responsable por actos, omisiones, incumplimientos o daños causados por los talleres registrados. La relación contractual por cualquier trabajo realizado es exclusivamente entre el cliente y el taller.</p>
        <h2 style={LEGAL_S.h2}>4. Contenido e Imágenes Subidas</h2>
        <p style={LEGAL_S.p}>Al subir fotografías u otro contenido a la plataforma, el usuario declara y garantiza que:</p>
        <LegalUL items={["Tiene derechos legales sobre las imágenes subidas o ha obtenido la autorización correspondiente","El contenido no viola derechos de terceros ni contiene material ilegal","Autoriza expresamente a EnKaje Pro a procesar dichas imágenes mediante sistemas de inteligencia artificial para generar la propuesta visual solicitada","Autoriza a EnKaje Pro a compartir las imágenes con los talleres asignados para fines de cotización"]} />
        <div style={LEGAL_S.div}/>
        <h2 style={LEGAL_S.h2}>5. Inteligencia Artificial y Renders</h2>
        <p style={LEGAL_S.p}>Los renders generados por la plataforma son propuestas visuales creadas mediante inteligencia artificial a partir de las imágenes y preferencias del usuario. Tienen carácter estrictamente referencial y <strong style={{color:"#e8e0d0"}}>no constituyen una garantía del resultado final</strong> del proyecto.</p>
        <p style={LEGAL_S.p}>Los rangos de inversión estimados son aproximaciones basadas en parámetros generales del mercado y no representan cotizaciones formales. El precio real será determinado por el taller en su cotización.</p>
        <p style={LEGAL_S.p}>EnKaje Pro retiene los derechos sobre los renders generados por sus sistemas de IA. El usuario obtiene una licencia de uso personal, no transferible y no comercial. Queda prohibido remover, alterar u ocultar la marca de agua presente en renders generados en modalidad gratuita.</p>
        <h2 style={LEGAL_S.h2}>6. Servicio Freemium</h2>
        <p style={LEGAL_S.p}>EnKaje Pro ofrece una generación gratuita de render sin necesidad de crear una cuenta. Esta generación incluye marca de agua y no permite descarga en alta resolución. Al registrarse, el usuario accede a generaciones adicionales según los términos vigentes del plan gratuito.</p>
        <h2 style={LEGAL_S.h2}>7. Uso Prohibido</h2>
        <LegalUL items={["Usar la plataforma para fines ilegales o fraudulentos","Publicar información falsa sobre proyectos o presupuestos","Contactar directamente a talleres para evadir la intermediación de EnKaje Pro","Subir imágenes sobre las cuales no se tienen derechos o que contengan contenido ilegal","Remover o alterar marcas de agua en renders generados en modalidad gratuita","Copiar o redistribuir contenido de la plataforma sin autorización escrita","Interferir con el funcionamiento técnico de la plataforma"]} />
        <h2 style={LEGAL_S.h2}>8. Limitación de Responsabilidad</h2>
        <div style={LEGAL_S.warn}><p style={{...LEGAL_S.p,margin:0,color:"#f44336",fontWeight:600}}>Limitación de Responsabilidad</p><p style={{...LEGAL_S.p,margin:"6px 0 0"}}>La responsabilidad máxima de EnKaje Pro ante cualquier reclamación se limita al monto de la suscripción mensual pagada por el usuario en el mes en que ocurrió el evento reclamado.</p></div>
        <h2 style={LEGAL_S.h2}>9. Suscripciones y Pagos</h2>
        <LegalUL items={["Planes: Básico $699, Profesional $1,499 y Elite $2,999 MXN/mes","Pagos mensuales anticipados","Sin reembolsos por períodos parciales","Puedes cancelar en cualquier momento desde tu panel","Los precios pueden cambiar con al menos 30 días de aviso previo"]} />
        <h2 style={LEGAL_S.h2}>10. Propiedad Intelectual</h2>
        <p style={LEGAL_S.p}>Todo el contenido, diseño, código, marca, renders generados por IA y materiales de EnKaje Pro son propiedad de EnKaje Pro y están protegidos por las leyes de propiedad intelectual mexicanas.</p>
        <h2 style={LEGAL_S.h2}>11. Ley Aplicable</h2>
        <p style={LEGAL_S.p}>Estos Términos se rigen por las leyes de los Estados Unidos Mexicanos. Cualquier controversia se somete a la jurisdicción de los tribunales competentes de Monterrey, Nuevo León.</p>
        <div style={LEGAL_S.foot}><p style={{...LEGAL_S.p,margin:0,fontWeight:600,color:"#e8e0d0",marginBottom:6}}>¿Dudas sobre los términos?</p><p style={{...LEGAL_S.p,margin:0}}>Escríbenos a <span style={{color:"#d4af37"}}>hola@enkajepro.com</span></p></div>
      </div>
    </div>
  );
}

function PaginaCookies({ onBack }) {
  useEffect(() => window.scrollTo(0,0), []);
  const tipos = [
    { label:"Cookies Esenciales", icon:"🔒", color:"#4caf50", desc:"Indispensables para que la plataforma funcione. Sin ellas no puedes iniciar sesión.", ej:"Sesión de usuario, token de autenticación", fija:true },
    { label:"Cookies de Rendimiento", icon:"📊", color:"#d4af37", desc:"Recopilan información anónima para ayudarnos a mejorar la plataforma.", ej:"Páginas visitadas, tiempo en cada sección, errores técnicos", fija:false },
    { label:"Cookies Funcionales", icon:"⚙️", color:"#00bcd4", desc:"Recuerdan tus preferencias para una experiencia personalizada.", ej:"Tipo de proyecto preferido, configuración de formularios", fija:false },
    { label:"Cookies de Marketing", icon:"📢", color:"#f0a500", desc:"Publicidad relevante en otras plataformas. Solo con tu consentimiento.", ej:"Meta Pixel, Google Ads (cuando estén activos)", fija:false },
  ];
  return (
    <div style={LEGAL_S.page}>
      <LegalHdr onBack={onBack} />
      <div style={LEGAL_S.wrap}>
        <div style={LEGAL_S.badge}>LEGAL</div>
        <h1 style={LEGAL_S.h1}>Política de Cookies</h1>
        <p style={LEGAL_S.meta}>Última actualización: enero 2025 · Monterrey, Nuevo León, México</p>
        <h2 style={LEGAL_S.h2}>¿Qué son las Cookies?</h2>
        <p style={LEGAL_S.p}>Pequeños archivos de texto que se almacenan en tu dispositivo para que la plataforma funcione correctamente, recuerde tus preferencias y mejore continuamente.</p>
        <h2 style={LEGAL_S.h2}>Tipos de Cookies que Usamos</h2>
        {tipos.map((t,i) => (
          <div key={i} style={{background:"#0f0f0a", border:`1px solid ${t.color}30`, borderRadius:12, padding:"16px 18px", marginBottom:10}}>
            <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:6}}>
              <span style={{fontWeight:700, color:"#e8e0d0", fontSize:13}}>{t.icon} {t.label}</span>
              <span style={{background: t.fija?"#0a2a0a":"#1a1208", border:`1px solid ${t.fija?"#4caf5040":"#d4af3740"}`, color: t.fija?"#4caf50":"#d4af37", borderRadius:20, padding:"2px 10px", fontSize:11, fontWeight:700}}>{t.fija?"Necesaria":"Opcional"}</span>
            </div>
            <p style={{fontSize:13, color:"#888", margin:"0 0 4px", lineHeight:1.6}}>{t.desc}</p>
            <p style={{fontSize:11, color:"#555", margin:0}}>Ejemplos: {t.ej}</p>
          </div>
        ))}
        <h2 style={LEGAL_S.h2}>Cookies de Terceros</h2>
        <LegalUL items={["Supabase — autenticación y base de datos","Vercel — hosting y rendimiento","Google Fonts — tipografías"]} />
        <h2 style={LEGAL_S.h2}>Cómo Controlar las Cookies</h2>
        <LegalUL items={["Chrome: Configuración → Privacidad → Cookies","Safari: Preferencias → Privacidad","Firefox: Opciones → Privacidad y Seguridad","Edge: Configuración → Privacidad, búsqueda y servicios"]} />
        <div style={LEGAL_S.foot}><p style={{...LEGAL_S.p,margin:0,fontWeight:600,color:"#e8e0d0",marginBottom:6}}>¿Preguntas sobre cookies?</p><p style={{...LEGAL_S.p,margin:0}}>Escríbenos a <span style={{color:"#d4af37"}}>privacidad@enkajepro.com</span></p></div>
      </div>
    </div>
  );
}

function CookieBanner({ onVerCookies }) {
  const [visible, setVisible] = useState(false);
  const [detalle, setDetalle] = useState(false);
  const [prefs, setPrefs] = useState({ rendimiento:true, funcionales:true, marketing:false });
  useEffect(() => { if(!localStorage.getItem("enkaje_cookies")) setTimeout(()=>setVisible(true),1500); }, []);
  const aceptar = () => { localStorage.setItem("enkaje_cookies", JSON.stringify({all:true,ts:Date.now()})); setVisible(false); };
  const soloEsencial = () => { localStorage.setItem("enkaje_cookies", JSON.stringify({essential:true,ts:Date.now()})); setVisible(false); };
  const guardar = () => { localStorage.setItem("enkaje_cookies", JSON.stringify({...prefs,essential:true,ts:Date.now()})); setVisible(false); };
  if(!visible) return null;
  return (
    <div style={{position:"fixed",bottom:0,left:0,right:0,zIndex:9999,background:"#0f0f0a",borderTop:"2px solid #d4af3730",padding:"18px 24px",boxShadow:"0 -8px 40px #00000080"}}>
      {!detalle ? (
        <div style={{maxWidth:900,margin:"0 auto",display:"flex",gap:20,alignItems:"center",flexWrap:"wrap"}}>
          <div style={{flex:1,minWidth:240}}>
            <p style={{fontSize:13,color:"#e8e0d0",fontWeight:700,margin:"0 0 4px"}}>🍪 Usamos cookies</p>
            <p style={{fontSize:12,color:"#666",margin:0,lineHeight:1.6}}>
              Usamos cookies esenciales para que la plataforma funcione y opcionales para mejorar tu experiencia.{" "}
              <button onClick={onVerCookies} style={{background:"none",border:"none",color:"#d4af37",cursor:"pointer",fontSize:12,padding:0,textDecoration:"underline"}}>Ver política</button>
            </p>
          </div>
          <div style={{display:"flex",gap:8,flexWrap:"wrap",flexShrink:0}}>
            <button onClick={()=>setDetalle(true)} style={{background:"transparent",border:"1px solid #333",color:"#666",borderRadius:8,padding:"8px 14px",fontSize:12,cursor:"pointer"}}>Personalizar</button>
            <button onClick={soloEsencial} style={{background:"transparent",border:"1px solid #d4af3750",color:"#aaa",borderRadius:8,padding:"8px 14px",fontSize:12,cursor:"pointer"}}>Solo esenciales</button>
            <button onClick={aceptar} style={{background:"#d4af37",border:"none",color:"#000",borderRadius:8,padding:"8px 20px",fontSize:13,cursor:"pointer",fontWeight:900}}>Aceptar todo</button>
          </div>
        </div>
      ) : (
        <div style={{maxWidth:900,margin:"0 auto"}}>
          <p style={{fontSize:13,fontWeight:700,color:"#e8e0d0",margin:"0 0 14px"}}>Personaliza tus cookies</p>
          {[{k:"esencial",l:"Esenciales",fija:true},{k:"rendimiento",l:"Rendimiento",fija:false},{k:"funcionales",l:"Funcionales",fija:false},{k:"marketing",l:"Marketing",fija:false}].map(({k,l,fija})=>(
            <div key={k} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 0",borderBottom:"1px solid #1a1a12"}}>
              <span style={{fontSize:13,color:"#e8e0d0"}}>{l}</span>
              {fija ? <span style={{fontSize:11,color:"#4caf50",fontWeight:700}}>Siempre activa</span> :
                <button onClick={()=>setPrefs(p=>({...p,[k]:!p[k]}))} style={{width:40,height:22,borderRadius:11,border:"none",cursor:"pointer",background:prefs[k]?"#d4af37":"#333",position:"relative",transition:"background .2s",flexShrink:0}}>
                  <span style={{position:"absolute",top:2,left:prefs[k]?20:2,width:18,height:18,borderRadius:"50%",background:"#fff",transition:"left .2s"}}/>
                </button>}
            </div>
          ))}
          <div style={{display:"flex",gap:8,marginTop:14,justifyContent:"flex-end"}}>
            <button onClick={()=>setDetalle(false)} style={{background:"transparent",border:"1px solid #333",color:"#666",borderRadius:8,padding:"8px 14px",fontSize:12,cursor:"pointer"}}>Cancelar</button>
            <button onClick={guardar} style={{background:"#d4af37",border:"none",color:"#000",borderRadius:8,padding:"8px 18px",fontSize:13,cursor:"pointer",fontWeight:900}}>Guardar</button>
          </div>
        </div>
      )}
    </div>
  );
}

const SUPABASE_URL = "https://iucoggyualkyojmmgael.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml1Y29nZ3l1YWxreW9qbW1nYWVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAwMTMxOTMsImV4cCI6MjA5NTU4OTE5M30.QNU604KcLaSxXxoZaxmVbt-sf-aFDTjrVoTR4K-wy5c";

const sb = async (path, opts = {}) => {
  const sep = path.includes("?") ? "&" : "?";
  const url = `${SUPABASE_URL}/rest/v1/${path}${sep}apikey=${SUPABASE_KEY}`;
  const authToken = opts.token || SUPABASE_KEY;
  const fetchOpts = {
    method: opts.method || "GET",
    headers: { "Authorization": `Bearer ${authToken}`, "Content-Type": "application/json", "Prefer": "return=representation" }
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
  { key: "moderno",       label: "Moderno",       desc: "Lineas limpias, colores neutros",    img: "/moderno.jpg" },
  { key: "minimalista",   label: "Minimalista",   desc: "Lo esencial, espacios abiertos",     img: "/minimalista.jpg" },
  { key: "contemporaneo", label: "Contemporaneo", desc: "Mezcla de estilos actuales",         img: "/contemporaneo.jpg" },
  { key: "industrial",    label: "Industrial",    desc: "Metal, madera cruda, urbano",        img: "/industrial.jpg" },
  { key: "clasico",       label: "Clasico",       desc: "Molduras, detalles ornamentales",    img: "/clasico.jpg" },
  { key: "rustico",       label: "Rustico",       desc: "Madera natural, texturas organicas", img: "/rustico.jpg" },
  { key: "nordico",       label: "Nordico",       desc: "Blanco, madera clara, acogedor",     img: "/nordico.jpg" },
  { key: "lujo",          label: "Lujo / Premium",desc: "Materiales nobles, exclusividad",    img: "/lujo.jpg" },
];

const ESTILOS_CLOSET = [
  { key: "moderno",       label: "Moderno",       desc: "Lineas limpias, colores neutros",    img: "https://raw.githubusercontent.com/pccmymas/public-estilos-/main/closet-moderno.webp" },
  { key: "minimalista",   label: "Minimalista",   desc: "Lo esencial, espacios abiertos",     img: "https://raw.githubusercontent.com/pccmymas/public-estilos-/main/closet-minimalista.jpg" },
  { key: "contemporaneo", label: "Contemporaneo", desc: "Puertas de vidrio, elegante",        img: "https://raw.githubusercontent.com/pccmymas/public-estilos-/main/closet-contemporaneo.webp" },
  { key: "industrial",    label: "Industrial",    desc: "Metal y madera, urbano",             img: "https://raw.githubusercontent.com/pccmymas/public-estilos-/main/closet-industrial.jpg" },
  { key: "clasico",       label: "Clasico",       desc: "Molduras, detalles ornamentales",    img: "https://raw.githubusercontent.com/pccmymas/public-estilos-/main/closet-clasico.jpg" },
  { key: "rustico",       label: "Rustico",       desc: "Madera natural, texturas organicas", img: "https://raw.githubusercontent.com/pccmymas/public-estilos-/main/closet-rustico.jpg" },
  { key: "nordico",       label: "Nordico",       desc: "Blanco, madera clara, acogedor",     img: "https://raw.githubusercontent.com/pccmymas/public-estilos-/main/closet-nordico.jpg" },
  { key: "lujo",          label: "Lujo / Premium",desc: "Materiales nobles, exclusividad",    img: "https://raw.githubusercontent.com/pccmymas/public-estilos-/main/closet-lujo.jpg" },
];

// ── RANGOS DE INVERSIÓN — Precios reales Monterrey 2025 ──────────────────────
const RANGOS_ESTIMACION = {
  cocina:  { basico: [35000, 60000],  medio: [55000, 95000],  premium: [90000, 160000] },
  closet:  { basico: [18000, 35000],  medio: [35000, 65000],  premium: [65000, 130000] },
  puerta:  { basico: [8000,  16000],  medio: [15000, 28000],  premium: [26000, 55000]  },
  mueble:  { basico: [12000, 25000],  medio: [24000, 45000],  premium: [42000, 90000]  },
  panel:   { basico: [6000,  14000],  medio: [13000, 28000],  premium: [25000, 55000]  },
  bano:    { basico: [12000, 24000],  medio: [22000, 42000],  premium: [40000, 85000]  },
};

const NIVEL_POR_ESTILO = {
  moderno:"medio", minimalista:"basico", nordico:"basico",
  contemporaneo:"medio", rustico:"medio", industrial:"medio",
  clasico:"premium", lujo:"premium",
};

const FACTOR_MATERIAL = { melamina:1.0, mdf:1.2, enchapado:1.5, madera_solida:2.0 };

function calcularRangoEstimacion(tipo, estilo, material) {
  const nivel = NIVEL_POR_ESTILO[estilo] || "medio";
  const base  = RANGOS_ESTIMACION[tipo]?.[nivel] || RANGOS_ESTIMACION.cocina.medio;
  const factor = FACTOR_MATERIAL[material] || 1.0;
  return {
    min: Math.round(base[0] * factor / 1000) * 1000,
    max: Math.round(base[1] * factor / 1000) * 1000,
  };
}

const FORM_INIT = {
  tipo_proyecto: "cocina", nombre: "", telefono: "", direccion: "", correo: "",
  fecha: new Date().toISOString().split("T")[0], atencion_por: "Felipe Santiago",
  tipo_cocina: [], tipo_cocina_otro: "", largo: "", altura: "", profundidad: "",
  medidas_isla: "", medidas_alacena: "", altura_superiores: "", area: "",
  estilo: [], estilo_otro: "", material: [], material_otro: "", grosor: [],
  color_principal: "", color_secundario: "", tipo_acabado: [], acabado_otro: "", textura: "",
  tipo_puertas: [], puertas_otro: "", jaladeras: [], jaladeras_otro: "",
  bisagras: [], correderas: [], accesorios: [], accesorios_otro: "",
  material_cubierta: [], cubierta_otro: "", color_cubierta: "", tarja: [], griferia: [],
  electrodomesticos: [], medidas_electro: "", iluminacion: [], observaciones: "",
  materiales_solicitados: "", herrajes_solicitados: "", nivel_calidad: "", comentarios_tecnicos: "",
  precio_fabricacion: "", precio_instalacion: "", precio_cubierta: "", precio_herrajes: "", precio_otros: "",
  incluye: "", no_incluye: "", tiempo_entrega: "20 a 30 dias habiles",
  anticipo: "60", pago_entrega: "30", pago_final: "10", garantia: "6 meses en instalacion y herrajes",
};

const FORM_CLOSET_INIT = {
  tipo_proyecto: "closet", nombre: "", telefono: "", direccion: "", correo: "",
  fecha: new Date().toISOString().split("T")[0], atencion_por: "Felipe Santiago",
  tipo_closet: [], tipo_closet_otro: "", largo: "", altura: "", profundidad: "", area: "",
  estilo: [], material: [], grosor: [], color_principal: "", color_secundario: "", tipo_acabado: [],
  tipo_puertas: [], jaladeras: [], bisagras: [], correderas: [], accesorios_closet: [],
  iluminacion: [], observaciones: "", materiales_solicitados: "", nivel_calidad: "", comentarios_tecnicos: "",
  precio_fabricacion: "", precio_instalacion: "", precio_herrajes: "", precio_otros: "",
  incluye: "", no_incluye: "", tiempo_entrega: "15 a 20 dias habiles",
  anticipo: "60", pago_entrega: "30", pago_final: "10", garantia: "6 meses en instalacion y herrajes",
};

const FORM_PUERTA_INIT = {
  tipo_proyecto: "puerta", nombre: "", telefono: "", direccion: "", correo: "",
  fecha: new Date().toISOString().split("T")[0], atencion_por: "Felipe Santiago",
  tipo_puerta: [], tipo_puerta_otro: "", ancho: "", alto: "", grosor_puerta: "", cantidad: "",
  estilo: [], material: [], color_principal: "", color_secundario: "", tipo_acabado: [],
  tipo_marco: [], herrajes_puerta: [], observaciones: "",
  materiales_solicitados: "", nivel_calidad: "", comentarios_tecnicos: "",
  precio_fabricacion: "", precio_instalacion: "", precio_herrajes: "", precio_otros: "",
  incluye: "", no_incluye: "", tiempo_entrega: "10 a 15 dias habiles",
  anticipo: "60", pago_entrega: "30", pago_final: "10", garantia: "6 meses en instalacion",
};

const FORM_MUEBLE_INIT = {
  tipo_proyecto: "mueble", nombre: "", telefono: "", direccion: "", correo: "",
  fecha: new Date().toISOString().split("T")[0], atencion_por: "Felipe Santiago",
  tipo_mueble: [], tipo_mueble_otro: "", largo: "", alto: "", profundidad: "", cantidad: "",
  estilo: [], material: [], grosor: [], color_principal: "", color_secundario: "", tipo_acabado: [],
  accesorios_mueble: [], observaciones: "", materiales_solicitados: "", nivel_calidad: "", comentarios_tecnicos: "",
  precio_fabricacion: "", precio_instalacion: "", precio_herrajes: "", precio_otros: "",
  incluye: "", no_incluye: "", tiempo_entrega: "15 a 20 dias habiles",
  anticipo: "60", pago_entrega: "30", pago_final: "10", garantia: "6 meses en instalacion",
};

const FORM_BANO_INIT = {
  tipo_proyecto: "bano", nombre: "", telefono: "", direccion: "", correo: "",
  fecha: new Date().toISOString().split("T")[0], atencion_por: "Felipe Santiago",
  tipo_mueble_bano: [], tipo_mueble_bano_otro: "",
  ancho: "", alto: "", profundidad: "", cantidad: "",
  instalacion: [], estilo: [], material: [], grosor: [], color_principal: "", color_secundario: "",
  tipo_acabado: [], tipo_puertas: [], jaladeras: [], bisagras: [], correderas: [],
  tipo_tarja: [], color_tarja: "", griferia: [],
  iluminacion_bano: [], espejo: [], accesorios_bano: [], observaciones: "",
  materiales_solicitados: "", nivel_calidad: "", comentarios_tecnicos: "",
  precio_fabricacion: "", precio_instalacion: "", precio_herrajes: "", precio_otros: "",
  incluye: "", no_incluye: "", tiempo_entrega: "10 a 15 dias habiles",
  anticipo: "60", pago_entrega: "30", pago_final: "10", garantia: "6 meses en instalacion y herrajes",
};

const FORM_PANEL_INIT = {
  tipo_proyecto: "panel", nombre: "", telefono: "", direccion: "", correo: "",
  fecha: new Date().toISOString().split("T")[0], atencion_por: "Felipe Santiago",
  tipo_panel: [], ubicacion_panel: [], largo: "", alto: "", cantidad: "",
  material_panel: [], grosor: [], acabado_panel: [], color_principal: "", color_secundario: "",
  patron_panel: [], instalacion_panel: [], observaciones: "",
  materiales_solicitados: "", nivel_calidad: "", comentarios_tecnicos: "",
  precio_fabricacion: "", precio_instalacion: "", precio_herrajes: "", precio_otros: "",
  incluye: "", no_incluye: "", tiempo_entrega: "5 a 10 dias habiles",
  anticipo: "60", pago_entrega: "30", pago_final: "10", garantia: "6 meses en instalacion",
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

const PILL = ({ label, checked, onChange, color = "#d4af37" }) => (
  <button onClick={onChange} style={{
    padding: "8px 14px", borderRadius: 50, border: `1.5px solid ${checked ? color : "#2a2a20"}`,
    background: checked ? `${color}20` : "#0d0d0a", color: checked ? color : "#aaa",
    fontSize: 13, cursor: "pointer", fontWeight: checked ? 700 : 400,
    transition: "all .15s ease", display: "flex", alignItems: "center", gap: 6,
    boxShadow: checked ? `0 0 12px ${color}30` : "none",
    transform: checked ? "scale(1.03)" : "scale(1)", whiteSpace: "nowrap"
  }}>
    {checked && <span style={{ fontSize: 11, fontWeight: 900 }}>✓</span>}
    {label}
  </button>
);

const PILL_SINGLE = ({ label, checked, onChange, color = "#d4af37" }) => (
  <button onClick={onChange} style={{
    padding: "8px 14px", borderRadius: 50, border: `1.5px solid ${checked ? color : "#2a2a20"}`,
    background: checked ? color : "#0d0d0a", color: checked ? "#000" : "#666",
    fontSize: 13, cursor: "pointer", fontWeight: checked ? 700 : 400,
    transition: "all .15s ease", whiteSpace: "nowrap",
    boxShadow: checked ? `0 0 12px ${color}40` : "none",
    transform: checked ? "scale(1.03)" : "scale(1)",
  }}>{label}</button>
);

const PILLS_GROUP = ({ options, value, onChange, multi = true, color = "#d4af37" }) => (
  <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 4 }}>
    {options.map(op => multi ? (
      <PILL key={op} label={op} color={color}
        checked={Array.isArray(value) && value.includes(op)}
        onChange={() => onChange(Array.isArray(value) ? (value.includes(op) ? value.filter(x => x !== op) : [...value, op]) : [op])} />
    ) : (
      <PILL_SINGLE key={op} label={op} color={color}
        checked={value === op} onChange={() => onChange(value === op ? "" : op)} />
    ))}
  </div>
);

const INPUT = ({ label, value, onChange, placeholder, type = "text", style = {} }) => (
  <div style={{ marginBottom: 14, ...style }}>
    {label && <label style={{ fontSize: 11, color: "#999", display: "block", marginBottom: 5, textTransform: "uppercase", letterSpacing: 1 }}>{label}</label>}
    <input value={value} onChange={onChange} placeholder={placeholder} type={type}
      style={{ width: "100%", background: "#0d0d0a", border: "1px solid #2a2a20", borderRadius: 10, padding: "12px 14px", color: "#e8e0d0", fontSize: 15, boxSizing: "border-box", outline: "none" }} />
  </div>
);

const TEXTAREA = ({ label, value, onChange, placeholder, rows = 3 }) => (
  <div style={{ marginBottom: 14 }}>
    {label && <label style={{ fontSize: 11, color: "#999", display: "block", marginBottom: 5, textTransform: "uppercase", letterSpacing: 1 }}>{label}</label>}
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
    {subtitle && <p style={{ fontSize: 12, color: "#aaa", margin: "0 0 14px" }}>{subtitle}</p>}
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

// ── SHARE MENU ────────────────────────────────────────────────────────────────
const FA_CDN = `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" crossorigin="anonymous"/>`;
const GLOBAL_CSS = `
  * { box-sizing: border-box; }
  body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
  input, select, textarea, button { font-family: inherit; }
  ::-webkit-scrollbar { width: 5px; height: 5px; }
  ::-webkit-scrollbar-track { background: #0a0a0a; }
  ::-webkit-scrollbar-thumb { background: #d4af3740; border-radius: 3px; }
  input::placeholder { color: #777 !important; }
  textarea::placeholder { color: #777 !important; }
  @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
  .fade-up { animation: fadeUp 0.5s ease forwards; }
`;

const SHARE_OPTIONS = [
  { key:"whatsapp",  label:"WhatsApp",  fa:"fa-brands fa-whatsapp",  color:"#25D366" },
  { key:"facebook",  label:"Facebook",  fa:"fa-brands fa-facebook",  color:"#1877F2" },
  { key:"messenger", label:"Messenger", fa:"fa-brands fa-facebook-messenger", color:"#0084FF" },
  { key:"email",     label:"Email",     fa:"fa-solid fa-envelope",   color:"#d4af37" },
  { key:"instagram", label:"Instagram", fa:"fa-brands fa-instagram", color:"#E1306C" },
  { key:"tiktok",    label:"TikTok",    fa:"fa-brands fa-tiktok",    color:"#ee1d52"  },
  { key:"copiar",    label:"Copiar",    fa:"fa-solid fa-copy",       color:"#aaa"    },
];

function ShareMenu({ onShare, label = "Compartir" }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    setTimeout(() => document.addEventListener("click", close), 10);
    return () => document.removeEventListener("click", close);
  }, [open]);
  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <button
        onClick={e => { e.stopPropagation(); setOpen(o => !o); }}
        style={{ background: "transparent", border: "1.5px solid #d4af37", color: "#d4af37", borderRadius: 10, padding: "9px 16px", fontWeight: 700, fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
        <i className="fa-solid fa-share-nodes" style={{ fontSize: 14 }} />
        {label}
      </button>
      {open && (
        <div onClick={e => e.stopPropagation()} style={{ position: "absolute", bottom: "calc(100% + 8px)", left: 0, background: "#0f0f0a", border: "1px solid #2a2a20", borderRadius: 14, padding: "10px 12px", display: "flex", gap: 10, zIndex: 500, boxShadow: "0 8px 32px #00000090", whiteSpace: "nowrap", alignItems: "center" }}>
          {SHARE_OPTIONS.map(({ key, label: lbl, fa, color }) => (
            <button key={key}
              onClick={() => { onShare(key); setOpen(false); }}
              title={lbl}
              style={{ background: `${color}18`, border: `1.5px solid ${color}50`, color, borderRadius: 10, width: 40, height: 40, fontSize: 17, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all .15s", flexShrink: 0 }}
              onMouseEnter={e => { e.currentTarget.style.background = `${color}35`; e.currentTarget.style.transform = "scale(1.12)"; e.currentTarget.style.borderColor = color; }}
              onMouseLeave={e => { e.currentTarget.style.background = `${color}18`; e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.borderColor = `${color}50`; }}>
              <i className={fa} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function compartir(tipo, texto, titulo) {
  const msg = encodeURIComponent(`${titulo}\n\n${texto}`);
  const url = encodeURIComponent("https://enkajepro.com");
  if (tipo === "whatsapp")  window.open(`https://wa.me/?text=${msg}`, "_blank");
  if (tipo === "email")     window.open(`mailto:?subject=${encodeURIComponent(titulo)}&body=${msg}`, "_blank");
  if (tipo === "facebook")  window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${msg}`, "_blank");
  if (tipo === "messenger") window.open(`https://www.facebook.com/dialog/send?link=${url}&app_id=1401488693436528&redirect_uri=${url}`, "_blank");
  if (tipo === "instagram") { navigator.clipboard.writeText(`${titulo}\n\n${texto}`); alert("Texto copiado. Pégalo en Instagram."); }
  if (tipo === "tiktok")    { navigator.clipboard.writeText(`${titulo}\n\n${texto}`); alert("Texto copiado. Pégalo en TikTok."); }
  if (tipo === "copiar")    { navigator.clipboard.writeText(`${titulo}\n\n${texto}`); alert("Copiado al portapapeles"); }
}

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
              <div key={e.key} onClick={() => setF("estilo", sel ? form.estilo.filter(x=>x!==e.label) : [...form.estilo, e.label])}
                style={{ borderRadius: 12, overflow: "hidden", cursor: "pointer", border: `2px solid ${sel?"#d4af37":"transparent"}`, transition: "all .2s", boxShadow: sel?"0 0 16px #d4af3830":"none" }}>
                <div style={{ position: "relative", height: isMobile ? 90 : 110, background: "#1a1a10" }}>
                  <img src={e.img} alt={e.label} style={{ width: "100%", height: "100%", objectFit: "cover", filter: sel?"brightness(1.05)":"brightness(0.8)", transition: "all .3s" }} onError={ev=>{ev.target.style.display="none";ev.target.parentNode.style.background=`linear-gradient(135deg,#1a1208,#2a1f0a)`;}} />
                  {sel && <div style={{ position: "absolute", top: 6, right: 6, background: "#d4af37", color: "#000", borderRadius: "50%", width: 22, height: 22, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 12 }}>✓</div>}
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(transparent,rgba(0,0,0,0.65))", padding: "14px 8px 6px" }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: sel?"#d4af37":"#f0f0f0" }}>{e.label}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </SECTION>
      <SECTION title="Material Estructura" icon="🪵">
        <PILLS_GROUP options={["MDF","MDF RH antihumedad","Melamina","Triplay","Madera solida","PVC"]} value={form.material} onChange={v=>setF("material",v)} />
        <div style={{ marginTop: 12 }}>
          <label style={{ fontSize: 11, color: "#999", display: "block", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>Grosor</label>
          <PILLS_GROUP options={["15 mm","18 mm","Otro"]} value={form.grosor} onChange={v=>setF("grosor",v)} />
        </div>
      </SECTION>
      <SECTION title="Acabado y Color" icon="🎨">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
          <INPUT label="Color principal" value={form.color_principal} onChange={e=>setF("color_principal",e.target.value)} placeholder="Blanco, Gris, Madera..." />
          <INPUT label="Color secundario" value={form.color_secundario} onChange={e=>setF("color_secundario",e.target.value)} placeholder="Negro, Dorado..." />
        </div>
        <PILLS_GROUP options={["Mate","Alto brillo","Satinado","Texturizado","Tipo madera","Liso"]} value={form.tipo_acabado} onChange={v=>setF("tipo_acabado",v)} />
        <INPUT label="Textura o diseno deseado" value={form.textura} onChange={e=>setF("textura",e.target.value)} placeholder="Describe la textura..." style={{marginTop:12}} />
      </SECTION>
      <SECTION title="Puertas" icon="🚪">
        <PILLS_GROUP options={["Lisas","Ranuradas","Con marco","Alto brillo","Tipo madera"]} value={form.tipo_puertas} onChange={v=>setF("tipo_puertas",v)} />
        <label style={{ fontSize: 11, color: "#555", display: "block", margin: "14px 0 8px", textTransform: "uppercase", letterSpacing: 1 }}>Jaladeras</label>
        <PILLS_GROUP options={["Ocultas","Perfil Gola","Metalicas","Negras","Doradas","Integradas","Push open"]} value={form.jaladeras} onChange={v=>setF("jaladeras",v)} />
      </SECTION>
      <SECTION title="Herrajes" icon="🔧">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 14 }}>
          <div>
            <label style={{ fontSize: 11, color: "#999", display: "block", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>Bisagras</label>
            <PILLS_GROUP options={["Normales","Cierre lento","Premium"]} value={form.bisagras} onChange={v=>setF("bisagras",v)} />
          </div>
          <div>
            <label style={{ fontSize: 11, color: "#999", display: "block", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>Correderas</label>
            <PILLS_GROUP options={["Normales","Telescopicas","Cierre lento"]} value={form.correderas} onChange={v=>setF("correderas",v)} />
          </div>
        </div>
        <label style={{ fontSize: 11, color: "#999", display: "block", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>Accesorios</label>
        <PILLS_GROUP options={["Especiero","Organizador cajones","Basurero oculto","Porta cubiertos","Esquinero magico","Canastillas","Despensero extraible","Pistones hidraulicos","Iluminacion LED"]} value={form.accesorios} onChange={v=>setF("accesorios",v)} />
      </SECTION>
      <SECTION title="Cubierta" icon="⬜">
        <PILLS_GROUP options={["Granito","Cuarzo","Marmol","Melamina","Acero inoxidable","Porcelanato"]} value={form.material_cubierta} onChange={v=>setF("material_cubierta",v)} />
        <INPUT label="Color de cubierta" value={form.color_cubierta} onChange={e=>setF("color_cubierta",e.target.value)} placeholder="Blanco Calacatta, Negro..." style={{marginTop:12}} />
      </SECTION>
      <SECTION title="Tarja y Griferia" icon="🚿">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div>
            <label style={{ fontSize: 11, color: "#999", display: "block", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>Tarja</label>
            <PILLS_GROUP options={["Sencilla","Doble","Submontada","Sobrepuesta"]} value={form.tarja} onChange={v=>setF("tarja",v)} />
          </div>
          <div>
            <label style={{ fontSize: 11, color: "#999", display: "block", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>Griferia</label>
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
          <label style={{ fontSize: 11, color: "#999", display: "block", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>Nivel de calidad</label>
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
      <SECTION title="Estilo de Closet" icon="✨" subtitle="Toca el estilo que te gusta">
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4,1fr)", gap: 10 }}>
          {ESTILOS_CLOSET.map(e => {
            const sel = form.estilo.includes(e.label);
            return (
              <div key={e.key} onClick={() => setF("estilo", sel ? form.estilo.filter(x=>x!==e.label) : [...form.estilo, e.label])}
                style={{ borderRadius: 12, overflow: "hidden", cursor: "pointer", border: `2px solid ${sel?"#d4af37":"transparent"}`, transition: "all .2s", boxShadow: sel?"0 0 16px #d4af3830":"none" }}>
                <div style={{ position: "relative", height: isMobile ? 90 : 110, background: "#1a1a10" }}>
                  <img src={e.img} alt={e.label} style={{ width: "100%", height: "100%", objectFit: "cover", filter: sel?"brightness(1.05)":"brightness(0.8)", transition: "all .3s" }} onError={ev=>{ev.target.style.display="none";ev.target.parentNode.style.background="linear-gradient(135deg,#1a1208,#2a1f0a)";}} />
                  {sel && <div style={{ position: "absolute", top: 6, right: 6, background: "#d4af37", color: "#000", borderRadius: "50%", width: 22, height: 22, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 12 }}>✓</div>}
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(transparent,rgba(0,0,0,0.65))", padding: "14px 8px 6px" }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: sel?"#d4af37":"#f0f0f0" }}>{e.label}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
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
        <PILLS_GROUP options={["Sin puertas","Corredizas","Abatibles","Plegables","Espejo","Alto brillo","Tipo madera"]} value={form.tipo_puertas} onChange={v=>setF("tipo_puertas",v)} />
        <label style={{ fontSize: 11, color: "#555", display: "block", margin: "14px 0 8px", textTransform: "uppercase", letterSpacing: 1 }}>Jaladeras</label>
        <PILLS_GROUP options={["Ocultas","Perfil Gola","Metalicas","Negras","Doradas","Push open"]} value={form.jaladeras} onChange={v=>setF("jaladeras",v)} />
      </SECTION>
      <SECTION title="Herrajes" icon="🔧">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 14 }}>
          <div>
            <label style={{ fontSize: 11, color: "#999", display: "block", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>Bisagras</label>
            <PILLS_GROUP options={["Normales","Cierre lento","Premium"]} value={form.bisagras} onChange={v=>setF("bisagras",v)} />
          </div>
          <div>
            <label style={{ fontSize: 11, color: "#999", display: "block", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>Correderas</label>
            <PILLS_GROUP options={["Normales","Telescopicas","Cierre lento"]} value={form.correderas} onChange={v=>setF("correderas",v)} />
          </div>
        </div>
        <label style={{ fontSize: 11, color: "#999", display: "block", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>Accesorios de closet</label>
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
          <label style={{ fontSize: 11, color: "#999", display: "block", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>Nivel de calidad</label>
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
        <PILLS_GROUP options={["Marco de madera","Marco de aluminio","Sin marco (oculto)","Marco con moldura"]} value={form.tipo_marco} onChange={v=>setF("tipo_marco",v)} />
        <label style={{ fontSize:11, color:"#555", display:"block", margin:"14px 0 8px", textTransform:"uppercase", letterSpacing:1 }}>Chambrana</label>
        <PILLS_GROUP options={["Chambrana de madera lisa","Chambrana con moldura","Chambrana MDF","Chambrana metálica","Sin chambrana"]} value={form.chambrana||[]} onChange={v=>setF("chambrana",v)} />
        <label style={{ fontSize: 11, color: "#555", display: "block", margin: "14px 0 8px", textTransform: "uppercase", letterSpacing: 1 }}>Herrajes</label>
        <PILLS_GROUP options={["Bisagras normales","Bisagras ocultas","Chapa con llave","Chapa sin llave","Manija negra","Manija dorada","Manija cromada","Amortiguador","Puerta pivotante"]} value={form.herrajes_puerta} onChange={v=>setF("herrajes_puerta",v)} />
      </SECTION>
      <SECTION title="Observaciones" icon="📝">
        <TEXTAREA value={form.observaciones} onChange={e=>setF("observaciones",e.target.value)} placeholder="Notas adicionales, uso de la puerta, presupuesto aproximado..." rows={4} />
      </SECTION>
      {(role === "admin" || role === "taller") && (
        <SECTION title="Solo para Taller" icon="🏭">
          <TEXTAREA label="Materiales solicitados" value={form.materiales_solicitados} onChange={e=>setF("materiales_solicitados",e.target.value)} placeholder="Lista de materiales..." />
          <label style={{ fontSize: 11, color: "#999", display: "block", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>Nivel de calidad</label>
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
          <label style={{ fontSize: 11, color: "#999", display: "block", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>Nivel de calidad</label>
          <PILLS_GROUP options={["Economico","Medio","Premium"]} value={form.nivel_calidad} onChange={v=>setF("nivel_calidad",v)} multi={false} color="#00bcd4" />
          <TEXTAREA label="Comentarios tecnicos" value={form.comentarios_tecnicos} onChange={e=>setF("comentarios_tecnicos",e.target.value)} placeholder="Notas tecnicas..." style={{marginTop:12}} />
        </SECTION>
      )}
    </div>
  );
}

// ============ FORMULARIO BAÑO ============
function FormularioBano({ form, setF, role, isMobile }) {
  return (
    <div>
      <SECTION title="Datos del Cliente" icon="👤">
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 12 }}>
          <INPUT label="Nombre completo" value={form.nombre} onChange={e=>setF("nombre",e.target.value)} placeholder="María González" />
          <INPUT label="Teléfono" value={form.telefono} onChange={e=>setF("telefono",e.target.value)} placeholder="81-1234-5678" />
          <INPUT label="Correo electrónico" value={form.correo} onChange={e=>setF("correo",e.target.value)} placeholder="correo@ejemplo.com" />
          <INPUT label="Dirección" value={form.direccion} onChange={e=>setF("direccion",e.target.value)} placeholder="Calle, Colonia, Ciudad" />
          <INPUT label="Fecha" value={form.fecha} onChange={e=>setF("fecha",e.target.value)} type="date" />
          <INPUT label="Atención por" value={form.atencion_por} onChange={e=>setF("atencion_por",e.target.value)} placeholder="Felipe Santiago" />
        </div>
      </SECTION>
      <SECTION title="Tipo de Mueble de Baño" icon="🚿" subtitle="Selecciona lo que necesitas">
        <PILLS_GROUP options={["Vanity / Mueble bajo lavabo","Botiquín","Torre de baño","Nicho empotrado","Mueble auxiliar","Repisa flotante","Mueble completo de baño"]} value={form.tipo_mueble_bano} onChange={v=>setF("tipo_mueble_bano",v)} />
        <INPUT label="Otro tipo" value={form.tipo_mueble_bano_otro} onChange={e=>setF("tipo_mueble_bano_otro",e.target.value)} placeholder="Especifica..." style={{marginTop:10}} />
      </SECTION>
      <SECTION title="Medidas" icon="📐">
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4,1fr)", gap: 12 }}>
          <INPUT label="Ancho" value={form.ancho} onChange={e=>setF("ancho",e.target.value)} placeholder="0.90 m" />
          <INPUT label="Alto" value={form.alto} onChange={e=>setF("alto",e.target.value)} placeholder="0.55 m" />
          <INPUT label="Profundidad" value={form.profundidad} onChange={e=>setF("profundidad",e.target.value)} placeholder="0.45 m" />
          <INPUT label="Cantidad" value={form.cantidad} onChange={e=>setF("cantidad",e.target.value)} placeholder="1" type="number" />
        </div>
      </SECTION>
      <SECTION title="Tipo de Instalación" icon="🔩" subtitle="¿Cómo va montado?">
        <PILLS_GROUP options={["Flotante (con efecto levitación)","Con patas","Empotrado en pared","Apoyado en piso"]} value={form.instalacion} onChange={v=>setF("instalacion",v)} color="#00bcd4" />
      </SECTION>
      <SECTION title="Estilo de Diseño" icon="✨">
        <PILLS_GROUP options={["Minimalista","Moderno","Contemporáneo","Clásico","Industrial","Nórdico","Lujo / Premium"]} value={form.estilo} onChange={v=>setF("estilo",v)} />
      </SECTION>
      <SECTION title="Material" icon="🪵">
        <PILLS_GROUP options={["Melamina","MDF","MDF RH antihumedad","Madera sólida","PVC impermeable","Triplay"]} value={form.material} onChange={v=>setF("material",v)} />
        <label style={{ fontSize:11, color:"#555", display:"block", margin:"12px 0 8px", textTransform:"uppercase", letterSpacing:1 }}>Grosor</label>
        <PILLS_GROUP options={["15 mm","18 mm","Otro"]} value={form.grosor} onChange={v=>setF("grosor",v)} />
        <div style={{ marginTop:12, background:"#1a1208", border:"1px solid #d4af3720", borderRadius:10, padding:"10px 14px", fontSize:12, color:"#888" }}>
          💡 Para baños se recomienda MDF RH antihumedad o melamina resistente al vapor para mayor durabilidad.
        </div>
      </SECTION>
      <SECTION title="Acabado y Color" icon="🎨">
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:14 }}>
          <INPUT label="Color principal" value={form.color_principal} onChange={e=>setF("color_principal",e.target.value)} placeholder="Blanco mate, Gris, Negro..." />
          <INPUT label="Color secundario" value={form.color_secundario} onChange={e=>setF("color_secundario",e.target.value)} placeholder="Dorado, Cromado..." />
        </div>
        <PILLS_GROUP options={["Mate","Liso","Alto brillo","Satinado","Tipo madera","Texturizado"]} value={form.tipo_acabado} onChange={v=>setF("tipo_acabado",v)} />
      </SECTION>
      <SECTION title="Puertas y Jaladeras" icon="🚪">
        <PILLS_GROUP options={["Sin puertas (abierto)","Con puertas abatibles","Con puertas corredizas","Solo cajones","Combinación puertas y cajones"]} value={form.tipo_puertas} onChange={v=>setF("tipo_puertas",v)} />
        <label style={{ fontSize:11, color:"#555", display:"block", margin:"14px 0 8px", textTransform:"uppercase", letterSpacing:1 }}>Jaladeras</label>
        <PILLS_GROUP options={["Sin jaladeras (push open)","Perfil Gola oculta","Metálicas negras","Metálicas doradas","Metálicas cromadas","Integradas"]} value={form.jaladeras} onChange={v=>setF("jaladeras",v)} />
      </SECTION>
      <SECTION title="Herrajes" icon="🔧">
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:14 }}>
          <div>
            <label style={{ fontSize:11, color:"#999", display:"block", marginBottom:8, textTransform:"uppercase", letterSpacing:1 }}>Bisagras</label>
            <PILLS_GROUP options={["Normales","Cierre lento","Premium"]} value={form.bisagras} onChange={v=>setF("bisagras",v)} />
          </div>
          <div>
            <label style={{ fontSize:11, color:"#999", display:"block", marginBottom:8, textTransform:"uppercase", letterSpacing:1 }}>Correderas</label>
            <PILLS_GROUP options={["Normales","Telescópicas","Cierre lento"]} value={form.correderas} onChange={v=>setF("correderas",v)} />
          </div>
        </div>
      </SECTION>
      <SECTION title="Iluminación" icon="💡" subtitle="Lo que le da el efecto flotante y premium">
        <PILLS_GROUP options={["LED inferior (efecto flotante)","LED lateral espejo","LED superior","Sensores de movimiento","Sin iluminación"]} value={form.iluminacion_bano} onChange={v=>setF("iluminacion_bano",v)} color="#f0c030" />
        <div style={{ marginTop:12, background:"#1a1208", border:"1px solid #d4af3720", borderRadius:10, padding:"10px 14px", fontSize:12, color:"#888" }}>
          💡 El LED inferior crea el efecto de levitación — es el acabado más pedido en vanities modernos y minimalistas.
        </div>
      </SECTION>
      <SECTION title="Tarja / Lavabo" icon="🚿">
        <PILLS_GROUP options={["Submontada","Sobrepuesta","Integrada al mueble","Sin tarja (solo mueble)","Doble lavabo"]} value={form.tipo_tarja} onChange={v=>setF("tipo_tarja",v)} />
        <INPUT label="Color / modelo de tarja" value={form.color_tarja} onChange={e=>setF("color_tarja",e.target.value)} placeholder="Blanca, negra, acero..." style={{marginTop:12}} />
        <label style={{ fontSize:11, color:"#555", display:"block", margin:"14px 0 8px", textTransform:"uppercase", letterSpacing:1 }}>Grifería</label>
        <PILLS_GROUP options={["Negra mate","Cromada","Dorada","Níquel cepillado","Premium"]} value={form.griferia} onChange={v=>setF("griferia",v)} />
      </SECTION>
      <SECTION title="Espejo" icon="🪞">
        <PILLS_GROUP options={["Con marco integrado al mueble","Nicho empotrado con iluminación","Espejo touch con LED","Espejo simple sin marco","Sin espejo"]} value={form.espejo} onChange={v=>setF("espejo",v)} />
      </SECTION>
      <SECTION title="Accesorios" icon="🧴">
        <PILLS_GROUP options={["Porta toallas integrado","Gancho para bata","Repisa interna","Cajón organizador","Porta rollo integrado","Separadores internos"]} value={form.accesorios_bano} onChange={v=>setF("accesorios_bano",v)} />
      </SECTION>
      <SECTION title="Observaciones" icon="📝">
        <TEXTAREA value={form.observaciones} onChange={e=>setF("observaciones",e.target.value)} placeholder="Notas adicionales, presupuesto aproximado, preferencias especiales..." rows={4} />
      </SECTION>
      {(role === "admin" || role === "taller") && (
        <SECTION title="Solo para Taller" icon="🏭">
          <TEXTAREA label="Materiales solicitados" value={form.materiales_solicitados} onChange={e=>setF("materiales_solicitados",e.target.value)} placeholder="Lista de materiales específicos..." />
          <label style={{ fontSize:11, color:"#999", display:"block", marginBottom:8, textTransform:"uppercase", letterSpacing:1 }}>Nivel de calidad</label>
          <PILLS_GROUP options={["Económico","Medio","Premium"]} value={form.nivel_calidad} onChange={v=>setF("nivel_calidad",v)} multi={false} color="#00bcd4" />
          <TEXTAREA label="Comentarios técnicos" value={form.comentarios_tecnicos} onChange={e=>setF("comentarios_tecnicos",e.target.value)} placeholder="Notas técnicas del taller..." style={{marginTop:12}} />
        </SECTION>
      )}
    </div>
  );
}

// ============ PRESUPUESTO ============
function Presupuesto({ form, setF, isMobile, tipoProyecto, role, generarMateriales, materiales, materialesLoading, materialesMsg, generarContrato, tallerData, imprimirHoja, setMateriales, setMaterialesMsg }) {
  const total = [form.precio_fabricacion, form.precio_instalacion, form.precio_cubierta, form.precio_herrajes, form.precio_otros]
    .reduce((a, v) => a + (parseFloat(v) || 0), 0);

  const tipoLabel = tipoProyecto === "cocina" ? "Cocina Integral" : tipoProyecto === "closet" ? "Closet" : tipoProyecto === "puerta" ? "Puerta" : tipoProyecto === "bano" ? "Baño" : tipoProyecto === "panel" ? "Panel" : "Mueble";
  const tipoIcon  = tipoProyecto === "cocina" ? "🍳" : tipoProyecto === "closet" ? "👔" : tipoProyecto === "puerta" ? "🚪" : tipoProyecto === "bano" ? "🚿" : tipoProyecto === "panel" ? "🪵" : "🛋️";

  function textoPresupuesto() {
    const sep = "━".repeat(26);
    return `PRESUPUESTO - EnKaje Pro\n${tipoIcon} ${tipoLabel.toUpperCase()}\n${sep}\nCliente: ${form.nombre||"---"}\nTel: ${form.telefono||"---"}\nFecha: ${form.fecha||"---"}\n\nTOTAL: $${total.toLocaleString("es-MX")} MXN\n${sep}\nAnticipo ${form.anticipo}%: $${(total*parseFloat(form.anticipo||0)/100).toLocaleString("es-MX")} MXN\nAntes instalación ${form.pago_entrega}%: $${(total*parseFloat(form.pago_entrega||0)/100).toLocaleString("es-MX")} MXN\nContra entrega ${form.pago_final}%: $${(total*parseFloat(form.pago_final||0)/100).toLocaleString("es-MX")} MXN\n${sep}\nTiempo: ${form.tiempo_entrega}\nGarantía: ${form.garantia}\n\nMás información: enkajepro.com`;
  }

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:12, marginBottom:16 }}>
          <div>
            <h1 style={{ color:"#d4af37", margin:0, fontSize:isMobile?20:24 }}>Presupuesto Profesional</h1>
            <p style={{ color:"#555", margin:"4px 0 0", fontSize:13 }}>Completa los precios y comparte con el cliente</p>
          </div>
          <button onClick={imprimirHoja} style={{ background:"linear-gradient(135deg,#d4af37,#f0c84a)", color:"#000", border:"none", borderRadius:12, padding:"12px 22px", fontWeight:900, fontSize:13, cursor:"pointer", display:"flex", alignItems:"center", gap:8, boxShadow:"0 4px 20px #d4af3740" }}>🖨️ Imprimir / PDF Profesional</button>
          {(role === "admin" || role === "taller") && (
            <button onClick={() => generarContrato(tallerData)} style={{ background:"transparent", color:"#d4af37", border:"1.5px solid #d4af37", borderRadius:12, padding:"12px 22px", fontWeight:900, fontSize:13, cursor:"pointer", display:"flex", alignItems:"center", gap:8 }}>📄 Generar Contrato</button>
          )}
        </div>
        <ShareMenu onShare={key => compartir(key, textoPresupuesto(), `Presupuesto ${tipoLabel} - EnKaje Pro`)} label="Compartir presupuesto" />
      </div>

      <div style={{ display:"grid", gridTemplateColumns:isMobile?"1fr":"1fr 1fr", gap:20 }}>
        <div>
          <SECTION title="Que Incluye" icon="✅">
            <TEXTAREA value={form.incluye} onChange={e=>setF("incluye",e.target.value)} placeholder={"Diseño\nFabricación\nTransporte\nInstalación\nAjustes\nLimpieza final"} rows={5} />
          </SECTION>
          <SECTION title="Que NO Incluye" icon="❌">
            <TEXTAREA value={form.no_incluye} onChange={e=>setF("no_incluye",e.target.value)} placeholder={"Plomería\nElectricidad\nAlbañilería\nElectrodomésticos\nCambios post-aprobación"} rows={5} />
          </SECTION>
          <SECTION title="Forma de Pago" icon="💳">
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10 }}>
              <INPUT label="% Anticipo"    value={form.anticipo}     onChange={e=>setF("anticipo",e.target.value)}     placeholder="60" type="number" />
              <INPUT label="% Antes inst." value={form.pago_entrega} onChange={e=>setF("pago_entrega",e.target.value)} placeholder="30" type="number" />
              <INPUT label="% Entrega"     value={form.pago_final}   onChange={e=>setF("pago_final",e.target.value)}   placeholder="10" type="number" />
            </div>
            {total > 0 && (
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8, marginTop:8 }}>
                {[
                  [`${form.anticipo||60}% Anticipo`,       total*parseFloat(form.anticipo||60)/100],
                  [`${form.pago_entrega||30}% Antes inst.`,total*parseFloat(form.pago_entrega||30)/100],
                  [`${form.pago_final||10}% Entrega`,      total*parseFloat(form.pago_final||10)/100],
                ].map(([l,v],i) => (
                  <div key={i} style={{ background:"#1a1208", border:"1px solid #d4af3720", borderRadius:8, padding:"10px 12px", textAlign:"center" }}>
                    <div style={{ fontSize:10, color:"#555", marginBottom:4 }}>{l}</div>
                    <div style={{ fontSize:14, fontWeight:900, color:"#d4af37" }}>${v.toLocaleString("es-MX")}</div>
                  </div>
                ))}
              </div>
            )}
          </SECTION>
          <SECTION title="Tiempo y Garantia" icon="⏱️">
            <INPUT label="Tiempo de entrega" value={form.tiempo_entrega} onChange={e=>setF("tiempo_entrega",e.target.value)} placeholder="20 a 30 dias habiles" />
            <INPUT label="Fecha estimada de entrega" value={form.fecha_entrega_estimada||""} onChange={e=>setF("fecha_entrega_estimada",e.target.value)} type="date" />
            <INPUT label="Garantia" value={form.garantia} onChange={e=>setF("garantia",e.target.value)} placeholder="6 meses en instalacion y herrajes" />
          </SECTION>
        </div>
        <div>
          <SECTION title="Desglose de Precios" icon="📊">
            <INPUT label="Fabricacion (MXN)" value={form.precio_fabricacion} onChange={e=>setF("precio_fabricacion",e.target.value)} placeholder="35000" type="number" />
            <INPUT label="Instalacion (MXN)" value={form.precio_instalacion} onChange={e=>setF("precio_instalacion",e.target.value)} placeholder="8000" type="number" />
            <INPUT label={tipoProyecto==="cocina"?"Cubierta (MXN)":tipoProyecto==="puerta"?"Acabado / Pintura (MXN)":tipoProyecto==="bano"?"Tarja / Acabados (MXN)":"Acabados (MXN)"} value={form.precio_cubierta} onChange={e=>setF("precio_cubierta",e.target.value)} placeholder="12000" type="number" />
            <INPUT label={tipoProyecto==="puerta"?"Herrajes / Chapa (MXN)":tipoProyecto==="bano"?"Herrajes / Grifería (MXN)":"Herrajes (MXN)"} value={form.precio_herrajes} onChange={e=>setF("precio_herrajes",e.target.value)} placeholder="5000" type="number" />
            <INPUT label="Otros (MXN)" value={form.precio_otros} onChange={e=>setF("precio_otros",e.target.value)} placeholder="0" type="number" />
            {total > 0 && (
              <div style={{ background:"#1a1208", border:"1px solid #d4af3730", borderRadius:12, padding:16, marginTop:8 }}>
                {[["Fabricacion",form.precio_fabricacion],["Instalacion",form.precio_instalacion],["Acabados",form.precio_cubierta],["Herrajes",form.precio_herrajes],["Otros",form.precio_otros]]
                  .filter(([,v])=>v&&parseFloat(v)>0)
                  .map(([l,v],i) => (
                    <div key={i} style={{ display:"flex", justifyContent:"space-between", fontSize:13, color:"#aaa", marginBottom:6 }}>
                      <span>{l}</span><span>${parseFloat(v).toLocaleString("es-MX")} MXN</span>
                    </div>
                  ))}
                <div style={{ display:"flex", justifyContent:"space-between", fontSize:22, fontWeight:900, color:"#d4af37", paddingTop:12, borderTop:"1px solid #d4af3730", marginTop:8 }}>
                  <span>TOTAL</span><span>${total.toLocaleString("es-MX")} MXN</span>
                </div>
              </div>
            )}
          </SECTION>
        </div>
      </div>

      {/* COTIZADOR DE MATERIALES CON IA — solo admin y taller */}
      {(role === "admin" || role === "taller") && (
        <div style={{ marginTop: 28, background: "#0a0a08", border: "1px solid #d4af3730", borderRadius: 16, padding: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: 11, color: "#d4af37", letterSpacing: 2, textTransform: "uppercase", fontWeight: 700, marginBottom: 4 }}>🔩 Cotizador de Materiales con IA</div>
              <div style={{ fontSize: 12, color: "#aaa" }}>Genera la lista automática basada en las especificaciones del formulario</div>
            </div>
            <button onClick={generarMateriales} disabled={materialesLoading}
              style={{ background: materialesLoading ? "#1a1a10" : "linear-gradient(135deg,#d4af37,#f0c84a)", color: materialesLoading ? "#555" : "#000", border: "none", borderRadius: 10, padding: "11px 20px", fontWeight: 900, fontSize: 13, cursor: materialesLoading ? "not-allowed" : "pointer", display: "flex", alignItems: "center", gap: 8, whiteSpace: "nowrap" }}>
              {materialesLoading ? "⏳ Generando..." : "✨ Generar con IA"}
            </button>
          </div>
          {materialesMsg && (
            <div style={{ background: materialesMsg.includes("❌") ? "#1a0a0a" : "#0a1a0a", border: `1px solid ${materialesMsg.includes("❌") ? "#f4433640" : "#4caf5040"}`, borderRadius: 8, padding: "10px 14px", marginBottom: 14 }}>
              <div style={{ color: materialesMsg.includes("❌") ? "#f44336" : "#4caf50", fontSize: 12 }}>{materialesMsg}</div>
            </div>
          )}
          {materiales.length > 0 && (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead>
                  <tr style={{ background: "#1a1208" }}>
                    {["Material","Cantidad","P. Unitario","Total","Notas"].map(h => (
                      <th key={h} style={{ padding: "8px 12px", color: "#d4af37", fontWeight: 700, fontSize: 11, letterSpacing: 1, textTransform: "uppercase", textAlign: "left", borderBottom: "1px solid #d4af3730", whiteSpace: "nowrap" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {materiales.map((m, i) => (
                    <tr key={i} style={{ borderBottom: "1px solid #1a1a12", background: i % 2 === 0 ? "#0a0a08" : "#0f0f0a" }}>
                      <td style={{ padding: "9px 12px", color: "#e8e0d0", fontWeight: 600 }}>{m.material}</td>
                      <td style={{ padding: "9px 12px", color: "#aaa" }}>{m.cantidad}</td>
                      <td style={{ padding: "9px 12px", color: "#aaa" }}>${(m.precio_unitario||0).toLocaleString("es-MX")}</td>
                      <td style={{ padding: "9px 12px", color: "#d4af37", fontWeight: 700 }}>${(m.total||0).toLocaleString("es-MX")}</td>
                      <td style={{ padding: "9px 12px", color: "#555", fontSize: 11 }}>{m.notas||""}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr style={{ background: "#1a1208", borderTop: "2px solid #d4af3730" }}>
                    <td colSpan={3} style={{ padding: "10px 12px", color: "#d4af37", fontWeight: 900, fontSize: 14 }}>TOTAL MATERIALES</td>
                    <td colSpan={2} style={{ padding: "10px 12px", color: "#d4af37", fontWeight: 900, fontSize: 16 }}>
                      ${materiales.reduce((s,m) => s + (parseFloat(m.total)||0), 0).toLocaleString("es-MX")} MXN
                    </td>
                  </tr>
                </tfoot>
              </table>
              <div style={{ display: "flex", gap: 10, marginTop: 14, flexWrap: "wrap" }}>
                <button onClick={() => { setMateriales([]); setMaterialesMsg(""); }}
                  style={{ background: "transparent", color: "#555", border: "1px solid #333", borderRadius: 10, padding: "9px 16px", fontSize: 12, cursor: "pointer" }}>
                  🗑️ Limpiar
                </button>
              </div>
            </div>
          )}
          {!materialesLoading && materiales.length === 0 && !materialesMsg && (
            <div style={{ textAlign: "center", padding: "24px 0", color: "#333", fontSize: 13 }}>
              Llena las medidas y especificaciones en el formulario, luego presiona Generar con IA
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const ESTADOS_PROYECTO = [
  { key: "nuevo",      label: "Nuevo",              color: "#00bcd4", emoji: "🆕" },
  { key: "proceso",    label: "En proceso",          color: "#f0a500", emoji: "🔨" },
  { key: "listo",      label: "Listo para instalar", color: "#9c27b0", emoji: "📦" },
  { key: "instalando", label: "Instalando",          color: "#ff5722", emoji: "🔧" },
  { key: "entregado",  label: "Entregado",           color: "#4caf50", emoji: "✅" },
];

// ============ MAIN APP ============
export default function App() {
  const isMobile = useIsMobile();
  const [screen, setScreen] = useState("login");
  const [legalPage, setLegalPage] = useState(null);
  const [role, setRole] = useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loginForm, setLoginForm] = useState({ email: "", password: "", nombre: "", role: "cliente" });
  const [loginMode, setLoginMode] = useState("login");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [tab, setTab] = useState(() => {
    const saved = sessionStorage.getItem("enkaje_tab");
    return saved || "bienvenida";
  });

  // Manejar botón atrás del browser
  useEffect(() => {
    const handlePop = (e) => {
      const state = e.state;
      if (state?.tab && screen === "app") {
        setTab(state.tab);
      } else if (screen === "app") {
        history.pushState({ tab: "bienvenida" }, "", window.location.pathname);
        setTab("bienvenida");
      }
    };
    window.addEventListener("popstate", handlePop);
    return () => window.removeEventListener("popstate", handlePop);
  }, [screen]);

  const [tipoForm, setTipoForm] = useState("cocina");
  const cambiarTipoForm = (tipo) => { setTipoForm(tipo); setMateriales([]); setMaterialesMsg(""); };
  const [formCocina, setFormCocina] = useState(FORM_INIT);
  const [formCloset, setFormCloset] = useState(FORM_CLOSET_INIT);
  const [formPuerta, setFormPuerta] = useState(FORM_PUERTA_INIT);
  const [formMueble, setFormMueble] = useState(FORM_MUEBLE_INIT);
  const [formBano, setFormBano]     = useState(FORM_BANO_INIT);
  const [formPanel, setFormPanel]   = useState(FORM_PANEL_INIT);
  const [leads, setLeads]           = useState([]);
  const [proyectos, setProyectos]   = useState([]);
  const [leadSel, setLeadSel]       = useState(null);
  const [proyectoSel, setProyectoSel] = useState(null);
  const [talleresMem, setTalleresMem] = useState([]);
  const [tallerSel, setTallerSel]   = useState(null);
  const [showNuevoTaller, setShowNuevoTaller] = useState(false);
  const [confirmModal, setConfirmModal] = useState(null);
  const [nuevoTaller, setNuevoTaller] = useState({ nombre: "", email: "", telefono: "", especialidad: "", zona: "", municipio: "", plan: "basico", fecha_vencimiento: "", notas: "", slug: "" });
  const [tallerMsg, setTallerMsg]   = useState("");
  const [renderPrompt, setRenderPrompt] = useState("");
  const [renderImg, setRenderImg]   = useState(null);
  const [renderLoading, setRenderLoading] = useState(false);
  const [renderMsg, setRenderMsg]   = useState("");
  const [socialFoto, setSocialFoto] = useState(null);
  const [socialCaption, setSocialCaption] = useState("");
  const [socialLoading, setSocialLoading] = useState(false);
  const [iaTab, setIaTab]           = useState("asistente");
  const [chatInput, setChatInput]   = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [chatLoading, setChatLoading] = useState(false);
  const [editTaller, setEditTaller] = useState(null);
  const [editInfo, setEditInfo]     = useState(null);
  const [aiLoading, setAiLoading]   = useState(false);
  const [aiResult, setAiResult]     = useState("");
  const [savedMsg, setSavedMsg]     = useState("");
  const [materiales, setMateriales] = useState([]);
  const [materialesLoading, setMaterialesLoading] = useState(false);
  const [materialesMsg, setMaterialesMsg] = useState("");

  // ── NUEVOS ESTADOS para secciones Admin ──────────────────────────────────
  const [blogArticulos, setBlogArticulos] = useState([]);
  const [blogForm, setBlogForm] = useState({ titulo: "", categoria: "", contenido: "", publicado: false });
  const [blogEditando, setBlogEditando] = useState(null);
  const [blogMsg, setBlogMsg] = useState("");

  useEffect(() => {
    const token = sessionStorage.getItem("enkaje_token");
    const user  = sessionStorage.getItem("enkaje_user");
    const role  = sessionStorage.getItem("enkaje_role");
    const tab   = sessionStorage.getItem("enkaje_tab");
    if (token && user && role) {
      setToken(token);
      setUser(JSON.parse(user));
      setRole(role);
      setScreen("app");
      setTab(tab || "bienvenida");
    }
  }, []);

  const getForm = () => {
    if (tipoForm === "cocina")  return formCocina;
    if (tipoForm === "closet")  return formCloset;
    if (tipoForm === "puerta")  return formPuerta;
    if (tipoForm === "panel")   return formPanel;
    if (tipoForm === "bano")    return formBano;
    return formMueble;
  };

  function cargarProyectoEnFormulario(p) {
    const tipo = p.tipo_proyecto || "cocina";
    cambiarTipoForm(tipo);
    const datos = {
      nombre: p.nombre || "",
      telefono: p.telefono || "",
      correo: p.correo || "",
      direccion: p.direccion || "",
      observaciones: p.observaciones || "",
      atencion_por: p.atencion_por || "Felipe Santiago",
      fecha: p.fecha || new Date().toISOString().split("T")[0],
    };
    if (tipo === "cocina")       setFormCocina(prev => ({...prev, ...datos}));
    else if (tipo === "closet")  setFormCloset(prev => ({...prev, ...datos}));
    else if (tipo === "puerta")  setFormPuerta(prev => ({...prev, ...datos}));
    else if (tipo === "panel")   setFormPanel(prev => ({...prev, ...datos}));
    else if (tipo === "bano")    setFormBano(prev => ({...prev, ...datos}));
    else                         setFormMueble(prev => ({...prev, ...datos}));
  }

  function cargarProyectoEnPresupuesto(p) {
    const tipo = p.tipo_proyecto || "cocina";
    cambiarTipoForm(tipo);
    const datos = {
      nombre: p.nombre || "",
      telefono: p.telefono || "",
      correo: p.correo || "",
      direccion: p.direccion || "",
      observaciones: p.observaciones || "",
    };
    if (tipo === "cocina")       setFormCocina(prev => ({...prev, ...datos}));
    else if (tipo === "closet")  setFormCloset(prev => ({...prev, ...datos}));
    else if (tipo === "puerta")  setFormPuerta(prev => ({...prev, ...datos}));
    else if (tipo === "panel")   setFormPanel(prev => ({...prev, ...datos}));
    else if (tipo === "bano")    setFormBano(prev => ({...prev, ...datos}));
    else                         setFormMueble(prev => ({...prev, ...datos}));
  }

  const setTabWithHistory = (newTab) => {
    sessionStorage.setItem("enkaje_tab", newTab);
    history.pushState({ tab: newTab }, "", window.location.pathname);
    setTab(newTab);
  };

  const setFormField = (key, val) => {
    if (tipoForm === "cocina")       setFormCocina(p => ({...p, [key]: val}));
    else if (tipoForm === "closet")  setFormCloset(p => ({...p, [key]: val}));
    else if (tipoForm === "puerta")  setFormPuerta(p => ({...p, [key]: val}));
    else if (tipoForm === "panel")   setFormPanel(p => ({...p, [key]: val}));
    else if (tipoForm === "bano")    setFormBano(p => ({...p, [key]: val}));
    else                             setFormMueble(p => ({...p, [key]: val}));
  };

  const nombreUsuario = user?.user_metadata?.nombre || user?.email?.split("@")[0] || "Usuario";

  async function login() {
    setLoginLoading(true); setLoginError("");
    try {
      const data = await authFetch("token?grant_type=password", { email: loginForm.email, password: loginForm.password });
      if (data.access_token) {
        setToken(data.access_token); setUser(data.user);
        sessionStorage.setItem("enkaje_token", data.access_token);
        sessionStorage.setItem("enkaje_user", JSON.stringify(data.user));
        const r = data.user?.user_metadata?.role || "cliente";
        sessionStorage.setItem("enkaje_role", r);
        setRole(r); setScreen("app"); setTab("bienvenida");
        sessionStorage.setItem("enkaje_tab", "bienvenida");
        history.replaceState({ tab: "bienvenida" }, "", window.location.pathname);
        if (r === "cliente") {
          try {
            const proyData = await sb(`proyectos?user_email=eq.${data.user.email}&order=created_at.desc&limit=4`);
            if (Array.isArray(proyData)) {
              proyData.forEach(p => {
                if (p.tipo_proyecto === "cocina")       setFormCocina(prev => ({...FORM_INIT, ...p}));
                else if (p.tipo_proyecto === "closet")  setFormCloset(prev => ({...FORM_CLOSET_INIT, ...p}));
                else if (p.tipo_proyecto === "puerta")  setFormPuerta(prev => ({...FORM_PUERTA_INIT, ...p}));
                else if (p.tipo_proyecto === "mueble")  setFormMueble(prev => ({...FORM_MUEBLE_INIT, ...p}));
              });
            }
          } catch(e) {}
        }
      } else {
        setLoginError(data.error_description || data.message || "Error al iniciar sesion");
      }
    } catch(e) {
      setLoginError("Error de conexión. Intenta de nuevo.");
    } finally {
      setLoginLoading(false);
    }
  }

  async function register() {
    setLoginLoading(true); setLoginError("");
    if (!loginForm.nombre.trim()) { setLoginError("Escribe tu nombre."); setLoginLoading(false); return; }
    if (!loginForm.email.includes("@")) { setLoginError("Correo invalido."); setLoginLoading(false); return; }
    if (loginForm.password.length < 6) { setLoginError("La contrasena debe tener al menos 6 caracteres."); setLoginLoading(false); return; }
    const data = await authFetch("signup", { email: loginForm.email, password: loginForm.password, data: { nombre: loginForm.nombre, role: "cliente" } });
    if (data.user && data.session) {
      setToken(data.session.access_token);
      sessionStorage.setItem("enkaje_token", data.session.access_token);
      sessionStorage.setItem("enkaje_user", JSON.stringify(data.user));
      sessionStorage.setItem("enkaje_role", data.user?.user_metadata?.role || "cliente");
      localStorage.removeItem("enkaje_renders");
      localStorage.removeItem("enkaje_renders_cuenta");
      setUser(data.user);
      const r = data.user?.user_metadata?.role || loginForm.role || "cliente";
      setRole(r); setScreen("app"); setTab("bienvenida");
      sessionStorage.setItem("enkaje_tab", "bienvenida");
      history.replaceState({ tab: "bienvenida" }, "", window.location.pathname);
    } else if (data.user && !data.session) {
      setLoginError("✅ Cuenta creada. Inicia sesión con tu correo y contraseña.");
    } else {
      const msg = data.error_description || data.message || data.msg || JSON.stringify(data);
      if (msg.includes("already registered")) {
        setLoginError("Este correo ya tiene cuenta. Inicia sesion.");
      } else {
        setLoginError("Error: " + msg);
      }
    }
    setLoginLoading(false);
  }

  async function guardarFormulario() {
    setSavedMsg("Guardando...");
    try {
      const f = getForm();
      const arr = v => Array.isArray(v) && v.length ? v.join(", ") : "";
      const val = v => (v && String(v).trim()) ? String(v).trim() : null;
      const raw = {
        user_id: user?.id || null, user_email: user?.email || null,
        estado: "nuevo", created_at: new Date().toISOString(),
        tipo_proyecto: val(f.tipo_proyecto) || "cocina",
        nombre: val(f.nombre), telefono: val(f.telefono), correo: val(f.correo),
        direccion: val(f.direccion), fecha: val(f.fecha), atencion_por: val(f.atencion_por),
        largo: val(f.largo), altura: val(f.altura), profundidad: val(f.profundidad),
        area: val(f.area), ancho: val(f.ancho), alto: val(f.alto),
        grosor_puerta: val(f.grosor_puerta), cantidad: val(f.cantidad),
        medidas_isla: val(f.medidas_isla), altura_superiores: val(f.altura_superiores),
        color_principal: val(f.color_principal), color_secundario: val(f.color_secundario),
        color_cubierta: val(f.color_cubierta), textura: val(f.textura),
        medidas_electro: val(f.medidas_electro), observaciones: val(f.observaciones),
        materiales_solicitados: val(f.materiales_solicitados),
        comentarios_tecnicos: val(f.comentarios_tecnicos),
        nivel_calidad: val(f.nivel_calidad),
        precio_fabricacion: val(f.precio_fabricacion), precio_instalacion: val(f.precio_instalacion),
        precio_cubierta: val(f.precio_cubierta), precio_herrajes: val(f.precio_herrajes),
        precio_otros: val(f.precio_otros), incluye: val(f.incluye), no_incluye: val(f.no_incluye),
        tiempo_entrega: val(f.tiempo_entrega), anticipo: val(f.anticipo),
        pago_entrega: val(f.pago_entrega), pago_final: val(f.pago_final), garantia: val(f.garantia),
        tipo_cocina: arr(f.tipo_cocina) || null, tipo_closet: arr(f.tipo_closet) || null,
        tipo_puerta: arr(f.tipo_puerta) || null, tipo_mueble: arr(f.tipo_mueble) || null,
        estilo: arr(f.estilo) || null, material: arr(f.material) || null,
        grosor: arr(f.grosor) || null, tipo_acabado: arr(f.tipo_acabado) || null,
        tipo_puertas: arr(f.tipo_puertas) || null, jaladeras: arr(f.jaladeras) || null,
        bisagras: arr(f.bisagras) || null, correderas: arr(f.correderas) || null,
        accesorios: arr(f.accesorios) || null, accesorios_closet: arr(f.accesorios_closet) || null,
        accesorios_mueble: arr(f.accesorios_mueble) || null,
        material_cubierta: arr(f.material_cubierta) || null,
        tarja: arr(f.tarja) || null, griferia: arr(f.griferia) || null,
        electrodomesticos: arr(f.electrodomesticos) || null,
        iluminacion: arr(f.iluminacion) || null,
        tipo_marco: arr(f.tipo_marco) || null, herrajes_puerta: arr(f.herrajes_puerta) || null,
      };
      const payload = Object.fromEntries(Object.entries(raw).filter(([,v]) => v !== null && v !== undefined && v !== ""));
      const res = await sb("proyectos", { method: "POST", token, body: JSON.stringify(payload) });
      if (res && !Array.isArray(res) && (res.code || res.error || res.hint)) {
        setSavedMsg("❌ " + (res.message || res.hint || res.error || JSON.stringify(res)));
      } else {
        setSavedMsg("✅ Guardado en Mis Proyectos");
        cargarProyectos();
      }
      setTimeout(() => setSavedMsg(""), 5000);
    } catch(e) { setSavedMsg("❌ " + e.message); }
  }

  async function cargarLeads() {
    const data = await sb("expedientes?order=created_at.desc", { token });
    if (Array.isArray(data)) setLeads(data);
  }

  async function cargarProyectos() {
    let url = "proyectos?order=created_at.desc";
    if (role === "cliente") url += `&user_email=eq.${user?.email}`;
    const data = await sb(url, { token });
    if (Array.isArray(data)) setProyectos(data);
  }

  async function cargarTalleres() {
    const data = await sb("talleres_membresia?order=created_at.desc", { token });
    if (Array.isArray(data)) {
      setTalleresMem(data);
      if (role === "taller" && user?.email) {
        const miTaller = data.find(t => t.email === user.email);
        if (miTaller) setTallerSel(miTaller);
      }
    }
  }

  async function guardarNuevoTaller() {
    setTallerMsg("Guardando...");
    try {
      const chars = "ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";
      const pass = Array.from({length: 10}, () => chars[Math.floor(Math.random()*chars.length)]).join("") + "!";
      await sb("talleres_membresia", { method: "POST", token, body: JSON.stringify({ ...nuevoTaller, estado: "activo", leads_recibidos: 0, proyectos_cerrados: 0, visitas: 0, created_at: new Date().toISOString() }) });
      setTallerMsg("✅ Taller agregado");
      const planLabel = nuevoTaller.plan === "premium" ? "Elite $2,999/mes" : nuevoTaller.plan === "pro" ? "Profesional $1,499/mes" : "Básico $699/mes";
      const emailBody = [
        `🎉 ¡BIENVENIDO, ${nuevoTaller.nombre.toUpperCase()}!`,
        ``, `Acabas de unirte a EnKaje Pro.`,
        ``, `━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
        `   TUS CREDENCIALES DE ACCESO`,
        `━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
        `🌐 Plataforma: https://enkajepro.com/app`,
        `📧 Correo: ${nuevoTaller.email}`,
        `🔑 Contraseña temporal: ${pass}`,
        `━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
        ``, `Tu plan: ${planLabel}`,
        `🔗 enkajepro.com/taller/${nuevoTaller.slug || "tu-slug"}`,
        ``, `Con gusto,`, `Felipe Santiago`, `Fundador · EnKaje Pro`,
      ].join("\n");
      window.open(`mailto:${nuevoTaller.email}?subject=Bienvenido a EnKaje Pro - Tus credenciales de acceso&body=${encodeURIComponent(emailBody)}`, "_blank");
      setTimeout(() => setTallerMsg(`✅ Guardado · Contraseña: ${pass}`), 500);
      setNuevoTaller({ nombre: "", email: "", telefono: "", especialidad: "", zona: "", municipio: "", plan: "basico", fecha_vencimiento: "", notas: "", slug: "" });
      setShowNuevoTaller(false);
      cargarTalleres();
      setTimeout(() => setTallerMsg(""), 10000);
    } catch { setTallerMsg("Error al guardar"); }
  }

  async function actualizarTaller(id, cambios) {
    await sb(`talleres_membresia?id=eq.${id}`, { method: "PATCH", token, body: JSON.stringify(cambios) });
    cargarTalleres();
  }

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const legal = params.get("legal");
    if (legal && ["privacidad","terminos","cookies"].includes(legal)) {
      setLegalPage(legal);
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, []);

  useEffect(() => {
    if (screen === "app" && (tab === "oportunidades" || tab === "bienvenida")) cargarLeads();
    if (screen === "app" && (tab === "talleres" || (tab === "bienvenida" && role === "taller") || tab === "cotizaciones" || tab === "perfil_taller" || tab === "plan_taller")) cargarTalleres();
    if (screen === "app" && (tab === "proyectos" || tab === "mis_proyectos" || tab === "leads" || tab === "bienvenida")) cargarProyectos();
  }, [tab, screen]);

  function compartirFormulario(canal) {
    const f = getForm();
    const arr = v => Array.isArray(v) && v.length ? v.join(", ") : (v || "");
    const tipo = tipoForm==="cocina"?"Cocina Integral":tipoForm==="closet"?"Closet":tipoForm==="puerta"?"Puerta":tipoForm==="bano"?"Baño":tipoForm==="panel"?"Panel":"Mueble";
    const sep = "━".repeat(26);
    const lineas = [`LEVANTAMIENTO ${tipo.toUpperCase()} - EnKaje Pro`, sep, `Cliente: ${f.nombre||"---"}`, `Tel: ${f.telefono||"---"}`, `Fecha: ${f.fecha||"---"}`, sep];
    if (arr(f.estilo))    lineas.push(`Estilo: ${arr(f.estilo)}`);
    if (arr(f.material))  lineas.push(`Material: ${arr(f.material)}`);
    if (f.color_principal) lineas.push(`Color: ${f.color_principal}`);
    if (f.largo||f.altura||f.ancho||f.alto) lineas.push(`Medidas: ${[f.largo,f.altura,f.profundidad,f.ancho,f.alto].filter(Boolean).join(" x ")}`);
    if (f.observaciones) lineas.push(sep, `Obs: ${f.observaciones}`);
    lineas.push(sep, "enkajepro.com · Monterrey");
    const txt = lineas.join("\n");
    compartir(canal, txt, `Levantamiento ${tipo} - EnKaje Pro`);
  }

  function imprimirFormulario() {
    const f = getForm();
    const arr = v => Array.isArray(v) && v.length ? v.join(", ") : (v||"");
    const has  = v => Array.isArray(v) ? v.length > 0 : (v && String(v).trim() !== "");
    const tipo = tipoForm==="cocina"?"Cocina Integral":tipoForm==="closet"?"Closet":tipoForm==="puerta"?"Puerta":tipoForm==="bano"?"Baño":tipoForm==="panel"?"Panel":"Mueble";
    const icon = tipoForm==="cocina"?"🍳":tipoForm==="closet"?"👔":tipoForm==="puerta"?"🚪":tipoForm==="bano"?"🚿":tipoForm==="panel"?"🪵":"🛋️";
    const folio = `LV-${Date.now().toString().slice(-6)}`;
    const filas = [];
    const add = (l,v) => { if(has(v)) filas.push([l, Array.isArray(v)?v.join(", "):v]); };
    if(tipoForm==="cocina"){
      add("Tipo de cocina",f.tipo_cocina); add("Largo total",f.largo); add("Altura",f.altura);
      add("Profundidad",f.profundidad); add("Área aprox.",f.area); add("Medidas isla",f.medidas_isla);
      add("Cubierta",f.material_cubierta); add("Tarja",f.tarja); add("Electrodomésticos",f.electrodomesticos); add("Accesorios",f.accesorios);
    } else if(tipoForm==="closet"){
      add("Tipo de closet",f.tipo_closet); add("Largo / Ancho",f.largo); add("Altura",f.altura);
      add("Profundidad",f.profundidad); add("Área",f.area); add("Accesorios",f.accesorios_closet);
    } else if(tipoForm==="puerta"){
      add("Tipo de puerta",f.tipo_puerta); add("Ancho",f.ancho); add("Alto",f.alto);
      add("Grosor",f.grosor_puerta); add("Cantidad",f.cantidad); add("Marco",f.tipo_marco); add("Herrajes",f.herrajes_puerta);
    } else if(tipoForm==="bano"){
      add("Tipo mueble baño",f.tipo_mueble_bano); add("Ancho",f.ancho); add("Alto",f.alto);
      add("Profundidad",f.profundidad); add("Instalación",f.instalacion); add("Tarja",f.tipo_tarja); add("Espejo",f.espejo);
    } else {
      add("Tipo de mueble",f.tipo_mueble); add("Largo / Ancho",f.largo); add("Alto",f.alto);
      add("Profundidad",f.profundidad); add("Cantidad",f.cantidad); add("Accesorios",f.accesorios_mueble);
    }
    add("Estilo",f.estilo); add("Material",f.material); add("Grosor",f.grosor);
    add("Color principal",f.color_principal); add("Color secundario",f.color_secundario);
    add("Acabado",f.tipo_acabado); add("Tipo puertas",f.tipo_puertas); add("Jaladeras",f.jaladeras);
    add("Bisagras",f.bisagras); add("Correderas",f.correderas); add("Iluminación",f.iluminacion);

    const filasHTML = filas.map(([l,v]) => `<tr><td class="td-l">${l}</td><td class="td-v">${v}</td></tr>`).join("");
    const w = window.open("","_blank");
    w.document.write(`<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><title>Levantamiento ${tipo} · EnKaje Pro</title>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet">
<style>*{box-sizing:border-box;margin:0;padding:0}body{font-family:'Inter',sans-serif;background:#070708;color:#e8e0d0}.page{max-width:780px;margin:0 auto;padding:40px}.hdr{display:flex;justify-content:space-between;align-items:flex-start;padding-bottom:20px;border-bottom:2px solid #d4af37;margin-bottom:24px}.logo{font-family:'Playfair Display',serif;font-size:26px;font-weight:900;color:#d4af37;letter-spacing:3px}.banner{background:linear-gradient(135deg,#1a1208,#2a1f08);border-left:5px solid #d4af37;border-radius:0 12px 12px 0;padding:16px 22px;margin-bottom:20px}.card{border:1px solid #1a1a12;border-radius:12px;overflow:hidden;margin-bottom:18px}.ch{background:#0f0f0a;border-bottom:1px solid #1a1a12;padding:10px 16px;font-size:10px;font-weight:700;color:#d4af37;letter-spacing:3px;text-transform:uppercase}.td-l{padding:8px 14px;color:#666;font-size:12px;border-bottom:1px solid #1a1a12;width:42%}.td-v{padding:8px 14px;color:#e8e0d0;font-size:12px;border-bottom:1px solid #1a1a12;font-weight:600}table{width:100%;border-collapse:collapse}.ftr{margin-top:24px;padding-top:14px;border-top:1px solid #1a1a12;display:flex;justify-content:space-between}.flogo{font-family:'Playfair Display',serif;font-size:14px;color:#d4af37;font-weight:700}@media print{body{background:#fff;color:#1a1a1a;-webkit-print-color-adjust:exact;print-color-adjust:exact}}</style></head><body><div class="page">
<div class="hdr"><div><div class="logo">EnKaje Pro</div></div><div style="text-align:right"><div style="font-size:11px;color:#555">Folio: ${folio}</div><div style="font-size:11px;color:#555">Fecha: ${f.fecha||new Date().toLocaleDateString("es-MX")}</div></div></div>
<div class="banner"><div style="font-size:10px;color:#d4af3780;letter-spacing:4px;text-transform:uppercase;margin-bottom:4px">${icon} Tipo de proyecto</div><div style="font-family:'Playfair Display',serif;font-size:22px;color:#d4af37;font-weight:700">${tipo.toUpperCase()}</div></div>
<div class="card"><div class="ch">📐 ESPECIFICACIONES</div><div style="padding:0"><table>${filasHTML}</table></div></div>
${f.observaciones?`<div style="background:#0f0f0a;border:1px solid #1a1a12;border-radius:10px;padding:12px 16px;font-size:12px;color:#888;font-style:italic"><b>Observaciones:</b> ${f.observaciones}</div>`:""}
<div class="ftr"><div class="flogo">EnKaje Pro</div><div style="font-size:10px;color:#333">enkajepro.com · Monterrey, NL</div></div>
</div><script>window.onload=function(){window.print()}</script></body></html>`);
    w.document.close();
  }

  function imprimirHojaProfesional() {
    const f = getForm();
    const tipoLabel = tipoForm==="cocina"?"Cocina Integral":tipoForm==="closet"?"Closet":tipoForm==="puerta"?"Puerta":tipoForm==="bano"?"Baño":tipoForm==="panel"?"Panel":"Mueble";
    const tipoIcon  = tipoForm==="cocina"?"🍳":tipoForm==="closet"?"👔":tipoForm==="puerta"?"🚪":tipoForm==="bano"?"🚿":tipoForm==="panel"?"🪵":"🛋️";
    const total = [f.precio_fabricacion,f.precio_instalacion,f.precio_cubierta,f.precio_herrajes,f.precio_otros].reduce((a,v)=>a+(parseFloat(v)||0),0);
    const folio = `EP-${Date.now().toString().slice(-6)}`;
    const w = window.open("","_blank");
    if (!w) { alert("Por favor permite las ventanas emergentes para imprimir"); return; }
    const incluyeItems = (f.incluye||"Diseño\nFabricación\nTransporte\nInstalación").split("\n").filter(Boolean).map(i=>`<li>${i}</li>`).join("");
    const noIncluyeItems = (f.no_incluye||"Plomería\nElectricidad\nAlbañilería").split("\n").filter(Boolean).map(i=>`<li>${i}</li>`).join("");
    const preciosRows = [["Fabricación",f.precio_fabricacion],["Instalación",f.precio_instalacion],["Acabados",f.precio_cubierta],["Herrajes",f.precio_herrajes],["Otros",f.precio_otros]].filter(([,v])=>v&&parseFloat(v)>0).map(([l,v])=>`<tr><td>${l}</td><td>$${parseFloat(v).toLocaleString("es-MX")} MXN</td></tr>`).join("");
    w.document.write(`<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><title>Presupuesto EnKaje Pro</title>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
<style>*{box-sizing:border-box;margin:0;padding:0}body{font-family:'Inter',sans-serif;background:#fff;color:#1a1a1a}.page{max-width:800px;margin:0 auto;padding:48px}.hdr{display:flex;justify-content:space-between;padding-bottom:24px;border-bottom:3px solid #d4af37;margin-bottom:28px}.logo{font-family:'Playfair Display',serif;font-size:28px;font-weight:900;color:#d4af37;letter-spacing:3px}.card{border:1px solid #e8e0d0;border-radius:10px;overflow:hidden;margin-bottom:20px}.ch{background:#f8f4ed;border-bottom:1px solid #e8e0d0;padding:10px 16px;font-size:10px;font-weight:700;color:#8B6914;letter-spacing:3px;text-transform:uppercase}.cb{padding:14px 16px}table{width:100%;border-collapse:collapse}table td{padding:9px 14px;font-size:13px;border-bottom:1px solid #f0ece4}table td:last-child{text-align:right;font-weight:600}.tr td{background:#1a1208;color:#d4af37;font-size:15px;font-weight:900}ul{list-style:none;padding:0}ul li{padding:4px 0;font-size:12px;color:#444}ul li::before{content:"✓";color:#4caf50;font-weight:900;margin-right:8px}.no li::before{content:"✕";color:#f44336}@media print{body{-webkit-print-color-adjust:exact;print-color-adjust:exact}}</style></head><body><div class="page">
<div class="hdr"><div><div class="logo">EnKaje Pro</div></div><div style="text-align:right"><div style="font-size:13px;color:#555;font-weight:700">Presupuesto Profesional</div><div style="font-size:11px;color:#999">Folio: ${folio}</div><div style="font-size:11px;color:#999">Fecha: ${f.fecha||new Date().toLocaleDateString("es-MX")}</div></div></div>
<div style="background:linear-gradient(135deg,#1a1208,#2a1f08);border-left:5px solid #d4af37;border-radius:0 12px 12px 0;padding:18px 24px;margin-bottom:24px"><div style="font-size:10px;color:#d4af3799;letter-spacing:4px;text-transform:uppercase;margin-bottom:6px">${tipoIcon} Tipo de proyecto</div><div style="font-family:'Playfair Display',serif;font-size:22px;color:#d4af37;font-weight:700">${tipoLabel.toUpperCase()}</div></div>
<div class="card"><div class="ch">👤 Datos del Cliente</div><div class="cb"><div style="display:flex;justify-content:space-between;padding:5px 0;font-size:12px"><span style="color:#999">Nombre</span><span style="font-weight:600">${f.nombre||"---"}</span></div><div style="display:flex;justify-content:space-between;padding:5px 0;font-size:12px"><span style="color:#999">Teléfono</span><span style="font-weight:600">${f.telefono||"---"}</span></div></div></div>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:20px"><div class="card" style="margin-bottom:0"><div class="ch">✅ Incluye</div><div class="cb"><ul>${incluyeItems}</ul></div></div><div class="card" style="margin-bottom:0"><div class="ch">❌ No Incluye</div><div class="cb"><ul class="no">${noIncluyeItems}</ul></div></div></div>
<div class="card"><div class="ch">💰 Precios</div><div class="cb" style="padding:0"><table>${preciosRows}<tr class="tr"><td>TOTAL</td><td>$${total.toLocaleString("es-MX")} MXN</td></tr></table></div></div>
<div style="margin-top:12px;background:#fff8f0;border:1px solid #f0c070;border-radius:8px;padding:12px 16px;font-size:11px;color:#7a5a20">NOTA: Este presupuesto tiene vigencia de 15 días. EnKaje Pro actúa como intermediario.</div>
<div style="margin-top:28px;padding-top:16px;border-top:1px solid #e8e0d0;display:flex;justify-content:space-between"><div style="font-family:'Playfair Display',serif;font-size:13px;color:#d4af37;font-weight:700">EnKaje Pro</div><div style="font-size:10px;color:#bbb;text-align:right">enkajepro.com · Monterrey, NL<br>Folio: ${folio}</div></div>
</div><script>window.onload=function(){window.print()}</script></body></html>`);
    w.document.close();
  }

  function generarContrato(tallerData) {
    const f = getForm();
    const tipo = tipoForm==="cocina"?"Cocina Integral":tipoForm==="closet"?"Closet":tipoForm==="puerta"?"Puerta":tipoForm==="bano"?"Baño":tipoForm==="panel"?"Panel":"Mueble";
    const folio = `CT-${Date.now().toString().slice(-6)}`;
    const fecha = new Date().toLocaleDateString("es-MX", {day:"2-digit", month:"long", year:"numeric"});
    const total = [f.precio_fabricacion,f.precio_instalacion,f.precio_cubierta,f.precio_herrajes,f.precio_otros].reduce((a,v)=>a+(parseFloat(v)||0),0);
    const anticipo = total * parseFloat(f.anticipo||60) / 100;
    const antesInst = total * parseFloat(f.pago_entrega||30) / 100;
    const contraEntrega = total * parseFloat(f.pago_final||10) / 100;
    const tallerNombre = tallerData?.nombre_legal || tallerData?.nombre || "EnKaje Pro";
    const tallerRep = tallerData?.representante || f.atencion_por || "Felipe Santiago";
    const garantia = tallerData?.garantia_default || f.garantia || "6 meses en instalación y herrajes";
    const w = window.open("","_blank");
    w.document.write(`<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><title>Contrato ${tipo} · ${folio}</title>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
<style>*{box-sizing:border-box;margin:0;padding:0}body{font-family:'Inter',sans-serif;background:#fff;color:#1a1a1a;font-size:13px}.page{max-width:800px;margin:0 auto;padding:44px}.hdr{display:flex;justify-content:space-between;padding-bottom:20px;border-bottom:3px solid #d4af37;margin-bottom:24px}.logo{font-family:'Playfair Display',serif;font-size:26px;font-weight:900;color:#d4af37;letter-spacing:3px}.card{border:1px solid #e8e0d0;border-radius:10px;overflow:hidden;margin-bottom:16px}.ch{background:#f8f4ed;border-bottom:1px solid #e8e0d0;padding:8px 14px;font-size:10px;font-weight:700;color:#8B6914;letter-spacing:3px;text-transform:uppercase}.cb{padding:12px 14px}.row{font-size:12px;padding:3px 0;border-bottom:1px solid #f5f0ea}.clausula{margin-bottom:14px;padding-left:20px;position:relative}.clausula::before{content:attr(data-num)".";position:absolute;left:0;color:#d4af37;font-weight:700}.clausula-t{font-weight:700;margin-bottom:3px}.clausula-b{color:#555;font-size:12px;line-height:1.7}.pagos{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin-bottom:16px}.pago{background:#f8f4ed;border-radius:8px;padding:12px;text-align:center}.fir{display:grid;grid-template-columns:1fr 1fr;gap:48px;margin-top:40px;padding-top:20px;border-top:1px solid #e8e0d0;text-align:center}.fl{height:1px;background:#333;margin-bottom:8px}@media print{body{-webkit-print-color-adjust:exact;print-color-adjust:exact}}</style></head><body><div class="page">
<div class="hdr"><div><div class="logo">${tallerNombre}</div></div><div style="text-align:right"><div style="font-size:13px;font-weight:700;color:#555">Contrato de Fabricación</div><div style="font-size:11px;color:#999">Folio: ${folio}</div><div style="font-size:11px;color:#999">Fecha: ${fecha}</div></div></div>
<div style="background:linear-gradient(135deg,#1a1208,#2a1f08);border-left:5px solid #d4af37;border-radius:0 12px 12px 0;padding:16px 22px;margin-bottom:22px"><div style="font-size:10px;color:#d4af3799;letter-spacing:4px;text-transform:uppercase;margin-bottom:4px">Objeto del contrato</div><div style="font-family:'Playfair Display',serif;font-size:20px;color:#d4af37;font-weight:700">Fabricación e Instalación de ${tipo.toUpperCase()}</div></div>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:20px"><div class="card" style="margin-bottom:0"><div class="ch">🏭 PRESTADOR</div><div class="cb"><div class="row"><b>Nombre:</b> ${tallerNombre}</div><div class="row"><b>Representante:</b> ${tallerRep}</div></div></div><div class="card" style="margin-bottom:0"><div class="ch">👤 CLIENTE</div><div class="cb"><div class="row"><b>Nombre:</b> ${f.nombre||"---"}</div><div class="row"><b>Teléfono:</b> ${f.telefono||"---"}</div><div class="row"><b>Domicilio:</b> ${f.direccion||"---"}</div></div></div></div>
${total>0?`<div class="card"><div class="ch">💰 PRECIO Y FORMA DE PAGO</div><div class="cb" style="padding:0"><table style="width:100%;border-collapse:collapse">${[["Fabricación",f.precio_fabricacion],["Instalación",f.precio_instalacion],["Acabados",f.precio_cubierta],["Herrajes",f.precio_herrajes],["Otros",f.precio_otros]].filter(([,v])=>v&&parseFloat(v)>0).map(([l,v])=>`<tr><td style="padding:7px 14px;color:#666;border-bottom:1px solid #ede9e0">${l}</td><td style="padding:7px 14px;font-weight:600;text-align:right;border-bottom:1px solid #ede9e0">$${parseFloat(v).toLocaleString("es-MX")} MXN</td></tr>`).join("")}<tr style="background:#1a1208"><td style="padding:12px 14px;color:#d4af37;font-weight:900">TOTAL</td><td style="padding:12px 14px;color:#d4af37;font-weight:900;text-align:right">$${total.toLocaleString("es-MX")} MXN</td></tr></table></div></div>
<div class="pagos"><div class="pago"><div style="font-size:20px;font-weight:900;color:#8B6914">${f.anticipo||60}%</div><div style="font-size:9px;color:#999;text-transform:uppercase;margin-top:3px">Anticipo al firmar</div><div style="font-size:12px;font-weight:700;margin-top:3px">$${anticipo.toLocaleString("es-MX")} MXN</div></div><div class="pago"><div style="font-size:20px;font-weight:900;color:#8B6914">${f.pago_entrega||30}%</div><div style="font-size:9px;color:#999;text-transform:uppercase;margin-top:3px">Antes instalación</div><div style="font-size:12px;font-weight:700;margin-top:3px">$${antesInst.toLocaleString("es-MX")} MXN</div></div><div class="pago"><div style="font-size:20px;font-weight:900;color:#8B6914">${f.pago_final||10}%</div><div style="font-size:9px;color:#999;text-transform:uppercase;margin-top:3px">Contra entrega</div><div style="font-size:12px;font-weight:700;margin-top:3px">$${contraEntrega.toLocaleString("es-MX")} MXN</div></div></div>`:""}
<div class="card"><div class="ch">📋 CLÁUSULAS</div><div class="cb">
<div class="clausula" data-num="1"><div class="clausula-t">Objeto del contrato</div><div class="clausula-b">El prestador se obliga a fabricar e instalar un(a) ${tipo} conforme a las especificaciones acordadas.</div></div>
<div class="clausula" data-num="2"><div class="clausula-t">Precio y forma de pago</div><div class="clausula-b">El precio total es $${total>0?total.toLocaleString("es-MX"):"___,___"} MXN. El anticipo no es reembolsable una vez iniciada la fabricación.</div></div>
<div class="clausula" data-num="3"><div class="clausula-t">Tiempo de entrega</div><div class="clausula-b">El prestador se compromete a entregar en ${f.tiempo_entrega||"___ días hábiles"} a partir del anticipo.</div></div>
<div class="clausula" data-num="4"><div class="clausula-t">Garantía</div><div class="clausula-b">${garantia}. Cubre defectos de fabricación e instalación bajo condiciones normales de uso.</div></div>
<div class="clausula" data-num="5"><div class="clausula-t">Penalizaciones</div><div class="clausula-b">Retraso sin causa justificada: descuento del 2% por semana, hasta 10% máximo. Si supera 30 días, devolución total del anticipo.</div></div>
<div class="clausula" data-num="6"><div class="clausula-t">Jurisdicción</div><div class="clausula-b">Tribunales competentes de Monterrey, Nuevo León, México.</div></div>
</div></div>
<div class="fir"><div><div style="height:52px"></div><div class="fl"></div><div style="font-size:13px;font-weight:700">${tallerRep}</div><div style="font-size:10px;color:#999;text-transform:uppercase;margin-top:3px">Prestador</div></div><div><div style="height:52px"></div><div class="fl"></div><div style="font-size:13px;font-weight:700">${f.nombre||"Cliente"}</div><div style="font-size:10px;color:#999;text-transform:uppercase;margin-top:3px">Cliente · Acepta condiciones</div></div></div>
<div style="margin-top:24px;padding-top:14px;border-top:1px solid #e8e0d0;display:flex;justify-content:space-between"><div style="font-family:'Playfair Display',serif;font-size:13px;color:#d4af37;font-weight:700">EnKaje Pro</div><div style="font-size:10px;color:#bbb;text-align:right">enkajepro.com · Monterrey, NL · ${folio}</div></div>
</div><script>window.onload=function(){window.print()}</script></body></html>`);
    w.document.close();
  }

  async function generarMateriales() {
    const f = getForm();
    setMaterialesLoading(true); setMaterialesMsg(""); setMateriales([]);
    const arr = v => Array.isArray(v) && v.length ? v.join(", ") : (v || "no especificado");
    const tipo = tipoForm === "cocina" ? "cocina integral" : tipoForm === "closet" ? "closet" : tipoForm === "puerta" ? "puerta" : tipoForm === "bano" ? "mueble de baño" : tipoForm === "panel" ? "panel decorativo" : "mueble a medida";
    const medidas = tipoForm === "cocina"
      ? `Largo: ${f.largo||"?"}, Altura: ${f.altura||"?"}, Profundidad: ${f.profundidad||"?"}`
      : tipoForm === "puerta"
      ? `Ancho: ${f.ancho||"?"}, Alto: ${f.alto||"?"}, Grosor: ${f.grosor_puerta||"?"}, Cantidad: ${f.cantidad||1}`
      : `Largo: ${f.largo||"?"}, Alto: ${f.alto||f.altura||"?"}, Profundidad: ${f.profundidad||"?"}`;
    const prompt = `Eres un maestro carpintero experto en Monterrey. Un cliente quiere un(a) ${tipo}.
ESPECIFICACIONES: Medidas: ${medidas}, Material: ${arr(f.material)}, Grosor: ${arr(f.grosor)}, Estilo: ${arr(f.estilo)}, Color: ${f.color_principal||"no especificado"}, Acabado: ${arr(f.tipo_acabado)}, Puertas: ${arr(f.tipo_puertas||f.tipo_puerta)}, Jaladeras: ${arr(f.jaladeras)}, Bisagras: ${arr(f.bisagras)}, Correderas: ${arr(f.correderas)}, Accesorios: ${arr(f.accesorios||f.accesorios_closet||f.accesorios_mueble)}.
Genera lista de materiales con: nombre, cantidad con unidad, precio unitario en MXN Monterrey 2025, total.
También genera desglose: precio_fabricacion, precio_instalacion, precio_herrajes, precio_acabados, precio_otros.
Responde SOLO JSON válido sin texto adicional:
{"materiales":[{"material":"nombre","cantidad":"4 láminas","precio_unitario":850,"total":3400,"notas":"MDF 18mm"}],"desglose":{"precio_fabricacion":0,"precio_instalacion":0,"precio_herrajes":0,"precio_acabados":0,"precio_otros":0}}
Precios Monterrey 2025: MDF 18mm $850-950, bisagras cierre lento $45-65, corredera telescópica $85-120, jaladeras $35-80. Máximo 10 materiales.`;
    try {
      const res = await fetch("/api/common", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ model: "claude-sonnet-4-6", max_tokens: 3000, messages: [{ role: "user", content: prompt }] }) });
      const data = await res.json();
      const txt = data.content?.[0]?.text || "{}";
      const clean = txt.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);
      const lista = Array.isArray(parsed) ? parsed : (parsed.materiales || []);
      const desglose = parsed.desglose || null;
      setMateriales(lista);
      if (desglose) {
        if (desglose.precio_fabricacion > 0) setFormField("precio_fabricacion", String(Math.round(desglose.precio_fabricacion)));
        if (desglose.precio_instalacion > 0) setFormField("precio_instalacion", String(Math.round(desglose.precio_instalacion)));
        if (desglose.precio_herrajes > 0)    setFormField("precio_herrajes",    String(Math.round(desglose.precio_herrajes)));
        if (desglose.precio_acabados > 0)    setFormField("precio_cubierta",    String(Math.round(desglose.precio_acabados)));
        if (desglose.precio_otros > 0)       setFormField("precio_otros",       String(Math.round(desglose.precio_otros)));
        const totalIA = Object.values(desglose).reduce((a,v) => a+(parseFloat(v)||0), 0);
        setMaterialesMsg(`✅ ${lista.length} materiales · $${totalIA.toLocaleString("es-MX")} MXN → desglose aplicado`);
      } else {
        const totalMat = lista.reduce((s,m) => s+(parseFloat(m.total)||0), 0);
        if (totalMat > 0) { setFormField("precio_fabricacion", String(Math.round(totalMat))); setMaterialesMsg(`✅ ${lista.length} materiales · $${totalMat.toLocaleString("es-MX")} MXN`); }
      }
    } catch(e) { setMaterialesMsg("❌ Error: " + e.message); }
    setMaterialesLoading(false);
  }

  async function enviarChat() {
    if (!chatInput.trim() || chatLoading) return;
    const userMsg = chatInput.trim();
    setChatInput(""); setChatLoading(true);
    setChatHistory(prev => [...prev, { role: "user", content: userMsg }]);
    try {
      const tipoLabel = tipoForm==="cocina"?"cocina integral":tipoForm==="closet"?"closet":tipoForm==="puerta"?"puerta":tipoForm==="panel"?"panel decorativo":tipoForm==="bano"?"mueble de baño":"mueble a medida";
      const contexto = `Eres un asistente experto en carpintería y ebanistería para talleres en Monterrey, México. El taller trabaja con: ${tipoLabel}. Responde en español, de forma práctica y concisa. Máximo 200 palabras.`;
      const messages = [...chatHistory.map(m => ({ role: m.role, content: m.content })), { role: "user", content: userMsg }];
      const res = await fetch("/api/common", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ model: "claude-sonnet-4-6", max_tokens: 400, system: contexto, messages }) });
      const data = await res.json();
      const reply = data.content?.[0]?.text || "No pude responder, intenta de nuevo.";
      setChatHistory(prev => [...prev, { role: "assistant", content: reply }]);
    } catch(e) {
      setChatHistory(prev => [...prev, { role: "assistant", content: "❌ Error: " + e.message }]);
    }
    setChatLoading(false);
  }

  async function generarRender() {
    if (!renderPrompt.trim()) return;
    setRenderLoading(true); setRenderMsg(""); setRenderImg(null);
    try {
      const f = getForm();
      const arr = v => Array.isArray(v) && v.length ? v.join(", ") : "";

      // Contexto por tipo de proyecto
      const TIPO_CONTEXT = {
        cocina: { subject: "custom kitchen (cocina integral)", lighting: "LED strips under upper cabinets, recessed ceiling spots, warm 2700K.", layout: "Show full kitchen — upper cabinets, lower cabinets, countertop, backsplash all visible.", detail: "Upper wall cabinets and lower base cabinets with countertop. Island if applicable. Quartz or porcelain slab countertop." },
        closet: { subject: "custom walk-in closet or built-in wardrobe", lighting: "Internal LED strip lighting, warm 2700K luxury boutique feel.", layout: "Show full closet interior — hanging section, shelving, drawers, and lighting all visible.", detail: "Double hanging rail, open shelving, full-length mirror panel, drawer bank." },
        puerta: { subject: "custom interior door (puerta a medida)", lighting: "Dramatic directional side lighting revealing door texture.", layout: "Show door full height floor to ceiling with wall context.", detail: "Full height door panel with premium hardware. Floor-to-ceiling height minimum 2.40m." },
        mueble: { subject: "custom entertainment center and TV wall (mueble a medida)", lighting: "LED strip behind TV panel warm halo glow, LED inside niches.", layout: "Show full entertainment wall — TV centered, flanking units, floating console.", detail: "TV mounted floating at center, full-height custom millwork." },
        panel:  { subject: "custom decorative wall panel (panel decorativo / lambrin)", lighting: "LED strip from ceiling grazing down the surface revealing texture.", layout: "Show full decorative wall floor to ceiling, full width.", detail: "Vertical fluted/slat design, 3-5cm wide slats with deep shadow gaps, floor to ceiling." },
        bano:   { subject: "custom bathroom vanity (mueble de baño / vanity)", lighting: "LED strip behind mirror creating floating halo effect, warm 2700K.", layout: "Show full vanity wall — mirror above, countertop with sink, cabinet below.", detail: "Floating vanity at 85cm height. Calacatta or white quartz countertop. Full-width illuminated mirror." },
      };

      const ESTILO_HINTS = {
        moderno: "modern clean lines, flat panel cabinets, neutral tones, hidden hardware",
        minimalista: "minimalist, handleless push-open doors, white matte, seamless surfaces",
        contemporaneo: "contemporary, mix of wood and lacquer, porcelain countertop",
        industrial: "industrial, raw wood, black matte metal hardware, exposed textures",
        clasico: "classic, raised panel doors, ornamental moldings, solid wood, warm tones",
        rustico: "rustic, natural pine or cedar wood, visible grain, organic textures, warm earthy tones",
        nordico: "scandinavian nordic, white cabinets, light birch wood accents, cozy warm lighting",
        lujo: "luxury premium, veined marble countertop, gold brass hardware, noble wood veneer, dramatic lighting",
      };

      const MATERIAL_HINTS = {
        melamina:      "MELAMINE cabinet doors — smooth solid color panels, flat panel construction, thin ABS edge banding",
        mdf:           "MDF LACADO painted doors — NO wood grain anywhere, smooth as glass, perfectly uniform solid color",
        enchapado:     "MADERA ENCHAPADA wood veneer — clear natural wood grain in consistent direction, warm wood appearance",
        madera_solida: "MADERA SOLIDA solid hardwood — thick solid wood, deep rich grain with natural variation, end grain visible at edges",
      };

      const tipoCtx = TIPO_CONTEXT[tipoForm] || TIPO_CONTEXT.cocina;
      const estiloKey = arr(f.estilo).toLowerCase().split(",")[0].trim().replace(" / premium","").replace(" ","");
      const materialKey = arr(f.material).toLowerCase().split(",")[0].trim().replace(/ /g,"_").replace("mdf_rh_antihumedad","mdf").replace("madera_solida","madera_solida").replace("triplay","madera_solida");

      const prompt = [
        `Professional photorealistic interior design render. Ultra-realistic, 3D visualization studio quality, 4K, architectural visualization.`,
        `Lighting: ${tipoCtx.lighting}`,
        `Camera: wide angle lens, eye-level. ${tipoCtx.layout}`,
        `Setting: luxury residential home in Monterrey Mexico, San Pedro Garza García or Cumbres style.`,
        `Subject: brand new ${tipoCtx.subject}.`,
        `Design specification: ${tipoCtx.detail}`,
        arr(f.estilo) && `Style: ${arr(f.estilo)} — ${ESTILO_HINTS[estiloKey] || arr(f.estilo)}.`,
        materialKey && MATERIAL_HINTS[materialKey] && `Material: ${MATERIAL_HINTS[materialKey]}.`,
        f.color_principal && `COLOR: Apply ${f.color_principal} color ONLY to the cabinet/door surfaces. Do NOT apply to walls, floor, or ceiling.`,
        arr(f.tipo_acabado) && `Finish: ${arr(f.tipo_acabado)} surface finish on all cabinet faces.`,
        arr(f.jaladeras) && `Hardware: ${arr(f.jaladeras)} style handles/pulls.`,
        renderPrompt && `Additional client request: ${renderPrompt}.`,
        `Final: ultra-sharp, perfect warm LED lighting, rich material textures, premium Monterrey residential aesthetic. No watermarks, no text.`,
      ].filter(Boolean).join(" ");

      const res = await fetch("/api/image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt })
      });
      const data = await res.json();
      const imgData = data.data?.data?.[0] || data.data?.[0];
      const imgUrl = imgData?.url;
      const imgB64 = imgData?.b64_json;
      if (imgUrl) { setRenderImg(imgUrl); setRenderMsg("✅ Render generado"); }
      else if (imgB64) { setRenderImg("data:image/png;base64," + imgB64); setRenderMsg("✅ Render generado"); }
      else { setRenderMsg("❌ " + (data?.error?.message || "Error al generar")); }
    } catch(e) { setRenderMsg("❌ " + e.message); }
    setRenderLoading(false);
  }

  async function generarRenderTecnico() {
    if (!renderPrompt.trim() && !tipoForm) return;
    setRenderLoading(true); setRenderMsg(""); setRenderImg(null);
    try {
      const f = getForm();
      const arr = v => Array.isArray(v) && v.length ? v.join(", ") : "";

      // Medidas reales del formulario
      const largo      = f.largo      || f.ancho  || "?";
      const alto       = f.altura     || f.alto   || "?";
      const profundo   = f.profundidad || "?";
      const cantidad   = f.cantidad   || "1";

      // Medidas en metros con conversión a cm para el drawing
      const largoM  = parseFloat(largo)  || 0;
      const altoM   = parseFloat(alto)   || 0;
      const profM   = parseFloat(profundo) || 0;
      const largoCM = largoM  > 0 ? Math.round(largoM  * 100) : "?";
      const altoCM  = altoM   > 0 ? Math.round(altoM   * 100) : "?";
      const profCM  = profM   > 0 ? Math.round(profM   * 100) : "?";

      // Contexto por tipo
      const TIPO_DRAWING = {
        cocina: {
          name: "Kitchen Cabinet System (Cocina Integral)",
          views: "FRONT ELEVATION showing all upper wall cabinets and lower base cabinets full width. SIDE SECTION showing upper cabinet depth, countertop thickness, base cabinet depth, and toe kick. PLAN VIEW (top-down) showing cabinet layout configuration.",
          components: "Upper wall cabinets with doors, lower base cabinets with doors and drawers, countertop, backsplash area, toe kick, internal shelf positions, hinge locations, drawer slides, handles/pulls position",
          notes: `Total run: ${largoCM}cm wide × ${altoCM}cm floor-to-ceiling height × ${profCM}cm deep. Upper cabinet height: typically 70-75cm. Base cabinet height: 85cm to countertop. Countertop thickness: 3cm. Toe kick: 10cm high × 6cm deep.`,
        },
        closet: {
          name: "Built-in Wardrobe / Walk-in Closet (Closet a Medida)",
          views: "FRONT ELEVATION showing full wardrobe width with all doors and panels. INTERIOR ELEVATION showing internal layout: hanging rails, shelves, drawer bank, shoe rack. SIDE SECTION showing depth and shelf positions.",
          components: "Door panels (sliding or hinged), hanging rails at two heights, folded clothing shelves, drawer bank with drawer fronts, shoe storage area, internal LED strip position, full-length mirror panel if applicable",
          notes: `Overall: ${largoCM}cm wide × ${altoCM}cm high × ${profCM}cm deep. Standard hanging height: 190cm. Double hang section: 2× 95cm. Shelf spacing: 35-40cm. Drawer height: 18-20cm each.`,
        },
        puerta: {
          name: "Custom Interior Door (Puerta Interior a Medida)",
          views: "FRONT ELEVATION full height door panel with design detail, frame, and architrave. SIDE SECTION showing door thickness, frame reveal, and wall thickness. DETAIL section of hinge mortise and lock block.",
          components: "Door panel face with design profile (flat, grooved, raised panel), door frame/jamb, architrave/casing both sides, hinge locations (3 hinges), lock block position, handle/lever height, threshold",
          notes: `Door: ${f.ancho ? Math.round(parseFloat(f.ancho)*100) : "?"}cm wide × ${f.alto ? Math.round(parseFloat(f.alto)*100) : "?"}cm high × ${f.grosor_puerta || "4.5"}cm thick. Frame reveal: 1cm. Quantity: ${cantidad} unit(s). Hinge spacing: top 20cm, bottom 25cm, middle center.`,
        },
        mueble: {
          name: "Custom Furniture / TV Wall Unit (Mueble a Medida)",
          views: "FRONT ELEVATION full width showing all cabinets, open niches, and TV panel. SIDE SECTION showing depth and shelf positions. PLAN VIEW (top-down) showing layout.",
          components: "Closed cabinet doors with hinges, open display niches, TV mounting panel, floating console/media unit, internal shelf positions, LED strip channel position, back panel, side panels",
          notes: `Overall: ${largoCM}cm wide × ${altoCM}cm high × ${profCM}cm deep. TV panel centered. Console height: 40-45cm from floor. Niche openings labeled with width × height. Material thickness: ${arr(f.grosor)||"18"}mm.`,
        },
        panel: {
          name: "Decorative Wall Panel / Lambrin (Panel Decorativo)",
          views: "FRONT ELEVATION full wall width showing slat or groove pattern. HORIZONTAL SECTION (plan cut) showing panel profile detail and wall attachment method. VERTICAL SECTION showing panel height and base/top trim.",
          components: "Individual slat or panel elements with spacing, wall mounting battens/furring strips, LED strip channel at top (if applicable), base trim/plinth, ceiling trim, panel joints, material thickness",
          notes: `Panel run: ${largoCM}cm wide × ${altoCM}cm high. Panel/slat thickness: ${arr(f.grosor)||"18"}mm. Slat width: typically 4-6cm. Shadow gap: 1-2cm. Wall clearance for LED: 3-4cm. Material: ${arr(f.material_panel)||arr(f.material)||"MDF"}.`,
        },
        bano: {
          name: "Bathroom Vanity Unit (Mueble de Baño / Vanity)",
          views: "FRONT ELEVATION showing vanity cabinet with doors, drawers, sink cutout, and mirror above. SIDE SECTION showing vanity depth, countertop, wall-mount detail, and LED mirror position. PLAN VIEW (top-down) showing countertop and sink position.",
          components: "Cabinet body (floating/wall-hung), door panels with hinges, drawer fronts with slides, countertop with sink cutout, undermount or vessel sink position, mirror frame or LED mirror above, plumbing access panel, LED strip channel",
          notes: `Vanity: ${f.ancho ? Math.round(parseFloat(f.ancho)*100) : "?"}cm wide × ${f.alto ? Math.round(parseFloat(f.alto)*100) : "?"}cm high × ${profCM}cm deep. Float height from floor: typically 15-20cm. Countertop thickness: 2-3cm. Mirror full width above. LED behind mirror.`,
        },
      };

      const ctx = TIPO_DRAWING[tipoForm] || TIPO_DRAWING.mueble;

      const prompt = [
        // Estilo visual del dibujo
        `MILLWORK SHOP DRAWING — professional technical drawing on pure white background, black ink lines only, no color, no shading, no photorealism.`,
        `Drawing style: precise architectural drafting, clean CAD-quality linework, thin lines for details and thick lines for outlines/cuts.`,

        // Vistas requeridas
        `REQUIRED VIEWS — arranged on the page in standard drafting layout:`,
        `1. ${ctx.views}`,

        // Sujeto y componentes
        `Subject: ${ctx.name}.`,
        `Show all components clearly labeled: ${ctx.components}.`,

        // Dimensiones exactas
        `CRITICAL DIMENSIONS — draw and annotate ALL of these measurements with dimension lines, arrows, and numbers:`,
        `${ctx.notes}`,
        `Material thickness: ${arr(f.grosor)||"18"}mm panels throughout.`,
        arr(f.material) && `Material specification callout: ${arr(f.material)}.`,
        arr(f.tipo_acabado) && `Finish note: ${arr(f.tipo_acabado)}.`,
        arr(f.jaladeras) && `Hardware: ${arr(f.jaladeras)} handles — mark position on elevation.`,
        arr(f.bisagras) && `Hinges: ${arr(f.bisagras)} — mark all hinge locations.`,

        // Anotaciones técnicas
        `ANNOTATIONS — include these on the drawing:`,
        `- Dimension lines with double-headed arrows and measurements in centimeters (cm) for overall dimensions`,
        `- Leader lines with callout bubbles identifying each component`,
        `- Material schedule box in corner: substrate, thickness, finish`,
        `- Scale indicator: SCALE 1:20`,
        `- Title block at bottom: project name, date, view name`,
        `- Section cut symbols where sections are taken`,
        `- Center lines (CL) for symmetric elements`,
        `- Hidden lines (dashed) for internal components not visible in elevation`,

        // Instrucción adicional del taller
        renderPrompt && `Additional specifications: ${renderPrompt}.`,

        // Regla final
        `FINAL RULE: This must look exactly like a professional millwork shop drawing produced in AutoCAD or similar CAD software. Pure white background, black lines only, all measurements visible and readable, drafted to scale 1:20. No artistic rendering, no perspective distortion, no shadows — flat 2D orthographic technical drawing only.`,
      ].filter(Boolean).join(" ");

      const res = await fetch("/api/image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt })
      });
      const data = await res.json();
      const imgData = data.data?.data?.[0] || data.data?.[0];
      const imgUrl = imgData?.url;
      const imgB64 = imgData?.b64_json;
      if (imgUrl) { setRenderImg(imgUrl); setRenderMsg("✅ Plano técnico generado"); }
      else if (imgB64) { setRenderImg("data:image/png;base64," + imgB64); setRenderMsg("✅ Plano técnico generado"); }
      else { setRenderMsg("❌ " + (data?.error?.message || "Error al generar")); }
    } catch(e) { setRenderMsg("❌ " + e.message); }
    setRenderLoading(false);
  }

  async function generarContenidoSocial() {
    setSocialLoading(true); setSocialCaption("");
    try {
      const tipo = tipoForm === "cocina" ? "cocina" : tipoForm === "closet" ? "closet" : tipoForm === "puerta" ? "puerta" : tipoForm === "bano" ? "baño" : "mueble";
      const estilo = Array.isArray(getForm().estilo) ? getForm().estilo.join(", ") : (getForm().estilo || "");
      const prompt = `Eres experto en marketing de carpintería para redes sociales en México. Genera un caption para Instagram/Facebook para un taller de carpintería en Monterrey que terminó un proyecto de ${tipo}${estilo ? ` estilo ${estilo}` : ""}. En español mexicano, máximo 150 palabras, con call to action, 15-20 hashtags, menciona Monterrey, con emojis. Caption completo listo para copiar.`;
      const res = await fetch("/api/common", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ model: "claude-sonnet-4-6", max_tokens: 500, messages: [{ role: "user", content: prompt }] }) });
      const data = await res.json();
      setSocialCaption(data.content?.[0]?.text || "");
    } catch(e) { setSocialCaption("❌ Error: " + e.message); }
    setSocialLoading(false);
  }

  async function analizarConIA() {
    const form = getForm();
    setAiLoading(true); setAiResult("");
    const tipoTxt = tipoForm === "cocina" ? "cocina integral" : tipoForm === "closet" ? "closet" : tipoForm === "puerta" ? "puerta" : tipoForm === "bano" ? "mueble de baño" : tipoForm === "panel" ? "panel decorativo" : "mueble a medida";
    try {
      const prompt = `Eres experto diseñador de carpintería fina en Monterrey. El cliente quiere un ${tipoTxt}.
Especificaciones: Estilo: ${Array.isArray(form.estilo)?form.estilo.join(", "):"sin definir"}, Material: ${Array.isArray(form.material)?form.material.join(", "):"sin definir"}, Color: ${form.color_principal||"sin definir"}, Acabado: ${Array.isArray(form.tipo_acabado)?form.tipo_acabado.join(", "):"sin definir"}.
Da: 1) Descripción del proyecto en 2-3 oraciones 2) Combinación ideal materiales/colores 3) Accesorios que recomiendas 4) Rango de precio en Monterrey MXN 5) 3 tips profesionales. Usa emojis. Máximo 300 palabras.`;
      const res = await fetch("/api/common", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ model: "claude-sonnet-4-6", max_tokens: 800, messages: [{ role: "user", content: prompt }] }) });
      const data = await res.json();
      setAiResult(data.content?.[0]?.text || "Configura tu API key de Anthropic en Vercel.");
    } catch { setAiResult("Configura tu API key en Vercel > Settings > Environment Variables."); }
    setAiLoading(false);
  }

  const pad = isMobile ? "16px" : "28px 20px";

  // ── PÁGINAS LEGALES ────────────────────────────────────────────────────────
  if (legalPage === "privacidad") return <PaginaPrivacidad onBack={() => setLegalPage(null)} />;
  if (legalPage === "terminos")   return <PaginaTerminos   onBack={() => setLegalPage(null)} />;
  if (legalPage === "cookies")    return <PaginaCookies    onBack={() => setLegalPage(null)} />;

  // ── LOGIN ──────────────────────────────────────────────────────────────────
  if (screen === "login") return (
    <div style={{ minHeight: "100vh", background: "#070708", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px 16px" }}>
      <style>{GLOBAL_CSS}</style>
      <div dangerouslySetInnerHTML={{__html: FA_CDN}} />
      <div style={{ width: "100%", maxWidth: 420 }} className="fade-up">
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <button onClick={() => window.location.href="/"} style={{ background: "transparent", border: "none", color: "#555", cursor: "pointer", fontSize: 13, marginBottom: 16, padding: "8px 0" }}>← Volver</button>
          <LogoInline size="md" />
          <div style={{ fontSize: 10, color: "#444", letterSpacing: 3, marginTop: 6 }}>PLATAFORMA DE CARPINTERIA</div>
        </div>
        <div style={{ background: "#0f0f0a", border: "1px solid #d4af3725", borderRadius: 20, padding: isMobile ? 20 : 28 }}>
          <div style={{ display: "flex", gap: 4, marginBottom: 20, background: "#070708", borderRadius: 10, padding: 4 }}>
            {[["login","Iniciar Sesión"],["register","Crear Cuenta"]].map(([k,l]) => (
              <button key={k} onClick={() => setLoginMode(k)} style={{ flex: 1, padding: "11px 8px", borderRadius: 8, border: "none", background: loginMode===k?"#d4af37":"transparent", color: loginMode===k?"#000":"#555", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>{l}</button>
            ))}
          </div>
          {loginMode === "register" && <INPUT label="Nombre completo" value={loginForm.nombre} onChange={e => setLoginForm(p => ({...p, nombre: e.target.value}))} placeholder="Tu nombre" />}
          <INPUT label="Correo electronico" value={loginForm.email} onChange={e => setLoginForm(p => ({...p, email: e.target.value}))} placeholder="correo@ejemplo.com" type="email" />
          <INPUT label="Contrasena" value={loginForm.password} onChange={e => setLoginForm(p => ({...p, password: e.target.value}))} placeholder="••••••••" type="password" />
          {loginError && <div style={{ background: loginError.includes("✅")?"#0a2a0a":"#1a0a0a", border: `1px solid ${loginError.includes("✅")?"#4caf5040":"#f4433640"}`, borderRadius: 8, padding: "10px 14px", marginBottom: 14, fontSize: 13, color: loginError.includes("✅")?"#4caf50":"#f44336" }}>{loginError}</div>}
          <button onClick={loginMode==="login"?login:register} disabled={loginLoading}
            style={{ width: "100%", background: "#d4af37", color: "#000", border: "none", borderRadius: 12, padding: "14px", fontWeight: 700, fontSize: 15, cursor: "pointer", letterSpacing: 1 }}>
            {loginLoading ? "..." : loginMode==="login" ? "ENTRAR" : "CREAR CUENTA"}
          </button>
          {loginMode === "register" && (
            <div style={{ marginTop: 12, textAlign: "center", fontSize: 11, color: "#444", lineHeight: 1.6 }}>
              Las cuentas de taller son activadas por el equipo EnKaje Pro.<br/>
              ¿Eres un taller? Escríbenos a <span style={{ color: "#d4af37" }}>hola@enkajepro.com</span>
            </div>
          )}
        </div>
        <div style={{ marginTop: 20, textAlign: "center", display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          {[["privacidad","Privacidad"],["terminos","Términos"],["cookies","Cookies"]].map(([k,l]) => (
            <button key={k} onClick={() => setLegalPage(k)} style={{ background: "transparent", border: "none", color: "#444", fontSize: 11, cursor: "pointer", letterSpacing: 1, textDecoration: "underline" }}>{l}</button>
          ))}
        </div>
      </div>
    </div>
  );

  // ── NAVEGACIÓN ─────────────────────────────────────────────────────────────
  // Admin: Dashboard | Constructor | Presupuestos | Proyectos | Oportunidades | Talleres | Blog | IA | Config
  // Taller: Inicio | Nuevo Proyecto | Proyectos | Oportunidades | Cotizaciones | Portafolio | Perfil | Plan | IA
  // Cliente: Inicio | Crear Proyecto | Mis Proyectos | Inspiración | Mi Cuenta
  const tabs = role === "admin"
    ? [
        ["bienvenida","📊 Dashboard"],
        ["formulario","Constructor"],
        ["presupuesto","Presupuestos"],
        ["proyectos","Proyectos"],
        ["oportunidades","Oportunidades"],
        ["talleres","Talleres"],
        ["blog","Blog"],
        ["ia","IA"],
        ["configuracion","Config"],
      ]
    : role === "taller"
    ? [
        ["bienvenida","Inicio"],
        ["formulario","Nuevo Proyecto"],
        ["leads","Proyectos"],
        ["oportunidades","Oportunidades"],
        ["presupuesto","Cotizaciones"],
        ["portafolio","Portafolio"],
        ["perfil_taller","Perfil"],
        ["plan_taller","Plan"],
        ["ia","IA"],
      ]
    : [
        ["bienvenida","Inicio"],
        ["formulario","Crear Proyecto"],
        ["mis_proyectos","Mis Proyectos"],
        ["estilos","Inspiración"],
        ["mi_cuenta","Mi Cuenta"],
      ];

  const form = getForm();

  const TIPO_SELECTOR = () => (
    <div style={{ background: "#0f0f0a", border: "1px solid #1a1a12", borderRadius: 16, padding: "16px 20px", marginBottom: 20 }}>
      <label style={{ fontSize: 11, color: "#555", display: "block", marginBottom: 10, textTransform: "uppercase", letterSpacing: 1 }}>Tipo de Proyecto</label>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {[["cocina","🍳 Cocina"],["closet","👔 Closet"],["puerta","🚪 Puerta"],["mueble","🛋️ Mueble"],["panel","🪵 Panel"],["bano","🚿 Baño"]].map(([k,l]) => (
          <PILL_SINGLE key={k} label={l} checked={tipoForm===k} onChange={() => cambiarTipoForm(k)} />
        ))}
      </div>
    </div>
  );

  // ── ESTIMACIÓN RANGO — visible para cliente en Crear Proyecto ─────────────
  const rangoEstimacion = calcularRangoEstimacion(
    tipoForm,
    Array.isArray(form.estilo) && form.estilo.length > 0 ? form.estilo[0].toLowerCase() : "",
    Array.isArray(form.material) && form.material.length > 0 ? form.material[0].toLowerCase().replace(/ /g,"_") : ""
  );

  return (
    <div style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", background: "#070708", minHeight: "100vh", color: "#e8e0d0" }}>
      <style>{GLOBAL_CSS}</style>
      <div dangerouslySetInnerHTML={{__html: FA_CDN}} />

      {/* HEADER */}
      <div style={{ background: "linear-gradient(135deg,#12100a,#070708)", borderBottom: "1px solid #d4af3720", padding: `0 ${isMobile?14:20}px`, position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 0" }}>
          <div style={{ cursor: "pointer" }} onClick={() => setTabWithHistory("bienvenida")}>
            <LogoInline size="nav" />
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            {!isMobile && <div style={{ fontSize: 12, color: "#aaa" }}>Hola, {nombreUsuario}</div>}
            <button onClick={() => {
              setScreen("login"); setRole(null); setUser(null); setToken(null);
              sessionStorage.removeItem("enkaje_token"); sessionStorage.removeItem("enkaje_user");
              sessionStorage.removeItem("enkaje_role"); sessionStorage.removeItem("enkaje_tab");
              history.replaceState({}, "", window.location.pathname);
            }} style={{ background: "transparent", border: "1px solid #2a2a20", color: "#555", borderRadius: 8, padding: "7px 12px", fontSize: 12, cursor: "pointer" }}>Salir</button>
          </div>
        </div>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", gap: 2, overflowX: "auto", paddingBottom: 1 }}>
          {tabs.map(([k,l]) => (
            <button key={k} onClick={() => setTabWithHistory(k)} style={{
              background: "transparent", border: "none",
              borderBottom: tab===k?"2px solid #d4af37":"2px solid transparent",
              color: tab===k?"#d4af37":"#aaa",
              padding: isMobile?"10px 10px":"10px 16px",
              cursor: "pointer", fontSize: isMobile?11:13, fontWeight: 700, whiteSpace: "nowrap"
            }}>{l}</button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: pad }}>

        {/* ── BIENVENIDA ─────────────────────────────────────────────────────── */}
        {tab === "bienvenida" && (
          <div className="fade-up">
            {/* Hero */}
            <div style={{ background: "linear-gradient(135deg,#1a1208,#0f0f0a)", border: "1px solid #d4af3730", borderRadius: 20, padding: isMobile?"24px 20px":"36px 32px", marginBottom: 20 }}>
              <div style={{ fontSize: 11, color: "#d4af37", letterSpacing: 2, marginBottom: 6 }}>
                {role==="admin"?"PANEL ADMINISTRATIVO":role==="taller"?"PORTAL DEL TALLER":"PORTAL DE CLIENTE"}
              </div>
              <h1 style={{ fontSize: isMobile?22:32, fontWeight: 900, color: "#e8e0d0", margin: "0 0 8px" }}>
                {role==="admin" ? `Dashboard · EnKaje Pro` : role==="taller" ? `Bienvenido, ${nombreUsuario}` : `Hola, ${nombreUsuario}`}
              </h1>
              <p style={{ color: "#aaa", fontSize: 14, margin: "0 0 20px", lineHeight: 1.6 }}>
                {role==="admin"
                  ? "Centro de control de EnKaje Pro — proyectos, talleres, oportunidades y métricas."
                  : role==="taller"
                  ? "Aquí recibes oportunidades de clientes y gestionas tus proyectos."
                  : "Diseña y visualiza tu proyecto ideal con IA antes de contratar."}
              </p>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {role==="admin" && <>
                  <BTN onClick={() => setTabWithHistory("formulario")}>+ Nuevo Proyecto</BTN>
                  <BTN onClick={() => setTabWithHistory("proyectos")} outline color="#d4af37">Ver Proyectos ({proyectos.length})</BTN>
                  <BTN onClick={() => setTabWithHistory("talleres")} outline color="#00bcd4">Ver Talleres ({talleresMem.length})</BTN>
                </>}
                {role==="taller" && <>
                  <BTN onClick={() => setTabWithHistory("oportunidades")}>Ver Oportunidades</BTN>
                  <BTN onClick={() => setTabWithHistory("leads")} outline color="#d4af37">Mis Proyectos ({proyectos.length})</BTN>
                  {talleresMem.find(t=>t.email===user?.email)?.slug && (
                    <BTN onClick={() => window.open(`https://enkajepro.com/taller/${talleresMem.find(t=>t.email===user?.email).slug}`, "_blank")} outline color="#4caf50">🔗 Mi link público</BTN>
                  )}
                </>}
                {role==="cliente" && <>
                  <BTN onClick={() => setTabWithHistory("formulario")}>✨ Crear mi Proyecto</BTN>
                  <BTN onClick={() => setTabWithHistory("estilos")} outline color="#d4af37">Ver Inspiración</BTN>
                </>}
              </div>
            </div>

            {/* Métricas */}
            <div style={{ display: "grid", gridTemplateColumns: isMobile?"1fr 1fr":"repeat(4,1fr)", gap: 12, marginBottom: 20 }}>
              {role==="admin" && [
                ["Proyectos", proyectos.length, "#d4af37", "proyectos"],
                ["Nuevos", proyectos.filter(p=>p.estado==="nuevo").length, "#00bcd4", "proyectos"],
                ["En proceso", proyectos.filter(p=>p.estado==="proceso").length, "#f0a500", "proyectos"],
                ["Talleres activos", talleresMem.filter(t=>t.estado==="activo").length, "#4caf50", "talleres"],
              ].map(([l,v,c,dest],i) => (
                <div key={i} onClick={() => setTabWithHistory(dest)} style={{ background: "#0f0f0a", border: `1px solid ${c}25`, borderRadius: 12, padding: isMobile?14:18, cursor: "pointer" }}>
                  <div style={{ fontSize: 9, color: "#444", letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>{l}</div>
                  <div style={{ fontSize: isMobile?26:32, fontWeight: 900, color: c }}>{v}</div>
                </div>
              ))}
              {role==="taller" && [
                ["Oportunidades nuevas", leads.filter(l=>l.estado_lead==="nuevo").length, "#d4af37"],
                ["Proyectos activos", proyectos.filter(p=>p.estado==="nuevo"||p.estado==="proceso").length, "#00bcd4"],
                ["Ganados", proyectos.filter(p=>p.estado==="entregado").length, "#4caf50"],
                ["Total proyectos", proyectos.length, "#f0a500"],
              ].map(([l,v,c],i) => (
                <div key={i} style={{ background: "#0f0f0a", border: `1px solid ${c}25`, borderRadius: 12, padding: isMobile?14:18 }}>
                  <div style={{ fontSize: 9, color: "#444", letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>{l}</div>
                  <div style={{ fontSize: isMobile?26:32, fontWeight: 900, color: c }}>{v}</div>
                </div>
              ))}
              {role==="cliente" && [
                ["Crear Proyecto","Diseña con IA","formulario","#d4af37"],
                ["Inspiración","Explora estilos","estilos","#00bcd4"],
                ["Mis Proyectos","Ver guardados","mis_proyectos","#4caf50"],
                ["IA Asesora","Recomendaciones","ia","#f0a500"],
              ].map(([t,d,dest,c],i) => (
                <div key={i} onClick={() => setTabWithHistory(dest)} style={{ background: "#0f0f0a", border: `1px solid ${c}25`, borderRadius: 12, padding: isMobile?14:18, cursor: "pointer" }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: c, marginBottom: 4 }}>{t}</div>
                  <div style={{ fontSize: 11, color: "#555", lineHeight: 1.5 }}>{d}</div>
                </div>
              ))}
            </div>

            {/* Ingresos admin */}
            {role==="admin" && talleresMem.length > 0 && (
              <div style={{ background: "#1a1208", border: "1px solid #d4af3730", borderRadius: 12, padding: 20, marginBottom: 20 }}>
                <div style={{ fontSize: 11, color: "#555", letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>Ingresos Mensuales Estimados</div>
                <div style={{ fontSize: 28, fontWeight: 900, color: "#d4af37" }}>
                  ${(talleresMem.filter(t=>t.plan==="basico"&&t.estado==="activo").length*699 + talleresMem.filter(t=>t.plan==="pro"&&t.estado==="activo").length*1499 + talleresMem.filter(t=>t.plan==="premium"&&t.estado==="activo").length*2999).toLocaleString("es-MX")} MXN
                </div>
                <div style={{ fontSize: 12, color: "#aaa", marginTop: 4 }}>{talleresMem.filter(t=>t.estado==="activo").length} talleres activos</div>
              </div>
            )}

            {/* Actividad reciente taller */}
            {role==="taller" && leads.length > 0 && (
              <div style={{ background: "#0f0f0a", border: "1px solid #1a1a12", borderRadius: 16, padding: 20 }}>
                <div style={{ fontSize: 11, color: "#d4af37", fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 14 }}>Oportunidades Recientes</div>
                {leads.slice(0,3).map((lead,i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: i<2?"1px solid #1a1a12":"none", flexWrap: "wrap", gap: 8 }}>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: "#e8e0d0" }}>{lead.observaciones?.split("Nombre:")[1]?.split("|")[0]?.trim() || "Cliente"}</div>
                      <div style={{ fontSize: 11, color: "#555" }}>{(lead.tipo_proyecto||"").toUpperCase()} · {lead.estilo_elegido}</div>
                    </div>
                    <BTN onClick={() => setTabWithHistory("oportunidades")} style={{ fontSize: 11, padding: "6px 12px" }}>Ver →</BTN>
                  </div>
                ))}
              </div>
            )}

            {/* Cómo funciona — cliente */}
            {role==="cliente" && (
              <div style={{ background: "#0f0f0a", border: "1px solid #1a1a12", borderRadius: 16, padding: 20 }}>
                <div style={{ fontSize: 11, color: "#d4af37", fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 }}>Cómo Funciona</div>
                <div style={{ display: "grid", gridTemplateColumns: isMobile?"1fr 1fr":"repeat(4,1fr)", gap: 12 }}>
                  {[["📸","Diseña","Elige tipo y estilo"],["🤖","Visualiza","IA genera el render"],["💰","Estima","Ve rangos de inversión"],["💬","Cotiza","Recibe propuestas reales"]].map(([e,t,d],i) => (
                    <div key={i} style={{ textAlign: "center", padding: 12 }}>
                      <div style={{ fontSize: 28, marginBottom: 8 }}>{e}</div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: "#e8e0d0", marginBottom: 4 }}>{t}</div>
                      <div style={{ fontSize: 11, color: "#555" }}>{d}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── CREAR PROYECTO / FORMULARIO ────────────────────────────────────── */}
        {tab === "formulario" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 10 }}>
              <div>
                <h1 style={{ color: "#d4af37", margin: 0, fontSize: isMobile?20:24 }}>
                  {role==="cliente" ? "Crear Proyecto" : role==="taller" ? "Nuevo Proyecto" : "Constructor de Proyecto"}
                </h1>
                <p style={{ color: "#aaa", margin: "4px 0 0", fontSize: 13 }}>Especificaciones completas del proyecto</p>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                {savedMsg && <div style={{ background: savedMsg.includes("❌")?"#1a0a0a":"#0a2a0a", border: `1px solid ${savedMsg.includes("❌")?"#f4433640":"#4caf5040"}`, color: savedMsg.includes("❌")?"#f44336":"#4caf50", borderRadius: 8, padding: "8px 14px", fontSize: 12 }}>{savedMsg}</div>}
                <BTN onClick={guardarFormulario}>💾 Guardar</BTN>
              </div>
            </div>

            <TIPO_SELECTOR />

            {/* Estimación de inversión para cliente */}
            {role==="cliente" && (form.estilo?.length > 0 || form.material?.length > 0) && (
              <div style={{ background: "linear-gradient(135deg,#1a1208,#0f0f0a)", border: "1px solid #d4af3740", borderRadius: 14, padding: "16px 20px", marginBottom: 20, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
                <div>
                  <div style={{ fontSize: 11, color: "#d4af37", letterSpacing: 2, textTransform: "uppercase", marginBottom: 4 }}>Inversión estimada para tu proyecto</div>
                  <div style={{ fontSize: 11, color: "#555" }}>Basado en proyectos similares en Monterrey 2025 · El precio final lo define el taller</div>
                </div>
                <div style={{ fontSize: 22, fontWeight: 900, color: "#d4af37" }}>
                  ${rangoEstimacion.min.toLocaleString("es-MX")} – ${rangoEstimacion.max.toLocaleString("es-MX")} MXN
                </div>
              </div>
            )}

            {tipoForm === "cocina"  && <FormularioCocina  form={formCocina} setF={(k,v) => setFormCocina(p=>({...p,[k]:v}))}  role={role} isMobile={isMobile} />}
            {tipoForm === "closet"  && <FormularioCloset  form={formCloset} setF={(k,v) => setFormCloset(p=>({...p,[k]:v}))}  role={role} isMobile={isMobile} />}
            {tipoForm === "puerta"  && <FormularioPuerta  form={formPuerta} setF={(k,v) => setFormPuerta(p=>({...p,[k]:v}))}  role={role} isMobile={isMobile} />}
            {tipoForm === "mueble"  && <FormularioMueble  form={formMueble} setF={(k,v) => setFormMueble(p=>({...p,[k]:v}))}  role={role} isMobile={isMobile} />}
            {tipoForm === "bano"    && <FormularioBano    form={formBano}   setF={(k,v) => setFormBano(p=>({...p,[k]:v}))}    role={role} isMobile={isMobile} />}
            {tipoForm === "panel"   && (
              <div className="fade-up">
                <div style={{ background: "#0f0f0a", border: "1px solid #1a1a12", borderRadius: 16, padding: isMobile?16:24, marginBottom: 16 }}>
                  <h3 style={{ color: "#d4af37", margin: "0 0 16px", fontSize: 14, letterSpacing: 1 }}>👤 DATOS DEL CLIENTE</h3>
                  <div style={{ display: "grid", gridTemplateColumns: isMobile?"1fr":"1fr 1fr", gap: 12 }}>
                    <INPUT label="Nombre" value={formPanel.nombre} onChange={e=>setFormPanel(p=>({...p,nombre:e.target.value}))} placeholder="Nombre completo" />
                    <INPUT label="Teléfono" value={formPanel.telefono} onChange={e=>setFormPanel(p=>({...p,telefono:e.target.value}))} placeholder="81-1234-5678" />
                    <INPUT label="Correo" value={formPanel.correo} onChange={e=>setFormPanel(p=>({...p,correo:e.target.value}))} placeholder="correo@email.com" />
                    <INPUT label="Dirección / Obra" value={formPanel.direccion} onChange={e=>setFormPanel(p=>({...p,direccion:e.target.value}))} placeholder="Calle, Colonia, Monterrey" />
                  </div>
                </div>
                <div style={{ background: "#0f0f0a", border: "1px solid #1a1a12", borderRadius: 16, padding: isMobile?16:24, marginBottom: 16 }}>
                  <h3 style={{ color: "#d4af37", margin: "0 0 16px", fontSize: 14, letterSpacing: 1 }}>🪵 ESPECIFICACIONES DEL PANEL</h3>
                  <div style={{ marginBottom: 16 }}>
                    <label style={{ fontSize: 11, color: "#777", display: "block", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>Tipo de panel</label>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      {["MDF liso","MDF ranurado","MDF perforado","Triplay pino","Triplay cedro","Triplay abedul","Lambrín madera","Lambrín PVC","Duela madera","Panel decorativo","Panel enchapado","Otro"].map(op => (
                        <PILL key={op} label={op} checked={formPanel.tipo_panel?.includes(op)} onChange={() => setFormPanel(p=>({...p, tipo_panel: p.tipo_panel?.includes(op)?p.tipo_panel.filter(x=>x!==op):[...(p.tipo_panel||[]),op]}))} />
                      ))}
                    </div>
                  </div>
                  <div style={{ marginBottom: 16 }}>
                    <label style={{ fontSize: 11, color: "#777", display: "block", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>Ubicación</label>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      {["Sala","Comedor","Recámara","Estudio","Pasillo","Baño","Cocina","Exterior","Comercial","Otro"].map(op => (
                        <PILL key={op} label={op} checked={formPanel.ubicacion_panel?.includes(op)} onChange={() => setFormPanel(p=>({...p, ubicacion_panel: p.ubicacion_panel?.includes(op)?p.ubicacion_panel.filter(x=>x!==op):[...(p.ubicacion_panel||[]),op]}))} />
                      ))}
                    </div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: isMobile?"1fr":"1fr 1fr 1fr", gap: 12, marginBottom: 16 }}>
                    <INPUT label="Largo / Ancho (m)" value={formPanel.largo} onChange={e=>setFormPanel(p=>({...p,largo:e.target.value}))} placeholder="2.40 m" />
                    <INPUT label="Alto (m)" value={formPanel.alto} onChange={e=>setFormPanel(p=>({...p,alto:e.target.value}))} placeholder="2.40 m" />
                    <INPUT label="Cantidad de piezas" value={formPanel.cantidad} onChange={e=>setFormPanel(p=>({...p,cantidad:e.target.value}))} placeholder="4" />
                  </div>
                  <div style={{ marginBottom: 16 }}>
                    <label style={{ fontSize: 11, color: "#777", display: "block", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>Grosor</label>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      {["3mm","6mm","9mm","12mm","15mm","18mm","25mm"].map(op => (
                        <PILL key={op} label={op} checked={formPanel.grosor?.includes(op)} onChange={() => setFormPanel(p=>({...p, grosor: p.grosor?.includes(op)?p.grosor.filter(x=>x!==op):[...(p.grosor||[]),op]}))} />
                      ))}
                    </div>
                  </div>
                  <div style={{ marginBottom: 16 }}>
                    <label style={{ fontSize: 11, color: "#777", display: "block", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>Acabado</label>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      {["Natural","Pintado","Lacado mate","Lacado brillante","Enchapado madera","Melamina","Tapiz","Sin acabado"].map(op => (
                        <PILL key={op} label={op} checked={formPanel.acabado_panel?.includes(op)} onChange={() => setFormPanel(p=>({...p, acabado_panel: p.acabado_panel?.includes(op)?p.acabado_panel.filter(x=>x!==op):[...(p.acabado_panel||[]),op]}))} />
                      ))}
                    </div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: isMobile?"1fr":"1fr 1fr", gap: 12, marginBottom: 16 }}>
                    <INPUT label="Color principal" value={formPanel.color_principal} onChange={e=>setFormPanel(p=>({...p,color_principal:e.target.value}))} placeholder="Blanco mate, nogal..." />
                    <INPUT label="Color secundario" value={formPanel.color_secundario} onChange={e=>setFormPanel(p=>({...p,color_secundario:e.target.value}))} placeholder="Opcional" />
                  </div>
                  <div style={{ marginBottom: 16 }}>
                    <label style={{ fontSize: 11, color: "#777", display: "block", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>Patrón / Diseño</label>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      {["Liso","Ranurado horizontal","Ranurado vertical","Perforado","Geométrico","Biselado","Ondulado","Personalizado"].map(op => (
                        <PILL key={op} label={op} checked={formPanel.patron_panel?.includes(op)} onChange={() => setFormPanel(p=>({...p, patron_panel: p.patron_panel?.includes(op)?p.patron_panel.filter(x=>x!==op):[...(p.patron_panel||[]),op]}))} />
                      ))}
                    </div>
                  </div>
                  <TEXTAREA label="Observaciones" value={formPanel.observaciones} onChange={e=>setFormPanel(p=>({...p,observaciones:e.target.value}))} placeholder="Detalles adicionales, referencias de diseño, etc." rows={3} />
                </div>
              </div>
            )}

            <div style={{ marginTop: 28, background: "#0f0f0a", border: "1px solid #1a1a12", borderRadius: 16, padding: 20 }}>
              {savedMsg && <div style={{ background: savedMsg.includes("❌")?"#1a0a0a":"#0a2a0a", border: `1px solid ${savedMsg.includes("❌")?"#f4433640":"#4caf5040"}`, color: savedMsg.includes("❌")?"#f44336":"#4caf50", borderRadius: 8, padding: "10px 14px", fontSize: 13, marginBottom: 14, textAlign: "center" }}>{savedMsg}</div>}
              <div style={{ display:"flex", gap:10, flexWrap:"wrap", marginBottom: 14 }}>
                <BTN onClick={guardarFormulario} style={{ flex:1, minWidth: isMobile?"100%":160, padding:"13px 20px", fontSize:14 }}>💾 Guardar Proyecto</BTN>
                <button onClick={imprimirFormulario} style={{ flex:1, minWidth: isMobile?"100%":160, background:"linear-gradient(135deg,#d4af37,#f0c84a)", color:"#000", border:"none", borderRadius:10, padding:"13px 20px", fontWeight:900, fontSize:13, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:6 }}>🖨️ Imprimir PDF</button>
              </div>
              <ShareMenu onShare={key => compartirFormulario(key)} label="Compartir proyecto" />
            </div>

            {/* Presupuesto inline en formulario */}
            <div style={{ borderTop: "2px solid #d4af3730", marginTop: 32, paddingTop: 32 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                <div style={{ height: 1, flex: 1, background: "#1a1a12" }} />
                <span style={{ fontSize: 11, color: "#d4af37", letterSpacing: 3, textTransform: "uppercase", fontWeight: 700 }}>Presupuesto y Compartir</span>
                <div style={{ height: 1, flex: 1, background: "#1a1a12" }} />
              </div>
              <Presupuesto form={getForm()} setF={setFormField} isMobile={isMobile} tipoProyecto={tipoForm} role={role} generarMateriales={generarMateriales} materiales={materiales} materialesLoading={materialesLoading} materialesMsg={materialesMsg} generarContrato={generarContrato} tallerData={tallerSel} imprimirHoja={imprimirHojaProfesional} setMateriales={setMateriales} setMaterialesMsg={setMaterialesMsg} />
            </div>
          </div>
        )}

        {/* ── MIS PROYECTOS — cliente ─────────────────────────────────────────── */}
        {tab === "mis_proyectos" && role === "cliente" && (
          <div>
            <h1 style={{ color: "#d4af37", margin: "0 0 8px", fontSize: isMobile?20:24 }}>Mis Proyectos</h1>
            <p style={{ color: "#555", margin: "0 0 20px", fontSize: 13 }}>Tu historial de diseños guardados</p>
            {proyectos.length === 0 && (
              <div style={{ background: "#0f0f0a", border: "1px solid #ffffff08", borderRadius: 12, padding: 32, textAlign: "center", color: "#555" }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>📋</div>
                <div style={{ fontSize: 14 }}>No tienes proyectos guardados aún</div>
                <BTN onClick={() => setTabWithHistory("formulario")} style={{ marginTop: 16, fontSize: 13 }}>Crear mi primer proyecto</BTN>
              </div>
            )}
            {proyectos.map((p, i) => {
              const sel = proyectoSel?.created_at === p.created_at;
              const tipoIcon = p.tipo_proyecto==="cocina"?"🍳":p.tipo_proyecto==="closet"?"👔":p.tipo_proyecto==="puerta"?"🚪":p.tipo_proyecto==="bano"?"🚿":p.tipo_proyecto==="panel"?"🪵":"🛋️";
              const est = ESTADOS_PROYECTO.find(e => e.key === (p.estado||"nuevo")) || ESTADOS_PROYECTO[0];
              return (
                <div key={i} onClick={() => setProyectoSel(sel?null:p)}
                  style={{ background: "#0f0f0a", border: `1px solid ${sel?"#d4af37":"#ffffff08"}`, borderRadius: 12, padding: 16, marginBottom: 10, cursor: "pointer" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
                    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                      <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#d4af3720", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{tipoIcon}</div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 15 }}>{p.nombre || "Sin nombre"}</div>
                        <div style={{ fontSize: 12, color: "#aaa" }}>{(p.tipo_proyecto||"cocina").toUpperCase()} · {p.created_at?.split("T")[0]}</div>
                      </div>
                    </div>
                    <span style={{ background: `${est.color}20`, border: `1px solid ${est.color}50`, color: est.color, borderRadius: 20, padding: "3px 10px", fontSize: 11, fontWeight: 700 }}>{est.emoji} {est.label}</span>
                  </div>

                  {/* Barra de progreso del proyecto */}
                  <div style={{ marginTop: 12, display: "flex", gap: 4, alignItems: "center" }}>
                    {[
                      ["Idea", true],
                      ["Render", !!p.render_url],
                      ["Presupuesto", !!(p.precio_fabricacion && parseFloat(p.precio_fabricacion) > 0)],
                      ["Cotizaciones", p.estado === "proceso" || p.estado === "listo" || p.estado === "instalando" || p.estado === "entregado"],
                      ["Contratación", p.estado === "instalando" || p.estado === "entregado"],
                      ["Terminado", p.estado === "entregado"],
                    ].map(([label, done], idx) => (
                      <div key={idx} style={{ flex: 1, textAlign: "center" }}>
                        <div style={{ height: 4, borderRadius: 2, background: done ? "#d4af37" : "#1a1a12", marginBottom: 4, transition: "background .3s" }} />
                        <div style={{ fontSize: 9, color: done ? "#d4af37" : "#333", fontWeight: done ? 700 : 400, whiteSpace: "nowrap" }}>{done ? "✓" : "○"} {isMobile && idx > 2 ? "" : label}</div>
                      </div>
                    ))}
                  </div>

                  {sel && (
                    <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid #ffffff08" }}>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, fontSize: 12, color: "#aaa", marginBottom: 14 }}>
                        {[["Tel",p.telefono],["Correo",p.correo],["Estilo",p.estilo],["Material",p.material],["Tiempo",p.tiempo_entrega]].filter(([,v])=>v).map(([l,v],j) => (
                          <div key={j}><b style={{color:"#d4af37"}}>{l}:</b> {v}</div>
                        ))}
                      </div>
                      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                        <BTN onClick={e => { e.stopPropagation(); cargarProyectoEnFormulario(p); setTabWithHistory("formulario"); }} style={{ fontSize: 12 }}>✏️ Editar</BTN>
                        <BTN onClick={e => { e.stopPropagation(); cargarProyectoEnPresupuesto(p); setTabWithHistory("presupuesto"); }} style={{ fontSize: 12 }} outline color="#d4af37">💰 Presupuesto</BTN>
                        <BTN onClick={async e => {
                          e.stopPropagation();
                          setConfirmModal({ msg: "¿Eliminar este proyecto?", onOk: async () => {
                            await sb(`proyectos?enkaje=eq.${p.enkaje}`, { method: "DELETE", token });
                            cargarProyectos(); setProyectoSel(null);
                          }});
                        }} outline color="#f44336" style={{ fontSize: 12 }}>🗑️ Eliminar</BTN>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* ── INSPIRACIÓN (antes Estilos) ─────────────────────────────────────── */}
        {tab === "estilos" && (
          <div>
            <h1 style={{ color: "#d4af37", margin: "0 0 8px", fontSize: isMobile?20:24 }}>Inspiración</h1>
            <p style={{ color: "#555", margin: "0 0 20px", fontSize: 13 }}>Explora estilos y encuentra el que va contigo</p>
            <div style={{ display: "grid", gridTemplateColumns: isMobile?"1fr 1fr":"repeat(auto-fill,minmax(220px,1fr))", gap: 12 }}>
              {ESTILOS.map(e => {
                const sel = formCocina.estilo.includes(e.label);
                return (
                  <div key={e.key} onClick={() => setFormCocina(p => ({...p, estilo: p.estilo.includes(e.label)?p.estilo.filter(x=>x!==e.label):[...p.estilo,e.label]}))}
                    style={{ background: "#0f0f0a", border: `2px solid ${sel?"#d4af37":"transparent"}`, borderRadius: 14, overflow: "hidden", cursor: "pointer", transition: "all .2s", boxShadow: sel?"0 0 20px #d4af3830":"none" }}>
                    <div style={{ position: "relative", height: isMobile?120:160 }}>
                      <img src={e.img} alt={e.label} style={{ width: "100%", height: "100%", objectFit: "cover", filter: sel?"brightness(1.05)":"brightness(0.65)", transition: "all .3s" }} onError={ev=>{ev.target.style.display="none";ev.target.parentNode.style.background=`linear-gradient(135deg,#1a1208,#2a1f0a)`;}} />
                      {sel && <div style={{ position: "absolute", top: 8, right: 8, background: "#d4af37", color: "#000", borderRadius: "50%", width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 14 }}>✓</div>}
                      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(transparent,rgba(0,0,0,0.65))", padding: "16px 12px 8px" }}>
                        <div style={{ fontWeight: 700, fontSize: isMobile?13:15, color: sel?"#d4af37":"#f0f0f0" }}>{e.label}</div>
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
                <BTN onClick={() => setTabWithHistory("formulario")} style={{ fontSize: 12 }}>Crear proyecto con este estilo →</BTN>
              </div>
            )}
          </div>
        )}

        {/* ── MI CUENTA — cliente ─────────────────────────────────────────────── */}
        {tab === "mi_cuenta" && role === "cliente" && (
          <div>
            <h1 style={{ color: "#d4af37", margin: "0 0 8px", fontSize: isMobile?20:24 }}>Mi Cuenta</h1>
            <p style={{ color: "#555", margin: "0 0 20px", fontSize: 13 }}>Información y preferencias</p>
            <div style={{ background: "#0f0f0a", border: "1px solid #1a1a12", borderRadius: 16, padding: 24, marginBottom: 16 }}>
              <div style={{ fontSize: 11, color: "#d4af37", fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 }}>👤 Información Personal</div>
              <div style={{ display: "grid", gridTemplateColumns: isMobile?"1fr":"1fr 1fr", gap: 12 }}>
                <div><div style={{ fontSize: 11, color: "#555", marginBottom: 4 }}>NOMBRE</div><div style={{ fontSize: 14, color: "#e8e0d0", fontWeight: 600 }}>{nombreUsuario}</div></div>
                <div><div style={{ fontSize: 11, color: "#555", marginBottom: 4 }}>CORREO</div><div style={{ fontSize: 14, color: "#e8e0d0", fontWeight: 600 }}>{user?.email}</div></div>
              </div>
            </div>
            <div style={{ background: "#0f0f0a", border: "1px solid #1a1a12", borderRadius: 16, padding: 24, marginBottom: 16 }}>
              <div style={{ fontSize: 11, color: "#d4af37", fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 }}>📊 Mis Proyectos</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {[["Total",proyectos.length,"#d4af37"],["Nuevos",proyectos.filter(p=>p.estado==="nuevo").length,"#00bcd4"]].map(([l,v,c],i) => (
                  <div key={i} style={{ background: "#0a0a08", borderRadius: 10, padding: 14, textAlign: "center" }}>
                    <div style={{ fontSize: 24, fontWeight: 900, color: c }}>{v}</div>
                    <div style={{ fontSize: 11, color: "#555", marginTop: 4 }}>{l}</div>
                  </div>
                ))}
              </div>
              <BTN onClick={() => setTabWithHistory("mis_proyectos")} style={{ marginTop: 14, width: "100%", fontSize: 13 }}>Ver mis proyectos →</BTN>
            </div>
            <div style={{ background: "#0f0f0a", border: "1px solid #1a1a12", borderRadius: 16, padding: 24 }}>
              <div style={{ fontSize: 11, color: "#d4af37", fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 }}>❓ Ayuda</div>
              <div style={{ fontSize: 13, color: "#aaa", lineHeight: 1.7, marginBottom: 12 }}>¿Tienes dudas sobre tu proyecto o cotizaciones?</div>
              <a href="https://wa.me/528127176786" target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#25D366", color: "#fff", borderRadius: 10, padding: "10px 18px", fontWeight: 700, fontSize: 13, textDecoration: "none" }}>💬 Hablar con soporte</a>
            </div>
          </div>
        )}

        {/* ── PRESUPUESTO / COTIZACIONES ──────────────────────────────────────── */}
        {tab === "presupuesto" && (
          <div>
            <h1 style={{ color: "#d4af37", margin: "0 0 8px", fontSize: isMobile?20:24 }}>
              {role==="taller" ? "Cotizaciones" : role==="admin" ? "Presupuestos" : "Presupuesto"}
            </h1>
            <p style={{ color: "#555", margin: "0 0 20px", fontSize: 13 }}>
              {role==="admin" ? "Motor de análisis de mercado — rangos y promedios por tipo y zona" : "Genera y comparte cotizaciones profesionales"}
            </p>
            <TIPO_SELECTOR />
            <Presupuesto form={getForm()} setF={setFormField} isMobile={isMobile} tipoProyecto={tipoForm} role={role} generarMateriales={generarMateriales} materiales={materiales} materialesLoading={materialesLoading} materialesMsg={materialesMsg} generarContrato={generarContrato} tallerData={tallerSel} imprimirHoja={imprimirHojaProfesional} setMateriales={setMateriales} setMaterialesMsg={setMaterialesMsg} />
          </div>
        )}

        {/* ── PROYECTOS ADMIN ─────────────────────────────────────────────────── */}
        {tab === "proyectos" && role === "admin" && (
          <div>
            <h1 style={{ color: "#d4af37", margin: "0 0 20px", fontSize: isMobile?20:26 }}>Todos los Proyectos</h1>
            {proyectos.length === 0 && <div style={{ color: "#555", fontSize: 14, padding: 20 }}>No hay proyectos aún</div>}
            {proyectos.map((p,i) => {
              const sel = proyectoSel?.created_at === p.created_at;
              return (
                <div key={i} onClick={() => setProyectoSel(sel?null:p)}
                  style={{ background: "#0f0f0a", border: `1px solid ${sel?"#d4af37":"#ffffff08"}`, borderRadius: 12, padding: 16, marginBottom: 10, cursor: "pointer" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 15 }}>{p.nombre || p.user_email}</div>
                      <div style={{ fontSize: 12, color: "#aaa" }}>{(p.tipo_proyecto||"cocina").toUpperCase()} · {p.created_at?.split("T")[0]}</div>
                    </div>
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <span style={{ fontSize: 11, color: "#00bcd4", fontWeight: 700, textTransform: "uppercase" }}>{p.estado}</span>
                      <span style={{ background: "#d4af3720", color: "#d4af37", borderRadius: 20, padding: "2px 8px", fontSize: 11, fontWeight: 700 }}>{p.tipo_proyecto||"cocina"}</span>
                    </div>
                  </div>
                  {sel && (
                    <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid #ffffff08" }}>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, fontSize: 12, color: "#aaa", marginBottom: 12 }}>
                        {[["Tel",p.telefono],["Email",p.correo],["Material",Array.isArray(p.material)?p.material.join(", "):p.material],["Nivel",p.nivel_calidad]].filter(([,v])=>v).map(([l,v],j) => (
                          <div key={j}><b style={{color:"#d4af37"}}>{l}:</b> {v}</div>
                        ))}
                      </div>
                      <div style={{ marginBottom: 10 }}>
                        <div style={{ fontSize: 11, color: "#aaa", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>Estado</div>
                        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                          {ESTADOS_PROYECTO.map(est => (
                            <button key={est.key}
                              onClick={async e => { e.stopPropagation(); await sb(`proyectos?enkaje=eq.${p.enkaje}`, {method:"PATCH", token, body:JSON.stringify({estado:est.key})}); cargarProyectos(); }}
                              style={{ padding:"5px 10px", borderRadius:20, border:`1px solid ${(p.estado||"nuevo")===est.key?est.color:"#333"}`, background:(p.estado||"nuevo")===est.key?`${est.color}25`:"transparent", color:(p.estado||"nuevo")===est.key?est.color:"#666", fontSize:11, cursor:"pointer", fontWeight:(p.estado||"nuevo")===est.key?700:400, whiteSpace:"nowrap" }}>
                              {est.emoji} {est.label}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                        <BTN onClick={e => { e.stopPropagation(); cargarProyectoEnFormulario(p); setTabWithHistory("formulario"); }} style={{ fontSize: 12 }}>📋 Editar</BTN>
                        <BTN onClick={e => { e.stopPropagation(); cargarProyectoEnPresupuesto(p); setTabWithHistory("presupuesto"); }} outline color="#d4af37" style={{ fontSize: 12 }}>💰 Presupuesto</BTN>
                        <BTN onClick={e => { e.stopPropagation(); cargarProyectoEnPresupuesto(p); generarContrato(tallerSel); }} outline color="#4caf50" style={{ fontSize: 12 }}>📄 Contrato</BTN>
                        <BTN onClick={async e => { e.stopPropagation(); setConfirmModal({ msg: "¿Eliminar este proyecto?", onOk: async () => { await sb(`proyectos?enkaje=eq.${p.enkaje}`, {method:"DELETE", token}); cargarProyectos(); }});}} outline color="#f44336" style={{ fontSize: 12 }}>🗑️</BTN>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* ── OPORTUNIDADES (admin + taller) ─────────────────────────────────── */}
        {tab === "oportunidades" && (role === "taller" || role === "admin") && (
          <div>
            <h1 style={{ color: "#d4af37", margin: "0 0 8px", fontSize: isMobile?20:26 }}>Oportunidades</h1>
            <p style={{ color: "#555", margin: "0 0 20px", fontSize: 13 }}>Clientes que diseñaron su proyecto con IA y solicitan cotización</p>
            {leads.length === 0 && (
              <div style={{ background: "#0f0f0a", border: "1px solid #1a1a12", borderRadius: 12, padding: 32, textAlign: "center", color: "#555" }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>📭</div>
                <div style={{ fontSize: 14 }}>No hay oportunidades aún</div>
                <div style={{ fontSize: 12, color: "#333", marginTop: 8 }}>Cuando un cliente use el portal aparecerá aquí</div>
              </div>
            )}
            {leads.map((lead, i) => {
              const sel = leadSel?.id === lead.id;
              const scoreColor = lead.score >= 80 ? "#d4af37" : lead.score >= 55 ? "#4caf50" : lead.score >= 30 ? "#f0a500" : "#666";
              const scoreEmoji = lead.score >= 80 ? "⭐" : lead.score >= 55 ? "🟢" : lead.score >= 30 ? "🟡" : "🔴";
              const labelTexto = lead.score >= 80 ? "Prioritario" : lead.score >= 55 ? "Listo" : lead.score >= 30 ? "Evaluando" : "Explorando";
              return (
                <div key={lead.id || i} onClick={() => setLeadSel(sel ? null : lead)}
                  style={{ background: "#0f0f0a", border: `1px solid ${sel ? scoreColor : "#1a1a12"}`, borderRadius: 14, padding: 16, marginBottom: 10, cursor: "pointer", transition: "all .2s" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
                    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                      <div style={{ width: 44, height: 44, borderRadius: 10, background: "#1a1a12", overflow: "hidden", flexShrink: 0 }}>
                        {lead.render_url
                          ? <img src={lead.render_url} alt="render" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                          : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🏠</div>}
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 14, color: "#e8e0d0" }}>
                          {lead.observaciones?.split("Nombre:")[1]?.split("|")[0]?.trim() || "Cliente anónimo"}
                        </div>
                        <div style={{ fontSize: 12, color: "#555" }}>
                          {(lead.tipo_proyecto||"").toUpperCase()} · {lead.estilo_elegido} · {lead.created_at?.split("T")[0]}
                        </div>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <div style={{ background: `${scoreColor}20`, border: `1px solid ${scoreColor}50`, borderRadius: 20, padding: "4px 12px", fontSize: 11, fontWeight: 700, color: scoreColor }}>
                        {scoreEmoji} {labelTexto}
                      </div>
                      <div style={{ background: "#1a1a12", borderRadius: 20, padding: "4px 12px", fontSize: 13, fontWeight: 900, color: scoreColor }}>
                        {lead.score}/100
                      </div>
                    </div>
                  </div>
                  {sel && (
                    <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid #1a1a12" }}>
                      {lead.render_url && (
                        <div style={{ borderRadius: 10, overflow: "hidden", marginBottom: 14, position: "relative" }}>
                          <img src={lead.render_url} alt="Render IA" style={{ width: "100%", maxHeight: 400, objectFit: "cover" }} />
                          <div style={{ position: "absolute", top: 8, left: 8, background: "#0a0a08cc", borderRadius: 8, padding: "4px 10px", fontSize: 11, color: "#d4af37", fontWeight: 700 }}>🤖 Render IA</div>
                        </div>
                      )}
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 14 }}>
                        {[
                          ["Proyecto", lead.tipo_proyecto],
                          ["Estilo", lead.estilo_elegido],
                          ["Decisión", lead.nivel_decision],
                          ["Fecha deseada", lead.fecha_inicio_deseada],
                          ["Inversión est.", `$${(lead.rango_inversion_min||0).toLocaleString("es-MX")} – $${(lead.rango_inversion_max||0).toLocaleString("es-MX")}`],
                          ["Medidas", lead.medidas || "No especificadas"],
                        ].filter(([,v]) => v).map(([l,v], j) => (
                          <div key={j} style={{ background: "#0a0a08", borderRadius: 8, padding: "8px 10px" }}>
                            <div style={{ fontSize: 9, color: "#444", textTransform: "uppercase", letterSpacing: 1, marginBottom: 3 }}>{l}</div>
                            <div style={{ fontSize: 12, color: "#e8e0d0", fontWeight: 600, textTransform: "capitalize" }}>{v}</div>
                          </div>
                        ))}
                      </div>
                      {lead.observaciones && (
                        <div style={{ background: "#0a0a08", borderRadius: 8, padding: 10, marginBottom: 14, fontSize: 12, color: "#888" }}>
                          {lead.observaciones.split("|").map((l,i) => <div key={i}>{l.trim()}</div>)}
                        </div>
                      )}
                      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
                        {lead.observaciones?.includes("Tel:") && (
                          <button onClick={e => {
                            e.stopPropagation();
                            const tel = lead.observaciones.split("Tel:")[1]?.split("|")[0]?.trim()?.replace(/\D/g,"");
                            const msg = `Hola! Te contacto de EnKaje Pro por tu proyecto de ${lead.tipo_proyecto} estilo ${lead.estilo_elegido}. ¿Cuándo podemos hablar para darte una cotización?`;
                            window.open(`https://wa.me/52${tel}?text=${encodeURIComponent(msg)}`, "_blank");
                          }} style={{ background: "#25D366", color: "#fff", border: "none", borderRadius: 10, padding: "9px 16px", fontWeight: 700, fontSize: 12, cursor: "pointer" }}>
                            💬 WhatsApp
                          </button>
                        )}
                        <button onClick={e => { e.stopPropagation(); cargarProyectoEnFormulario({...lead, nombre: lead.observaciones?.split("Nombre:")[1]?.split("|")[0]?.trim()}); setTabWithHistory("formulario"); }}
                          style={{ background: "transparent", color: "#d4af37", border: "1.5px solid #d4af37", borderRadius: 10, padding: "9px 16px", fontWeight: 700, fontSize: 12, cursor: "pointer" }}>
                          📋 Abrir en formulario
                        </button>
                        <button onClick={async e => {
                          e.stopPropagation();
                          setConfirmModal({ msg: `¿Eliminar esta oportunidad?`, onOk: async () => {
                            await sb(`expedientes?id=eq.${lead.id}`, { method: "DELETE", token });
                            cargarLeads(); setLeadSel(null);
                          }});
                        }} style={{ background: "transparent", color: "#f44336", border: "1.5px solid #f44336", borderRadius: 10, padding: "9px 14px", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>
                          🗑️
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* ── PROYECTOS TALLER ────────────────────────────────────────────────── */}
        {tab === "leads" && role === "taller" && (
          <div>
            <h1 style={{ color: "#d4af37", margin: "0 0 20px", fontSize: isMobile?20:26 }}>Mis Proyectos</h1>
            {proyectos.length === 0 && <div style={{ color: "#555", fontSize: 14, padding: 20 }}>No hay proyectos aún</div>}
            {proyectos.map((p,i) => {
              const sel = proyectoSel?.created_at === p.created_at;
              return (
                <div key={i} onClick={() => setProyectoSel(sel?null:p)}
                  style={{ background: "#0f0f0a", border: `1px solid ${sel?"#d4af37":"#ffffff08"}`, borderRadius: 12, padding: 16, marginBottom: 10, cursor: "pointer" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                    <div>
                      <div style={{ fontWeight: 700 }}>Proyecto #{i+1} · {(p.tipo_proyecto||"cocina").toUpperCase()}</div>
                      <div style={{ fontSize: 12, color: "#aaa" }}>{Array.isArray(p.estilo)?p.estilo.join(", "):""} · {p.created_at?.split("T")[0]}</div>
                    </div>
                    <div style={{ fontSize: 11, color: "#00bcd4", fontWeight: 700 }}>{p.nivel_calidad||"---"}</div>
                  </div>
                  {sel && (
                    <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid #ffffff08" }}>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, fontSize: 12, color: "#aaa", marginBottom: 12 }}>
                        {[["Tipo",p.tipo_proyecto],["Estilo",Array.isArray(p.estilo)?p.estilo.join(", "):p.estilo],["Material",Array.isArray(p.material)?p.material.join(", "):p.material],["Nivel",p.nivel_calidad]].filter(([,v])=>v).map(([l,v],j) => (
                          <div key={j}><b style={{color:"#d4af37"}}>{l}:</b> {v}</div>
                        ))}
                      </div>
                      <div style={{ marginBottom: 12 }}>
                        <div style={{ fontSize: 11, color: "#aaa", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>Estado</div>
                        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                          {ESTADOS_PROYECTO.map(est => (
                            <button key={est.key}
                              onClick={async e => {
                                e.stopPropagation();
                                await sb(`proyectos?enkaje=eq.${p.enkaje}`, { method: "PATCH", token, body: JSON.stringify({ estado: est.key }) });
                                cargarProyectos();
                                if (p.telefono) {
                                  const tel = p.telefono.replace(/\D/g,"");
                                  const msg = `${est.emoji} *EnKaje Pro — Actualización*\n\nHola ${p.nombre||""}! Tu proyecto ha cambiado a: *${est.label.toUpperCase()}*\n\nenkajepro.com`;
                                  window.open(`https://wa.me/52${tel}?text=${encodeURIComponent(msg)}`, "_blank");
                                }
                              }}
                              style={{ padding: "6px 12px", borderRadius: 20, border: `1px solid ${(p.estado||"nuevo")===est.key ? est.color : "#333"}`, background: (p.estado||"nuevo")===est.key ? `${est.color}25` : "transparent", color: (p.estado||"nuevo")===est.key ? est.color : "#666", fontSize: 11, cursor: "pointer", fontWeight: (p.estado||"nuevo")===est.key ? 700 : 400, whiteSpace: "nowrap" }}>
                              {est.emoji} {est.label}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginTop:8 }}>
                        <BTN onClick={e => { e.stopPropagation(); cargarProyectoEnFormulario(p); setTabWithHistory("formulario"); }} style={{ fontSize: 12 }}>📋 Editar</BTN>
                        <BTN onClick={e => { e.stopPropagation(); cargarProyectoEnPresupuesto(p); setTabWithHistory("presupuesto"); }} outline color="#d4af37" style={{ fontSize: 12 }}>💰 Cotizar</BTN>
                        <BTN onClick={e => { e.stopPropagation(); cargarProyectoEnPresupuesto(p); generarContrato(tallerSel); }} outline color="#4caf50" style={{ fontSize: 12 }}>📄 Contrato</BTN>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* ── PORTAFOLIO — taller ─────────────────────────────────────────────── */}
        {tab === "portafolio" && role === "taller" && (
          <div>
            <h1 style={{ color: "#d4af37", margin: "0 0 8px", fontSize: isMobile?20:24 }}>Portafolio</h1>
            <p style={{ color: "#555", margin: "0 0 20px", fontSize: 13 }}>Tu trabajo habla por ti — sube tus mejores proyectos</p>
            <div style={{ background: "#0f0f0a", border: "1px solid #d4af3730", borderRadius: 16, padding: 24, textAlign: "center" }}>
              <div style={{ fontSize: 40, marginBottom: 16 }}>📸</div>
              <h3 style={{ color: "#e8e0d0", marginBottom: 8, fontSize: 16 }}>Portafolio de proyectos</h3>
              <p style={{ color: "#555", fontSize: 13, marginBottom: 20, lineHeight: 1.7 }}>
                Comparte fotos de tus cocinas, closets, puertas y muebles terminados. Los clientes los verán en tu perfil público.
              </p>
              <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
                {["🍳 Cocinas","👔 Closets","📺 Centros TV","🚿 Baños"].map((cat,i) => (
                  <span key={i} style={{ background: "#1a1208", border: "1px solid #d4af3730", color: "#d4af37", borderRadius: 20, padding: "6px 16px", fontSize: 13 }}>{cat}</span>
                ))}
              </div>
              <div style={{ marginTop: 20, background: "#1a1208", border: "1px dashed #d4af3740", borderRadius: 12, padding: 20, fontSize: 13, color: "#555" }}>
                📷 La función de subida de fotos estará disponible próximamente.<br/>
                Por ahora comparte tus fotos por WhatsApp y las subimos por ti.
              </div>
              <a href="https://wa.me/528127176786?text=Hola%20Felipe%2C%20quiero%20subir%20fotos%20a%20mi%20portafolio%20de%20EnKaje%20Pro" target="_blank" rel="noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: 16, background: "#25D366", color: "#fff", borderRadius: 10, padding: "10px 20px", fontWeight: 700, fontSize: 13, textDecoration: "none" }}>
                💬 Enviar fotos por WhatsApp
              </a>
            </div>
          </div>
        )}

        {/* ── PERFIL TALLER ───────────────────────────────────────────────────── */}
        {tab === "perfil_taller" && role === "taller" && (() => {
          const miTaller = talleresMem.find(t => t.email === user?.email);
          if (!miTaller) return <div style={{ color: "#555", padding: 20 }}>Cargando perfil...</div>;
          return (
            <div>
              <h1 style={{ color: "#d4af37", margin: "0 0 8px", fontSize: isMobile?20:24 }}>Mi Perfil</h1>
              <p style={{ color: "#555", margin: "0 0 20px", fontSize: 13 }}>Información pública de tu taller en EnKaje Pro</p>
              <div style={{ background: "#0f0f0a", border: "1px solid #1a1a12", borderRadius: 16, padding: 24, marginBottom: 16 }}>
                <div style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 20 }}>
                  <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#d4af3720", border: "2px solid #d4af37", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, overflow: "hidden" }}>
                    {miTaller.logo_url ? <img src={miTaller.logo_url} alt={miTaller.nombre} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : "🏭"}
                  </div>
                  <div>
                    <div style={{ fontSize: 18, fontWeight: 900, color: "#e8e0d0" }}>{miTaller.nombre}</div>
                    <div style={{ fontSize: 13, color: "#aaa" }}>{miTaller.especialidad}</div>
                    {miTaller.slug && <a href={`https://enkajepro.com/taller/${miTaller.slug}`} target="_blank" rel="noreferrer" style={{ fontSize: 11, color: "#d4af37", textDecoration: "underline" }}>enkajepro.com/taller/{miTaller.slug}</a>}
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: isMobile?"1fr":"1fr 1fr", gap: 10 }}>
                  {[["📍 Zona",miTaller.zona],["🏙️ Municipio",miTaller.municipio],["📞 Teléfono",miTaller.telefono],["📧 Email",miTaller.email],["⏱️ Horario",miTaller.horario],["🏆 Experiencia",miTaller.anos_experiencia ? `${miTaller.anos_experiencia} años` : null]].filter(([,v])=>v).map(([l,v],i) => (
                    <div key={i} style={{ background: "#0a0a08", borderRadius: 10, padding: "10px 14px" }}>
                      <div style={{ fontSize: 12, color: "#aaa" }}>{l}: <b style={{ color: "#e8e0d0" }}>{v}</b></div>
                    </div>
                  ))}
                </div>
              </div>
              {(miTaller.facebook || miTaller.instagram || miTaller.tiktok) && (
                <div style={{ background: "#0f0f0a", border: "1px solid #1a1a12", borderRadius: 16, padding: 20, marginBottom: 16 }}>
                  <div style={{ fontSize: 11, color: "#d4af37", fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 14 }}>Redes Sociales</div>
                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                    {miTaller.facebook && <a href={miTaller.facebook} target="_blank" rel="noreferrer" style={{ background: "#1877F220", border: "1px solid #1877F240", color: "#1877F2", borderRadius: 10, padding: "8px 14px", fontWeight: 700, fontSize: 13, textDecoration: "none" }}>📘 Facebook</a>}
                    {miTaller.instagram && <a href={`https://instagram.com/${miTaller.instagram.replace("@","")}`} target="_blank" rel="noreferrer" style={{ background: "#E1306C20", border: "1px solid #E1306C40", color: "#E1306C", borderRadius: 10, padding: "8px 14px", fontWeight: 700, fontSize: 13, textDecoration: "none" }}>📸 {miTaller.instagram}</a>}
                    {miTaller.tiktok && <a href={`https://tiktok.com/@${miTaller.tiktok.replace("@","")}`} target="_blank" rel="noreferrer" style={{ background: "#ee1d5220", border: "1px solid #ee1d5240", color: "#ee1d52", borderRadius: 10, padding: "8px 14px", fontWeight: 700, fontSize: 13, textDecoration: "none" }}>🎵 {miTaller.tiktok}</a>}
                  </div>
                </div>
              )}
              {miTaller.slug && (
                <div style={{ background: "#1a1208", border: "1px solid #d4af3730", borderRadius: 12, padding: 16, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
                  <div>
                    <div style={{ fontSize: 12, color: "#d4af37", fontWeight: 700, marginBottom: 4 }}>Tu link único</div>
                    <div style={{ fontSize: 13, color: "#aaa" }}>enkajepro.com/taller/{miTaller.slug}</div>
                  </div>
                  <BTN onClick={() => { navigator.clipboard.writeText(`https://enkajepro.com/taller/${miTaller.slug}`); alert("Link copiado"); }} style={{ fontSize: 12 }}>🔗 Copiar link</BTN>
                </div>
              )}
              <div style={{ marginTop: 16, background: "#0a0a08", border: "1px dashed #333", borderRadius: 12, padding: 16, fontSize: 13, color: "#555", textAlign: "center" }}>
                Para editar tu perfil, escríbenos a <span style={{ color: "#d4af37" }}>hola@enkajepro.com</span> o por WhatsApp
              </div>
            </div>
          );
        })()}

        {/* ── PLAN TALLER ─────────────────────────────────────────────────────── */}
        {tab === "plan_taller" && role === "taller" && (() => {
          const miTaller = talleresMem.find(t => t.email === user?.email);
          const planColor = miTaller?.plan === "premium" ? "#d4af37" : miTaller?.plan === "pro" ? "#00bcd4" : "#888";
          const planNombre = miTaller?.plan === "premium" ? "Elite" : miTaller?.plan === "pro" ? "Profesional" : "Básico";
          const planPrecio = miTaller?.plan === "premium" ? "2,999" : miTaller?.plan === "pro" ? "1,499" : "699";
          return (
            <div>
              <h1 style={{ color: "#d4af37", margin: "0 0 8px", fontSize: isMobile?20:24 }}>Mi Plan</h1>
              <p style={{ color: "#555", margin: "0 0 20px", fontSize: 13 }}>Tu membresía y estadísticas de uso</p>
              <div style={{ background: "linear-gradient(135deg,#1a1208,#0f0f0a)", border: `1px solid ${planColor}50`, borderRadius: 20, padding: 24, marginBottom: 20 }}>
                <div style={{ fontSize: 11, color: planColor, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>PLAN ACTUAL</div>
                <div style={{ fontSize: 32, fontWeight: 900, color: planColor, marginBottom: 4 }}>Plan {planNombre}</div>
                <div style={{ fontSize: 16, color: "#aaa" }}>${planPrecio} MXN/mes</div>
              </div>
              <div style={{ background: "#0f0f0a", border: "1px solid #1a1a12", borderRadius: 16, padding: 20, marginBottom: 16 }}>
                <div style={{ fontSize: 11, color: "#d4af37", fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 14 }}>Estadísticas del mes</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                  {[["Oportunidades",miTaller?.leads_recibidos||0,"#d4af37"],["Proyectos cerrados",miTaller?.proyectos_cerrados||0,"#4caf50"],["Visitas al perfil",miTaller?.visitas||0,"#00bcd4"]].map(([l,v,c],i) => (
                    <div key={i} style={{ background: "#0a0a08", borderRadius: 10, padding: 14, textAlign: "center" }}>
                      <div style={{ fontSize: 24, fontWeight: 900, color: c }}>{v}</div>
                      <div style={{ fontSize: 10, color: "#555", marginTop: 4, textTransform: "uppercase", letterSpacing: 1 }}>{l}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ background: "#0f0f0a", border: "1px solid #1a1a12", borderRadius: 16, padding: 20 }}>
                <div style={{ fontSize: 11, color: "#d4af37", fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 14 }}>Mejorar Plan</div>
                <div style={{ display: "grid", gridTemplateColumns: isMobile?"1fr":"1fr 1fr", gap: 12 }}>
                  {[
                    { nombre:"Profesional", precio:"1,499", color:"#00bcd4", features:["Leads ilimitados","Perfil destacado","Insignia verificada","Hasta 50 fotos","Estadísticas avanzadas"] },
                    { nombre:"Elite", precio:"2,999", color:"#d4af37", features:["Todo Profesional","Exclusividad de zona","Leads prioritarios","IA sugiere respuesta","Soporte 24/7"] },
                  ].map((plan,i) => (
                    <div key={i} style={{ background: "#0a0a08", border: `1px solid ${plan.color}40`, borderRadius: 14, padding: 20 }}>
                      <div style={{ fontSize: 13, color: plan.color, fontWeight: 700, marginBottom: 4 }}>Plan {plan.nombre}</div>
                      <div style={{ fontSize: 22, fontWeight: 900, color: plan.color, marginBottom: 12 }}>${plan.precio}/mes</div>
                      {plan.features.map((f,j) => <div key={j} style={{ fontSize: 12, color: "#aaa", marginBottom: 6 }}>✓ {f}</div>)}
                      <a href="https://wa.me/528127176786?text=Hola%20Felipe%2C%20quiero%20mejorar%20mi%20plan%20en%20EnKaje%20Pro" target="_blank" rel="noreferrer"
                        style={{ display: "block", marginTop: 14, background: plan.color, color: "#000", borderRadius: 10, padding: "10px", fontWeight: 700, fontSize: 13, textDecoration: "none", textAlign: "center" }}>
                        Mejorar a {plan.nombre}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })()}

        {/* ── TALLERES ADMIN ──────────────────────────────────────────────────── */}
        {tab === "talleres" && role === "admin" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 10 }}>
              <div>
                <h1 style={{ color: "#d4af37", margin: 0, fontSize: isMobile?20:26 }}>Talleres</h1>
                <p style={{ color: "#aaa", margin: "4px 0 0", fontSize: 13 }}>Gestiona membresías, planes y zonas</p>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                {tallerMsg && <div style={{ background: tallerMsg.includes("Error")?"#1a0a0a":"#0a2a0a", border: `1px solid ${tallerMsg.includes("Error")?"#f4433640":"#4caf5040"}`, color: tallerMsg.includes("Error")?"#f44336":"#4caf50", borderRadius: 8, padding: "8px 14px", fontSize: 12 }}>{tallerMsg}</div>}
                <BTN onClick={() => setShowNuevoTaller(true)}>+ Agregar Taller</BTN>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: isMobile?"1fr 1fr":"repeat(4,1fr)", gap: 12, marginBottom: 20 }}>
              {[["Total",talleresMem.length,"#d4af37"],["Básico",talleresMem.filter(t=>t.plan==="basico").length,"#888"],["Profesional",talleresMem.filter(t=>t.plan==="pro").length,"#00bcd4"],["Elite",talleresMem.filter(t=>t.plan==="premium").length,"#d4af37"]].map(([l,v,c],i) => (
                <div key={i} style={{ background: "#0f0f0a", border: `1px solid ${c}25`, borderRadius: 12, padding: isMobile?14:18 }}>
                  <div style={{ fontSize: 9, color: "#444", letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>{l}</div>
                  <div style={{ fontSize: isMobile?26:32, fontWeight: 900, color: c }}>{v}</div>
                </div>
              ))}
            </div>
            <div style={{ background: "#1a1208", border: "1px solid #d4af3730", borderRadius: 12, padding: 16, marginBottom: 20 }}>
              <div style={{ fontSize: 11, color: "#555", letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>Ingresos Mensuales Estimados</div>
              <div style={{ fontSize: 28, fontWeight: 900, color: "#d4af37" }}>
                ${(talleresMem.filter(t=>t.plan==="basico"&&t.estado==="activo").length*699 + talleresMem.filter(t=>t.plan==="pro"&&t.estado==="activo").length*1499 + talleresMem.filter(t=>t.plan==="premium"&&t.estado==="activo").length*2999).toLocaleString("es-MX")} MXN
              </div>
            </div>
            {talleresMem.length === 0 && (
              <div style={{ background: "#0f0f0a", border: "1px solid #ffffff08", borderRadius: 12, padding: 32, textAlign: "center", color: "#555" }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>🏭</div>
                <div style={{ fontSize: 14 }}>No hay talleres registrados aún</div>
              </div>
            )}
            {talleresMem.map((t,i) => {
              const planColor = t.plan === "premium" ? "#d4af37" : t.plan === "pro" ? "#00bcd4" : "#888";
              const planNombreUI = t.plan === "premium" ? "Elite" : t.plan === "pro" ? "Profesional" : "Básico";
              const estadoColor = t.estado === "activo" ? "#4caf50" : "#f44336";
              const sel = tallerSel?.id === t.id;
              return (
                <div key={t.id||i} onClick={() => setTallerSel(sel?null:t)}
                  style={{ background: "#0f0f0a", border: `1px solid ${sel?planColor:"#ffffff08"}`, borderRadius: 12, padding: 16, marginBottom: 10, cursor: "pointer" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
                    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                      <div style={{ width: 44, height: 44, borderRadius: "50%", background: `${planColor}20`, border: `1px solid ${planColor}40`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0, overflow: "hidden" }}>
                        {t.logo_url ? <img src={t.logo_url} alt={t.nombre} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }} onError={e=>{e.target.style.display="none";}} /> : "🏭"}
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 15 }}>{t.nombre}</div>
                        <div style={{ fontSize: 12, color: "#aaa" }}>{t.especialidad} · {t.municipio||t.zona}</div>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                      <span style={{ background: `${planColor}20`, border: `1px solid ${planColor}`, color: planColor, borderRadius: 20, padding: "3px 12px", fontSize: 11, fontWeight: 700 }}>{planNombreUI}</span>
                      <span style={{ background: `${estadoColor}15`, border: `1px solid ${estadoColor}40`, color: estadoColor, borderRadius: 20, padding: "3px 12px", fontSize: 11, fontWeight: 700 }}>{t.estado}</span>
                    </div>
                  </div>
                  {sel && (
                    <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid #ffffff08" }}>
                      <div style={{ display: "grid", gridTemplateColumns: isMobile?"1fr 1fr":"repeat(3,1fr)", gap: 10, marginBottom: 16, fontSize: 12, color: "#aaa" }}>
                        {[["Email",t.email],["Tel",t.telefono],["Especialidad",t.especialidad],["Zona",t.zona],["Municipio",t.municipio],["Vencimiento",t.fecha_vencimiento],["Leads",t.leads_recibidos],["Cierres",t.proyectos_cerrados],["Visitas",t.visitas]].filter(([,v])=>v!=null&&v!=="").map(([l,v],j) => (
                          <div key={j}><b style={{color:"#d4af37"}}>{l}:</b> {v}</div>
                        ))}
                        {t.slug && (
                          <div style={{ gridColumn: "1/-1", marginTop: 4 }}>
                            <b style={{color:"#d4af37"}}>Link público:</b>{" "}
                            <a href={`https://enkajepro.com/taller/${t.slug}`} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()} style={{ color: "#d4af37", fontSize: 12, textDecoration: "underline" }}>
                              enkajepro.com/taller/{t.slug}
                            </a>
                          </div>
                        )}
                      </div>

                      {/* Editar info básica */}
                      <div onClick={e => e.stopPropagation()} style={{ background: "#0a0a08", border: "1px solid #1a1a12", borderRadius: 10, padding: 14, marginBottom: 14 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                          <div style={{ fontSize: 11, color: "#d4af37", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" }}>📋 Información</div>
                          <button onClick={e => { e.stopPropagation(); setEditInfo(editInfo && editInfo.id===t.id ? null : {...t}); }}
                            style={{ background: "transparent", border: "1px solid #d4af3740", color: "#d4af37", borderRadius: 6, padding: "4px 10px", fontSize: 11, cursor: "pointer" }}>
                            {editInfo && editInfo.id===t.id ? "Cancelar" : "✏️ Editar"}
                          </button>
                        </div>
                        {editInfo && editInfo.id === t.id ? (
                          <div>
                            <div style={{ display: "grid", gridTemplateColumns: isMobile?"1fr":"1fr 1fr", gap: 10, marginBottom: 10 }}>
                              <INPUT label="Nombre" value={editInfo?.nombre||""} onChange={e=>setEditInfo(p=>({...p,nombre:e.target.value}))} placeholder="Nombre del taller" />
                              <INPUT label="Email" value={editInfo?.email||""} onChange={e=>setEditInfo(p=>({...p,email:e.target.value}))} placeholder="email@taller.com" />
                              <INPUT label="Teléfono" value={editInfo?.telefono||""} onChange={e=>setEditInfo(p=>({...p,telefono:e.target.value}))} placeholder="81-1234-5678" />
                              <INPUT label="Especialidad" value={editInfo?.especialidad||""} onChange={e=>setEditInfo(p=>({...p,especialidad:e.target.value}))} placeholder="Cocinas, Closets..." />
                              <INPUT label="Zona" value={editInfo?.zona||""} onChange={e=>setEditInfo(p=>({...p,zona:e.target.value}))} placeholder="San Pedro, Valle..." />
                              <INPUT label="Municipio" value={editInfo?.municipio||""} onChange={e=>setEditInfo(p=>({...p,municipio:e.target.value}))} placeholder="San Pedro Garza Garcia" />
                              <INPUT label="Slug (URL)" value={editInfo?.slug||""} onChange={e=>setEditInfo(p=>({...p,slug:e.target.value.toLowerCase().replace(/\s+/g,"-").replace(/[^a-z0-9-]/g,"")}))} placeholder="carpinteria-regia" />
                              <INPUT label="Logo URL" value={editInfo?.logo_url||""} onChange={e=>setEditInfo(p=>({...p,logo_url:e.target.value}))} placeholder="/logo.jpg" />
                              <INPUT label="Facebook" value={editInfo?.facebook||""} onChange={e=>setEditInfo(p=>({...p,facebook:e.target.value}))} placeholder="https://facebook.com/..." />
                              <INPUT label="Instagram" value={editInfo?.instagram||""} onChange={e=>setEditInfo(p=>({...p,instagram:e.target.value}))} placeholder="@carpinteria_regia" />
                              <INPUT label="TikTok" value={editInfo?.tiktok||""} onChange={e=>setEditInfo(p=>({...p,tiktok:e.target.value}))} placeholder="@carpinteria_regia" />
                              <INPUT label="Google Maps" value={editInfo?.google_maps||""} onChange={e=>setEditInfo(p=>({...p,google_maps:e.target.value}))} placeholder="https://maps.google.com/..." />
                              <INPUT label="Años experiencia" value={editInfo?.anos_experiencia||""} onChange={e=>setEditInfo(p=>({...p,anos_experiencia:e.target.value}))} placeholder="15" />
                              <INPUT label="Horario" value={editInfo?.horario||""} onChange={e=>setEditInfo(p=>({...p,horario:e.target.value}))} placeholder="Lun-Vie 9am-6pm" />
                              <INPUT label="Fecha vencimiento" value={editInfo?.fecha_vencimiento||""} onChange={e=>setEditInfo(p=>({...p,fecha_vencimiento:e.target.value}))} type="date" />
                            </div>
                            <TEXTAREA label="Notas internas" value={editInfo?.notas||""} onChange={e=>setEditInfo(p=>({...p,notas:e.target.value}))} placeholder="Notas sobre el taller..." rows={2} />
                            <button onClick={async e => {
                              e.stopPropagation();
                              await actualizarTaller(editInfo.id, { nombre:editInfo.nombre, email:editInfo.email, telefono:editInfo.telefono, especialidad:editInfo.especialidad, zona:editInfo.zona, municipio:editInfo.municipio, slug:editInfo.slug, fecha_vencimiento:editInfo.fecha_vencimiento, notas:editInfo.notas, logo_url:editInfo.logo_url, facebook:editInfo.facebook, instagram:editInfo.instagram, tiktok:editInfo.tiktok, google_maps:editInfo.google_maps, anos_experiencia:editInfo.anos_experiencia, horario:editInfo.horario });
                              setEditInfo(null); setTallerMsg("✅ Información actualizada"); setTimeout(()=>setTallerMsg(""), 3000);
                            }} style={{ background: "#d4af37", border: "none", color: "#000", borderRadius: 8, padding: "9px 20px", fontWeight: 700, fontSize: 13, cursor: "pointer", marginTop: 4 }}>
                              Guardar información
                            </button>
                          </div>
                        ) : (
                          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, fontSize: 12, color: "#aaa" }}>
                            {[["Email",t.email],["Tel",t.telefono],["Especialidad",t.especialidad],["Slug",t.slug]].filter(([,v])=>v).map(([l,v],j) => (
                              <div key={j}><b style={{color:"#666"}}>{l}:</b> {v}</div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Editar datos legales */}
                      <div onClick={e => e.stopPropagation()} style={{ background: "#0a0a08", border: "1px solid #1a1a12", borderRadius: 10, padding: 14, marginBottom: 14 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                          <div style={{ fontSize: 11, color: "#d4af37", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" }}>📄 Datos para Contratos</div>
                          <button onClick={e => { e.stopPropagation(); setEditTaller(editTaller && editTaller.id===t.id ? null : {...t}); }}
                            style={{ background: "transparent", border: "1px solid #d4af3740", color: "#d4af37", borderRadius: 6, padding: "4px 10px", fontSize: 11, cursor: "pointer" }}>
                            {editTaller && editTaller.id===t.id ? "Cancelar" : "✏️ Editar"}
                          </button>
                        </div>
                        {editTaller && editTaller.id === t.id ? (
                          <div>
                            <div style={{ display: "grid", gridTemplateColumns: isMobile?"1fr":"1fr 1fr", gap: 10, marginBottom: 12 }}>
                              <INPUT label="Nombre legal" value={editTaller?.nombre_legal||""} onChange={e=>setEditTaller(p=>({...p,nombre_legal:e.target.value}))} placeholder="Razón social" />
                              <INPUT label="RFC" value={editTaller?.rfc||""} onChange={e=>setEditTaller(p=>({...p,rfc:e.target.value}))} placeholder="XXXX123456XXX" />
                              <INPUT label="Representante" value={editTaller?.representante||""} onChange={e=>setEditTaller(p=>({...p,representante:e.target.value}))} placeholder="Nombre del representante" />
                              <INPUT label="Teléfono legal" value={editTaller?.telefono_legal||""} onChange={e=>setEditTaller(p=>({...p,telefono_legal:e.target.value}))} placeholder="81-1234-5678" />
                              <INPUT label="Correo legal" value={editTaller?.correo_legal||""} onChange={e=>setEditTaller(p=>({...p,correo_legal:e.target.value}))} placeholder="legal@taller.com" />
                              <INPUT label="CP" value={editTaller?.cp||""} onChange={e=>setEditTaller(p=>({...p,cp:e.target.value}))} placeholder="64000" />
                            </div>
                            <INPUT label="Dirección fiscal" value={editTaller?.direccion_fiscal||""} onChange={e=>setEditTaller(p=>({...p,direccion_fiscal:e.target.value}))} placeholder="Calle, Colonia, Ciudad, Estado" />
                            <INPUT label="Garantía por defecto" value={editTaller?.garantia_default||""} onChange={e=>setEditTaller(p=>({...p,garantia_default:e.target.value}))} placeholder="6 meses en instalación y herrajes" />
                            <TEXTAREA label="Términos adicionales" value={editTaller?.terminos_extra||""} onChange={e=>setEditTaller(p=>({...p,terminos_extra:e.target.value}))} placeholder="Condiciones especiales..." rows={2} />
                            <button onClick={async e => {
                              e.stopPropagation();
                              await actualizarTaller(editTaller.id, { nombre_legal:editTaller.nombre_legal, rfc:editTaller.rfc, representante:editTaller.representante, telefono_legal:editTaller.telefono_legal, correo_legal:editTaller.correo_legal, cp:editTaller.cp, direccion_fiscal:editTaller.direccion_fiscal, garantia_default:editTaller.garantia_default, terminos_extra:editTaller.terminos_extra });
                              setEditTaller(null); setTallerMsg("✅ Datos legales guardados"); setTimeout(()=>setTallerMsg(""), 3000);
                            }} style={{ background: "#d4af37", border: "none", color: "#000", borderRadius: 8, padding: "9px 20px", fontWeight: 700, fontSize: 13, cursor: "pointer", marginTop: 4 }}>
                              Guardar datos legales
                            </button>
                          </div>
                        ) : (
                          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, fontSize: 12, color: "#aaa" }}>
                            {[["Nombre legal",t.nombre_legal],["RFC",t.rfc],["Representante",t.representante],["Garantía",t.garantia_default]].filter(([,v])=>v).map(([l,v],j) => (
                              <div key={j}><b style={{color:"#555"}}>{l}:</b> {v}</div>
                            ))}
                            {!t.nombre_legal && <div style={{ fontSize: 11, color: "#333", gridColumn: "1/-1" }}>Sin datos legales — presiona Editar para agregar</div>}
                          </div>
                        )}
                      </div>

                      {/* Cambiar plan */}
                      <div style={{ marginBottom: 12 }}>
                        <div style={{ fontSize: 11, color: "#555", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>Cambiar Plan</div>
                        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                          {[["basico","Básico $699","#888"],["pro","Profesional $1,499","#00bcd4"],["premium","Elite $2,999","#d4af37"]].map(([p,l,c]) => (
                            <button key={p} onClick={e => { e.stopPropagation(); actualizarTaller(t.id, {plan:p}); }}
                              style={{ padding: "7px 14px", borderRadius: 20, border: `1px solid ${t.plan===p?c:"#333"}`, background: t.plan===p?`${c}20`:"transparent", color: t.plan===p?c:"#666", fontSize: 12, cursor: "pointer", fontWeight: t.plan===p?700:400 }}>{l}</button>
                          ))}
                        </div>
                      </div>

                      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                        <button onClick={e => { e.stopPropagation(); actualizarTaller(t.id, {estado: t.estado==="activo"?"inactivo":"activo"}); }}
                          style={{ padding: "8px 16px", borderRadius: 8, border: `1px solid ${t.estado==="activo"?"#f44336":"#4caf50"}`, background: "transparent", color: t.estado==="activo"?"#f44336":"#4caf50", fontSize: 12, cursor: "pointer", fontWeight: 600 }}>
                          {t.estado==="activo"?"Desactivar":"Activar"}
                        </button>
                        <button onClick={e => { e.stopPropagation(); actualizarTaller(t.id, {leads_recibidos: (t.leads_recibidos||0)+1}); }}
                          style={{ padding: "8px 16px", borderRadius: 8, border: "1px solid #d4af3740", background: "#d4af3710", color: "#d4af37", fontSize: 12, cursor: "pointer", fontWeight: 600 }}>+1 Lead</button>
                        <button onClick={e => { e.stopPropagation(); actualizarTaller(t.id, {proyectos_cerrados: (t.proyectos_cerrados||0)+1}); }}
                          style={{ padding: "8px 16px", borderRadius: 8, border: "1px solid #4caf5040", background: "#4caf5010", color: "#4caf50", fontSize: 12, cursor: "pointer", fontWeight: 600 }}>+1 Cierre</button>
                        {t.slug && (
                          <button onClick={e => { e.stopPropagation(); navigator.clipboard.writeText(`https://enkajepro.com/taller/${t.slug}`); alert("Link copiado"); }}
                            style={{ padding: "8px 16px", borderRadius: 8, border: "1px solid #d4af3740", background: "#d4af3710", color: "#d4af37", fontSize: 12, cursor: "pointer", fontWeight: 700 }}>🔗 Copiar link</button>
                        )}
                        <button onClick={async e => { e.stopPropagation(); setConfirmModal({ msg: `¿Eliminar ${t.nombre}?`, onOk: async () => { await sb(`talleres_membresia?id=eq.${t.id}`, {method:"DELETE", token}); cargarTalleres(); setTallerSel(null); }});}}
                          style={{ padding: "8px 16px", borderRadius: 8, border: "1px solid #f4433640", background: "#f443360a", color: "#f44336", fontSize: 12, cursor: "pointer", fontWeight: 600 }}>Eliminar</button>
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
                    <INPUT label="Slug (URL)" value={nuevoTaller.slug} onChange={e=>setNuevoTaller(p=>({...p,slug:e.target.value.toLowerCase().replace(/\s+/g,"-").replace(/[^a-z0-9-]/g,"")}))} placeholder="carpinteria-regia" />
                  </div>
                  <div style={{ marginBottom: 14 }}>
                    <label style={{ fontSize: 11, color: "#999", display: "block", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>Plan</label>
                    <div style={{ display: "flex", gap: 8 }}>
                      {[["basico","Básico $699","#888"],["pro","Profesional $1,499","#00bcd4"],["premium","Elite $2,999","#d4af37"]].map(([p,l,c]) => (
                        <button key={p} onClick={() => setNuevoTaller(prev=>({...prev,plan:p}))}
                          style={{ flex: 1, padding: "10px 4px", borderRadius: 10, border: `1px solid ${nuevoTaller.plan===p?c:"#2a2a20"}`, background: nuevoTaller.plan===p?`${c}20`:"transparent", color: nuevoTaller.plan===p?c:"#555", fontSize: 12, cursor: "pointer", fontWeight: 700 }}>{l}</button>
                      ))}
                    </div>
                  </div>
                  <TEXTAREA label="Notas internas" value={nuevoTaller.notas} onChange={e=>setNuevoTaller(p=>({...p,notas:e.target.value}))} placeholder="Notas sobre el taller..." rows={2} />
                  <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
                    <BTN onClick={() => setShowNuevoTaller(false)} outline color="#555" style={{ flex: 1 }}>Cancelar</BTN>
                    <BTN onClick={guardarNuevoTaller} style={{ flex: 2 }}>Guardar Taller</BTN>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── BLOG ADMIN ──────────────────────────────────────────────────────── */}
        {tab === "blog" && role === "admin" && (
          <div>
            <h1 style={{ color: "#d4af37", margin: "0 0 8px", fontSize: isMobile?20:24 }}>Blog · SEO</h1>
            <p style={{ color: "#555", margin: "0 0 20px", fontSize: 13 }}>Gestiona el contenido de EnKaje Pro para posicionamiento en Google</p>
            <div style={{ background: "#0f0f0a", border: "1px solid #d4af3730", borderRadius: 16, padding: 20, marginBottom: 20 }}>
              <div style={{ fontSize: 11, color: "#d4af37", fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 14 }}>📝 Nuevo Artículo</div>
              <INPUT label="Título del artículo" value={blogForm.titulo} onChange={e=>setBlogForm(p=>({...p,titulo:e.target.value}))} placeholder="Ej: ¿Cuánto cuesta una cocina integral en Monterrey?" />
              <div style={{ marginBottom: 14 }}>
                <label style={{ fontSize: 11, color: "#999", display: "block", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>Categoría</label>
                <PILLS_GROUP options={["Cocinas","Closets","Materiales","Tendencias","Guías","IA y Diseño","Costos"]} value={blogForm.categoria} onChange={v=>setBlogForm(p=>({...p,categoria:v}))} multi={false} />
              </div>
              <TEXTAREA label="Contenido (resumen o notas)" value={blogForm.contenido} onChange={e=>setBlogForm(p=>({...p,contenido:e.target.value}))} placeholder="Escribe el contenido del artículo o notas para la IA..." rows={5} />
              <div style={{ display: "flex", gap: 10, marginTop: 8, flexWrap: "wrap" }}>
                <BTN onClick={() => { setBlogMsg("✅ Artículo guardado como borrador"); setTimeout(()=>setBlogMsg(""),3000); }} style={{ fontSize: 13 }}>💾 Guardar borrador</BTN>
                <BTN onClick={() => { setBlogMsg("✅ Artículo publicado"); setTimeout(()=>setBlogMsg(""),3000); }} outline color="#4caf50" style={{ fontSize: 13 }}>🌐 Publicar</BTN>
              </div>
              {blogMsg && <div style={{ marginTop: 10, color: "#4caf50", fontSize: 13 }}>{blogMsg}</div>}
            </div>
            <div style={{ background: "#0f0f0a", border: "1px solid #1a1a12", borderRadius: 16, padding: 20 }}>
              <div style={{ fontSize: 11, color: "#d4af37", fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 14 }}>📅 Mapa de Contenido SEO Sugerido</div>
              {[
                { semana: "Semana 1", articulos: ["¿Qué es EnKaje Pro?","Melamina vs MDF","¿Cuánto cuesta una cocina integral?","Cómo diseñar una cocina online","Cocinas modernas 2026"] },
                { semana: "Semana 2", articulos: ["¿Cuánto cuesta un closet sobre medida?","Closets modernos","Cómo elegir un taller de carpintería","Acabados mate vs alto brillo","Cómo comparar presupuestos"] },
              ].map((sem, i) => (
                <div key={i} style={{ marginBottom: 16 }}>
                  <div style={{ fontSize: 12, color: "#d4af37", fontWeight: 700, marginBottom: 8 }}>{sem.semana}</div>
                  {sem.articulos.map((art, j) => (
                    <div key={j} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 12px", background: "#0a0a08", borderRadius: 8, marginBottom: 6 }}>
                      <span style={{ fontSize: 13, color: "#aaa" }}>{art}</span>
                      <button onClick={() => setBlogForm(p=>({...p, titulo: art}))}
                        style={{ background: "transparent", border: "1px solid #d4af3740", color: "#d4af37", borderRadius: 6, padding: "3px 10px", fontSize: 11, cursor: "pointer" }}>Usar</button>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── CONFIGURACIÓN ADMIN ─────────────────────────────────────────────── */}
        {tab === "configuracion" && role === "admin" && (
          <div>
            <h1 style={{ color: "#d4af37", margin: "0 0 8px", fontSize: isMobile?20:24 }}>Configuración</h1>
            <p style={{ color: "#555", margin: "0 0 20px", fontSize: 13 }}>Ajustes globales de la plataforma</p>
            <div style={{ background: "#0f0f0a", border: "1px solid #1a1a12", borderRadius: 16, padding: 20, marginBottom: 16 }}>
              <div style={{ fontSize: 11, color: "#d4af37", fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 14 }}>🗺️ Zonas de Cobertura</div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {["Cumbres","Contry","San Nicolás","Apodaca","Escobedo","Guadalupe","Carretera Nacional","San Pedro","Monterrey Centro","Santa Catarina","García"].map((zona,i) => (
                  <span key={i} style={{ background: "#1a1208", border: "1px solid #d4af3730", color: "#d4af37", borderRadius: 20, padding: "6px 14px", fontSize: 12 }}>📍 {zona}</span>
                ))}
              </div>
            </div>
            <div style={{ background: "#0f0f0a", border: "1px solid #1a1a12", borderRadius: 16, padding: 20, marginBottom: 16 }}>
              <div style={{ fontSize: 11, color: "#d4af37", fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 14 }}>💎 Planes y Precios</div>
              <div style={{ display: "grid", gridTemplateColumns: isMobile?"1fr":"repeat(3,1fr)", gap: 12 }}>
                {[["Básico","699","#888",["5 leads/mes","Formularios","Presupuesto PDF","Perfil directorio"]],["Profesional","1,499","#00bcd4",["Leads ilimitados","Scoring visible","Contratos","IA materiales","Renders"]],["Elite","2,999","#d4af37",["Todo Profesional","Exclusividad zona","Leads prioritarios","IA respuestas","Soporte 24/7"]]].map(([nombre,precio,color,features],i) => (
                  <div key={i} style={{ background: "#0a0a08", border: `1px solid ${color}40`, borderRadius: 14, padding: 16 }}>
                    <div style={{ fontSize: 13, color: color, fontWeight: 700, marginBottom: 4 }}>Plan {nombre}</div>
                    <div style={{ fontSize: 20, fontWeight: 900, color: color, marginBottom: 10 }}>${precio} MXN/mes</div>
                    {features.map((f,j) => <div key={j} style={{ fontSize: 11, color: "#666", marginBottom: 4 }}>✓ {f}</div>)}
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: "#0f0f0a", border: "1px solid #1a1a12", borderRadius: 16, padding: 20 }}>
              <div style={{ fontSize: 11, color: "#d4af37", fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 14 }}>⚙️ General</div>
              <div style={{ display: "grid", gridTemplateColumns: isMobile?"1fr":"1fr 1fr", gap: 12 }}>
                <div style={{ background: "#0a0a08", borderRadius: 10, padding: 14 }}>
                  <div style={{ fontSize: 11, color: "#555", marginBottom: 4 }}>PLATAFORMA</div>
                  <div style={{ fontSize: 14, color: "#e8e0d0", fontWeight: 600 }}>EnKaje Pro</div>
                </div>
                <div style={{ background: "#0a0a08", borderRadius: 10, padding: 14 }}>
                  <div style={{ fontSize: 11, color: "#555", marginBottom: 4 }}>DOMINIO</div>
                  <div style={{ fontSize: 14, color: "#d4af37", fontWeight: 600 }}>enkajepro.com</div>
                </div>
                <div style={{ background: "#0a0a08", borderRadius: 10, padding: 14 }}>
                  <div style={{ fontSize: 11, color: "#555", marginBottom: 4 }}>CONTACTO</div>
                  <div style={{ fontSize: 14, color: "#e8e0d0", fontWeight: 600 }}>hola@enkajepro.com</div>
                </div>
                <div style={{ background: "#0a0a08", borderRadius: 10, padding: 14 }}>
                  <div style={{ fontSize: 11, color: "#555", marginBottom: 4 }}>CIUDAD</div>
                  <div style={{ fontSize: 14, color: "#e8e0d0", fontWeight: 600 }}>Monterrey, NL · México</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── IA ──────────────────────────────────────────────────────────────── */}
        {tab === "ia" && (
          <div>
            <h1 style={{ color: "#d4af37", margin: "0 0 4px", fontSize: isMobile?20:24 }}>Centro de IA</h1>
            <p style={{ color: "#aaa", margin: "0 0 20px", fontSize: 13 }}>Herramientas inteligentes para tu taller</p>
            <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
              {[["asistente","🤖 Asistente"],["renders","🎨 Renders"],...(role !== "cliente" ? [["social","📱 Redes Sociales"]] : [])].map(([k,l]) => (
                <button key={k} onClick={() => setIaTab(k)}
                  style={{ padding: "9px 18px", borderRadius: 10, border: `1px solid ${iaTab===k?"#d4af37":"#2a2a20"}`, background: iaTab===k?"#d4af3715":"transparent", color: iaTab===k?"#d4af37":"#aaa", fontSize: 13, cursor: "pointer", fontWeight: iaTab===k?700:400 }}>
                  {l}
                </button>
              ))}
            </div>

            {/* ASISTENTE */}
            {iaTab === "asistente" && (
              <div>
                <div style={{ background: "#0f0f0a", border: "1px solid #1a1a12", borderRadius: 16, padding: 16, marginBottom: 16 }}>
                  <div style={{ fontSize: 11, color: "#d4af37", fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>🤖 Asistente EnKaje Pro</div>
                  <div style={{ fontSize: 12, color: "#888", marginBottom: 12 }}>Pregúntame sobre materiales, precios, técnicas, atención al cliente y más:</div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {["¿Cuánto cuesta una cocina de 3m en MDF?","¿Qué materiales recomiendas para closet de lujo?","¿Cómo responder a un cliente que pide descuento?","¿Qué incluir en una garantía de carpintería?"].map((s,i) => (
                      <button key={i} onClick={() => setChatInput(s)}
                        style={{ background: "#1a1208", border: "1px solid #d4af3730", color: "#d4af37", borderRadius: 20, padding: "6px 12px", fontSize: 11, cursor: "pointer" }}>{s}</button>
                    ))}
                  </div>
                </div>
                <div style={{ background: "#0f0f0a", border: "1px solid #1a1a12", borderRadius: 16, overflow: "hidden", marginBottom: 16 }}>
                  <div style={{ minHeight: 200, maxHeight: 400, overflowY: "auto", padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
                    {chatHistory.length === 0 && <div style={{ textAlign: "center", color: "#444", fontSize: 13, padding: "30px 0" }}>Haz una pregunta o selecciona una sugerencia arriba</div>}
                    {chatHistory.map((m, i) => (
                      <div key={i} style={{ display: "flex", justifyContent: m.role==="user"?"flex-end":"flex-start" }}>
                        <div style={{ maxWidth: "80%", padding: "10px 14px", borderRadius: m.role==="user"?"16px 16px 4px 16px":"16px 16px 16px 4px", background: m.role==="user"?"#d4af3720":"#1a1a12", border: `1px solid ${m.role==="user"?"#d4af3740":"#2a2a20"}`, fontSize: 13, color: "#e8e0d0", lineHeight: 1.7, whiteSpace: "pre-wrap" }}>
                          {m.role==="assistant" && <span style={{ fontSize: 10, color: "#d4af37", display: "block", marginBottom: 4, fontWeight: 700 }}>🤖 Asistente EnKaje</span>}
                          {m.content}
                        </div>
                      </div>
                    ))}
                    {chatLoading && <div style={{ display: "flex", justifyContent: "flex-start" }}><div style={{ background: "#1a1a12", border: "1px solid #2a2a20", borderRadius: "16px 16px 16px 4px", padding: "10px 14px", fontSize: 13, color: "#d4af37" }}>✨ Pensando...</div></div>}
                  </div>
                  <div style={{ borderTop: "1px solid #1a1a12", padding: 12, display: "flex", gap: 8 }}>
                    <input value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyDown={e => e.key==="Enter" && !e.shiftKey && enviarChat()} placeholder="Pregunta algo sobre carpintería, precios, materiales..."
                      style={{ flex: 1, background: "#0a0a08", border: "1px solid #2a2a20", borderRadius: 10, padding: "10px 14px", color: "#e8e0d0", fontSize: 13, fontFamily: "inherit" }} />
                    <button onClick={enviarChat} disabled={chatLoading || !chatInput.trim()}
                      style={{ background: chatInput.trim()?"#d4af37":"#1a1a12", border: "none", borderRadius: 10, padding: "10px 16px", color: chatInput.trim()?"#000":"#555", fontSize: 13, cursor: chatInput.trim()?"pointer":"default", fontWeight: 700, whiteSpace: "nowrap" }}>
                      Enviar →
                    </button>
                  </div>
                </div>

                {/* Análisis del proyecto */}
                <div style={{ background: "#0f0f0a", border: "1px solid #d4af3720", borderRadius: 16, padding: isMobile?16:20 }}>
                  <h3 style={{ color: "#d4af37", margin: "0 0 12px", fontSize: 13, letterSpacing: 1 }}>📋 ANÁLISIS DEL PROYECTO ACTUAL</h3>
                  <TIPO_SELECTOR />
                  <BTN onClick={analizarConIA} disabled={aiLoading} style={{ width: "100%", marginTop: 4, fontSize: 13, padding: "11px" }}>
                    {aiLoading ? "Analizando..." : "🔍 ANALIZAR PROYECTO CON IA"}
                  </BTN>
                  {aiLoading && <div style={{ color: "#d4af37", fontSize: 13, padding: "12px 0" }}>Analizando especificaciones...</div>}
                  {aiResult && (
                    <div style={{ marginTop: 14 }}>
                      <div style={{ display: "flex", justifyContent: "flex-end", gap: 6, marginBottom: 8 }}>
                        <BTN onClick={() => compartir("whatsapp", aiResult, "Análisis IA — EnKaje Pro")} color="#25D366" textColor="#fff" style={{ fontSize: 10, padding: "6px 10px" }}>WA</BTN>
                        <BTN onClick={() => { navigator.clipboard.writeText(aiResult); alert("Copiado"); }} outline color="#555" style={{ fontSize: 10, padding: "6px 10px" }}>Copiar</BTN>
                      </div>
                      <div style={{ fontSize: 13, color: "#e8e0d0", lineHeight: 1.9, whiteSpace: "pre-wrap", background: "#0a0a08", borderRadius: 10, padding: 14 }}>{aiResult}</div>
                    </div>
                  )}
                </div>
                <div style={{ marginTop: 12, padding: "10px 14px", background: "#1a1208", border: "1px solid #d4af3720", borderRadius: 10, fontSize: 11, color: "#777", lineHeight: 1.6 }}>
                  ⚠️ La IA puede cometer errores. Verifica siempre los precios y recomendaciones antes de compartirlos con tu cliente.
                </div>
              </div>
            )}

            {/* RENDERS */}
            {iaTab === "renders" && (
              <div>
                <div style={{ background: "#0f0f0a", border: "1px solid #d4af3720", borderRadius: 16, padding: 20, marginBottom: 16 }}>
                  <h3 style={{ color: "#d4af37", margin: "0 0 8px", fontSize: 13, letterSpacing: 1 }}>🎨 GENERADOR DE RENDERS</h3>
                  <p style={{ color: "#aaa", fontSize: 12, marginBottom: 16 }}>Describe el proyecto y la IA genera una imagen fotorrealista en segundos</p>
                  <div style={{ marginBottom: 12 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                      <label style={{ fontSize: 11, color: "#999", textTransform: "uppercase", letterSpacing: 1 }}>Descripción del diseño</label>
                      <button onClick={() => {
                        const f = getForm();
                        const tipoLabel = tipoForm==="cocina"?"cocina integral":tipoForm==="closet"?"closet":tipoForm==="puerta"?"puerta":tipoForm==="bano"?"baño":"mueble";
                        const estilo = Array.isArray(f.estilo)&&f.estilo.length ? f.estilo.join(" y ") : "";
                        const material = Array.isArray(f.material)&&f.material.length ? f.material.join(", ") : "";
                        const color = f.color_principal || "";
                        setRenderPrompt([tipoLabel, estilo&&`estilo ${estilo}`, material&&`en ${material}`, color&&`color ${color}`, "en Monterrey, México"].filter(Boolean).join(", "));
                      }} style={{ background: "transparent", border: "1px solid #d4af3740", color: "#d4af37", borderRadius: 6, padding: "4px 10px", fontSize: 11, cursor: "pointer" }}>
                        🔄 Usar datos del formulario
                      </button>
                    </div>
                    <textarea value={renderPrompt} onChange={e => setRenderPrompt(e.target.value)}
                      placeholder="Ej: cocina moderna negra mate con isla y cubierta de cuarzo blanco, iluminación LED, Monterrey..."
                      rows={3} style={{ width: "100%", background: "#0a0a08", border: "1px solid #2a2a20", borderRadius: 10, padding: "11px 14px", color: "#e8e0d0", fontSize: 13, resize: "vertical", fontFamily: "inherit" }} />
                  </div>
                  <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
                    <BTN onClick={generarRender} disabled={renderLoading || !renderPrompt.trim()} style={{ fontSize: 13, padding: "11px 24px" }}>
                      {renderLoading ? "⏳ Generando..." : "✨ Generar Render"}
                    </BTN>
                    <BTN onClick={generarRenderTecnico} disabled={renderLoading} outline color="#00bcd4" style={{ fontSize: 13, padding: "11px 24px" }}>
                      {renderLoading ? "⏳ Generando..." : "📐 Plano Técnico (Shop Drawing)"}
                    </BTN>
                    {renderMsg && <span style={{ fontSize: 12, color: renderMsg.startsWith("✅") ? "#4caf50" : "#f44336" }}>{renderMsg}</span>}
                  </div>
                  {renderLoading && (
                    <div style={{ background: "#0a0a08", borderRadius: 12, padding: 32, textAlign: "center", marginTop: 16 }}>
                      <div style={{ color: "#d4af37", fontSize: 14, marginBottom: 8 }}>✨ Generando render con IA...</div>
                      <div style={{ color: "#555", fontSize: 12 }}>Esto puede tomar 15-30 segundos</div>
                    </div>
                  )}
                  {renderImg && !renderLoading && (
                    <div style={{ background: "#0a0a08", border: "1px solid #d4af3730", borderRadius: 16, overflow: "hidden", marginTop: 16 }}>
                      <img src={renderImg} alt="Render generado" style={{ width: "100%", display: "block" }} />
                      <div style={{ padding: 16, display: "flex", gap: 10, flexWrap: "wrap" }}>
                        <a href={renderImg} download="render-enkaje-pro.png" target="_blank" rel="noreferrer"
                          style={{ background: "#d4af37", color: "#000", borderRadius: 10, padding: "9px 20px", fontWeight: 700, fontSize: 13, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6 }}>
                          ⬇️ Descargar
                        </a>
                        <BTN onClick={() => compartir("whatsapp", `Mira el render de tu proyecto generado con IA: ${renderImg}`, "Render EnKaje Pro")} color="#25D366" textColor="#fff" style={{ fontSize: 13 }}>
                          💬 Compartir WA
                        </BTN>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* REDES SOCIALES */}
            {iaTab === "social" && (
              <div>
                <div style={{ background: "#0f0f0a", border: "1px solid #d4af3720", borderRadius: 16, padding: 20, marginBottom: 16 }}>
                  <h3 style={{ color: "#d4af37", margin: "0 0 8px", fontSize: 13, letterSpacing: 1 }}>📱 GENERADOR DE CONTENIDO</h3>
                  <p style={{ color: "#aaa", fontSize: 12, marginBottom: 16 }}>Genera captions e hashtags listos para copiar y pegar en tus redes</p>
                  <TIPO_SELECTOR />
                  <BTN onClick={generarContenidoSocial} disabled={socialLoading} style={{ fontSize: 13, padding: "11px 24px", marginTop: 8 }}>
                    {socialLoading ? "⏳ Generando..." : "✨ Generar Caption"}
                  </BTN>
                </div>
                {socialCaption && (
                  <div style={{ background: "#0f0f0a", border: "1px solid #E1306C30", borderRadius: 16, padding: 20 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                      <h3 style={{ color: "#E1306C", margin: 0, fontSize: 13, letterSpacing: 1 }}>📸 CAPTION LISTO</h3>
                      <BTN onClick={() => { navigator.clipboard.writeText(socialCaption); alert("¡Copiado!"); }} outline color="#E1306C" style={{ fontSize: 11, padding: "6px 12px" }}>📋 Copiar</BTN>
                    </div>
                    <div style={{ fontSize: 13, color: "#e8e0d0", lineHeight: 1.8, whiteSpace: "pre-wrap", background: "#0a0a08", borderRadius: 10, padding: 16 }}>{socialCaption}</div>
                    <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
                      <BTN onClick={() => compartir("facebook", socialCaption, "Post EnKaje Pro")} color="#1877F2" textColor="#fff" style={{ fontSize: 12 }}>📘 Facebook</BTN>
                      <BTN onClick={() => compartir("whatsapp", socialCaption, "Post EnKaje Pro")} color="#25D366" textColor="#fff" style={{ fontSize: 12 }}>💬 WhatsApp</BTN>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

      </div>

      {/* FOOTER LEGAL */}
      <div style={{ borderTop: "1px solid #1a1a12", padding: "16px 20px", textAlign: "center", display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
        {[["privacidad","Privacidad"],["terminos","Términos"],["cookies","Cookies"]].map(([k,l]) => (
          <button key={k} onClick={() => setLegalPage(k)} style={{ background: "transparent", border: "none", color: "#444", fontSize: 11, cursor: "pointer", letterSpacing: 1, textDecoration: "underline" }}>{l}</button>
        ))}
        <span style={{ color: "#2a2a20", fontSize: 11 }}>· © 2026 EnKaje Pro · Monterrey, México</span>
      </div>

      {/* COOKIE BANNER */}
      <CookieBanner onVerCookies={() => setLegalPage("cookies")} />

      {/* MODAL CONFIRMACIÓN */}
      {confirmModal && (
        <div style={{ position: "fixed", inset: 0, background: "#000000cc", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999, padding: 20 }}
          onClick={() => setConfirmModal(null)}>
          <div onClick={e => e.stopPropagation()} style={{ background: "#0f0f0a", border: "1px solid #f4433640", borderRadius: 16, padding: 28, maxWidth: 360, width: "100%", textAlign: "center" }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>🗑️</div>
            <div style={{ fontSize: 15, color: "#e8e0d0", fontWeight: 600, marginBottom: 8 }}>{confirmModal.msg}</div>
            <div style={{ fontSize: 12, color: "#aaa", marginBottom: 24 }}>Esta acción no se puede deshacer.</div>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setConfirmModal(null)}
                style={{ flex: 1, background: "transparent", border: "1px solid #333", color: "#888", borderRadius: 10, padding: "11px", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>
                Cancelar
              </button>
              <button onClick={async () => {
                try { await confirmModal.onOk(); } catch(e) { alert("Error: " + e.message); }
                setConfirmModal(null);
              }}
                style={{ flex: 1, background: "#f44336", border: "none", color: "#fff", borderRadius: 10, padding: "11px", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
