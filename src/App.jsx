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
        <p style={LEGAL_S.p}>EnKaje Pro no es responsable por el contenido de imágenes subidas por usuarios ni por reclamaciones de terceros relacionadas con dicho contenido.</p>
        <div style={LEGAL_S.div}/>
        <h2 style={LEGAL_S.h2}>5. Inteligencia Artificial y Renders</h2>
        <p style={LEGAL_S.p}>Los renders generados por la plataforma son propuestas visuales creadas mediante inteligencia artificial a partir de las imágenes y preferencias del usuario. Tienen carácter estrictamente referencial y <strong style={{color:"#e8e0d0"}}>no constituyen una garantía del resultado final</strong> del proyecto.</p>
        <p style={LEGAL_S.p}>Los rangos de inversión estimados son aproximaciones basadas en parámetros generales del mercado y no representan cotizaciones formales. El precio real será determinado por el taller en su cotización.</p>
        <p style={LEGAL_S.p}>EnKaje Pro retiene los derechos sobre los renders generados por sus sistemas de IA. El usuario obtiene una licencia de uso personal, no transferible y no comercial. Queda prohibido remover, alterar u ocultar la marca de agua presente en renders generados en modalidad gratuita.</p>
        <h2 style={LEGAL_S.h2}>6. Servicio Freemium</h2>
        <p style={LEGAL_S.p}>EnKaje Pro ofrece una generación gratuita de render sin necesidad de crear una cuenta. Esta generación incluye marca de agua y no permite descarga en alta resolución. Al registrarse, el usuario accede a generaciones adicionales según los términos vigentes del plan gratuito.</p>
        <p style={LEGAL_S.p}>El acceso gratuito es un beneficio revocable. EnKaje Pro se reserva el derecho de modificar, limitar o eliminar el acceso gratuito en cualquier momento sin previo aviso, sin que esto genere derecho a compensación.</p>
        <h2 style={LEGAL_S.h2}>7. Uso Prohibido</h2>
        <LegalUL items={["Usar la plataforma para fines ilegales o fraudulentos","Publicar información falsa sobre proyectos o presupuestos","Contactar directamente a talleres para evadir la intermediación de EnKaje Pro","Subir imágenes sobre las cuales no se tienen derechos o que contengan contenido ilegal","Remover o alterar marcas de agua en renders generados en modalidad gratuita","Copiar o redistribuir contenido de la plataforma sin autorización escrita","Interferir con el funcionamiento técnico de la plataforma","Usar los renders generados con fines comerciales sin autorización expresa de EnKaje Pro"]} />
        <h2 style={LEGAL_S.h2}>8. Limitación de Responsabilidad</h2>
        <p style={LEGAL_S.p}>EnKaje Pro no garantiza la disponibilidad ininterrumpida del servicio ni la exactitud de los renders o estimaciones generadas por IA.</p>
        <div style={LEGAL_S.warn}><p style={{...LEGAL_S.p,margin:0,color:"#f44336",fontWeight:600}}>Limitación de Responsabilidad</p><p style={{...LEGAL_S.p,margin:"6px 0 0"}}>La responsabilidad máxima de EnKaje Pro ante cualquier reclamación se limita al monto de la suscripción mensual pagada por el usuario en el mes en que ocurrió el evento reclamado. EnKaje Pro no será responsable por daños indirectos, pérdida de negocio, pérdida de datos ni cualquier daño consecuente.</p></div>
        <h2 style={LEGAL_S.h2}>9. Suscripciones y Pagos</h2>
        <LegalUL items={["Planes: Básico $699, Pro $1,499 y Premium $2,999 MXN/mes","Pagos mensuales anticipados","Sin reembolsos por períodos parciales","Puedes cancelar en cualquier momento desde tu panel — el acceso continúa hasta el fin del período pagado","Los precios pueden cambiar con al menos 30 días de aviso previo"]} />
        <h2 style={LEGAL_S.h2}>10. Propiedad Intelectual</h2>
        <p style={LEGAL_S.p}>Todo el contenido, diseño, código, marca, renders generados por IA y materiales de EnKaje Pro son propiedad de EnKaje Pro y están protegidos por las leyes de propiedad intelectual mexicanas. Queda prohibida su reproducción, distribución o uso sin autorización escrita previa.</p>
        <h2 style={LEGAL_S.h2}>11. Ley Aplicable</h2>
        <p style={LEGAL_S.p}>Estos Términos se rigen por las leyes de los Estados Unidos Mexicanos. Cualquier controversia se somete a la jurisdicción de los tribunales competentes de Monterrey, Nuevo León, renunciando las partes a cualquier otro fuero que pudiera corresponderles.</p>
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

// ============ SHARE MENU — logos oficiales con Font Awesome ============
// Font Awesome se carga una vez en el GLOBAL_CSS
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

// ============ COMPARTIR — todos los canales ============
function compartir(tipo, texto, titulo) {
  const msg = encodeURIComponent(`${titulo}\n\n${texto}`);
  const url = encodeURIComponent("https://enkajepro.com");
  if (tipo === "whatsapp")  window.open(`https://wa.me/?text=${msg}`, "_blank");
  if (tipo === "email")     window.open(`mailto:?subject=${encodeURIComponent(titulo)}&body=${msg}`, "_blank");
  if (tipo === "facebook")  window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${msg}`, "_blank");
  if (tipo === "messenger") window.open(`https://www.facebook.com/dialog/send?link=${url}&app_id=1401488693436528&redirect_uri=${url}`, "_blank");
  if (tipo === "instagram") { navigator.clipboard.writeText(`${titulo}\n\n${texto}`); alert("Texto copiado. Pégalo en tu historia o mensaje de Instagram."); }
  if (tipo === "tiktok")    { navigator.clipboard.writeText(`${titulo}\n\n${texto}`); alert("Texto copiado. Pégalo en la descripción de tu video de TikTok."); }
  if (tipo === "copiar")    { navigator.clipboard.writeText(`${titulo}\n\n${texto}`); alert("Copiado al portapapeles"); }
}

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

// FormularioBano — pegar junto a los otros Formulario* components
// ============================================================
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
        <PILLS_GROUP
          options={["Vanity / Mueble bajo lavabo","Botiquín","Torre de baño","Nicho empotrado","Mueble auxiliar","Repisa flotante","Mueble completo de baño"]}
          value={form.tipo_mueble_bano}
          onChange={v=>setF("tipo_mueble_bano",v)}
        />
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
        <PILLS_GROUP
          options={["Flotante (con efecto levitación)","Con patas","Empotrado en pared","Apoyado en piso"]}
          value={form.instalacion}
          onChange={v=>setF("instalacion",v)}
          color="#00bcd4"
        />
      </SECTION>

      <SECTION title="Estilo de Diseño" icon="✨">
        <PILLS_GROUP
          options={["Minimalista","Moderno","Contemporáneo","Clásico","Industrial","Nórdico","Lujo / Premium"]}
          value={form.estilo}
          onChange={v=>setF("estilo",v)}
        />
      </SECTION>

      <SECTION title="Material" icon="🪵">
        <PILLS_GROUP
          options={["Melamina","MDF","MDF RH antihumedad","Madera sólida","PVC impermeable","Triplay"]}
          value={form.material}
          onChange={v=>setF("material",v)}
        />
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
        <PILLS_GROUP
          options={["Sin puertas (abierto)","Con puertas abatibles","Con puertas corredizas","Solo cajones","Combinación puertas y cajones"]}
          value={form.tipo_puertas}
          onChange={v=>setF("tipo_puertas",v)}
        />
        <label style={{ fontSize:11, color:"#555", display:"block", margin:"14px 0 8px", textTransform:"uppercase", letterSpacing:1 }}>Jaladeras</label>
        <PILLS_GROUP
          options={["Sin jaladeras (push open)","Perfil Gola oculta","Metálicas negras","Metálicas doradas","Metálicas cromadas","Integradas"]}
          value={form.jaladeras}
          onChange={v=>setF("jaladeras",v)}
        />
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
        <PILLS_GROUP
          options={["LED inferior (efecto flotante)","LED lateral espejo","LED superior","Sensores de movimiento","Sin iluminación"]}
          value={form.iluminacion_bano}
          onChange={v=>setF("iluminacion_bano",v)}
          color="#f0c030"
        />
        <div style={{ marginTop:12, background:"#1a1208", border:"1px solid #d4af3720", borderRadius:10, padding:"10px 14px", fontSize:12, color:"#888" }}>
          💡 El LED inferior crea el efecto de levitación — es el acabado más pedido en vanities modernos y minimalistas.
        </div>
      </SECTION>

      <SECTION title="Tarja / Lavabo" icon="🚿">
        <PILLS_GROUP
          options={["Submontada","Sobrepuesta","Integrada al mueble","Sin tarja (solo mueble)","Doble lavabo"]}
          value={form.tipo_tarja}
          onChange={v=>setF("tipo_tarja",v)}
        />
        <INPUT label="Color / modelo de tarja" value={form.color_tarja} onChange={e=>setF("color_tarja",e.target.value)} placeholder="Blanca, negra, acero..." style={{marginTop:12}} />
        <label style={{ fontSize:11, color:"#555", display:"block", margin:"14px 0 8px", textTransform:"uppercase", letterSpacing:1 }}>Grifería</label>
        <PILLS_GROUP
          options={["Negra mate","Cromada","Dorada","Níquel cepillado","Premium"]}
          value={form.griferia}
          onChange={v=>setF("griferia",v)}
        />
      </SECTION>

      <SECTION title="Espejo" icon="🪞">
        <PILLS_GROUP
          options={["Con marco integrado al mueble","Nicho empotrado con iluminación","Espejo touch con LED","Espejo simple sin marco","Sin espejo"]}
          value={form.espejo}
          onChange={v=>setF("espejo",v)}
        />
      </SECTION>

      <SECTION title="Accesorios" icon="🧴">
        <PILLS_GROUP
          options={["Porta toallas integrado","Gancho para bata","Repisa interna","Cajón organizador","Porta rollo integrado","Separadores internos"]}
          value={form.accesorios_bano}
          onChange={v=>setF("accesorios_bano",v)}
        />
      </SECTION>

      <SECTION title="Observaciones" icon="📝">
        <TEXTAREA
          value={form.observaciones}
          onChange={e=>setF("observaciones",e.target.value)}
          placeholder="Notas adicionales, presupuesto aproximado, preferencias especiales, foto de referencia..."
          rows={4}
        />
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
}// ============ PRESUPUESTO — hoja profesional + todos los canales ============
function Presupuesto({ form, setF, isMobile, tipoProyecto, role, generarMateriales, materiales, materialesLoading, materialesMsg, generarContrato, tallerData, imprimirHoja }) {
  const total = [form.precio_fabricacion, form.precio_instalacion, form.precio_cubierta, form.precio_herrajes, form.precio_otros]
    .reduce((a, v) => a + (parseFloat(v) || 0), 0);

  const tipoLabel = tipoProyecto === "cocina" ? "Cocina Integral" : tipoProyecto === "closet" ? "Closet" : tipoProyecto === "puerta" ? "Puerta" : "Mueble";
  const tipoIcon  = tipoProyecto === "cocina" ? "🍳" : tipoProyecto === "closet" ? "👔" : tipoProyecto === "puerta" ? "🚪" : "🛋️";

  function getDetallesProyecto() {
    const f = [];
    if (tipoProyecto === "cocina") {
      if (form.tipo_cocina?.length)       f.push(["Tipo de cocina",      form.tipo_cocina.join(", ")]);
      if (form.largo)                      f.push(["Largo total",         form.largo]);
      if (form.altura)                     f.push(["Altura",              form.altura]);
      if (form.profundidad)                f.push(["Profundidad",         form.profundidad]);
      if (form.area)                       f.push(["Área aprox.",         form.area]);
      if (form.medidas_isla)               f.push(["Medidas isla",        form.medidas_isla]);
      if (form.altura_superiores)          f.push(["Alt. superiores",     form.altura_superiores]);
      if (form.material_cubierta?.length)  f.push(["Cubierta",           form.material_cubierta.join(", ")]);
      if (form.color_cubierta)             f.push(["Color cubierta",      form.color_cubierta]);
      if (form.tarja?.length)              f.push(["Tarja",               form.tarja.join(", ")]);
      if (form.griferia?.length)           f.push(["Grifería",            form.griferia.join(", ")]);
      if (form.electrodomesticos?.length)  f.push(["Electrodomésticos",   form.electrodomesticos.join(", ")]);
      if (form.accesorios?.length)         f.push(["Accesorios",          form.accesorios.join(", ")]);
    } else if (tipoProyecto === "closet") {
      if (form.tipo_closet?.length)        f.push(["Tipo de closet",      form.tipo_closet.join(", ")]);
      if (form.largo)                      f.push(["Largo / Ancho",       form.largo]);
      if (form.altura)                     f.push(["Altura",              form.altura]);
      if (form.profundidad)                f.push(["Profundidad",         form.profundidad]);
      if (form.area)                       f.push(["Área aprox.",         form.area]);
      if (form.accesorios_closet?.length)  f.push(["Accesorios",          form.accesorios_closet.join(", ")]);
    } else if (tipoProyecto === "puerta") {
      if (form.tipo_puerta?.length)        f.push(["Tipo de puerta",      form.tipo_puerta.join(", ")]);
      if (form.ancho)                      f.push(["Ancho",               form.ancho]);
      if (form.alto)                       f.push(["Alto",                form.alto]);
      if (form.grosor_puerta)              f.push(["Grosor",              form.grosor_puerta]);
      if (form.cantidad)                   f.push(["Cantidad",            form.cantidad]);
      if (form.tipo_marco?.length)         f.push(["Tipo de marco",       form.tipo_marco.join(", ")]);
      if (form.herrajes_puerta?.length)    f.push(["Herrajes",            form.herrajes_puerta.join(", ")]);
    } else {
      if (form.tipo_mueble?.length)        f.push(["Tipo de mueble",      form.tipo_mueble.join(", ")]);
      if (form.largo)                      f.push(["Largo / Ancho",       form.largo]);
      if (form.alto)                       f.push(["Alto",                form.alto]);
      if (form.profundidad)                f.push(["Profundidad",         form.profundidad]);
      if (form.cantidad)                   f.push(["Cantidad",            form.cantidad]);
      if (form.accesorios_mueble?.length)  f.push(["Accesorios",          form.accesorios_mueble.join(", ")]);
    }
    if (form.estilo?.length)       f.push(["Estilo",           form.estilo.join(", ")]);
    if (form.material?.length)     f.push(["Material",         form.material.join(", ")]);
    if (form.grosor?.length)       f.push(["Grosor",           form.grosor.join(", ")]);
    if (form.color_principal)      f.push(["Color principal",   form.color_principal]);
    if (form.color_secundario)     f.push(["Color secundario",  form.color_secundario]);
    if (form.tipo_acabado?.length) f.push(["Acabado",           form.tipo_acabado.join(", ")]);
    if (form.tipo_puertas?.length) f.push(["Tipo puertas",      form.tipo_puertas.join(", ")]);
    if (form.jaladeras?.length)    f.push(["Jaladeras",         form.jaladeras.join(", ")]);
    if (form.bisagras?.length)     f.push(["Bisagras",          form.bisagras.join(", ")]);
    if (form.correderas?.length)   f.push(["Correderas",        form.correderas.join(", ")]);
    if (form.iluminacion?.length)  f.push(["Iluminación",       form.iluminacion.join(", ")]);
    if (form.textura)              f.push(["Textura",           form.textura]);
    return f;
  }

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
          <button onClick={imprimirHoja} style={{
            background:"linear-gradient(135deg,#d4af37,#f0c84a)", color:"#000",
            border:"none", borderRadius:12, padding:"12px 22px",
            fontWeight:900, fontSize:13, cursor:"pointer",
            display:"flex", alignItems:"center", gap:8,
            boxShadow:"0 4px 20px #d4af3740"
          }}>🖨️ Imprimir / PDF Profesional</button>
          {(role === "admin" || role === "taller") && (
            <button onClick={() => generarContrato(tallerData)} style={{
              background:"transparent", color:"#d4af37",
              border:"1.5px solid #d4af37", borderRadius:12, padding:"12px 22px",
              fontWeight:900, fontSize:13, cursor:"pointer",
              display:"flex", alignItems:"center", gap:8
            }}>📄 Generar Contrato</button>
          )}
        </div>
        <ShareMenu
          onShare={key => compartir(key, textoPresupuesto(), `Presupuesto ${tipoLabel} - EnKaje Pro`)}
          label="Compartir presupuesto"
        />
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
            <INPUT label="Garantia"          value={form.garantia}       onChange={e=>setF("garantia",e.target.value)}       placeholder="6 meses en instalacion y herrajes" />
          </SECTION>
        </div>
        <div>
          <SECTION title="Desglose de Precios" icon="📊">
            <INPUT label="Fabricacion (MXN)"         value={form.precio_fabricacion} onChange={e=>setF("precio_fabricacion",e.target.value)} placeholder="35000" type="number" />
            <INPUT label="Instalacion (MXN)"         value={form.precio_instalacion} onChange={e=>setF("precio_instalacion",e.target.value)} placeholder="8000"  type="number" />
            <INPUT label="Acabados / Cubierta (MXN)" value={form.precio_cubierta}    onChange={e=>setF("precio_cubierta",e.target.value)}    placeholder="12000" type="number" />
            <INPUT label="Herrajes (MXN)"            value={form.precio_herrajes}    onChange={e=>setF("precio_herrajes",e.target.value)}    placeholder="5000"  type="number" />
            <INPUT label="Otros (MXN)"               value={form.precio_otros}       onChange={e=>setF("precio_otros",e.target.value)}       placeholder="0"     type="number" />
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
            <div style={{ marginTop:14, background:"#0a0a08", border:"1px dashed #d4af3730", borderRadius:10, padding:14, textAlign:"center" }}>
              <div style={{ fontSize:10, color:"#999", letterSpacing:2, textTransform:"uppercase", marginBottom:8 }}>Vista previa del PDF</div>
              <div style={{ fontSize:11, color:"#aaa", lineHeight:1.8 }}>📄 Logo · Datos del cliente · Especificaciones · Precios · Firmas</div>
              <button onClick={imprimirHoja} style={{ marginTop:10, background:"transparent", border:"1px solid #d4af3740", color:"#d4af37", borderRadius:8, padding:"8px 16px", fontSize:12, cursor:"pointer", fontWeight:600 }}>
                Ver hoja completa →
              </button>
            </div>
          </SECTION>
        </div>
      </div>

      {/* ── COTIZADOR DE MATERIALES CON IA ── solo admin y taller */}
      {(role === "admin" || role === "taller") && (
        <div style={{ marginTop: 28, background: "#0a0a08", border: "1px solid #d4af3730", borderRadius: 16, padding: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: 11, color: "#d4af37", letterSpacing: 2, textTransform: "uppercase", fontWeight: 700, marginBottom: 4 }}>🔩 Cotizador de Materiales con IA</div>
              <div style={{ fontSize: 12, color: "#aaa" }}>Genera la lista automática basada en las especificaciones del formulario</div>
            </div>
            <button
              onClick={generarMateriales}
              disabled={materialesLoading}
              style={{ background: materialesLoading ? "#1a1a10" : "linear-gradient(135deg,#d4af37,#f0c84a)", color: materialesLoading ? "#555" : "#000", border: "none", borderRadius: 10, padding: "11px 20px", fontWeight: 900, fontSize: 13, cursor: materialesLoading ? "not-allowed" : "pointer", display: "flex", alignItems: "center", gap: 8, whiteSpace: "nowrap" }}>
              {materialesLoading ? "⏳ Generando..." : "✨ Generar con IA"}
            </button>
          </div>

          {materialesMsg && (
            <div style={{ background: materialesMsg.includes("❌") ? "#1a0a0a" : "#0a1a0a", border: `1px solid ${materialesMsg.includes("❌") ? "#f4433640" : "#4caf5040"}`, borderRadius: 8, padding: "10px 14px", marginBottom: 14 }}>
              <div style={{ color: materialesMsg.includes("❌") ? "#f44336" : "#4caf50", fontSize: 12, marginBottom: materialesMsg.includes("❌") ? 0 : 10 }}>{materialesMsg}</div>
              {!materialesMsg.includes("❌") && materiales.length > 0 && (
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <button onClick={() => {
                    const total = materiales.reduce((s,m)=>s+(parseFloat(m.total)||0),0);
                    const lista = materiales.map(m=>`• ${m.material}: ${m.cantidad} — $${parseFloat(m.total||0).toLocaleString("es-MX")} MXN`).join("\n");
                    const msg = `📋 *LISTA DE MATERIALES — EnKaje Pro*\n\n${lista}\n\n*TOTAL: $${total.toLocaleString("es-MX")} MXN*\n\nenkajepro.com`;
                    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, "_blank");
                  }} style={{ background: "#25D36615", border: "1px solid #25D36640", color: "#25D366", borderRadius: 8, padding: "6px 12px", fontSize: 11, cursor: "pointer", fontWeight: 700 }}>
                    💬 WhatsApp
                  </button>
                  <button onClick={() => {
                    const total = materiales.reduce((s,m)=>s+(parseFloat(m.total)||0),0);
                    const lista = materiales.map(m=>`• ${m.material}: ${m.cantidad} — $${parseFloat(m.total||0).toLocaleString("es-MX")} MXN`).join("%0A");
                    const subject = "Lista de Materiales — EnKaje Pro";
                    const body = `Lista de Materiales%0A%0A${lista}%0A%0ATOTAL: $${total.toLocaleString("es-MX")} MXN%0A%0Aenkajepro.com`;
                    window.open(`mailto:?subject=${subject}&body=${body}`, "_blank");
                  }} style={{ background: "#d4af3715", border: "1px solid #d4af3740", color: "#d4af37", borderRadius: 8, padding: "6px 12px", fontSize: 11, cursor: "pointer", fontWeight: 700 }}>
                    📧 Email
                  </button>
                  <button onClick={() => {
                    const total = materiales.reduce((s,m)=>s+(parseFloat(m.total)||0),0);
                    const texto = `Lista de Materiales EnKaje Pro - Total: $${total.toLocaleString("es-MX")} MXN - enkajepro.com`;
                    window.open(`https://www.facebook.com/sharer/sharer.php?u=https://enkajepro.com&quote=${encodeURIComponent(texto)}`, "_blank");
                  }} style={{ background: "#1877F215", border: "1px solid #1877F240", color: "#1877F2", borderRadius: 8, padding: "6px 12px", fontSize: 11, cursor: "pointer", fontWeight: 700 }}>
                    📘 Facebook
                  </button>
                  <button onClick={() => {
                    const total = materiales.reduce((s,m)=>s+(parseFloat(m.total)||0),0);
                    const lista = materiales.map(m=>`• ${m.material}: ${m.cantidad} — $${parseFloat(m.total||0).toLocaleString("es-MX")} MXN`).join("\n");
                    navigator.clipboard.writeText(`Lista de Materiales\n\n${lista}\n\nTOTAL: $${total.toLocaleString("es-MX")} MXN`);
                    alert("✅ Lista copiada al portapapeles");
                  }} style={{ background: "#55555515", border: "1px solid #55555540", color: "#aaa", borderRadius: 8, padding: "6px 12px", fontSize: 11, cursor: "pointer", fontWeight: 700 }}>
                    📋 Copiar
                  </button>
                </div>
              )}
            </div>
          )}

          {materiales.length > 0 && (
            <div>
              {/* Tabla de materiales */}
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
              </div>

              {/* Botones de acción */}
              <div style={{ display: "flex", gap: 10, marginTop: 14, flexWrap: "wrap" }}>
                <button
                  onClick={() => {
                    const sep = "━".repeat(30);
                    const lineas = [`LISTA DE MATERIALES - EnKaje Pro`, sep];
                    materiales.forEach(m => lineas.push(`• ${m.material} — ${m.cantidad} — $${(m.total||0).toLocaleString("es-MX")} MXN${m.notas?" ("+m.notas+")":""}`));
                    const total = materiales.reduce((s,m)=>s+(parseFloat(m.total)||0),0);
                    lineas.push(sep, `TOTAL: $${total.toLocaleString("es-MX")} MXN`, "enkajepro.com");
                    window.open("https://wa.me/?text=" + encodeURIComponent(lineas.join("\n")), "_blank");
                  }}
                  style={{ background: "#25D366", color: "#fff", border: "none", borderRadius: 10, padding: "9px 16px", fontWeight: 700, fontSize: 12, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
                  💬 Enviar por WhatsApp
                </button>
                <button
                  onClick={() => {
                    const lineas = ["Material,Cantidad,Precio Unitario,Total,Notas"];
                    materiales.forEach(m => lineas.push(`"${m.material}","${m.cantidad}",${m.precio_unitario||0},${m.total||0},"${m.notas||""}"`));
                    const csv = lineas.join("\n");
                    const blob = new Blob([csv], {type:"text/csv"});
                    const a = document.createElement("a");
                    a.href = URL.createObjectURL(blob);
                    a.download = "materiales_enkaje.csv";
                    a.click();
                  }}
                  style={{ background: "transparent", color: "#4caf50", border: "1.5px solid #4caf50", borderRadius: 10, padding: "9px 16px", fontWeight: 700, fontSize: 12, cursor: "pointer" }}>
                  📊 Descargar CSV
                </button>
                <button
                  onClick={() => {
                    const w = window.open("","_blank");
                    const total = materiales.reduce((s,m)=>s+(parseFloat(m.total)||0),0);
                    const filas = materiales.map((m,i)=>`<tr style="background:${i%2===0?"#fff":"#f9f7f3"}"><td style="padding:8px 12px;font-size:13px;border-bottom:1px solid #e8e0d0">${m.material}</td><td style="padding:8px 12px;font-size:12px;color:#666;border-bottom:1px solid #e8e0d0">${m.cantidad}</td><td style="padding:8px 12px;font-size:12px;border-bottom:1px solid #e8e0d0">$${(m.precio_unitario||0).toLocaleString("es-MX")}</td><td style="padding:8px 12px;font-size:13px;font-weight:700;color:#8B6914;border-bottom:1px solid #e8e0d0">$${(m.total||0).toLocaleString("es-MX")}</td><td style="padding:8px 12px;font-size:11px;color:#999;border-bottom:1px solid #e8e0d0">${m.notas||""}</td></tr>`).join("");
                    w.document.write(`<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Materiales EnKaje Pro</title><link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400;600;700&display=swap" rel="stylesheet"><style>*{box-sizing:border-box;margin:0;padding:0}body{font-family:'Inter',sans-serif;padding:40px;max-width:780px;margin:0 auto}.logo{font-family:'Playfair Display',serif;font-size:24px;color:#d4af37;font-weight:700;letter-spacing:3px}h2{font-size:14px;color:#8B6914;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin:20px 0 12px}table{width:100%;border-collapse:collapse;border:1px solid #e8e0d0;border-radius:8px;overflow:hidden}th{background:#f8f4ed;padding:10px 12px;font-size:11px;font-weight:700;color:#8B6914;letter-spacing:2px;text-transform:uppercase;text-align:left;border-bottom:2px solid #d4af37}.total-row{background:#1a1208!important}.total-row td{color:#d4af37!important;font-size:15px!important;font-weight:900!important;padding:12px!important}footer{margin-top:24px;padding-top:14px;border-top:1px solid #e8e0d0;display:flex;justify-content:space-between;font-size:11px;color:#bbb}@media print{body{-webkit-print-color-adjust:exact;print-color-adjust:exact}}</style></head><body><div class="logo">EnKaje Pro</div><h2>📦 Lista de Materiales</h2><table><thead><tr><th>Material</th><th>Cantidad</th><th>P. Unitario</th><th>Total</th><th>Notas</th></tr></thead><tbody>${filas}<tr class="total-row"><td colspan="3">TOTAL MATERIALES</td><td>$${total.toLocaleString("es-MX")} MXN</td><td></td></tr></tbody></table><footer><span>enkajepro.com · Monterrey, NL</span><span>Generado ${new Date().toLocaleDateString("es-MX")}</span></footer></body></html>`);
                    w.document.close();
                    w.print();
                  }}
                  style={{ background: "linear-gradient(135deg,#d4af37,#f0c84a)", color: "#000", border: "none", borderRadius: 10, padding: "9px 16px", fontWeight: 900, fontSize: 12, cursor: "pointer" }}>
                  🖨️ Imprimir lista
                </button>
                <button
                  onClick={() => { setMateriales([]); setMaterialesMsg(""); }}
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
    // Restaurar tab del historial si existe
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
        // Si no hay estado, ir a bienvenida en lugar de salir
        history.pushState({ tab: "bienvenida" }, "", window.location.pathname);
        setTab("bienvenida");
      }
    };
    window.addEventListener("popstate", handlePop);
    return () => window.removeEventListener("popstate", handlePop);
  }, [screen]);
  const [tipoForm, setTipoForm] = useState("cocina");
  // Limpiar materiales cuando cambia el tipo de proyecto
  const cambiarTipoForm = (tipo) => { setTipoForm(tipo); setMateriales([]); setMaterialesMsg(""); };
  const [formCocina, setFormCocina] = useState(FORM_INIT);
  const [formCloset, setFormCloset] = useState(FORM_CLOSET_INIT);
  const [formPuerta, setFormPuerta] = useState(FORM_PUERTA_INIT);
  const [formMueble, setFormMueble] = useState(FORM_MUEBLE_INIT);
  const [formBano, setFormBano] = useState(FORM_BANO_INIT);
  const [leads, setLeads] = useState([]);
  const [proyectos, setProyectos] = useState([]);
  const [leadSel, setLeadSel] = useState(null);
  const [proyectoSel, setProyectoSel] = useState(null);
  const [talleresMem, setTalleresMem] = useState([]);
  const [tallerSel, setTallerSel] = useState(null);
  const [showNuevoTaller, setShowNuevoTaller] = useState(false);
  const [confirmModal, setConfirmModal] = useState(null); // { msg, onOk }
  const [nuevoTaller, setNuevoTaller] = useState({ nombre: "", email: "", telefono: "", especialidad: "", zona: "", municipio: "", plan: "basico", fecha_vencimiento: "", notas: "", slug: "" });
  const [tallerMsg, setTallerMsg] = useState("");
  const [renderPrompt, setRenderPrompt] = useState("");
  const [renderImg, setRenderImg] = useState(null);
  const [renderLoading, setRenderLoading] = useState(false);
  const [renderMsg, setRenderMsg] = useState("");
  const [socialFoto, setSocialFoto] = useState(null);
  const [socialCaption, setSocialCaption] = useState("");
  const [socialLoading, setSocialLoading] = useState(false);
  const [iaTab, setIaTab] = useState("asistente"); // asistente | renders | social
  const [chatInput, setChatInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [chatLoading, setChatLoading] = useState(false);
  const [editTaller, setEditTaller] = useState(null); // datos legales del taller en edición
  const [editInfo, setEditInfo] = useState(null);   // info básica del taller en edición
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState("");
  const [savedMsg, setSavedMsg] = useState("");
  const [materiales, setMateriales] = useState([]);
  const [materialesLoading, setMaterialesLoading] = useState(false);
  const [materialesMsg, setMaterialesMsg] = useState("");
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

  const getForm = () => tipoForm === "cocina" ? formCocina : tipoForm === "closet" ? formCloset : tipoForm === "puerta" ? formPuerta : tipoForm === "panel" ? formPanel : tipoForm === "bano" ? formBano : formMueble;
  // Cargar proyecto en su formulario correspondiente
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
    if (tipo === "cocina") setFormCocina(prev => ({...prev, ...datos}));
    else if (tipo === "closet") setFormCloset(prev => ({...prev, ...datos}));
    else if (tipo === "puerta") setFormPuerta(prev => ({...prev, ...datos}));
    else if (tipo === "panel") setFormPanel(prev => ({...prev, ...datos}));
    else setFormMueble(prev => ({...prev, ...datos}));
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
    if (tipo === "cocina") setFormCocina(prev => ({...prev, ...datos}));
    else if (tipo === "closet") setFormCloset(prev => ({...prev, ...datos}));
    else if (tipo === "puerta") setFormPuerta(prev => ({...prev, ...datos}));
    else if (tipo === "panel") setFormPanel(prev => ({...prev, ...datos}));
    else setFormMueble(prev => ({...prev, ...datos}));
  }

  // Función para cambiar tab y guardar en historial
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
    else if (tipoForm === "bano")   setFormBano(p => ({...p, [key]: val}));
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
    console.log("Supabase signup response:", JSON.stringify(data));
    if (data.user && data.session) {
      setToken(data.session.access_token);
      sessionStorage.setItem("enkaje_token", data.session.access_token);
      sessionStorage.setItem("enkaje_user", JSON.stringify(data.user));
      sessionStorage.setItem("enkaje_role", data.user?.user_metadata?.role || "cliente");
      setUser(data.user);
      const r = data.user?.user_metadata?.role || loginForm.role || "cliente";
      setRole(r); setScreen("app"); setTab("bienvenida");
      sessionStorage.setItem("enkaje_tab", "bienvenida");
      history.replaceState({ tab: "bienvenida" }, "", window.location.pathname);
   } else if (data.user && !data.session) {
      setLoginError("✅ Cuenta creada. Inicia sesión con tu correo y contraseña.");
    } else {
      const msg = data.error_description || data.message || data.msg || JSON.stringify(data);
      if (msg.includes("Signups not allowed") || msg.includes("signup") || msg.includes("disabled")) {
        setLoginError("⚠️ Registro desactivado en Supabase. Ve a: Authentication → Settings → activa Enable Email Signup");
      } else if (msg.includes("already registered")) {
        setLoginError("Este correo ya tiene cuenta. Inicia sesion.");
      } else {
        setLoginError("Error Supabase: " + msg);
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
      // Construir payload solo con valores que tienen contenido
      const raw = {
        user_id:            user?.id || null,
        user_email:         user?.email || null,
        estado:             "nuevo",
        created_at:         new Date().toISOString(),
        tipo_proyecto:      val(f.tipo_proyecto) || "cocina",
        nombre:             val(f.nombre),
        telefono:           val(f.telefono),
        correo:             val(f.correo),
        direccion:          val(f.direccion),
        fecha:              val(f.fecha),
        atencion_por:       val(f.atencion_por),
        largo:              val(f.largo),
        altura:             val(f.altura),
        profundidad:        val(f.profundidad),
        area:               val(f.area),
        ancho:              val(f.ancho),
        alto:               val(f.alto),
        grosor_puerta:      val(f.grosor_puerta),
        cantidad:           val(f.cantidad),
        medidas_isla:       val(f.medidas_isla),
        altura_superiores:  val(f.altura_superiores),
        color_principal:    val(f.color_principal),
        color_secundario:   val(f.color_secundario),
        color_cubierta:     val(f.color_cubierta),
        textura:            val(f.textura),
        medidas_electro:    val(f.medidas_electro),
        observaciones:      val(f.observaciones),
        materiales_solicitados: val(f.materiales_solicitados),
        comentarios_tecnicos:   val(f.comentarios_tecnicos),
        nivel_calidad:      val(f.nivel_calidad),
        precio_fabricacion: val(f.precio_fabricacion),
        precio_instalacion: val(f.precio_instalacion),
        precio_cubierta:    val(f.precio_cubierta),
        precio_herrajes:    val(f.precio_herrajes),
        precio_otros:       val(f.precio_otros),
        incluye:            val(f.incluye),
        no_incluye:         val(f.no_incluye),
        tiempo_entrega:     val(f.tiempo_entrega),
        anticipo:           val(f.anticipo),
        pago_entrega:       val(f.pago_entrega),
        pago_final:         val(f.pago_final),
        garantia:           val(f.garantia),
        tipo_cocina:        arr(f.tipo_cocina)  || null,
        tipo_closet:        arr(f.tipo_closet)  || null,
        tipo_puerta:        arr(f.tipo_puerta)  || null,
        tipo_mueble:        arr(f.tipo_mueble)  || null,
        estilo:             arr(f.estilo)        || null,
        material:           arr(f.material)      || null,
        grosor:             arr(f.grosor)         || null,
        tipo_acabado:       arr(f.tipo_acabado)  || null,
        tipo_puertas:       arr(f.tipo_puertas)  || null,
        jaladeras:          arr(f.jaladeras)     || null,
        bisagras:           arr(f.bisagras)      || null,
        correderas:         arr(f.correderas)    || null,
        accesorios:         arr(f.accesorios)    || null,
        accesorios_closet:  arr(f.accesorios_closet)  || null,
        accesorios_mueble:  arr(f.accesorios_mueble)  || null,
        material_cubierta:  arr(f.material_cubierta)  || null,
        tarja:              arr(f.tarja)         || null,
        griferia:           arr(f.griferia)      || null,
        electrodomesticos:  arr(f.electrodomesticos)  || null,
        iluminacion:        arr(f.iluminacion)   || null,
        tipo_marco:         arr(f.tipo_marco)    || null,
        herrajes_puerta:    arr(f.herrajes_puerta) || null,
      };
      // Eliminar nulls — Supabase ignora columnas que no existen si no las mandamos
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
    else console.warn("cargarProyectos:", data);
  }

  async function cargarTalleres() {
    const data = await sb("talleres_membresia?order=created_at.desc", { token });
    if (Array.isArray(data)) {
      setTalleresMem(data);
      // Si es taller, setear su propio taller como tallerSel automáticamente
      if (role === "taller" && user?.email) {
        const miTaller = data.find(t => t.email === user.email);
        if (miTaller) setTallerSel(miTaller);
      }
    }
  }

  async function guardarNuevoTaller() {
    setTallerMsg("Guardando...");
    try {
      // Generar contraseña temporal
      const chars = "ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";
      const pass = Array.from({length: 10}, () => chars[Math.floor(Math.random()*chars.length)]).join("") + "!";
      
      await sb("talleres_membresia", { method: "POST", token, body: JSON.stringify({ ...nuevoTaller, estado: "activo", leads_recibidos: 0, proyectos_cerrados: 0, visitas: 0, created_at: new Date().toISOString() }) });
      setTallerMsg("✅ Taller agregado");
      
      const planLabel = nuevoTaller.plan === "premium" ? "Premium $2,999/mes" : nuevoTaller.plan === "pro" ? "Pro $1,499/mes" : "Básico $699/mes";
      
      // Email con credenciales e instrucciones para crear cuenta en Supabase
      const emailBody = [
        `╔════════════════════════════╗`,
        `║      E n K a j e  P R O    ║`,
        `║   Plataforma de Carpintería ║`,
        `╚════════════════════════════╝`,
        ``,
        `🎉 ¡BIENVENIDO, ${nuevoTaller.nombre.toUpperCase()}!`,
        ``,
        `Este es el momento en que tu taller da el salto al siguiente nivel.`,
        ``,
        `Acabas de unirte a la plataforma que está transformando la carpintería`,
        `en Monterrey — y tú eres parte de los primeros en hacerlo.`,
        ``,
        `Con EnKaje Pro vas a:`,
        `✅ Recibir leads directo a tu WhatsApp`,
        `✅ Generar presupuestos profesionales en minutos`,
        `✅ Crear contratos digitales con tu logo`,
        `✅ Darle seguimiento a cada proyecto`,
        `✅ Construir tu reputación con reseñas verificadas`,
        ``,
        `Todo desde tu celular. Sin complicaciones.`,
        ``,
        `━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
        `   TUS CREDENCIALES DE ACCESO`,
        `━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
        `🌐 Plataforma: https://enkajepro.com/app`,
        `📧 Correo: ${nuevoTaller.email}`,
        `🔑 Contraseña temporal: ${pass}`,
        `━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
        ``,
        `CÓMO ENTRAR:`,
        `1. Ve a enkajepro.com/app`,
        `2. Click en "Crear cuenta"`,
        `3. Regístrate con este correo y contraseña`,
        `4. ¡Ya estás dentro!`,
        ``,
        `⚠️ Guarda esta contraseña, cámbiala después de entrar.`,
        ``,
        `━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
        `   TU LINK PERSONAL`,
        `━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
        `🔗 enkajepro.com/taller/${nuevoTaller.slug || "tu-slug"}`,
        ``,
        `Este es tu link único. Compártelo en Facebook, Instagram,`,
        `TikTok y WhatsApp — cada cliente que lo visite puede`,
        `solicitarte una cotización directo a tu teléfono.`,
        ``,
        `Tu plan: ${planLabel}`,
        ``,
        `━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
        ``,
        `Estamos aquí para ayudarte a crecer.`,
        `Cualquier duda escríbenos a hola@enkajepro.com`,
        ``,
        `Con gusto,`,
        `Felipe Santiago`,
        `Fundador · EnKaje Pro`,
        `Monterrey, Nuevo León · enkajepro.com`,
        ``,
        `━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
        `   🚀 PRÓXIMAS FUNCIONES`,
        `━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
        `Esto es solo el comienzo. Muy pronto tendrás acceso a:`,
        ``,
        `⭐ Reseñas verificadas de tus clientes`,
        `📸 Portafolio de fotos de tus proyectos`,
        `🤖 IA que genera renders de diseño para tus clientes`,
        `📊 Dashboard de métricas y ventas`,
        `🗺️ Directorio público de talleres verificados`,
        `💳 Pagos en línea y anticipo digital`,
        ``,
        `Tú y los talleres fundadores tendrán acceso prioritario`,
        `a cada nueva función antes que nadie.`,
        ``,
        `Gracias por confiar en EnKaje Pro. 🙏`,
      ].join("\n");
      
      window.open(`mailto:${nuevoTaller.email}?subject=Bienvenido a EnKaje Pro - Tus credenciales de acceso&body=${encodeURIComponent(emailBody)}`, "_blank");
      
      // Mostrar contraseña generada al admin para que la tenga de respaldo
      setTimeout(() => {
        setTallerMsg(`✅ Guardado · Contraseña generada: ${pass}`);
      }, 500);
      
      setNuevoTaller({ nombre: "", email: "", telefono: "", especialidad: "", zona: "", municipio: "", plan: "basico", fecha_vencimiento: "", notas: "", slug: "" });
      setShowNuevoTaller(false);
      cargarTalleres();
      setTimeout(() => setTallerMsg(""), 10000);
    } catch { setTallerMsg("Error al guardar"); }
  }

  async function actualizarTaller(id, cambios) {
    const res = await sb(`talleres_membresia?id=eq.${id}`, { method: "PATCH", token, body: JSON.stringify(cambios) });
    console.log("PATCH result:", JSON.stringify(res), "id:", id, "cambios:", JSON.stringify(cambios));
    cargarTalleres();
  }

  // Leer parámetro ?legal= del URL al cargar (viene desde el landing)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const legal = params.get("legal");
    if (legal && ["privacidad","terminos","cookies"].includes(legal)) {
      setLegalPage(legal);
      // Limpiar el parámetro del URL sin recargar
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, []);

  useEffect(() => {
    if (screen === "app" && (tab === "leads_portal" || tab === "bienvenida")) cargarLeads();
    if (screen === "app" && (tab === "membresias" || (tab === "bienvenida" && role === "taller") || (tab === "presupuesto" && role === "taller"))) cargarTalleres();
  }, [tab, screen]);

  function compartirFormulario(canal) {
    const f = getForm();
    const arr = v => Array.isArray(v) && v.length ? v.join(", ") : (v || "");
    const tipo = tipoForm==="cocina"?"Cocina Integral":tipoForm==="closet"?"Closet":tipoForm==="puerta"?"Puerta":tipoForm==="bano"?"Baño":"Mueble";
    const sep = "━".repeat(26);
    const lineas = [
      `LEVANTAMIENTO ${tipo.toUpperCase()} - EnKaje Pro`,
      sep,
      `Cliente: ${f.nombre||"---"}`,
      `Tel: ${f.telefono||"---"}`,
      `Fecha: ${f.fecha||"---"}`,
      sep,
    ];
    if (tipoForm==="cocina" && arr(f.tipo_cocina)) lineas.push(`Tipo: ${arr(f.tipo_cocina)}`);
    if (tipoForm==="closet" && arr(f.tipo_closet)) lineas.push(`Tipo: ${arr(f.tipo_closet)}`);
    if (tipoForm==="puerta" && arr(f.tipo_puerta)) lineas.push(`Tipo: ${arr(f.tipo_puerta)}`);
    if (tipoForm==="mueble" && arr(f.tipo_mueble)) lineas.push(`Tipo: ${arr(f.tipo_mueble)}`);
    if (arr(f.estilo))    lineas.push(`Estilo: ${arr(f.estilo)}`);
    if (arr(f.material))  lineas.push(`Material: ${arr(f.material)}`);
    if (f.color_principal) lineas.push(`Color: ${f.color_principal}`);
    if (arr(f.tipo_acabado)) lineas.push(`Acabado: ${arr(f.tipo_acabado)}`);
    if (f.largo||f.altura||f.ancho||f.alto) lineas.push(`Medidas: ${[f.largo,f.altura,f.profundidad,f.ancho,f.alto].filter(Boolean).join(" x ")}`);
    if (f.observaciones) lineas.push(sep, `Obs: ${f.observaciones}`);
    lineas.push(sep, "enkajepro.com · Monterrey");
    const txt = lineas.join("\n");
    const titulo = `Levantamiento ${tipo} - EnKaje Pro`;
    const msg = encodeURIComponent(txt);
    if (canal==="whatsapp")  window.open(`https://wa.me/?text=${msg}`, "_blank");
    if (canal==="email")     window.open(`mailto:?subject=${encodeURIComponent(titulo)}&body=${msg}`, "_blank");
    if (canal==="facebook")  window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent("https://enkajepro.com")}&quote=${msg}`, "_blank");
    if (canal==="messenger") window.open(`https://www.facebook.com/dialog/send?link=${encodeURIComponent("https://enkajepro.com")}&app_id=1401488693436528&redirect_uri=${encodeURIComponent("https://enkajepro.com")}`, "_blank");
    if (canal==="instagram") { navigator.clipboard.writeText(txt); alert("Texto copiado. Pégalo en Instagram."); }
    if (canal==="tiktok")    { navigator.clipboard.writeText(txt); alert("Texto copiado. Pégalo en TikTok."); }
    if (canal==="copiar")    { navigator.clipboard.writeText(txt); alert("Copiado al portapapeles"); }
  }

  function imprimirFormulario() {
    const f = getForm();
    const arr = v => Array.isArray(v) && v.length ? v.join(", ") : (v||"");
    const has  = v => Array.isArray(v) ? v.length > 0 : (v && String(v).trim() !== "");
    const tipo = tipoForm==="cocina"?"Cocina Integral":tipoForm==="closet"?"Closet":tipoForm==="puerta"?"Puerta":"Mueble";
    const icon = tipoForm==="cocina"?"🍳":tipoForm==="closet"?"👔":tipoForm==="puerta"?"🚪":"🛋️";
    const folio = `LV-${Date.now().toString().slice(-6)}`;

    // Solo filas con valor
    const filas = [];
    const add = (l,v) => { if(has(v)) filas.push([l, Array.isArray(v)?v.join(", "):v]); };

    // Específicas por tipo
    if(tipoForm==="cocina"){
      add("Tipo de cocina",f.tipo_cocina); add("Largo total",f.largo); add("Altura",f.altura);
      add("Profundidad",f.profundidad); add("Área aprox.",f.area); add("Medidas isla",f.medidas_isla);
      add("Alt. superiores",f.altura_superiores); add("Cubierta",f.material_cubierta);
      add("Color cubierta",f.color_cubierta); add("Tarja",f.tarja); add("Grifería",f.griferia);
      add("Electrodomésticos",f.electrodomesticos); add("Medidas electro",f.medidas_electro); add("Accesorios",f.accesorios);
    } else if(tipoForm==="closet"){
      add("Tipo de closet",f.tipo_closet); add("Largo / Ancho",f.largo); add("Altura",f.altura);
      add("Profundidad",f.profundidad); add("Área",f.area); add("Accesorios",f.accesorios_closet);
    } else if(tipoForm==="puerta"){
      add("Tipo de puerta",f.tipo_puerta); add("Ancho",f.ancho); add("Alto",f.alto);
      add("Grosor",f.grosor_puerta); add("Cantidad",f.cantidad); add("Marco",f.tipo_marco); add("Herrajes",f.herrajes_puerta);
    } else {
      add("Tipo de mueble",f.tipo_mueble); add("Largo / Ancho",f.largo); add("Alto",f.alto);
      add("Profundidad",f.profundidad); add("Cantidad",f.cantidad); add("Accesorios",f.accesorios_mueble);
    }
    // Comunes
    add("Estilo",f.estilo); add("Material",f.material); add("Grosor",f.grosor);
    add("Color principal",f.color_principal); add("Color secundario",f.color_secundario);
    add("Acabado",f.tipo_acabado); add("Textura",f.textura);
    add("Tipo puertas",f.tipo_puertas); add("Jaladeras",f.jaladeras);
    add("Bisagras",f.bisagras); add("Correderas",f.correderas); add("Iluminación",f.iluminacion);

    const filasHTML = filas.map(([l,v],i) =>
      `<tr><td class="td-l">${l}</td><td class="td-v">${v}</td></tr>`
    ).join("");

    const tallerHTML = (f.materiales_solicitados||f.nivel_calidad||f.comentarios_tecnicos) ? `
      <div class="card" style="margin-top:18px;border-color:#00bcd430">
        <div class="ch" style="background:#0a1a20;color:#00bcd4">🏭 NOTAS DEL TALLER</div>
        <div class="cb">
          ${f.nivel_calidad?`<p class="row"><b>Nivel:</b> ${f.nivel_calidad}</p>`:""}
          ${f.materiales_solicitados?`<p class="row"><b>Materiales:</b> ${f.materiales_solicitados}</p>`:""}
          ${f.comentarios_tecnicos?`<p class="row"><b>Técnico:</b> ${f.comentarios_tecnicos}</p>`:""}
        </div>
      </div>` : "";

    const w = window.open("","_blank");
    w.document.write(`<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8">
<title>Levantamiento ${tipo} · EnKaje Pro</title>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet">
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Inter',sans-serif;background:#070708;color:#e8e0d0;line-height:1.6}
.page{max-width:780px;margin:0 auto;padding:40px}
.hdr{display:flex;justify-content:space-between;align-items:flex-start;padding-bottom:20px;border-bottom:2px solid #d4af37;margin-bottom:24px}
.logo{font-family:'Playfair Display',serif;font-size:26px;font-weight:900;color:#d4af37;letter-spacing:3px}
.logo-s{font-size:9px;color:#555;letter-spacing:5px;text-transform:uppercase;margin-top:4px}
.doc-r{text-align:right}
.doc-t{font-family:'Playfair Display',serif;font-size:12px;font-weight:700;color:#8B6914;text-transform:uppercase;letter-spacing:2px}
.folio{font-size:11px;color:#555;margin-top:3px}
.banner{background:linear-gradient(135deg,#1a1208,#2a1f08);border-left:5px solid #d4af37;border-radius:0 12px 12px 0;padding:16px 22px;margin-bottom:20px}
.bt{font-size:10px;color:#d4af3780;letter-spacing:4px;text-transform:uppercase;margin-bottom:4px}
.bn{font-family:'Playfair Display',serif;font-size:22px;color:#d4af37;font-weight:700}
.g2{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:18px}
.card{border:1px solid #1a1a12;border-radius:12px;overflow:hidden;margin-bottom:18px}
.ch{background:#0f0f0a;border-bottom:1px solid #1a1a12;padding:10px 16px;font-size:10px;font-weight:700;color:#d4af37;letter-spacing:3px;text-transform:uppercase}
.cb{padding:14px 16px}
.row{font-size:12px;color:#aaa;padding:3px 0;line-height:1.6}
.row b{color:#e8e0d0}
table{width:100%;border-collapse:collapse}
.td-l{padding:8px 14px;color:#666;font-size:12px;border-bottom:1px solid #1a1a12;width:42%;font-weight:500}
.td-r-head{background:#0f0f0a}
.td-v{padding:8px 14px;color:#e8e0d0;font-size:12px;border-bottom:1px solid #1a1a12;font-weight:600}
tr:last-child .td-l, tr:last-child .td-v{border-bottom:none}
tr:nth-child(even){background:#0a0a08}
.obs{background:#0f0f0a;border:1px solid #1a1a12;border-radius:10px;padding:12px 16px;font-size:12px;color:#888;font-style:italic;margin-top:16px;line-height:1.7}
.fir{display:grid;grid-template-columns:1fr 1fr;gap:48px;margin-top:40px;padding-top:20px;border-top:1px solid #1a1a12}
.fi{text-align:center}
.fl{height:1px;background:#d4af3740;margin-bottom:8px}
.fn{font-size:13px;font-weight:700;color:#e8e0d0}
.fc{font-size:10px;color:#555;letter-spacing:1px;text-transform:uppercase;margin-top:3px}
.ftr{margin-top:24px;padding-top:14px;border-top:1px solid #1a1a12;display:flex;justify-content:space-between;align-items:center}
.flogo{font-family:'Playfair Display',serif;font-size:14px;color:#d4af37;font-weight:700;letter-spacing:2px}
.finfo{font-size:10px;color:#333;text-align:right;line-height:1.6}
@media print{
  body{background:#fff;color:#1a1a1a;-webkit-print-color-adjust:exact;print-color-adjust:exact}
  .page{padding:28px}
  .banner{background:#1a1208!important}
  .ch{background:#f8f4ed!important;color:#8B6914!important;border-color:#e8e0d0!important}
  .card{border-color:#e8e0d0!important}
  .td-l{color:#666!important;border-color:#e8e0d0!important}
  .td-v{color:#1a1a1a!important;border-color:#e8e0d0!important}
  tr:nth-child(even){background:#f9f7f3!important}
  .obs{background:#f8f8f8!important;border-color:#e8e0d0!important;color:#444!important}
  .ftr{border-color:#e8e0d0!important}
  .fl{background:#333!important}
  .fn{color:#1a1a1a!important}
}
</style></head><body><div class="page">
<div class="hdr">
  <div><div class="logo">EnKaje Pro</div><div class="logo-s">Levantamiento de Proyecto · Monterrey</div></div>
  <div class="doc-r"><div class="doc-t">Levantamiento</div><div class="folio">Folio: ${folio}</div><div class="folio">Fecha: ${f.fecha||new Date().toLocaleDateString("es-MX")}</div><div class="folio">Asesor: ${f.atencion_por||"Felipe Santiago"}</div></div>
</div>
<div class="banner">
  <div class="bt">${icon} Tipo de proyecto</div>
  <div class="bn">${tipo.toUpperCase()}</div>
</div>
<div class="g2">
  <div class="card" style="margin-bottom:0">
    <div class="ch">👤 CLIENTE</div>
    <div class="cb">
      ${[["Nombre",f.nombre],["Teléfono",f.telefono],["Correo",f.correo],["Dirección",f.direccion]].filter(([,v])=>v).map(([l,v])=>`<p class="row"><b>${l}:</b> ${v}</p>`).join("")}
    </div>
  </div>
  <div class="card" style="margin-bottom:0">
    <div class="ch">📋 RESUMEN</div>
    <div class="cb">
      ${[["Tipo",tipo],["Estilo",arr(f.estilo)],["Material",arr(f.material)],["Color",f.color_principal]].filter(([,v])=>v).map(([l,v])=>`<p class="row"><b>${l}:</b> ${v}</p>`).join("")}
    </div>
  </div>
</div>
<div class="card">
  <div class="ch">📐 ESPECIFICACIONES SELECCIONADAS</div>
  <div class="cb" style="padding:0"><table>${filasHTML}</table></div>
</div>
${f.observaciones?`<div class="obs"><b>Observaciones:</b> ${f.observaciones}</div>`:""}
${tallerHTML}
<div class="fir">
  <div class="fi"><div style="height:48px"></div><div class="fl"></div><div class="fn">${f.atencion_por||"Felipe Santiago"}</div><div class="fc">EnKaje Pro · Asesor</div></div>
  <div class="fi"><div style="height:48px"></div><div class="fl"></div><div class="fn">${f.nombre||"Cliente"}</div><div class="fc">Firma de Conformidad</div></div>
</div>
<div class="ftr">
  <div class="flogo">EnKaje Pro</div>
  <div class="finfo">enkajepro.com · Monterrey, Nuevo León, México</div>
</div>
</div><script>window.onload=function(){window.print()}</script></body></html>`);
    w.document.close();
  }


  function imprimirHojaProfesional() {
    const tallerDataPresup = tallerSel;
    const f = getForm();
    const tipoLabel = tipoForm==="cocina"?"Cocina Integral":tipoForm==="closet"?"Closet":tipoForm==="puerta"?"Puerta":"Mueble";
    const tipoIcon  = tipoForm==="cocina"?"🍳":tipoForm==="closet"?"👔":tipoForm==="puerta"?"🚪":"🛋️";
    const total = [f.precio_fabricacion,f.precio_instalacion,f.precio_cubierta,f.precio_herrajes,f.precio_otros].reduce((a,v)=>a+(parseFloat(v)||0),0);
    // Generar detalles del proyecto inline (usando tipoForm de App)
    const detalles = [];
    const addD = (l,v) => { if(v) detalles.push([l, Array.isArray(v)?v.join(", "):v]); };
    if(tipoForm==="cocina"){ addD("Tipo de cocina",f.tipo_cocina); addD("Largo",f.largo); addD("Altura",f.altura); addD("Profundidad",f.profundidad); addD("Área",f.area); addD("Cubierta",f.material_cubierta); addD("Tarja",f.tarja); addD("Electrodomésticos",f.electrodomesticos); addD("Accesorios",f.accesorios); }
    else if(tipoForm==="closet"){ addD("Tipo closet",f.tipo_closet); addD("Largo",f.largo); addD("Altura",f.altura); addD("Profundidad",f.profundidad); addD("Accesorios",f.accesorios_closet); }
    else if(tipoForm==="puerta"){ addD("Tipo puerta",f.tipo_puerta); addD("Ancho",f.ancho); addD("Alto",f.alto); addD("Cantidad",f.cantidad); addD("Marco",f.tipo_marco); addD("Herrajes",f.herrajes_puerta); }
    else { addD("Tipo mueble",f.tipo_mueble); addD("Largo",f.largo); addD("Alto",f.alto); addD("Profundidad",f.profundidad); addD("Cantidad",f.cantidad); addD("Accesorios",f.accesorios_mueble); }
    addD("Estilo",f.estilo); addD("Material",f.material); addD("Color",f.color_principal); addD("Acabado",f.tipo_acabado); addD("Jaladeras",f.jaladeras); addD("Bisagras",f.bisagras);
    const folio = `EP-${Date.now().toString().slice(-6)}`;
    const w = window.open("","_blank");
    if (!w) { alert("Por favor permite las ventanas emergentes para imprimir"); return; }
    const incluyeItems = (f.incluye||"Diseño\nFabricación\nTransporte\nInstalación\nAjustes\nLimpieza final").split("\n").filter(Boolean).map(i=>`<li>${i}</li>`).join("");
    const noIncluyeItems = (f.no_incluye||"Plomería\nElectricidad\nAlbañilería\nElectrodomésticos\nCambios post-aprobación").split("\n").filter(Boolean).map(i=>`<li>${i}</li>`).join("");
    const preciosRows = [["Fabricación",f.precio_fabricacion],["Instalación",f.precio_instalacion],["Acabados / Cubierta",f.precio_cubierta],["Herrajes",f.precio_herrajes],["Otros",f.precio_otros]].filter(([,v])=>v&&parseFloat(v)>0).map(([l,v])=>`<tr><td>${l}</td><td>$${parseFloat(v).toLocaleString("es-MX")} MXN</td></tr>`).join("");
    const detallesHTML = detalles.map(([l,v])=>`<div class="di"><span class="dl">${l}</span><span class="dv">${v}</span></div>`).join("");
    const logoHTML = tallerDataPresup?.logo_url && tallerDataPresup?.plan!=="basico" ? `<img src="${window.location.origin}${tallerDataPresup.logo_url}" style="height:60px;width:60px;object-fit:cover;border-radius:50%;margin-bottom:4px" alt="logo" onerror="this.style.display='none'"/>` : "";
    const nombreTaller = tallerDataPresup?.plan!=="basico" && tallerDataPresup?.nombre ? tallerDataPresup.nombre : "EnKaje Pro";
    const subTaller = tallerDataPresup?.plan!=="basico" && tallerDataPresup?.nombre ? "Carpintería · Ebanistería" : "Intermediación · Carpintería · Monterrey";
    w.document.write(`<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><title>Presupuesto EnKaje Pro - ${tipoLabel}</title>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>*{box-sizing:border-box;margin:0;padding:0}body{font-family:'Inter',sans-serif;background:#fff;color:#1a1a1a;line-height:1.6}.page{max-width:800px;margin:0 auto;padding:48px}.hdr{display:flex;justify-content:space-between;align-items:flex-start;padding-bottom:24px;border-bottom:3px solid #d4af37;margin-bottom:28px}.logo{font-family:'Playfair Display',serif;font-size:28px;font-weight:900;color:#d4af37;letter-spacing:3px}.logo-s{font-size:9px;color:#999;letter-spacing:4px;text-transform:uppercase;margin-top:4px}.di-r{text-align:right}.dt{font-family:'Playfair Display',serif;font-size:13px;font-weight:700;color:#8B6914;text-transform:uppercase;letter-spacing:2px}.dn{font-size:11px;color:#999;margin-top:3px}.banner{background:linear-gradient(135deg,#1a1208,#2a1f08);border-left:5px solid #d4af37;border-radius:0 12px 12px 0;padding:18px 24px;margin-bottom:24px}.bt{font-size:10px;color:#d4af3799;letter-spacing:4px;text-transform:uppercase;margin-bottom:6px}.bn{font-family:'Playfair Display',serif;font-size:22px;color:#d4af37;font-weight:700}.g2{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:20px}.card{border:1px solid #e8e0d0;border-radius:10px;overflow:hidden;margin-bottom:20px}.ch{background:#f8f4ed;border-bottom:1px solid #e8e0d0;padding:10px 16px;font-size:10px;font-weight:700;color:#8B6914;letter-spacing:3px;text-transform:uppercase}.cb{padding:14px 16px}.ir{display:flex;justify-content:space-between;padding:5px 0;border-bottom:1px solid #f0ece4;font-size:12px}.ir:last-child{border-bottom:none}.il{color:#999}.iv{color:#1a1a1a;font-weight:600}.dg{display:grid;grid-template-columns:1fr 1fr;gap:6px}.di{display:flex;flex-direction:column;padding:6px 0;font-size:11.5px}.dl{color:#999;font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:1px;margin-bottom:2px}.dv{color:#1a1a1a;font-weight:500}table{width:100%;border-collapse:collapse}table td{padding:9px 14px;font-size:13px;border-bottom:1px solid #f0ece4}table td:last-child{text-align:right;font-weight:600}.tr{background:#1a1208!important}.tr td{color:#d4af37!important;font-size:15px!important;font-weight:900!important;padding:14px!important;border-bottom:none!important}.pg{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px}.pi{background:#f8f4ed;border-radius:8px;padding:12px;text-align:center}.pp{font-size:22px;font-weight:900;color:#8B6914;line-height:1}.pl{font-size:9px;color:#999;text-transform:uppercase;letter-spacing:1px;margin-top:4px}.pm{font-size:12px;font-weight:700;color:#1a1a1a;margin-top:4px}ul{list-style:none;padding:0}ul li{padding:4px 0;font-size:12px;color:#444;display:flex;gap:6px}ul li::before{content:"✓";color:#4caf50;font-weight:900}.no li::before{content:"✕";color:#f44336}.nota{background:#fff8f0;border:1px solid #f0c070;border-radius:8px;padding:12px 16px;font-size:11px;color:#7a5a20;line-height:1.7;margin-bottom:20px}.fir{display:grid;grid-template-columns:1fr 1fr;gap:48px;margin-top:48px;padding-top:24px;border-top:1px solid #e8e0d0}.fi{text-align:center}.fl{height:1px;background:#333;margin-bottom:8px}.fn{font-size:13px;font-weight:700}.fc{font-size:10px;color:#999;text-transform:uppercase;margin-top:3px}.ftr{margin-top:28px;padding-top:16px;border-top:1px solid #e8e0d0;display:flex;justify-content:space-between}.flogo{font-family:'Playfair Display',serif;font-size:14px;color:#d4af37;font-weight:700}.finfo{font-size:10px;color:#bbb;text-align:right}@media print{body{-webkit-print-color-adjust:exact;print-color-adjust:exact}.page{padding:32px}}</style></head><body><div class="page">
<div class="hdr"><div>${logoHTML}<div class="logo">${nombreTaller}</div><div class="logo-s">${subTaller}</div></div><div class="di-r"><div class="dt">Presupuesto Profesional</div><div class="dn">Folio: ${folio}</div><div class="dn">Fecha: ${f.fecha||new Date().toLocaleDateString("es-MX")}</div></div></div>
<div class="banner"><div class="bt">${tipoIcon} Tipo de proyecto</div><div class="bn">${tipoLabel.toUpperCase()}</div></div>
<div class="g2"><div class="card" style="margin-bottom:0"><div class="ch">👤 Datos del Cliente</div><div class="cb"><div class="ir"><span class="il">Nombre</span><span class="iv">${f.nombre||"---"}</span></div><div class="ir"><span class="il">Teléfono</span><span class="iv">${f.telefono||"---"}</span></div><div class="ir"><span class="il">Correo</span><span class="iv">${f.correo||"---"}</span></div><div class="ir"><span class="il">Dirección</span><span class="iv">${f.direccion||"---"}</span></div></div></div><div class="card" style="margin-bottom:0"><div class="ch">⏱️ Tiempo y Garantía</div><div class="cb"><div class="ir"><span class="il">Entrega</span><span class="iv">${f.tiempo_entrega||"---"}</span></div><div class="ir"><span class="il">Garantía</span><span class="iv">${f.garantia||"---"}</span></div></div></div></div>
${detalles.length>0?`<div class="card"><div class="ch">📋 Especificaciones</div><div class="cb"><div class="dg">${detallesHTML}</div></div></div>`:""}
<div class="g2"><div class="card" style="margin-bottom:0"><div class="ch">✅ Incluye</div><div class="cb"><ul>${incluyeItems}</ul></div></div><div class="card" style="margin-bottom:0"><div class="ch">❌ No Incluye</div><div class="cb"><ul class="no">${noIncluyeItems}</ul></div></div></div>
<div class="card" style="margin-top:20px"><div class="ch">💰 Desglose de Precios</div><div class="cb" style="padding:0"><table>${preciosRows}<tr class="tr"><td>TOTAL DEL PROYECTO</td><td>$${total.toLocaleString("es-MX")} MXN</td></tr></table></div></div>
<div class="card"><div class="ch">💳 Forma de Pago</div><div class="cb"><div class="pg"><div class="pi"><div class="pp">${f.anticipo||60}%</div><div class="pl">Anticipo inicial</div><div class="pm">$${(total*parseFloat(f.anticipo||60)/100).toLocaleString("es-MX")} MXN</div></div><div class="pi"><div class="pp">${f.pago_entrega||30}%</div><div class="pl">Antes instalación</div><div class="pm">$${(total*parseFloat(f.pago_entrega||30)/100).toLocaleString("es-MX")} MXN</div></div><div class="pi"><div class="pp">${f.pago_final||10}%</div><div class="pl">Contra entrega</div><div class="pm">$${(total*parseFloat(f.pago_final||10)/100).toLocaleString("es-MX")} MXN</div></div></div></div></div>
${f.observaciones?`<div class="card"><div class="ch">📝 Observaciones</div><div class="cb"><p style="font-size:12px;color:#444;font-style:italic">${f.observaciones}</p></div></div>`:""}
<div class="nota"><b>NOTA:</b> Este presupuesto tiene vigencia de 15 días. EnKaje Pro actúa como intermediario; la ejecución es responsabilidad del taller.</div>
<div class="fir"><div class="fi"><div style="height:50px"></div><div class="fl"></div><div class="fn">${f.atencion_por||"Felipe Santiago"}</div><div class="fc">EnKaje Pro · Asesor</div></div><div class="fi"><div style="height:50px"></div><div class="fl"></div><div class="fn">${f.nombre||"Cliente"}</div><div class="fc">Firma de Aprobación</div></div></div>
<div class="ftr"><div class="flogo">EnKaje Pro</div><div class="finfo">enkajepro.com · Monterrey, NL<br>Folio: ${folio}</div></div>
</div><script>window.onload=function(){window.print()}</script></body></html>`);
    w.document.close();
  }

  function generarContrato(tallerData) {
    const f = getForm();
    const tipo = tipoForm==="cocina"?"Cocina Integral":tipoForm==="closet"?"Closet":tipoForm==="puerta"?"Puerta":"Mueble";
    const icon = tipoForm==="cocina"?"🍳":tipoForm==="closet"?"👔":tipoForm==="puerta"?"🚪":"🛋️";
    const folio = `CT-${Date.now().toString().slice(-6)}`;
    const fecha = new Date().toLocaleDateString("es-MX", {day:"2-digit", month:"long", year:"numeric"});
    const arr = v => Array.isArray(v)&&v.length ? v.join(", ") : (v||"");
    const total = [f.precio_fabricacion,f.precio_instalacion,f.precio_cubierta,f.precio_herrajes,f.precio_otros].reduce((a,v)=>a+(parseFloat(v)||0),0);
    const anticipo = total * parseFloat(f.anticipo||60) / 100;
    const antesInst = total * parseFloat(f.pago_entrega||30) / 100;
    const contraEntrega = total * parseFloat(f.pago_final||10) / 100;

    // Datos del taller según plan
    const planBasico = !tallerData || tallerData?.plan === "basico";
    const tallerNombre = tallerData?.nombre_legal || tallerData?.nombre || "Taller de Carpintería";
    const tallerRep = tallerData?.representante || tallerData?.atencion_por || f.atencion_por || "Felipe Santiago";
    const tallerRFC = tallerData?.rfc || "";
    const tallerDir = tallerData?.direccion_fiscal || tallerData?.zona || "Monterrey, Nuevo León";
    const tallerTel = tallerData?.telefono_legal || tallerData?.telefono || "";
    const tallerCorreo = tallerData?.correo_legal || tallerData?.email || "";
    const garantia = tallerData?.garantia_default || f.garantia || "6 meses en instalación y herrajes";
    const termExtra = tallerData?.terminos_extra || "";
    const colorTaller = (tallerData?.plan==="premium" && tallerData?.color_marca) ? tallerData.color_marca : "#d4af37";

    const especificaciones = [];
    const addE = (l,v) => { if(v&&String(v).trim()) especificaciones.push([l,Array.isArray(v)?v.join(", "):v]); };
    if(tipoForm==="cocina"){ addE("Tipo de cocina",f.tipo_cocina); addE("Largo",f.largo); addE("Altura",f.altura); addE("Profundidad",f.profundidad); addE("Cubierta",f.material_cubierta); addE("Tarja",f.tarja); addE("Electrodomésticos",f.electrodomesticos); addE("Accesorios",f.accesorios); }
    else if(tipoForm==="closet"){ addE("Tipo de closet",f.tipo_closet); addE("Largo",f.largo); addE("Altura",f.altura); addE("Profundidad",f.profundidad); addE("Accesorios",f.accesorios_closet); }
    else if(tipoForm==="puerta"){ addE("Tipo de puerta",f.tipo_puerta); addE("Medidas",`${f.ancho||"?"} x ${f.alto||"?"}`); addE("Cantidad",f.cantidad); addE("Marco",f.tipo_marco); addE("Herrajes",f.herrajes_puerta); }
    else { addE("Tipo de mueble",f.tipo_mueble); addE("Medidas",`${f.largo||"?"} x ${f.alto||"?"} x ${f.profundidad||"?"}`); addE("Cantidad",f.cantidad); addE("Accesorios",f.accesorios_mueble); }
    addE("Estilo",f.estilo); addE("Material",f.material); addE("Grosor",f.grosor);
    addE("Color principal",f.color_principal); addE("Color secundario",f.color_secundario);
    addE("Acabado",f.tipo_acabado); addE("Jaladeras",f.jaladeras); addE("Bisagras",f.bisagras);
    addE("Iluminación",f.iluminacion);

    const especHTML = especificaciones.map(([l,v],i)=>`<tr style="background:${i%2===0?"#fff":"#f9f7f3"}"><td style="padding:7px 14px;font-size:12px;color:#666;border-bottom:1px solid #ede9e0;width:38%">${l}</td><td style="padding:7px 14px;font-size:12px;font-weight:600;border-bottom:1px solid #ede9e0">${v}</td></tr>`).join("");

    const w = window.open("","_blank");
    w.document.write(`<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8">
<title>Contrato ${tipo} · ${folio}</title>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Inter',sans-serif;background:#fff;color:#1a1a1a;font-size:13px;line-height:1.6}
.page{max-width:800px;margin:0 auto;padding:44px}
.hdr{display:flex;justify-content:space-between;align-items:flex-start;padding-bottom:20px;border-bottom:3px solid ${colorTaller};margin-bottom:24px}
.logo{font-family:'Playfair Display',serif;font-size:26px;font-weight:900;color:${colorTaller};letter-spacing:3px}
.logo-s{font-size:9px;color:#999;letter-spacing:5px;text-transform:uppercase;margin-top:4px}
.doc-r{text-align:right}
.doc-t{font-family:'Playfair Display',serif;font-size:13px;font-weight:700;color:#555;text-transform:uppercase;letter-spacing:2px}
.folio{font-size:11px;color:#999;margin-top:3px}
.banner{background:linear-gradient(135deg,#1a1208,#2a1f08);border-left:5px solid ${colorTaller};border-radius:0 12px 12px 0;padding:16px 22px;margin-bottom:22px}
.bt{font-size:10px;color:${colorTaller}99;letter-spacing:4px;text-transform:uppercase;margin-bottom:4px}
.bn{font-family:'Playfair Display',serif;font-size:20px;color:${colorTaller};font-weight:700}
.partes{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:20px}
.card{border:1px solid #e8e0d0;border-radius:10px;overflow:hidden;margin-bottom:16px}
.ch{background:#f8f4ed;border-bottom:1px solid #e8e0d0;padding:8px 14px;font-size:10px;font-weight:700;color:#8B6914;letter-spacing:3px;text-transform:uppercase}
.cb{padding:12px 14px}
.row{font-size:12px;padding:3px 0;border-bottom:1px solid #f5f0ea}
.row:last-child{border-bottom:none}
.row b{color:#555;display:inline-block;min-width:110px}
table{width:100%;border-collapse:collapse;border:1px solid #e8e0d0;border-radius:8px;overflow:hidden}
.total-row{background:#1a1208!important}
.total-row td{color:${colorTaller}!important;font-size:15px!important;font-weight:900!important;padding:12px 14px!important;border-bottom:none!important}
.pagos{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin-bottom:16px}
.pago{background:#f8f4ed;border-radius:8px;padding:12px;text-align:center}
.pago-p{font-size:20px;font-weight:900;color:#8B6914;line-height:1}
.pago-l{font-size:9px;color:#999;text-transform:uppercase;letter-spacing:1px;margin-top:3px}
.pago-m{font-size:12px;font-weight:700;color:#1a1a1a;margin-top:3px}
.clausulas{counter-reset:cl}
.clausula{counter-increment:cl;margin-bottom:14px;padding-left:24px;position:relative}
.clausula::before{content:counter(cl)".";position:absolute;left:0;color:${colorTaller};font-weight:700;font-size:13px}
.clausula-t{font-weight:700;color:#1a1a1a;margin-bottom:3px;font-size:13px}
.clausula-b{color:#555;font-size:12px;line-height:1.7}
.fir{display:grid;grid-template-columns:1fr 1fr;gap:48px;margin-top:40px;padding-top:20px;border-top:1px solid #e8e0d0}
.fi{text-align:center}
.fl{height:1px;background:#333;margin-bottom:8px}
.fn{font-size:13px;font-weight:700}
.fc{font-size:10px;color:#999;letter-spacing:1px;text-transform:uppercase;margin-top:3px}
.ftr{margin-top:24px;padding-top:14px;border-top:1px solid #e8e0d0;display:flex;justify-content:space-between;align-items:center}
.flogo{font-family:'Playfair Display',serif;font-size:13px;color:${colorTaller};font-weight:700;letter-spacing:2px}
.finfo{font-size:10px;color:#bbb;text-align:right;line-height:1.5}
.badge-enkaje{font-size:9px;color:#bbb;background:#f8f8f8;border:1px solid #e8e0d0;border-radius:4px;padding:2px 6px}
@media print{body{-webkit-print-color-adjust:exact;print-color-adjust:exact}.page{padding:32px}}
</style></head><body><div class="page">

<div class="hdr">
  <div>
    ${planBasico 
      ? `<div class="logo">EnKaje Pro</div><div class="logo-s">Intermediación · Carpintería</div>` 
      : tallerData?.logo_url 
        ? `<img src="${window.location.origin}${tallerData.logo_url}" style="height:70px;width:70px;object-fit:cover;border-radius:50%;border:2px solid ${colorTaller}" alt="${tallerNombre}" onerror="this.style.display='none'"/><div class="logo" style="margin-top:6px">${tallerNombre}</div><div class="logo-s">${tallerDir}</div>`
        : `<div class="logo">${tallerNombre}</div><div class="logo-s">${tallerDir}</div>`
    }
  </div>
  <div class="doc-r">
    <div class="doc-t">Contrato de Fabricación</div>
    <div class="folio">Folio: ${folio}</div>
    <div class="folio">Fecha: ${fecha}</div>
    ${planBasico ? "" : `<div class="folio" style="margin-top:4px"><span class="badge-enkaje">via EnKaje Pro</span></div>`}
  </div>
</div>

<div class="banner">
  <div class="bt">${icon} Objeto del contrato</div>
  <div class="bn">Fabricación e Instalación de ${tipo.toUpperCase()}</div>
</div>

<div class="partes">
  <div class="card" style="margin-bottom:0">
    <div class="ch">🏭 PRESTADOR DE SERVICIOS</div>
    <div class="cb">
      <div class="row"><b>Nombre:</b> ${tallerNombre}</div>
      ${tallerRFC?`<div class="row"><b>RFC:</b> ${tallerRFC}</div>`:""}
      ${tallerRep?`<div class="row"><b>Representante:</b> ${tallerRep}</div>`:""}
      ${tallerTel?`<div class="row"><b>Teléfono:</b> ${tallerTel}</div>`:""}
      ${tallerCorreo?`<div class="row"><b>Correo:</b> ${tallerCorreo}</div>`:""}
      <div class="row"><b>Domicilio:</b> ${tallerDir}</div>
    </div>
  </div>
  <div class="card" style="margin-bottom:0">
    <div class="ch">👤 CLIENTE</div>
    <div class="cb">
      <div class="row"><b>Nombre:</b> ${f.nombre||"---"}</div>
      <div class="row"><b>Teléfono:</b> ${f.telefono||"---"}</div>
      ${f.correo?`<div class="row"><b>Correo:</b> ${f.correo}</div>`:""}
      <div class="row"><b>Domicilio obra:</b> ${f.direccion||"---"}</div>
    </div>
  </div>
</div>

${especificaciones.length>0 ? `
<div class="card">
  <div class="ch">📐 ESPECIFICACIONES DEL PROYECTO</div>
  <div class="cb" style="padding:0"><table>${especHTML}</table></div>
</div>` : ""}

${total>0 ? `
<div class="card">
  <div class="ch">💰 PRECIO TOTAL Y FORMA DE PAGO</div>
  <div class="cb" style="padding:0">
    <table>
      ${[["Fabricación",f.precio_fabricacion],["Instalación",f.precio_instalacion],["Acabados / Cubierta",f.precio_cubierta],["Herrajes",f.precio_herrajes],["Otros",f.precio_otros]].filter(([,v])=>v&&parseFloat(v)>0).map(([l,v])=>`<tr><td style="padding:7px 14px;color:#666;border-bottom:1px solid #ede9e0">${l}</td><td style="padding:7px 14px;font-weight:600;text-align:right;border-bottom:1px solid #ede9e0">$${parseFloat(v).toLocaleString("es-MX")} MXN</td></tr>`).join("")}
      <tr class="total-row"><td style="padding:12px 14px">TOTAL</td><td style="padding:12px 14px;text-align:right">$${total.toLocaleString("es-MX")} MXN</td></tr>
    </table>
  </div>
</div>
<div class="pagos">
  <div class="pago"><div class="pago-p">${f.anticipo||60}%</div><div class="pago-l">Anticipo al firmar</div><div class="pago-m">$${anticipo.toLocaleString("es-MX")} MXN</div></div>
  <div class="pago"><div class="pago-p">${f.pago_entrega||30}%</div><div class="pago-l">Antes de instalación</div><div class="pago-m">$${antesInst.toLocaleString("es-MX")} MXN</div></div>
  <div class="pago"><div class="pago-p">${f.pago_final||10}%</div><div class="pago-l">Contra entrega</div><div class="pago-m">$${contraEntrega.toLocaleString("es-MX")} MXN</div></div>
</div>` : ""}

<div class="card">
  <div class="ch">📋 CLÁUSULAS Y CONDICIONES</div>
  <div class="cb">
    <div class="clausulas">
      <div class="clausula">
        <div class="clausula-t">Descripción y objeto del contrato</div>
        <div class="clausula-b">El prestador se obliga a fabricar e instalar ${`un(a) ${tipo}`} conforme a las especificaciones acordadas en este contrato. El trabajo incluye: diseño, fabricación, transporte e instalación en el domicilio indicado por el cliente.</div>
      </div>
      <div class="clausula">
        <div class="clausula-t">Precio acordado y forma de pago</div>
        <div class="clausula-b">El precio total acordado es de <strong>$${total>0?total.toLocaleString("es-MX"):"___,___"} MXN</strong> (${total>0?`${f.anticipo||60}% anticipo al firmar, ${f.pago_entrega||30}% antes de instalación, ${f.pago_final||10}% contra entrega`:"por acordar"}). El anticipo no es reembolsable una vez iniciada la fabricación.</div>
      </div>
      <div class="clausula">
        <div class="clausula-t">Fechas de entrega</div>
        <div class="clausula-b">El prestador se compromete a entregar el proyecto terminado e instalado en un plazo de <strong>${f.tiempo_entrega||"___ días hábiles"}</strong>, contados a partir de la recepción del anticipo acordado. La fecha estimada de entrega es: <strong>${f.fecha_entrega_estimada||"por confirmar"}</strong>.</div>
      </div>
      <div class="clausula">
        <div class="clausula-t">Garantía del trabajo</div>
        <div class="clausula-b">${garantia}. La garantía cubre defectos de fabricación e instalación bajo condiciones normales de uso. Queda excluida la garantía en casos de: mal uso, humedad excesiva, daños por terceros, modificaciones no autorizadas o falta de mantenimiento.</div>
      </div>
      <div class="clausula">
        <div class="clausula-t">Penalizaciones por incumplimiento del prestador</div>
        <div class="clausula-b">Si el prestador no entrega en el plazo acordado sin causa justificada, el cliente podrá: (a) exigir descuento del 2% del total por cada semana de retraso, hasta un máximo del 10%, o (b) rescindir el contrato con devolución total del anticipo si el retraso supera 30 días naturales.</div>
      </div>
      <div class="clausula">
        <div class="clausula-t">Penalizaciones por incumplimiento del cliente</div>
        <div class="clausula-b">Si el cliente no realiza los pagos en los plazos acordados, el prestador podrá suspender la fabricación e instalación hasta recibir el pago. El anticipo no será reembolsable si el cliente cancela el proyecto una vez iniciada la fabricación.</div>
      </div>
      <div class="clausula">
        <div class="clausula-t">Materiales y especificaciones</div>
        <div class="clausula-b">Los materiales especificados son los acordados por ambas partes. Cualquier cambio deberá ser solicitado por escrito y podrá generar ajuste en precio y tiempo de entrega. El prestador utilizará materiales de la calidad especificada o superior.</div>
      </div>
      <div class="clausula">
        <div class="clausula-t">Condiciones del lugar de instalación</div>
        <div class="clausula-b">El cliente deberá tener el lugar de instalación listo (pintura, pisos, electricidad y plomería terminados) al momento acordado. Retrasos ocasionados por estas causas no son responsabilidad del prestador y podrán generar costos adicionales de movilización.</div>
      </div>
      <div class="clausula">
        <div class="clausula-t">Modificaciones al proyecto</div>
        <div class="clausula-b">Cualquier modificación solicitada por el cliente después de firmado este contrato deberá acordarse por escrito y podrá generar ajuste en precio y plazo de entrega. No se aceptarán cambios verbales.</div>
      </div>
      <div class="clausula">
        <div class="clausula-t">Jurisdicción</div>
        <div class="clausula-b">Para cualquier controversia derivada del presente contrato, las partes se someten a la jurisdicción de los tribunales competentes de la ciudad de Monterrey, Nuevo León, México, renunciando a cualquier otro fuero que pudiera corresponderles.</div>
      </div>
      ${termExtra?`<div class="clausula"><div class="clausula-t">Condiciones adicionales del taller</div><div class="clausula-b">${termExtra}</div></div>`:""}
    </div>
  </div>
</div>

<div class="fir">
  <div class="fi">
    <div style="height:52px"></div>
    <div class="fl"></div>
    <div class="fn">${tallerRep}</div>
    <div class="fc">${tallerNombre} · Prestador</div>
  </div>
  <div class="fi">
    <div style="height:52px"></div>
    <div class="fl"></div>
    <div class="fn">${f.nombre||"Cliente"}</div>
    <div class="fc">Cliente · Acepta condiciones</div>
  </div>
</div>

<div class="ftr">
  <div class="flogo">${planBasico?"EnKaje Pro":tallerNombre}</div>
  <div class="finfo">enkajepro.com · Monterrey, Nuevo León, México<br>Contrato generado digitalmente · ${folio}</div>
</div>

</div><script>window.onload=function(){window.print()}</script></body></html>`);
    w.document.close();
  }

  async function generarMateriales() {
    const f = getForm();
    setMaterialesLoading(true);
    setMaterialesMsg("");
    setMateriales([]);
    const arr = v => Array.isArray(v) && v.length ? v.join(", ") : (v || "no especificado");
    const tipo = tipoForm === "cocina" ? "cocina integral" : tipoForm === "closet" ? "closet" : tipoForm === "puerta" ? "puerta" : "mueble a medida";
    const medidas = tipoForm === "cocina"
      ? `Largo: ${f.largo||"?"}, Altura: ${f.altura||"?"}, Profundidad: ${f.profundidad||"?"}, Área: ${f.area||"?"}`
      : tipoForm === "puerta"
      ? `Ancho: ${f.ancho||"?"}, Alto: ${f.alto||"?"}, Grosor: ${f.grosor_puerta||"?"}, Cantidad: ${f.cantidad||1}`
      : `Largo: ${f.largo||"?"}, Alto: ${f.alto||f.altura||"?"}, Profundidad: ${f.profundidad||"?"}`;

    const prompt = `Eres un maestro carpintero experto en Monterrey, Mexico. Un cliente quiere un(a) ${tipo}.

ESPECIFICACIONES:
- Medidas: ${medidas}
- Material principal: ${arr(f.material)}
- Grosor: ${arr(f.grosor)}
- Estilo: ${arr(f.estilo)}
- Color: ${f.color_principal||"no especificado"}
- Acabado: ${arr(f.tipo_acabado)}
- Tipo puertas: ${arr(f.tipo_puertas||f.tipo_puerta)}
- Jaladeras: ${arr(f.jaladeras)}
- Bisagras: ${arr(f.bisagras)}
- Correderas: ${arr(f.correderas)}
- Accesorios: ${arr(f.accesorios||f.accesorios_closet||f.accesorios_mueble)}
- Cubierta: ${arr(f.material_cubierta)||"ninguna"}
- Electrodomésticos a panelizar: ${arr(f.electrodomesticos)||"ninguno"}

Genera una lista de materiales necesarios para fabricar este proyecto. Para cada material incluye:
1. Nombre exacto del material
2. Cantidad estimada con unidad (pzas, ml, m2, láminas, etc)
3. Precio unitario aproximado en pesos mexicanos (MXN) en Monterrey 2024
4. Total (cantidad x precio)

Genera también un desglose de costos por categoría:
- precio_fabricacion: costo de materiales y mano de obra de fabricación
- precio_instalacion: costo de instalación en sitio
- precio_herrajes: costo de herrajes (bisagras, jaladeras, correderas, etc)
- precio_acabados: costo de acabados, pintura, lacas, etc
- precio_otros: otros costos (transporte, ajustes, etc)

Responde SOLO con un JSON válido, sin texto adicional, sin markdown, sin explicaciones. Formato exacto:
{
  "materiales": [
    {"material":"Nombre del material","cantidad":"4 láminas","precio_unitario":850,"total":3400,"unidad":"láminas","notas":"MDF 18mm antihumedad"}
  ],
  "desglose": {
    "precio_fabricacion": 0,
    "precio_instalacion": 0,
    "precio_herrajes": 0,
    "precio_acabados": 0,
    "precio_otros": 0
  }
}

Incluye SOLO materiales relevantes. Máximo 15 materiales. Los precios deben ser realistas para Monterrey 2025.`;

    try {
      const res = await fetch("/api/common", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-6", max_tokens: 1500, messages: [{ role: "user", content: prompt }] })
      });
      const data = await res.json();
      const txt = data.content?.[0]?.text || "{}";
      const clean = txt.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);
      
      // Soportar tanto el formato nuevo {materiales, desglose} como el viejo []
      const lista = Array.isArray(parsed) ? parsed : (parsed.materiales || []);
      const desglose = parsed.desglose || null;
      
      setMateriales(lista);
      
      // Autocompletar desglose completo si viene de IA
      if (desglose) {
        if (desglose.precio_fabricacion > 0) setFormField("precio_fabricacion", String(Math.round(desglose.precio_fabricacion)));
        if (desglose.precio_instalacion > 0) setFormField("precio_instalacion", String(Math.round(desglose.precio_instalacion)));
        if (desglose.precio_herrajes > 0)    setFormField("precio_herrajes",    String(Math.round(desglose.precio_herrajes)));
        if (desglose.precio_acabados > 0)    setFormField("precio_cubierta",    String(Math.round(desglose.precio_acabados)));
        if (desglose.precio_otros > 0)       setFormField("precio_otros",       String(Math.round(desglose.precio_otros)));
        const totalIA = Object.values(desglose).reduce((a,v) => a+(parseFloat(v)||0), 0);
        setMaterialesMsg(`✅ ${lista.length} materiales · Total estimado: $${totalIA.toLocaleString("es-MX")} MXN → desglose aplicado automáticamente`);
      } else {
        const totalMat = lista.reduce((s,m) => s+(parseFloat(m.total)||0), 0);
        if (totalMat > 0) {
          setFormField("precio_fabricacion", String(Math.round(totalMat)));
          setMaterialesMsg(`✅ ${lista.length} materiales · $${totalMat.toLocaleString("es-MX")} MXN → aplicado a Fabricación`);
        }
      }
    } catch(e) {
      console.error("IA Error:", e);
      setMaterialesMsg("❌ Error: " + e.message);
    }
    setMaterialesLoading(false);
  }

  async function enviarChat() {
    if (!chatInput.trim() || chatLoading) return;
    const userMsg = chatInput.trim();
    setChatInput("");
    setChatLoading(true);
    setChatHistory(prev => [...prev, { role: "user", content: userMsg }]);
    try {
      const f = getForm();
      const tipoLabel = tipoForm==="cocina"?"cocina integral":tipoForm==="closet"?"closet":tipoForm==="puerta"?"puerta":tipoForm==="panel"?"panel decorativo":"mueble a medida";
      const contexto = `Eres un asistente experto en carpintería y ebanistería para talleres en Monterrey, México. Ayudas a talleres con: cotizaciones, materiales, técnicas, diseño, atención al cliente y administración. El taller trabaja con: ${tipoLabel}. Responde en español, de forma práctica y concisa. Máximo 200 palabras.`;
      const messages = [
        ...chatHistory.map(m => ({ role: m.role, content: m.content })),
        { role: "user", content: userMsg }
      ];
      const res = await fetch("/api/common", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-6", max_tokens: 400, system: contexto, messages })
      });
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
    setRenderLoading(true);
    setRenderMsg("");
    setRenderImg(null);
    try {
      const res = await fetch("/api/image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: renderPrompt })
      });
      const data = await res.json();
      // gpt-image-1 devuelve b64_json
      const imgData = data.data?.data?.[0] || data.data?.[0];
      const imgUrl = imgData?.url;
      const imgB64 = imgData?.b64_json;
      if (imgUrl) {
        setRenderImg(imgUrl);
        setRenderMsg("✅ Render generado");
      } else if (imgB64) {
        setRenderImg("data:image/png;base64," + imgB64);
        setRenderMsg("✅ Render generado");
      } else {
        setRenderMsg("❌ Error: " + (data.data?.error?.message || data.error?.message || JSON.stringify(data).slice(0,150)));
      }
    } catch(e) {
      setRenderMsg("❌ Error: " + e.message);
    }
    setRenderLoading(false);
  }

  async function generarContenidoSocial() {
    if (!socialFoto && !renderImg) return;
    setSocialLoading(true);
    setSocialCaption("");
    try {
      const tipo = tipoForm === "cocina" ? "cocina" : tipoForm === "closet" ? "closet" : tipoForm === "puerta" ? "puerta" : "mueble";
      const estilo = Array.isArray(getForm().estilo) ? getForm().estilo.join(", ") : (getForm().estilo || "");
      const prompt = `Eres un experto en marketing de carpintería para redes sociales en México. Genera un caption para Instagram/Facebook para un taller de carpintería en Monterrey que acaba de terminar un proyecto de ${tipo}${estilo ? ` estilo ${estilo}` : ""}. 

El caption debe:
- Ser en español mexicano, natural y cercano
- Máximo 150 palabras
- Incluir call to action para cotizar
- Terminar con 15-20 hashtags relevantes en español e inglés
- Mencionar Monterrey
- Tener emojis apropiados

Formato: Caption completo listo para copiar y pegar.`;

      const res = await fetch("/api/common", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-6", max_tokens: 500, messages: [{ role: "user", content: prompt }] })
      });
      const data = await res.json();
      setSocialCaption(data.content?.[0]?.text || "");
    } catch(e) {
      setSocialCaption("❌ Error: " + e.message);
    }
    setSocialLoading(false);
  }

  async function analizarConIA() {
    const form = getForm();
    setAiLoading(true); setAiResult("");
    const tipoTxt = tipoForm === "cocina" ? "cocina integral" : tipoForm === "closet" ? "closet" : tipoForm === "puerta" ? "puerta" : "mueble a medida";
    try {
      const prompt = `Eres experto disenador de carpinteria fina en Monterrey. El cliente quiere un ${tipoTxt}. Especificaciones: Estilo: ${Array.isArray(form.estilo)?form.estilo.join(", "):"sin definir"}, Material: ${Array.isArray(form.material)?form.material.join(", "):"sin definir"}, Color: ${form.color_principal||"sin definir"}, Acabado: ${Array.isArray(form.tipo_acabado)?form.tipo_acabado.join(", "):"sin definir"}. Da: 1) Combinacion ideal materiales/colores 2) Accesorios que recomiendas 3) Rango de precio en Monterrey MXN 4) 3 tips profesionales. Usa emojis. Maximo 280 palabras.`;
      const res = await fetch("/api/common", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-6", max_tokens: 800, messages: [{ role: "user", content: prompt }] })
      });
      const data = await res.json();
      setAiResult(data.content?.[0]?.text || "Configura tu API key de Anthropic en Vercel.");
    } catch { setAiResult("Configura tu API key en Vercel > Settings > Environment Variables."); }
    setAiLoading(false);
  }

  const pad = isMobile ? "16px" : "28px 20px";

  // ─── WELCOME ───────────────────────────────────────────────────────────────
  // ─── PÁGINAS LEGALES ───────────────────────────────────────────────────────
  if (legalPage === "privacidad") return <PaginaPrivacidad onBack={() => setLegalPage(null)} />;
  if (legalPage === "terminos")   return <PaginaTerminos   onBack={() => setLegalPage(null)} />;
  if (legalPage === "cookies")    return <PaginaCookies    onBack={() => setLegalPage(null)} />;

  // ─── LOGIN ─────────────────────────────────────────────────────────────────
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
            {[["login","Iniciar Sesion"],["register","Crear Cuenta"]].map(([k,l]) => (
              <button key={k} onClick={() => setLoginMode(k)} style={{ flex: 1, padding: "11px 8px", borderRadius: 8, border: "none", background: loginMode===k?"#d4af37":"transparent", color: loginMode===k?"#000":"#555", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>{l}</button>
            ))}
          </div>
          {loginMode === "register" && <INPUT label="Nombre completo" value={loginForm.nombre} onChange={e => setLoginForm(p => ({...p, nombre: e.target.value}))} placeholder="Tu nombre" />}
          <INPUT label="Correo electronico" value={loginForm.email} onChange={e => setLoginForm(p => ({...p, email: e.target.value}))} placeholder="correo@ejemplo.com" type="email" />
          <INPUT label="Contrasena" value={loginForm.password} onChange={e => setLoginForm(p => ({...p, password: e.target.value}))} placeholder="••••••••" type="password" />

          {loginError && <div style={{ background: loginError.includes("exitosamente")?"#0a2a0a":"#1a0a0a", border: `1px solid ${loginError.includes("exitosamente")?"#4caf5040":"#f4433640"}`, borderRadius: 8, padding: "10px 14px", marginBottom: 14, fontSize: 13, color: loginError.includes("exitosamente")?"#4caf50":"#f44336" }}>{loginError}</div>}
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

  // ─── APP ───────────────────────────────────────────────────────────────────
  const tabs = role === "admin"
    ? [["bienvenida","Inicio"],["formulario","Formulario"],["presupuesto","Presupuesto"],["proyectos","Proyectos"],["membresias","Talleres"],["ia","IA"]]
   : role === "taller"
    ? [["bienvenida","Inicio"],["formulario","Formulario"],["leads","Proyectos"],["leads_portal","Leads"],["presupuesto","Cotizar"],["ia","IA"]]
  : [["bienvenida","Inicio"],["formulario","Formulario"],["mis_proyectos","Mis Proyectos"],["estilos","Estilos"],["ia","IA"]]
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
            <button onClick={() => { setScreen("login"); setRole(null); setUser(null); setToken(null); sessionStorage.removeItem("enkaje_tab"); history.replaceState({}, "", window.location.pathname); }} style={{ background: "transparent", border: "1px solid #2a2a20", color: "#555", borderRadius: 8, padding: "7px 12px", fontSize: 12, cursor: "pointer" }}>Salir</button>
          </div>
        </div>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", gap: 2, overflowX: "auto", paddingBottom: 1 }}>
          {tabs.map(([k,l]) => (
            <button key={k} onClick={() => setTabWithHistory(k)} style={{ background: "transparent", border: "none", borderBottom: tab===k?"2px solid #d4af37":"2px solid transparent", color: tab===k?"#d4af37":"#aaa", padding: isMobile?"10px 12px":"10px 16px", cursor: "pointer", fontSize: isMobile?12:13, fontWeight: 700, whiteSpace: "nowrap" }}>{l}</button>
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
              <p style={{ color: "#aaa", fontSize: 14, margin: "0 0 20px", lineHeight: 1.6 }}>
                {role==="admin"?"Gestionas todos los proyectos de EnKaje Pro.":role==="taller"?"Aqui recibes proyectos y cotizas directamente.":"Diseña y cotiza tu proyecto ideal con nosotros."}
              </p>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {role==="admin" && <><BTN onClick={() => setTabWithHistory("formulario")}>Nuevo Levantamiento</BTN><BTN onClick={() => setTabWithHistory("proyectos")} outline color="#d4af37">Ver Proyectos ({proyectos.length})</BTN></>}
                {role==="taller" && <BTN onClick={() => setTabWithHistory("leads")}>Ver Proyectos ({proyectos?.length || 0})</BTN>} 
                {role==="taller" && talleresMem.find(t=>t.email===user?.email)?.slug && (
                  <BTN onClick={() => window.open(`https://enkajepro.com/taller/${talleresMem.find(t=>t.email===user?.email).slug}`, "_blank")} outline color="#d4af37">🔗 Ver mi link público</BTN>
                )}
                {role==="cliente" && <><BTN onClick={() => setTabWithHistory("formulario")}>Iniciar mi Proyecto</BTN><BTN onClick={() => setTabWithHistory("estilos")} outline color="#d4af37">Ver Estilos</BTN></>}
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: isMobile?"1fr 1fr":"repeat(4,1fr)", gap: 12 }}>
              {role==="admin" && [["Proyectos",proyectos.length,"#d4af37"],["Nuevos",proyectos.filter(p=>p.estado==="nuevo").length,"#00bcd4"],["En proceso",proyectos.filter(p=>p.estado==="proceso").length,"#f0a500"],["Cerrados",proyectos.filter(p=>p.estado==="cerrado").length,"#4caf50"]].map(([l,v,c],i) => (
                <div key={i} onClick={() => setTabWithHistory("proyectos")} style={{ background: "#0f0f0a", border: `1px solid ${c}25`, borderRadius: 12, padding: isMobile?14:18, cursor: "pointer" }}>
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
              {role==="taller" && [["Proyectos nuevos",(proyectos||[]).filter(p=>p.estado==="nuevo").length,"#d4af37"],["Total",(proyectos||[]).length,"#00bcd4"]].map(([l,v,c],i) => (
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
                <p style={{ color: "#aaa", margin: "4px 0 0", fontSize: 13 }}>Especificaciones completas del proyecto</p>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                {savedMsg && <div style={{ background: savedMsg.includes("Error")?"#1a0a0a":"#0a2a0a", border: `1px solid ${savedMsg.includes("Error")?"#f4433640":"#4caf5040"}`, color: savedMsg.includes("Error")?"#f44336":"#4caf50", borderRadius: 8, padding: "8px 14px", fontSize: 12 }}>{savedMsg}</div>}
                <BTN onClick={guardarFormulario}>Guardar</BTN>
              </div>
            </div>
            <TIPO_SELECTOR />
            {tipoForm === "cocina" && <FormularioCocina form={formCocina} setF={(k,v) => setFormCocina(p=>({...p,[k]:v}))} role={role} isMobile={isMobile} />}
            {tipoForm === "closet" && <FormularioCloset form={formCloset} setF={(k,v) => setFormCloset(p=>({...p,[k]:v}))} role={role} isMobile={isMobile} />}
            {tipoForm === "puerta" && <FormularioPuerta form={formPuerta} setF={(k,v) => setFormPuerta(p=>({...p,[k]:v}))} role={role} isMobile={isMobile} />}
            {tipoForm === "mueble" && <FormularioMueble form={formMueble} setF={(k,v) => setFormMueble(p=>({...p,[k]:v}))} role={role} isMobile={isMobile} />}
            {tipoForm === "bano" && <FormularioBano form={formBano} setF={(k,v) => setFormBano(p=>({...p,[k]:v}))} role={role} isMobile={isMobile} />}
            {tipoForm === "panel" && (
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
                    <INPUT label="Color principal" value={formPanel.color_principal} onChange={e=>setFormPanel(p=>({...p,color_principal:e.target.value}))} placeholder="Blanco mate, nogal, wengué..." />
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
                  <div style={{ marginBottom: 16 }}>
                    <label style={{ fontSize: 11, color: "#777", display: "block", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>Instalación</label>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      {["Incluye instalación","Solo suministro","Con estructura","Sin estructura","Con iluminación LED"].map(op => (
                        <PILL key={op} label={op} checked={formPanel.instalacion_panel?.includes(op)} onChange={() => setFormPanel(p=>({...p, instalacion_panel: p.instalacion_panel?.includes(op)?p.instalacion_panel.filter(x=>x!==op):[...(p.instalacion_panel||[]),op]}))} />
                      ))}
                    </div>
                  </div>
                  <TEXTAREA label="Observaciones" value={formPanel.observaciones} onChange={e=>setFormPanel(p=>({...p,observaciones:e.target.value}))} placeholder="Detalles adicionales, referencias de diseño, etc." rows={3} />
                </div>
                {(role==="admin"||role==="taller") && (
                  <div style={{ background: "#0f0f0a", border: "1px solid #1a1a12", borderRadius: 16, padding: isMobile?16:24, marginBottom: 16 }}>
                    <h3 style={{ color: "#d4af37", margin: "0 0 16px", fontSize: 14, letterSpacing: 1 }}>🏭 NOTAS DEL TALLER</h3>
                    <div style={{ display: "grid", gridTemplateColumns: isMobile?"1fr":"1fr 1fr", gap: 12 }}>
                      <INPUT label="Nivel de calidad" value={formPanel.nivel_calidad} onChange={e=>setFormPanel(p=>({...p,nivel_calidad:e.target.value}))} placeholder="Estándar / Premium / Lujo" />
                      <INPUT label="Materiales sugeridos" value={formPanel.materiales_solicitados} onChange={e=>setFormPanel(p=>({...p,materiales_solicitados:e.target.value}))} placeholder="MDF 18mm, triplay..." />
                    </div>
                    <TEXTAREA label="Comentarios técnicos" value={formPanel.comentarios_tecnicos} onChange={e=>setFormPanel(p=>({...p,comentarios_tecnicos:e.target.value}))} placeholder="Notas internas del taller..." rows={2} />
                  </div>
                )}
              </div>
            )}
            <div style={{ marginTop: 28, background: "#0f0f0a", border: "1px solid #1a1a12", borderRadius: 16, padding: 20 }}>
              {savedMsg && <div style={{ background: savedMsg.includes("❌")?"#1a0a0a":"#0a2a0a", border: `1px solid ${savedMsg.includes("❌")?"#f4433640":"#4caf5040"}`, color: savedMsg.includes("❌")?"#f44336":"#4caf50", borderRadius: 8, padding: "10px 14px", fontSize: 13, marginBottom: 14, textAlign: "center" }}>{savedMsg}</div>}
              <div style={{ display:"flex", gap:10, flexWrap:"wrap", marginBottom: 14 }}>
                <BTN onClick={guardarFormulario} style={{ flex:1, minWidth: isMobile?"100%":160, padding:"13px 20px", fontSize:14, letterSpacing:.5 }}>💾 Guardar Levantamiento</BTN>
                <button onClick={imprimirFormulario} style={{ flex:1, minWidth: isMobile?"100%":160, background:"linear-gradient(135deg,#d4af37,#f0c84a)", color:"#000", border:"none", borderRadius:10, padding:"13px 20px", fontWeight:900, fontSize:13, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:6 }}>🖨️ Imprimir / PDF Formulario</button>
              </div>
              <ShareMenu
                onShare={key => compartirFormulario(key)}
                label="Compartir levantamiento"
              />
            </div>
            <div style={{ borderTop: "2px solid #d4af3730", marginTop: 32, paddingTop: 32 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                <div style={{ height: 1, flex: 1, background: "#1a1a12" }} />
                <span style={{ fontSize: 11, color: "#d4af37", letterSpacing: 3, textTransform: "uppercase", fontWeight: 700 }}>Presupuesto y Compartir</span>
                <div style={{ height: 1, flex: 1, background: "#1a1a12" }} />
              </div>
              <Presupuesto form={getForm()} setF={setFormField} isMobile={isMobile} tipoProyecto={tipoForm} role={role} generarMateriales={generarMateriales} materiales={materiales} materialesLoading={materialesLoading} materialesMsg={materialesMsg} generarContrato={generarContrato} tallerData={tallerSel} imprimirHoja={imprimirHojaProfesional} setMateriales={setMateriales} setMaterialesMsg={setMaterialesMsg} />
          </div>
        )}
        {/* MIS PROYECTOS — cliente */}
        {tab === "mis_proyectos" && role === "cliente" && (
          <div>
            <h1 style={{ color: "#d4af37", margin: "0 0 8px", fontSize: isMobile?20:24 }}>Mis Proyectos</h1>
            <p style={{ color: "#555", margin: "0 0 20px", fontSize: 13 }}>Levantamientos guardados</p>
            {proyectos.length === 0 && (
              <div style={{ background: "#0f0f0a", border: "1px solid #ffffff08", borderRadius: 12, padding: 32, textAlign: "center", color: "#555" }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>📋</div>
                <div style={{ fontSize: 14 }}>No tienes proyectos guardados aún</div>
                <BTN onClick={() => setTabWithHistory("formulario")} style={{ marginTop: 16, fontSize: 13 }}>Crear mi primer proyecto</BTN>
              </div>
            )}
            {proyectos.map((p, i) => {
              const sel = proyectoSel?.created_at === p.created_at;
              const tipoIcon = p.tipo_proyecto==="cocina"?"🍳":p.tipo_proyecto==="closet"?"👔":p.tipo_proyecto==="puerta"?"🚪":"🛋️";
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
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      {(() => {
                      const est = ESTADOS_PROYECTO.find(e => e.key === (p.estado||"nuevo")) || ESTADOS_PROYECTO[0];
                      return <span style={{ background: `${est.color}20`, border: `1px solid ${est.color}50`, color: est.color, borderRadius: 20, padding: "3px 10px", fontSize: 11, fontWeight: 700 }}>{est.emoji} {est.label}</span>;
                    })()}
                    </div>
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
                        <BTN onClick={e => { e.stopPropagation(); cargarProyectoEnPresupuesto(p); setTabWithHistory("presupuesto"); }} style={{ fontSize: 12 }} outline color="#d4af37">💰 Ver presupuesto</BTN>
                        <BTN
                          onClick={async e => {
                            e.stopPropagation();
                            setConfirmModal({ msg: "¿Eliminar este proyecto? No se puede deshacer.", onOk: async () => {
                              await sb(`proyectos?enkaje=eq.${p.enkaje}`, { method: "DELETE", token }); cargarProyectos();
                              setProyectoSel(null); cargarProyectos();
                            }});
                          }}
                          outline color="#f44336" style={{ fontSize: 12 }}>🗑️ Eliminar</BTN>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
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
                <BTN onClick={() => setTabWithHistory("ia")} style={{ fontSize: 12 }}>Ver Recomendacion IA →</BTN>
              </div>
            )}
          </div>
        )}

        {/* PRESUPUESTO */}
        {tab === "presupuesto" && (
          <div>
            <TIPO_SELECTOR />
            <Presupuesto form={getForm()} setF={setFormField} isMobile={isMobile} tipoProyecto={tipoForm} role={role} generarMateriales={generarMateriales} materiales={materiales} materialesLoading={materialesLoading} materialesMsg={materialesMsg} generarContrato={generarContrato} tallerData={tallerSel} imprimirHoja={imprimirHojaProfesional} setMateriales={setMateriales} setMaterialesMsg={setMaterialesMsg} />
          </div>
        )}

        {/* PROYECTOS ADMIN */}
        {tab === "proyectos" && role === "admin" && (
          <div>
            <h1 style={{ color: "#d4af37", margin: "0 0 20px", fontSize: isMobile?20:26 }}>Todos los Proyectos</h1>
            {proyectos.length === 0 && <div style={{ color: "#555", fontSize: 14, padding: 20 }}>No hay proyectos aun</div>}
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
                        <BTN onClick={e => { e.stopPropagation(); cargarProyectoEnFormulario(p); setTabWithHistory("formulario"); }} style={{ fontSize: 12 }}>📋 Editar Formulario</BTN>
                        <BTN onClick={e => { e.stopPropagation(); cargarProyectoEnPresupuesto(p); setTabWithHistory("presupuesto"); }} outline color="#d4af37" style={{ fontSize: 12 }}>💰 Presupuesto</BTN>
                        <BTN onClick={e => { e.stopPropagation(); cargarProyectoEnPresupuesto(p); generarContrato(tallerSel); }} outline color="#4caf50" style={{ fontSize: 12 }}>📄 Contrato</BTN>
                        <BTN onClick={async e => { e.stopPropagation(); setConfirmModal({ msg: "¿Eliminar este proyecto?", onOk: async () => { await sb(`proyectos?enkaje=eq.${p.enkaje}`, {method:"DELETE", token}); cargarProyectos(); }});}} outline color="#f44336" style={{ fontSize: 12 }}>🗑️ Eliminar</BTN>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
{/* LEADS DEL PORTAL */}
        {tab === "leads_portal" && (
          <div>
            <h1 style={{ color: "#d4af37", margin: "0 0 8px", fontSize: isMobile?20:26 }}>Leads del Portal</h1>
            <p style={{ color: "#555", margin: "0 0 20px", fontSize: 13 }}>Clientes que llenaron el portal público con render de IA</p>
            {leads.length === 0 && (
              <div style={{ background: "#0f0f0a", border: "1px solid #1a1a12", borderRadius: 12, padding: 32, textAlign: "center", color: "#555" }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>📭</div>
                <div style={{ fontSize: 14 }}>No hay leads aún</div>
                <div style={{ fontSize: 12, color: "#333", marginTop: 8 }}>Cuando un cliente llene el portal aparecerá aquí</div>
              </div>
            )}
            {leads.map((lead, i) => {
              const sel = leadSel?.id === lead.id;
              const editando = false;
              const scoreColor = lead.score >= 80 ? "#d4af37" : lead.score >= 55 ? "#4caf50" : lead.score >= 30 ? "#f0a500" : "#666";
              const scoreEmoji = lead.score >= 80 ? "⭐" : lead.score >= 55 ? "🟢" : lead.score >= 30 ? "🟡" : "🔴";
              const labelTexto = lead.score >= 80 ? "Prioritario" : lead.score >= 55 ? "Listo" : lead.score >= 30 ? "Evaluando" : "Explorando";
              return (
               <div key={lead.id || i}onClick={() => setLeadSel(sel ? null : lead)}
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
                          {lead.observaciones?.split("|")[0]?.replace("Nombre:","")?.trim() || "Cliente anónimo"}
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
                          <img src={lead.render_url} alt="Render IA" style={{ width: "100%", maxHeight: 400 , objectFit: "cover" }} />
                          <div style={{ position: "absolute", top: 8, left: 8, background: "#0a0a08cc", borderRadius: 8, padding: "4px 10px", fontSize: 11, color: "#d4af37", fontWeight: 700 }}>🤖 Render IA</div>
                        </div>
                      )}
                      {lead.foto_url && (
                        <div style={{ borderRadius: 10, overflow: "hidden", marginBottom: 14 }}>
                          <div style={{ fontSize: 10, color: "#555", marginBottom: 6, textTransform: "uppercase", letterSpacing: 1 }}>📸 Foto original del cliente</div>
                          <img src={lead.foto_url} alt="Foto cliente" style={{ width: "100%", maxHeight: 160, objectFit: "cover", borderRadius: 8 }} />
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
                          ["Materiales", lead.materiales_sugeridos],
                          ["Tiempo fab.", lead.tiempo_fabricacion],
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
                          📋 Formulario
                        </button>
                      
                        <button onClick={async e => {
                          e.stopPropagation();
                          setConfirmModal({ msg: `¿Eliminar el lead de ${lead.observaciones?.split("Nombre:")[1]?.split("|")[0]?.trim() || "este cliente"}?`, onOk: async () => {
                            await sb(`expedientes?id=eq.${lead.id}`, { method: "DELETE", token });
                            cargarLeads();
                            setLeadSel(null);
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
 
        {/* LEADS TALLER */}
        {tab === "leads" && role === "taller" && (
          <div>
            <h1 style={{ color: "#d4af37", margin: "0 0 20px", fontSize: isMobile?20:26 }}>Proyectos Disponibles</h1>
            {proyectos.length === 0 && <div style={{ color: "#555", fontSize: 14, padding: 20 }}>No hay proyectos disponibles aun</div>}
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
                        <div style={{ fontSize: 11, color: "#aaa", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>Estado del proyecto</div>
                        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                          {ESTADOS_PROYECTO.map(est => (
                            <button key={est.key}
                              onClick={async e => {
                                e.stopPropagation();
                                await sb(`proyectos?enkaje=eq.${p.enkaje}`, { method: "PATCH", token, body: JSON.stringify({ estado: est.key }) });
                                cargarProyectos();
                                // Notificar al cliente por WhatsApp si tiene teléfono
                                if (p.telefono) {
                                  const tel = p.telefono.replace(/\D/g,"");
                                  const msg = `${est.emoji} *EnKaje Pro — Actualización de tu proyecto*\n\nHola ${p.nombre||""}! Tu proyecto de ${(p.tipo_proyecto||"cocina").toUpperCase()} ha cambiado de estado:\n\n*${est.label.toUpperCase()}*\n\nCualquier duda escríbenos.\nenkajepro.com`;
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
                        <BTN onClick={e => { e.stopPropagation(); cargarProyectoEnFormulario(p); setTabWithHistory("formulario"); }} style={{ fontSize: 12 }}>📋 Editar Formulario</BTN>
                        <BTN onClick={e => { e.stopPropagation(); cargarProyectoEnPresupuesto(p); setTabWithHistory("presupuesto"); }} outline color="#d4af37" style={{ fontSize: 12 }}>💰 Presupuesto</BTN>
                        <BTN onClick={e => { e.stopPropagation(); cargarProyectoEnPresupuesto(p); generarContrato(tallerSel); }} outline color="#4caf50" style={{ fontSize: 12 }}>📄 Contrato</BTN>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* MEMBRESIAS ADMIN */}
        {tab === "membresias" && role === "admin" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 10 }}>
              <div>
                <h1 style={{ color: "#d4af37", margin: 0, fontSize: isMobile?20:26 }}>Talleres Suscritos</h1>
                <p style={{ color: "#aaa", margin: "4px 0 0", fontSize: 13 }}>Gestiona membresías, planes y zonas</p>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                {tallerMsg && <div style={{ background: tallerMsg.includes("Error")?"#1a0a0a":"#0a2a0a", border: `1px solid ${tallerMsg.includes("Error")?"#f4433640":"#4caf5040"}`, color: tallerMsg.includes("Error")?"#f44336":"#4caf50", borderRadius: 8, padding: "8px 14px", fontSize: 12 }}>{tallerMsg}</div>}
                <BTN onClick={() => setShowNuevoTaller(true)}>+ Agregar Taller</BTN>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: isMobile?"1fr 1fr":"repeat(4,1fr)", gap: 12, marginBottom: 20 }}>
              {[["Total",talleresMem.length,"#d4af37"],["Basico",talleresMem.filter(t=>t.plan==="basico").length,"#888"],["Pro",talleresMem.filter(t=>t.plan==="pro").length,"#00bcd4"],["Premium",talleresMem.filter(t=>t.plan==="premium").length,"#d4af37"]].map(([l,v,c],i) => (
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
              <div style={{ fontSize: 12, color: "#aaa", marginTop: 4 }}>{talleresMem.filter(t=>t.estado==="activo").length} talleres activos</div>
            </div>
            {talleresMem.length === 0 && (
              <div style={{ background: "#0f0f0a", border: "1px solid #ffffff08", borderRadius: 12, padding: 32, textAlign: "center", color: "#555" }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>🏭</div>
                <div style={{ fontSize: 14 }}>No hay talleres registrados aun</div>
                <div style={{ fontSize: 12, color: "#333", marginTop: 8 }}>Agrega el primer taller fundador</div>
              </div>
            )}
            {talleresMem.map((t,i) => {
              const planColor = t.plan === "premium" ? "#d4af37" : t.plan === "pro" ? "#00bcd4" : "#888";
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
                      <span style={{ background: `${planColor}20`, border: `1px solid ${planColor}`, color: planColor, borderRadius: 20, padding: "3px 12px", fontSize: 11, fontWeight: 700, textTransform: "uppercase" }}>{t.plan}</span>
                      <span style={{ background: `${estadoColor}15`, border: `1px solid ${estadoColor}40`, color: estadoColor, borderRadius: 20, padding: "3px 12px", fontSize: 11, fontWeight: 700, textTransform: "uppercase" }}>{t.estado}</span>
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
                            <a href={`https://enkajepro.com/taller/${t.slug}`} target="_blank" rel="noreferrer"
                              onClick={e => e.stopPropagation()}
                              style={{ color: "#d4af37", fontSize: 12, textDecoration: "underline", wordBreak: "break-all" }}>
                              enkajepro.com/taller/{t.slug}
                            </a>
                          </div>
                        )}
                      </div>
                      {t.notas && <div style={{ fontSize: 12, color: "#bbb", marginBottom: 14, background: "#0a0a0a", borderRadius: 8, padding: 10 }}>📝 {t.notas}</div>}

                      {/* EDITAR INFO BÁSICA */}
                      <div onClick={e => e.stopPropagation()} style={{ background: "#0a0a08", border: "1px solid #1a1a12", borderRadius: 10, padding: 14, marginBottom: 14 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                          <div style={{ fontSize: 11, color: "#d4af37", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" }}>📋 Información del Taller</div>
                          <button onClick={e => { e.stopPropagation(); setEditInfo(editInfo && editInfo.id===t.id ? null : {...t}); }}
                            style={{ background: "transparent", border: "1px solid #d4af3740", color: "#d4af37", borderRadius: 6, padding: "4px 10px", fontSize: 11, cursor: "pointer" }}>
                            {editInfo && editInfo.id===t.id ? "Cancelar" : "✏️ Editar"}
                          </button>
                        </div>
                        {editInfo && editInfo.id === t.id ? (
                          <div>
                            <div style={{ display: "grid", gridTemplateColumns: isMobile?"1fr":"1fr 1fr", gap: 10, marginBottom: 10 }}>
                              <INPUT label="Nombre del taller" value={editInfo?.nombre||""} onChange={e=>setEditInfo(p=>({...p,nombre:e.target.value}))} placeholder="Nombre del taller" />
                              <INPUT label="Email" value={editInfo?.email||""} onChange={e=>setEditInfo(p=>({...p,email:e.target.value}))} placeholder="email@taller.com" />
                              <INPUT label="Teléfono" value={editInfo?.telefono||""} onChange={e=>setEditInfo(p=>({...p,telefono:e.target.value}))} placeholder="81-1234-5678" />
                              <INPUT label="Especialidad" value={editInfo?.especialidad||""} onChange={e=>setEditInfo(p=>({...p,especialidad:e.target.value}))} placeholder="Cocinas, Closets..." />
                              <INPUT label="Zona / Colonia" value={editInfo?.zona||""} onChange={e=>setEditInfo(p=>({...p,zona:e.target.value}))} placeholder="San Pedro, Valle..." />
                              <INPUT label="Municipio" value={editInfo?.municipio||""} onChange={e=>setEditInfo(p=>({...p,municipio:e.target.value}))} placeholder="San Pedro Garza Garcia" />
                              <INPUT label="Slug (URL)" value={editInfo?.slug||""} onChange={e=>setEditInfo(p=>({...p,slug:e.target.value.toLowerCase().replace(/\s+/g,"-").replace(/[^a-z0-9-]/g,"")}))} placeholder="carpinteria-regia" />
                              <INPUT label="URL del logo (imagen)" value={editInfo?.logo_url||""} onChange={e=>setEditInfo(p=>({...p,logo_url:e.target.value}))} placeholder="/logo-sonorense.jpg" />
                              <INPUT label="Facebook (URL)" value={editInfo?.facebook||""} onChange={e=>setEditInfo(p=>({...p,facebook:e.target.value}))} placeholder="https://facebook.com/tu-pagina" />
                              <INPUT label="Instagram (usuario)" value={editInfo?.instagram||""} onChange={e=>setEditInfo(p=>({...p,instagram:e.target.value}))} placeholder="@carpinteria_regia" />
                              <INPUT label="TikTok (usuario)" value={editInfo?.tiktok||""} onChange={e=>setEditInfo(p=>({...p,tiktok:e.target.value}))} placeholder="@carpinteria_regia" />
                              <INPUT label="Google Maps (URL)" value={editInfo?.google_maps||""} onChange={e=>setEditInfo(p=>({...p,google_maps:e.target.value}))} placeholder="https://maps.google.com/..." />
                              <INPUT label="Años de experiencia" value={editInfo?.anos_experiencia||""} onChange={e=>setEditInfo(p=>({...p,anos_experiencia:e.target.value}))} placeholder="15" />
                              <INPUT label="Horario" value={editInfo?.horario||""} onChange={e=>setEditInfo(p=>({...p,horario:e.target.value}))} placeholder="Lun-Vie 9am-6pm, Sáb 9am-3pm" />
                              <INPUT label="Fecha vencimiento" value={editInfo?.fecha_vencimiento||""} onChange={e=>setEditInfo(p=>({...p,fecha_vencimiento:e.target.value}))} type="date" />
                            </div>
                            <TEXTAREA label="Notas internas" value={editInfo?.notas||""} onChange={e=>setEditInfo(p=>({...p,notas:e.target.value}))} placeholder="Notas sobre el taller..." rows={2} />
                            <button onClick={async e => {
                              e.stopPropagation();
                              await actualizarTaller(editInfo.id, { nombre: editInfo.nombre, email: editInfo.email, telefono: editInfo.telefono, especialidad: editInfo.especialidad, zona: editInfo.zona, municipio: editInfo.municipio, slug: editInfo.slug, fecha_vencimiento: editInfo.fecha_vencimiento, notas: editInfo.notas, logo_url: editInfo.logo_url, facebook: editInfo.facebook, instagram: editInfo.instagram, tiktok: editInfo.tiktok, google_maps: editInfo.google_maps, anos_experiencia: editInfo.anos_experiencia, horario: editInfo.horario });
                              setEditInfo(null);
                              setTallerMsg("✅ Información actualizada");
                              setTimeout(()=>setTallerMsg(""), 3000);
                            }} style={{ background: "#d4af37", border: "none", color: "#000", borderRadius: 8, padding: "9px 20px", fontWeight: 700, fontSize: 13, cursor: "pointer", marginTop: 4 }}>
                              Guardar información
                            </button>
                          </div>
                        ) : (
                          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, fontSize: 12, color: "#aaa" }}>
                            {[["Email",t.email],["Tel",t.telefono],["Especialidad",t.especialidad],["Zona",t.zona],["Municipio",t.municipio],["Slug",t.slug]].filter(([,v])=>v).map(([l,v],j) => (
                              <div key={j}><b style={{color:"#666"}}>{l}:</b> {v}</div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* DATOS LEGALES */}
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
                              <INPUT label="Nombre legal" value={editTaller?.nombre_legal||""} onChange={e=>setEditTaller(p=>({...p,nombre_legal:e.target.value}))} placeholder="Razón social o nombre completo" />
                              <INPUT label="RFC" value={editTaller?.rfc||""} onChange={e=>setEditTaller(p=>({...p,rfc:e.target.value}))} placeholder="XXXX123456XXX" />
                              <INPUT label="Representante legal" value={editTaller?.representante||""} onChange={e=>setEditTaller(p=>({...p,representante:e.target.value}))} placeholder="Nombre del representante" />
                              <INPUT label="Teléfono legal" value={editTaller?.telefono_legal||""} onChange={e=>setEditTaller(p=>({...p,telefono_legal:e.target.value}))} placeholder="81-1234-5678" />
                              <INPUT label="Correo legal" value={editTaller?.correo_legal||""} onChange={e=>setEditTaller(p=>({...p,correo_legal:e.target.value}))} placeholder="legal@taller.com" />
                              <INPUT label="Código Postal" value={editTaller?.cp||""} onChange={e=>setEditTaller(p=>({...p,cp:e.target.value}))} placeholder="64000" />
                            </div>
                            <INPUT label="Dirección fiscal" value={editTaller?.direccion_fiscal||""} onChange={e=>setEditTaller(p=>({...p,direccion_fiscal:e.target.value}))} placeholder="Calle, Colonia, Ciudad, Estado" />
                            <INPUT label="Garantía por defecto" value={editTaller?.garantia_default||""} onChange={e=>setEditTaller(p=>({...p,garantia_default:e.target.value}))} placeholder="6 meses en instalación y herrajes" />
                            <TEXTAREA label="Términos adicionales (opcional)" value={editTaller?.terminos_extra||""} onChange={e=>setEditTaller(p=>({...p,terminos_extra:e.target.value}))} placeholder="Condiciones especiales del taller..." rows={2} />
                            <button onClick={async e => {
                              e.stopPropagation();
                              const { enkaje, ...datos } = editTaller;
                              await actualizarTaller(enkaje, { nombre_legal: datos.nombre_legal, rfc: datos.rfc, representante: datos.representante, telefono_legal: datos.telefono_legal, correo_legal: datos.correo_legal, cp: datos.cp, direccion_fiscal: datos.direccion_fiscal, garantia_default: datos.garantia_default, terminos_extra: datos.terminos_extra });
                              setEditTaller(null);
                              setTallerMsg("✅ Datos legales guardados");
                              setTimeout(()=>setTallerMsg(""), 3000);
                            }} style={{ background: "#d4af37", border: "none", color: "#000", borderRadius: 8, padding: "9px 20px", fontWeight: 700, fontSize: 13, cursor: "pointer", marginTop: 4 }}>
                              Guardar datos legales
                            </button>
                          </div>
                        ) : (
                          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, fontSize: 12, color: "#aaa" }}>
                            {[["Nombre legal", t.nombre_legal],["RFC", t.rfc],["Representante", t.representante],["Tel. legal", t.telefono_legal],["Dirección", t.direccion_fiscal],["Garantía", t.garantia_default]].filter(([,v])=>v).map(([l,v],j) => (
                              <div key={j}><b style={{color:"#555"}}>{l}:</b> {v}</div>
                            ))}
                            {!t.nombre_legal && <div style={{ fontSize: 11, color: "#333", gridColumn: "1/-1" }}>Sin datos legales — presiona Editar para agregar</div>}
                          </div>
                        )}
                      </div>

                      <div style={{ marginBottom: 12 }}>
                        <div style={{ fontSize: 11, color: "#555", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>Cambiar Plan</div>
                        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                          {[["basico","Basico $699","#888"],["pro","Pro $1,499","#00bcd4"],["premium","Premium $2,999","#d4af37"]].map(([p,l,c]) => (
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
                          <button onClick={e => { e.stopPropagation(); const link = `https://enkajepro.com/taller/${t.slug}`; navigator.clipboard.writeText(link); alert("Link copiado: " + link); }}
                            style={{ padding: "8px 16px", borderRadius: 8, border: "1px solid #d4af3740", background: "#d4af3710", color: "#d4af37", fontSize: 12, cursor: "pointer", fontWeight: 700 }}>🔗 Copiar link</button>
                        )}
                        {t.email && (
                          <button onClick={e => {
                            e.stopPropagation();
                            const chars = "ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";
                            const pass = Array.from({length:10}, () => chars[Math.floor(Math.random()*chars.length)]).join("") + "!";
                            const planLabel = t.plan==="premium"?"Premium $2,999/mes":t.plan==="pro"?"Pro $1,499/mes":"Básico $699/mes";
                            const body = [
                              `╔════════════════════════════╗`,
                              `║      E n K a j e  P R O   ║`,
                              `║   Plataforma de Carpintería║`,
                              `╚════════════════════════════╝`,
                              ``,
                              `🎉 ¡BIENVENIDO, ${t.nombre.toUpperCase()}!`,
                              ``,
                              `Este es el momento en que tu taller da el salto al siguiente nivel.`,
                              `Acabas de unirte a la plataforma que está transformando la carpintería`,
                              `en Monterrey — y tú eres parte de los primeros en hacerlo.`,
                              ``,
                              `Con EnKaje Pro vas a:`,
                              `✅ Recibir leads directo a tu WhatsApp`,
                              `✅ Generar presupuestos profesionales en minutos`,
                              `✅ Crear contratos digitales con tu logo`,
                              `✅ Darle seguimiento a cada proyecto`,
                              `✅ Construir tu reputación con reseñas verificadas`,
                              ``,
                              `━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
                              `   TUS CREDENCIALES DE ACCESO`,
                              `━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
                              `🌐 Plataforma: https://enkajepro.com/app`,
                              `📧 Correo: ${t.email}`,
                              `🔑 Contraseña temporal: ${pass}`,
                              `━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
                              ``,
                              `CÓMO ENTRAR:`,
                              `1. Ve a enkajepro.com/app`,
                              `2. Click en "Crear cuenta"`,
                              `3. Regístrate con este correo y contraseña`,
                              `4. ¡Ya estás dentro!`,
                              ``,
                              `⚠️ Guarda esta contraseña, cámbiala después de entrar.`,
                              ``,
                              `━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
                              `   TU LINK PERSONAL`,
                              `━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
                              `🔗 enkajepro.com/taller/${t.slug || "tu-slug"}`,
                              ``,
                              `Compártelo en Facebook, Instagram, TikTok y WhatsApp.`,
                              `Cada cliente que lo visite puede solicitarte cotización directo a tu teléfono.`,
                              ``,
                              `Tu plan: ${planLabel}`,
                              ``,
                              `━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
                              `   🚀 PRÓXIMAS FUNCIONES`,
                              `━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
                              `⭐ Reseñas verificadas de tus clientes`,
                              `📸 Portafolio de fotos de tus proyectos`,
                              `🤖 IA que genera renders para tus clientes`,
                              `📊 Dashboard de métricas y ventas`,
                              `🗺️ Directorio público de talleres verificados`,
                              `💳 Pagos en línea y anticipo digital`,
                              ``,
                              `Tú y los talleres fundadores tendrán acceso prioritario a cada nueva función.`,
                              ``,
                              `Gracias por confiar en EnKaje Pro. 🙏`,
                              ``,
                              `Con gusto,`,
                              `Felipe Santiago`,
                              `Fundador · EnKaje Pro`,
                              `Monterrey, Nuevo León · enkajepro.com`,
                            ].join("\n");
                            window.open(`mailto:${t.email}?subject=Bienvenido a EnKaje Pro - Tus credenciales de acceso&body=${encodeURIComponent(body)}`, "_blank");
                            alert(`📧 Email listo para enviar\nContraseña generada: ${pass}\n\nCopia esta contraseña y créala en Supabase → Authentication → Users`);
                          }}
                            style={{ padding: "8px 16px", borderRadius: 8, border: "1px solid #00bcd440", background: "#00bcd410", color: "#00bcd4", fontSize: 12, cursor: "pointer", fontWeight: 700 }}>📧 Enviar credenciales</button>
                        )}
                        <button onClick={async e => { e.stopPropagation(); setConfirmModal({ msg: `¿Eliminar ${t.nombre}?`, onOk: async () => { await sb(`talleres_membresia?id=eq.${t.id}`, {method:"DELETE", token}); cargarTalleres(); setTallerSel(null); }});}}
                          style={{ padding: "8px 16px", borderRadius: 8, border: "1px solid #f4433640", background: "#f443360a", color: "#f44336", fontSize: 12, cursor: "pointer", fontWeight: 600 }}>Eliminar</button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* MODAL NUEVO TALLER */}
            {showNuevoTaller && (
              <div style={{ position: "fixed", inset: 0, background: "#000000cc", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200, padding: 16 }}>
                <div style={{ background: "#0f0f0a", border: "1px solid #d4af3740", borderRadius: 20, padding: isMobile?20:28, width: "100%", maxWidth: 520, maxHeight: "90vh", overflowY: "auto" }}>
                  <h3 style={{ color: "#d4af37", margin: "0 0 20px", fontSize: 18, fontWeight: 900 }}>Agregar Taller</h3>
                  <div style={{ display: "grid", gridTemplateColumns: isMobile?"1fr":"1fr 1fr", gap: 12 }}>
                    <INPUT label="Nombre del taller" value={nuevoTaller.nombre}           onChange={e=>setNuevoTaller(p=>({...p,nombre:e.target.value}))}           placeholder="Carpinteria Regia" />
                    <INPUT label="Email"             value={nuevoTaller.email}            onChange={e=>setNuevoTaller(p=>({...p,email:e.target.value}))}            placeholder="taller@email.com" />
                    <INPUT label="Telefono"          value={nuevoTaller.telefono}         onChange={e=>setNuevoTaller(p=>({...p,telefono:e.target.value}))}         placeholder="81-1234-5678" />
                    <INPUT label="Especialidad"      value={nuevoTaller.especialidad}     onChange={e=>setNuevoTaller(p=>({...p,especialidad:e.target.value}))}     placeholder="Cocinas, Closets..." />
                    <INPUT label="Zona / Colonia"    value={nuevoTaller.zona}             onChange={e=>setNuevoTaller(p=>({...p,zona:e.target.value}))}             placeholder="San Pedro, Valle..." />
                    <INPUT label="Municipio"         value={nuevoTaller.municipio}        onChange={e=>setNuevoTaller(p=>({...p,municipio:e.target.value}))}        placeholder="San Pedro Garza Garcia" />
                    <INPUT label="Fecha vencimiento" value={nuevoTaller.fecha_vencimiento} onChange={e=>setNuevoTaller(p=>({...p,fecha_vencimiento:e.target.value}))} type="date" />
                    <INPUT label="Slug (URL del taller)" value={nuevoTaller.slug} onChange={e=>setNuevoTaller(p=>({...p,slug:e.target.value.toLowerCase().replace(/\s+/g,"-").replace(/[^a-z0-9-]/g,"")}))} placeholder="carpinteria-regia" />
                  </div>
                  <div style={{ marginBottom: 14 }}>
                    <label style={{ fontSize: 11, color: "#999", display: "block", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>Plan</label>
                    <div style={{ display: "flex", gap: 8 }}>
                      {[["basico","Basico $699","#888"],["pro","Pro $1,499","#00bcd4"],["premium","Premium $2,999","#d4af37"]].map(([p,l,c]) => (
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

        {/* IA */}
        {tab === "ia" && (
          <div>
            <h1 style={{ color: "#d4af37", margin: "0 0 4px", fontSize: isMobile?20:24 }}>Centro de IA</h1>
            <p style={{ color: "#aaa", margin: "0 0 20px", fontSize: 13 }}>Herramientas inteligentes para tu taller</p>

            {/* TABS DE IA */}
            <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
             {[["asistente","🤖 Asistente"],["renders","🎨 Renders"],...(role !== "cliente" ? [["social","📱 Redes Sociales"]] : [])].map(([k,l]) => (
                <button key={k} onClick={() => setIaTab(k)}
                  style={{ padding: "9px 18px", borderRadius: 10, border: `1px solid ${iaTab===k?"#d4af37":"#2a2a20"}`, background: iaTab===k?"#d4af3715":"transparent", color: iaTab===k?"#d4af37":"#aaa", fontSize: 13, cursor: "pointer", fontWeight: iaTab===k?700:400 }}>
                  {l}
                </button>
              ))}
            </div>

            {/* ASISTENTE DE DISEÑO */}
            {iaTab === "asistente" && (
              <div>
                {/* Sugerencias rápidas */}
                <div style={{ background: "#0f0f0a", border: "1px solid #1a1a12", borderRadius: 16, padding: 16, marginBottom: 16 }}>
                  <div style={{ fontSize: 11, color: "#d4af37", fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>🤖 Prueba tu Asistente IA</div>
                  <div style={{ fontSize: 12, color: "#888", marginBottom: 12 }}>Puedo ayudarte con cotizaciones, materiales, técnicas, atención al cliente y más. Prueba preguntarme:</div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {[
                      "¿Cuánto cuesta una cocina de 3m en MDF?",
                      "¿Qué materiales recomiendas para closet de lujo?",
                      "¿Cómo cotizo un proyecto con medidas irregulares?",
                      "¿Qué incluir en una garantía de carpintería?",
                      "¿Cómo responder a un cliente que pide descuento?",
                    ].map((s,i) => (
                      <button key={i} onClick={() => setChatInput(s)}
                        style={{ background: "#1a1208", border: "1px solid #d4af3730", color: "#d4af37", borderRadius: 20, padding: "6px 12px", fontSize: 11, cursor: "pointer", fontWeight: 500 }}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Chat */}
                <div style={{ background: "#0f0f0a", border: "1px solid #1a1a12", borderRadius: 16, overflow: "hidden", marginBottom: 16 }}>
                  {/* Historial */}
                  <div style={{ minHeight: 200, maxHeight: 400, overflowY: "auto", padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
                    {chatHistory.length === 0 && (
                      <div style={{ textAlign: "center", color: "#444", fontSize: 13, padding: "30px 0" }}>
                        Haz una pregunta o selecciona una sugerencia arriba
                      </div>
                    )}
                    {chatHistory.map((m, i) => (
                      <div key={i} style={{ display: "flex", justifyContent: m.role==="user"?"flex-end":"flex-start" }}>
                        <div style={{
                          maxWidth: "80%", padding: "10px 14px", borderRadius: m.role==="user"?"16px 16px 4px 16px":"16px 16px 16px 4px",
                          background: m.role==="user"?"#d4af3720":"#1a1a12",
                          border: `1px solid ${m.role==="user"?"#d4af3740":"#2a2a20"}`,
                          fontSize: 13, color: "#e8e0d0", lineHeight: 1.7, whiteSpace: "pre-wrap"
                        }}>
                          {m.role==="assistant" && <span style={{ fontSize: 10, color: "#d4af37", display: "block", marginBottom: 4, fontWeight: 700 }}>🤖 Asistente EnKaje</span>}
                          {m.content}
                        </div>
                      </div>
                    ))}
                    {chatLoading && (
                      <div style={{ display: "flex", justifyContent: "flex-start" }}>
                        <div style={{ background: "#1a1a12", border: "1px solid #2a2a20", borderRadius: "16px 16px 16px 4px", padding: "10px 14px", fontSize: 13, color: "#d4af37" }}>
                          ✨ Pensando...
                        </div>
                      </div>
                    )}
                  </div>
                  {/* Input */}
                  <div style={{ borderTop: "1px solid #1a1a12", padding: 12, display: "flex", gap: 8 }}>
                    <input
                      value={chatInput}
                      onChange={e => setChatInput(e.target.value)}
                      onKeyDown={e => e.key==="Enter" && !e.shiftKey && enviarChat()}
                      placeholder="Pregunta algo sobre carpintería, precios, materiales..."
                      style={{ flex: 1, background: "#0a0a08", border: "1px solid #2a2a20", borderRadius: 10, padding: "10px 14px", color: "#e8e0d0", fontSize: 13, fontFamily: "inherit" }}
                    />
                    <button onClick={enviarChat} disabled={chatLoading || !chatInput.trim()}
                      style={{ background: chatInput.trim()?"#d4af37":"#1a1a12", border: "none", borderRadius: 10, padding: "10px 16px", color: chatInput.trim()?"#000":"#555", fontSize: 13, cursor: chatInput.trim()?"pointer":"default", fontWeight: 700, whiteSpace: "nowrap" }}>
                      Enviar →
                    </button>
                  </div>
                </div>

                {/* Análisis de proyecto */}
                <div style={{ background: "#0f0f0a", border: "1px solid #d4af3720", borderRadius: 16, padding: isMobile?16:20 }}>
                  <h3 style={{ color: "#d4af37", margin: "0 0 12px", fontSize: 13, letterSpacing: 1 }}>📋 ANÁLISIS DEL PROYECTO ACTUAL</h3>
                  <TIPO_SELECTOR />
                  <BTN onClick={analizarConIA} disabled={aiLoading} style={{ width: "100%", marginTop: 12, fontSize: 13, padding: "11px", letterSpacing: 1 }}>
                    {aiLoading ? "Analizando..." : "🔍 ANALIZAR PROYECTO CON IA"}
                  </BTN>
                  {aiLoading && <div style={{ color: "#d4af37", fontSize: 13, padding: "12px 0" }}>Analizando especificaciones...</div>}
                  {aiResult && (
                    <div style={{ marginTop: 14 }}>
                      <div style={{ display: "flex", justifyContent: "flex-end", gap: 6, marginBottom: 8 }}>
                        <BTN onClick={() => compartir("whatsapp", aiResult, "Análisis IA")} color="#25D366" textColor="#fff" style={{ fontSize: 10, padding: "6px 10px" }}>WA</BTN>
                        <BTN onClick={() => { navigator.clipboard.writeText(aiResult); alert("Copiado"); }} outline color="#555" style={{ fontSize: 10, padding: "6px 10px" }}>Copiar</BTN>
                      </div>
                      <div style={{ fontSize: 13, color: "#e8e0d0", lineHeight: 1.9, whiteSpace: "pre-wrap", background: "#0a0a08", borderRadius: 10, padding: 14 }}>{aiResult}</div>
                    </div>
                  )}
                </div>

                {/* Disclaimer */}
                <div style={{ marginTop: 12, padding: "10px 14px", background: "#1a1208", border: "1px solid #d4af3720", borderRadius: 10, fontSize: 11, color: "#777", lineHeight: 1.6 }}>
                  ⚠️ <b style={{ color: "#d4af3799" }}>Nota:</b> La IA puede cometer errores. Verifica siempre los precios, materiales y recomendaciones antes de compartirlos con tu cliente. EnKaje Pro no se hace responsable por decisiones basadas únicamente en las sugerencias de la IA.
                </div>
              </div>
            )}

            {/* RENDERS DE DISEÑO */}
            {iaTab === "renders" && (() => {
              // Pre-llenar prompt con datos del formulario activo
              const f = getForm();
              const tipoLabel = tipoForm==="cocina"?"cocina integral":tipoForm==="closet"?"closet":tipoForm==="puerta"?"puerta":tipoForm==="mueble"?"mueble a medida":"proyecto de carpintería";
              const estilo = Array.isArray(f.estilo)&&f.estilo.length ? f.estilo.join(" y ") : "";
              const material = Array.isArray(f.material)&&f.material.length ? f.material.join(", ") : "";
              const color = f.color_principal || "";
              const acabado = Array.isArray(f.tipo_acabado)&&f.tipo_acabado.length ? f.tipo_acabado.join(", ") : "";
              const medidas = tipoForm==="cocina" ? (f.largo?`de ${f.largo} metros de largo`:"") : tipoForm==="puerta" ? (f.ancho&&f.alto?`de ${f.ancho}x${f.alto}`:"") : (f.largo?`de ${f.largo} metros`:"");
              const autoPrompt = [tipoLabel, estilo&&`estilo ${estilo}`, material&&`en ${material}`, color&&`color ${color}`, acabado&&`acabado ${acabado}`, medidas, "en Monterrey, México"].filter(Boolean).join(", ");
              if (autoPrompt && !renderPrompt) setTimeout(() => setRenderPrompt(autoPrompt), 100);
              return null;
            })()}
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
                        const tipoLabel = tipoForm==="cocina"?"cocina integral":tipoForm==="closet"?"closet":tipoForm==="puerta"?"puerta":"mueble a medida";
                        const estilo = Array.isArray(f.estilo)&&f.estilo.length ? f.estilo.join(" y ") : "";
                        const material = Array.isArray(f.material)&&f.material.length ? f.material.join(", ") : "";
                        const color = f.color_principal || "";
                        const acabado = Array.isArray(f.tipo_acabado)&&f.tipo_acabado.length ? f.tipo_acabado.join(", ") : "";
                        const medidas = tipoForm==="cocina"?(f.largo?`de ${f.largo} metros de largo`:""):tipoForm==="puerta"?(f.ancho&&f.alto?`de ${f.ancho}x${f.alto}`:""):(f.largo?`de ${f.largo} metros`:"");
                        setRenderPrompt([tipoLabel, estilo&&`estilo ${estilo}`, material&&`en ${material}`, color&&`color ${color}`, acabado&&`acabado ${acabado}`, medidas, "en Monterrey, México"].filter(Boolean).join(", "));
                      }} style={{ background: "transparent", border: "1px solid #d4af3740", color: "#d4af37", borderRadius: 6, padding: "4px 10px", fontSize: 11, cursor: "pointer" }}>
                        🔄 Usar datos del formulario
                      </button>
                    </div>
                    <textarea
                      value={renderPrompt}
                      onChange={e => setRenderPrompt(e.target.value)}
                      placeholder="Ej: cocina moderna negra mate con isla y cubierta de cuarzo blanco, iluminación LED, Monterrey..."
                      rows={3}
                      style={{ width: "100%", background: "#0a0a08", border: "1px solid #2a2a20", borderRadius: 10, padding: "11px 14px", color: "#e8e0d0", fontSize: 13, resize: "vertical", fontFamily: "inherit" }}
                    />
                  </div>
                  <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
                    <BTN onClick={generarRender} disabled={renderLoading || !renderPrompt.trim()} style={{ fontSize: 13, padding: "11px 24px" }}>
                      {renderLoading ? "⏳ Generando render..." : "✨ Generar Render"}
                    </BTN>
                    {renderMsg && <span style={{ fontSize: 12, color: renderMsg.startsWith("✅") ? "#4caf50" : "#f44336" }}>{renderMsg}</span>}
                  </div>
                </div>

                {renderLoading && (
                  <div style={{ background: "#0f0f0a", borderRadius: 16, padding: 40, textAlign: "center" }}>
                    <div style={{ color: "#d4af37", fontSize: 14, marginBottom: 8 }}>✨ Generando render con IA...</div>
                    <div style={{ color: "#555", fontSize: 12 }}>Esto puede tomar 15-30 segundos</div>
                  </div>
                )}

                {renderImg && !renderLoading && (
                  <div style={{ background: "#0f0f0a", border: "1px solid #d4af3730", borderRadius: 16, overflow: "hidden" }}>
                    <img src={renderImg} alt="Render generado" style={{ width: "100%", display: "block", borderRadius: "16px 16px 0 0" }} />
                    <div style={{ padding: 16, display: "flex", gap: 10, flexWrap: "wrap" }}>
                      <a href={renderImg} download="render-enkaje-pro.png" target="_blank" rel="noreferrer"
                        style={{ background: "#d4af37", color: "#000", borderRadius: 10, padding: "9px 20px", fontWeight: 700, fontSize: 13, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6 }}>
                        ⬇️ Descargar
                      </a>
                      <BTN onClick={() => compartir("whatsapp", `Mira el render de tu proyecto: ${renderImg}`, "Render EnKaje Pro")} color="#25D366" textColor="#fff" style={{ fontSize: 13 }}>
                        💬 Compartir por WhatsApp
                      </BTN>
                      <BTN onClick={() => setIaTab("social")} outline color="#E1306C" style={{ fontSize: 13 }}>
                        📱 Generar caption para redes
                      </BTN>
                    </div>
                  </div>
                )}
              <div style={{ marginTop: 12, padding: "10px 14px", background: "#1a1208", border: "1px solid #d4af3720", borderRadius: 10, fontSize: 11, color: "#777", lineHeight: 1.6 }}>
                ⚠️ <b style={{ color: "#d4af3799" }}>Nota:</b> La IA puede cometer errores. Verifica siempre los resultados antes de compartirlos con tu cliente.
              </div>
              </div>
            )}

            {/* CONTENIDO PARA REDES SOCIALES */}
            {iaTab === "social" && (
              <div>
                <div style={{ background: "#0f0f0a", border: "1px solid #d4af3720", borderRadius: 16, padding: 20, marginBottom: 16 }}>
                  <h3 style={{ color: "#d4af37", margin: "0 0 8px", fontSize: 13, letterSpacing: 1 }}>📱 GENERADOR DE CONTENIDO</h3>
                  <p style={{ color: "#aaa", fontSize: 12, marginBottom: 16 }}>Genera captions e hashtags listos para copiar y pegar en tus redes</p>
                  <TIPO_SELECTOR />
                  <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap", marginTop: 12 }}>
                    <BTN onClick={generarContenidoSocial} disabled={socialLoading} style={{ fontSize: 13, padding: "11px 24px" }}>
                      {socialLoading ? "⏳ Generando..." : "✨ Generar Caption"}
                    </BTN>
                  </div>
                </div>

                {socialCaption && (
                  <div style={{ background: "#0f0f0a", border: "1px solid #E1306C30", borderRadius: 16, padding: 20 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                      <h3 style={{ color: "#E1306C", margin: 0, fontSize: 13, letterSpacing: 1 }}>📸 CAPTION LISTO</h3>
                      <BTN onClick={() => { navigator.clipboard.writeText(socialCaption); alert("¡Copiado! Pégalo en Instagram o Facebook"); }} outline color="#E1306C" style={{ fontSize: 11, padding: "6px 12px" }}>
                        📋 Copiar todo
                      </BTN>
                    </div>
                    <div style={{ fontSize: 13, color: "#e8e0d0", lineHeight: 1.8, whiteSpace: "pre-wrap", background: "#0a0a08", borderRadius: 10, padding: 16 }}>
                      {socialCaption}
                    </div>
                    <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
                      <BTN onClick={() => compartir("facebook", socialCaption, "Post EnKaje Pro")} color="#1877F2" textColor="#fff" style={{ fontSize: 12 }}>📘 Abrir Facebook</BTN>
                      <BTN onClick={() => compartir("whatsapp", socialCaption, "Post EnKaje Pro")} color="#25D366" textColor="#fff" style={{ fontSize: 12 }}>💬 Compartir WA</BTN>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
       </div>
     {/* COOKIE BANNER */}
      <CookieBanner onVerCookies={() => setLegalPage("cookies")} />

      {/* FOOTER LEGAL — visible en todas las tabs */}
      <div style={{ borderTop: "1px solid #1a1a12", padding: "16px 20px", textAlign: "center", display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
        {[["privacidad","Privacidad"],["terminos","Términos"],["cookies","Cookies"]].map(([k,l]) => (
          <button key={k} onClick={() => setLegalPage(k)} style={{ background: "transparent", border: "none", color: "#444", fontSize: 11, cursor: "pointer", letterSpacing: 1, textDecoration: "underline" }}>{l}</button>
        ))}
        <span style={{ color: "#2a2a20", fontSize: 11 }}>· © 2025 EnKaje Pro · Monterrey, México</span>
      </div>

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
