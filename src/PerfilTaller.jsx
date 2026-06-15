import { useState, useEffect } from "react";
import { LogoInline } from "./Logo.jsx";

const SUPABASE_URL = "https://iucoggyualkyojmmgael.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml1Y29nZ3l1YWxreW9qbW1nYWVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAwMTMxOTMsImV4cCI6MjA5NTU4OTE5M30.QNU604KcLaSxXxoZaxmVbt-sf-aFDTjrVoTR4K-wy5c";

const GOLD = "#d4af37";

const CSS = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #070708; color: #e8e0d0; }
  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-thumb { background: #d4af3740; border-radius: 3px; }
  @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
  .fade-up { animation: fadeUp 0.5s ease forwards; }
  .btn-primary { background: #d4af37; color: #000; border: none; border-radius: 12px; padding: 14px 28px; font-weight: 700; font-size: 15px; cursor: pointer; transition: all .2s; }
  .btn-primary:hover { background: #e8c84a; transform: translateY(-2px); }
  @media (max-width: 768px) {
    .hide-mobile { display: none !important; }
    .grid-2 { grid-template-columns: 1fr !important; }
  }
`;

export default function PerfilTaller() {
  const [taller, setTaller] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [formStep, setFormStep] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ nombre: "", telefono: "", correo: "", proyecto: "", mensaje: "" });
  const [sending, setSending] = useState(false);

  // Extraer slug y ref del URL
  const parts = window.location.pathname.split("/");
  const slug = parts[2] || "";
  const ref = new URLSearchParams(window.location.search).get("ref") || "directo";

  useEffect(() => {
    async function cargar() {
      if (!slug) { setNotFound(true); setLoading(false); return; }
      try {
        const r = await fetch(
          `${SUPABASE_URL}/rest/v1/talleres_membresia?slug=eq.${slug}&apikey=${SUPABASE_KEY}`,
          { headers: { "Authorization": `Bearer ${SUPABASE_KEY}` } }
        );
        const data = await r.json();
        if (Array.isArray(data) && data.length > 0 && data[0].estado === "activo") {
          setTaller(data[0]);
          // Registrar visita con canal de referencia
          await fetch(
           `${SUPABASE_URL}/rest/v1/talleres_membresia?id=eq.${data[0].id}`,
            {
              method: "PATCH",
              headers: { "apikey": SUPABASE_KEY, "Authorization": `Bearer ${SUPABASE_KEY}`, "Content-Type": "application/json", "Prefer": "return=minimal" },
              body: JSON.stringify({ visitas: (data[0].visitas || 0) + 1 })
            }
          );
        } else {
          setNotFound(true);
        }
      } catch { setNotFound(true); }
      setLoading(false);
    }
    cargar();
  }, []);

  async function enviarSolicitud() {
    if (!form.nombre || !form.telefono) return;
    setSending(true);
    try {
      await fetch(`${SUPABASE_URL}/rest/v1/proyectos`, {
        method: "POST",
        headers: { "apikey": SUPABASE_KEY, "Authorization": `Bearer ${SUPABASE_KEY}`, "Content-Type": "application/json", "Prefer": "return=minimal" },
        body: JSON.stringify({
          nombre: form.nombre,
          telefono: form.telefono,
          correo: form.correo,
          observaciones: `${form.proyecto}${form.mensaje ? " — " + form.mensaje : ""}`,
          estado: "nuevo",
          user_email: form.correo,
          atencion_por: taller?.nombre || slug,
          canal_origen: ref,
          taller_slug: slug,
          created_at: new Date().toISOString(),
        })
      });
      // Incrementar leads
      await fetch(
        `${SUPABASE_URL}/rest/v1/talleres_membresia?id=eq.${taller.id}`,
        {
          method: "PATCH",
          headers: { "apikey": SUPABASE_KEY, "Authorization": `Bearer ${SUPABASE_KEY}`, "Content-Type": "application/json", "Prefer": "return=minimal" },
          body: JSON.stringify({ leads_recibidos: (taller.leads_recibidos || 0) + 1 })
        }
      );
      // WhatsApp automático al taller
      const telTaller = (taller.telefono || "").replace(/\D/g, "");
      if (telTaller) {
        const sep = "━".repeat(22);
        const msg = `🔔 *NUEVA SOLICITUD*\n${sep}\n👤 *Cliente:* ${form.nombre}\n📱 *Tel:* ${form.telefono}\n${form.correo?`📧 *Correo:* ${form.correo}\n`:""}${form.proyecto?`🔨 *Proyecto:* ${form.proyecto}\n`:""}${form.mensaje?`💬 *Mensaje:* ${form.mensaje}\n`:""}${sep}\nCanal: ${ref} · enkajepro.com`;
        window.open(`https://wa.me/52${telTaller}?text=${encodeURIComponent(msg)}`, "_blank");
      }
      setSent(true);
    } catch(e) { alert("Error al enviar: " + e.message); }
    setSending(false);
  }

  const planColor = taller?.plan === "premium" ? GOLD : taller?.plan === "pro" ? "#00bcd4" : "#888";
  const planLabel = taller?.plan === "premium" ? "Premium" : taller?.plan === "pro" ? "Pro" : "Básico";

  if (loading) return (
    <div style={{ minHeight: "100vh", background: "#070708", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <style>{CSS}</style>
      <div style={{ color: GOLD, fontSize: 14 }}>Cargando...</div>
    </div>
  );

  if (notFound) return (
    <div style={{ minHeight: "100vh", background: "#070708", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <style>{CSS}</style>
      <LogoInline size="nav" />
      <div style={{ marginTop: 32, textAlign: "center" }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
        <h2 style={{ color: "#e8e0d0", marginBottom: 8 }}>Taller no encontrado</h2>
        <p style={{ color: "#666", marginBottom: 24 }}>El enlace puede estar desactivado o ser incorrecto.</p>
        <button className="btn-primary" onClick={() => window.location.href = "/"}>Ver todos los talleres</button>
      </div>
    </div>
  );

  return (
    <div style={{ background: "#070708", minHeight: "100vh" }}>
      <style>{CSS}</style>

      {/* NAV */}
      <nav style={{ borderBottom: "1px solid #1a1a12", padding: "14px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, background: "#070708", zIndex: 100 }}>
        <div onClick={() => window.location.href = "/"} style={{ cursor: "pointer" }}>
          <LogoInline size="nav" />
        </div>
        <button className="btn-primary" style={{ padding: "9px 20px", fontSize: 13 }} onClick={() => { setFormStep(true); setTimeout(() => document.getElementById("cotizar-form")?.scrollIntoView({behavior:"smooth"}), 100); }}>
          Solicitar cotización
        </button>
      </nav>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px 80px" }}>

        {/* HEADER DEL TALLER */}
        <div className="fade-up" style={{ background: "linear-gradient(135deg,#1a1208,#0f0f0a)", border: `1px solid ${planColor}30`, borderRadius: 20, padding: "32px", marginBottom: 24, display: "flex", gap: 24, alignItems: "flex-start", flexWrap: "wrap" }}>
          <div style={{ width: 90, height: 90, borderRadius: "50%", background: `${planColor}20`, border: `2px solid ${planColor}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, flexShrink: 0, overflow: "hidden" }}>
            {taller.logo_url
              ? <img src={taller.logo_url} alt={taller.nombre} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }} onError={e => { e.target.style.display="none"; e.target.parentNode.innerHTML="🏭"; }} />
              : <span>🏭</span>
            }
          </div>
          <div style={{ flex: 1, minWidth: 200 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 8 }}>
              <h1 style={{ fontSize: 26, fontWeight: 900, color: "#e8e0d0", margin: 0 }}>{taller.nombre}</h1>
              <span style={{ background: `${planColor}20`, border: `1px solid ${planColor}`, color: planColor, borderRadius: 20, padding: "3px 12px", fontSize: 11, fontWeight: 700 }}>
                ✓ Verificado EnKaje Pro
              </span>
            </div>
            <div style={{ fontSize: 14, color: "#aaa", marginBottom: 12 }}>
              {taller.especialidad && <span>📐 {taller.especialidad}</span>}
              {taller.municipio && <span style={{ marginLeft: 16 }}>📍 {taller.municipio}</span>}
              {taller.zona && <span style={{ marginLeft: 16 }}>🗺️ {taller.zona}</span>}
            </div>
            {ref !== "directo" && (
              <div style={{ fontSize: 11, color: "#999", marginTop: 4 }}>
                Llegaste desde {ref}
              </div>
            )}
          </div>
          <button className="btn-primary" onClick={() => { setFormStep(true); setTimeout(() => document.getElementById("cotizar-form")?.scrollIntoView({behavior:"smooth"}), 100); }} style={{ flexShrink: 0 }}>
            Solicitar cotización →
          </button>
        </div>

        {/* ESPECIALIDADES */}
        {taller.especialidad && (
          <div style={{ background: "#0f0f0a", border: "1px solid #1a1a12", borderRadius: 16, padding: 24, marginBottom: 20 }}>
            <h3 style={{ fontSize: 13, color: GOLD, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 16 }}>🔨 Especialidades</h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {taller.especialidad.split(",").map((e, i) => (
                <span key={i} style={{ background: "#1a1208", border: `1px solid ${GOLD}30`, color: "#e8e0d0", borderRadius: 20, padding: "6px 16px", fontSize: 13 }}>
                  {e.trim()}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* ZONA */}
        <div style={{ background: "#0f0f0a", border: "1px solid #1a1a12", borderRadius: 16, padding: 24, marginBottom: 20 }}>
          <h3 style={{ fontSize: 13, color: GOLD, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 16 }}>📍 Zona de Servicio</h3>
          <div style={{ display: "grid", gridTemplate: "grid-2", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {taller.municipio && <div style={{ background: "#1a1208", borderRadius: 10, padding: "12px 16px" }}><div style={{ fontSize: 11, color: "#999", marginBottom: 4 }}>MUNICIPIO</div><div style={{ fontSize: 14, color: "#e8e0d0", fontWeight: 600 }}>{taller.municipio}</div></div>}
            {taller.zona && <div style={{ background: "#1a1208", borderRadius: 10, padding: "12px 16px" }}><div style={{ fontSize: 11, color: "#999", marginBottom: 4 }}>ZONA / COLONIA</div><div style={{ fontSize: 14, color: "#e8e0d0", fontWeight: 600 }}>{taller.zona}</div></div>}
            {taller.garantia_default && <div style={{ background: "#1a1208", borderRadius: 10, padding: "12px 16px" }}><div style={{ fontSize: 11, color: "#999", marginBottom: 4 }}>GARANTÍA</div><div style={{ fontSize: 14, color: "#e8e0d0", fontWeight: 600 }}>{taller.garantia_default}</div></div>}
            <div style={{ background: "#1a1208", borderRadius: 10, padding: "12px 16px" }}><div style={{ fontSize: 11, color: "#999", marginBottom: 4 }}>PLAN</div><div style={{ fontSize: 14, color: planColor, fontWeight: 700 }}>{planLabel}</div></div>
          </div>
        </div>

        {/* REDES SOCIALES Y DATOS */}
        {(taller.facebook || taller.instagram || taller.tiktok || taller.google_maps || taller.anos_experiencia || taller.horario) && (
          <div style={{ background: "#0f0f0a", border: "1px solid #1a1a12", borderRadius: 16, padding: 24, marginBottom: 20 }}>
            {(taller.anos_experiencia || taller.horario) && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: taller.facebook||taller.instagram||taller.tiktok||taller.google_maps ? 20 : 0 }}>
                {taller.anos_experiencia && (
                  <div style={{ background: "#1a1208", borderRadius: 10, padding: "12px 16px", textAlign: "center" }}>
                    <div style={{ fontSize: 28, fontWeight: 900, color: GOLD }}>{taller.anos_experiencia}</div>
                    <div style={{ fontSize: 11, color: "#999", textTransform: "uppercase", letterSpacing: 1 }}>años de experiencia</div>
                  </div>
                )}
                {taller.horario && (
                  <div style={{ background: "#1a1208", borderRadius: 10, padding: "12px 16px" }}>
                    <div style={{ fontSize: 11, color: "#999", textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>🕐 Horario</div>
                    <div style={{ fontSize: 13, color: "#e8e0d0", fontWeight: 600, lineHeight: 1.5 }}>{taller.horario}</div>
                  </div>
                )}
              </div>
            )}
            {(taller.facebook || taller.instagram || taller.tiktok || taller.google_maps) && (
              <div>
                <div style={{ fontSize: 11, color: GOLD, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>Síguenos</div>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  {taller.facebook && (
                    <a href={taller.facebook} target="_blank" rel="noreferrer"
                      style={{ background: "#1877F220", border: "1px solid #1877F240", color: "#1877F2", borderRadius: 10, padding: "9px 16px", fontWeight: 700, fontSize: 13, textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
                      📘 Facebook
                    </a>
                  )}
                  {taller.instagram && (
                    <a href={`https://instagram.com/${taller.instagram.replace("@","")}`} target="_blank" rel="noreferrer"
                      style={{ background: "#E1306C20", border: "1px solid #E1306C40", color: "#E1306C", borderRadius: 10, padding: "9px 16px", fontWeight: 700, fontSize: 13, textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
                      📸 {taller.instagram}
                    </a>
                  )}
                  {taller.tiktok && (
                    <a href={`https://tiktok.com/@${taller.tiktok.replace("@","")}`} target="_blank" rel="noreferrer"
                      style={{ background: "#ee1d5220", border: "1px solid #ee1d5240", color: "#ee1d52", borderRadius: 10, padding: "9px 16px", fontWeight: 700, fontSize: 13, textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
                      🎵 {taller.tiktok}
                    </a>
                  )}
                  {taller.google_maps && (
                    <a href={taller.google_maps} target="_blank" rel="noreferrer"
                      style={{ background: "#4caf5020", border: "1px solid #4caf5040", color: "#4caf50", borderRadius: 10, padding: "9px 16px", fontWeight: 700, fontSize: 13, textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
                      📍 Google Maps
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
{/* PORTAFOLIO */}
        {taller.portafolio_urls && taller.portafolio_urls.trim() && (
          <div style={{ background: "#0f0f0a", border: "1px solid #1a1a12", borderRadius: 16, padding: 24, marginBottom: 20 }}>
            <h3 style={{ fontSize: 13, color: GOLD, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 16 }}>📷 Trabajos Realizados</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 10 }}>
              {taller.portafolio_urls.split(",").map(u => u.trim()).filter(Boolean).map((url, i) => (
                <div key={i} style={{ position: "relative", borderRadius: 12, overflow: "hidden", aspectRatio: "1", border: "1px solid #1a1a12" }}>
                  <img src={url} alt={`Trabajo ${i+1}`} style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    onError={e => { e.target.parentNode.style.display = "none"; }} />
                </div>
              ))}
            </div>
          </div>
        )}
        {/* CTA */}
        {!formStep && !sent && (
          <div style={{ background: "linear-gradient(135deg,#1a1208,#0f0f0a)", border: `1px solid ${GOLD}40`, borderRadius: 20, padding: 32, textAlign: "center" }}>
            <h2 style={{ fontSize: 22, fontWeight: 900, marginBottom: 8, color: "#e8e0d0" }}>¿Listo para tu proyecto?</h2>
            <p style={{ color: "#ccc", fontSize: 14, marginBottom: 24 }}>Solicita tu cotización gratis. Sin compromiso.</p>
            <button className="btn-primary" style={{ fontSize: 16, padding: "14px 40px" }} onClick={() => { setFormStep(true); setTimeout(() => document.getElementById("cotizar-form")?.scrollIntoView({behavior:"smooth"}), 100); }}>
              Solicitar cotización gratis →
            </button>
          </div>
        )}

        {/* FORMULARIO DE SOLICITUD */}
        {formStep && !sent && (
          <div id="cotizar-form" className="fade-up" style={{ background: "#0f0f0a", border: `1px solid ${GOLD}30`, borderRadius: 20, padding: 28 }}>
            <h3 style={{ fontSize: 18, fontWeight: 900, color: "#e8e0d0", marginBottom: 6 }}>Solicitar Cotización</h3>
            <p style={{ fontSize: 13, color: "#aaa", marginBottom: 24 }}>El taller te contactará en menos de 24 horas.</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }} className="grid-2">
              {[["Nombre completo *","nombre","Tu nombre"],["Teléfono *","telefono","81-1234-5678"],["Correo","correo","correo@ejemplo.com"],["Tipo de proyecto","proyecto","Cocina, Closet, Puerta..."]].map(([label, key, ph]) => (
                <div key={key}>
                  <label style={{ fontSize: 11, color: "#999", display: "block", marginBottom: 5, textTransform: "uppercase", letterSpacing: 1 }}>{label}</label>
                  <input value={form[key]} onChange={e => setForm(p => ({...p, [key]: e.target.value}))} placeholder={ph}
                    style={{ width: "100%", background: "#0a0a08", border: "1px solid #2a2a20", borderRadius: 10, padding: "11px 14px", color: "#e8e0d0", fontSize: 14, outline: "none" }} />
                </div>
              ))}
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 11, color: "#999", display: "block", marginBottom: 5, textTransform: "uppercase", letterSpacing: 1 }}>Mensaje adicional</label>
              <textarea value={form.mensaje} onChange={e => setForm(p => ({...p, mensaje: e.target.value}))} placeholder="Cuéntanos más sobre tu proyecto..."
                rows={3} style={{ width: "100%", background: "#0a0a08", border: "1px solid #2a2a20", borderRadius: 10, padding: "11px 14px", color: "#e8e0d0", fontSize: 14, resize: "vertical" }} />
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setFormStep(false)} style={{ background: "transparent", border: "1px solid #333", color: "#888", borderRadius: 10, padding: "11px 20px", cursor: "pointer", fontSize: 13 }}>Cancelar</button>
              <button onClick={enviarSolicitud} disabled={sending || !form.nombre || !form.telefono}
                style={{ flex: 1, background: sending ? "#1a1a10" : GOLD, color: sending ? "#555" : "#000", border: "none", borderRadius: 10, padding: "11px", fontWeight: 900, fontSize: 14, cursor: sending ? "not-allowed" : "pointer" }}>
                {sending ? "Enviando..." : "Enviar solicitud →"}
              </button>
            </div>
          </div>
        )}

        {/* CONFIRMACIÓN */}
        {sent && (
          <div className="fade-up" style={{ background: "#0a2a0a", border: "1px solid #4caf5040", borderRadius: 20, padding: 32, textAlign: "center" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
            <h3 style={{ fontSize: 20, fontWeight: 900, color: "#4caf50", marginBottom: 8 }}>¡Solicitud enviada!</h3>
            <p style={{ color: "#aaa", fontSize: 14 }}>{taller.nombre} te contactará en menos de 24 horas al número {form.telefono}.</p>
          </div>
        )}

      </div>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid #1a1a12", padding: "20px 24px", textAlign: "center" }}>
        <div style={{ fontSize: 12, color: "#888" }}>
          Powered by <span style={{ color: GOLD, fontWeight: 700 }}>EnKaje Pro</span> · enkajepro.com
        </div>
      </footer>
    </div>
  );
}
