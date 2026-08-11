const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/Cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    if (file.mimetype === "application/pdf") {
      return {
        folder: "jobhub_resumes",
        resource_type: "raw",
      };
    }

    return {
      folder: "jobhub_images",
        allowed_formats: ["jpg", "jpeg", "png"],
    };
  },
});

const upload = multer({ storage });

module.exports = upload;