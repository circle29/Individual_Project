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

      const isUserAlreadyExist = await user.findOne({
        where: {
          [Op.or]: [{ email }, { username }],
        },
      });

      if (isUserAlreadyExist) {
        throw Error("Username or Email Already Exist!");
      }

      if (!username || !email || !password)
        throw Error("please complete all your data");

      if (password !== password_confirmation)
        throw Error("Password does not match!");

      const passwordRegex =
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[0-9a-zA-Z!@#$%^&*()_+]{8,}$/;
      if (!passwordRegex.test(password))
        throw Error(
          "Password must contain at least 8 characters including an uppercase letter, a symbol, and a number"
        );

      const salt = await bcrypt.genSalt(10);
      const hashPass = await bcrypt.hash(password, salt);

      const result = await user.create({
        username,
        email,
        password: hashPass,
      });

      let payload = { id: result.id };
      const token = jwt.sign(payload, "auth", { expiresIn: "24h" });

      const newToken = await user.update(
        { verification_token: token },
        {
          where: {
            id: result.id,
          },
        }
      );

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
        response = {
          status: true,
          data: result,
          message: "register success",
        };
      } else {
        response = {
          status: true,
          data: result,
          message: "register success, failed to send email",
        };
      }

      return [200, response];
    } catch (err) {
      let response = {
        status: false,
        message: err.message,
        data: null,
      };

      console.log(err);
      return [400, response];
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
      let response = {
        status: false,
        message: err.message,
        data: null,
      };

      console.log(err);
      return [400, response];
    }
  },

  login: async (req, res) => {
    try {
      const { emailOrUsername, password } = req.body;

      if (!emailOrUsername || !password)
        throw Error("please complete all your data");

      const userExist = await user.findOne({
        where: {
          [Op.or]: [{ email: emailOrUsername }, { username: emailOrUsername }],
        },
      });

      if (!userExist) throw Error("User not found");

      const isvalid = await bcrypt.compare(password, userExist.password);

      if (!isvalid) throw Error("Wrong password");

      const payload = {
        id: userExist.id,
        is_verified: userExist.is_verified,
      };
      const token = jwt.sign(payload, "auth", { expiresIn: "1h" });

      //mengambil id dari bearer token
      const verifiedUser = jwt.verify(token, "auth");

      //pengecekan verifikasi
      let response = {
        status: true,
        message: "Login success",
        data: userExist,
        token,
      };
      return [200, response];
    } catch (err) {
      let response = {
        status: false,
        message: err.message,
        data: null,
      };

      console.log(err);
      return [400, response];
    }
  },
};
