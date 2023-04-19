const db = require("../models");
const jwt = require("jsonwebtoken");
const product = db.Product; //diambil dari file models dan modelname
const user = db.User;
const merchant = db.Merchant;
const category = db.Category;
const { Op } = require("sequelize");

module.exports = {
    addProducts: async (req, res) => {
        let token = req.headers.authorization;

        if (!token) {
            return res.status(400).send("token unauthorized or expired");
        }

        try {
            const { name, description, price, stock, image, Category_id } =
                req.body;
            token = token.split(" ")[1]; //untuk mengambil token

            //mengambil id dari bearer token
            const verifiedUser = jwt.verify(token, "faud");
            console.log(verifiedUser);

            if (
                !name ||
                !description ||
                !price ||
                !stock ||
                !image ||
                !Category_id
            )
                throw "please complete your data";

            //mengecek apakah user sudah menjadi merchant atau belum dari database user
            const userExist = await user.findOne({
                where: {
                    id: verifiedUser.id,
                },
            });

            //mengecek merchant
            const merchantExist = await merchant.findOne({
                where: {
                    user_id: verifiedUser.id,
                },
            });

            if (userExist.merchant_status) {
                const result = await product.create({
                    merchant_id: merchantExist.id,
                    ...req.body,
                });
                res.status(200).send({
                    status: true,
                    data: result,
                    message: "successfully adding a product to the market",
                });
            } else {
                throw "you need to be a merchant to sell an item";
            }
        } catch (err) {
            console.log(err);
            res.status(400).send(err);
        }
    },
    showProducts: async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const pageSize = 9;

            const categoryId = parseInt(req.query.category) || null;
            const productName = req.query.name || null;

            const categoryQuery = categoryId ? { Category_id: categoryId } : {};
            const productQuery = productName
                ? { name: { [Op.like]: "%" + productName + "%" } }
                : {};

            const result = await product.findAll({
                where: {
                    ...categoryQuery,
                    ...productQuery,
                },
                order: [[req.query.order, req.query.sort]], // order by ... desc/asc
                limit: pageSize,
                offset: (page - 1) * pageSize,
            });
            res.status(200).send({
                status: true,
                result,
            });
        } catch (err) {
            console.log(err);
            res.status(400).send(err);
        }
    },
    productDetails: async (req, res) => {
        try {
            const query = `SELECT Products.id, Products.name AS product_name, Products.description, Products.price, Products.image, Products.stock,
            Categories.id AS category_id, Categories.name AS category,
            Merchants.id AS merchant_id, Merchants.name AS merchant_name, Merchants.address 
            FROM Products
            INNER JOIN Categories ON Products.Category_id = Categories.id
            INNER JOIN Merchants ON Products.merchant_id = Merchants.id
            WHERE Products.id = ${req.params.id};`;
            const [results] = await db.sequelize.query(query);
            res.status(200).send({
                status: true,
                results,
            });
        } catch (err) {
            console.log(err);
            res.status(400).send(err);
        }
    },
    // ProductDetails: async (req, res) => {
    //     const result = await product.findOne({
    //         where: { id: req.params.id },
    //         include: [
    //             {
    //                 model: merchant,
    //                 attributes: ["name"],
    //             },
    //             {
    //                 model: category,
    //                 attributes: ["name"],
    //             },
    //         ],
    //     });
    //     res.status(200).send({
    //         status: true,
    //         result,
    //     });
    // },
    //     paginationProducts: async (req, res) => {
    //         const result = await product.findAll({
    //             include: [
    //                 {
    //                     model: merchant,
    //                     attributes: ["name"],
    //                 },
    //                 {
    //                     model: category,
    //                     attributes: ["name"],
    //                 },
    //             ],
    //             limit: 9,
    //             offset: (req.query.page - 1) * 9,
    //         });
    //         res.status(200).send({
    //             status: true,
    //             result,
    //         });
    //     },
};
