const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
username: { type: String, required: true, unique: true },
password: { type: String, required: function() { return !this.googleId; } },
email:    { type: String, required: true, unique: true },
country:  { type: String },   
googleId: { type: String, unique: true, sparse: true },
failedLoginAttempts: { type: Number, default: 0 },
lockUntil: { type:  Date, default: null },
cart: [
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    quantity: { type: Number, default: 1 },
  }
],
favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }], 
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
