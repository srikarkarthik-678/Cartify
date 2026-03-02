const productsContainer = document.querySelector(".myproducts");
const itemprice = document.querySelector(".itemprice")
function updateOrderSummary(cartItems) {
    if (!Array.isArray(cartItems)) return;
    console.log(cartItems)
    let cost = cartItems.reduce((sum, item) => {
        const price = parseInt(item.rupees.toString().replace(/[^0-9]/g, ""));
        return sum + price;
    }, 0);
    const delivery = 0;
    const tax = Math.floor(cost * 0.02);
    const total = cost + delivery + tax;
    document.getElementById("cost").innerText = cost.toLocaleString();
    document.getElementById("delivery").innerText = delivery.toLocaleString();
    document.getElementById("tax").innerText = tax.toLocaleString();
    document.getElementById("total").innerText = total.toLocaleString();
}

async function LoadCart() {
    const res = await fetch("/buy-now", { credentials: "include" });
    const data = await res.json();
    console.log("Cart:", data);
    productsContainer.innerHTML = "";

    if (!data || data.length === 0) {
        productsContainer.innerHTML = `<p>No items in your order</p>`;
        return;
    }
    data.forEach(item => {
        const row = document.createElement("div");
        row.classList.add("productrow");
        row.innerHTML = `
            <div class="productinfo">
                <img src="${item.img}" alt="product">
                <div>
                    <p class="productname">${item.dec}</p>
                </div>
            </div>
            <p class="productqty1">1</p>
            <p class="producttotal">${item.rupees}</p>
        `;
        productsContainer.appendChild(row);
    });
    updateOrderSummary(data);
}
LoadCart();

