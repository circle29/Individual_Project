"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Comment.belongsTo(models.Post, {
        foreignKey: {
          name: "post_id",
        },
      });
      Comment.belongsTo(models.User, {
        foreignKey: {
          name: "user_id",
        },
        as: "user",
      });
    }
  }
  Comment.init(
    {
      text: {
        type: DataTypes.STRING(300),
        allowNull: false,
        validate: {
          len: [1, 300],
        },
      },
    },
    {
      sequelize,
      modelName: "Comment",
    }
  );
  return Comment;
};
