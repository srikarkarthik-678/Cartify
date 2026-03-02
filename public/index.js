var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
(() => {
    const btns = document.querySelectorAll(".btns");
    const no = document.querySelector(".number");
    const user = document.querySelector(".User")
    btns.forEach((button) => {
        button.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
            const card = button.closest(".card");
            const name = card.querySelector("h3").innerText;
            const price = card.querySelector("p").innerText.replace("Starting From ₹", "").trim();
            const img = card.querySelector("img").src;
            const product = { name, price, img };
            const res = yield fetch("/cart/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(product),
                credentials: "include"
            });
            const data = yield res.json();
            alert(`${name} added to cart!`);
            console.log("Added:", data);
            no.innerHTML = (parseInt(no.innerHTML) + 1).toString();
        }));
    });
    async function LoadUser() {
        const res1 = await fetch("/login", { credentials: "include" });
        const data = await res1.json();
        user.textContent = data.name
    }
    LoadUser()
})();
