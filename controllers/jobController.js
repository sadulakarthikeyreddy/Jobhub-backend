const Job = require("../models/Job");

// ==========================================
// CREATE JOB
// ==========================================

const createJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      experienceLevel,
      jobType,
      position,
      company,
    } = req.body;

    const job = await Job.create({
      title,
      description,
      requirements,
      salary,
      location,
      experienceLevel,
      jobType,
      position,
      company,
      createdBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Job created successfully",
      job,
    });
  } catch (error) {
    console.log("Create Job Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// GET ALL JOBS + SEARCH + FILTER + SORT
// ==========================================

const getJobs = async (req, res) => {
  try {
    const {
      keyword,
      location,
      jobType,
      experienceLevel,
      minSalary,
      maxSalary,
      sortBy,
    } = req.query;

    // Build filter
    let filter = {};

    // Keyword
    if (keyword) {
      filter.title = {
        $regex: keyword,
        $options: "i",
      };
    }

    // Location
    if (location) {
      filter.location = {
        $regex: location,
        $options: "i",
      };
    }

    // Job type
    if (jobType) {
      filter.jobType = jobType;
    }

    // Experience level
    if (experienceLevel) {
      filter.experienceLevel = experienceLevel;
    }

    // Minimum salary
    if (minSalary) {
      filter.salary = {
        ...filter.salary,
        $gte: Number(minSalary),
      };
    }

    // Maximum salary
    if (maxSalary) {
      filter.salary = {
        ...filter.salary,
        $lte: Number(maxSalary),
      };
    }

    // ==========================================
    // SORT
    // ==========================================

    let sortOption = {
      createdAt: -1,
    };

    if (sortBy === "salary-high") {
      sortOption = {
        salary: -1,
      };
    }

    if (sortBy === "salary-low") {
      sortOption = {
        salary: 1,
      };
    }

    // ==========================================
    // FIND JOBS
    // ==========================================

    const jobs = await Job.find(filter)
      .populate("company", "name")
      .populate("createdBy", "fullName email")
      .sort(sortOption);

    // ==========================================
    // RESPONSE
    // ==========================================

    res.status(200).json({
      success: true,
      count: jobs.length,
      jobs,
    });
  } catch (error) {
    console.log("Get Jobs Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// GET JOB BY ID
// ==========================================

const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate("company", "name")
      .populate("createdBy", "fullName email");

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    console.log("Get Job Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// GET MY JOBS
// ==========================================

const getMyJobs = async (req, res) => {
  try {
    const jobs = await Job.find({
      createdBy: req.user.id,
    })
      .populate("company", "name")
      .sort({ createdAt: -1 });

    const Application = require("../models/Application");

    const jobsWithApplicants = await Promise.all(
      jobs.map(async (job) => {
        const applicantCount =
          await Application.countDocuments({
            job: job._id,
          });

        return {
          ...job.toObject(),
          applicantCount,
        };
      })
    );

    res.status(200).json({
      success: true,
      count: jobsWithApplicants.length,
      jobs: jobsWithApplicants,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// UPDATE JOB
// ==========================================

const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    // Only job creator can update
    if (job.createdBy.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    Object.assign(job, req.body);

    await job.save();

    res.status(200).json({
      success: true,
      message: "Job updated successfully",
      job,
    });
  } catch (error) {
    console.log("Update Job Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// DELETE JOB
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

    // Only job creator can delete
    if (job.createdBy.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    await job.deleteOne();

    res.status(200).json({
      success: true,
      message: "Job deleted successfully",
    });
  } catch (error) {
    console.log("Delete Job Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// EXPORT
// ==========================================

module.exports = {
  createJob,
  getJobs,
  getJobById,
  getMyJobs,
  updateJob,
  deleteJob,
};