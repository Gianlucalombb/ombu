const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');

if (menuBtn && mobileMenu) {
  const menuBtnLabel = document.getElementById('menuBtnLabel');
  const menuBtnIconPath = document.getElementById('menuBtnIconPath');
  const ICON_HAMBURGER = 'M4 6h16M4 12h16M4 18h16';
  const ICON_CLOSE = 'M6 18L18 6M6 6l12 12';

  menuBtn.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('hidden') === false;
    if (menuBtnLabel) menuBtnLabel.textContent = isOpen ? 'Cerrar' : 'Menú';
    if (menuBtnIconPath) menuBtnIconPath.setAttribute('d', isOpen ? ICON_CLOSE : ICON_HAMBURGER);
    menuBtn.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
  });
}

/* ===== Menú desplegable de Productos (clic, para táctiles) ===== */
(function () {
  const menu = document.getElementById('productosMenu');
  if (!menu) return;

  const trigger = menu.querySelector('.productos-menu-trigger');

  trigger.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = menu.classList.toggle('is-open');
    trigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  document.addEventListener('click', (e) => {
    if (!menu.contains(e.target)) {
      menu.classList.remove('is-open');
      trigger.setAttribute('aria-expanded', 'false');
    }
  });
})();

/* ===== Animaciones al hacer scroll (aparecen al entrar en pantalla) ===== */
(function () {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  if (!('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  items.forEach((el) => observer.observe(el));
})();

/* ===== Números que cuentan hacia arriba al entrar en pantalla ===== */
(function () {
  const counters = document.querySelectorAll('[data-count-to]');
  if (!counters.length) return;

  function animateCount(el) {
    const target = parseInt(el.dataset.countTo, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 1400;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out
      const value = Math.round(target * eased);
      el.textContent = value + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  if (!('IntersectionObserver' in window)) {
    counters.forEach(animateCount);
    return;
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  counters.forEach((el) => counterObserver.observe(el));
})();

/* ===== Tarjeta de ubicación: se inclina en 3D siguiendo el mouse ===== */
(function () {
  const card = document.getElementById('ubicacionCard');
  if (!card) return;

  const MAX_TILT = 8; // grados máximos de inclinación

  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;  // 0 a 1
    const y = (e.clientY - rect.top) / rect.height;   // 0 a 1

    const rotateY = (x - 0.5) * MAX_TILT * 2;
    const rotateX = (0.5 - y) * MAX_TILT * 2;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
  });
})();

/* ===== Botón flotante "Solicitar presupuesto": mantener apretado en mobile muestra el cartel ===== */
(function () {
  const fab = document.getElementById('quoteFab');
  if (!fab) return;

  let pressTimer = null;

  fab.addEventListener('touchstart', () => {
    pressTimer = setTimeout(() => fab.classList.add('is-pressed'), 350);
  }, { passive: true });

  fab.addEventListener('touchend', () => {
    clearTimeout(pressTimer);
    setTimeout(() => fab.classList.remove('is-pressed'), 1200);
  });

  fab.addEventListener('touchmove', () => {
    clearTimeout(pressTimer);
    fab.classList.remove('is-pressed');
  });
})();

/* ===== Header: transparente arriba, blanco al bajar ===== */
(function () {
  const header = document.getElementById('siteHeader');
  if (!header) return;

  // productos.html maneja su propio header (tiene 2 vistas con
  // comportamientos distintos), así que este script no se mete ahí.
  if (document.getElementById('catLanding')) return;

  const SCROLL_THRESHOLD = 60; // px que hay que bajar para que cambie

  function updateHeader() {
    if (window.scrollY > SCROLL_THRESHOLD) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  }

  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();
})();

/* ===== Hero carrusel ===== */
(function () {
  const slides = document.querySelectorAll('.hero-slide');
  const tabs = document.querySelectorAll('.hero-tab');
  const badge = document.getElementById('heroBadge');
  const badgeImg = document.getElementById('heroBadgeImg');
  const heroTitle = document.getElementById('heroTitle');
  const prevBtn = document.getElementById('prevSlide');
  const nextBtn = document.getElementById('nextSlide');
  const tabIndicator = document.getElementById('tabIndicator');
  const tabsWrap = document.getElementById('heroTabs');
  const mobilePrev = document.getElementById('heroMobilePrev');
  const mobilePrevText = mobilePrev ? mobilePrev.querySelector('.hero-mobile-cat-side-text') : null;
  const mobileCurrent = document.getElementById('heroMobileCurrent');
  const mobileNext = document.getElementById('heroMobileNext');
  const mobileNextText = mobileNext ? mobileNext.querySelector('.hero-mobile-cat-side-text') : null;

  if (!slides.length) return;

  const SLIDE_DURATION = 3500;   // tiempo total por slide (ms)
  const BADGE_DURATION = 2200;   // cuánto se ve la palabra de categoría (ms)

  const names = ['Semirremolques', 'Carrocerías', 'Camiones', 'Agro', 'Tractores', 'Autopropulsadas', 'Higiene urbana', 'Neumáticos'];
  const slugs = ['remolques', 'carrocerias', 'camiones', 'agro', 'tractores', 'autopropulsadas', 'higiene-urbana', 'neumaticos-y-llantas'];
  const catClasses = ['cat-remolques', 'cat-carrocerias', 'cat-camiones', 'cat-agro', 'cat-tractores', 'cat-autopropulsadas', 'cat-higiene-urbana', 'cat-neumaticos-llantas'];
  const colors = ['#FFB800', '#F50808', '#B4B9BE', '#19DA00', '#00570A', '#004AA2', '#00D3EE', '#72777B'];
  const wordImages = [
    'img/hero-word-remolques.png',
    'img/hero-word-carrocerias.png',
    'img/hero-word-camiones.png',
    'img/hero-word-agro.png',
    'img/hero-word-tractores.png',
    'img/hero-word-autopropulsadas.png',
    'img/hero-word-higiene-urbana.png',
    'img/hero-word-neumaticos.png'
  ];

  let current = 0;
  let timer = null;
  let badgeTimer = null;

  function moveIndicator(tab) {
    if (!tabIndicator || !tabsWrap) return;
    const wrapRect = tabsWrap.getBoundingClientRect();
    const tabRect = tab.getBoundingClientRect();
    tabIndicator.style.width = tabRect.width + 'px';
    tabIndicator.style.transform = `translateX(${tabRect.left - wrapRect.left}px)`;
  }

  function goTo(index) {
    const prevSlide = slides[current];
    prevSlide.style.opacity = '0';
    prevSlide.style.transform = 'scale(1.03) translateX(-2%)';
    prevSlide.classList.remove('is-zooming');
    tabs[current].classList.remove('is-active');

    current = (index + slides.length) % slides.length;

    const nextSlide = slides[current];

    // Preparamos el punto de partida del desplazamiento (sin transición, instantáneo)
    nextSlide.style.transition = 'none';
    nextSlide.style.transform = 'scale(1.06) translateX(2%)';
    void nextSlide.offsetWidth;

    // Reactivamos la transición y animamos hacia la posición final: efecto de desplazamiento
    nextSlide.style.transition = '';
    nextSlide.style.opacity = '1';
    nextSlide.style.transform = 'scale(1) translateX(0)';

    tabs[current].classList.add('is-active');
    moveIndicator(tabs[current]);

    // Título: pulso sutil en cada cambio de categoría
    if (heroTitle) {
      heroTitle.classList.remove('is-pulsing');
      void heroTitle.offsetWidth;
      heroTitle.classList.add('is-pulsing');
    }

    // Ken Burns: reinicia el zoom de la foto que entra (si el slide tiene foto)
    const img = nextSlide.querySelector('.hero-slide-img');
    if (img) {
      img.style.transition = 'none';
      img.style.transform = 'scale(1)';
      void img.offsetWidth;
      img.style.transition = `transform ${SLIDE_DURATION + 800}ms linear`;
      requestAnimationFrame(() => nextSlide.classList.add('is-zooming'));
    }

    // Tarjeta de categoría: entra, se queda un momento, y sale
    clearTimeout(badgeTimer);
    badge.classList.remove('is-visible', 'is-leaving', ...catClasses);

    // Forzamos reflow para que el navegador "vea" el estado inicial antes de animar
    void badge.offsetWidth;

    badgeImg.src = wordImages[current];
    badgeImg.alt = names[current];
    badge.href = '/productos/' + slugs[current];
    badge.classList.add(catClasses[current]);
    badge.classList.add('is-visible');

    // Tira mobile: anterior / actual / siguiente, con vuelta circular
    if (mobileCurrent) {
      const prevIndex = (current - 1 + names.length) % names.length;
      const nextIndex = (current + 1) % names.length;
      mobilePrevText.textContent = names[prevIndex];
      mobileCurrent.textContent = names[current];
      mobileNextText.textContent = names[nextIndex];
    }

    badgeTimer = setTimeout(() => {
      badge.classList.remove('is-visible');
      badge.classList.add('is-leaving');
    }, BADGE_DURATION);
  }

  function next() { goTo(current + 1); resetTimer(); }
  function prev() { goTo(current - 1); resetTimer(); }

  function resetTimer() {
    clearInterval(timer);
    timer = setInterval(() => goTo(current + 1), SLIDE_DURATION);
  }

  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => {
      if (i === current) {
        window.location.href = '/productos/' + slugs[i];
        return;
      }
      goTo(i);
      resetTimer();
    });
  });
  if (nextBtn) nextBtn.addEventListener('click', next);
  if (prevBtn) prevBtn.addEventListener('click', prev);
  if (mobilePrev) mobilePrev.addEventListener('click', prev);
  if (mobileNext) mobileNext.addEventListener('click', next);
  if (mobileCurrent) {
    mobileCurrent.addEventListener('click', () => {
      window.location.href = '/productos/' + slugs[current];
    });
  }

  window.addEventListener('resize', () => moveIndicator(tabs[current]));

  goTo(0);
  resetTimer();
})();

/* Tarjetas de "copiar" (mail y teléfono) en la sección Nuestra presencia */
(function () {
  document.querySelectorAll('.presencia-copy-btn').forEach((btn) => {
    const hint = btn.querySelector('.presencia-copy-hint');
    const originalHint = hint ? hint.textContent : '';
    btn.addEventListener('click', () => {
      const texto = btn.dataset.copy;
      navigator.clipboard.writeText(texto).then(() => {
        btn.classList.add('is-copied');
        if (hint) hint.textContent = '¡Copiado!';
        setTimeout(() => {
          btn.classList.remove('is-copied');
          if (hint) hint.textContent = originalHint;
        }, 1800);
      });
    });
  });
})();