"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Transaction_detail extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Transaction_detail.belongsTo(models.Product, {
                foreignKey: {
                    name: "product_id",
                },
            });
            Transaction_detail.belongsTo(models.Transaction_header, {
                foreignKey: {
                    name: "transaction_header_id",
                },
            });
        }
    }
    Transaction_detail.init(
        {
            quantity: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            product_name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            product_price: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: "Transaction_detail",
        }
    );
    return Transaction_detail;
};
