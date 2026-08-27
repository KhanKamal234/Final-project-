document.addEventListener('DOMContentLoaded', () => {
  const items = document.getElementById('cart-items');
  const summary = document.getElementById('cart-summary');
  if (!items) return;
  const render = () => {
    const cart = getCart();
    if (!cart.length) { items.innerHTML = '<div class="empty-state"><h2>Your cart is empty</h2><a class="primary-button" href="index.html">Browse products</a></div>'; summary.innerHTML = ''; return; }
    items.innerHTML = cart.map(item => `<div class="cart-row"><div><strong>${item.name}</strong><small>Rs. ${item.price.toLocaleString()} each</small></div><div class="quantity"><button data-action="minus" data-id="${item.id}" type="button">-</button><b>${item.quantity}</b><button data-action="plus" data-id="${item.id}" type="button">+</button></div><strong>Rs. ${(item.price * item.quantity).toLocaleString()}</strong><button class="delete-button" data-action="delete" data-id="${item.id}" type="button"><i class="fa-solid fa-trash"></i></button></div>`).join('');
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0); const delivery = subtotal >= 2000 ? 0 : 150;
    summary.innerHTML = `<div><span>Subtotal</span><b>Rs. ${subtotal.toLocaleString()}</b></div><div><span>Delivery</span><b>${delivery ? `Rs. ${delivery}` : 'Free'}</b></div><div class="grand-total"><span>Total</span><b>Rs. ${(subtotal + delivery).toLocaleString()}</b></div><a class="primary-button" href="checkout.html">Proceed to billing</a>`;
    items.querySelectorAll('[data-action]').forEach(button => button.addEventListener('click', () => { const updated = getCart(); const id = Number(button.dataset.id); const item = updated.find(entry => entry.id === id); if (button.dataset.action === 'delete') saveCart(updated.filter(entry => entry.id !== id)); else { item.quantity += button.dataset.action === 'plus' ? 1 : -1; saveCart(updated.filter(entry => entry.quantity > 0)); } render(); updateCartCount(); }));
  }; render(); updateCartCount();
});