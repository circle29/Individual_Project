const db = require("../models");
const jwt = require("jsonwebtoken");
const merchant = db.Merchant;
const user = db.User;

module.exports = {
    register: async (req, res) => {
        let token = req.headers.authorization;

        if (!token) {
            return res.status(400).send("token unauthorized or expired");
        }

        try {
            const { name, address } = req.body;
            token = token.split(" ")[1]; //untuk mengambil token

            //mengambil id dari bearer token
            const verifiedUser = jwt.verify(token, "faud");
            console.log(verifiedUser);

            if (!name || !address) throw "please complete your data";

            //mengecek apakah user sudah menjadi merchant atau belum dari database user
            const userExist = await user.findOne({
                where: {
                    id: verifiedUser.id,
                },
            });

            if (userExist.merchant_status === false) {
                const result = await merchant.create({
                    user_id: verifiedUser.id,
                    ...req.body,
                });
                res.status(200).send({
                    status: true,
                    data: result,
                    message: "successfully registered as a merchant",
                });
            } else {
                throw "one account can only have one merchant";
            }

            //mengupdate database user, agar merchant statusnya berubah
            await user.update(
                {
                    merchant_status: true,
                },
                {
                    where: {
                        id: verifiedUser.id,
                    },
                }
            );
        } catch (err) {
            console.log(err);
            res.status(400).send(err);
        }
    },
};
