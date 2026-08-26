(function () {
  const track = document.getElementById('showcaseTrack');
  if (!track) return;

  const catStyles = {
    'agro': { color: '#3daa35', tag: 'Agro' },
    'camiones': { color: '#2563eb', tag: 'Camiones' },
    'remolques': { color: '#f97316', tag: 'Remolques' },
    'tractores': { color: '#78350f', tag: 'Tractores' },
    'autopropulsadas': { color: '#14b8bd', tag: 'Autopropulsadas' },
    'higiene-urbana': { color: '#38bdf8', tag: 'Higiene urbana' },
    'neumaticos-y-llantas': { color: '#eab308', tag: 'Neumáticos y Llantas' }
  };

  function buildCard(p) {
    const style = catStyles[p.category] || { color: '#525252', tag: p.categoryLabel };

    const a = document.createElement('a');
    a.href = `productos.html?cat=${p.category}`;
    a.className = 'showcase-card';
    a.innerHTML = `
      <img src="${p.image}" alt="${p.name}" loading="lazy">
      <div class="showcase-card-overlay"></div>
      <span class="showcase-card-tag" style="background:${style.color};">${style.tag}</span>
      <span class="showcase-card-name">${p.name}</span>
    `;
    return a;
  }

  fetch('productos.json')
    .then((res) => res.json())
    .then((data) => {
      if (!data.length) return;

      // Se arma la lista dos veces seguidas: el carrusel se desliza -50%
      // y como la segunda mitad es idéntica a la primera, el loop no se nota.
      [...data, ...data].forEach((p) => {
        track.appendChild(buildCard(p));
      });

      // Duración proporcional a la cantidad de productos, para que la
      // velocidad de desplazamiento sea siempre pareja sin importar cuántos haya.
      const duration = Math.max(20, data.length * 5);
      track.style.animationDuration = `${duration}s`;
    })
    .catch((err) => console.error('Error cargando el carrusel de productos', err));
})();