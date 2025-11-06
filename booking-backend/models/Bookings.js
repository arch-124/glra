import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  service: {
    type: String,
    required: true,
    enum: [
      "Custom Solar Design Consultation",
      "Site Assessment",
      "Solar Panel Installation"
    ]
  },
  date: { type: String, required: true },
  time: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Booking", bookingSchema);
