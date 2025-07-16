const multer = require("multer");
const path = require("path");


const fs = require("fs");
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}


const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + " - " + file.originalname)
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpg|png|jpeg|gif/;
  const ext = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mime = allowedTypes.test(file.mimetype);

  if (ext && mime) {
    cb(null, true);
  } else {
    cb(new Error("only images with extension jpg, png, jpeg and gif are allowed "));
  }
};

const limits = {
  fileSize: 25 * 1024 * 1024,
};

module.exports = multer({ storage, fileFilter, limits });