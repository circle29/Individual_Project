"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Merchant extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Merchant.belongsTo(models.User, {
                foreignKey: {
                    name: "user_id",
                },
            });
            Merchant.hasMany(models.Product, {
                foreignKey: {
                    name: "merchant_id",
                },
            });
        }
    }
    Merchant.init(
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: "name",
            },
            address: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: "Merchant",
        }
    );
    return Merchant;
};
