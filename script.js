document.addEventListener("DOMContentLoaded", () => {
    const cartItems = [
      { id: 1, name: "SACCOCHE", price: 10.0, quantity: 1 },
      { id: 2, name: "TALON", price: 20.0, quantity: 2 },
    ];
  
    function updateCart() {
      const cartList = document.getElementById("cart-items");
      cartList.innerHTML = "";
  
      cartItems.forEach((item) => {
        const li = document.createElement("li");
        li.innerHTML = `
                  <img src="https://via.placeholder.com/100" alt="${item.name}">
                  <div class="item-details">
                      <div class="name">${item.name}</div>
                      <div class="price">${item.price.toFixed(2)} €</div>
                  </div>
                  <div class="item-actions">
                      <button class="decrease" data-id="${item.id}">-</button>
                      <span>${item.quantity}</span>
                      <button class="increase" data-id="${item.id}">+</button>
                      <button class="remove" data-id="${
                        item.id
                      }">Supprimer</button>
                      <span class="heart" data-id="${item.id}">&#9825;</span>
                  </div>
              `;
        cartList.appendChild(li);
      });
  
      updateTotalPrice();
    }
  
    function updateTotalPrice() {
      const totalPrice = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      document.getElementById("total-price").textContent =
        totalPrice.toFixed(2) + " €";
    }
  
    document.getElementById("cart-items").addEventListener("click", (event) => {
      if (event.target.classList.contains("increase")) {
        const id = parseInt(event.target.dataset.id);
        const item = cartItems.find((item) => item.id === id);
        item.quantity += 1;
        updateCart();
      } else if (event.target.classList.contains("decrease")) {
        const id = parseInt(event.target.dataset.id);
        const item = cartItems.find((item) => item.id === id);
        if (item.quantity > 1) {
          item.quantity -= 1;
          updateCart();
        }
      } else if (event.target.classList.contains("remove")) {
        const id = parseInt(event.target.dataset.id);
        const index = cartItems.findIndex((item) => item.id === id);
        cartItems.splice(index, 1);
        updateCart();
      } else if (event.target.classList.contains("heart")) {
        event.target.classList.toggle("liked");
      }
    });
  
    updateCart();
  });
  