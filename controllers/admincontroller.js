const User = require("../models/User");
const Job = require("../models/Job");
const Application = require("../models/Application");

// ==========================================
// GET ADMIN DASHBOARD STATISTICS
// ==========================================

const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();

    const totalCandidates = await User.countDocuments({
      role: "candidate",
    });

    const totalRecruiters = await User.countDocuments({
      role: "recruiter",
    });

    const totalJobs = await Job.countDocuments();

    const totalApplications =
      await Application.countDocuments();

    const pendingApplications =
      await Application.countDocuments({
        status: "Pending",
      });

    const acceptedApplications =
      await Application.countDocuments({
        status: "Accepted",
      });

    const rejectedApplications =
      await Application.countDocuments({
        status: "Rejected",
      });

    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        totalCandidates,
        totalRecruiters,
        totalJobs,
        totalApplications,
        pendingApplications,
        acceptedApplications,
        rejectedApplications,
      },
    });
  } catch (error) {
    console.log("Admin dashboard error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// ==========================================
// GET ALL USERS
// ==========================================

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("-password")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    console.log("Get users error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// DELETE USER
// ==========================================

const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Prevent admin from deleting themselves
    if (user._id.toString() === req.user.id.toString()) {
      return res.status(400).json({
        success: false,
        message: "You cannot delete your own admin account",
      });
    }

    await user.deleteOne();

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.log("Delete user error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// ==========================================
// GET ALL JOBS - ADMIN
// ==========================================

const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find()
      .populate("company", "name")
      .populate("createdBy", "fullName email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: jobs.length,
      jobs,
    });
  } catch (error) {
    console.log("Admin get jobs error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// DELETE JOB - ADMIN
// ==========================================

const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    await job.deleteOne();

    res.status(200).json({
      success: true,
      message: "Job deleted successfully",
    });
  } catch (error) {
    console.log("Admin delete job error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// ==========================================
// GET ALL APPLICATIONS - ADMIN
// ==========================================

const getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find()
      .populate(
        "applicant",
        "fullName email phone"
      )
      .populate({
        path: "job",
        select: "title location salary company",
        populate: {
          path: "company",
          select: "name",
        },
      })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: applications.length,
      applications,
    });
  } catch (error) {
    console.log(
      "Admin get applications error:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// UPDATE APPLICATION - ADMIN
// ==========================================

const updateApplication = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "Pending",
      "Accepted",
      "Rejected",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message:
          "Status must be Pending, Accepted, or Rejected",
      });
    }

    const application =
      await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    application.status = status;

    await application.save();

    res.status(200).json({
      success: true,
      message:
        "Application status updated successfully",
      application,
    });
  } catch (error) {
    console.log(
      "Admin update application error:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
    getAllUsers,
    deleteUser,
    getAllJobs, 
    deleteJob,
    getAllApplications,
    updateApplication,
    
};