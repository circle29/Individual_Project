const db = require("../models");
const post = db.Post;
const multer = require("multer");
const path = require("path");
const {
  createPostService,
  fetchPostsService,
  postDetailService,
  deletePostService,
  updatePostService,
} = require("../services/postService.js");

//setup multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      path.parse(file.originalname).name +
        "-" +
        Date.now() +
        path.extname(file.originalname)
    );
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
}).single("image");

module.exports = {
  createPost: async (request, response) => {
    try {
      upload(request, response, async (err) => {
        if (err) {
          console.log(err);
          throw err;
        }
        const [statusCode, message] = await createPostService(request);
        return response.status(statusCode).send(message);
      });
    } catch (err) {
      let response = {
        status: false,
        message: err.message,
        data: null,
      };

      console.log(err);
      return [400, response];
    }
  },
  fetchPosts: async (request, response) => {
    const [statusCode, message] = await fetchPostsService(request);
    return response.status(statusCode).send(message);
  },

  postDetails: async (request, response) => {
    const [statusCode, message] = await postDetailService(request);
    return response.status(statusCode).send(message);
  },
  deletePost: async (request, response) => {
    const [statusCode, message] = await deletePostService(request);
    return response.status(statusCode).send(message);
  },

  updatePost: async (request, response) => {
    const [statusCode, message] = await updatePostService(request);
    return response.status(statusCode).send(message);
  },
};
