<h2>Restricciones REST</h2>

<h3>Interfaz uniforme</h3>
<p>Un diseño REST debe seguir una interfaz uniforme. Esto se logra tratando los recursos de manera identificable y accesible, y comunicándose de forma fácil con ellos. Todas las solicitudes de API para el mismo recurso deben tener el mismo aspecto, sin importar de dónde provenga la solicitud. La API REST debe garantizar que un mismo dato, como el nombre o la dirección de correo electrónico de un usuario, pertenezca a un único identificador uniforme de recursos (URI). Los recursos no deben ser demasiado grandes, pero deben contener toda la información que el cliente pueda necesitar.</p>

<h3>Desacoplamiento cliente-servidor</h3>
<p>El cliente y el servidor tienen roles claros. El cliente pide la información y el servidor la envía. Así, cada parte del sistema hace su tarea sin mezclarse. En el diseño de la API REST, las aplicaciones de cliente y de servidor deben ser completamente independientes entre sí. La única información que la aplicación de cliente debe conocer es el URI del recurso solicitado; no puede interactuar con la aplicación de servidor de ninguna otra manera. Del mismo modo, una aplicación de servidor no debe modificar la aplicación de cliente más que pasándole los datos solicitados a través de HTTP.</p>

<h3>Sin estado</h3>
<p>Cada vez que un cliente pide algo al servidor, debe incluir toda la información necesaria. El servidor no guarda nada de sesiones anteriores. Esto hace que el sistema sea más simple y fácil de escalar. Las API REST no tienen estado, lo que significa que cada solicitud debe incluir toda la información necesaria para procesarla. En otras palabras, las API REST no requieren ninguna sesión del lado del servidor. Las aplicaciones de servidor no pueden almacenar ningún dato relacionado con una solicitud de cliente.</p>

<h3>Capacidad de almacenamiento en caché</h3>
<p>Con el principio cacheable, las respuestas a las peticiones pueden ser marcadas como guardables o no. Lo guardable se guarda para usos futuros, lo que mejora la eficiencia de la API. Cuando sea posible, los recursos deben almacenarse en caché en el lado del cliente o del servidor. Las respuestas del servidor también deben contener información sobre si se permite el almacenamiento en caché para el recurso entregado. El objetivo es mejorar el rendimiento del cliente, al tiempo que aumenta la escalabilidad en el lado del servidor.</p>

<h3>Arquitectura del sistema en capas</h3>
<p>Las capas en el sistema de REST ayudan con la seguridad y distribución de carga. También permiten usar varios servidores, lo que hace todo más escalable y flexible. En las API REST, las llamadas y respuestas pasan por diferentes capas. Como regla general, no asuma que las aplicaciones de cliente y de servidor se conectan directamente entre sí. Puede haber varios intermediarios diferentes en el bucle de comunicación. Las API REST deben diseñarse de modo que ni el cliente ni el servidor puedan saber si se comunica con la aplicación final o con un intermediario.</p>

<h3>Código bajo demanda</h3>
<p>Por último, la posibilidad de bajar código cuando se necesita ayuda a hacer la API más ajustable. Así se puede hacer más con la API de lo que viene de serie. Las API REST suelen enviar recursos estáticos, pero en ciertos casos, las respuestas también pueden contener código ejecutable (como applets de Java). En estos casos, el código solo debe ejecutarse a petición.</p>
