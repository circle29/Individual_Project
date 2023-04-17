const db = require("../models");
const jwt = require("jsonwebtoken");
const product = db.Product; //diambil dari file models dan modelname
const user = db.User;
const merchant = db.Merchant;
const category = db.Category;

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
        const result = await product.findAll({
            attributes: [
                "id",
                "name",
                "description",
                "price",
                "stock",
                "image",
                "Category_id",
                "merchant_id",
            ],
        });
        res.status(200).send({
            status: true,
            result,
        });
    },
    catch(err) {
        console.log(err);
        res.status(400).send(err);
    },
    productDetails: async (req, res) => {
        try {
            const query = `SELECT database_tokopedia.Products.id, database_tokopedia.Products.name AS product_name, database_tokopedia.Products.description,
            database_tokopedia.Products.price, database_tokopedia.Products.image, database_tokopedia.Products.stock, database_tokopedia.Categories.id AS category_id,
            database_tokopedia.Categories.name AS category, database_tokopedia.Merchants.id AS merchant_id, database_tokopedia.Merchants.name AS merchant_name,
            database_tokopedia.Merchants.address FROM database_tokopedia.Products
            INNER JOIN database_tokopedia.Categories ON database_tokopedia.Products.Category_id = database_tokopedia.Categories.id
            INNER JOIN database_tokopedia.Merchants ON database_tokopedia.Products.merchant_id = database_tokopedia.Merchants.id
            WHERE database_tokopedia.Products.id = ${req.params.id};`;
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
    paginationProducts: async (req, res) => {
        const result = await product.findAll({
            include: [
                {
                    model: merchant,
                    attributes: ["name"],
                },
                {
                    model: category,
                    attributes: ["name"],
                },
            ],
            limit: 9,
            offset: (req.query.page - 1) * 9,
        });
        res.status(200).send({
            status: true,
            result,
        });
    },
};
