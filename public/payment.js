const itemname = document.querySelector(".itemname");
const amount = document.querySelector(".amount")
const paynow=document.querySelector(".paynow")
let finaltotal=0
async function loadUSer() {
    const res = await fetch("/login", { credentials: "include" });
    const data = await res.json();
    const username = document.querySelector(".user");

    if (!data || !data.name) {
        username.textContent = "Guest";
        return;
    }
    username.textContent = data.name;
}
loadUSer();

async function loadCart() {
    const res1 = await fetch("/buy-now", { credentials: "include" });
    const data1 = await res1.json();
    console.log(data1)
    const container = document.querySelector(".cart-items");
    async function loadCart() {
        const res = await fetch("/buy-now", { credentials: "include" });
        const items = await res.json();
        let subtotal = 0;
        container.innerHTML = "";
        items.forEach(item => {
            const price = Number(String(item.rupees).replace(/[^0-9.]/g, "")) || 0;
            subtotal += price;
            const row = document.createElement("div");
            row.classList.add("cart-row");
            row.innerHTML = `
            <img src="${item.img}" alt="">
            <div class="cart-info">
                <p>${item.dec}</p>
                <span>1x</span>
                <div class="amount">₹${item.rupees}</div>
            </div>
        `;
            container.appendChild(row);
        });
        const shipping = items.length > 0 ? 250 : 0;
        const total = subtotal + shipping;
        finaltotal=total
        document.querySelector(".summary").innerHTML = `
        <p><span>Subtotal</span><span>₹${subtotal}</span></p>
        <p><span>Shipping</span><span>₹${shipping}</span></p>
        <hr>
        <p class="total"><span>Total</span><span>₹${total}</span></p>
    `;
    }
    loadCart();
}
loadCart();
paynow.addEventListener("click",async()=>{
   await fetch("/total-add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({total:finaltotal}),
  });
  })
