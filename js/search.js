(function () {

  let allProducts = null;
  let productsPromise = null;

  function loadProducts() {
    if (!productsPromise) {
      productsPromise = fetch('/productos.json')
        .then((res) => res.json())
        .then((data) => { allProducts = data; return data; })
        .catch((err) => {
          console.error('Error cargando productos.json para el buscador', err);
          allProducts = [];
          return [];
        });
    }
    return productsPromise;
  }

  function normalizar(texto) {
    return texto
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  // Dropdown de resultados: un único div reutilizado, anclado por posición
  // al botón que esté activo en cada momento (funciona igual en cualquier header).
  const dropdown = document.createElement('div');
  dropdown.id = 'searchDropdown';
  dropdown.className = 'search-dropdown hidden';
  document.body.appendChild(dropdown);

  let activeBtn = null;
  let activeInput = null;

  function renderEmpty(msg) {
    dropdown.innerHTML = `<div class="search-dropdown-empty">${msg}</div>`;
  }

  function renderResults(list, query) {
    if (!list.length) {
      renderEmpty(`Sin resultados para "${query}"`);
      return;
    }
    dropdown.innerHTML = list.map((p) => `
      <a href="/producto/${encodeURIComponent(p.id)}" class="search-dropdown-result">
        <img src="${p.image}" alt="${p.name}" loading="lazy">
        <div class="search-dropdown-result-info">
          <p class="search-dropdown-result-name">${p.name}</p>
          <p class="search-dropdown-result-cat">${p.categoryLabel || ''}${p.modelo ? ' · ' + p.modelo : ''}</p>
        </div>
      </a>
    `).join('');
  }

  function doSearch(query) {
    const q = normalizar(query.trim());
    if (!q) {
      renderEmpty('Escribí para buscar entre todos los productos.');
      return;
    }
    if (!allProducts) return;
    const matches = allProducts.filter((p) => {
      const haystack = normalizar([p.name, p.categoryLabel, p.modelo, p.description].filter(Boolean).join(' '));
      return haystack.includes(q);
    }).slice(0, 6);
    renderResults(matches, query);
  }

  function positionDropdown() {
    if (!activeInput) return;
    const rect = activeInput.getBoundingClientRect();
    dropdown.style.top = (rect.bottom + window.scrollY + 8) + 'px';
    dropdown.style.left = (rect.left + window.scrollX) + 'px';
    dropdown.style.width = Math.max(rect.width, 280) + 'px';
  }

  function closeSearch() {
    if (activeBtn) activeBtn.classList.remove('is-search-open');
    dropdown.classList.add('hidden');
    activeBtn = null;
    activeInput = null;
  }

  function openSearch(btn) {
    if (activeBtn === btn) return; // ya está abierto
    if (activeBtn) closeSearch();

    activeBtn = btn;
    btn.classList.add('is-search-open');
    activeInput = btn.querySelector('.search-inline-input');
    if (!activeInput) return;

    activeInput.value = '';
    dropdown.classList.remove('hidden');
    positionDropdown();
    renderEmpty('Cargando productos...');

    loadProducts().then(() => renderEmpty('Escribí para buscar entre todos los productos.'));

    setTimeout(() => activeInput.focus(), 80);
  }

  let debounceTimer;
  function attachInputEvents(input) {
    input.addEventListener('input', () => {
      clearTimeout(debounceTimer);
      const val = input.value;
      debounceTimer = setTimeout(() => doSearch(val), 100);
      positionDropdown();
    });
    input.addEventListener('click', (e) => e.stopPropagation());
  }

  /* ===== Convierte cada botón de búsqueda en un botón expandible con input adentro ===== */
  document.querySelectorAll('.search-btn, .header-search-btn').forEach((btn) => {
    const originalHTML = btn.innerHTML;
    const iconMatch = originalHTML.match(/<svg[\s\S]*?<\/svg>/);
    const icon = iconMatch ? iconMatch[0] : '';

    btn.innerHTML = `${icon}<input type="text" class="search-inline-input" placeholder="Buscar..." autocomplete="off">`;
    btn.classList.add('search-inline-btn');

    const input = btn.querySelector('.search-inline-input');
    attachInputEvents(input);

    btn.addEventListener('click', (e) => {
      if (activeBtn === btn) return;
      e.stopPropagation();
      openSearch(btn);
    });
  });

  document.addEventListener('click', (e) => {
    if (activeBtn && !activeBtn.contains(e.target) && !dropdown.contains(e.target)) {
      closeSearch();
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && activeBtn) closeSearch();
  });

  window.addEventListener('resize', positionDropdown);
  window.addEventListener('scroll', () => { if (activeBtn) positionDropdown(); }, true);

})();