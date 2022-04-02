export function getInitialValues() {
  if (typeof window !== "undefined") {
    const cartFromStorage = localStorage.getItem("cart");
    return cartFromStorage ? JSON.parse(cartFromStorage) : [];
  }
}