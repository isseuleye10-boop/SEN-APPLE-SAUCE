/* ============================================================
   SEN APPLE SAUCE — Menu JavaScript
   Filter system, order button interactions
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Menu Data ────────────────────────────────────────── */
  const menuData = [
    // Plats
    { id: 1, category: 'plats', name: 'Thieboudienne', desc: 'Riz au poisson, légumes frais', price: 3500, badge: 'National', img: 'images/thieboudjeun.jpg' },
    { id: 2, category: 'plats', name: 'Yassa Poulet', desc: 'Poulet mariné, oignons, citron, moutarde', price: 3000, badge: null, img: 'images/yassa_poulet.jpg' },
    { id: 3, category: 'plats', name: 'Mafé', desc: 'Ragoût de bœuf à la pâte d\'arachide', price: 3500, badge: 'Populaire', img: 'images/mafe.jpeg' },
    { id: 4, category: 'plats', name: 'Soupou Kandia', desc: 'Sauce gombo, poisson fumé', price: 3200, badge: null, img: 'images/soupe_Kandia.jpg' },
    { id: 5, category: 'plats', name: 'Domoda', desc: 'Sauce d\'arachide savoureuse', price: 3000, badge: null, img: 'images/Domoda.jpeg' },
    { id: 6, category: 'plats', name: 'Thiou', desc: 'Sauce tomate, viande ou poisson', price: 3000, badge: null, img: 'images/images.jpg' },
    { id: 7, category: 'plats', name: 'Thiebou Yapp', desc: 'Riz à la viande', price: 3500, badge: null, img: 'images/thiebou_yapp.jpeg' },
    { id: 8, category: 'plats', name: 'Brochettes', desc: 'Grillées et préparées avec soin', price: 3500, badge: null, img: 'images/brochette.jpg' },
    { id: 9, category: 'plats', name: 'Mbakhalou saloum', desc: 'Riz à la viande', price: 3500, badge: null, img: 'images/mbakhalou_saloum.JPG' },
    { id: 10, category: 'plats', name: 'C Bon', desc: 'Sauce gombo, poisson fumé', price: 3500, badge: null, img: 'images/C_Bon.JPG' },
    { id: 11, category: 'plats', name: 'ATiéké', desc: 'Riz au poisson, Alloco, Garba', price: 3500, badge: 'National', img: 'images/athiéké.jpeg' },
    
    // Entrées
    { id: 9, category: 'entrees', name: 'Fataya', desc: 'Beignets au poisson ou à la viande', price: 1500, badge: null, img: 'images/fataya.jpg' },
    { id: 10, category: 'entrees', name: 'Accara', desc: 'Beignets de niébé', price: 1200, badge: null, img: 'images/Akara.jpg' },
    { id: 11, category: 'entrees', name: 'Pastels', desc: 'Poisson, sauce tomate pimentée', price: 1500, badge: null, img: 'images/pastel.jpg' },
    
    // Jus
    { id: 12, category: 'jus', name: 'Bissap', desc: 'Hibiscus et menthe', price: 800, badge: null, img: 'images/Jus_Bissap.jpg' },
    { id: 13, category: 'jus', name: 'Bouye', desc: 'Jus de pain de singe', price: 800, badge: null, img: 'images/jus_bouy.jpg' },
    { id: 14, category: 'jus', name: 'Jus de Gingembre', desc: 'Gingembre frais', price: 800, badge: null, img: 'images/guinguerr.jpg' },
    { id: 15, category: 'jus', name: 'Jus de Tamarin', desc: 'Dakhar', price: 800, badge: null, img: 'images/jus_tamarin.jpg' },
    { id: 16, category: 'jus', name: 'Ditakh', desc: 'Fruit local acidulé', price: 1000, badge: null, img: 'images/Jus_Ditakh.jpg' },
    { id: 17, category: 'jus', name: 'Mangue ', desc: 'Jus de fruits frais', price: 1000, badge: null, img: 'images/Jus_Mangue.jpg' },
    { id: 17, category: 'jus', name: 'Jus Corossol', desc: 'Jus de fruits frais', price: 1000, badge: null, img: 'images/jus_corossol.jpg' },
    
    // Desserts
    { id: 18, category: 'desserts', name: 'Thiakry', desc: 'Couscous de mil, lait caillé, vanille', price: 1200, badge: null, img: 'images/thiakry.jpg' },
    { id: 19, category: 'desserts', name: 'Ngalakh', desc: 'Crème d\'arachide et pâte de baobab', price: 1500, badge: null, img: 'images/ngallakh.jpg' },
    { id: 20, category: 'desserts', name: 'Sombi', desc: 'Riz au lait de coco', price: 1200, badge: null, img: 'images/sombi.jpg' },
    { id: 21, category: 'desserts', name: 'Laakh Soow', desc: 'Dessert lacté', price: 1200, badge: null, img: 'images/lakh.jpg' },
    { id: 22, category: 'desserts', name: 'Beignets Sénégalais', desc: 'Bofrot', price: 1000, badge: null, img: 'images/beignet.jpg' },
    
    // Thés
    { id: 23, category: 'thes', name: 'Attaya', desc: 'Thé à la menthe en 3 services', price: 500, badge: 'Teranga', img: 'images/Ataya.jpg' },
    { id: 24, category: 'thes', name: 'Thé Kinkeliba', desc: 'Infusion traditionnelle', price: 500, badge: null, img: 'images/king.jpg' },
    { id: 25, category: 'thes', name: 'Café Touba', desc: 'Épicé au djar', price: 500, badge: null, img: 'images/caf.jpg' }
  ];

  /* ── Render Menu Cards ────────────────────────────────── */
  const menuContainer = document.getElementById('menu-container');
  if (!menuContainer) return;

  function formatPrice(price) {
    return price.toLocaleString('fr-FR') + ' FCFA';
  }

  function createMenuCard(item) {
    return `
      <div class="menu-card reveal" data-category="${item.category}" data-id="${item.id}">
        <div class="menu-card-img">
          <img src="${item.img}" alt="${item.name}" loading="lazy" style="object-fit: cover;">
          ${item.badge ? `<span class="menu-card-badge">${item.badge}</span>` : ''}
        </div>
        <div class="menu-card-body">
          <p style="font-size: 0.8rem; text-transform: uppercase; color: var(--gold); letter-spacing: 1px; font-weight: 700; margin-bottom: 0.5rem;">Cuisine sénégalaise</p>
          <h3>${item.name}</h3>
          <p>${item.desc}</p>
          <div class="menu-card-footer">
            <span class="price">${formatPrice(item.price)}</span>
            <button class="btn btn-sm btn-primary order-btn" data-id="${item.id}">
              Commander
            </button>
          </div>
        </div>
      </div>`;
  }

  function renderMenu(category = 'all') {
    const filtered = category === 'all'
      ? menuData
      : menuData.filter(item => item.category === category);

    if (category === 'all') {
      const categories = [
        { key: 'plats',    label: 'Plats Sénégalais', icon: '🍲' },
        { key: 'entrees',  label: 'Entrées',          icon: '🥟' },
        { key: 'jus',      label: 'Jus Naturels',     icon: '🥤' },
        { key: 'desserts', label: 'Desserts',         icon: '🍮' },
        { key: 'thes',     label: 'Boissons Chaudes', icon: '☕' }
      ];

      let html = '';
      categories.forEach(cat => {
        const items = menuData.filter(i => i.category === cat.key);
        if (items.length > 0) {
          html += `
            <div class="menu-section" data-cat="${cat.key}">
              <h2 class="menu-category-title">${cat.icon} ${cat.label}</h2>
              <div class="menu-grid">
                ${items.map(createMenuCard).join('')}
              </div>
            </div>`;
        }
      });
      menuContainer.innerHTML = html;
    } else {
      menuContainer.innerHTML = `<div class="menu-grid">${filtered.map(createMenuCard).join('')}</div>`;
    }

    menuContainer.querySelectorAll('.reveal').forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), i * 60);
    });

    bindOrderButtons();
  }

  /* ── Filter Buttons ───────────────────────────────────── */
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.filter;
      renderMenu(cat);
    });
  });

  /* ── Order Button Action ──────────────────────────────── */
  function bindOrderButtons() {
    document.querySelectorAll('.order-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        // Ne plus ouvrir WhatsApp, rediriger vers la page de réservation.
        window.location.href = 'reservation.html';
      });
    });
  }

  /* ── Initial Render ───────────────────────────────────── */
  renderMenu('all');
});
