// --- CATEGORY FILTERING ---
const filterBtns = document.querySelectorAll('.tab-btn');
const productCards = document.querySelectorAll('.product-card');

if (filterBtns.length > 0) {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      productCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// --- CART STATE WITH LOCAL STORAGE ---
let cart = JSON.parse(localStorage.getItem('Mavi_cart')) || [];

const openCartBtn = document.getElementById('openCart');
const closeCartBtn = document.getElementById('closeCart');
const cartDrawer = document.getElementById('cartDrawer');
const overlay = document.getElementById('overlay');
const cartItemsContainer = document.getElementById('cartItems');
const cartTotalEl = document.getElementById('cartTotal');
const cartCountEl = document.getElementById('cartCount');

function toggleCart() {
  cartDrawer.classList.toggle('open');
  overlay.classList.toggle('active');
}

if (openCartBtn && closeCartBtn && overlay) {
  openCartBtn.addEventListener('click', toggleCart);
  closeCartBtn.addEventListener('click', toggleCart);
  overlay.addEventListener('click', toggleCart);
}

function addToCart(title, price) {
  cart.push({ title, price });
  saveAndRenderCart();
  cartDrawer.classList.add('open');
  overlay.classList.add('active');
}

function saveAndRenderCart() {
  localStorage.setItem('Mavi_cart', JSON.stringify(cart));
  updateCartUI();
}

function updateCartUI() {
  if (!cartCountEl) return;
  
  cartCountEl.textContent = cart.length;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p style="color: var(--text-muted); font-size: 0.9rem;">Your cart is empty.</p>';
    cartTotalEl.textContent = '$0.00';
    return;
  }

  cartItemsContainer.innerHTML = '';
  let total = 0;

  cart.forEach((item) => {
    total += item.price;
    const itemEl = document.createElement('div');
    itemEl.className = 'cart-item';
    itemEl.innerHTML = `
      <span>${item.title}</span>
      <span>$${item.price.toFixed(2)}</span>
    `;
    cartItemsContainer.appendChild(itemEl);
  });

  cartTotalEl.textContent = `$${total.toFixed(2)}`;
}

// Initial UI Render
updateCartUI();