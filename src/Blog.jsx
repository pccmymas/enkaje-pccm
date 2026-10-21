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
        </article>
      </main>
    </Marco>
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
        <li><strong>Te explica el material.</strong> Te dice si es melamina, MDF o madera sólida, qué herrajes usa y por qué cambia el precio.</li>
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
      <p>Pedir anticipo es normal: el taller lo usa para comprar material. Lo importante es cómo lo das.</p>
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
