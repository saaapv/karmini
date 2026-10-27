/* ============================================================
   KARMA — ÚNICO ARCHIVO QUE DEBES EDITAR
   Reglas: no borres comillas " " ni comas , ni llaves { } ni corchetes [ ].
   Guarda con Ctrl+S y recarga con F5. Si el sitio muestra un aviso rojo,
   revisa la última línea que editaste (casi siempre falta una coma).
   Las rutas de imágenes NO empiezan con "/": usa assets/images/...
   ============================================================ */
window.CONFIG = {
  estudio: {
    dominio: "",            // tu dominio real
    whatsapp: "573204387198",                       // solo dígitos: país + número, sin + ni espacios
    telefono: "+57 320 4387198",
    email: "contacto@karmastudio.com",
    direccion: "Calle 45 #12-34, Bogotá, Colombia",
    horario: { lunes_viernes: "09:00 AM – 6:00 PM", sabado: "10:00 AM – 3:00 PM", domingo: "Cerrado" },
    redes: { instagram: "https://www.instagram.com/karmastudiotattoo/", facebook: "https://www.facebook.com/people/Karma-Tattoo-Studio-Pasto/100091104970657/?mibextid=kFxxJD", tiktok: "" },  // "" = no se muestra
    historia: "KARMA: Donde el arte, la identidad y el destino se convierten en marcas eternas, dejanos acompañarte en las decisiones que marcarán tu vida.",
    filosofia: "Creemos en el tatuaje como lenguaje, como memoria, como ritual. Por eso trabajamos con artistas que de verdad aman lo que hacen y estan capacitados para darte la mejor experiencia en este bello proceso artistico.",
    stats: { trabajos: 1500, anios: 18, artistas: 3 }   // REEMPLAZA por cifras reales
  },
  hero: {
    eyebrow: "Tattoo & Piercing Studio",
    titulo: "El arte de Tatuar.", destacado: "Nosotros, tu Karma.",
    texto: "Tatuajes y perforaciones con identidad propia. Cada trazo cuenta una historia.",
    video: "https://vimeo.com/manage/videos/1238620311"        // opcional: "assets/videos/hero.mp4" (máx. 3 MB, sin audio)
  },
  mapaEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3791.547631204174!2d-77.2842525!3d1.2186594000000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e2ed51e61266a21%3A0xc4c9edb0dfc29442!2sKarma%20Tattoo%20Studio!5e1!3m2!1ses!2sco!4v1792807654409!5m2!1ses!2sco",     // pega aquí SOLO la URL del iframe de Google Maps (src="...")
  whatsappMensaje: "Hola KARMA 👋, vengo de su página web y quiero información para agendar una cita.",
  form: { modo: "whatsapp", endpoint: "" },   // modo: "whatsapp" o "formspree" (con endpoint https://formspree.io/f/xxxx)

  // Filtros del portafolio: value = categoria o estilo de las piezas
  filtros: [["Todos","todos"],["Piercings","piercing"],["Realismo","realismo"],["Blackwork","blackwork"],["Color","color"],["Tradicional","fine line"]],

  // Portafolio. tipo: "imagen" | "video" (el video necesita poster). Si agregas un estilo nuevo, agrégalo también en filtros.
  portafolio: [
    { id:1,  titulo:"Serpiente y daga",   artista:"Juan Pitbull",      categoria:"tatuaje",  estilo:"blackwork",   tipo:"imagen", src:"./assets/images/tatuajes/tatuaje1.JPG",   desc:"Blackwork de gran formato en el antebrazo." },
    { id:2,  titulo:"monda con monda",      artista:"Juan Pitbull",   categoria:"tatuaje",  estilo:"realismo",    tipo:"imagen", src:"assets/images/tatuajes/tatuaje2.JPG",    desc:"Realismo a color con sombras suaves." },
    { id:3,  titulo:"piercing panza",      artista:"Carolina Guerrero",      categoria:"piercing",  estilo:"minimalista", tipo:"imagen", src:"assets/images/tatuajes/piercing1.JPG",     desc:"Trazo fino, diseño geométrico." },
    
  ],

  artistas: [
    { nombre:"Juan Pitbull",      especialidad:"sombras y realismo", bio:"el mas pro de las sombras en PASTO gonorreaaaS",        foto:"assets/images/artistas/juano.JPG",      instagram:"https://instagram.com/saaap_v" },
    { nombre:"Carolina Guerrero",   especialidad:"Realismo y color",        bio:"Retratos y piezas realistas con técnica impecable.",          foto:"assets/images/artistas/carlos-vega.webp",   instagram:"https://instagram.com/carlos.tattoo" },
    { nombre:"Diego no se el apellido", especialidad:"Piercing y joyería",      bio:"Precisión anatómica y joyería de calidad en cada perforación.",foto:"assets/images/artistas/mariana-lopez.webp", instagram:"https://instagram.com/mariana.piercing" },
    { nombre:"Santiago Pantoja", especialidad:"Neotradicional",          bio:"Cuenta historias con color, textura y narrativa visual.",     foto:"assets/images/artistas/diego-herrera.webp", instagram:"https://instagram.com/diego.tattoo" }
  ],

  proceso: [
    { titulo:"Consulta", texto:"Escríbenos y hablamos de tu idea, tamaño, zona del cuerpo y referencias." },
    { titulo:"Diseño",   texto:"Tu artista crea un boceto exclusivo y lo ajustamos juntos." },
    { titulo:"Agenda",   texto:"Elegimos día y hora. El abono se descuenta del precio final." },
    { titulo:"Sesión",   texto:"Un ambiente cómodo y toda la higiene profesional que mereces." },
    { titulo:"Cuidado",  texto:"Te damos la guía de cuidados y seguimos atentos durante la cicatrización." }
  ],

  // IMPORTANTE: reemplaza por reseñas REALES con permiso de cada cliente. estrellas: 1 a 5.
  testimonios: [
    { nombre:"Cliente 1", rol:"Tatuaje blackwork",    estrellas:5, texto:"Reemplaza este texto por una reseña real de un cliente." },
    { nombre:"Cliente 2", rol:"Realismo a color",     estrellas:5, texto:"Reemplaza este texto por una reseña real de un cliente." },
    { nombre:"Cliente 3", rol:"Piercing helix",       estrellas:5, texto:"Reemplaza este texto por una reseña real de un cliente." }
  ],

  // IMPORTANTE: precios y políticas deben coincidir con lo que el o realmente hace.
  faq: [
    { pregunta:"¿Cuál es la edad mínima?", respuesta:"Debes ser mayor de 18 años y presentar documento de identidad válido." },
    { pregunta:"¿Cómo cuido mi tatuaje o piercing?", respuesta:"Te entregamos una guía de cuidados al terminar. En general: lavar con jabón neutro, hidratar, evitar sol directo y no rascar." },
    { pregunta:"¿Cuánto cuesta?", respuesta:"Depende del tamaño, la técnica, la zona y el artista. Te enviamos una cotización personalizada tras la consulta." },
    { pregunta:"¿Necesito abonar para reservar?", respuesta:"Sí, pedimos un abono para bloquear tu cita. Se descuenta del precio final. [Define aquí el porcentaje y la política de cancelación]." },
    { pregunta:"¿Qué métodos de pago aceptan?", respuesta:"[Define aquí los métodos de pago reales del o]." },
    { pregunta:"¿Puedo llevar mi propio diseño?", respuesta:"Claro. Trae tu idea o referencia y tu artista la adapta a lo que es posible en la piel." }
  ]
};
