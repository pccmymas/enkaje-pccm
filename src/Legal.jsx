import { useState } from "react";
import { LogoInline } from "./Logo.jsx";

const DOCS = {
  privacidad: {
    titulo: "Politica de Privacidad",
    fecha: "1 de junio de 2025",
    contenido: [
      {
        titulo: "1. Responsable del Tratamiento de Datos",
        texto: `EnKaje Pro, operado por Felipe Santiago, con domicilio en Monterrey, Nuevo Leon, Mexico, es el responsable del tratamiento de sus datos personales. Puede contactarnos en: contacto@enkajepro.com`
      },
      {
        titulo: "2. Datos que Recopilamos",
        texto: `Recopilamos los siguientes datos personales:
- Nombre completo
- Correo electronico
- Numero de telefono
- Direccion del proyecto
- Informacion sobre su proyecto de carpinteria (medidas, estilos, materiales)
- Datos de uso de la plataforma`
      },
      {
        titulo: "3. Finalidad del Tratamiento",
        texto: `Sus datos son utilizados para:
- Crear y gestionar su cuenta en la plataforma
- Conectarle con talleres de carpinteria certificados
- Generar cotizaciones y presupuestos
- Enviar notificaciones relacionadas con su proyecto
- Mejorar nuestros servicios
- Cumplir con obligaciones legales`
      },
      {
        titulo: "4. Comparticion de Datos",
        texto: `Sus datos podran ser compartidos con:
- Talleres de carpinteria afiliados a EnKaje Pro, unicamente para gestionar su proyecto
- Proveedores tecnologicos que nos ayudan a operar la plataforma (Supabase, Vercel)
- Autoridades competentes cuando sea requerido por ley
No vendemos ni compartimos sus datos con terceros para fines publicitarios.`
      },
      {
        titulo: "5. Derechos ARCO",
        texto: `Conforme a la Ley Federal de Proteccion de Datos Personales en Posesion de los Particulares, usted tiene derecho a:
- Acceder a sus datos personales
- Rectificar datos inexactos
- Cancelar sus datos
- Oponerse al tratamiento
Para ejercer estos derechos, contactenos en: contacto@enkajepro.com`
      },
      {
        titulo: "6. Seguridad",
        texto: `Implementamos medidas tecnicas y organizativas para proteger sus datos personales contra acceso no autorizado, perdida o destruccion. Utilizamos encriptacion SSL y bases de datos seguras.`
      },
      {
        titulo: "7. Cookies",
        texto: `Utilizamos cookies para mejorar su experiencia. Consulte nuestra Politica de Cookies para mas informacion.`
      },
      {
        titulo: "8. Cambios a esta Politica",
        texto: `Nos reservamos el derecho de actualizar esta politica. Le notificaremos cambios importantes por correo electronico o mediante un aviso en la plataforma.`
      },
    ]
  },
  terminos: {
    titulo: "Terminos y Condiciones",
    fecha: "1 de junio de 2025",
    contenido: [
      {
        titulo: "1. Aceptacion de Terminos",
        texto: `Al acceder y utilizar EnKaje Pro, usted acepta estos Terminos y Condiciones en su totalidad. Si no esta de acuerdo, no utilice la plataforma.`
      },
      {
        titulo: "2. Descripcion del Servicio",
        texto: `EnKaje Pro es una plataforma de intermediacion que conecta a clientes que requieren servicios de carpinteria con talleres certificados en Monterrey y area metropolitana. EnKaje Pro actua exclusivamente como intermediario y NO presta servicios de carpinteria directamente.`
      },
      {
        titulo: "3. Registro de Usuarios",
        texto: `Para utilizar la plataforma debe:
- Proporcionar informacion veraz y actualizada
- Mantener la confidencialidad de su contrasena
- Notificarnos de cualquier uso no autorizado de su cuenta
- Ser mayor de 18 anos`
      },
      {
        titulo: "4. Membresias para Talleres",
        texto: `Los talleres pueden suscribirse a los siguientes planes:
- Plan Basico: $699 MXN/mes — hasta 5 leads mensuales
- Plan Pro: $1,499 MXN/mes — leads ilimitados y funciones avanzadas
- Plan Premium: $2,999 MXN/mes — exclusividad por zona y especialidad

Todos los planes incluyen 14 dias de prueba gratuita. Los cobros son mensuales y pueden cancelarse en cualquier momento.`
      },
      {
        titulo: "5. Cancelaciones y Reembolsos",
        texto: `- Puede cancelar su membresia en cualquier momento desde su panel de control
- No se realizan reembolsos por periodos ya cobrados
- Al cancelar, mantendra acceso hasta el fin del periodo pagado
- EnKaje Pro se reserva el derecho de cancelar cuentas que violen estos terminos`
      },
      {
        titulo: "6. Responsabilidad del Intermediario",
        texto: `EnKaje Pro actua como intermediario y NO es responsable de:
- La calidad, tiempos o garantias del trabajo realizado por los talleres
- Disputas entre clientes y talleres
- Danos derivados del trabajo de carpinteria
- La veracidad de la informacion proporcionada por talleres o clientes

La relacion contractual de la obra es exclusivamente entre el cliente y el taller seleccionado.`
      },
      {
        titulo: "7. Propiedad Intelectual",
        texto: `Todo el contenido de EnKaje Pro, incluyendo logotipo, diseno, codigo y textos, son propiedad de EnKaje Pro y estan protegidos por las leyes de propiedad intelectual vigentes en Mexico.`
      },
      {
        titulo: "8. Modificaciones",
        texto: `EnKaje Pro se reserva el derecho de modificar estos terminos en cualquier momento. Los cambios seran notificados con al menos 30 dias de anticipacion.`
      },
      {
        titulo: "9. Ley Aplicable",
        texto: `Estos terminos se rigen por las leyes de los Estados Unidos Mexicanos. Cualquier disputa sera resuelta ante los tribunales competentes de Monterrey, Nuevo Leon.`
      },
    ]
  },
  cookies: {
    titulo: "Politica de Cookies",
    fecha: "1 de junio de 2025",
    contenido: [
      {
        titulo: "1. Que son las Cookies",
        texto: `Las cookies son pequenos archivos de texto que se almacenan en su dispositivo cuando visita nuestro sitio. Nos ayudan a mejorar su experiencia y analizar el uso de la plataforma.`
      },
      {
        titulo: "2. Tipos de Cookies que Usamos",
        texto: `Cookies esenciales: Necesarias para el funcionamiento de la plataforma. Sin ellas, no podria iniciar sesion ni usar las funciones basicas.

Cookies de rendimiento: Nos ayudan a entender como los usuarios interactuan con la plataforma para mejorarla.

Cookies de preferencias: Guardan sus preferencias como idioma y configuracion.

Cookies de terceros: Utilizamos servicios de terceros como Google Analytics que pueden instalar sus propias cookies.`
      },
      {
        titulo: "3. Control de Cookies",
        texto: `Puede controlar y eliminar las cookies desde la configuracion de su navegador. Sin embargo, deshabilitar ciertas cookies puede afectar el funcionamiento de la plataforma.`
      },
      {
        titulo: "4. Cookies de Redes Sociales",
        texto: `Si accede mediante redes sociales como Facebook o Instagram, estas plataformas pueden instalar sus propias cookies. Consulte las politicas de privacidad de dichas plataformas.`
      },
      {
        titulo: "5. Actualizaciones",
        texto: `Esta politica puede actualizarse periodicamente. Le recomendamos revisarla regularmente.`
      },
    ]
  },
  responsabilidad: {
    titulo: "Aviso de No Responsabilidad",
    fecha: "1 de junio de 2025",
    contenido: [
      {
        titulo: "1. Naturaleza del Servicio",
        texto: `EnKaje Pro es una plataforma de INTERMEDIACION EXCLUSIVAMENTE. No somos una empresa de carpinteria, no fabricamos muebles, no instalamos cocinas ni realizamos ninguna obra de carpinteria directamente.`
      },
      {
        titulo: "2. Relacion entre Partes",
        texto: `Al utilizar EnKaje Pro, el cliente entiende y acepta que:
- EnKaje Pro conecta clientes con talleres independientes
- El contrato de obra es directamente entre el cliente y el taller seleccionado
- EnKaje Pro no es parte del contrato de obra
- Los talleres afiliados son empresas independientes, no empleados de EnKaje Pro`
      },
      {
        titulo: "3. Limitacion de Responsabilidad",
        texto: `EnKaje Pro NO se hace responsable de:
- La calidad del trabajo realizado por los talleres
- Tiempos de entrega incumplidos por los talleres
- Materiales defectuosos utilizados por los talleres
- Danos a la propiedad durante la instalacion
- Incumplimiento de garantias por parte de los talleres
- Cualquier disputa economica entre cliente y taller`
      },
      {
        titulo: "4. Verificacion de Talleres",
        texto: `EnKaje Pro realiza una verificacion basica de los talleres afiliados, pero no garantiza ni certifica la calidad de su trabajo. Recomendamos al cliente:
- Revisar el portafolio del taller
- Solicitar referencias
- Firmar un contrato detallado directamente con el taller
- Verificar que el taller cuente con seguro cuando sea aplicable`
      },
      {
        titulo: "5. Servicio de Asesoria",
        texto: `Los asesores de EnKaje Pro brindan orientacion sobre opciones de talleres y presupuestos estimados. Esta asesoria es de caracter informativo y no constituye una garantia sobre el resultado final del proyecto.`
      },
      {
        titulo: "6. Indemnizacion",
        texto: `El usuario acepta indemnizar y mantener indemne a EnKaje Pro de cualquier reclamacion, demanda o dano que surja de su uso de la plataforma o de la relacion contractual con el taller seleccionado.`
      },
      {
        titulo: "7. Contacto para Disputas",
        texto: `Si tiene una disputa con un taller afiliado, puede notificarnos en contacto@enkajepro.com. Haremos nuestro mejor esfuerzo para mediar, sin que esto implique ninguna responsabilidad legal de nuestra parte.`
      },
    ]
  }
};

export default function Legal() {
  const [doc, setDoc] = useState("privacidad");
  const current = DOCS[doc];

  return (
    <div style={{ minHeight: "100vh", background: "#070708", color: "#e8e0d0", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
      <style>{`* { box-sizing: border-box; margin: 0; padding: 0; } body { background: #070708; }`}</style>

      {/* Header */}
      <div style={{ background: "#0f0f0a", borderBottom: "1px solid #1a1a12", padding: "16px 24px", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <a href="/" style={{ textDecoration: "none" }}>
            <LogoInline size="nav" />
          </a>
          <a href="/" style={{ color: "#888", fontSize: 13, textDecoration: "none" }}>← Volver al inicio</a>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px" }}>

        {/* Selector de documentos */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 40 }}>
          {[
            ["privacidad", "Privacidad"],
            ["terminos", "Terminos"],
            ["cookies", "Cookies"],
            ["responsabilidad", "No Responsabilidad"],
          ].map(([k, l]) => (
            <button key={k} onClick={() => setDoc(k)} style={{
              padding: "8px 18px", borderRadius: 20,
              border: `1px solid ${doc === k ? "#d4af37" : "#2a2a20"}`,
              background: doc === k ? "#d4af3715" : "transparent",
              color: doc === k ? "#d4af37" : "#666",
              fontSize: 13, cursor: "pointer", fontWeight: doc === k ? 700 : 400,
              transition: "all .2s"
            }}>{l}</button>
          ))}
        </div>

        {/* Documento */}
        <div style={{ background: "#0f0f0a", border: "1px solid #1a1a12", borderRadius: 20, padding: "36px 40px" }}>
          <div style={{ marginBottom: 32 }}>
            <h1 style={{ fontSize: 28, fontWeight: 900, color: "#d4af37", marginBottom: 8 }}>{current.titulo}</h1>
            <p style={{ fontSize: 13, color: "#555" }}>Ultima actualizacion: {current.fecha}</p>
            <div style={{ width: 60, height: 2, background: "#d4af37", marginTop: 16, borderRadius: 2 }} />
          </div>

          <div style={{ marginBottom: 28, background: "#1a1208", border: "1px solid #d4af3730", borderRadius: 12, padding: "16px 20px" }}>
            <p style={{ fontSize: 14, color: "#aaa", lineHeight: 1.7 }}>
              Este documento forma parte de los acuerdos legales de <strong style={{ color: "#d4af37" }}>EnKaje Pro</strong>, plataforma operada por Felipe Santiago, con domicilio en Monterrey, Nuevo Leon, Mexico.
            </p>
          </div>

          {current.contenido.map((s, i) => (
            <div key={i} style={{ marginBottom: 28 }}>
              <h2 style={{ fontSize: 16, fontWeight: 700, color: "#e8e0d0", marginBottom: 10, paddingLeft: 12, borderLeft: "3px solid #d4af37" }}>{s.titulo}</h2>
              <p style={{ fontSize: 14, color: "#888", lineHeight: 1.9, whiteSpace: "pre-line", paddingLeft: 12 }}>{s.texto}</p>
            </div>
          ))}

          <div style={{ marginTop: 40, paddingTop: 24, borderTop: "1px solid #1a1a12", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <div style={{ fontSize: 13, color: "#555" }}>
              EnKaje Pro — contacto@enkajepro.com
            </div>
            <div style={{ fontSize: 13, color: "#555" }}>
              Monterrey, Nuevo Leon, Mexico
            </div>
          </div>
        </div>

        {/* Navegacion entre docs */}
        <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 32, flexWrap: "wrap" }}>
          {[["privacidad","Privacidad"],["terminos","Terminos"],["cookies","Cookies"],["responsabilidad","No Responsabilidad"]].map(([k,l]) => (
            <button key={k} onClick={() => { setDoc(k); window.scrollTo(0,0); }}
              style={{ background: "transparent", border: "none", color: doc===k?"#d4af37":"#555", fontSize: 13, cursor: "pointer", textDecoration: doc===k?"underline":"none" }}>{l}</button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{ background: "#0f0f0a", borderTop: "1px solid #1a1a12", padding: "24px", textAlign: "center", marginTop: 40 }}>
        <div style={{ fontSize: 12, color: "#444" }}>© 2025 EnKaje Pro. Todos los derechos reservados. Monterrey, Mexico.</div>
      </div>
    </div>
  );
}
