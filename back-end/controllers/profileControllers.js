const {
  edit,
  sendVerification,
  get,
} = require("../services/profileService.js");
const multer = require("multer");
const path = require("path");

//setup multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    let fileName =
      path.parse(file.originalname).name +
      "-" +
      Date.now() +
      path.extname(file.originalname);
    req.body.filePath = fileName;
    cb(null, fileName);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only PNG, JPG, and JPEG allowed."));
    }
  },
}).fields([{ name: "image", maxCount: 1 }]);

const editUser = async (request, response) => {
  upload(request, response, async (err) => {
    if (err) {
      console.log(err);
      return response.status(400).send(err.message);
    }

    const [statusCode, message] = await edit(request);

    return response.status(statusCode).send(message);
  });
};

const getUser = async (request, response) => {
  const [statusCode, message] = await get(request);

  return response.status(statusCode).send(message);
};

const sendVerificationUser = async (request, response) => {
  const [statusCode, message] = await sendVerification(request);

  return response.status(statusCode).send(message);
};

module.exports = { editUser, sendVerificationUser, getUser };
