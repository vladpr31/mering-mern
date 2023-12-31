const { GridFsStorage } = require("multer-gridfs-storage");
const path = require("path");
const crypto = require("crypto");
require("dotenv").config();

const multer = require("multer");
const url = process.env.MONGODB_URI;

const storage = new GridFsStorage({
  url,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "photos",
        };
        resolve(fileInfo);
      });
    });
  },
});
const upload = multer({ storage });

module.exports = { upload };
