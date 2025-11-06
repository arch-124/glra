import express from "express";
import { createBooking, getAllBookings } from "../controllers/bookingController.js";

const router = express.Router();

router.post("/create", createBooking);
router.get("/all", getAllBookings);

export default router;
