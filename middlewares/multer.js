const multer = require("multer");

// const storage = multer.diskStorage({
//   // destination: "uploads/", // // stock in local
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

// const upload = multer({ Storage: storage });

const upload = multer({Storage : multer.memoryStorage()})

module.exports = upload;
