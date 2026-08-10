const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createJob,
  getJobs,
  getJobById,
  updateJob,
  deleteJob,
  getMyJobs,
} = require("../controllers/jobController");

// Public
router.get("/", getJobs);

// Protected
router.post("/", protect, createJob);
router.get("/my", protect, getMyJobs);

// Dynamic routes LAST
router.get("/:id", getJobById);
router.put("/:id", protect, updateJob);
router.delete("/:id", protect, deleteJob);

module.exports = router;