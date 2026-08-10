const express = require("express");
const router = express.Router();

const {
  register,
  login,
  getProfile,
  updateProfile,
  uploadProfilePhoto,
  uploadResume,
} = require("../controllers/authController");

const protect = require("../middleware/authMiddleware");
const uploadProfile = require("../middleware/uploadProfile");
const uploadResumeMiddleware = require("../middleware/uploadResume");

router.post("/register", register);
router.post("/login", login);

// Protected Route
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);
router.put(
  "/profile-photo",
  protect,
  uploadProfile.single("profilePhoto"),
  uploadProfilePhoto,
  (req, res) => {
    console.log("FILE =>", req.file);
    console.log("BODY =>", req.body);

    res.json({
      file: req.file,
      body: req.body,
    });
  }
);
router.put(
  "/resume",
  protect,
  uploadResumeMiddleware.single("resume"),
  uploadResume
);
module.exports = router;