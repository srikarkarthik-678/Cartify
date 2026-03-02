async function loadCart(): Promise<void> {
  const res = await fetch("/cart", { credentials: "include" });
  const data: any[] = await res.json();
  const cartContainer = document.querySelector<HTMLDivElement>(".maincontent");
  if (!cartContainer) {
    console.log("Cart container not found in DOM");
    return;
  }
  cartContainer.innerHTML = "";
  if ( data.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty 🛒</p>";
    return;
  }
  data.forEach((item: any) => {
    const name = item.dec;
    const price = item.price;
    const img = item.img;

    const cartHTML = `
      <div class="cart">
        <div class="cartdetails">
          <div class="carddetails">
            <div class="mainflex">
              <div class="shoppingcart"></div>
              <div class="maincontent">
                <div class="flex">
                  <div class="img">
                    <img src="${img}" alt="">
                  </div>
                  <div class="flexcol">
                    <div class="imgdescryption">${name}</div>
                    <div class="instock">In stock</div>
                    <div class="free">Eligible for FREE Shipping</div>
                    <div class="free">Size: Free Size</div>
                    <div class="free">Colour: Black</div>
                  </div>
                  <div class="flexxcol">
                    <div class="ruppes">₹3000</div>

                    <button class="buy-now-btn"
                      data-item='${JSON.stringify(item)}'>
                      Buy Now
                    </button>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    cartContainer.insertAdjacentHTML("beforeend", cartHTML);
  });
}

loadCart();
document.addEventListener("click", async (e: Event) => {
  const target = e.target as HTMLElement | null;
  if (!target) return;
  const btn = target.closest(".buy-now-btn") as HTMLElement | null;
  if (!btn) return;
  const itemString = btn.getAttribute("data-item");
  if (!itemString) return;
  const itemData = JSON.parse(itemString);
  await fetch("/buy-now/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(itemData),
  });
  console.log("Item added to Buy Now:", itemData);
  window.location.href = "userlogin.html";
});
