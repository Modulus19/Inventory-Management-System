const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../Config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "NAPEX", // Folder name in Cloudinary
    allowed_formats: ["jpg", "jpeg", "png", "gif"], // Allowed file formats
    transformation: [{ width: 500, height: 500, crop: "limit" }], // Optional transformation
  },
});

const upload = multer({ storage: storage });

module.exports = upload;