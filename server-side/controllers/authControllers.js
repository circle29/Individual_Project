const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const user = db.User;

module.exports = {
    register: async (req, res) => {
        try {
            const {
                username,
                email,
                phone_number,
                password,
                password_confirmation,
            } = req.body;

            console.log(req.body);

            if (!username || !email || !phone_number || !password)
                throw "please complete your data";

            if (password !== password_confirmation)
                throw "Password does not match";

            const salt = await bcrypt.genSalt(10);
            const hashPass = await bcrypt.hash(password, salt);

            const result = await user.create({
                username,
                email,
                phone_number,
                password: hashPass,
            });

            res.status(200).send({
                status: true,
                data: result,
                message: "register success",
            });
        } catch (err) {
            console.log(err);
            res.status(400).send(err);
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            if (!email || !password) throw "please complete your data";

            const userExist = await user.findOne({
                where: {
                    email,
                },
            });

            if (!userExist)
                throw {
                    status: false,
                    message: "User not found",
                };

            //mengcompare password yang diinput dengan password yang ada di database
            const isvalid = await bcrypt.compare(password, userExist.password);

            if (!isvalid)
                throw {
                    status: false,
                    message: "Wrong password",
                };

            //payload adalah data data yang akan disimpan didalam token
            const payload = {
                id: userExist.id,
                merchant_status: userExist.mer,
            };
            const token = jwt.sign(payload, "faud", { expiresIn: "1h" });

            res.status(200).send({
                status: true,
                message: "login success",
                data: userExist,
                token,
            });
        } catch (err) {
            console.log(err);
            res.status(400).send(err);
        }
    },
};
