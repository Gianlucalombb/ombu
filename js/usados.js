(function () {

  // Mismas categorías y colores que productos.js, para que los filtros
  // y las tarjetas usen siempre la misma paleta en todo el sitio.
  const CATEGORIES = [
    { slug: 'remolques', label: 'Semirremolques', color: '#eab308' },
    { slug: 'carrocerias', label: 'Carrocerías', color: '#9333ea' },
    { slug: 'camiones', label: 'Camiones', color: '#6b7280' },
    { slug: 'agro', label: 'Agro', color: '#3daa35' },
    { slug: 'tractores', label: 'Tractores', color: '#78350f' },
    { slug: 'autopropulsadas', label: 'Autopropulsadas', color: '#2563eb' },
    { slug: 'higiene-urbana', label: 'Higiene urbana', color: '#38bdf8' },
    { slug: 'neumaticos-y-llantas', label: 'Neumáticos', color: '#171717' }
  ];

  const grid = document.getElementById('usadosGrid');
  const resultCount = document.getElementById('usadosResultCount');
  const emptyMsg = document.getElementById('usadosEmptyMsg');
  const filtrosList = document.getElementById('catFiltrosList');
  const filtrosClear = document.getElementById('catFiltrosClear');
  const filtrosClearMobile = document.getElementById('catFiltrosClearMobile');

  if (!grid) return;

  let allUsados = [];
  let activeFilters = new Set();

  function renderFiltros() {
    filtrosList.innerHTML = '';
    CATEGORIES.forEach((cat) => {
      const count = allUsados.filter((u) => u.category === cat.slug).length;
      const isEmpty = count === 0;

      const label = document.createElement('label');
      label.className = 'filtro-check' + (isEmpty ? ' is-empty' : '');
      label.innerHTML = `
        <input type="checkbox" value="${cat.slug}" ${isEmpty ? 'disabled' : ''}>
        <span class="filtro-check-box"></span>
        <span class="filtro-check-label">${cat.label}</span>
        <span class="filtro-check-count">${count}</span>
      `;
      // El SVG del tilde va aparte para no romper el template de arriba
      const box = label.querySelector('.filtro-check-box');
      box.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>';

      const input = label.querySelector('input');
      input.addEventListener('change', () => {
        if (input.checked) activeFilters.add(cat.slug);
        else activeFilters.delete(cat.slug);
        updateClearVisibility();
        renderGrid();
      });
      filtrosList.appendChild(label);
    });
    updateClearVisibility();
  }

  function updateClearVisibility() {
    filtrosClear.classList.toggle('is-visible', activeFilters.size > 0);
  }

  function clearFiltros() {
    activeFilters.clear();
    filtrosList.querySelectorAll('input[type="checkbox"]').forEach((i) => { i.checked = false; });
    updateClearVisibility();
    renderGrid();
  }
  filtrosClear.addEventListener('click', clearFiltros);
  if (filtrosClearMobile) filtrosClearMobile.addEventListener('click', clearFiltros);

  function catInfo(slug) {
    return CATEGORIES.find((c) => c.slug === slug) || { label: slug, color: '#525252' };
  }

  function buildCard(u) {
    const cat = catInfo(u.category);
    const el = document.createElement('div');
    el.className = 'usado-card';
    el.style.setProperty('--cat-color', cat.color);

    const waText = encodeURIComponent(`Hola! Te consulto por el usado: ${u.name}`);

    el.innerHTML = `
      <div class="usado-card-img">
        <img src="${u.image}" alt="${u.name}" loading="lazy">
        <span class="usado-card-badge">${u.categoryLabel || cat.label}</span>
        ${u.year ? `<span class="usado-card-year">${u.year}</span>` : ''}
      </div>
      <div class="usado-card-body">
        <h3 class="usado-card-name">${u.name}</h3>
        ${u.description ? `<p class="usado-card-desc">${u.description}</p>` : ''}
        <a href="https://wa.me/541127870031?text=${waText}" target="_blank" class="usado-card-cta">
          Consultar
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
        </a>
      </div>
    `;
    return el;
  }

  function renderGrid() {
    let list = allUsados;
    if (activeFilters.size) {
      list = list.filter((u) => activeFilters.has(u.category));
    }

    resultCount.textContent = list.length;
    grid.innerHTML = '';

    if (!list.length) {
      emptyMsg.classList.remove('hidden');
      grid.classList.add('hidden');
      return;
    }
    emptyMsg.classList.add('hidden');
    grid.classList.remove('hidden');

    list.forEach((u) => grid.appendChild(buildCard(u)));
  }

  /* ===== Panel de filtros mobile: abrir / cerrar ===== */
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

  /* ===== Carga inicial ===== */
  fetch('/usados.json')
    .then((res) => res.json())
    .then((data) => {
      allUsados = data;
      renderFiltros();
      renderGrid();
    })
    .catch((err) => console.error('Error cargando usados.json', err));

})();