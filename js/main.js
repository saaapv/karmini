/* KARMA — lógica del sitio. Un solo archivo, sin dependencias. No necesitas editarlo. */
(function () {
  'use strict';
  window.__karma = true;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var C = window.CONFIG;

  // Si config.js tiene un error, avisa en lugar de dejar la página rota
  if (!C) {
    document.body.insertAdjacentHTML('afterbegin', '<p style="position:relative;z-index:999;padding:1rem;background:#900;color:#fff;font:16px sans-serif">⚠️ Hay un error en js/config.js: revisa comillas, comas y llaves de la última línea que editaste.</p>');
    document.documentElement.classList.remove('js'); return;
  }
  var esc = function (s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); };
  var wa = function (msg) { return 'https://wa.me/' + C.estudio.whatsapp.replace(/\D/g, '') + '?text=' + encodeURIComponent(msg || C.whatsappMensaje); };
  var get = function (path) { return path.split('.').reduce(function (o, k) { return o ? o[k] : ''; }, C); };
  var bodyLock = function (on) { document.body.classList.toggle('no-scroll', on); };
  var lastFocus = null;

  // Si una imagen no existe, muestra un recuadro con el título (no un icono roto)
  function fallbackImg(img) { img.addEventListener('error', function () { var d = document.createElement('div'); d.className = 'ph'; d.textContent = img.alt || 'KARMA'; if (img.parentNode) img.parentNode.replaceChild(d, img); }, { once: true }); }

  function textos() {
    $$('[data-config]').forEach(function (el) { var v = get(el.dataset.config); if (v) el.textContent = v; });
    var t = $('#tel'); if (t) t.href = 'tel:' + C.estudio.telefono.replace(/[^\d+]/g, '');
    $$('[data-whatsapp]').forEach(function (a) { a.href = wa(); a.target = '_blank'; a.rel = 'noopener'; });
    $$('[data-stat]').forEach(function (el) { el.dataset.count = C.estudio.stats[el.dataset.stat] || 0; });
    $('#year').textContent = new Date().getFullYear();
    var r = C.estudio.redes, out = '';
    Object.keys(r).forEach(function (k) { if (r[k]) out += '<li><a href="' + esc(r[k]) + '" target="_blank" rel="noopener">' + k.charAt(0).toUpperCase() + k.slice(1) + '</a></li>'; });
    $('#redes').innerHTML = out;
    var m = $('#map'); if (C.mapaEmbed) m.innerHTML = '<iframe src="' + esc(C.mapaEmbed) + '" title="Mapa de ubicación de KARMA" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>';
    var ld = document.createElement('script'); ld.type = 'application/ld+json';
    ld.textContent = JSON.stringify({ '@context': 'https://schema.org', '@type': 'TattooParlor', name: 'KARMA Tattoo & Piercing Studio', url: C.estudio.dominio, telephone: C.estudio.telefono, email: C.estudio.email, address: { '@type': 'PostalAddress', streetAddress: C.estudio.direccion }, sameAs: Object.keys(r).map(function (k) { return r[k]; }).filter(Boolean) });
    document.head.appendChild(ld);
  }

  function hero() {
    var h = C.hero, title = $('#hero-title');
    $('#hero-eyebrow').textContent = h.eyebrow; $('#hero-lead').textContent = h.texto;
    // Título letra por letra (el texto destacado entra como bloque para no romper el degradado)
    var i = 0, letras = Array.from(h.titulo).map(function (ch) { return ch === ' ' ? ' ' : '<span class="l" aria-hidden="true" style="--d:' + (i++) + '">' + esc(ch) + '</span>'; }).join('');
    title.setAttribute('aria-label', h.titulo + ' ' + h.destacado);
    title.innerHTML = letras + ' <span class="text-fire" aria-hidden="true">' + esc(h.destacado) + '</span>';
    requestAnimationFrame(function () { title.classList.add('is-ready'); });
    var save = navigator.connection && navigator.connection.saveData;
    if (h.video && !reduce && !save) $('#hero-bg').innerHTML = '<video autoplay muted loop playsinline aria-hidden="true" src="' + esc(h.video) + '"></video>';
    var rep = '<span>TATTOO</span><span class="d">•</span><span>PIERCING</span><span class="d">•</span><span>ARTE</span><span class="d">•</span><span>AUTENTICIDAD</span><span class="d">•</span>';
    $('#marquee').innerHTML = rep + rep + rep + rep;
  }

  function header() {
    var hd = $('#header'), bar = $('#progress'), ticking = false;
    function on() {
      hd.classList.toggle('is-scrolled', scrollY > 50);
      var max = document.documentElement.scrollHeight - innerHeight; bar.style.transform = 'scaleX(' + (max > 0 ? scrollY / max : 0) + ')';
      ticking = false;
    }
    addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(on); } }, { passive: true }); on();
  }

  function menu() {
    var b = $('#burger'), m = $('#menu');
    function set(open) {
      b.classList.toggle('is-open', open); b.setAttribute('aria-expanded', open); b.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
      m.classList.toggle('is-open', open); m.inert = !open; bodyLock(open);
    }
    b.addEventListener('click', function () { set(!b.classList.contains('is-open')); });
    $$('a', m).forEach(function (a) { a.addEventListener('click', function () { set(false); }); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && m.classList.contains('is-open')) { set(false); b.focus(); } });
    matchMedia('(min-width:1024px)').addEventListener('change', function (e) { if (e.matches) set(false); });
  }

  var visibles = [];
  function portafolio() {
    var f = $('#filters'), g = $('#port-grid'), P = C.portafolio;
    f.innerHTML = C.filtros.map(function (x, i) { return '<button type="button" data-f="' + esc(x[1]) + '" aria-pressed="' + (i === 0) + '">' + esc(x[0]) + '</button>'; }).join('');
    g.innerHTML = P.map(function (p, i) {
      var v = p.tipo === 'video';
      var media = v ? '<img src="' + esc(p.poster) + '" alt="' + esc(p.titulo) + '" loading="lazy" decoding="async">' : '<img src="' + esc(p.src) + '" alt="' + esc(p.titulo + ' — ' + (p.categoria === 'piercing' ? 'piercing' : 'tatuaje') + ' de ' + p.artista) + '" loading="lazy" decoding="async">';
      return '<button type="button" class="card" data-id="' + p.id + '" data-c="' + esc(p.categoria) + '" data-e="' + esc(p.estilo) + '" data-reveal style="--i:' + (i % 6) + '" aria-label="Ver ' + esc(p.titulo) + (v ? ' (video)' : '') + '">' + media + (v ? '<span class="card__tag">Video</span>' : '') + '<span class="card__cap"><b>' + esc(p.titulo) + '</b><span>' + esc(p.artista) + '</span></span></button>';
    }).join('');
    $$('img', g).forEach(fallbackImg);
    function filtrar(val) {
      var n = 0;
      $$('.card', g).forEach(function (c) { var ok = val === 'todos' || c.dataset.c === val || c.dataset.e === val; c.hidden = !ok; if (ok) { n++; c.classList.add('is-visible'); } });
      $('#port-empty').hidden = n > 0;
      $('#port-status').textContent = n + (n === 1 ? ' trabajo mostrado' : ' trabajos mostrados');
    }
    f.addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b) return;
      $$('button', f).forEach(function (x) { x.setAttribute('aria-pressed', x === b); }); filtrar(b.dataset.f);
    });
    g.addEventListener('click', function (e) { var c = e.target.closest('.card'); if (c) abrirLb(Number(c.dataset.id), c); });
  }

  function artistas() {
    $('#art-grid').innerHTML = C.artistas.map(function (a, i) {
      return '<article class="art" data-reveal style="--i:' + i + '"><div class="art__img"><img src="' + esc(a.foto) + '" alt="Retrato de ' + esc(a.nombre) + '" loading="lazy" decoding="async"></div><div class="art__in"><h3>' + esc(a.nombre) + '</h3><p class="art__esp">' + esc(a.especialidad) + '</p><p>' + esc(a.bio) + '</p>' + (a.instagram ? '<a class="link" href="' + esc(a.instagram) + '" target="_blank" rel="noopener">Ver Instagram</a>' : '') + '</div></article>';
    }).join('');
    $$('.art img').forEach(fallbackImg);
    var s = $('#artista'); C.artistas.forEach(function (a) { var o = document.createElement('option'); o.value = o.textContent = a.nombre; s.appendChild(o); });
    $('#steps').innerHTML = C.proceso.map(function (p, i) { return '<li data-reveal style="--i:' + i + '"><h3>' + esc(p.titulo) + '</h3><p>' + esc(p.texto) + '</p></li>'; }).join('');
  }

  function carrusel() {
    var T = C.testimonios, track = $('#car-track'), dots = $('#car-dots'), cur = 0, timer = null, paused = reduce;
    track.innerHTML = T.map(function (t, i) {
      var n = Math.max(0, Math.min(5, Number(t.estrellas) || 0));
      return '<figure class="quote" aria-roledescription="diapositiva" aria-label="' + (i + 1) + ' de ' + T.length + '"><div class="quote__s" role="img" aria-label="' + n + ' de 5 estrellas">' + '★'.repeat(n) + '☆'.repeat(5 - n) + '</div><blockquote>“' + esc(t.texto) + '”</blockquote><figcaption><b>' + esc(t.nombre) + '</b><br><small>' + esc(t.rol) + '</small></figcaption></figure>';
    }).join('');
    dots.innerHTML = T.map(function (_, i) { return '<button type="button" data-i="' + i + '" aria-label="Ir al testimonio ' + (i + 1) + '"></button>'; }).join('');
    function go(i) {
      cur = (i + T.length) % T.length; track.style.transform = 'translateX(-' + cur * 100 + '%)';
      $$('button', dots).forEach(function (d, k) { d.setAttribute('aria-current', k === cur); });
      $$('.quote', track).forEach(function (q, k) { q.inert = k !== cur; });
    }
    function play() { clearInterval(timer); if (!paused) timer = setInterval(function () { go(cur + 1); }, 7000); }
    $('#car-prev').onclick = function () { go(cur - 1); play(); }; $('#car-next').onclick = function () { go(cur + 1); play(); };
    dots.onclick = function (e) { var b = e.target.closest('button'); if (b) { go(+b.dataset.i); play(); } };
    var pb = $('#car-pause'); pb.setAttribute('aria-label', paused ? 'Reanudar rotación' : 'Pausar rotación');
    pb.onclick = function () { paused = !paused; pb.textContent = paused ? '▶' : '❚❚'; pb.setAttribute('aria-label', paused ? 'Reanudar rotación' : 'Pausar rotación'); play(); };
    if (paused) pb.textContent = '▶';
    var car = $('.carousel'); car.addEventListener('mouseenter', function () { clearInterval(timer); }); car.addEventListener('mouseleave', play); car.addEventListener('focusin', function () { clearInterval(timer); });
    go(0); play();
  }

  function faq() {
    var l = $('#faq-list');
    l.innerHTML = C.faq.map(function (f, i) { return '<div class="faq__i"><button type="button" class="faq__q" aria-expanded="false" aria-controls="fq' + i + '">' + esc(f.pregunta) + '</button><div class="faq__r" id="fq' + i + '" role="region"><div><p>' + esc(f.respuesta) + '</p></div></div></div>'; }).join('');
    l.addEventListener('click', function (e) {
      var b = e.target.closest('.faq__q'); if (!b) return; var it = b.parentNode, open = !it.classList.contains('is-open');
      $$('.faq__i', l).forEach(function (x) { x.classList.remove('is-open'); $('.faq__q', x).setAttribute('aria-expanded', 'false'); });
      if (open) { it.classList.add('is-open'); b.setAttribute('aria-expanded', 'true'); }
    });
  }

  // Lightbox: navega solo entre las piezas visibles según el filtro, mueve y devuelve el foco
  var lb, idx = 0;
  function abrirLb(id, origin) {
    visibles = $$('.card:not([hidden])').map(function (c) { return Number(c.dataset.id); });
    idx = visibles.indexOf(id); if (idx < 0) return;
    lastFocus = origin || document.activeElement; mostrar();
    lb.classList.add('is-open'); lb.inert = false; bodyLock(true); $('#lb-x').focus();
  }
  function mostrar() {
    var p = C.portafolio.filter(function (x) { return x.id === visibles[idx]; })[0], im = $('#lb-img'), vd = $('#lb-vid');
    if (p.tipo === 'video') { im.hidden = true; vd.hidden = false; vd.src = p.src; vd.poster = p.poster || ''; }
    else { vd.pause(); vd.removeAttribute('src'); vd.hidden = true; im.hidden = false; im.src = p.src; im.alt = p.titulo + ' — ' + p.artista; }
    $('#lb-cap').textContent = p.titulo + ' · ' + p.artista + (p.desc ? ' — ' + p.desc : '');
  }
  function lightbox() {
    lb = $('#lb');
    function cerrar() { lb.classList.remove('is-open'); lb.inert = true; bodyLock(false); var v = $('#lb-vid'); v.pause(); v.removeAttribute('src'); if (lastFocus) lastFocus.focus(); }
    var mover = function (d) { idx = (idx + d + visibles.length) % visibles.length; mostrar(); };
    $('#lb-x').onclick = cerrar; $('#lb-p').onclick = function () { mover(-1); }; $('#lb-n').onclick = function () { mover(1); };
    lb.addEventListener('click', function (e) { if (e.target === lb) cerrar(); });
    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('is-open')) return;
      if (e.key === 'Escape') cerrar(); if (e.key === 'ArrowLeft') mover(-1); if (e.key === 'ArrowRight') mover(1);
      if (e.key === 'Tab') { var f = $$('button', lb).filter(function (b) { return !b.hidden; }), a = f[0], z = f[f.length - 1]; if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); } else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); } }
    });
  }

  function formulario() {
    var form = $('#form'), fb = $('#feedback'), btn = $('#send');
    var reglas = {
      nombre: function (v) { return v.length < 2 ? 'Escribe tu nombre (mínimo 2 letras).' : ''; },
      email: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? '' : 'Escribe un correo válido, por ejemplo nombre@correo.com.'; },
      telefono: function (v) { return /^[0-9+\s()\-]{7,20}$/.test(v) ? '' : 'Escribe un teléfono válido (solo números, 7 a 20 dígitos).'; },
      servicio: function (v) { return v ? '' : 'Elige un servicio.'; },
      mensaje: function (v) { return v.length < 10 ? 'Cuéntanos un poco más (mínimo 10 caracteres).' : ''; },
      politicas: function (v, el) { return el.checked ? '' : 'Debes aceptar la política de privacidad.'; }
    };
    function chequear(n) { var el = form.elements[n], msg = reglas[n](el.value.trim(), el); $('[data-err=' + n + ']').textContent = msg; el.classList.toggle('is-invalid', !!msg); el.setAttribute('aria-invalid', !!msg); return !msg; }
    Object.keys(reglas).forEach(function (n) { form.elements[n].addEventListener('blur', function () { chequear(n); }); form.elements[n].addEventListener('input', function () { if (form.elements[n].classList.contains('is-invalid')) chequear(n); }); });
    form.addEventListener('submit', function (e) {
      e.preventDefault(); var ok = Object.keys(reglas).map(chequear).every(Boolean);
      if (!ok) { fb.className = 'feedback bad'; fb.textContent = 'Revisa los campos marcados en rojo.'; var p = $('.is-invalid', form); if (p) p.focus(); return; }
      var d = new FormData(form);
      if (C.form.modo === 'formspree' && C.form.endpoint) {
        btn.classList.add('is-loading'); btn.disabled = true;
        fetch(C.form.endpoint, { method: 'POST', body: d, headers: { Accept: 'application/json' } }).then(function (r) { if (!r.ok) throw 0; fb.className = 'feedback ok'; fb.textContent = '¡Mensaje enviado! Te respondemos en menos de 24 horas.'; form.reset(); })
          .catch(function () { fb.className = 'feedback bad'; fb.textContent = 'No pudimos enviarlo. Escríbenos por WhatsApp.'; })
          .then(function () { btn.classList.remove('is-loading'); btn.disabled = false; });
      } else {
        var t = ['Hola KARMA 👋, vengo del formulario.', 'Nombre: ' + d.get('nombre'), 'Correo: ' + d.get('email'), 'Teléfono: ' + d.get('telefono'), 'Servicio: ' + d.get('servicio'), 'Artista: ' + (d.get('artista') || 'Sin preferencia'), '', 'Idea: ' + d.get('mensaje')].join('\n');
        window.open(wa(t), '_blank', 'noopener'); fb.className = 'feedback ok'; fb.textContent = 'Abrimos WhatsApp con tu mensaje listo para enviar.';
      }
    });
  }

  // Reveal y contadores con IntersectionObserver (un solo sistema, sin librerías)
  function efectos() {
    var els = $$('[data-reveal]');
    var io = 'IntersectionObserver' in window ? new IntersectionObserver(function (en) { en.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add('is-visible'); io.unobserve(x.target); } }); }, { threshold: .12, rootMargin: '0px 0px -6% 0px' }) : null;
    els.forEach(function (e) { io ? io.observe(e) : e.classList.add('is-visible'); });
    var co = new IntersectionObserver(function (en) {
      en.forEach(function (x) {
        if (!x.isIntersecting) return; co.unobserve(x.target); var el = x.target, n = +el.dataset.count || 0, t0 = performance.now();
        if (reduce) { el.textContent = n; return; }
        (function tick(t) { var p = Math.min((t - t0) / 1500, 1); el.textContent = Math.round((1 - Math.pow(1 - p, 3)) * n); if (p < 1) requestAnimationFrame(tick); })(t0);
      });
    }, { threshold: .6 });
    $$('[data-count]').forEach(function (e) { co.observe(e); });
    var links = $$('.nav a'), secs = $$('main section[id]');
    var so = new IntersectionObserver(function (en) { en.forEach(function (x) { if (x.isIntersecting) links.forEach(function (l) { l.classList.toggle('is-active', l.getAttribute('href') === '#' + x.target.id); }); }); }, { rootMargin: '-40% 0px -55% 0px' });
    secs.forEach(function (s) { so.observe(s); });
  }

  // Cada bloque es independiente: si uno falla, el resto del sitio sigue funcionando
  [textos, hero, header, menu, portafolio, artistas, carrusel, faq, lightbox, formulario, efectos].forEach(function (fn) {
    try { fn(); } catch (err) { console.error('[KARMA] error en ' + fn.name + ':', err); }
  });
  $$('.estudio__fig img').forEach(fallbackImg);
})();
