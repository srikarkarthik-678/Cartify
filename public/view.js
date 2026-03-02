const btns = document.querySelectorAll(".button1")
const user=document.querySelector(".User")
const rupees=document.querySelector(".ruppes")
btns.forEach(button => {
    button.addEventListener("click", async () => {
        const flex = button.closest(".flex")
        const img = flex.querySelector("img").src
        const dec = flex.querySelector(".imgdescryption").innerHTML
        const instock = flex.querySelector(".instock").innerHTML
        const Eligible = flex.querySelector("#eligible").innerHTML
        const freesize = flex.querySelector("#freesize").innerHTML
        const color = flex.querySelector("#color").innerHTML
        const rupees=flex.querySelector(".ruppes").innerHTML
        const product = { img, dec, instock, Eligible, freesize, color,rupees};
        console.log(product)
        const res=await fetch("/cart/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(product),
            credentials: "include"
        })
        const data = await res.json();
            alert(`added to cart!`);
            console.log("Added:", data);
    })
});
async function LoadUser()
{
    const res1 = await fetch("/login", { credentials: "include" });
    const data = await res1.json();
    user.textContent=data.name
}
LoadUser()
