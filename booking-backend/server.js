import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";

import leadRoutes from "./routes/leadRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";

// ✅ Load environment variables
dotenv.config();
const app = express();

// ✅ Environment check (optional, for debugging)
console.log("🌍 Environment keys loaded:", Object.keys(process.env));
console.log("🧩 GEMINI_API_KEY:", process.env.GEMINI_API_KEY ? "✅ Found" : "❌ Missing");

// ✅ Middleware
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:3000", // Local frontend (for development)
      "https://glra-frontend.onrender.com", // Deployed frontend domain
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// ✅ MongoDB connection
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ API Routes
app.use("/api/users", userRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/bookings", bookingRoutes);

// ✅ Health check route
app.get("/api", (req, res) => {
  res.send("Booking backend running successfully 🚀");
});
// ✅ Serve frontend (only in production)
const __dirname = path.resolve();
const frontendPath = path.join(__dirname, "../frontend/build");

if (process.env.NODE_ENV === "production" || process.env.RENDER) {
  app.use(express.static(frontendPath));

  // ✅ Use middleware fallback instead of app.get('*')
  app.use((req, res, next) => {
    if (req.method === "GET" && !req.path.startsWith("/api")) {
      res.sendFile(path.resolve(frontendPath, "index.html"));
    } else {
      next();
    }
  });
} else {
  app.get("/", (req, res) => {
    res.send("Backend running in development mode ⚙️");
  });
}
