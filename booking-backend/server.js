import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";

import leadRoutes from "./routes/leadRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";

dotenv.config();
const app = express();

// ✅ Environment check logs (optional)
console.log("🌍 Environment keys loaded:", Object.keys(process.env));
console.log("🧩 GEMINI_API_KEY:", process.env.GEMINI_API_KEY ? "✅ Found" : "❌ Missing");

// ✅ Middleware
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:3000", // local frontend
      "https://your-frontend-domain.com", // your deployed frontend domain if any
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// ✅ MongoDB connection
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

// ✅ API Routes
app.use("/api/users", userRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/bookings", bookingRoutes);

// ✅ Default route for API health
app.get("/api", (req, res) => res.send("Booking backend running successfully 🚀"));

// ✅ Serve React Frontend (Production Mode)
const __dirname = path.resolve();
const frontendPath = path.join(__dirname, "../frontend/build");

if (process.env.NODE_ENV === "production" || process.env.RENDER) {
  app.use(express.static(frontendPath));

  // Handle all frontend routes
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(frontendPath, "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Backend running in development mode ⚙️");
  });
}

// ✅ Handle 404s
app.use((req, res) => {
  res.status(404).json({ message: "Route not found", path: req.originalUrl });
});

// ✅ Start Server
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
