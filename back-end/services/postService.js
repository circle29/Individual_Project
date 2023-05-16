const db = require("../models");
const { Op } = require("sequelize");
const Post = db.Post;
const Comment = db.Comment;
const User = db.User;
const Like = db.Like;

module.exports = {
  createPostService: async (req) => {
    try {
      const { caption } = req.body;
      // console.log(req.file);
      const newPost = await Post.create({
        image: "localhost:2000/uploads/" + req.file.filename,
        caption: caption,
        user_id: req.userId,
        is_active: 1,
      });

      let response = {
        status: true,
        message: "",
        data: newPost,
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

  fetchPostsService: async (req) => {
    try {
      let posts = await Promise.all(
        (
          await Post.findAll({
            include: { model: User, as: "user" },
            where: {
              is_active: true,
            },
            order: [["createdAt", "DESC"]],
          })
        ).map(async (item) => {
          item.setDataValue(
            "like_count",
            await Like.count({
              where: {
                post_id: item.id,
              },
            })
          );
          console.log("asd");
          item.setDataValue(
            "is_liked",
            (await Like.count({
              where: {
                post_id: item.id,
                user_id: item.user.id,
              },
            })) > 0
          );
          item.setDataValue(
            "comment",
            await Comment.findAll({
              where: {
                post_id: item.id,
              },
              limit: 5,
            })
          );
          return item;
        })
      );
      let response = {
        status: true,
        message: "",
        data: posts,
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

  postDetailService: async (req) => {
    try {
      let post = await Post.findOne({
        include: { model: User, as: "user" },
        where: {
          id: req.params.id,
          is_active: true,
        },
      });
      if (post) {
        await post.setDataValue(
          "like_count",
          await Like.count({
            where: {
              post_id: post.id,
            },
          })
        );

        await post.setDataValue(
          "is_liked",
          (await Like.count({
            where: {
              post_id: post.id,
              user_id: post.user.id,
            },
          })) > 0
        );
      }
      let response = {
        status: true,
        message: "",
        data: post,
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

  deletePostService: async (req) => {
    try {
      await Post.update(
        { is_active: false },
        {
          where: {
            id: req.params.id,
          },
        }
      );

      let response = {
        status: true,
        message: "",
        data: null,
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

  updatePostService: async (req) => {
    try {
      await Post.update(req.body, {
        where: { id: req.params.id },
      });

      let response = {
        status: true,
        message: "",
        data: null,
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
