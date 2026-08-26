(function () {
  const grid = document.getElementById('productosGrid');
  const filtersWrap = document.getElementById('productosFiltros');
  const emptyMsg = document.getElementById('productosVacio');
  const resultCount = document.getElementById('productosCount');

  if (!grid) return;

  const categories = [
    { slug: 'agro', label: 'Agro' },
    { slug: 'camiones', label: 'Camiones' },
    { slug: 'remolques', label: 'Remolques' },
    { slug: 'tractores', label: 'Tractores' },
    { slug: 'autopropulsadas', label: 'Autopropulsadas' },
    { slug: 'higiene-urbana', label: 'Higiene urbana' },
    { slug: 'neumaticos-y-llantas', label: 'Neumáticos y Llantas' }
  ];

  let allProducts = [];

  function getCatFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('cat') || 'todos';
  }

  function renderFilters(activeCat) {
    filtersWrap.innerHTML = '';

    const todos = document.createElement('button');
    todos.textContent = 'Todos';
    todos.className = 'filtro-pill' + (activeCat === 'todos' ? ' is-active' : '');
    todos.dataset.cat = 'todos';
    filtersWrap.appendChild(todos);

    categories.forEach((cat) => {
      const btn = document.createElement('button');
      btn.textContent = cat.label;
      btn.className = 'filtro-pill' + (activeCat === cat.slug ? ' is-active' : '');
      btn.dataset.cat = cat.slug;
      filtersWrap.appendChild(btn);
    });

    filtersWrap.querySelectorAll('.filtro-pill').forEach((btn) => {
      btn.addEventListener('click', () => {
        const cat = btn.dataset.cat;
        const url = cat === 'todos' ? 'productos.html' : `productos.html?cat=${cat}`;
        history.pushState({}, '', url);
        renderFilters(cat);
        renderGrid(cat);
      });
    });
  }

  function renderGrid(activeCat) {
    const filtered = activeCat === 'todos'
      ? allProducts
      : allProducts.filter((p) => p.category === activeCat);

    grid.innerHTML = '';

    if (resultCount) {
      resultCount.textContent = `${filtered.length} producto${filtered.length === 1 ? '' : 's'}`;
    }

    if (!filtered.length) {
      emptyMsg.classList.remove('hidden');
      return;
    }
    emptyMsg.classList.add('hidden');

    filtered.forEach((p) => {
      const card = document.createElement('article');
      card.className = 'producto-card';
      card.innerHTML = `
        <div class="producto-card-img">
          <img src="${p.image}" alt="${p.name}" loading="lazy">
          <span class="producto-card-tag">${p.categoryLabel}</span>
        </div>
        <div class="producto-card-body">
          <h3>${p.name}</h3>
          <p>${p.description}</p>
          <a href="contacto.html?producto=${encodeURIComponent(p.id)}" class="producto-card-cta">
            Consultar
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
          </a>
        </div>
      `;
      grid.appendChild(card);
    });
  }

  fetch('productos.json')
    .then((res) => res.json())
    .then((data) => {
      allProducts = data;
      const initialCat = getCatFromUrl();
      renderFilters(initialCat);
      renderGrid(initialCat);
    })
    .catch((err) => {
      console.error('Error cargando productos.json', err);
      grid.innerHTML = '<p class="text-neutral-500">No se pudieron cargar los productos.</p>';
    });

  // Soporte para el botón atrás/adelante del navegador
  window.addEventListener('popstate', () => {
    const cat = getCatFromUrl();
    renderFilters(cat);
    renderGrid(cat);
  });
})();