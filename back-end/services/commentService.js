const db = require("../models");
const Comment = db.Comment;
const Post = db.Post;
const User = db.User;

module.exports = {
  commentPost: async (req) => {
    try {
      const existingPost = await Post.findOne({
        where: {
          id: req.params.id,
          is_active: 1,
        },
      });

      if (!existingPost) {
        throw Error("Post not found");
      }

      const { text } = req.body;

      const result = await Comment.create({
        post_id: req.params.id,
        user_id: req.userId,
        text: text,
      });

      let response = {
        status: true,
        message: "Post successfully commented",
        data: result,
      };
      return [200, response];
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
  fetchCommentsPost: async (req) => {
    try {
      let comments = await Comment.findAll({
        include: { model: User, as: "user" },
        where: {
          post_id: req.params.id,
        },
      });
      let response = {
        status: true,
        message: "",
        data: comments,
      };
      return [200, response];
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
};
