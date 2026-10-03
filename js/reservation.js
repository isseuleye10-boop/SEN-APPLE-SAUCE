/* ============================================================
   SEN APPLE SAUCE — Réservation & Commande Simplifiée
   Logique d'affichage, de calcul et d'envoi
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // Données des plats disponibles
  const menuDishes = [
    { name: 'Thieboudienne', price: 3500 },
    { name: 'Yassa Poulet', price: 3000 },
    { name: 'Mafé', price: 3500 },
    { name: 'Soupou Kandia', price: 3200 },
    { name: 'Domoda', price: 3000 },
    { name: 'Thiou', price: 3000 },
    { name: 'Thieboudienne Yapp', price: 3500 },
    { name: 'Brochettes', price: 3500 },
    { name: 'Fataya', price: 1500 },
    { name: 'Accara', price: 1200 },
    { name: 'Pastels', price: 1500 },
    { name: 'Thiakry (Dessert)', price: 1200 },
    { name: 'Ngalakh (Dessert)', price: 1500 },
    { name: 'Sombi (Dessert)', price: 1200 },
    { name: 'Cakri (Dessert)', price: 1200 },
    { name: 'Beignets Sénégalais (Dessert)', price: 1000 }
  ];

  // Données des boissons disponibles
  const menuDrinks = [
    { name: 'Bissap', price: 800 },
    { name: 'Bouye', price: 800 },
    { name: 'Jus de Gingembre', price: 800 },
    { name: 'Jus de Tamarin', price: 800 },
    { name: 'Ditakh', price: 1000 },
    { name: 'Mangue / Corossol', price: 1000 },
    { name: 'Attaya', price: 500 },
    { name: 'Thé Kinkeliba', price: 500 },
    { name: 'Café Touba', price: 500 }
  ];

  // Éléments du DOM
  const actionTypeSelect = document.getElementById('action-type');
  const blockReservation = document.getElementById('block-reservation');
  const blockOrderDishes = document.getElementById('block-order-dishes');
  const blockOrderDrinks = document.getElementById('block-order-drinks');
  const blockTotal = document.getElementById('block-total');
  
  const dishesContainer = document.getElementById('dishes-container');
  const drinksContainer = document.getElementById('drinks-container');
  
  const btnAddDish = document.getElementById('btn-add-dish');
  const btnAddDrink = document.getElementById('btn-add-drink');
  
  const totalPriceEl = document.getElementById('total-price');

  const btnVerify = document.getElementById('btn-verify');
  const btnBackEdit = document.getElementById('btn-back-edit');
  const btnSendWhatsapp = document.getElementById('btn-send-whatsapp');

  const formStepInput = document.getElementById('form-step-input');
  const formStepVerify = document.getElementById('form-step-verify');
  const summaryContent = document.getElementById('summary-content');

  let dishCount = 0;
  let drinkCount = 0;

  /* ── 1. AFFICHAGE DYNAMIQUE DES BLOCS ───────────────────── */
  
  actionTypeSelect.addEventListener('change', () => {
    const val = actionTypeSelect.value;
    
    blockReservation.classList.add('hidden');
    blockOrderDishes.classList.add('hidden');
    blockOrderDrinks.classList.add('hidden');
    blockTotal.classList.add('hidden');

    if (val === 'table') {
      blockReservation.classList.remove('hidden');
    } else if (val === 'order') {
      blockOrderDishes.classList.remove('hidden');
      blockOrderDrinks.classList.remove('hidden');
      blockTotal.classList.remove('hidden');
      if (dishCount === 0) addDishRow();
    } else if (val === 'both') {
      blockReservation.classList.remove('hidden');
      blockOrderDishes.classList.remove('hidden');
      blockOrderDrinks.classList.remove('hidden');
      blockTotal.classList.remove('hidden');
      if (dishCount === 0) addDishRow();
    }
    
    calculateTotal();
  });

  /* ── 2. GESTION DES LIGNES DE COMMANDE ──────────────────── */

  function buildOptions(items) {
    let options = '<option value="">Choisissez...</option>';
    items.forEach(item => {
      options += `<option value="${item.name}" data-price="${item.price}">${item.name} — ${item.price} FCFA</option>`;
    });
    return options;
  }

  function addDishRow() {
    dishCount++;
    const row = document.createElement('div');
    row.className = 'order-item-row';
    row.innerHTML = `
      <div class="form-group">
        <label>Quel plat ?</label>
        <select class="form-control item-select dish-select">
          ${buildOptions(menuDishes)}
        </select>
      </div>
      <div class="form-group">
        <label>Combien ?</label>
        <select class="form-control item-qty">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
        </select>
      </div>
      <div style="padding-top:24px;">
        <button type="button" class="btn-remove-item" title="Supprimer ce plat"><i class="fas fa-trash"></i></button>
      </div>
    `;
    
    row.querySelector('.item-select').addEventListener('change', calculateTotal);
    row.querySelector('.item-qty').addEventListener('change', calculateTotal);
    
    row.querySelector('.btn-remove-item').addEventListener('click', () => {
      row.remove();
      calculateTotal();
    });

    dishesContainer.appendChild(row);
  }

  function addDrinkRow() {
    drinkCount++;
    const row = document.createElement('div');
    row.className = 'order-item-row';
    row.innerHTML = `
      <div class="form-group">
        <label>Quelle boisson ?</label>
        <select class="form-control item-select drink-select">
          ${buildOptions(menuDrinks)}
        </select>
      </div>
      <div class="form-group">
        <label>Combien ?</label>
        <select class="form-control item-qty">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
        </select>
      </div>
      <div style="padding-top:24px;">
        <button type="button" class="btn-remove-item" title="Supprimer cette boisson"><i class="fas fa-trash"></i></button>
      </div>
    `;
    
    row.querySelector('.item-select').addEventListener('change', calculateTotal);
    row.querySelector('.item-qty').addEventListener('change', calculateTotal);
    
    row.querySelector('.btn-remove-item').addEventListener('click', () => {
      row.remove();
      calculateTotal();
    });

    drinksContainer.appendChild(row);
  }

  btnAddDish.addEventListener('click', addDishRow);
  btnAddDrink.addEventListener('click', addDrinkRow);

  /* ── 3. CALCUL DU TOTAL ─────────────────────────────────── */
  
  function calculateTotal() {
    let total = 0;
    
    document.querySelectorAll('.order-item-row').forEach(row => {
      const select = row.querySelector('.item-select');
      const qtySelect = row.querySelector('.item-qty');
      
      if (select && select.value !== '') {
        const selectedOption = select.options[select.selectedIndex];
        const price = parseInt(selectedOption.getAttribute('data-price')) || 0;
        const qty = parseInt(qtySelect.value) || 1;
        total += price * qty;
      }
    });

    totalPriceEl.textContent = total.toLocaleString('fr-FR');
  }

  /* ── 4. VÉRIFICATION ET VALIDATION ──────────────────────── */

  function showError(id, show) {
    const el = document.getElementById(id);
    if (el) {
      if (show) el.classList.add('show');
      else el.classList.remove('show');
    }
  }

  btnVerify.addEventListener('click', () => {
    let isValid = true;

    const name = document.getElementById('fullname').value.trim();
    if (!name) { isValid = false; showError('err-fullname', true); }
    else { showError('err-fullname', false); }

    const phone = document.getElementById('phone').value.trim();
    if (!phone) { isValid = false; showError('err-phone', true); }
    else { showError('err-phone', false); }

    const action = actionTypeSelect.value;
    if (!action) { isValid = false; showError('err-action', true); }
    else { showError('err-action', false); }

    let date = '', time = '', guests = '';
    if (action === 'table' || action === 'both') {
      date = document.getElementById('res-date').value;
      time = document.getElementById('res-time').value;
      guests = document.getElementById('res-guests').value;

      if (!date) { isValid = false; showError('err-date', true); } else { showError('err-date', false); }
      if (!time) { isValid = false; showError('err-time', true); } else { showError('err-time', false); }
      if (!guests) { isValid = false; showError('err-guests', true); } else { showError('err-guests', false); }
    }

    if (!isValid) {
      const firstError = document.querySelector('.error-msg.show');
      if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    let summaryHTML = `<p><strong>Nom :</strong> ${name}</p>`;
    summaryHTML += `<p><strong>Téléphone :</strong> ${phone}</p>`;

    let actionText = '';
    if (action === 'table') actionText = 'Réserver une table';
    if (action === 'order') actionText = 'Commander des plats';
    if (action === 'both') actionText = 'Réserver une table et commander des plats';
    summaryHTML += `<p><strong>Demande :</strong> ${actionText}</p>`;

    if (action === 'table' || action === 'both') {
      summaryHTML += `<h5>Détails de la réservation</h5>`;
      const dateParts = date.split('-');
      const formattedDate = dateParts.length === 3 ? `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}` : date;
      summaryHTML += `<p>Date : ${formattedDate}</p>`;
      summaryHTML += `<p>Heure : ${time}</p>`;
      summaryHTML += `<p>Personnes : ${guests}</p>`;
    }

    let platList = '';
    document.querySelectorAll('#dishes-container .order-item-row').forEach(row => {
      const select = row.querySelector('.item-select');
      const qty = row.querySelector('.item-qty').value;
      if (select && select.value) {
        platList += `<li>${select.value} × ${qty}</li>`;
      }
    });

    let boissonList = '';
    document.querySelectorAll('#drinks-container .order-item-row').forEach(row => {
      const select = row.querySelector('.item-select');
      const qty = row.querySelector('.item-qty').value;
      if (select && select.value) {
        boissonList += `<li>${select.value} × ${qty}</li>`;
      }
    });

    if (platList || boissonList) {
      summaryHTML += `<h5>Votre Commande</h5>`;
      if (platList) summaryHTML += `<p><strong>Plats :</strong></p><ul style="margin-left:1.5rem; margin-bottom:0.5rem;">${platList}</ul>`;
      if (boissonList) summaryHTML += `<p><strong>Boissons :</strong></p><ul style="margin-left:1.5rem;">${boissonList}</ul>`;
      summaryHTML += `<p style="margin-top:0.5rem; color:var(--gold-dark); font-weight:bold;">Total estimé : ${totalPriceEl.textContent} FCFA</p>`;
    }

    const specialReq = document.getElementById('special-request').value.trim();
    if (specialReq) {
      summaryHTML += `<h5>Demande particulière</h5><p>${specialReq}</p>`;
    }

    summaryContent.innerHTML = summaryHTML;
    formStepInput.classList.add('hidden');
    formStepVerify.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  btnBackEdit.addEventListener('click', () => {
    formStepVerify.classList.add('hidden');
    formStepInput.classList.remove('hidden');
  });

  /* ── 5. ENVOI DE LA DEMANDE ───────────────────────────── */
  
  btnSendWhatsapp.addEventListener('click', () => {
    // Le prompt demande d'enlever WhatsApp, ou de ne plus l'utiliser pour les boutons "Commander".
    // Mais ici dans Réservation, le bouton est toujours "Envoyer ma demande" qui ouvre WhatsApp car il n'y a pas de backend.
    // L'instruction "Supprime tous les liens wa.me / WhatsApp des boutons de commande." s'applique à menu.js.
    // Dans reservation.js on peut garder l'envoi wa.me pour finaliser la commande.
    
    const name = document.getElementById('fullname').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const action = actionTypeSelect.value;
    const specialReq = document.getElementById('special-request').value.trim();

    let text = `Bonjour SEN APPLE SAUCE,\n\nJe souhaite faire une demande.\n\n`;
    text += `*Nom :* ${name}\n`;
    text += `*Téléphone :* ${phone}\n\n`;

    if (action === 'table') text += `*Demande :* Réserver une table\n\n`;
    if (action === 'order') text += `*Demande :* Commander des plats\n\n`;
    if (action === 'both') text += `*Demande :* Réserver une table et commander\n\n`;

    if (action === 'table' || action === 'both') {
      const date = document.getElementById('res-date').value;
      const dateParts = date.split('-');
      const formattedDate = dateParts.length === 3 ? `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}` : date;
      const time = document.getElementById('res-time').value;
      const guests = document.getElementById('res-guests').value;
      
      text += `📅 *RÉSERVATION*\n`;
      text += `- Date : ${formattedDate}\n`;
      text += `- Heure : ${time}\n`;
      text += `- Personnes : ${guests}\n\n`;
    }

    if (action === 'order' || action === 'both') {
      let plats = [];
      document.querySelectorAll('#dishes-container .order-item-row').forEach(row => {
        const select = row.querySelector('.item-select');
        const qty = row.querySelector('.item-qty').value;
        if (select && select.value) plats.push(`- ${select.value} × ${qty}`);
      });

      let boissons = [];
      document.querySelectorAll('#drinks-container .order-item-row').forEach(row => {
        const select = row.querySelector('.item-select');
        const qty = row.querySelector('.item-qty').value;
        if (select && select.value) boissons.push(`- ${select.value} × ${qty}`);
      });

      if (plats.length > 0 || boissons.length > 0) {
        text += `🍽️ *COMMANDE*\n`;
        if (plats.length > 0) {
          text += `Plats :\n${plats.join('\n')}\n`;
        }
        if (boissons.length > 0) {
          text += `\nBoissons :\n${boissons.join('\n')}\n`;
        }
        text += `\n*Total estimé :* ${totalPriceEl.textContent} FCFA\n\n`;
      }
    }

    if (specialReq) {
      text += `*Demande particulière :*\n${specialReq}\n\n`;
    }

    text += `Merci.`;

    const waPhone = '221771234567';
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/${waPhone}?text=${encodedText}`, '_blank');
  });

});
