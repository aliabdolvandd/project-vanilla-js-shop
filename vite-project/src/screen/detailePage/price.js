const pricePerUnit = product.price;

const quantityElementId = "quantity";
const totalPrice = "total-price";

export const updateTotalPrice = (pricePerUnit, quantityElement, totalPrice) => {
  const qty = parseInt(quantityElement.textContent, 10);
  const totalPrice = pricePerUnit * qty;
  totalPrice.textContent = `${totalPrice.toFixed(2)}`;
};
