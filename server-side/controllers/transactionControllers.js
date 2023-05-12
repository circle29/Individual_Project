const jwt = require("jsonwebtoken");
const db = require("../models");
const product = db.Product;
const transDetail = db.Transaction_detail;
const transHead = db.Transaction_header;
const user = db.User;

module.exports = {
    createTransaction: async (req, res) => {
        let token = req.headers.authorization;

        if (!token) {
            return res.status(400).send("token unauthorized or expired");
        }

        try {
            token = token.split(" ")[1]; //untuk mengambil token
            const verifiedUser = jwt.verify(token, "faud");

            const userExist = await user.findOne({
                where: {
                    id: verifiedUser.id,
                },
            });

            const { cart } = req.body;
            const totalPrice = cart.reduce((total, product) => {
                return (
                    total + product + product.product_price * product.quantity
                );
            }, 0);

            const transactionHeader = await transHead.create({
                total_price: totalPrice,
                date: new Date(),
                user_id: userExist.id,
            });

            const newTransactions = await transDetail.bulkCreate(
                cart.map((product) => {
                    return {
                        quantity: product.quantity,
                        product_name: product.product_name,
                        product_price: product.product_price,
                        ProductId: product.ProductId,
                        TransactionHeaderId: transactionHeader.id,
                    };
                })
            );

            res.status(200).send({
                status: true,
                message: "Transaction sucessfully created",
                data: {
                    Transaction_Header: transactionHeader,
                    Transaction_Details: newTransactions,
                },
            });
        } catch (err) {
            console.log(err);
            res.status(400).send(err);
        }
    },
};
