(() => {
  const btns = document.querySelectorAll<HTMLButtonElement>(".btn");
  const no = document.querySelector<HTMLElement>(".number");
  btns.forEach((button) => {
    button.addEventListener("click", async () => {
      const card = button.closest(".card") as HTMLElement;
      const name = (card.querySelector("h3") as HTMLElement).innerText;
      const price = (card.querySelector("p") as HTMLElement).innerText.replace("Starting From ₹", "").trim();
      const img = (card.querySelector("img") as HTMLImageElement).src;
      const product = { name, price, img };
      const res = await fetch("/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
        credentials: "include"
      });
      const data = await res.json();
      alert(`${name} added to cart!`);
      console.log("Added:", data);
      no!.innerHTML = (parseInt(no!.innerHTML) + 1).toString();
    });
  });
})();
