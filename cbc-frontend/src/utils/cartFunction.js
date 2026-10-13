export function loadCart() {
  try {
    const cart = localStorage.getItem("cart");
    if (cart != null) {
      const parsed = JSON.parse(cart);
      return Array.isArray(parsed) ? parsed : [];
    }
  } catch (e) {
    console.error("Error reading cart from localStorage:", e);
  }
  return [];
}

export function saveCart(cart) {
  try {
    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cart-updated"));
  } catch (e) {
    console.error("Error saving cart to localStorage:", e);
  }
}

export function addToCart(productId, qty = 1) {
  const cart = loadCart();
  const index = cart.findIndex((item) => item.productId === productId);

  if (index === -1) {
    cart.push({ productId, qty: Math.max(1, qty) });
  } else {
    const newQty = (cart[index].qty || 0) + qty;
    if (newQty <= 0) {
      cart.splice(index, 1);
    } else {
      cart[index].qty = newQty;
    }
  }
  saveCart(cart);
}

export function updateItemQty(productId, qty) {
  const cart = loadCart();
  const index = cart.findIndex((item) => item.productId === productId);
  if (index !== -1) {
    if (qty <= 0) {
      cart.splice(index, 1);
    } else {
      cart[index].qty = qty;
    }
    saveCart(cart);
  }
}

export function deleteItem(productId) {
  const cart = loadCart();
  const index = cart.findIndex((item) => item.productId === productId);
  if (index !== -1) {
    cart.splice(index, 1);
    saveCart(cart);
  }
}

export function clearCart() {
  localStorage.removeItem("cart");
  window.dispatchEvent(new Event("cart-updated"));
}

export function getCartCount() {
  const cart = loadCart();
  return cart.reduce((total, item) => total + (Number(item.qty) || 0), 0);
}