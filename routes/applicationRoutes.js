const express = require("express");

const router = express.Router();

const {
  applyJob,
  getMyApplications,
  getApplicantsByJob,
  updateApplicationStatus,
} = require("../controllers/applicationController");

const protect = require("../middleware/authMiddleware");

// ==========================================
// CANDIDATE
// ==========================================

// Apply for a job
router.post(
  "/apply",
  protect,
  applyJob
);

// Get candidate's applications
router.get(
  "/my-applications",
  protect,
  getMyApplications
);

// ==========================================
// RECRUITER
// ==========================================

// Get applicants for a job
router.get(
  "/job/:jobId",
  protect,
  getApplicantsByJob
);

// Accept / Reject application
router.put(
  "/:id/status",
  protect,
  updateApplicationStatus
);

module.exports = router;
