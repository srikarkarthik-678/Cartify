require("dotenv").config();
const User = require("./models/User");
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const port = process.env.PORT || 3001;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

app.use(
  session({
    secret: "a-very-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/cart/add", (req, res) => {
  const { img, dec, instock, Eligible, freesize, color, rupees } = req.body;
  if (!req.session.cart) {
    req.session.cart = [];
  }
  const newItem = { id: Date.now().toString(),img,dec,instock,Eligible,freesize,color,rupees,};
  req.session.cart.push(newItem);
  res.json({ message: "Item added to cart", cart: req.session.cart });
});
app.get("/cart", (req, res) => {
  res.json(req.session.cart || []);
});

app.delete("/cart/delete", (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ message: "Item ID is required" });
  }
  if (!req.session.cart) {
    return res.status(400).json({ message: "Cart is empty" });
  }
  req.session.cart = req.session.cart.filter((item) => item.id !== id);
  res.json({ message: "Item deleted", cart: req.session.cart });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

app.post("/push/add", async (req, res) => {
  const { inputfield, pass, name, username } = req.body;
  const newUser = new User({ inputfield, pass, name, username });
  await newUser.save();
  res.json({ message: "Data stored successfully", data: newUser });
});

app.post("/login", async (req, res) => {
  const { inputfield, pass } = req.body;
  const user = await User.findOne({ inputfield });
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }
    req.session.user = {
      id: user._id,
      name: user.name,
      username: user.username,
      email: user.inputfield,
    };
  res.json({ message: "Login Successfully Done", user: req.session.user });
});

app.get("/login", (req, res) => {
  res.json(req.session.user || []);
});

app.post("/buy-now/add", (req, res) => {
  const { img, dec, instock, Eligible, freesize, color, rupees } = req.body;
  if (!req.session.buyNowItems) {
    req.session.buyNowItems = [];
  }
  const newBuyNowItem = {id: Date.now().toString(),img,dec,instock,Eligible,freesize,color,rupees};
  req.session.buyNowItems.push(newBuyNowItem);
  res.json({ message: "Item added to Buy Now", items: req.session.buyNowItems });
});


app.get("/buy-now", (req, res) => {
  res.json(req.session.buyNowItems || []);
});
app.post("/total-add", (req, res) => {
  const { total } = req.body;
  if (!total) {
    return res.status(400).json({ message: "Total amount missing" });
  }
  req.session.totalAmount = total;
  res.json({
    message: "Total amount saved successfully",
    total: req.session.totalAmount
  });
});
app.get("/total", (req, res) => {
  res.json({
    total: req.session.totalAmount || 0
  });
});
app.listen(port,()=>{
  console.log(`Server running on http://localhost:${port}`)
})
