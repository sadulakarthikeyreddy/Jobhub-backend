const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/Cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "jobhub_resumes",
    resource_type: "raw",
    allowed_formats: ["pdf"],
  },
});

const uploadResume = multer({
  storage,
});

module.exports = uploadResume;