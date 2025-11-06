import Booking from "../models/Bookings.js";

const SLOT_LIMITS = {
  "Custom Solar Design Consultation": 5,
  "Site Assessment": 1,
  "Solar Panel Installation": 1
};

// Create new booking
export const createBooking = async (req, res) => {
  try {
    const { name, email, phone, service, date, time } = req.body;

    if (!name || !email || !phone || !service || !date || !time) {
      return res.status(400).json({ success: false, message: "All fields required" });
    }

    // Count existing bookings for the same service and date
    const count = await Booking.countDocuments({ service, date });

    if (count >= SLOT_LIMITS[service]) {
      return res.status(400).json({
        success: false,
        message: `All slots for ${service} on ${date} are full.`
      });
    }

    const newBooking = await Booking.create({ name, email, phone, service, date, time });

    res.status(201).json({
      success: true,
      message: "Booking confirmed successfully!",
      booking: newBooking
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get all bookings (for admin)
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, bookings });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
