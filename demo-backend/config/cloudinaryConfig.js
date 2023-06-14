const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

//configure cloudinary
cloudinary.config({
  cloud_name: "ygzmslsj",
  api_key: "737868815614454",
  api_secret: "vREe7ekUv_dRtnkxpalEuiuD_3I",
});

//configure cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "wal",
    public_id: (req, file) => Date.now() + "-photo",
  },
});

//export storage
module.exports = storage;