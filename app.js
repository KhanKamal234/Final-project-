const products = [
  { id: 1, name: 'Chakki Atta (5kg)', category: 'Ration', price: 550, image: 'images/images.jfif' },
  { id: 2, name: 'Milan Basmati Rice (1kg)', category: 'Ration', price: 400, image: 'images/Rice.jfif' },
  { id: 3, name: 'Sufi Canola Cooking Oil (1L)', category: 'Oil & Ghee', price: 550, image: 'images/Cooking oil.jfif' },
  { id: 4, name: "Olper's Milk (1L)", category: 'Dairy & Eggs', price: 300, image: 'images/milk.jpg' },
  { id: 5, name: 'Tapal Danedar Tea (900g)', category: 'Beverages', price: 700, image: 'images/Tapal pic.jpg' },
  { id: 6, name: 'Surf Excel Powder (1kg)', category: 'Cleaning', price: 600, image: 'images/surf.jfif' }
];

const offers = {
  bogo: { id: 101, name: 'Tapal Danedar Tea - Buy 1 Get 1 Free', category: 'Special Offer', price: 700, image: 'images/Tapal pic.jpg', offer: 'Includes 2 packs' },
  bundle: { id: 102, name: 'Monthly Rashan Bundle', category: 'Bundle Deal', price: 1899, image: 'images/images.jfif', offer: 'Atta + Rice + Oil + Tea' }
};
const cartKey = 'finalMartCart';
const getCart = () => JSON.parse(localStorage.getItem(cartKey) || '[]');
const saveCart = cart => localStorage.setItem(cartKey, JSON.stringify(cart));
function updateCartCount() { document.querySelectorAll('#cart-count').forEach(element => element.textContent = getCart().reduce((sum, item) => sum + item.quantity, 0)); }
function addItem(item) { const cart = getCart(); const existing = cart.find(entry => entry.id === item.id); if (existing) existing.quantity += 1; else cart.push({ ...item, quantity: 1 }); saveCart(cart); updateCartCount(); }
function normalize(value) { return value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim(); }
function render(list = products) {
  const grid = document.getElementById('product-grid');
  if (!grid) return;
  grid.innerHTML = list.length ? list.map(product => `<article class="product-card"><img src="${product.image}" alt="${product.name}"><h3>${product.name}</h3><p>${product.category}</p><strong class="product-price">Rs. ${product.price.toLocaleString()}</strong><button class="primary-button" data-product="${product.id}" type="button">Add to cart</button></article>`).join('') : '<p class="muted">No products found.</p>';
  document.querySelectorAll('[data-product]').forEach(button => button.addEventListener('click', () => addItem(products.find(product => product.id === Number(button.dataset.product)))));
  const label = document.getElementById('result-label'); if (label) label.textContent = `${list.length} product${list.length === 1 ? '' : 's'}`;
}
function showDrawer() { const drawer = document.getElementById('profile-drawer'); drawer.classList.add('open'); document.getElementById('overlay').classList.add('visible'); drawer.setAttribute('aria-hidden', 'false'); }
function closeDrawer() { const drawer = document.getElementById('profile-drawer'); drawer.classList.remove('open'); document.getElementById('overlay').classList.remove('visible'); drawer.setAttribute('aria-hidden', 'true'); }
document.addEventListener('DOMContentLoaded', () => {
  render(); updateCartCount();
  const account = JSON.parse(localStorage.getItem('karachiMartAccount') || 'null'); const profileButton = document.getElementById('profile-button');
  const loggedIn = localStorage.getItem('karachiMartLoggedIn') === 'true';
  if (account && loggedIn) { profileButton.textContent = `Hi, ${account.name.split(' ')[0]}`; document.getElementById('drawer-name').textContent = account.name; document.getElementById('drawer-email').textContent = account.email; }
  profileButton.addEventListener('click', () => account && loggedIn ? showDrawer() : (window.location.href = 'login.html'));
  document.getElementById('close-drawer').addEventListener('click', closeDrawer); document.getElementById('overlay').addEventListener('click', closeDrawer);
  document.getElementById('logout').addEventListener('click', () => { localStorage.removeItem('karachiMartLoggedIn'); localStorage.removeItem('karachiMartUser'); localStorage.removeItem('karachiMartEmail'); window.location.href = 'index.html'; });
  const searchForm = document.getElementById('search-form'); const search = document.getElementById('search');
  searchForm.addEventListener('submit', event => { event.preventDefault(); const query = normalize(search.value); render(products.filter(product => normalize(`${product.name} ${product.category}`).includes(query))); document.getElementById('products').scrollIntoView({ behavior: 'smooth' }); });
  document.querySelectorAll('.category').forEach(button => button.addEventListener('click', () => { const category = button.dataset.category; search.value = category; render(products.filter(product => product.category === category)); document.getElementById('products').scrollIntoView({ behavior: 'smooth' }); }));
  document.getElementById('shop-now').addEventListener('click', () => document.getElementById('products').scrollIntoView({ behavior: 'smooth' }));
  document.querySelectorAll('[data-offer]').forEach(button => button.addEventListener('click', () => { addItem(offers[button.dataset.offer]); button.textContent = 'Added to cart'; }));
});
