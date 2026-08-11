const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/Cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "jobhub_profiles",
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

const uploadProfile = multer({ storage });

module.exports = uploadProfile;