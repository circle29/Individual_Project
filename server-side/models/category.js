"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Category extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Category.hasOne(models.Product, {
                foreignKey: {
                    name: "Category_id",
                },
            });
        }
    }
    Category.init(
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: "name",
            },
        },
        {
            sequelize,
            modelName: "Category",
            timestamps: false,
        }
    );
    return Category;
};
