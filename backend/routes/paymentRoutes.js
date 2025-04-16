const express = require("express");
const { v4: uuidv4 } = require("uuid"); // For generating unique transaction IDs
const Transaction = require("../models/Transaction");
const User = require("../models/User"); // ✅ Added missing import
const { processPayment } = require("../controllers/paymentController");
const { authenticateUser } = require("../middleware/authMiddleware"); // ✅ Correct import
const jwtDecode = require('jwt-decode');


const router = express.Router();

console.log("processPayment function loaded:", !!processPayment); // Debugging log

// ✅ Payment Route
router.post("/pay", authenticateUser, processPayment);

// ✅ Transaction History Route
router.get("/history/:userId", authenticateUser, async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId || userId.length !== 24) {
            return res.status(400).json({ error: "Invalid user ID format" });
        }

        const transactions = await Transaction.find({
            $or: [{ senderId: userId }, { receiverId: userId }]
        })
        .sort({ createdAt: -1 })
        .populate("senderId", "name email") // Fetch sender details
        .populate("receiverId", "name email"); // Fetch receiver details

        res.json(transactions || []); // Always return an array
    } catch (error) {
        console.error("Transaction history error:", error);
        res.status(500).json({ error: "Error fetching transaction history", details: error.message });
    }
});

// ✅ Send Payment Route
const Wallet = require("../models/Wallet"); // Import Wallet model

router.get("/balance", async (req, res) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = req.headers.authorization.split(" ")[1]; // Assuming Bearer token
    const decoded = jwtDecode(token); // Decode the token first

    console.log("Decoded Token:", decoded); // Check token structure in logs

    const uid = decoded.id || decoded.sub; // Use `id` or fallback to `sub`
    if (!uid) {
      return res.status(400).json({ message: "Invalid token structure" });
    }

    const wallet = await Wallet.findOne({ userId: uid });

    if (!wallet) {
      return res.status(404).json({ message: "Wallet not found" });
    }

    res.json({ balance: wallet.balance });
  } catch (error) {
    console.error("Error fetching balance:", error);
    res.status(500).json({ message: "Failed to fetch balance" });
  }
});

router.post("/send", authenticateUser, async (req, res) => {
  try {
    const { senderId, receiverId, amount, location } = req.body;

    if (!senderId || !receiverId || !amount || !location) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const senderWallet = await Wallet.findOne({ userId: senderId });
    const receiverWallet = await Wallet.findOne({ userId: receiverId });

    if (!senderWallet || !receiverWallet) {
      return res.status(404).json({ message: "Wallet not found" });
    }

    if (senderWallet.balance < amount) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    // Deduct from sender, add to receiver
    senderWallet.balance -= amount;
    receiverWallet.balance += amount;

    // Generate a unique transaction ID
    const transactionId = uuidv4();

    // Save transaction
    const transaction = new Transaction({
      transactionId,
      senderId,
      receiverId,
      amount,
      transactionType: "send", // Ensuring this field is provided
      status: "completed", // Correct lowercase format
      location: location, // ✅ Fix syntax error

    });

    await senderWallet.save();
    await receiverWallet.save();
    await transaction.save();

    res.status(200).json({
      message: "Payment successful",
      newBalance: senderWallet.balance,
      transaction
    });

  } catch (error) {
    console.error("Send Payment Error:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
