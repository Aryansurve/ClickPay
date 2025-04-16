const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();

// ✅ Import Middleware
const { authMiddleware, adminAuth } = require("./middleware/authMiddleware");

// ✅ Serve static images from "uploads" directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Middleware
app.use(express.json()); // Ensure JSON body parsing
app.use(cors({
  origin: process.env.CLIENT_ORIGIN || "*", // Allow configurable origin
  methods: ["GET", "POST", "PUT", "DELETE"], // ✅ Fixed array format for methods
  allowedHeaders: ["Content-Type", "Authorization"] // ✅ Fixed array format for headers
}));

// ✅ Connect to MongoDB with Better Error Handling
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log("✅ Connected to MongoDB"))
//   .catch(err => {
//     console.error("❌ MongoDB Connection Error:", err);
//     process.exit(1); // Exit the process if DB connection fails
//   });


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))   
  .catch(err => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
  });


// ✅ Import Routes
const userRoutes = require("./routes/userRoutes");
const businessRoutes = require("./routes/businessRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

// ✅ Use Routes
app.use("/api/users", userRoutes);
app.use("/api/businesses", businessRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/payments", paymentRoutes); // ✅ Changed from "/api" to "/api/payments" for clarity

// ✅ Admin API Route Example (Uses Middleware)
app.get("/api/admin", adminAuth, (req, res) => {
  res.json({ message: "Welcome, Admin!" });
});

// ✅ Default API route
app.get("/", (req, res) => {
  res.send("✅ API is running...");
});

// ✅ Handle undefined routes
app.use((req, res) => {
  res.status(404).json({ message: "❌ Route not found" });
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
