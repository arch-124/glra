import express from "express";
import Lead from "../models/Lead.js";

const router = express.Router();

// ✅ Fetch all leads (Admin only)
router.get("/all", async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.status(200).json(leads);
  } catch (error) {
    console.error("Error fetching leads:", error);
    res.status(500).json({ message: "Server error while fetching leads" });
  }
});

// Save new lead
router.post("/add", async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newLead = new Lead({ name, email, phone });
    await newLead.save();
    res.status(201).json({ message: "Lead saved successfully", lead: newLead });
  } catch (error) {
    console.error("Error saving lead:", error);
    res.status(500).json({ message: "Server error while saving lead" });
  }
});

export default router;
