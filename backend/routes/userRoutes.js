// const express = require("express");
// const jwt = require("jsonwebtoken");
// const path = require("path");
// const fs = require("fs");
// const QRCode = require("qrcode");
// const multer = require("multer");
// const dotenv = require("dotenv");

// const { createCanvas } = require("canvas");
// const bcrypt = require("bcryptjs");
// const User = require("../models/User");
// const Wallet = require("../models/Wallet");
// const { authMiddleware, adminAuth } = require("../middleware/authMiddleware");

// dotenv.config();
// const router = express.Router();

// // Ensure Upload Directory Exists
// const uploadDir = path.join(__dirname, "../uploads");
// if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// // Multer Storage for Image Uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, uploadDir),
//   filename: (req, file, cb) =>
//     cb(null, Date.now() + path.extname(file.originalname)),
// });
// const upload = multer({ storage });

// // Generate Unique UPI ID
// const generateUPIID = () => `user${Date.now()}@xpay`;

// // Generate QR Code for UPI ID
// const generateQRCode = async (upiID) => {
//   const qrPath = `uploads/${Date.now()}_qrcode.png`;
//   await QRCode.toFile(path.join(__dirname, "../", qrPath), upiID);
//   return `/${qrPath}`;
// };

// // GPay-like Colors for Avatar
// const gpayColors = [
//   "#FBBC05",
//   "#4285F4",
//   "#EA4335",
//   "#34A853",
//   "#FF6D00",
//   "#46BDC6",
//   "#AA00FF",
//   "#8E24AA",
//   "#FF4081",
//   "#795548",
// ];

// // Generate Avatar
// const generateAvatar = async (name) => {
//   try {
//     const timestamp = Date.now();
//     const fileName = `${timestamp}.png`;
//     const filePath = path.join(__dirname, "../uploads/", fileName);

//     const bgColor = gpayColors[Math.floor(Math.random() * gpayColors.length)];

//     const canvas = createCanvas(128, 128);
//     const ctx = canvas.getContext("2d");

//     ctx.fillStyle = bgColor;
//     ctx.fillRect(0, 0, 128, 128);

//     ctx.fillStyle = "#FFFFFF";
//     ctx.font = "bold 50px Arial";
//     ctx.textAlign = "center";
//     ctx.textBaseline = "middle";

//     const firstLetter = name.charAt(0).toUpperCase();
//     ctx.fillText(firstLetter, 64, 64);

//     const buffer = canvas.toBuffer("image/png");
//     fs.writeFileSync(filePath, buffer);

//     return `/uploads/${fileName}`;
//   } catch (error) {
//     console.error("Error generating avatar:", error);
//     return null;
//   }
// };

// router.post("/register", upload.single("image"), async (req, res) => {
//   try {
//     const { name, phoneNumber, email, password, isAdmin } = req.body;
    
//     // ✅ Validate input fields
//     if (!name || !phoneNumber || !email || !password) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     // ✅ Check if user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     // ✅ Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);
    
//     // ✅ Generate unique UPI ID and QR Code
//     const userUPI = generateUPIID();
//     const qrCode = await generateQRCode(userUPI);

//     // ✅ Handle user profile image (either uploaded or default avatar)
//     const userImage = req.file
//       ? `/uploads/${req.file.filename}`
//       : await generateAvatar(name);

//     // ✅ Create & save new user
//     const newUser = await new User({
//       name,
//       phoneNumber,
//       email,
//       password: hashedPassword,
//       userUPIId: userUPI,
//       qrCode,
//       image: userImage,
//       isAdmin: isAdmin === "true" || isAdmin === true,
//     }).save();

//     // ✅ Create & save Wallet separately after user creation
//     const newWallet = await new Wallet({
//       userId: newUser._id,
//       balance: 10000, // Default starting balance
//       frozenFunds: 0,
//     }).save();

//     // ✅ Generate JWT token
//     const token = jwt.sign(
//       { id: newUser._id.toString(), email: newUser.email, isAdmin: newUser.isAdmin },
//       process.env.JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     // ✅ Send success response
//     res.status(201).json({
//       message: "User registered successfully",
//       token,
//       user: {
//         id: newUser._id,
//         name: newUser.name,
//         email: newUser.email,
//         phoneNumber: newUser.phoneNumber,
//         userUPIId: newUser.userUPIId,
//         qrCode: newUser.qrCode,
//         image: newUser.image,
//         isAdmin: newUser.isAdmin,
//       },
//       wallet: {
//         balance: newWallet.balance,
//         frozenFunds: newWallet.frozenFunds,
//       },
//     });

//   } catch (err) {
//     console.error("❌ Error in user registration:", err);
//     res.status(500).json({ message: "Internal server error", error: err.message });
//   }
// });

// // ✅ Login User
// router.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     if (!email || !password)
//       return res.status(400).json({ message: "All fields are required" });

//     const user = await User.findOne({ email: email.trim().toLowerCase() });
//     if (!user) return res.status(400).json({ message: "Invalid credentials" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

//     const isAdmin = user.isAdmin || false;

//     // ✅ Generate JWT Token (Same format as register)
//     const token = jwt.sign(
//       { id: user._id.toString(), email: user.email, isAdmin }, 
//       process.env.JWT_SECRET, 
//       { expiresIn: "7d" }
//     );

//     res.json({ message: "Login successful", token, isAdmin });
//   } catch (err) {
//     console.error("Error logging in:", err);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// // profile
// router.get("/profile", authMiddleware, async (req, res) => {
//   try {
//     console.log("🔍 Searching for User ID:", req.user.id);

//     // Ensure ID is properly formatted as ObjectId
//     const user = await User.findById(req.user.id).select("-password");
    
//     if (!user) {
//       console.error("🚨 User Not Found in DB:", req.user.id);
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.json({
//       id: user._id,
//       name: user.name,
//       email: user.email,
//       phoneNumber: user.phoneNumber,
//       userUPIId: user.userUPIId,
//       qrCode: user.qrCode,
//       image: user.image,
//       isAdmin: user.isAdmin
//     });
//   } catch (err) {
//     console.error("❌ Error Fetching User:", err);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// // Get All Users Except Logged-in User
// router.get("/all-users", authMiddleware, async (req, res) => {
//   try {
//     console.log("🔍 Fetching all users except:", req.user.id);

//     const users = await User.find({ _id: { $ne: req.user.id } }).select("-password");

//     if (!users || users.length === 0) {
//       return res.status(404).json({ message: "No users found" });
//     }

//     const formattedUsers = users.map(user => ({
//       id: user._id,
//       name: user.name,
//       email: user.email,
//       phoneNumber: user.phoneNumber,
//       image: user.image // ✅ Full image path
//     }));

//     res.json(formattedUsers);
//   } catch (error) {
//     console.error("Error fetching users:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // Route to get logged-in user details
// router.get("/me", authMiddleware, async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id).select("-password"); // Exclude password
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     res.json(user);
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // Get User by ID
// router.get("/:id", authMiddleware, async (req, res) => {
//   const { id } = req.params;

//   // Handle "profile" case separately
//   if (id === "profile") {
//     return res.status(400).json({ message: "Invalid user ID" });
//   }

//   // Validate if `id` is a valid ObjectId
//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(400).json({ message: "Invalid user ID format" });
//   }

//   try {
//     const user = await User.findById(id).select("name phoneNumber userUPIId image");
//     if (!user) return res.status(404).json({ message: "User not found" });

//     res.json(user);
//   } catch (err) {
//     console.error("Error fetching user by ID:", err);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// router.get("/get-user/:id", authMiddleware, async (req, res) => {
//   try {
//     const userId = req.params.id;

//     // Fetch user data (excluding password for security)
//     const user = await User.findById(userId).select("name phoneNumber userUPIId image");
    
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.json(user);
//   } catch (error) {
//     console.error("Error fetching user:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });


// // Admin: Get All Users
// router.get("/all-users", authMiddleware, async (req, res) => {
//   try {
//       const users = await User.find({}, "name phoneNumber image"); // Fetch only required fields
//       res.json(users);

//   } catch (err) {
//       console.error("Error fetching users:", err);
//       res.status(500).json({ error: "Failed to fetch users" });
//   }
// });

// // Admin: Delete User
// router.delete("/admin/delete-user/:id", adminAuth, async (req, res) => {
//   try {
//     await User.findByIdAndDelete(req.params.id);
//     res.json({ message: "User deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// // Admin: Update User Balance
// router.put("/admin/update-balance/:id", adminAuth, async (req, res) => {
//   const { balance } = req.body;
//   try {
//     await User.findByIdAndUpdate(req.params.id, { balance });
//     res.json({ message: "User balance updated" });
//   } catch (err) {
//     res.status(500).json({ message: "Internal server error" });
//   }
// });


// // Get user's bank balance
// router.get('/balance', authMiddleware, async (req, res) => {
//   try {
//     const wallet = await Wallet.findOne({ userId: req.user.id });

//     if (!wallet) {
//       return res.status(404).json({ message: 'Wallet not found' });
//     }

//     res.status(200).json({ balance: wallet.balance });
//   } catch (error) {
//     console.error('Error fetching balance:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });


// module.exports = router;



const express = require("express");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");
const QRCode = require("qrcode");
const multer = require("multer");
const dotenv = require("dotenv");

const { createCanvas } = require("canvas");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Wallet = require("../models/Wallet");
const { authMiddleware, adminAuth } = require("../middleware/authMiddleware");

dotenv.config();
const router = express.Router();

// Multer setup for handling multipart/form-data
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Generate Unique UPI ID
const generateUPIID = () => `user${Date.now()}@xpay`;

// Generate QR Code for UPI ID
const generateQRCode = async (upiID, name) => {
  try {
    const qrData = `upi://pay?pa=${upiID}&pn=${name}`;
    const qrCodeBuffer = await QRCode.toBuffer(qrData); // Generate QR as buffer
    return qrCodeBuffer;
  } catch (error) {
    console.error("QR Code generation failed:", error);
    return null;
  }
};

// GPay-like Colors for Avatar
const gpayColors = [
  "#FBBC05",
  "#4285F4",
  "#EA4335",
  "#34A853",
  "#FF6D00",
  "#46BDC6",
  "#AA00FF",
  "#8E24AA",
  "#FF4081",
  "#795548",
];

// Generate Avatar
const generateAvatar = async (name) => {
  try {
    const bgColor = gpayColors[Math.floor(Math.random() * gpayColors.length)];

    const canvas = createCanvas(128, 128);
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, 128, 128);

    ctx.fillStyle = "#FFFFFF";
    ctx.font = "bold 50px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const firstLetter = name.charAt(0).toUpperCase();
    ctx.fillText(firstLetter, 64, 64);

    const buffer = canvas.toBuffer("image/png");
    return buffer;
  } catch (error) {
    console.error("Error generating avatar:", error);
    return null;
  }
};

router.post("/register", upload.single("image"), async (req, res) => {
  try {
    const { name, phoneNumber, email, password, isAdmin } = req.body;

    // Validate input fields
    if (!name || !phoneNumber || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate unique UPI ID and QR Code
    const userUPI = generateUPIID();
    const qrCodeBuffer = await generateQRCode(userUPI, name);

    // Handle user profile image (either uploaded or default avatar)
    const userImageBuffer = req.file ? req.file.buffer : await generateAvatar(name);

    // Create & save new user
    const newUser = await new User({
      name,
      phoneNumber,
      email,
      password: hashedPassword,
      userUPIId: userUPI,
      qrCode: qrCodeBuffer,
      image: userImageBuffer,
      isAdmin: isAdmin === "true" || isAdmin === true,
    }).save();

    // Create & save Wallet separately after user creation
    const newWallet = await new Wallet({
      userId: newUser._id,
      balance: 10000, // Default starting balance
      frozenFunds: 0,
    }).save();

    // Generate JWT token
    const token = jwt.sign(
      { id: newUser._id.toString(), email: newUser.email, isAdmin: newUser.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Send success response
    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        phoneNumber: newUser.phoneNumber,
        userUPIId: newUser.userUPIId,
        qrCode: newUser.qrCode.toString("base64"), // Convert Buffer to base64
        image: newUser.image.toString("base64"), // Convert Buffer to base64
        isAdmin: newUser.isAdmin,
      },
      wallet: {
        balance: newWallet.balance,
        frozenFunds: newWallet.frozenFunds,
      },
    });
  } catch (err) {
    console.error("Error in user registration:", err);
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
});

// Login User
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "All fields are required" });

    const user = await User.findOne({ email: email.trim().toLowerCase() });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const isAdmin = user.isAdmin || false;

    // Generate JWT Token
    const token = jwt.sign(
      { id: user._id.toString(), email: user.email, isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ message: "Login successful", token, isAdmin });
  } catch (err) {
    console.error("Error logging in:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Profile
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      userUPIId: user.userUPIId,
      qrCode: user.qrCode.toString("base64"), // Convert Buffer to base64
      image: user.image.toString("base64"), // Convert Buffer to base64
      isAdmin: user.isAdmin,
    });
  } catch (err) {
    console.error("Error Fetching User:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get All Users Except Logged-in User
router.get("/all-users", authMiddleware, async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.user.id } }).select("-password");

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    const formattedUsers = users.map((user) => ({
      id: user._id,
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      image: user.image.toString("base64"), // Convert Buffer to base64
    }));

    res.json(formattedUsers);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Route to get logged-in user details
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      userUPIId: user.userUPIId,
      qrCode: user.qrCode.toString("base64"), // Convert Buffer to base64
      image: user.image.toString("base64"), // Convert Buffer to base64
      isAdmin: user.isAdmin,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get User by ID
router.get("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;

  if (id === "profile") {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid user ID format" });
  }

  try {
    const user = await User.findById(id).select("name phoneNumber userUPIId image");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({
      name: user.name,
      phoneNumber: user.phoneNumber,
      userUPIId: user.userUPIId,
      image: user.image.toString("base64"), // Convert Buffer to base64
    });
  } catch (err) {
    console.error("Error fetching user by ID:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/get-user/:id", authMiddleware, async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId).select("name phoneNumber userUPIId image");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      name: user.name,
      phoneNumber: user.phoneNumber,
      userUPIId: user.userUPIId,
      image: user.image.toString("base64"), // Convert Buffer to base64
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Admin: Get All Users
router.get("/admin/all-users", adminAuth, async (req, res) => {
  try {
    const users = await User.find({}, "name phoneNumber image");

    res.json(users.map((user) => ({
      name: user.name,
      phoneNumber: user.phoneNumber,
      image: user.image.toString("base64"), // Convert Buffer to base64
    })));
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// Admin: Delete User
router.delete("/admin/delete-user/:id", adminAuth, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Admin: Update User Balance
router.put("/admin/update-balance/:id", adminAuth, async (req, res) => {
  const { balance } = req.body;
  try {
    await Wallet.findOneAndUpdate({ userId: req.params.id }, { balance });
    res.json({ message: "User balance updated" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get user's bank balance
router.get('/balance', authMiddleware, async (req, res) => {
  try {
    const wallet = await Wallet.findOne({ userId: req.user.id });

    if (!wallet) {
      return res.status(404).json({ message: 'Wallet not found' });
    }

    res.status(200).json({ balance: wallet.balance });
  } catch (error) {
    console.error('Error fetching balance:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;

