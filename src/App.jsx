import { useState } from "react";

const TALLERES = [
  { id: 1, nombre: "Maderas del Norte", categoria: "premium", precio: 5, rapidez: 3, calidad: 5, seguro: true, telefono: "81-1234-5678", especialidad: "Diseno a medida, render 3D", ubicacion: "San Pedro Garza Garcia", avatar: "T1", entregas: "3-4 semanas", resenas: 48 },
  { id: 2, nombre: "Carpinteria Regia", categoria: "premium", precio: 4, rapidez: 4, calidad: 5, seguro: true, telefono: "81-2345-6789", especialidad: "Closets, cocinas, muebles finos", ubicacion: "Monterrey Centro", avatar: "T2", entregas: "2-3 semanas", resenas: 92 },
  { id: 3, nombre: "Taller Express MTY", categoria: "rapido", precio: 3, rapidez: 5, calidad: 3, seguro: false, telefono: "81-3456-7890", especialidad: "Entregas urgentes, reparaciones", ubicacion: "Apodaca", avatar: "T3", entregas: "3-7 dias", resenas: 31 },
  { id: 4, nombre: "Muebles Economicos GN", categoria: "economico", precio: 5, rapidez: 3, calidad: 3, seguro: false, telefono: "81-4567-8901", especialidad: "Muebles basicos, recamaras", ubicacion: "Guadalupe", avatar: "T4", entregas: "2-3 semanas", resenas: 67 },
  { id: 5, nombre: "Artesanos del Roble", categoria: "premium", precio: 3, rapidez: 2, calidad: 5, seguro: true, telefono: "81-5678-9012", especialidad: "Madera maciza, edicion limitada", ubicacion: "San Nicolas", avatar: "T5", entregas: "4-6 semanas", resenas: 22 },
  { id: 6, nombre: "Speed Carpinteria", categoria: "rapido", precio: 4, rapidez: 5, calidad: 4, seguro: true, telefono: "81-6789-0123", especialidad: "Entregas en 72h, closets rapidos", ubicacion: "Escobedo", avatar: "T6", entregas: "3-5 dias", resenas: 55 },
  { id: 7, nombre: "Don Chuy Muebleria", categoria: "economico", precio: 5, rapidez: 4, calidad: 3, seguro: false, telefono: "81-7890-1234", especialidad: "Todo tipo de muebles, bajo costo", ubicacion: "Monterrey Sur", avatar: "T7", entregas: "1-2 semanas", resenas: 104 },
];

const AGENTES = [
  { id: 1, nombre: "Sofia Ramirez", tipo: "social", red: "Instagram/TikTok", clientes: 12, conversion: 68, descripcion: "Contenido visual, reels de disenos 3D" },
  { id: 2, nombre: "Carlos Mendoza", tipo: "social", red: "Pinterest/Facebook", clientes: 8, conversion: 54, descripcion: "Posts de fotos, tableros tematicos" },
  { id: 3, nombre: "IA Cotizadora", tipo: "ia", red: "Llamadas/WhatsApp", clientes: 35, conversion: 82, descripcion: "Cotizaciones automaticas por presupuesto" },
  { id: 4, nombre: "Andrea Lopez", tipo: "cierre", red: "Visitas presenciales", clientes: 20, conversion: 91, descripcion: "Cierre de contratos, visitas a domicilio" },
];

const CLIENTES_INIT = [
  { id: 1, nombre: "Maria Gonzalez", tipo: "premium", presupuesto: 85000, estado: "cotizando", origen: "Instagram", proyecto: "Cocina integral", fecha: "2026-05-20" },
  { id: 2, nombre: "Roberto Sanchez", tipo: "rapido", presupuesto: 18000, estado: "cerrado", origen: "TikTok", proyecto: "Closet recamara", fecha: "2026-05-18" },
  { id: 3, nombre: "Laura Perez", tipo: "economico", presupuesto: 12000, estado: "prospecto", origen: "Pinterest", proyecto: "Sala comedor", fecha: "2026-05-24" },
  { id: 4, nombre: "Diego Torres", tipo: "premium", presupuesto: 140000, estado: "contrato", origen: "Facebook", proyecto: "Remodelacion completa", fecha: "2026-05-15" },
  { id: 5, nombre: "Fernanda Ruiz", tipo: "rapido", presupuesto: 25000, estado: "cotizando", origen: "Instagram", proyecto: "Televisor empotrado", fecha: "2026-05-22" },
];

const CAT = {
  premium: { border: "#d4af37", text: "#d4af37", label: "PREMIUM" },
  rapido: { border: "#00bcd4", text: "#00bcd4", label: "RAPIDO" },
  economico: { border: "#4caf50", text: "#4caf50", label: "ECONOMICO" },
};

const ESTADO_COLORS = { prospecto: "#888", cotizando: "#f0a500", contrato: "#00bcd4", cerrado: "#4caf50" };

export default function App() {
  const [tab, setTab] = useState("dashboard");
  const [filtroTaller, setFiltroTaller] = useState("todos");
  const [filtroSeguro, setFiltroSeguro] = useState("todos");
  const [clienteSel, setClienteSel] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState("");
  const [aiForm, setAiForm] = useState({ presupuesto: "", proyecto: "", prioridad: "precio" });
  const [nuevoCliente, setNuevoCliente] = useState({ nombre: "", presupuesto: "", proyecto: "", origen: "Instagram" });
  const [clientes, setClientes] = useState(CLIENTES_INIT);
  const [showModal, setShowModal] = useState(false);

  const talleresFiltrados = TALLERES.filter(t => {
    if (filtroTaller !== "todos" && t.categoria !== filtroTaller) return false;
    if (filtroSeguro === "con" && !t.seguro) return false;
    if (filtroSeguro === "sin" && t.seguro) return false;
    return true;
  });

  async function cotizarConIA() {
    if (!aiForm.presupuesto || !aiForm.proyecto) return;
    setAiLoading(true);
    setAiResult("");
    try {
      const prompt = `Eres asesor de carpinteria en Monterrey. Cliente quiere: "${aiForm.proyecto}" con presupuesto $${aiForm.presupuesto} MXN. Prioridad: "${aiForm.prioridad}".
Talleres disponibles:
${TALLERES.map(t => `- ${t.nombre} (${t.categoria}): Precio ${t.precio}/5, Rapidez ${t.rapidez}/5, Calidad ${t.calidad}/5, Seguro: ${t.seguro ? "Si" : "No"}, Entrega: ${t.entregas}, Ubicacion: ${t.ubicacion}`).join("\n")}
Recomienda TOP 3 talleres. Se especifico, usa emojis, da rangos de precio estimados. Max 250 palabras. Numerado con nombre en negrita.`;

      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json", "anthropic-dangerous-direct-browser-calls": "true" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 600,
          messages: [{ role: "user", content: prompt }]
        })
      });
      const data = await res.json();
      setAiResult(data.content?.[0]?.text || "Error al obtener respuesta.");
    } catch (e) {
      setAiResult("Error de conexion. Verifica tu API key.");
    }
    setAiLoading(false);
  }

  function agregarCliente() {
    if (!nuevoCliente.nombre || !nuevoCliente.presupuesto) return;
    const p = parseInt(nuevoCliente.presupuesto);
    const tipo = p >= 50000 ? "premium" : p >= 20000 ? "rapido" : "economico";
    setClientes(prev => [...prev, { id: prev.length + 1, ...nuevoCliente, presupuesto: p, tipo, estado: "prospecto", fecha: new Date().toISOString().split("T")[0] }]);
    setNuevoCliente({ nombre: "", presupuesto: "", proyecto: "", origen: "Instagram" });
    setShowModal(false);
  }

  const stats = {
    totalClientes: clientes.length,
    cerrados: clientes.filter(c => c.estado === "cerrado").length,
    ingresos: clientes.filter(c => c.estado === "cerrado").reduce((a, c) => a + c.presupuesto * 0.15, 0),
    cotizando: clientes.filter(c => c.estado === "cotizando").length,
  };

  const s = { fontFamily: "Arial, sans-serif", background: "#0a0a0f", minHeight: "100vh", color: "#e8e0d0" };

  return (
    <div style={s}>
      {/* HEADER */}
      <div style={{ background: "linear-gradient(135deg,#1a1208,#0a0a0f)", borderBottom: "1px solid #d4af3740", padding: "0 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 0" }}>
          <div>
            <div style={{ fontSize: 22, fontWeight: 900, color: "#d4af37", letterSpacing: 2 }}>EnKaje PCCM</div>
            <div style={{ fontSize: 11, color: "#888", letterSpacing: 2 }}>INTERMEDIACION - CARPINTERIA - MONTERREY</div>
          </div>
          <button onClick={() => setShowModal(true)} style={{ background: "#d4af37", color: "#0a0a0f", border: "none", borderRadius: 8, padding: "10px 20px", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
            + NUEVO CLIENTE
          </button>
        </div>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", gap: 4 }}>
          {[["dashboard","Dashboard"],["talleres","Talleres"],["clientes","Clientes"],["agentes","Agentes"],["ia","IA Cotizadora"]].map(([k, l]) => (
            <button key={k} onClick={() => setTab(k)} style={{ background: "transparent", border: "none", borderBottom: tab === k ? "2px solid #d4af37" : "2px solid transparent", color: tab === k ? "#d4af37" : "#888", padding: "12px 16px", cursor: "pointer", fontSize: 13, fontWeight: 600 }}>{l}</button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "28px 24px" }}>

        {/* DASHBOARD */}
        {tab === "dashboard" && (
          <div>
            <h1 style={{ color: "#d4af37", margin: "0 0 24px" }}>Panel General</h1>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 32 }}>
              {[
                ["Total Clientes", stats.totalClientes, "#d4af37"],
                ["Cotizando", stats.cotizando, "#00bcd4"],
                ["Cierres", stats.cerrados, "#4caf50"],
                ["Ingresos Est.", "$" + stats.ingresos.toLocaleString("es-MX", { maximumFractionDigits: 0 }), "#f0a500"],
              ].map(([l, v, c], i) => (
                <div key={i} style={{ background: "#12120a", border: `1px solid ${c}30`, borderRadius: 12, padding: 20 }}>
                  <div style={{ fontSize: 11, color: "#666", letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>{l}</div>
                  <div style={{ fontSize: 30, fontWeight: 900, color: c }}>{v}</div>
                </div>
              ))}
            </div>

            <div style={{ background: "#12120a", border: "1px solid #d4af3720", borderRadius: 16, padding: 24, marginBottom: 24 }}>
              <h3 style={{ color: "#d4af37", margin: "0 0 20px" }}>Flujo Operativo</h3>
              <div style={{ display: "flex", alignItems: "center", overflowX: "auto", gap: 0 }}>
                {[
                  ["1","Agentes RRSS","Posts en Instagram, TikTok, Pinterest con renders y videos"],
                  ["2","Captacion","Cliente clasificado por presupuesto premium/rapido/economico"],
                  ["3","IA Cotiza","Llama al cliente, recaba especificaciones y presupuesto"],
                  ["4","Busca Talleres","Vas a talleres segun criterios: diseno, precio, rapidez, seguro"],
                  ["5","Cierre","Presentas presupuestos, firman contrato sin responsabilidad de obra"],
                ].map(([n, t, d], i, arr) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", flex: "none" }}>
                    <div style={{ background: "#1a1208", border: "1px solid #d4af3730", borderRadius: 12, padding: "16px", width: 160, textAlign: "center" }}>
                      <div style={{ fontSize: 10, color: "#d4af37", fontWeight: 700, letterSpacing: 1, marginBottom: 4 }}>PASO {n}</div>
                      <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 6 }}>{t}</div>
                      <div style={{ fontSize: 11, color: "#666", lineHeight: 1.4 }}>{d}</div>
                    </div>
                    {i < arr.length - 1 && <div style={{ color: "#d4af37", fontSize: 20, padding: "0 8px", opacity: 0.5 }}>-&gt;</div>}
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: "#12120a", border: "1px solid #ffffff10", borderRadius: 16, padding: 24 }}>
              <h3 style={{ color: "#d4af37", margin: "0 0 16px" }}>Actividad Reciente</h3>
              {clientes.slice(-4).reverse().map(c => (
                <div key={c.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px solid #ffffff08" }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>{c.nombre}</div>
                    <div style={{ fontSize: 12, color: "#666" }}>{c.proyecto} - {c.origen}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ color: "#d4af37", fontWeight: 700 }}>${c.presupuesto.toLocaleString()}</div>
                    <div style={{ fontSize: 11, color: ESTADO_COLORS[c.estado], fontWeight: 600, textTransform: "uppercase" }}>{c.estado}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TALLERES */}
        {tab === "talleres" && (
          <div>
            <h1 style={{ color: "#d4af37", margin: "0 0 8px" }}>Talleres de Carpinteria</h1>
            <p style={{ color: "#888", margin: "0 0 20px", fontSize: 14 }}>Monterrey y Area Metropolitana</p>
            <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
              {["todos","premium","rapido","economico"].map(f => (
                <button key={f} onClick={() => setFiltroTaller(f)} style={{ padding: "7px 16px", borderRadius: 20, border: `1px solid ${filtroTaller===f?"#d4af37":"#333"}`, background: filtroTaller===f?"#d4af3720":"transparent", color: filtroTaller===f?"#d4af37":"#666", fontSize: 12, cursor: "pointer", fontWeight: 600, textTransform: "capitalize" }}>
                  {f === "todos" ? "Todos" : f === "premium" ? "Premium" : f === "rapido" ? "Rapidos" : "Economicos"}
                </button>
              ))}
              <select value={filtroSeguro} onChange={e => setFiltroSeguro(e.target.value)} style={{ padding: "7px 12px", borderRadius: 20, border: "1px solid #333", background: "#1a1208", color: "#aaa", fontSize: 12 }}>
                <option value="todos">Con/Sin seguro</option>
                <option value="con">Con seguro</option>
                <option value="sin">Sin seguro</option>
              </select>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 16 }}>
              {talleresFiltrados.map(t => {
                const cat = CAT[t.categoria];
                return (
                  <div key={t.id} style={{ background: "#12120a", border: `1px solid ${cat.border}30`, borderRadius: 16, padding: 20 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 15 }}>{t.nombre}</div>
                        <div style={{ fontSize: 11, color: "#666" }}>{t.ubicacion}</div>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 4, alignItems: "flex-end" }}>
                        <span style={{ background: `${cat.border}20`, border: `1px solid ${cat.border}`, color: cat.text, borderRadius: 20, padding: "2px 10px", fontSize: 10, fontWeight: 700 }}>{cat.label}</span>
                        {t.seguro && <span style={{ background: "#4caf5015", border: "1px solid #4caf5040", color: "#4caf50", borderRadius: 20, padding: "2px 8px", fontSize: 10 }}>CON SEGURO</span>}
                      </div>
                    </div>
                    <div style={{ fontSize: 12, color: "#888", marginBottom: 14 }}>{t.especialidad}</div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 14 }}>
                      {[["Precio",t.precio],["Rapidez",t.rapidez],["Calidad",t.calidad]].map(([l,v],i) => (
                        <div key={i} style={{ background: "#0a0a0f", borderRadius: 8, padding: 8, textAlign: "center" }}>
                          <div style={{ fontSize: 9, color: "#555", letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>{l}</div>
                          <div style={{ display: "flex", justifyContent: "center", gap: 2 }}>
                            {[1,2,3,4,5].map(s => <div key={s} style={{ width: 7, height: 7, borderRadius: "50%", background: s <= v ? cat.border : "#333" }} />)}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div style={{ fontSize: 12, color: "#888" }}>{t.entregas} - {t.resenas} resenas</div>
                      <a href={`tel:${t.telefono}`} style={{ background: `${cat.border}20`, border: `1px solid ${cat.border}`, color: cat.text, borderRadius: 8, padding: "6px 12px", fontSize: 12, textDecoration: "none", fontWeight: 600 }}>Llamar</a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* CLIENTES */}
        {tab === "clientes" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
              <div>
                <h1 style={{ color: "#d4af37", margin: 0 }}>Clientes</h1>
                <p style={{ color: "#888", margin: "4px 0 0", fontSize: 14 }}>Clasificados por presupuesto automaticamente</p>
              </div>
              <button onClick={() => setShowModal(true)} style={{ background: "#d4af37", color: "#0a0a0f", border: "none", borderRadius: 8, padding: "10px 18px", fontWeight: 700, cursor: "pointer" }}>+ Agregar</button>
            </div>
            <div style={{ display: "grid", gap: 10 }}>
              {clientes.map(c => {
                const cat = CAT[c.tipo];
                return (
                  <div key={c.id} onClick={() => setClienteSel(clienteSel?.id === c.id ? null : c)}
                    style={{ background: "#12120a", border: `1px solid ${clienteSel?.id===c.id?cat.border:"#ffffff10"}`, borderRadius: 12, padding: "16px 20px", cursor: "pointer" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 15 }}>{c.nombre}</div>
                        <div style={{ fontSize: 12, color: "#666" }}>{c.proyecto} - via {c.origen}</div>
                      </div>
                      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                        <div style={{ textAlign: "right" }}>
                          <div style={{ color: cat.text, fontWeight: 700 }}>${c.presupuesto.toLocaleString()}</div>
                          <div style={{ fontSize: 11, color: ESTADO_COLORS[c.estado], fontWeight: 700, textTransform: "uppercase" }}>{c.estado}</div>
                        </div>
                        <span style={{ background: `${cat.border}15`, border: `1px solid ${cat.border}40`, color: cat.text, borderRadius: 20, padding: "3px 10px", fontSize: 10, fontWeight: 700 }}>{cat.label}</span>
                      </div>
                    </div>
                    {clienteSel?.id === c.id && (
                      <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid #ffffff10" }}>
                        <div style={{ fontSize: 12, color: "#888", marginBottom: 10 }}>Registrado: {c.fecha}</div>
                        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                          {["prospecto","cotizando","contrato","cerrado"].map(e => (
                            <button key={e} onClick={ev => { ev.stopPropagation(); setClientes(prev => prev.map(cl => cl.id===c.id?{...cl,estado:e}:cl)); }}
                              style={{ padding: "6px 14px", borderRadius: 20, border: `1px solid ${c.estado===e?ESTADO_COLORS[e]:"#333"}`, background: c.estado===e?`${ESTADO_COLORS[e]}20`:"transparent", color: c.estado===e?ESTADO_COLORS[e]:"#666", fontSize: 11, cursor: "pointer", fontWeight: 600, textTransform: "capitalize" }}>{e}</button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* AGENTES */}
        {tab === "agentes" && (
          <div>
            <h1 style={{ color: "#d4af37", margin: "0 0 24px" }}>Red de Agentes</h1>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 16 }}>
              {AGENTES.map(a => (
                <div key={a.id} style={{ background: "#12120a", border: "1px solid #ffffff10", borderRadius: 16, padding: 20 }}>
                  <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>{a.nombre}</div>
                  <div style={{ fontSize: 12, color: "#888", marginBottom: 12 }}>{a.red}</div>
                  <div style={{ fontSize: 12, color: "#888", marginBottom: 16, lineHeight: 1.5 }}>{a.descripcion}</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}>
                    <div style={{ background: "#0a0a0f", borderRadius: 8, padding: 10, textAlign: "center" }}>
                      <div style={{ fontSize: 10, color: "#555", textTransform: "uppercase", marginBottom: 4 }}>Clientes</div>
                      <div style={{ fontSize: 24, fontWeight: 900, color: "#d4af37" }}>{a.clientes}</div>
                    </div>
                    <div style={{ background: "#0a0a0f", borderRadius: 8, padding: 10, textAlign: "center" }}>
                      <div style={{ fontSize: 10, color: "#555", textTransform: "uppercase", marginBottom: 4 }}>Conversion</div>
                      <div style={{ fontSize: 24, fontWeight: 900, color: "#4caf50" }}>{a.conversion}%</div>
                    </div>
                  </div>
                  <div style={{ fontSize: 11, color: "#4caf50", fontWeight: 600 }}>ACTIVO - {a.tipo === "ia" ? "IA" : a.tipo === "social" ? "Social Media" : "Cierre"}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 28, background: "#12120a", border: "1px solid #d4af3720", borderRadius: 16, padding: 24 }}>
              <h3 style={{ color: "#d4af37", margin: "0 0 16px" }}>Estrategia por Red Social</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 12 }}>
                {[
                  ["Pinterest","Fotos de disenos, renders, tableros tematicos (cocinas, closets, salas)","Premium / Decoracion"],
                  ["Instagram","Reels de proceso y resultado, stories de renders 3D, antes y despues","Millennials"],
                  ["TikTok","Videos cortos de talleres, timelapse de fabricacion, tips de madera","Rapido / Economico"],
                  ["Facebook","Posts informativos, grupos de decoracion, anuncios segmentados","40+ Premium"],
                ].map(([red, tipo, meta], i) => (
                  <div key={i} style={{ background: "#0a0a0f", borderRadius: 10, padding: 14 }}>
                    <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 6, color: "#d4af37" }}>{red}</div>
                    <div style={{ fontSize: 11, color: "#888", lineHeight: 1.5, marginBottom: 8 }}>{tipo}</div>
                    <div style={{ fontSize: 10, color: "#00bcd4", fontWeight: 700 }}>Meta: {meta}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* IA COTIZADORA */}
        {tab === "ia" && (
          <div>
            <h1 style={{ color: "#d4af37", margin: "0 0 8px" }}>IA Cotizadora</h1>
            <p style={{ color: "#888", margin: "0 0 24px", fontSize: 14 }}>Ingresa datos del cliente y la IA recomienda los mejores talleres</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
              <div style={{ background: "#12120a", border: "1px solid #d4af3730", borderRadius: 16, padding: 24 }}>
                <h3 style={{ color: "#d4af37", margin: "0 0 20px" }}>Datos del Cliente</h3>
                <div style={{ marginBottom: 14 }}>
                  <label style={{ fontSize: 11, color: "#888", display: "block", marginBottom: 6, textTransform: "uppercase", letterSpacing: 1 }}>Proyecto</label>
                  <input value={aiForm.proyecto} onChange={e => setAiForm(p => ({...p, proyecto: e.target.value}))}
                    placeholder="Cocina integral con isla, closet matrimonial..."
                    style={{ width: "100%", background: "#0a0a0f", border: "1px solid #333", borderRadius: 8, padding: "10px 14px", color: "#e8e0d0", fontSize: 14, boxSizing: "border-box" }} />
                </div>
                <div style={{ marginBottom: 14 }}>
                  <label style={{ fontSize: 11, color: "#888", display: "block", marginBottom: 6, textTransform: "uppercase", letterSpacing: 1 }}>Presupuesto (MXN)</label>
                  <input value={aiForm.presupuesto} onChange={e => setAiForm(p => ({...p, presupuesto: e.target.value}))}
                    placeholder="45000" type="number"
                    style={{ width: "100%", background: "#0a0a0f", border: "1px solid #333", borderRadius: 8, padding: "10px 14px", color: "#e8e0d0", fontSize: 14, boxSizing: "border-box" }} />
                  {aiForm.presupuesto && (
                    <div style={{ marginTop: 6, fontSize: 11, color: parseInt(aiForm.presupuesto)>=50000?"#d4af37":parseInt(aiForm.presupuesto)>=20000?"#00bcd4":"#4caf50" }}>
                      {parseInt(aiForm.presupuesto)>=50000?"PREMIUM":parseInt(aiForm.presupuesto)>=20000?"URGENTE/MEDIO":"ECONOMICO"}
                    </div>
                  )}
                </div>
                <div style={{ marginBottom: 20 }}>
                  <label style={{ fontSize: 11, color: "#888", display: "block", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>Prioridad</label>
                  <div style={{ display: "flex", gap: 8 }}>
                    {[["precio","Precio"],["rapidez","Rapidez"],["calidad","Calidad"],["todo","Las 3"]].map(([k, l]) => (
                      <button key={k} onClick={() => setAiForm(p => ({...p, prioridad: k}))} style={{ flex: 1, padding: "8px 4px", borderRadius: 8, border: `1px solid ${aiForm.prioridad===k?"#d4af37":"#333"}`, background: aiForm.prioridad===k?"#d4af3715":"transparent", color: aiForm.prioridad===k?"#d4af37":"#666", fontSize: 11, cursor: "pointer", fontWeight: 600 }}>{l}</button>
                    ))}
                  </div>
                </div>
                <button onClick={cotizarConIA} disabled={aiLoading || !aiForm.presupuesto || !aiForm.proyecto}
                  style={{ width: "100%", background: aiLoading?"#333":"#d4af37", color: "#0a0a0f", border: "none", borderRadius: 10, padding: 14, fontWeight: 700, fontSize: 14, cursor: aiLoading?"not-allowed":"pointer" }}>
                  {aiLoading ? "Analizando talleres..." : "GENERAR COTIZACION CON IA"}
                </button>
              </div>
              <div style={{ background: "#12120a", border: "1px solid #ffffff10", borderRadius: 16, padding: 24, minHeight: 300 }}>
                <h3 style={{ color: "#d4af37", margin: "0 0 16px" }}>Recomendacion de Talleres</h3>
                {!aiResult && !aiLoading && (
                  <div style={{ textAlign: "center", padding: "40px 20px", color: "#444", fontSize: 14 }}>
                    Llena los datos y presiona "Generar Cotizacion"
                  </div>
                )}
                {aiLoading && <div style={{ textAlign: "center", padding: "40px 20px", color: "#d4af37" }}>Comparando talleres...</div>}
                {aiResult && <div style={{ fontSize: 14, color: "#e8e0d0", lineHeight: 1.8, whiteSpace: "pre-wrap" }}>{aiResult}</div>}
              </div>
            </div>
            <div style={{ marginTop: 24, background: "#1a0a0a", border: "1px solid #f4433630", borderRadius: 12, padding: 16 }}>
              <strong style={{ color: "#f44336" }}>Clausula de contrato: </strong>
              <span style={{ fontSize: 13, color: "#aaa" }}>Como intermediario, no eres responsable de la ejecucion del trabajo. Tu servicio consiste en conseguir y presentar presupuestos de talleres independientes. El cliente contrata directamente al taller.</span>
            </div>
          </div>
        )}
      </div>

      {/* MODAL */}
      {showModal && (
        <div style={{ position: "fixed", inset: 0, background: "#000000aa", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: 24 }}>
          <div style={{ background: "#12120a", border: "1px solid #d4af3740", borderRadius: 20, padding: 28, width: "100%", maxWidth: 420 }}>
            <h3 style={{ color: "#d4af37", margin: "0 0 20px", fontWeight: 900 }}>Nuevo Cliente</h3>
            {[["nombre","Nombre completo","Maria Gonzalez","text"],["proyecto","Proyecto deseado","Cocina integral, closet...","text"],["presupuesto","Presupuesto (MXN)","45000","number"]].map(([k, l, ph, t]) => (
              <div key={k} style={{ marginBottom: 14 }}>
                <label style={{ fontSize: 11, color: "#888", display: "block", marginBottom: 6, textTransform: "uppercase", letterSpacing: 1 }}>{l}</label>
                <input value={nuevoCliente[k]} onChange={e => setNuevoCliente(p => ({...p, [k]: e.target.value}))}
                  placeholder={ph} type={t}
                  style={{ width: "100%", background: "#0a0a0f", border: "1px solid #333", borderRadius: 8, padding: "10px 14px", color: "#e8e0d0", fontSize: 14, boxSizing: "border-box" }} />
              </div>
            ))}
            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 11, color: "#888", display: "block", marginBottom: 6, textTransform: "uppercase", letterSpacing: 1 }}>Origen</label>
              <select value={nuevoCliente.origen} onChange={e => setNuevoCliente(p => ({...p, origen: e.target.value}))}
                style={{ width: "100%", background: "#0a0a0f", border: "1px solid #333", borderRadius: 8, padding: "10px 14px", color: "#e8e0d0", fontSize: 14 }}>
                {["Instagram","TikTok","Pinterest","Facebook","Referido","WhatsApp"].map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setShowModal(false)} style={{ flex: 1, padding: 12, borderRadius: 10, border: "1px solid #333", background: "transparent", color: "#888", cursor: "pointer", fontWeight: 600 }}>Cancelar</button>
              <button onClick={agregarCliente} style={{ flex: 2, padding: 12, borderRadius: 10, border: "none", background: "#d4af37", color: "#0a0a0f", fontWeight: 700, cursor: "pointer", fontSize: 14 }}>Agregar Cliente</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
