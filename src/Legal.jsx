export default function Privacidad() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#0f0f0f',
      color: '#e8e0d4',
      fontFamily: "'Georgia', 'Times New Roman', serif",
      padding: '0 0 80px 0'
    }}>
      {/* Header */}
      <div style={{
        borderBottom: '1px solid #2a2a2a',
        padding: '24px 32px',
        display: 'flex',
        alignItems: 'center',
        gap: '16px'
      }}>
        <a href="/legal" style={{
          color: '#8a7a6a',
          textDecoration: 'none',
          fontSize: '13px',
          letterSpacing: '0.05em',
          fontFamily: "'Helvetica Neue', sans-serif"
        }}>← Volver</a>
        <span style={{ color: '#2a2a2a' }}>|</span>
        <span style={{
          fontSize: '11px',
          letterSpacing: '0.15em',
          color: '#8a7a6a',
          fontFamily: "'Helvetica Neue', sans-serif",
          textTransform: 'uppercase'
        }}>LEGAL</span>
      </div>

      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '48px 32px 0' }}>
        {/* Logo */}
        <div style={{ marginBottom: '8px' }}>
          <span style={{
            fontSize: '13px',
            letterSpacing: '0.2em',
            fontFamily: "'Helvetica Neue', sans-serif",
            color: '#8a7a6a',
            textTransform: 'uppercase'
          }}>EnKaje</span>
          <span style={{
            fontSize: '11px',
            letterSpacing: '0.15em',
            fontFamily: "'Helvetica Neue', sans-serif",
            color: '#c8a97a',
            marginLeft: '4px',
            textTransform: 'uppercase'
          }}>PRO</span>
        </div>

        <h1 style={{
          fontSize: '32px',
          fontWeight: '400',
          letterSpacing: '-0.02em',
          margin: '0 0 12px 0',
          color: '#f0e8dc'
        }}>Aviso de Privacidad</h1>

        <p style={{
          fontSize: '12px',
          color: '#5a5048',
          fontFamily: "'Helvetica Neue', sans-serif",
          letterSpacing: '0.05em',
          marginBottom: '48px'
        }}>Última actualización: junio 2026 · Monterrey, Nuevo León, México</p>

        <p style={{ lineHeight: '1.8', color: '#b8a898', fontSize: '15px', marginBottom: '40px' }}>
          En cumplimiento con la Ley Federal de Protección de Datos Personales en Posesión de
          Particulares (LFPDPPP), EnKaje Pro pone a disposición el presente Aviso de Privacidad.
        </p>

        {[
          {
            num: '1',
            title: 'Responsable del Tratamiento',
            content: (
              <p style={{ lineHeight: '1.8', color: '#b8a898', fontSize: '15px' }}>
                EnKaje Pro · Monterrey, Nuevo León, México · <a href="mailto:hola@enkajepro.com" style={{ color: '#c8a97a', textDecoration: 'none' }}>hola@enkajepro.com</a>
                <br /><br />
                <em style={{ color: '#6a5a4a', fontSize: '13px' }}>
                  Nota: La razón social y RFC serán actualizados en este aviso una vez formalizado el registro ante el SAT.
                </em>
              </p>
            )
          },
          {
            num: '2',
            title: 'Datos que Recabamos',
            content: (
              <ul style={{ lineHeight: '2', color: '#b8a898', fontSize: '15px', paddingLeft: '20px', margin: 0 }}>
                <li>Nombre completo</li>
                <li>Correo electrónico</li>
                <li>Teléfono</li>
                <li>Dirección del proyecto</li>
                <li>Especificaciones del proyecto de carpintería</li>
                <li>Fotografías del espacio o proyecto subidas voluntariamente por el usuario</li>
                <li>Imágenes de renders generadas por inteligencia artificial a partir de las fotos proporcionadas</li>
                <li>Datos de navegación y uso de la plataforma</li>
                <li style={{ marginTop: '16px', listStyle: 'none', color: '#6a5a4a', fontSize: '13px', fontStyle: 'italic' }}>
                  No recabamos datos sensibles como información financiera completa, biométricos ni datos de salud.
                </li>
              </ul>
            )
          },
          {
            num: '3',
            title: 'Finalidad del Tratamiento',
            content: (
              <ul style={{ lineHeight: '2', color: '#b8a898', fontSize: '15px', paddingLeft: '20px', margin: 0 }}>
                <li>Conectar clientes con talleres de carpintería en Monterrey</li>
                <li>Generar presupuestos y levantamientos de proyectos</li>
                <li>Procesar imágenes mediante sistemas de inteligencia artificial para generar propuestas visuales (renders) del proyecto</li>
                <li>Crear y gestionar el expediente digital del cliente para facilitar la cotización con talleres</li>
                <li>Enviar comunicaciones relacionadas con su proyecto</li>
                <li>Mejorar los servicios y algoritmos de la plataforma</li>
                <li>Cumplir con obligaciones legales</li>
              </ul>
            )
          },
          {
            num: '4',
            title: 'Uso de Inteligencia Artificial',
            content: (
              <p style={{ lineHeight: '1.8', color: '#b8a898', fontSize: '15px' }}>
                EnKaje Pro utiliza sistemas de inteligencia artificial para generar propuestas visuales (renders) a partir de las imágenes y especificaciones proporcionadas por el usuario. Al subir una fotografía a la plataforma, el usuario autoriza expresamente su procesamiento por dichos sistemas con la finalidad de generar la propuesta visual solicitada.
                <br /><br />
                Los renders generados son propuestas visuales de carácter referencial y no constituyen una garantía del resultado final del proyecto. El resultado real puede diferir del render generado debido a materiales, condiciones del espacio, interpretación del taller u otros factores. Los rangos de precio estimados por la plataforma son igualmente referenciales y no representan cotizaciones formales.
                <br /><br />
                EnKaje Pro retiene los derechos sobre los renders generados por sus sistemas. El usuario obtiene una licencia de uso personal, no comercial, sobre el render asociado a su proyecto.
              </p>
            )
          },
          {
            num: '5',
            title: 'Transferencia de Datos',
            content: (
              <p style={{ lineHeight: '1.8', color: '#b8a898', fontSize: '15px' }}>
                Sus datos, incluyendo fotografías del proyecto y renders generados, podrán ser compartidos con los talleres registrados y verificados en la plataforma, únicamente para la gestión y cotización de su proyecto. Esta transferencia es necesaria para la prestación del servicio y se considera aceptada al usar la plataforma.
                <br /><br />
                No vendemos ni comercializamos sus datos personales a terceros con fines publicitarios o de mercadotecnia.
              </p>
            )
          },
          {
            num: '6',
            title: 'Derechos ARCO',
            content: (
              <p style={{ lineHeight: '1.8', color: '#b8a898', fontSize: '15px' }}>
                Tiene derecho a <strong style={{ color: '#e8e0d4' }}>Acceder, Rectificar, Cancelar u Oponerse</strong> al tratamiento de sus datos personales. Para ejercer estos derechos envíe su solicitud a <a href="mailto:privacidad@enkajepro.com" style={{ color: '#c8a97a', textDecoration: 'none' }}>privacidad@enkajepro.com</a> con:
              </p>
            )
          },
          {
            num: '7',
            title: 'Seguridad',
            content: (
              <p style={{ lineHeight: '1.8', color: '#b8a898', fontSize: '15px' }}>
                Implementamos medidas técnicas y administrativas para proteger sus datos, incluyendo cifrado en tránsito y en reposo mediante Supabase. Las fotografías e imágenes subidas se almacenan en servidores seguros con acceso restringido.
              </p>
            )
          },
          {
            num: '8',
            title: 'Cambios al Aviso',
            content: (
              <p style={{ lineHeight: '1.8', color: '#b8a898', fontSize: '15px' }}>
                Nos reservamos el derecho de modificar este Aviso. Los cambios se notificarán con al menos 30 días de anticipación mediante correo electrónico o aviso visible en la plataforma. El uso continuado del servicio tras la notificación implica la aceptación de los cambios.
              </p>
            )
          }
        ].map((section, i) => (
          <div key={i} style={{
            marginBottom: '40px',
            paddingBottom: '40px',
            borderBottom: '1px solid #1a1a1a'
          }}>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', marginBottom: '16px' }}>
              <span style={{
                fontSize: '11px',
                color: '#c8a97a',
                fontFamily: "'Helvetica Neue', sans-serif",
                letterSpacing: '0.1em',
                paddingTop: '4px',
                minWidth: '16px'
              }}>{section.num}.</span>
              <h2 style={{
                fontSize: '16px',
                fontWeight: '400',
                letterSpacing: '0.05em',
                margin: 0,
                color: '#f0e8dc',
                fontFamily: "'Helvetica Neue', sans-serif",
                textTransform: 'uppercase'
              }}>{section.title}</h2>
            </div>
            <div style={{ paddingLeft: '32px' }}>
              {section.content}
            </div>
          </div>
        ))}

        {/* ARCO details inline */}
        <div style={{
          marginTop: '-24px',
          marginBottom: '40px',
          paddingLeft: '32px',
          paddingBottom: '40px',
          borderBottom: '1px solid #1a1a1a'
        }}>
          <ul style={{ lineHeight: '2', color: '#b8a898', fontSize: '15px', paddingLeft: '20px', margin: '0 0 16px 0' }}>
            <li>Nombre completo</li>
            <li>Descripción clara del derecho que desea ejercer</li>
            <li>Copia de identificación oficial</li>
          </ul>
          <p style={{ lineHeight: '1.8', color: '#b8a898', fontSize: '15px', margin: 0 }}>
            Responderemos en un máximo de <strong style={{ color: '#e8e0d4' }}>20 días hábiles</strong>.
          </p>
        </div>

        {/* Footer CTA */}
        <div style={{
          background: '#1a1a1a',
          border: '1px solid #2a2a2a',
          borderRadius: '2px',
          padding: '32px',
          textAlign: 'center'
        }}>
          <p style={{
            fontSize: '13px',
            color: '#8a7a6a',
            fontFamily: "'Helvetica Neue', sans-serif",
            letterSpacing: '0.05em',
            margin: '0 0 12px 0'
          }}>¿Preguntas sobre tu privacidad?</p>
          <a href="mailto:privacidad@enkajepro.com" style={{
            color: '#c8a97a',
            textDecoration: 'none',
            fontSize: '15px',
            letterSpacing: '0.05em'
          }}>privacidad@enkajepro.com</a>
        </div>
      </div>
    </div>
  );
}
