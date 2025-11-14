// src/utils/cartStore.js
const subscribers = new Set();

let cartItems = [];

export const getCart = () => cartItems;

export const addToCart = (book) => {
  if (!cartItems.some((b) => b.id === book.id)) {
    cartItems = [...cartItems, book];
    notify();
  }
};

export const removeFromCart = (id) => {
  cartItems = cartItems.filter((b) => b.id !== id);
  notify();
};

export const clearCart = () => {
  cartItems = [];
  notify();
};

// 🔄 subscription model for syncing components
export const subscribe = (callback) => {
  subscribers.add(callback);
  return () => subscribers.delete(callback);
};

function notify() {
  for (const fn of subscribers) fn(cartItems);
}
