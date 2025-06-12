
const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  authMiddleware,
} = require("../../controllers/auth/auth-controller");

const { OAuth2Client } = require("google-auth-library");
const dotenv = require("dotenv");
dotenv.config();

const router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);


router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
// Google Login
router.post("/google-login", async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, picture } = payload;

    // OPTIONAL: Create or find user in your DB here if needed
    // For now, just respond with the user info

    return res.status(200).json({
      success: true,
      message: "Google login successful",
      user: { email, name, picture },
    });
  } catch (err) {
    console.error("Google login error:", err.message);
    return res.status(401).json({ success: false, message: "Invalid Google token" });
  }
});

//check auth (protected)
router.get("/check-auth", authMiddleware, (req, res) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    message: "Authenticated user!",
    user,
  });
});

// Redundant route (optional to remove)
router.get("/check-auth", (req, res) => {
  res.status(200).json({ success: true, message: "It works!" });
  console.log("it works!");
});

module.exports = router;
