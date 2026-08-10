const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

const {
  createCompany,
  getCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany,
  uploadCompanyLogo,
} = require("../controllers/companyController");

// Create Company
router.post("/", protect, createCompany);

// Get All Companies
router.get("/", protect, getCompanies);

// Get Single Company
router.get("/:id", protect, getCompanyById);

// Update Company
router.put("/:id", protect, updateCompany);

// Delete Company
router.delete("/:id", protect, deleteCompany);

router.put(
  "/logo/:id",
  protect,
  upload.single("logo"),
  uploadCompanyLogo
);

module.exports = router;