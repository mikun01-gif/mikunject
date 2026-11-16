const foods = [
  { id: 1, name: "Classic Burger", price: 8.99, emoji: "🍔" },
  { id: 2, name: "Margherita Pizza", price: 12.5, emoji: "🍕" },
  { id: 3, name: "Pasta Alfredo", price: 10.25, emoji: "🍝" },
  { id: 4, name: "Fresh Salad", price: 7.5, emoji: "🥗" }
];

const cart = [];

const menuElement = document.querySelector("#menu");
const cartItemsElement = document.querySelector("#cart-items");
const cartCountElement = document.querySelector("#cart-count");
const cartTotalElement = document.querySelector("#cart-total");
const checkoutButton = document.querySelector("#checkout");

function renderMenu() {
  menuElement.innerHTML = foods
    .map(
      (food) => `
        <article class="food-card">
          <div class="food-emoji">${food.emoji}</div>
          <h3>${food.name}</h3>
          <p>$${food.price.toFixed(2)}</p>
          <button type="button" data-food-id="${food.id}">
            Add to cart
          </button>
        </article>
      `
    )
    .join("");
}

function renderCart() {
  cartItemsElement.innerHTML = cart.length
    ? cart
        .map(
          (item) => `
            <li>
              ${item.name} × ${item.quantity}
              — $${(item.price * item.quantity).toFixed(2)}
              <button type="button" data-remove-id="${item.id}" aria-label="Remove one ${item.name}">
                −
              </button>
            </li>
          `
        )
        .join("")
    : "<li>Your cart is empty.</li>";

  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  cartCountElement.textContent = count;
  cartTotalElement.textContent = `$${total.toFixed(2)}`;
}

menuElement.addEventListener("click", (event) => {
  const button = event.target.closest("[data-food-id]");
  if (!button) return;

  const food = foods.find((item) => item.id === Number(button.dataset.foodId));
  const cartItem = cart.find((item) => item.id === food.id);

  if (cartItem) {
    cartItem.quantity += 1;
  } else {
    cart.push({ ...food, quantity: 1 });
  }

  renderCart();
});

cartItemsElement.addEventListener("click", (event) => {
  const button = event.target.closest("[data-remove-id]");
  if (!button) return;

  const itemIndex = cart.findIndex(
    (item) => item.id === Number(button.dataset.removeId)
  );

  if (itemIndex === -1) return;

  cart[itemIndex].quantity -= 1;
  if (cart[itemIndex].quantity === 0) {
    cart.splice(itemIndex, 1);
  }

  renderCart();
});

checkoutButton.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  alert("Thanks for your order! Connect this button to your checkout system.");
});

renderMenu();
renderCart();