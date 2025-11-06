// models/Lead.js
import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
  },
  { timestamps: true }
);

export default mongoose.model("Lead", leadSchema);
