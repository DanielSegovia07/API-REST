<h1>JSON Web Token (JWT)</h1>

<h2>¿Qué es un JSON Web Token?</h2>
<p>
    Un <strong>JSON Web Token (JWT)</strong> es un estándar abierto (RFC 7519) que permite la transmisión segura de información entre dos partes en formato JSON. 
    Es ampliamente utilizado en aplicaciones web y sistemas distribuidos, ya que proporciona una manera eficiente y segura de autenticar y autorizar usuarios sin 
    necesidad de mantener el estado en el servidor. Cada JWT contiene información que permite verificar la autenticidad del token y se asegura de que los datos 
    no han sido alterados durante su transmisión.
</p>
<p>
    Los JWT son especialmente útiles en sistemas donde se requiere autenticación distribuida, como microservicios, ya que cada servicio puede validar el token sin 
    consultar una base de datos o estado centralizado. Una vez que un usuario está autenticado, el servidor puede emitir un token JWT que el usuario enviará en 
    cada solicitud futura para validar su identidad.
</p>

<h2>Usos Comunes de JWT</h2>
<ul>
    <li><strong>Autenticación:</strong> Los JWT son comúnmente utilizados para autenticación de usuarios. Después de un inicio de sesión exitoso, el servidor 
        genera un JWT y lo envía al cliente, que lo utilizará en las solicitudes posteriores para probar su identidad.</li>
    <li><strong>Autorización:</strong> Los JWT permiten gestionar permisos de acceso. Las aplicaciones pueden verificar los permisos del usuario, 
        incluidos en el payload del token.</li>
    <li><strong>Intercambio de Información:</strong> Los JWT también se usan para transmitir datos seguros entre diferentes partes, permitiendo 
        que ambas partes confíen en la autenticidad del contenido.</li>
</ul>

<h2>Partes de un JWT</h2>
<p>Un JSON Web Token consta de tres partes, cada una separada por un punto (<code>.</code>):</p>

<ol>
    <li>
        <strong>Header (Encabezado):</strong> 
        <p>El <em>header</em> contiene información sobre el tipo de token y el algoritmo de encriptación utilizado. Este encabezado generalmente es un objeto 
        JSON que se codifica en Base64 antes de su inclusión en el JWT. El formato más común del header es:</p>
        <pre>
{
  "alg": "HS256",
  "typ": "JWT"
}
        </pre>
        <p>
            <strong>Campos del Header:</strong>
            <ul>
                <li><code>alg</code>: Define el algoritmo de encriptación que se usará para firmar el token, como <code>HS256</code> (HMAC SHA-256) o <code>RS256</code> (RSA SHA-256).</li>
                <li><code>typ</code>: Especifica el tipo de token, que en este caso es <code>JWT</code>.</li>
            </ul>
        </p>
    </li>

    <li>
        <strong>Payload (Carga útil):</strong>
        <p>El <em>payload</em> contiene las declaraciones o <em>claims</em>, que son las informaciones que se desean transmitir. Las declaraciones 
        pueden ser personalizadas para incluir información específica sobre el usuario o datos específicos de la aplicación, además de ciertas 
        declaraciones estándar. Al igual que el header, el payload se codifica en Base64.</p>
        <p><strong>Tipos de Claims:</strong></p>
        <ul>
            <li><strong>Claims Registradas:</strong> Son claims estándar y predefinidos, como:</li>
            <ul>
                <li><code>iss</code> (Issuer): Emisor del token.</li>
                <li><code>sub</code> (Subject): Identificador del usuario.</li>
                <li><code>aud</code> (Audience): Audiencia o destinatario previsto del token.</li>
                <li><code>exp</code> (Expiration Time): Tiempo de expiración del token (en formato UNIX).</li>
                <li><code>iat</code> (Issued At): Fecha de emisión del token.</li>
                <li><code>nbf</code> (Not Before): Indica que el token no será válido antes de la fecha especificada.</li>
            </ul>
            <li><strong>Claims Públicas:</strong> Son definidas por la aplicación y requieren que sean únicas. Estas deben ser registrados con el formato <code>URI</code> para asegurar su unicidad.</li>
            <li><strong>Claims Privadas:</strong> Son claims personalizados creados por el desarrollador para necesidades específicas de la aplicación, 
            por ejemplo, <code>role</code> o <code>permissions</code>.</li>
        </ul>
        <p>Ejemplo de un payload típico:</p>
        <pre>
{
  "sub": "1234567890",
  "name": "John Doe",
  "role": "admin",
  "iat": 1516239022,
  "exp": 1516239632
}
        </pre>
    </li>

    <li>
        <strong>Signature (Firma):</strong>
        <p>La <em>signature</em> asegura la integridad y autenticidad del token. Para generarla, se combina el header y el payload codificados en 
        Base64, luego se aplica una clave secreta junto con el algoritmo especificado en el header. Esto permite que cualquier modificación en el 
        token sea detectada, ya que cambiar cualquier parte del token invalidará la firma.</p>
        <p>Fórmula de la firma:</p>
        <pre>
HMACSHA256(
  base64UrlEncode(header) + "." + base64UrlEncode(payload),
  secret
)
        </pre>
        <p>La firma resultante se codifica en Base64 y se adjunta al JWT como la tercera y última sección del token.</p>
    </li>
</ol>

<h2>Ejemplo de JWT Completo</h2>
<p>Un JWT típico tiene este formato:</p>
<pre>header.payload.signature</pre>
<p>Ejemplo completo de JWT:</p>
<pre>eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c</pre>

<h2>Ventajas y Desventajas de JWT</h2>

<h3>Ventajas</h3>
<ul>
    <li><strong>Autonomía:</strong> Los JWT son independientes del servidor, lo cual permite a los sistemas distribuidos validar tokens sin necesidad 
        de consultar un estado centralizado.</li>
    <li><strong>Escalabilidad:</strong> Al no requerir una base de datos en cada consulta, los JWT son ideales para aplicaciones con un alto volumen de tráfico.</li>
    <li><strong>Portabilidad:</strong> Al ser un string compacto en formato JSON, los JWT pueden ser enviados en headers HTTP, URLs, y parámetros de consulta sin problemas.</li>
</ul>

<h3>Desventajas</h3>
<ul>
    <li><strong>Imposibilidad de Revocación:</strong> Una vez emitido, un JWT es válido hasta que expire, lo cual limita su uso en aplicaciones que requieren control 
        estricto de sesión.</li>
    <li><strong>Tamaño del Token:</strong> Al contener información codificada y firmas, los JWT pueden crecer en tamaño, especialmente cuando se adjuntan a headers HTTP en cada solicitud.</li>
    <li><strong>Almacenamiento Sensible:</strong> Los tokens deben ser almacenados de forma segura en el cliente para evitar ataques como XSS y CSRF.</li>
</ul>

<h2>Conclusión</h2>
<p>
    Los JSON Web Tokens son una herramienta poderosa y flexible para la autenticación y autorización en aplicaciones modernas, proporcionando 
    un sistema seguro y sin estado para validar identidades y permisos. Aunque no es adecuado para todas las aplicaciones, su estructura compacta y 
    segura lo hace ideal en muchos escenarios donde se requiere autenticación distribuida y escalable.
</p>
