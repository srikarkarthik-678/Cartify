// Utility function to safely get an element by ID with proper HTML typing
function getEl<T extends HTMLElement>(id: string): T {
    const el = document.getElementById(id) as T | null;
    if (!el) throw new Error(`Element with ID "${id}" not found`);
    return el;
}
const loginBtn = getEl<HTMLButtonElement>("loginBtn1");
const signupBtn = getEl<HTMLButtonElement>("signupBtn1");
const formCaption = getEl<HTMLHeadingElement>("formCaption");
const nameField = getEl<HTMLInputElement>("nameField");
const usernameField = getEl<HTMLInputElement>("usernameField");
const imp1 = getEl<HTMLDivElement>("imp1");
const imp2 = getEl<HTMLDivElement>("imp2");
const submitBtn = getEl<HTMLButtonElement>("submitBtn2");
const EmailField = getEl<HTMLInputElement>("emailField");
const passwordField = getEl<HTMLInputElement>("passwordField");
const loginBtn2 = getEl<HTMLButtonElement>("loginBtn2");
const msg = getEl<HTMLParagraphElement>("message");
const payment = getEl<HTMLParagraphElement>("payment");
document.addEventListener("DOMContentLoaded", () => {
    signupBtn.addEventListener("click", () => {
        nameField.classList.remove("hidden");
        usernameField.classList.remove("hidden");
        imp1.classList.remove("hidden");
        imp2.classList.remove("hidden");
        formCaption.textContent = "Sign up to discover amazing deals";
        submitBtn.textContent = "Sign Up";
        loginBtn2.classList.add("hidden");
        submitBtn.classList.remove("hidden");
        msg.classList.add("hidden");
    });

    loginBtn.addEventListener("click", () => {
        nameField.classList.add("hidden");
        usernameField.classList.add("hidden");
        formCaption.textContent = "Log in to your account";
        submitBtn.classList.add("hidden");
        loginBtn2.classList.remove("hidden");
    });

});
submitBtn.addEventListener("click", async () => {
    const inputfield = EmailField.value;
    const pass = passwordField.value;
    const name = nameField.value;
    const username = usernameField.value;
    const packageData = { inputfield, pass, name, username };
    const res = await fetch("/push/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(packageData),
        credentials: "include"
    });

    const data = await res.json();
    console.log("Added to database:", data);
});
loginBtn2.addEventListener("click", async () => {
    const inputfield = EmailField.value;
    const pass = passwordField.value;
    const loginpackage = { inputfield, pass };
    const res1 = await fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginpackage),
        credentials: "include"
    });

    const data1 = await res1.json();
    console.log("Log in Completed", data1);
    if (data1.success) {
        msg.textContent = "Login Successful!";
    } else {
        msg.textContent = data1.message || "Login failed!";
        if(msg.textContent!="User")
        {
            payment.textContent="Click to go to payment page"
        }
    }
    EmailField.value = "";
    passwordField.value = "";
    nameField.value = "";
    usernameField.value = "";
    nameField.classList.add("hidden");
    usernameField.classList.add("hidden");
});
