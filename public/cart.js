var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
  function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
    function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
    function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
function loadCart() {
  return __awaiter(this, void 0, void 0, function* () {
    const res = yield fetch("/cart", { credentials: "include" });
    const data = yield res.json();
    const cartContainer = document.querySelector(".maincontent");
    if (!cartContainer) {
      console.error("Cart container not found in DOM");
      return;
    }
    cartContainer.innerHTML = "";
    if (!Array.isArray(data) || data.length === 0) {
      cartContainer.innerHTML = "<p>Your cart is empty 🛒</p>";
      return;
    }
    data.forEach((item) => {
      const name = item.dec;
      const price = item.rupees;
      const img = item.img;
      const cartHTML = `
      <div class="cart-item">
        <div class="flex">
          <div class="img">
            <img src="${img}" alt="" width="100px">
          </div>

          <div class="flexcol">
            <div class="imgdescryption">${name}</div>
            <div class="instock">In stock</div>
            <div class="free">Eligible for FREE Shipping</div>
            <div class="free">Size: Free Size</div>
            <div class="free">Colour: Black</div>
          </div>

          <div class="flexxcol">
            <div class="ruppes">₹${price}</div>

            <!-- Quantity Box -->
            <div class="quantity-box">
              <button class="qty-minus">-</button>
              <span class="qty-value">1</span>
              <button class="qty-plus">+</button>
            </div>

            <button class="buy-now-btn"
                data-item='${JSON.stringify(item)}'>
                Buy Now
            </button>

            <button class="delete-btn" data-id="${item.id}">🗑️</button>
          </div>
        </div>
      </div>
`;
      cartContainer.insertAdjacentHTML("beforeend", cartHTML);
    });
  });
}
loadCart();
document.addEventListener("click", (e) => __awaiter(void 0, void 0, void 0, function* () {
  const target = e.target;
  if (!target)
    return;
  const btn = target.closest(".buy-now-btn");
  if (!btn)
    return;
  const itemString = btn.getAttribute("data-item");
  if (!itemString)
    return;
  const itemData = JSON.parse(itemString);
  const qtyValue = btn.parentElement.querySelector(".qty-value");
  const quantity = Number(qtyValue.textContent);
  for (let i = 0; i < quantity; i++) {
  yield fetch("/buy-now/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(itemData),
  });
}
  console.log("Item added to Buy Now:", itemData);
  window.location.href = "userlogin.html";
}));

document.addEventListener("click", async (e) => {
  const delBtn = e.target.closest(".delete-btn");
  if (!delBtn) return;
  const itemId = delBtn.getAttribute("data-id");
  const res = await fetch("/cart/delete", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ id: itemId })
  });
  if (res.ok) {
    delBtn.closest(".cart").remove();
    console.log("Deleted item:", itemId);
  }
});
document.addEventListener("click", (e) => {
    const plusBtn = e.target.closest(".qty-plus");
    const minusBtn = e.target.closest(".qty-minus");
    if (plusBtn) {
        const qtyValue = plusBtn.parentElement.querySelector(".qty-value");
        qtyValue.textContent = Number(qtyValue.textContent) + 1;
    }
    if (minusBtn) {
        const qtyValue = minusBtn.parentElement.querySelector(".qty-value");
        const current = Number(qtyValue.textContent);
        if (current > 1) {
            qtyValue.textContent = current - 1;
        }
    }
});