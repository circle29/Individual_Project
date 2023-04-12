const db = require("../models");
const jwt = require("jsonwebtoken");
const product = db.Product; //diambil dari file models dan modelname
const user = db.User;
const merchant = db.Merchant;

module.exports = {
    addProducts: async (req, res) => {
        let token = req.headers.authorization;

        if (!token) {
            return res.status(400).send("token unauthorized or expired");
        }

        try {
            const { name, description, price, image, Category_id } = req.body;
            token = token.split(" ")[1]; //untuk mengambil token

            //mengambil id dari bearer token
            const verifiedUser = jwt.verify(token, "faud");
            console.log(verifiedUser);

            if (!name || !description || !price || !image || !Category_id)
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
};
