const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    inputfield: { type: String, required: true },
    pass: { type: String, required: true },
    name: { type: String, required: true },
    username: { type: String, required: true }
});

module.exports = mongoose.model("Srikar", userSchema);
