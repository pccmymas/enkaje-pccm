import { useEffect } from "react";
import { LogoInline } from "./Logo.jsx";

/* ─────────────────────────────────────────────
   BLOG ENKAJE PRO
   /blog            → lista de artículos
   /blog/<slug>     → artículo
   Para agregar un artículo nuevo: copia un objeto
   en ARTICULOS y agrega su ruta en vite.config.js
   ───────────────────────────────────────────── */

const SITE = "https://enkajepro.com";

const ARTICULOS = [
  {
    slug: "mdf-vs-melamina-vs-madera",
    titulo: "MDF vs melamina vs madera: cuál conviene para tu cocina o closet",
    seoTitulo: "MDF vs melamina vs madera: cuál conviene para tu mueble · EnKaje Pro",
    descripcion:
      "Diferencias entre melamina, MDF y madera sólida para cocinas, closets y muebles a la medida: precio, humedad, acabado y duración.",
    fecha: "2026-10-21",
    fechaTexto: "21 de octubre de 2026",
    autor: "Felipe Santiago",
    lectura: "4 min de lectura",
    imagen: "/blog/mdf-melamina-madera.jpg",
    Contenido: ArticuloMateriales,
  },
  {
    slug: "cuanto-anticipo-dar-carpintero",
    titulo: "Cuánto anticipo dar a un carpintero (y cómo pagar sin arriesgarte)",
    seoTitulo: "Cuánto anticipo dar a un carpintero y cómo pagar sin riesgo · EnKaje Pro",
    descripcion:
      "Cuánto anticipo se acostumbra dar a un carpintero en Monterrey, cómo repartir los pagos y qué hacer para no perder tu dinero.",
    fecha: "2026-10-21",
    fechaTexto: "21 de octubre de 2026",
    autor: "Felipe Santiago",
    lectura: "4 min de lectura",
    imagen: "/blog/anticipo-pagos-carpintero.jpg",
    Contenido: ArticuloAnticipo,
  },
  {
    slug: "carpintero-en-monterrey",
    titulo: "Cómo encontrar un carpintero confiable en Monterrey",
    seoTitulo: "Carpintero en Monterrey: cómo encontrar uno confiable · EnKaje Pro",
    descripcion:
      "Qué revisar antes de contratar un carpintero en Monterrey: señales de confianza, preguntas clave, cómo dar anticipo y focos rojos.",
    fecha: "2026-10-21",
    fechaTexto: "21 de octubre de 2026",
    autor: "Felipe Santiago",
    lectura: "5 min de lectura",
    imagen: "/blog/focos-rojos-carpintero.jpg",
    Contenido: ArticuloCarpinteroMonterrey,
  },
];

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@300;400;500;600;700&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'DM Sans', sans-serif; background: #070708; color: #e8e0d0; overflow-x: hidden; }
  .blog { text-align: left; width: 100%; }
  .blog a { color: #d4af37; }
  .blog-nav { position: sticky; top: 0; z-index: 10; background: rgba(7,7,8,.92); backdrop-filter: blur(8px); border-bottom: 1px solid #1a1a12; }
  .blog-nav-in { max-width: 1100px; margin: 0 auto; padding: 12px 24px; display: flex; align-items: center; justify-content: space-between; gap: 16px; }
  .blog-nav-links { display: flex; gap: 18px; align-items: center; }
  .blog-nav-links a.txt { color: #8a8478; text-decoration: none; font-size: 14px; font-weight: 500; }
  .blog-nav-links a.txt:hover { color: #d4af37; }
  .btn-gold { background: #d4af37; color: #000 !important; border-radius: 14px; padding: 12px 22px; font-weight: 700; font-size: 15px; text-decoration: none; display: inline-flex; align-items: center; gap: 8px; transition: all .25s; }
  .btn-gold:hover { background: #e6c34a; transform: translateY(-1px); }

  .art { max-width: 720px; margin: 0 auto; padding: 48px 24px 72px; }
  .art-kicker { font-size: 12px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; color: #d4af37; margin-bottom: 14px; }
  .art h1 { font-family: 'Playfair Display', serif; font-weight: 900; font-size: 44px; line-height: 1.12; color: #f0e8dc; margin-bottom: 18px; }
  .art-meta { font-size: 14px; color: #6f6a60; margin-bottom: 36px; padding-bottom: 24px; border-bottom: 1px solid #1a1a12; }
  .art h2 { font-family: 'Playfair Display', serif; font-weight: 700; font-size: 28px; line-height: 1.25; color: #f0e8dc; margin: 48px 0 16px; }
  .art p { font-size: 18px; line-height: 1.75; color: #cfc8ba; margin-bottom: 18px; }
  .art strong { color: #f0e8dc; font-weight: 600; }
  .art ul, .art ol { margin: 0 0 22px 0; padding-left: 0; list-style: none; }
  .art li { font-size: 18px; line-height: 1.7; color: #cfc8ba; margin-bottom: 12px; position: relative; padding-left: 30px; }
  .art ul li::before { content: ""; position: absolute; left: 6px; top: 12px; width: 8px; height: 8px; border-radius: 50%; background: #d4af37; }
  .art ol { counter-reset: n; }
  .art ol li { counter-increment: n; padding-left: 44px; }
  .art ol li::before { content: counter(n); position: absolute; left: 0; top: 1px; width: 30px; height: 30px; border-radius: 50%; border: 1.5px solid #d4af37; color: #d4af37; font-family: 'Playfair Display', serif; font-size: 15px; display: flex; align-items: center; justify-content: center; }
  .art ul.rojos li::before { background: #c0392b; }

  .fuentes { display: grid; gap: 12px; margin-bottom: 18px; }
  .fuente { background: #0f0f0a; border: 1px solid #1f1f17; border-radius: 14px; padding: 16px 18px; }
  .fuente-t { font-weight: 700; color: #f0e8dc; font-size: 16px; margin-bottom: 8px; }
  .fuente-r { font-size: 15px; line-height: 1.5; color: #a9a294; }
  .fuente-r b { color: #d4af37; font-weight: 600; }
  .fuente-r b.no { color: #b9806f; }

  .art figure { margin: 28px 0 30px; }
  .art figure img { width: 100%; height: auto; display: block; border-radius: 16px; border: 1px solid #1f1f17; }
  .art figcaption { font-size: 14px; color: #6f6a60; margin-top: 10px; text-align: center; }

  .tabla-wrap { overflow-x: auto; margin: 0 0 18px; border: 1px solid #1f1f17; border-radius: 14px; }
  .tabla { width: 100%; border-collapse: collapse; font-size: 15px; min-width: 520px; }
  .tabla th, .tabla td { padding: 12px 14px; text-align: left; vertical-align: top; border-bottom: 1px solid #1f1f17; line-height: 1.5; }
  .tabla th { background: #0f0f0a; color: #d4af37; font-weight: 600; font-size: 14px; }
  .tabla td { color: #cfc8ba; }
  .tabla td:first-child { color: #f0e8dc; font-weight: 600; }
  .tabla tr:last-child td { border-bottom: none; }
  .relacionados { margin-top: 36px; padding-top: 24px; border-top: 1px solid #1a1a12; }
  .relacionados-t { font-size: 12px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; color: #6f6a60; margin-bottom: 12px; }
  .relacionados a { display: block; font-family: 'Playfair Display', serif; font-size: 19px; line-height: 1.35; color: #f0e8dc; text-decoration: none; padding: 10px 0; border-bottom: 1px solid #16160f; }
  .relacionados a:hover { color: #d4af37; }

  .nota { background: #0f0f0a; border-left: 3px solid #d4af37; border-radius: 0 12px 12px 0; padding: 16px 20px; margin: 22px 0; }
  .nota p { margin: 0; font-size: 16px; }

  .cta { margin-top: 44px; background: linear-gradient(135deg,#14120a,#0c0b07); border: 1px solid #2a2618; border-radius: 20px; padding: 32px 28px; text-align: center; }
  .cta h3 { font-family: 'Playfair Display', serif; font-size: 26px; line-height: 1.25; color: #f0e8dc; margin-bottom: 10px; }
  .cta p { font-size: 16px; margin-bottom: 22px; }

  .lista { max-width: 900px; margin: 0 auto; padding: 56px 24px 80px; }
  .lista h1 { font-family: 'Playfair Display', serif; font-weight: 900; font-size: 42px; line-height: 1.15; color: #f0e8dc; margin-bottom: 12px; }
  .lista-sub { color: #8a8478; font-size: 17px; margin-bottom: 36px; }
  .card { display: grid; grid-template-columns: 220px 1fr; gap: 22px; align-items: center; background: #0f0f0a; border: 1px solid #1f1f17; border-radius: 18px; padding: 16px; text-decoration: none; transition: border-color .2s; margin-bottom: 16px; }
  .card:hover { border-color: #d4af3770; }
  .card img { width: 100%; aspect-ratio: 4/5; object-fit: cover; object-position: top; border-radius: 12px; display: block; }
  .card-t { font-family: 'Playfair Display', serif; font-size: 24px; font-weight: 700; color: #f0e8dc; line-height: 1.25; margin-bottom: 8px; }
  .card-d { color: #a9a294; font-size: 15px; line-height: 1.55; margin-bottom: 10px; }
  .card-m { color: #6f6a60; font-size: 13px; }

  .blog-foot { background: #0f0f0a; border-top: 1px solid #1a1a12; padding: 32px 24px; text-align: center; font-size: 12px; color: #3a3a30; }
  .blog-foot a { color: #555; text-decoration: none; margin: 4px 10px; font-size: 13px; display: inline-block; white-space: nowrap; }
  .blog-foot a:hover { color: #d4af37; }

  @media (max-width: 640px) {
    .art { padding: 32px 16px 56px; }
    .art h1 { font-size: 31px; }
    .art h2 { font-size: 23px; margin-top: 40px; }
    .art p, .art li { font-size: 17px; }
    .blog-nav-in { padding: 10px 16px; }
    .blog-nav-links a.txt { display: none; }
    .btn-gold { padding: 10px 16px; font-size: 14px; }
    .lista { padding: 36px 16px 60px; }
    .lista h1 { font-size: 32px; }
    .card { grid-template-columns: 1fr; }
    .tabla-wrap { border: none; overflow: visible; }
    .tabla { min-width: 0; }
    .tabla thead { display: none; }
    .tabla, .tabla tbody, .tabla tr, .tabla td { display: block; width: 100%; }
    .tabla tr { background: #0f0f0a; border: 1px solid #1f1f17; border-radius: 14px; padding: 6px 4px; margin-bottom: 12px; }
    .tabla td { border: none; padding: 6px 14px; }
    .tabla td:first-child { font-size: 17px; padding-top: 10px; }
    .tabla td:not(:first-child)::before { content: attr(data-label) ": "; color: #d4af37; font-weight: 600; }
    .tabla td:not(:first-child)[data-label=""]::before { content: none; }
    .card img { aspect-ratio: 16/10; }
  }
`;

/* ── Metadatos para Google y redes ── */
function setMeta({ title, description, url, image, type = "website" }) {
  document.title = title;
  const put = (attr, key, content) => {
    let el = document.head.querySelector(`meta[${attr}="${key}"]`);
    if (!el) { el = document.createElement("meta"); el.setAttribute(attr, key); document.head.appendChild(el); }
    el.setAttribute("content", content);
  };
  put("name", "description", description);
  put("property", "og:title", title);
  put("property", "og:description", description);
  put("property", "og:url", url);
  put("property", "og:type", type);
  if (image) put("property", "og:image", SITE + image);
  let canon = document.head.querySelector('link[rel="canonical"]');
  if (!canon) { canon = document.createElement("link"); canon.rel = "canonical"; document.head.appendChild(canon); }
  canon.href = url;
}

function setJsonLd(data) {
  let el = document.getElementById("ld-blog");
  if (!el) { el = document.createElement("script"); el.type = "application/ld+json"; el.id = "ld-blog"; document.head.appendChild(el); }
  el.textContent = JSON.stringify(data);
}

/* ── Estructura común ── */
function Marco({ children }) {
  return (
    <div className="blog">
      <style>{css}</style>
      <nav className="blog-nav">
        <div className="blog-nav-in">
          <a href="/" aria-label="EnKaje Pro, inicio"><LogoInline size="nav" /></a>
          <div className="blog-nav-links">
            <a className="txt" href="/blog">Blog</a>
            <a className="btn-gold" href="/portal">Pide tu cotización</a>
          </div>
        </div>
      </nav>
      {children}
      <footer className="blog-foot">
        <div style={{ marginBottom: 12 }}>
          <a href="/">Inicio</a>
          <a href="/blog">Blog</a>
          <a href="/portal">Portal cliente</a>
          <a href="/app?legal=privacidad">Privacidad</a>
          <a href="/app?legal=terminos">Términos</a>
        </div>
        © 2026 EnKaje Pro · Monterrey, México
      </footer>
    </div>
  );
}

/* ── Lista de artículos ── */
function ListaBlog() {
  useEffect(() => {
    setMeta({
      title: "Blog · EnKaje Pro · Carpintería a la medida en Monterrey",
      description: "Guías para contratar carpintero, cocinas integrales, closets y muebles a la medida en Monterrey.",
      url: SITE + "/blog",
      image: ARTICULOS[0]?.imagen,
    });
    window.scrollTo(0, 0);
  }, []);

  return (
    <Marco>
      <main className="lista">
        <div className="art-kicker">Blog EnKaje Pro</div>
        <h1>Guías para tu proyecto de carpintería</h1>
        <p className="lista-sub">Lo que conviene saber antes de mandar hacer una cocina, un closet o un mueble a la medida en Monterrey.</p>
        {ARTICULOS.map((a) => (
          <a key={a.slug} className="card" href={`/blog/${a.slug}`}>
            <img src={a.imagen.replace(".jpg", ".webp")} alt={a.titulo} loading="lazy" />
            <div>
              <div className="card-t">{a.titulo}</div>
              <div className="card-d">{a.descripcion}</div>
              <div className="card-m">{a.fechaTexto} · {a.lectura}</div>
            </div>
          </a>
        ))}
      </main>
    </Marco>
  );
}

/* ── Página de artículo ── */
function PaginaArticulo({ a }) {
  useEffect(() => {
    const url = `${SITE}/blog/${a.slug}`;
    setMeta({ title: a.seoTitulo, description: a.descripcion, url, image: a.imagen, type: "article" });
    setJsonLd({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: a.titulo,
      description: a.descripcion,
      image: SITE + a.imagen,
      datePublished: a.fecha,
      dateModified: a.fecha,
      author: { "@type": "Person", name: a.autor },
      publisher: { "@type": "Organization", name: "EnKaje Pro", url: SITE },
      mainEntityOfPage: url,
      inLanguage: "es-MX",
    });
    window.scrollTo(0, 0);
  }, [a]);

  const { Contenido } = a;
  return (
    <Marco>
      <main className="art">
        <article>
          <div className="art-kicker">Guía · Monterrey</div>
          <h1>{a.titulo}</h1>
          <div className="art-meta">
            Por {a.autor}, carpintero y fundador de EnKaje Pro · {a.fechaTexto} · {a.lectura}
          </div>
          <Contenido />
          <Relacionados actual={a.slug} />
        </article>
      </main>
    </Marco>
  );
}

/* ── Tabla que en celular se vuelve tarjetas ── */
function Tabla({ cols, rows }) {
  return (
    <div className="tabla-wrap">
      <table className="tabla">
        <thead>
          <tr>{cols.map((c, i) => <th key={i}>{c}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              {r.map((v, j) => <td key={j} data-label={cols[j]}>{v}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ── Otros artículos al final de cada página ── */
function Relacionados({ actual }) {
  const otros = ARTICULOS.filter((x) => x.slug !== actual);
  if (!otros.length) return null;
  return (
    <div className="relacionados">
      <div className="relacionados-t">Sigue leyendo</div>
      {otros.map((x) => (
        <a key={x.slug} href={`/blog/${x.slug}`}>{x.titulo} →</a>
      ))}
    </div>
  );
}

/* ── Artículo: cuánto anticipo dar ── */
function ArticuloAnticipo() {
  return (
    <>
      <h2>El anticipo es normal; perderlo, no</h2>
      <p>Cuando mandas hacer una cocina, un closet o un mueble a la medida, casi todos los carpinteros piden anticipo. Es lógico: con ese dinero compran el material de tu proyecto.</p>
      <p>La duda es cuánto dar, cuándo pagar lo demás y cómo evitar quedarte sin dinero y sin mueble. Aquí te lo explico como lo trabajamos en el taller.</p>

      <h2>Cuánto anticipo se acostumbra dar</h2>
      <p>En Monterrey, lo más común es un <strong>anticipo de alrededor del 50%</strong> del precio total. Algunos talleres piden menos, sobre todo en proyectos grandes, porque dividen los pagos en más partes.</p>
      <p>El anticipo debería alcanzar para el material de tu proyecto, no mucho más. En muebles de melamina o MDF, el material suele ser una parte grande del precio; por eso el porcentaje no es bajo.</p>
      <p>Si te piden <strong>más del 70% o el pago completo</strong> antes de empezar, pregunta por qué. No siempre es mala fe, pero sí te deja sin forma de presionar si algo sale mal.</p>

      <h2>Cómo repartir los pagos</h2>
      <p>Lo más seguro para los dos es ligar cada pago a un avance que puedas ver. Dos formas comunes, con una cocina de ejemplo de $40,000:</p>
      <Tabla
        cols={["Momento", "En 2 pagos", "En 3 pagos"]}
        rows={[
          [
                    "Al firmar la cotización",
                    "50% ($20,000)",
                    "50% ($20,000)"
          ],
          [
                    "Al terminar la fabricación, antes de instalar",
                    "—",
                    "30% ($12,000)"
          ],
          [
                    "Al terminar la instalación y revisarla",
                    "50% ($20,000)",
                    "20% ($8,000)"
          ]
        ]}
      />
      <p>El último pago es tu seguro: lo das cuando ya revisaste que puertas, cajones y medidas quedaron como se acordó. Acuerden esto <strong>antes</strong> de empezar y que quede escrito en la cotización.</p>
      <figure>
        <img
          src="/blog/anticipo-pagos-carpintero.webp"
          alt="Tarjeta: cómo repartir los pagos al carpintero. 50% al firmar la cotización, 30% al terminar la fabricación y 20% al instalar y revisar."
          width="1080" height="1350" loading="lazy"
        />
        <figcaption>Guárdala para cuando te pidan el anticipo.</figcaption>
      </figure>

      <h2>Cómo protegerte al pagar</h2>
      <ul>
        <li><strong>Todo por escrito antes del primer peso.</strong> Precio, material, medidas aproximadas, fecha de entrega y cuánto se paga en cada momento.</li>
        <li><strong>Paga por transferencia cuando se pueda.</strong> Queda registro de a quién y cuándo pagaste.</li>
        <li><strong>Pide comprobante de cada pago,</strong> aunque sea un mensaje por WhatsApp que diga "recibí $20,000 de anticipo de la cocina".</li>
        <li><strong>Si se puede, paga el material directo al proveedor.</strong> Algunos talleres aceptan que pagues tú la madera o los tableros en la maderería; así sabes que tu dinero se fue a tu mueble.</li>
        <li><strong>Guarda las fotos y mensajes</strong> del acuerdo: el diseño, las medidas y los cambios que pidas.</li>
        <li><strong>No des el último pago antes de revisar.</strong> Abre puertas y cajones, revisa que esté nivelado y que el acabado sea el acordado.</li>
      </ul>

      <h2>Focos rojos con el anticipo</h2>
      <ul className="rojos">
        <li>Te pide el <strong>pago completo</strong> por adelantado.</li>
        <li>Te presiona para pagar hoy: "si no, sube el precio" o "se me va el material".</li>
        <li>Solo acepta efectivo y no quiere dar ningún comprobante.</li>
        <li>Te pide un segundo anticipo antes de mostrarte avance.</li>
        <li>No quiere poner en la cotización cuánto ya pagaste y cuánto falta.</li>
        <li>Te pide depositar a la cuenta de otra persona sin explicarte por qué.</li>
      </ul>
      <p>Uno solo puede tener explicación. Dos o más juntos, mejor busca otro taller.</p>

      <h2>Si algo sale mal</h2>
      <ol>
        <li><strong>Habla primero con el taller,</strong> por escrito. Muchas veces un retraso tiene explicación (material agotado, una medida que cambió) y se arregla con una nueva fecha.</li>
        <li><strong>Pide una fecha nueva y que la confirme por escrito.</strong></li>
        <li><strong>Junta tus pruebas:</strong> la cotización, los comprobantes de pago, las fotos y los mensajes.</li>
        <li><strong>Si no hay respuesta,</strong> puedes acudir a la Procuraduría Federal del Consumidor (Profeco) para presentar una queja. Mientras más papeles tengas, más fácil es.</li>
      </ol>
      <p>Por eso insistimos tanto en tener todo por escrito: no es desconfianza, es lo que te permite reclamar si hace falta.</p>

      <h2>Cómo te ayuda EnKaje Pro</h2>
      <p>En <strong>EnKaje Pro</strong> recibes cotizaciones de varios talleres de Monterrey que revisamos antes de aceptarlos, y puedes compararlas antes de dar un solo peso. Una vez que eliges taller, puedes seguir las etapas de tu proyecto: anticipo, fabricación, instalación y entrega.</p>
      <div className="nota">
        <p>EnKaje Pro no cobra ni guarda tu anticipo: el pago y el trabajo los acuerdas directo con el taller que elijas. Por eso, aun dentro de la plataforma, usa los consejos de esta guía.</p>
      </div>
      <p>Si todavía no eliges taller, lee también <a href="/blog/carpintero-en-monterrey">Cómo encontrar un carpintero confiable en Monterrey</a>.</p>

      <div className="cta">
        <h3>¿Tienes un proyecto en mente?</h3>
        <p>Pide tu cotización gratis y compara talleres de tu zona.</p>
        <a className="btn-gold" href="/portal">Pedir cotización gratis →</a>
      </div>
    </>
  );
}

/* ── Artículo: MDF vs melamina vs madera ── */
function ArticuloMateriales() {
  return (
    <>
      <h2>El material decide el precio y cuánto te dura</h2>
      <p>Dos cocinas que se ven iguales en la foto pueden costar muy distinto. Casi siempre la diferencia está en el material: melamina, MDF o madera sólida.</p>
      <p>Ninguno es "el mejor" para todo. Cada uno conviene en ciertos muebles y en ciertos presupuestos. Aquí te explico las diferencias como las vemos en el taller, para que entiendas qué te están cotizando.</p>

      <h2>Comparación rápida</h2>
      <Tabla
        cols={["", "Melamina", "MDF", "Madera sólida"]}
        rows={[
          [
                    "Precio",
                    "$",
                    "$$",
                    "$$$"
          ],
          [
                    "Aguanta la humedad",
                    "Regular, si los cantos están bien sellados",
                    "Poco; se hincha con el agua",
                    "Bien, si está bien sellada"
          ],
          [
                    "Acabado",
                    "Ya viene con color o veta; no se pinta",
                    "Liso, ideal para pintar y para puertas con diseño",
                    "Natural, se puede lijar y volver a barnizar"
          ],
          [
                    "Dónde conviene más",
                    "Closets, cocinas económicas, interiores de muebles",
                    "Puertas pintadas, centros de entretenimiento",
                    "Muebles de lujo, puertas de entrada, piezas para toda la vida"
          ]
        ]}
      />
      <p>Precios solo como referencia: el costo final depende de medidas, herrajes, cubierta e instalación.</p>

      <h2>Cuánto cuesta cada material (referencia)</h2>
      <p>Precios aproximados <strong>solo del material</strong>, no del mueble terminado. Cambian según la marca, el color y la maderería.</p>
      <Tabla
        cols={["Material", "Se vende por", "Precio aproximado"]}
        rows={[
          ["Melamina blanca de 16 mm", "Hoja de 1.22 × 2.44 m", "Alrededor de $700"],
          ["Melamina de color o con veta", "Hoja de 1.22 × 2.44 m", "Más que la blanca, según el diseño"],
          ["MDF natural de 15 mm (sin pintar)", "Hoja de 1.22 × 2.44 m", "Entre $400 y $600"],
          ["Pino", "Pie tabla", "Entre $25 y $40"],
          ["Maderas finas (cedro, encino, parota)", "Pie tabla", "Entre $70 y $90"],
        ]}
      />
      <p>El material es solo una parte del precio. También cuentan los cantos, herrajes, pintura o barniz, la mano de obra y la instalación. Por eso el MDF, aunque la hoja sea barata, sale más caro ya pintado.</p>
      <figure>
        <img
          src="/blog/mdf-melamina-madera.webp"
          alt="Tarjeta: MDF, melamina o madera. Melamina económica para closets y cocinas, MDF ideal para pintar, madera sólida la que más dura."
          width="1080" height="1350" loading="lazy"
        />
      </figure>

      <h2>Melamina</h2>
      <p>Es un tablero (de aglomerado o de MDF) cubierto con una capa plástica que ya trae el color o la veta de madera. Es lo que más se usa en cocinas integrales y closets en Monterrey.</p>
      <ul>
        <li><strong>A favor:</strong> es la opción más económica, viene en muchos colores y vetas, se limpia fácil y no necesita pintura.</li>
        <li><strong>En contra:</strong> si se moja por los cantos o por un golpe, el tablero de adentro se hincha. No se puede pintar ni lijar para renovarla.</li>
        <li><strong>Qué revisar:</strong> que los cantos (las orillas) estén bien pegados y sellados, sobre todo bajo el fregadero y cerca de la estufa. Pregunta el grosor del tablero.</li>
      </ul>

      <h2>MDF</h2>
      <p>Es un tablero hecho de fibra de madera prensada. Es muy liso y parejo, por eso se usa para muebles pintados y puertas con relieve o ranuras.</p>
      <ul>
        <li><strong>A favor:</strong> queda perfecto pintado (laca o pintura), se puede trabajar con diseño en las puertas y no tiene nudos ni vetas que se marquen.</li>
        <li><strong>En contra:</strong> con el agua se hincha y no regresa. Es pesado, y la pintura se puede despostillar con golpes.</li>
        <li><strong>Qué revisar:</strong> para cocinas y baños existe MDF resistente a la humedad (MDF RH, normalmente de color verde por dentro). Pregunta si es el que te van a poner y qué tipo de pintura usan.</li>
      </ul>

      <h2>Madera sólida y triplay</h2>
      <p>La <strong>madera sólida</strong> (pino, cedro, encino, parota, entre otras) es la opción más cara y la que más dura. Se puede lijar y volver a barnizar después de años, y se ve distinta a cualquier imitación.</p>
      <ul>
        <li><strong>En contra:</strong> es más cara, y la madera se mueve un poco con los cambios de humedad y temperatura; si no está bien seca y sellada, puede torcerse o abrirse.</li>
        <li><strong>Qué revisar:</strong> qué madera es exactamente, si está seca (estufada) y qué sellador o barniz lleva.</li>
      </ul>
      <p>El <strong>triplay</strong> son capas delgadas de madera pegadas. Es muy resistente y agarra bien los tornillos; se usa en bases de muebles de baño, estructuras y donde hace falta aguante. Para baños, pregunta por triplay resistente a la humedad.</p>

      <h2>Cuál conviene según el mueble</h2>
      <Tabla
        cols={["Mueble", "Lo más común", "Si quieres algo más"]}
        rows={[
          [
                    "Cocina integral",
                    "Melamina, con cantos bien sellados en la zona del fregadero",
                    "Puertas de MDF pintado o de madera, con cajones de melamina por dentro"
          ],
          [
                    "Closet",
                    "Melamina",
                    "Puertas de MDF pintado o con chapa de madera"
          ],
          [
                    "Mueble de baño",
                    "Triplay o MDF resistente a la humedad",
                    "Madera bien sellada"
          ],
          [
                    "Centro de entretenimiento",
                    "Melamina o MDF pintado",
                    "Madera sólida en las piezas que más se ven"
          ],
          [
                    "Puerta de entrada",
                    "Madera sólida",
                    "—"
          ]
        ]}
      />
      <p>Muchos talleres combinan materiales: por dentro melamina, que es económica y resistente, y por fuera MDF o madera, que es lo que se ve. Es una buena forma de cuidar el presupuesto.</p>

      <h2>Qué preguntarle al taller sobre el material</h2>
      <ul>
        <li>¿Qué material lleva cada parte: estructura, puertas, cajones y entrepaños?</li>
        <li>¿De qué grosor es el tablero?</li>
        <li>¿Con qué cantos se cubren las orillas?</li>
        <li>¿Qué herrajes usa (bisagras, correderas) y de qué marca?</li>
        <li>Si es MDF o madera, ¿qué pintura, laca o barniz lleva?</li>
        <li>¿Qué parte del mueble queda cerca del agua y cómo la protege?</li>
      </ul>
      <p>Que todo esto quede escrito en la cotización. Así, si comparas dos precios, sabes si estás comparando lo mismo.</p>

      <h2>Compara cotizaciones con EnKaje Pro</h2>
      <p>En <strong>EnKaje Pro</strong> pides cotización una sola vez y varios talleres de Monterrey, revisados antes de aceptarlos, te mandan su precio. Así puedes comparar materiales y precios sin ir taller por taller.</p>
      <p>Antes de elegir, lee también <a href="/blog/carpintero-en-monterrey">Cómo encontrar un carpintero confiable en Monterrey</a> y <a href="/blog/cuanto-anticipo-dar-carpintero">Cuánto anticipo dar a un carpintero</a>.</p>

      <div className="cta">
        <h3>¿Tienes un proyecto en mente?</h3>
        <p>Pide tu cotización gratis y compara talleres de tu zona.</p>
        <a className="btn-gold" href="/portal">Pedir cotización gratis →</a>
      </div>
    </>
  );
}

/* ── Artículo: carpintero en Monterrey ── */
function ArticuloCarpinteroMonterrey() {
  const fuentes = [
    ["Recomendación de un conocido", "Ya alguien lo probó", "Solo conoces uno; no puedes comparar"],
    ["Grupos de Facebook y Marketplace", "Muchas opciones rápido", "Cualquiera publica; es difícil saber quién es real"],
    ["Google Maps", "Ves ubicación y reseñas", "Muchos buenos talleres no aparecen"],
    ["Anuncios en la calle o volantes", "Están cerca de ti", "Casi nunca puedes ver trabajos anteriores"],
  ];

  return (
    <>
      <h2>Encontrar carpintero no es lo difícil; encontrar uno de confianza, sí</h2>
      <p>En Monterrey hay cientos de talleres de carpintería. El problema es saber cuál va a cumplir: que respete el precio, la fecha y la calidad que te prometió.</p>
      <p>Muchos llegamos a un carpintero por recomendación o por un anuncio en Facebook, y cruzamos los dedos. Esta guía te ayuda a elegir con calma, sin importar si vas a hacer una cocina integral, un closet o un mueble a la medida.</p>

      <h2>Dónde busca la gente carpintero (y qué le falta a cada opción)</h2>
      <div className="fuentes">
        {fuentes.map(([donde, bueno, falta]) => (
          <div className="fuente" key={donde}>
            <div className="fuente-t">{donde}</div>
            <div className="fuente-r"><b>Lo bueno:</b> {bueno}</div>
            <div className="fuente-r"><b className="no">Lo que falta:</b> {falta}</div>
          </div>
        ))}
      </div>
      <p>Ninguna opción es mala, pero en todas te toca a ti investigar al taller.</p>

      <h2>6 señales de un taller confiable</h2>
      <ol>
        <li><strong>Tiene un lugar real.</strong> Puede ser un taller grande o uno en casa, pero ves herramienta y material de verdad, no solo fotos bajadas de internet.</li>
        <li><strong>Te enseña trabajos propios.</strong> Fotos de proyectos que él hizo, idealmente del mismo tipo que el tuyo. Pide más de dos o tres.</li>
        <li><strong>Te da referencias.</strong> Un cliente anterior al que puedas preguntarle cómo le fue.</li>
        <li><strong>Toma medidas antes de dar precio firme.</strong> Un precio aproximado por teléfono está bien; el precio final sale después de medir.</li>
        <li><strong>Te explica el material.</strong> Te dice si es melamina, MDF o madera sólida, qué herrajes usa y por qué cambia el precio. (Aquí te explicamos <a href="/blog/mdf-vs-melamina-vs-madera">la diferencia entre MDF, melamina y madera</a>.)</li>
        <li><strong>Pone todo por escrito.</strong> Precio, material, fecha de entrega y forma de pago en una cotización o contrato, aunque sea sencillo.</li>
      </ol>

      <h2>Preguntas que debes hacer antes de contratar</h2>
      <ul>
        <li>¿Cobra la visita para tomar medidas? ¿La descuenta si le doy el trabajo?</li>
        <li>¿Qué material y qué herrajes incluye el precio?</li>
        <li>¿Cuánto tarda en fabricar e instalar?</li>
        <li>¿La instalación está incluida o se cobra aparte?</li>
        <li>¿Cuánto pide de anticipo y cuándo se paga el resto?</li>
        <li>¿Da factura?</li>
        <li>Si algo sale mal después de instalar, ¿cómo lo resuelve?</li>
      </ul>
      <p>Un buen carpintero contesta todo esto sin molestarse. Si se incomoda o da vueltas, tómalo en cuenta.</p>

      <h2>Cómo dar el anticipo sin arriesgarte de más</h2>
      <p>Pedir anticipo es normal: el taller lo usa para comprar material. Lo importante es cómo lo das. (Más detalle en <a href="/blog/cuanto-anticipo-dar-carpintero">cuánto anticipo dar a un carpintero</a>.)</p>
      <ul>
        <li><strong>Que sea moderado.</strong> Desconfía si te piden el pago completo antes de empezar.</li>
        <li><strong>Si se puede, paga el material directo al proveedor.</strong> Así sabes que tu dinero sí se fue a tu mueble.</li>
        <li><strong>Pide recibo o comprobante</strong> de cada pago, aunque sea por WhatsApp.</li>
        <li><strong>Liga los pagos a avances</strong>: una parte al empezar, otra al terminar la fabricación y el resto al instalar.</li>
        <li><strong>Evita pagar en efectivo sin nada escrito.</strong> Si después hay un problema, no tienes con qué demostrarlo.</li>
      </ul>

      <h2>Focos rojos</h2>
      <ul className="rojos">
        <li>Te da un precio exacto sin ver el espacio ni tomar medidas.</li>
        <li>No te puede enseñar ningún trabajo hecho por él.</li>
        <li>Te presiona: "si no me das el anticipo hoy, sube el precio".</li>
        <li>Pide todo el dinero por adelantado.</li>
        <li>No quiere poner nada por escrito.</li>
        <li>No tiene un lugar fijo ni quiere que lo visites o lo veas trabajando.</li>
      </ul>
      <p>Uno solo de estos no siempre es grave, pero dos o más juntos sí son motivo para buscar otra opción.</p>
      <figure>
        <img
          src="/blog/focos-rojos-carpintero.webp"
          alt="Tarjeta con 6 focos rojos al contratar un carpintero: precio exacto sin medir, sin trabajos propios, presión para dar anticipo, pago completo por adelantado, nada por escrito y sin lugar fijo."
          width="1080" height="1350" loading="lazy"
        />
        <figcaption>Guárdala o compártela antes de dar tu anticipo.</figcaption>
      </figure>

      <h2>Una forma más fácil de encontrar carpintero en Monterrey</h2>
      <p>Revisar todo esto con cada taller lleva tiempo. Por eso existe <strong>EnKaje Pro</strong>: no somos un taller, somos la plataforma que te conecta con talleres de carpintería de Monterrey.</p>
      <p>Antes de que un taller aparezca en EnKaje Pro, lo revisamos en videollamada o en persona: confirmamos su identidad, su taller, su ubicación y fotos de trabajos reales.</p>
      <p>Tú publicas lo que necesitas, varios talleres de tu zona te cotizan y tú eliges con calma. Sin andar llamando uno por uno.</p>
      <figure>
        <img
          src="/blog/cotizaciones-enkaje-pro.webp"
          alt="Ejemplo en EnKaje Pro: una solicitud de cocina en Monterrey con dos cotizaciones de talleres verificados para comparar."
          width="1080" height="1200" loading="lazy"
        />
        <figcaption>Una solicitud, varias cotizaciones. Imagen ilustrativa con precios de ejemplo.</figcaption>
      </figure>
      <div className="nota">
        <p>La verificación te ayuda a elegir mejor, pero cada taller es responsable de su trabajo, su precio y su tiempo de entrega. Aun así, usa las preguntas de esta guía.</p>
      </div>

      <div className="cta">
        <h3>¿Tienes un proyecto en mente?</h3>
        <p>Pide tu cotización gratis y compara talleres de tu zona.</p>
        <a className="btn-gold" href="/portal">Pedir cotización gratis →</a>
      </div>
    </>
  );
}

/* ── Enrutador del blog ── */
export default function Blog() {
  const slug = window.location.pathname.replace(/^\/blog\/?/, "").replace(/\/$/, "");
  if (!slug) return <ListaBlog />;
  const a = ARTICULOS.find((x) => x.slug === slug);
  if (!a) {
    window.location.replace("/blog");
    return null;
  }
  return <PaginaArticulo a={a} />;
}
