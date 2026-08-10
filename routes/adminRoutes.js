const express = require("express");

const router = express.Router();

const {
  getDashboardStats,
    getAllUsers,
    deleteUser,
    getAllJobs,
    deleteJob,
    getAllApplications,
    updateApplication,

} = require("../controllers/adminController");

const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

// ==========================================
// ADMIN DASHBOARD
// ==========================================

router.get(
  "/dashboard",
  protect,
  admin,
  getDashboardStats
);
router.get(
  "/users",
  protect,
  admin,
  getAllUsers
);

router.delete(
  "/users/:id",
  protect,
  admin,
  deleteUser
);

router.get(
  "/jobs",
  protect,
  admin,
  getAllJobs
);

router.delete(
  "/jobs/:id",
  protect,
  admin,
  deleteJob
);

router.get(
  "/applications",
  protect,
  admin,
  getAllApplications
);

router.put(
  "/applications/:id",
  protect,
  admin,
  updateApplication
);

module.exports = router;