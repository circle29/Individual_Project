const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const user = db.User;
const nodemailer = require("../helpers/nodemailer");
const { Op } = require("sequelize");
const fs = require("fs");
const handlebars = require("handlebars");
const transporter = require("../middleware/transporter");

module.exports = {
  register: async (req) => {
    try {
      const { username, email, password, password_confirmation } = req.body;

      // console.log(req.body);

      const isUserAlreadyExist = await user.findOne({
        where: {
          [Op.or]: [{ email }, { username }],
        },
      });
      console.log(isUserAlreadyExist);

      if (isUserAlreadyExist) {
        return [409, "Username or Email Already Exist!"];
      }

      if (!username || !email || !password)
        throw "please complete all your data";

      if (password !== password_confirmation) throw "Password does not match!";

      const passwordRegex =
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[0-9a-zA-Z!@#$%^&*()_+]{8,}$/;
      if (!passwordRegex.test(password))
        throw "Password must contain at least 8 characters including an uppercase letter, a symbol, and a number";

      const salt = await bcrypt.genSalt(10);
      const hashPass = await bcrypt.hash(password, salt);

      const result = await user.create({
        username,
        email,
        password: hashPass,
      });

      let payload = { id: result.id };
      const token = jwt.sign(payload, "auth", { expiresIn: "1h" });

      const link = `http://localhost:3000/auth/verification/${token}`;

      const tempEmail = fs.readFileSync(
        "./template/emailVerification.html",
        "utf-8"
      );
      const tempCompile = handlebars.compile(tempEmail);
      const tempResult = tempCompile({ link });

      let emailResponse = await nodemailer.sendMail({
        from: `Admin <mini.project.socmed@gmail.com>`,
        to: `${email}`,
        subject: `Verified your account`,
        html: tempResult,
      });

      console.log(emailResponse);
      console.log(emailResponse.accepted);

      let response = {};
      if (emailResponse.accepted && emailResponse.accepted.length > 0) {
        // Success
        response = {
          status: true,
          data: result,
          message: "register success",
        };
      } else {
        // Failed
        response = {
          status: false,
          data: result,
          message: "register success, failed to send email",
        };
      }

      return [200, response];
    } catch (err) {
      return [400, err];
    }
  },

  verification: async (token) => {
    try {
      const data = jwt.verify(token, "auth");
      const update = await user.update(
        { is_verified: true },
        { where: { id: data.id } }
      );

      let response = {
        status: true,
        data: update,
        message: "Your account is verified",
      };
      return [200, response];
    } catch (err) {
      console.log(err);
      return [400, err];
    }
  },

  login: async (req, res) => {
    try {
      const { emailOrUsername, password } = req.body;

      if (!emailOrUsername || !password) throw "please complete all your data";

      const userExist = await user.findOne({
        where: {
          [Op.or]: [{ email: emailOrUsername }, { username: emailOrUsername }],
        },
      });

      if (!userExist)
        throw {
          status: false,
          message: "User not found",
        };

      const isvalid = await bcrypt.compare(password, userExist.password);

      if (!isvalid)
        throw {
          status: false,
          message: "Wrong password",
        };

      const payload = {
        id: userExist.id,
        merchant_status: userExist.mer,
      };
      const token = jwt.sign(payload, "auth", { expiresIn: "1h" });

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
