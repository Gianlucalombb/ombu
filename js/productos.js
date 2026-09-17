(function () {

  const CATEGORIES = [
    {
      slug: 'remolques',
      label: 'Semirremolques',
      color: '#eab308',
      tag: 'RMQ',
      image: '/img/header3.jpg',
      desc: 'Un verdadero ícono de la marca.',
      heroDesc: 'Bateas, tolvas y semirremolques para el transporte de granos a gran escala.',
      filtros: ['Acoplados', 'Bateas', 'Semi Remolques', 'Equipos Bitren', 'Cajas Sobre Camión', 'Equipo Full Trailer']
    },
    {
      slug: 'carrocerias',
      label: 'Carrocerías',
      color: '#9333ea',
      tag: 'CAR',
      image: '/img/header8.jpg',
      desc: 'Carrocerías a medida para cada aplicación.',
      heroDesc: 'Soluciones de carrocería adaptadas a las necesidades de tu operación.',
      filtros: ['Baranda Volcable', 'Todo Puerta', 'Garrafera', 'Jaula Vaquera', 'Mixta Cerealera y Vaquera', 'Sider', 'Tolva']
    },
    {
      slug: 'camiones',
      label: 'Camiones',
      color: '#6b7280',
      tag: 'CAM',
      image: '/img/header2.jpg',
      desc: 'Robustez y confiabilidad para trabajo pesado.',
      heroDesc: 'Camiones preparados para exigencias del transporte agrícola e industrial.',
      filtros: ['Volvo', 'Mercedes-Benz', 'Iveco']
    },
    {
      slug: 'agro',
      label: 'Agro',
      color: '#3daa35',
      tag: 'AGR',
      image: '/img/header1.jpg',
      desc: 'Soluciones confiables para cada campaña.',
      heroDesc: 'Equipamiento de última generación para maximizar la productividad de tu campo.',
      filtros: ['Autodescargables', 'Conservación de granos', 'Cosecha', 'Equipos siembra', 'Ganadería', 'Labranza']
    },
    {
      slug: 'tractores',
      label: 'Tractores',
      color: '#78350f',
      tag: 'TRAC',
      image: '/img/header5.jpg',
      desc: 'Potencia y versatilidad para el día a día.',
      heroDesc: 'Tractores pensados para el trabajo agrícola diario, con distintas configuraciones.',
      filtros: ['Línea Compacta', 'Línea Media', 'Potencia Superior', 'Alta Gama']
    },
    {
      slug: 'autopropulsadas',
      label: 'Autopropulsadas',
      color: '#2563eb',
      tag: 'AP',
      image: '/img/header6.jpg',
      desc: 'Pulverizadoras de alta tecnología.',
      heroDesc: 'Mejores prestaciones, mejores resultados en cada aplicación.',
      filtros: ['Pulverizadoras', 'Fertilizadoras', 'Cosechadoras']
    },
    {
      slug: 'higiene-urbana',
      label: 'Higiene urbana',
      color: '#38bdf8',
      tag: 'URB',
      image: '/img/header7.jpg',
      desc: 'Equipos confiables y duraderos.',
      heroDesc: 'Adaptables a cualquier tipo y modelo de camión.',
      filtros: ['Compactadores de residuos', 'Compactadores de residuos automatizados', 'Barredoras', 'Roll Off Sistema de Izaje', 'Roll Off Contenedores Bisistema', 'Tanques', 'Cajas Volcadoras', 'Equipos de Remolque', 'Equipos de Carrocerías, Playos y Grúas', 'Lavacontenedores, Contenedores Plásticos, Contenedores Metálicos']
    },
    {
      slug: 'neumaticos-y-llantas',
      label: 'Neumáticos',
      color: '#171717',
      tag: 'NEU',
      image: '/img/header4.jpg',
      desc: 'Amplia gama de medidas disponibles.',
      heroDesc: 'Neumáticos y llantas para todo tipo de maquinaria agrícola e industrial.',
      filtros: ['Pace', 'Compasal', 'Suretrac', 'Firestone', 'Goodyear', 'Bridgestone', 'Xbri', 'Tornel', 'Aplus', 'Roadcruza', 'Kumho Tire', 'Triangle', 'Durable', 'Fate', 'Good Ride', 'Samson', 'Yokohama', 'Advance']
    }
  ];

  const catLanding = document.getElementById('catLanding');
  const catDetail = document.getElementById('catDetail');
  const prodDetail = document.getElementById('prodDetail');
  if (!catLanding || !catDetail) return;

  /* ===== Header propio de esta página: blanco fijo en la landing,
     transparente-a-blanco-al-scrollear en el detalle de categoría ===== */
  const siteHeader = document.getElementById('siteHeader');
  const HEADER_SCROLL_THRESHOLD = 60;
  let headerMode = 'landing'; // 'landing' | 'detail'

  function updateHeaderNow() {
    if (!siteHeader) return;
    const shouldBeWhite = headerMode === 'landing' || window.scrollY > HEADER_SCROLL_THRESHOLD;

    siteHeader.classList.toggle('is-scrolled', shouldBeWhite);

    // Se fuerza también por estilo inline (máxima prioridad posible),
    // para que el resultado visual sea siempre el correcto sin importar
    // si alguna otra regla CSS le está ganando a la clase.
    siteHeader.style.setProperty('background', shouldBeWhite ? 'rgba(255,255,255,0.98)' : 'transparent', 'important');
    siteHeader.style.setProperty('border-bottom', shouldBeWhite ? '1px solid #e5e5e5' : 'none', 'important');

    const navColor = shouldBeWhite ? '#171717' : '#fff';
    siteHeader.querySelectorAll('nav a, #menuBtn, .header-search-btn').forEach((el) => {
      if (el.classList.contains('text-red-600')) return; // "Productos" activo se queda rojo
      el.style.setProperty('color', navColor, 'important');
    });
    const searchBtn = siteHeader.querySelector('.header-search-btn');
    if (searchBtn) searchBtn.style.setProperty('border-color', shouldBeWhite ? '#d4d4d4' : 'rgba(255,255,255,.4)', 'important');

    siteHeader.querySelectorAll('#headerLogos img').forEach((img) => {
      img.style.setProperty('filter', shouldBeWhite ? 'brightness(0)' : 'none', 'important');
    });
  }

  window.addEventListener('scroll', updateHeaderNow, { passive: true });
  updateHeaderNow();

  const catLandingGrid = document.getElementById('catLandingGrid');
  const catHeroImg = document.getElementById('catHeroImg');
  const catHeroTitle = document.getElementById('catHeroTitle');
  const catHeroDesc = document.getElementById('catHeroDesc');
  const catBreadcrumbCurrent = document.getElementById('catBreadcrumbCurrent');
  const catBreadcrumbUnderline = document.getElementById('catBreadcrumbUnderline');
  const catFiltrosList = document.getElementById('catFiltrosList');
  const catFiltrosClear = document.getElementById('catFiltrosClear');
  const catResultCount = document.getElementById('catResultCount');
  const catProductsGrid = document.getElementById('catProductsGrid');
  const catEmptyMsg = document.getElementById('catEmptyMsg');
  const catEmptyClear = document.getElementById('catEmptyClear');
  const catSortSelect = document.getElementById('catSortSelect');
  const viewGridBtn = document.getElementById('viewGridBtn');
  const viewListBtn = document.getElementById('viewListBtn');
  const catHeroSection = document.getElementById('catHero');

  let allProducts = [];
  let currentCategory = null;
  let activeFilters = new Set();
  let currentView = 'grid';

  function getCatSlugFromUrl() {
    const fromQuery = new URLSearchParams(window.location.search).get('cat');
    if (fromQuery) return fromQuery;
    const fromPath = window.location.pathname.match(/^\/productos\/([^\/]+)\/?$/);
    return fromPath ? decodeURIComponent(fromPath[1]) : null;
  }

  function getProductoIdFromUrl() {
    const fromQuery = new URLSearchParams(window.location.search).get('producto');
    if (fromQuery) return fromQuery;
    const fromPath = window.location.pathname.match(/^\/producto\/([^\/]+)\/?$/);
    return fromPath ? decodeURIComponent(fromPath[1]) : null;
  }

  /* ===== SEO dinámico: título, descripción, canonical y OG según la vista ===== */
  function updateSEO({ title, description, url, image }) {
    const set = (id, attr, value) => {
      const el = document.getElementById(id);
      if (el) el[attr] = value;
    };
    document.title = title;
    set('pageTitle', 'textContent', title);
    set('metaDescription', 'content', description);
    set('canonicalLink', 'href', url);
    set('ogUrl', 'content', url);
    set('ogTitle', 'content', title);
    set('ogDescription', 'content', description);
    set('twTitle', 'content', title);
    set('twDescription', 'content', description);
    if (image) {
      set('ogImage', 'content', image);
      set('twImage', 'content', image);
    }
  }

  // Asegura que cualquier ruta de imagen empiece con "/", así siempre
  // apunta a la raíz del sitio sin importar la URL "linda" desde la que
  // se esté mostrando (ej. /producto/algo en vez de /productos.html).
  function imgPath(path) {
    if (!path) return path;
    if (path.startsWith('/') || path.startsWith('http')) return path;
    return '/' + path;
  }

  function setProductJsonLd(p, cat) {
    let script = document.getElementById('productJsonLd');
    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = 'productJsonLd';
      document.head.appendChild(script);
    }
    // Para camiones el campo "modelo" guarda la marca real (Volvo, Mercedes-Benz, Iveco);
    // para el resto de las categorías, "modelo" es un sub-tipo (ej. "Baranda Volcable"),
    // no una marca, así que ahí seguimos usando OMBU.
    const brandName = (p.category === 'camiones' && p.modelo) ? p.modelo : 'OMBU';

    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Product",
      "name": p.name,
      "description": p.description || p.descripcionLarga || '',
      "image": p.images && p.images.length ? p.images.map((img) => `https://ombugrupozzetto.com/${img}`) : [`https://ombugrupozzetto.com/${p.image}`],
      "category": cat ? cat.label : p.categoryLabel,
      "brand": { "@type": "Brand", "name": brandName },
      "offers": {
        "@type": "Offer",
        "availability": "https://schema.org/InStock",
        "priceCurrency": "ARS",
        "url": `https://ombugrupozzetto.com/producto/${encodeURIComponent(p.id)}`
      }
    });
  }

  /* ===== VISTA 1: Landing de categorías ===== */
  function renderLanding() {
    catDetail.classList.add('hidden');
    if (prodDetail) prodDetail.classList.add('hidden');
    catLanding.classList.remove('hidden');

    headerMode = 'landing';
    updateHeaderNow();

    updateSEO({
      title: 'Productos — Maquinaria Agrícola, Camiones y Semirremolques | OMBU Tapiales',
      description: 'Catálogo completo OMBU y Traxor: maquinaria agrícola, tractores, camiones, semirremolques, carrocerías, equipos de higiene urbana y neumáticos. Concesionario oficial en Tapiales, Buenos Aires.',
      url: 'https://ombugrupozzetto.com/productos.html'
    });

    catLandingGrid.innerHTML = '';
    CATEGORIES.forEach((cat, i) => {
      const a = document.createElement('a');
      a.href = `/productos/${cat.slug}`;
      a.className = 'cat-landing-card fade-item';
      a.style.animationDelay = (i * 0.06) + 's';
      a.style.setProperty('--cat-color', cat.color);
      a.innerHTML = `
        <img src="${cat.image}" alt="${cat.label}">
        <div class="cat-landing-overlay"></div>
        <div class="cat-landing-body">
          <h3>${cat.label}</h3>
          <span class="cat-landing-underline"></span>
          <p>${cat.desc}</p>
          <span class="cat-landing-btn">
            Ver +
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
          </span>
        </div>
      `;
      catLandingGrid.appendChild(a);
    });
  }

  /* ===== VISTA 2: Listado filtrado por categoría ===== */
  function renderDetail(slug) {
    const cat = CATEGORIES.find((c) => c.slug === slug);
    if (!cat) { renderLanding(); return; }

    currentCategory = cat;
    activeFilters = new Set();

    catLanding.classList.add('hidden');
    if (prodDetail) prodDetail.classList.add('hidden');
    catDetail.classList.remove('hidden');

    headerMode = 'detail';
    updateHeaderNow();

    updateSEO({
      title: `${cat.label} — OMBU Tapiales | Maquinaria y Equipos`,
      description: `${cat.heroDesc || `Conocé nuestra línea de ${cat.label} OMBU y Traxor.`} Concesionario oficial en Tapiales, Buenos Aires.`,
      url: `https://ombugrupozzetto.com/productos/${cat.slug}`,
      image: `https://ombugrupozzetto.com${cat.image}`
    });

    // Hero
    catHeroImg.src = cat.image;
    catHeroImg.alt = cat.label;
    catHeroSection.style.setProperty('--cat-color', cat.color);
    catHeroTitle.textContent = cat.label;
    catHeroDesc.textContent = cat.heroDesc;
    catBreadcrumbCurrent.textContent = cat.label;

    // Reinicia todas las animaciones de entrada del hero (zoom, revelado del
    // título, línea y descripción) cada vez que cambia de categoría.
    const catHeroUnderline = document.querySelector('.cat-hero-underline');
    [catHeroImg, catHeroTitle, catHeroUnderline, catHeroDesc].forEach((el) => {
      el.style.animation = 'none';
      void el.offsetWidth;
      el.style.animation = '';
    });

    // Línea de color debajo del breadcrumb, y la reinicia para que se dibuje de nuevo
    catBreadcrumbUnderline.style.setProperty('--cat-color', cat.color);
    catBreadcrumbUnderline.style.animation = 'none';
    void catBreadcrumbUnderline.offsetWidth;
    catBreadcrumbUnderline.style.animation = '';

    // Color de acento en el panel de filtros
    document.querySelector('.filtros-panel').style.setProperty('--cat-color', cat.color);

    renderFiltros();
    renderProducts();
  }

  function renderFiltros() {
    const catProducts = allProducts.filter((p) => p.category === currentCategory.slug);

    catFiltrosList.innerHTML = '';
    currentCategory.filtros.forEach((filtro) => {
      const count = catProducts.filter((p) => p.modelo === filtro).length;

      const isEmpty = count === 0;

      const label = document.createElement('label');
      label.className = 'filtro-check' + (isEmpty ? ' is-empty' : '');
      label.innerHTML = `
        <input type="checkbox" value="${filtro}" ${isEmpty ? 'disabled' : ''}>
        <span class="filtro-check-box">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
        </span>
        <span class="filtro-check-label">${filtro}</span>
        <span class="filtro-check-count">${count}</span>
      `;
      const input = label.querySelector('input');
      input.addEventListener('change', () => {
        if (input.checked) activeFilters.add(filtro);
        else activeFilters.delete(filtro);
        updateClearVisibility();
        renderProducts();
      });
      catFiltrosList.appendChild(label);
    });

    updateClearVisibility();
  }

  function updateClearVisibility() {
    catFiltrosClear.classList.toggle('is-visible', activeFilters.size > 0);
  }

  function clearFiltros() {
    activeFilters.clear();
    catFiltrosList.querySelectorAll('input[type="checkbox"]').forEach((i) => { i.checked = false; });
    updateClearVisibility();
    renderProducts();
  }
  catFiltrosClear.addEventListener('click', clearFiltros);
  const catFiltrosClearMobile = document.getElementById('catFiltrosClearMobile');
  if (catFiltrosClearMobile) catFiltrosClearMobile.addEventListener('click', clearFiltros);
  catEmptyClear.addEventListener('click', clearFiltros);

  // Panel de filtros en mobile: se abre como una hoja que sube desde abajo
  const filtrosAside = document.getElementById('filtrosAside');
  const filtrosOpenBtn = document.getElementById('filtrosOpenBtn');
  const filtrosCloseBtn = document.getElementById('filtrosCloseBtn');
  const filtrosApplyBtn = document.getElementById('filtrosApplyBtn');
  const filtrosOverlay = document.getElementById('filtrosOverlay');

  function openFiltrosMobile() {
    filtrosAside.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }
  function closeFiltrosMobile() {
    filtrosAside.classList.remove('is-open');
    document.body.style.overflow = '';
  }
  if (filtrosOpenBtn) filtrosOpenBtn.addEventListener('click', openFiltrosMobile);
  if (filtrosCloseBtn) filtrosCloseBtn.addEventListener('click', closeFiltrosMobile);
  if (filtrosApplyBtn) filtrosApplyBtn.addEventListener('click', closeFiltrosMobile);
  if (filtrosOverlay) filtrosOverlay.addEventListener('click', closeFiltrosMobile);

  function getFilteredSortedProducts() {
    let list = allProducts.filter((p) => p.category === currentCategory.slug);

    if (activeFilters.size) {
      list = list.filter((p) => activeFilters.has(p.modelo));
    }

    const sortMode = catSortSelect.value;
    if (sortMode === 'az' || sortMode === 'za') {
      list = [...list].sort((a, b) => {
        return sortMode === 'za'
          ? b.name.localeCompare(a.name, 'es')
          : a.name.localeCompare(b.name, 'es');
      });
    }
    // sortMode === 'default': se deja tal cual viene del archivo (orden de carga)

    return list;
  }

  function renderProducts() {
    const list = getFilteredSortedProducts();
    catResultCount.textContent = list.length;
    catProductsGrid.innerHTML = '';

    if (!list.length) {
      catEmptyMsg.classList.remove('hidden');
      catProductsGrid.classList.add('hidden');
      return;
    }
    catEmptyMsg.classList.add('hidden');
    catProductsGrid.classList.remove('hidden');

    catProductsGrid.className = currentView === 'grid'
      ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8'
      : 'flex flex-col gap-4';

    const color = currentCategory.color;

    list.forEach((p, i) => {
      const el = document.createElement(currentView === 'grid' ? 'article' : 'a');
      if (currentView === 'list') el.href = `/producto/${encodeURIComponent(p.id)}`;

      el.className = (currentView === 'grid' ? 'prod-card' : 'prod-row') + ' fade-item';
      el.style.animationDelay = (i * 0.05) + 's';
      el.style.setProperty('--cat-color', color);

      if (currentView === 'grid') {
        el.innerHTML = `
          <a href="/producto/${encodeURIComponent(p.id)}" class="prod-card-img">
            <img src="${imgPath(p.image)}" alt="${p.name}" loading="lazy">
          </a>
          <div class="prod-card-body">
            ${p.modelo ? `<p class="prod-card-subcat">${p.modelo}</p>` : ''}
            <h3><a href="/producto/${encodeURIComponent(p.id)}">${p.name}</a></h3>
            <p>${p.description}</p>
            <a href="/producto/${encodeURIComponent(p.id)}" class="prod-card-cta">
              Ver detalles
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
            </a>
          </div>
        `;
      } else {
        el.innerHTML = `
          <div class="prod-row-img">
            <img src="${imgPath(p.image)}" alt="${p.name}" loading="lazy">
            <span class="prod-row-tag" style="background:${color}">${currentCategory.label}</span>
          </div>
          <div class="prod-row-body">
            <h3>${p.name}</h3>
            <p>${p.description}</p>
            <span class="prod-row-cta">
              Ver detalles
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
            </span>
          </div>
        `;
      }

      catProductsGrid.appendChild(el);
    });

    // Tarjeta "Consultanos" al final, solo en la vista grilla
    if (currentView === 'grid') {
      const ctaTile = document.createElement('a');
      ctaTile.href = 'contacto.html';
      ctaTile.className = 'prod-card-cta-tile fade-item';
      ctaTile.style.animationDelay = (list.length * 0.05) + 's';
      ctaTile.style.setProperty('--cat-color', color);
      ctaTile.innerHTML = `
        <span class="prod-card-cta-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        </span>
        <h3>¿No encontrás tu modelo?</h3>
        <p>Contanos qué necesitás y te ayudamos a encontrarlo.</p>
        <span>
          Consultanos
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
        </span>
      `;
      catProductsGrid.appendChild(ctaTile);
    }
  }

  catSortSelect.addEventListener('change', renderProducts);

  viewGridBtn.addEventListener('click', () => {
    currentView = 'grid';
    viewGridBtn.classList.add('is-active');
    viewListBtn.classList.remove('is-active');
    renderProducts();
  });
  viewListBtn.addEventListener('click', () => {
    currentView = 'list';
    viewListBtn.classList.add('is-active');
    viewGridBtn.classList.remove('is-active');
    renderProducts();
  });

  /* ===== VISTA 3: Detalle de producto ===== */
  const prodDetailMainImg = document.getElementById('prodDetailMainImg');
  const prodDetailCounter = document.getElementById('prodDetailCounter');
  const prodDetailThumbs = document.getElementById('prodDetailThumbs');
  const prodDetailTitle = document.getElementById('prodDetailTitle');
  const prodDetailSubcat = document.getElementById('prodDetailSubcat');
  const prodDetailDesc = document.getElementById('prodDetailDesc');
  const prodDetailTagline = document.getElementById('prodDetailTagline');
  const prodDetailCatLink = document.getElementById('prodDetailCatLink');
  const prodDetailName = document.getElementById('prodDetailName');
  const prodDetailBudgetBtn = document.getElementById('prodDetailBudgetBtn');
  const prodDetailShareBtn = document.getElementById('prodDetailShareBtn');

  // Pestañas: indicador deslizante + clicks
  const prodTabBtns = document.querySelectorAll('.prod-tab-btn');
  const prodTabIndicator = document.getElementById('prodTabIndicator');
  const prodTabsNav = document.querySelector('.prod-tabs-nav');

  function moveTabIndicator() {
    const active = document.querySelector('.prod-tab-btn.is-active');
    if (!active || !prodTabIndicator || !prodTabsNav) return;
    const navRect = prodTabsNav.getBoundingClientRect();
    const btnRect = active.getBoundingClientRect();
    prodTabIndicator.style.width = btnRect.width + 'px';
    prodTabIndicator.style.transform = `translateX(${btnRect.left - navRect.left}px)`;
  }

  prodTabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      prodTabBtns.forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      document.querySelectorAll('.prod-tab-panel').forEach((panel) => {
        panel.classList.toggle('is-active', panel.id === 'prodTab' + btn.dataset.tab.charAt(0).toUpperCase() + btn.dataset.tab.slice(1));
      });
      moveTabIndicator();
    });
  });

  window.addEventListener('resize', moveTabIndicator);

  // Lightbox: click en la foto grande la muestra ampliada, sin ocupar toda la pantalla
  const prodLightbox = document.getElementById('prodLightbox');
  const prodLightboxImg = document.getElementById('prodLightboxImg');
  const prodLightboxClose = document.getElementById('prodLightboxClose');
  const prodLightboxPrev = document.getElementById('prodLightboxPrev');
  const prodLightboxNext = document.getElementById('prodLightboxNext');
  const prodLightboxCounter = document.getElementById('prodLightboxCounter');

  // Estado de la galería del producto actual, compartido con showImage()
  let currentGalleryImages = [];
  let currentGalleryIndex = 0;
  let currentGalleryName = '';

  function updateLightboxImg() {
    prodLightboxImg.style.animation = 'none';
    void prodLightboxImg.offsetWidth;
    prodLightboxImg.style.animation = '';
    prodLightboxImg.src = currentGalleryImages[currentGalleryIndex];
    prodLightboxImg.alt = currentGalleryName;

    const multi = currentGalleryImages.length > 1;
    prodLightboxPrev.classList.toggle('hidden', !multi);
    prodLightboxNext.classList.toggle('hidden', !multi);
    prodLightboxCounter.classList.toggle('hidden', !multi);
    if (multi) prodLightboxCounter.textContent = `${currentGalleryIndex + 1} / ${currentGalleryImages.length}`;
  }

  function goToGalleryImage(i) {
    const total = currentGalleryImages.length;
    currentGalleryIndex = (i + total) % total; // circular: del último vuelve al primero y viceversa
    prodDetailMainImg.src = currentGalleryImages[currentGalleryIndex];
    prodDetailMainImg.alt = currentGalleryName;
    prodDetailMainImg.style.animation = 'none';
    void prodDetailMainImg.offsetWidth;
    prodDetailMainImg.style.animation = '';
    prodDetailThumbs.querySelectorAll('.prod-detail-thumb').forEach((t, ti) => {
      t.classList.toggle('is-active', ti === currentGalleryIndex);
    });
    if (currentGalleryImages.length > 1) {
      prodDetailCounter.textContent = `${currentGalleryIndex + 1} / ${currentGalleryImages.length}`;
    }
    updateLightboxImg();
  }

  function openLightbox() {
    if (!prodLightbox || !prodDetailMainImg.src) return;
    updateLightboxImg();
    prodLightbox.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox() {
    if (!prodLightbox) return;
    prodLightbox.classList.add('hidden');
    document.body.style.overflow = '';
  }

  if (prodDetailMainImg) prodDetailMainImg.addEventListener('click', openLightbox);
  if (prodLightboxClose) prodLightboxClose.addEventListener('click', closeLightbox);
  if (prodLightboxPrev) prodLightboxPrev.addEventListener('click', (e) => { e.stopPropagation(); goToGalleryImage(currentGalleryIndex - 1); });
  if (prodLightboxNext) prodLightboxNext.addEventListener('click', (e) => { e.stopPropagation(); goToGalleryImage(currentGalleryIndex + 1); });

  // Flechas sobre la foto principal (fuera del lightbox)
  const prodMainPrev = document.getElementById('prodMainPrev');
  const prodMainNext = document.getElementById('prodMainNext');
  if (prodMainPrev) prodMainPrev.addEventListener('click', (e) => { e.stopPropagation(); goToGalleryImage(currentGalleryIndex - 1); });
  if (prodMainNext) prodMainNext.addEventListener('click', (e) => { e.stopPropagation(); goToGalleryImage(currentGalleryIndex + 1); });

  if (prodLightbox) {
    prodLightbox.addEventListener('click', (e) => {
      if (e.target === prodLightbox) closeLightbox();
    });
  }
  window.addEventListener('keydown', (e) => {
    if (prodLightbox && prodLightbox.classList.contains('hidden')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') goToGalleryImage(currentGalleryIndex + 1);
    if (e.key === 'ArrowLeft') goToGalleryImage(currentGalleryIndex - 1);
  });

  function renderProductDetail(id) {
    const p = allProducts.find((prod) => prod.id === id);
    if (!p) { renderLanding(); return; }

    const cat = CATEGORIES.find((c) => c.slug === p.category);

    catLanding.classList.add('hidden');
    catDetail.classList.add('hidden');
    if (prodDetail) prodDetail.classList.remove('hidden');

    headerMode = 'landing';
    updateHeaderNow();

    updateSEO({
      title: `${p.name} — ${cat ? cat.label : p.categoryLabel} OMBU | OMBU Tapiales`,
      description: (p.description || `${p.name}, ${cat ? cat.label.toLowerCase() : ''} OMBU disponible en OMBU Tapiales, Buenos Aires. Consultá precio y disponibilidad.`).slice(0, 160),
      url: `https://ombugrupozzetto.com/producto/${encodeURIComponent(p.id)}`,
      image: `https://ombugrupozzetto.com/${p.image}`
    });
    setProductJsonLd(p, cat);

    // Galería: usa p.images si existe, si no repite la única foto
    const images = ((p.images && p.images.length) ? p.images : [p.image]).map(imgPath);
    let currentImg = 0;
    currentGalleryImages = images;
    currentGalleryName = p.name;

    function showImage(i) {
      currentImg = i;
      currentGalleryIndex = i;
      prodDetailMainImg.src = images[i];
      prodDetailMainImg.alt = p.name;
      prodDetailMainImg.style.animation = 'none';
      void prodDetailMainImg.offsetWidth;
      prodDetailMainImg.style.animation = '';
      if (images.length > 1) {
        prodDetailCounter.textContent = `${i + 1} / ${images.length}`;
        prodDetailCounter.classList.remove('hidden');
      } else {
        prodDetailCounter.classList.add('hidden');
      }
      prodDetailThumbs.querySelectorAll('.prod-detail-thumb').forEach((t, ti) => {
        t.classList.toggle('is-active', ti === i);
      });
      // Si el lightbox está abierto, lo actualiza también
      if (prodLightbox && !prodLightbox.classList.contains('hidden')) {
        updateLightboxImg();
      }
    }

    prodDetailThumbs.innerHTML = '';
    if (images.length > 1) {
      prodDetailThumbs.classList.remove('hidden');
      images.forEach((img, i) => {
        const thumb = document.createElement('button');
        thumb.className = 'prod-detail-thumb';
        thumb.innerHTML = `<img src="${img}" alt="${p.name} - foto ${i + 1}">`;
        thumb.addEventListener('click', () => showImage(i));
        prodDetailThumbs.appendChild(thumb);
      });
      if (prodMainPrev) prodMainPrev.classList.remove('hidden');
      if (prodMainNext) prodMainNext.classList.remove('hidden');
    } else {
      prodDetailThumbs.classList.add('hidden');
      if (prodMainPrev) prodMainPrev.classList.add('hidden');
      if (prodMainNext) prodMainNext.classList.add('hidden');
    }
    showImage(0);

    // Info
    prodDetailTitle.textContent = p.name;
    prodDetailTagline.textContent = p.description;

    // Pestaña Descripción: usa el texto largo si existe, si no cae al copete corto
    prodDetailDesc.textContent = p.descripcionLarga || p.description;

    // Pestaña Especificaciones: soporta 3 formatos:
    // 1) Lista simple: ["...", "..."]
    // 2) Una tabla: { titulo, columnas, filas }
    // 3) Varias tablas: [{ titulo, columnas, filas }, { titulo, columnas, filas }, ...]
    function renderSpecTable({ titulo, columnas, filas }) {
      return `
        ${titulo ? `<p class="prod-spec-table-title">${titulo}</p>` : ''}
        <div class="prod-spec-table-wrap">
          <table class="prod-spec-table">
            <thead>
              <tr>${columnas.map((c) => `<th>${c}</th>`).join('')}</tr>
            </thead>
            <tbody>
              ${filas.map((fila) => `<tr>${fila.map((celda, i) => i === 0 ? `<th scope="row">${celda}</th>` : `<td>${celda}</td>`).join('')}</tr>`).join('')}
            </tbody>
          </table>
        </div>`;
    }

    const especifPanel = document.getElementById('prodTabEspecificaciones');
    const especif = p.especificaciones;
    if (Array.isArray(especif) && especif.length && typeof especif[0] === 'string') {
      // Formato 1: lista simple con tilde
      especifPanel.innerHTML = `<ul class="prod-tab-list">${
        especif.map((e) => `
          <li>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
            ${e}
          </li>`).join('')
      }</ul>`;
    } else if (Array.isArray(especif) && especif.length && especif[0].columnas) {
      // Formato 3: varias tablas, cada una con su título
      especifPanel.innerHTML = especif.map((tabla, i) =>
        `<div class="${i > 0 ? 'prod-spec-table-group' : ''}">${renderSpecTable(tabla)}</div>`
      ).join('');
    } else if (especif && especif.columnas && especif.filas) {
      // Formato 2: una sola tabla
      especifPanel.innerHTML = renderSpecTable(especif);
    } else {
      especifPanel.innerHTML = `
        <div class="prod-tab-empty">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.6"><rect x="3" y="4" width="18" height="16" rx="2"/><path stroke-linecap="round" d="M8 9h8M8 13h5"/></svg>
          Estamos cargando las especificaciones técnicas de este producto. Mientras tanto, consultanos directamente.
        </div>`;
    }

    // Pestaña Características: soporta 2 formatos:
    // 1) Lista plana: cada ítem es un string, o { texto, sub: [...] } con subitems
    // 2) Grupos con encabezado: [{ titulo, items: [...] }, { titulo, items: [...] }, ...]
    // p.opcionales (opcional, mismo formato que items) se muestra como sección aparte al final.
    function renderCaracList(items) {
      return `<ul class="prod-tab-list">${
        items.map((item) => {
          const texto = typeof item === 'string' ? item : item.texto;
          const sub = typeof item === 'object' && item.sub ? item.sub : null;
          return `
            <li>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
              <div>
                ${texto}
                ${sub ? `<ul class="prod-tab-sublist">${sub.map((s) => `<li>${s}</li>`).join('')}</ul>` : ''}
              </div>
            </li>`;
        }).join('')
      }</ul>`;
    }

    const caracPanel = document.getElementById('prodTabCaracteristicas');
    if (p.caracteristicas && p.caracteristicas.length) {
      let html;
      if (p.caracteristicas[0] && p.caracteristicas[0].items) {
        // Formato 2: grupos con encabezado
        html = p.caracteristicas.map((grupo, i) =>
          `<p class="prod-spec-table-title"${i > 0 ? ' style="margin-top:18px"' : ''}>${grupo.titulo}</p>${renderCaracList(grupo.items)}`
        ).join('');
      } else {
        // Formato 1: lista plana
        html = renderCaracList(p.caracteristicas);
      }
      if (p.opcionales && p.opcionales.length) {
        html += `<p class="prod-spec-table-title" style="margin-top:18px">Opcionales</p>${renderCaracList(p.opcionales)}`;
      }
      caracPanel.innerHTML = html;
    } else {
      caracPanel.innerHTML = `
        <div class="prod-tab-empty">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="9"/><path stroke-linecap="round" d="M12 8v5M12 16h.01"/></svg>
          Todavía no cargamos las características de este producto. Escribinos y te contamos todo.
        </div>`;
    }

    // Reinicia siempre en la pestaña "Descripción" al entrar a un producto
    document.querySelectorAll('.prod-tab-btn').forEach((btn) => btn.classList.toggle('is-active', btn.dataset.tab === 'descripcion'));
    document.querySelectorAll('.prod-tab-panel').forEach((panel) => panel.classList.toggle('is-active', panel.id === 'prodTabDescripcion'));
    requestAnimationFrame(moveTabIndicator);

    if (cat) {
      document.getElementById('prodDetail').style.setProperty('--cat-color', cat.color);

      // Línea de color debajo del breadcrumb, y la reinicia para que se dibuje de nuevo
      const prodBreadcrumbUnderline = document.getElementById('prodBreadcrumbUnderline');
      if (prodBreadcrumbUnderline) {
        prodBreadcrumbUnderline.style.setProperty('--cat-color', cat.color);
        prodBreadcrumbUnderline.style.animation = 'none';
        void prodBreadcrumbUnderline.offsetWidth;
        prodBreadcrumbUnderline.style.animation = '';
      }

      prodDetailCatLink.textContent = cat.label;
      prodDetailCatLink.href = `/productos/${cat.slug}`;
      prodDetailBudgetBtn.href = `https://wa.me/541127870031?text=${encodeURIComponent('Hola! Quiero solicitar un presupuesto para: ' + p.name)}`;
      prodDetailBudgetBtn.target = '_blank';

      // Subcategoría / modelo
      prodDetailSubcat.textContent = p.modelo ? `Modelo ${p.modelo}` : '';
      prodDetailSubcat.style.display = p.modelo ? '' : 'none';
    }
    prodDetailName.textContent = p.name;

    // Compartir: usa la Web Share API si está disponible, si no copia el link
    prodDetailShareBtn.onclick = () => {
      const shareUrl = window.location.href;
      if (navigator.share) {
        navigator.share({ title: p.name, url: shareUrl }).catch(() => {});
      } else {
        navigator.clipboard.writeText(shareUrl).then(() => {
          prodDetailShareBtn.classList.add('is-copied');
          setTimeout(() => prodDetailShareBtn.classList.remove('is-copied'), 1800);
        });
      }
    };

    // Productos relacionados: otros de la misma categoría, hasta 4, elegidos al azar
    const relatedWrap = document.getElementById('prodRelatedWrap');
    const relatedGrid = document.getElementById('prodRelatedGrid');
    if (relatedWrap && relatedGrid && cat) {
      const relacionados = allProducts
        .filter((prod) => prod.category === p.category && prod.id !== p.id)
        .sort(() => Math.random() - 0.5)
        .slice(0, 4);

      if (relacionados.length) {
        relatedWrap.classList.remove('hidden');
        relatedGrid.innerHTML = relacionados.map((rp) => `
          <a href="/producto/${encodeURIComponent(rp.id)}" class="prod-related-card" style="--related-color:${cat.color}">
            <div class="prod-related-img"><img src="${imgPath(rp.image)}" alt="${rp.name}" loading="lazy"></div>
            <div class="prod-related-body">
              ${rp.modelo ? `<p>${rp.modelo}</p>` : ''}
              <h4>${rp.name}</h4>
            </div>
          </a>
        `).join('');
      } else {
        relatedWrap.classList.add('hidden');
      }
    }
  }

  /* ===== Carga inicial ===== */
  fetch('/productos.json')
    .then((res) => res.json())
    .then((data) => {
      allProducts = data;
      const productoId = getProductoIdFromUrl();
      const slug = getCatSlugFromUrl();
      if (productoId) renderProductDetail(productoId);
      else if (slug) renderDetail(slug);
      else renderLanding();
    })
    .catch((err) => console.error('Error cargando productos.json', err))
    .finally(() => {
      const footer = document.getElementById('siteFooter');
      if (footer) {
        footer.classList.remove('hidden');
        footer.classList.add('is-revealed');
      }
    });

  window.addEventListener('popstate', () => {
    const productoId = getProductoIdFromUrl();
    const slug = getCatSlugFromUrl();
    if (productoId) renderProductDetail(productoId);
    else if (slug) renderDetail(slug);
    else renderLanding();
  });

})();