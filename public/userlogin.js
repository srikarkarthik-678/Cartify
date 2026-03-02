var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

function getEl(id) {
    const el = document.getElementById(id);
    if (!el)
        throw new Error(`Element with ID "${id}" not found`);
    return el;
}
const loginBtn = getEl("loginBtn1");
const signupBtn = getEl("signupBtn1");
const formCaption = getEl("formCaption");
const nameField = getEl("nameField");
const usernameField = getEl("usernameField");
const imp1 = getEl("imp1");
const imp2 = getEl("imp2");
const submitBtn = getEl("submitBtn2");
const EmailField = getEl("emailField");
const passwordField = getEl("passwordField");
const loginBtn2 = getEl("loginBtn2");
const msg = getEl("message");
const payment = getEl("payment");
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
submitBtn.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
    const inputfield = EmailField.value;
    const pass = passwordField.value;
    const name = nameField.value;
    const username = usernameField.value;
    const packageData = { inputfield, pass, name, username };
    const res = yield fetch("/push/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(packageData),
        credentials: "include"
    });
    const data = yield res.json();
    console.log("Added to database:", data);
}));
loginBtn2.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
    const inputfield = EmailField.value;
    const pass = passwordField.value;
    const loginpackage = { inputfield, pass };
    const res1 = yield fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginpackage),
        credentials: "include"
    });
    const data1 = yield res1.json();
    console.log("Log in Completed", data1);
    if (data1.success) {
        msg.textContent = "Login Successful!";
    }
    else {
        msg.textContent = data1.message || "Login failed!";
        if(data1.message!="User not found")
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
}));
