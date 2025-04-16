// const mongoose = require("mongoose");
// const jwt = require("jsonwebtoken");
// const QRCode = require("qrcode");
// const path = require("path");
// const fs = require("fs");

// // Define User Schema
// const userSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     phoneNumber: { type: String, required: true, unique: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true }, // Expecting hashed password from routes
//     userUPIId: { type: String, unique: true },
//     qrCode: { type: String }, // Stores the QR code file path
//     image: { type: String }, // Stores the profile image file path
//     isAdmin: { type: Boolean, default: false }, // Admin role stored in DB
//   },
//   { timestamps: true }
// );

// // Pre-save hook to generate UPI ID and QR Code
// userSchema.pre("save", async function (next) {
//   // Generate Unique UPI ID if not already set
//   if (!this.userUPIId) {
//     this.userUPIId = `user${Date.now()}@xpay`;
//   }

//   // Generate QR Code
//   await this.generateQRCode();

//   next();
// });

// // Generate JWT token
// userSchema.methods.generateAuthToken = function () {
//   return jwt.sign(
//     { id: this._id, phoneNumber: this.phoneNumber, isAdmin: this.isAdmin }, // Admin status from DB
//     process.env.JWT_SECRET || "defauslt_secret",
//     { expiresIn: "7d" }
//   );
// };

// // Generate QR Code for UPI ID and save as a file
// userSchema.methods.generateQRCode = async function () {
//   try {
//     const qrData = `upi://pay?pa=${this.userUPIId}&pn=${this.name}`;
//     const uploadDir = path.join(__dirname, "../uploads");

//     // Ensure the uploads directory exists
//     if (!fs.existsSync(uploadDir)) {
//       fs.mkdirSync(uploadDir);
//     }

//     const qrPath = path.join(uploadDir, `${this._id}_qrcode.png`);
//     await QRCode.toFile(qrPath, qrData);
//     this.qrCode = `/uploads/${this._id}_qrcode.png`;
//   } catch (error) {
//     console.error("QR Code generation failed:", error);
//   }
// };

// // Set User Profile Image
// userSchema.methods.setProfileImage = function (filePath) {
//   this.image = filePath;
// };

// // Check if user is admin
// userSchema.methods.checkIfAdmin = function () {
//   return this.isAdmin;
// };

// const User = mongoose.model("User", userSchema, "users");

// module.exports = User;






const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const QRCode = require("qrcode");

// Define User Schema
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Expecting hashed password from routes
    userUPIId: { type: String, unique: true },
    qrCode: { type: Buffer }, // Store QR code as binary data
    image: { type: Buffer }, // Store profile image as binary data
    isAdmin: { type: Boolean, default: false }, // Admin role stored in DB
  },
  { timestamps: true }
);

// Pre-save hook to generate UPI ID and QR Code
userSchema.pre("save", async function (next) {
  if (!this.userUPIId) {
    this.userUPIId = `user${Date.now()}@xpay`;
  }

  // Generate QR Code
  await this.generateQRCode();

  next();
});

// Generate JWT token
userSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    { id: this._id, phoneNumber: this.phoneNumber, isAdmin: this.isAdmin },
    process.env.JWT_SECRET || "default_secret",
    { expiresIn: "7d" }
  );
};

// Generate QR Code for UPI ID and store as binary
userSchema.methods.generateQRCode = async function () {
  try {
    const qrData = `upi://pay?pa=${this.userUPIId}&pn=${this.name}`;
    const qrCodeBuffer = await QRCode.toBuffer(qrData); // Generate QR as buffer
    this.qrCode = qrCodeBuffer;
  } catch (error) {
    console.error("QR Code generation failed:", error);
  }
};

// Set User Profile Image
userSchema.methods.setProfileImage = function (imageBuffer) {
  this.image = imageBuffer;
};

// Check if user is admin
userSchema.methods.checkIfAdmin = function () {
  return this.isAdmin;
};

const User = mongoose.model("User", userSchema, "users");

module.exports = User;
