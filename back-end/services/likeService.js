const { response } = require("express");
const db = require("../models");
const comment = db.Comment;
const Post = db.Post;
const Like = db.Like;

module.exports = {
  likeService: async (req) => {
    try {
      const post = await Post.findOne({
        where: {
          id: req.params.id,
          is_active: true,
        },
      });

      if (!post) {
        throw Error("Post not found");
      }

      // mengecek apakah user sudah like postnya
      const like = await Like.findOne({
        where: {
          post_id: req.params.id,
          user_id: req.userId,
        },
      });

      if (like) {
        throw Error("Post has already been liked");
      }

      // menambah likes ke database
      await Like.create({
        post_id: req.params.id,
        user_id: req.userId,
      });

      let response = {
        status: true,
        message: "Post liked",
        data: {
          is_liked: true,
        },
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
  unlikeService: async (req) => {
    try {
      await Like.destroy({
        where: {
          post_id: req.params.id,
          user_id: req.userId,
        },
      });

      let response = {
        status: true,
        message: "Post unliked",
        data: {
          is_liked: false,
        },
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
