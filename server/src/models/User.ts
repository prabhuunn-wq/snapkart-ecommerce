import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["customer", "admin","delivery"], default: "customer" },
    address: {
      fullName: { type: String },
      address: { type: String },
      city: { type: String },
      pinCode: { type: String },
      phone: { type: String },
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;