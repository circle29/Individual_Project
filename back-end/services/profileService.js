const db = require("../models");
const jwt = require("jsonwebtoken");
const user = db.User;
const nodemailer = require("../helpers/nodemailer");
const { Op } = require("sequelize");
const fs = require("fs");
const handlebars = require("handlebars");
const transporter = require("../middleware/transporter");

module.exports = {
  sendVerification: async (req) => {
    try {
      const user = req._user;

      let payload = { id: user.id };
      const token = jwt.sign(payload, "auth", { expiresIn: "1h" });

      user.verification_token = token;
      await user.save();

      const link = `http://localhost:3000/auth/verification/${token}`;

      const tempEmail = fs.readFileSync(
        "./template/emailVerification.html",
        "utf-8"
      );
      const tempCompile = handlebars.compile(tempEmail);
      const tempResult = tempCompile({ link });

      let emailResponse = await nodemailer.sendMail({
        from: `Admin <mini.project.socmed@gmail.com>`,
        to: `${user.email}`,
        subject: `Verified your account`,
        html: tempResult,
      });

      let response = {};
      if (emailResponse.accepted && emailResponse.accepted.length > 0) {
        response = {
          status: true,
          data: null,
          message: "Verification link sent",
        };
      } else {
        response = {
          status: false,
          data: null,
          message: "Failed to send email",
        };
      }

      return [200, response];
    } catch (err) {
      console.log(err);
      let response = {
        status: false,
        message: err.message,
        data: null,
      };
      return [400, response];
    }
  },

  edit: async (req) => {
    try {
      const { username, full_name, bio, filePath } = req.body;
      const { image } = req;

      const oldUser = req._user;

      if (!username) throw Error("Username must be filled");

      const userExist = await user.findOne({
        where: {
          username: username,
        },
      });

      if (userExist && oldUser.id != userExist.id) {
        throw Error("Username is already been taken");
      }

      if (!oldUser.is_verified) {
        throw Error("Please verify your account");
      } else {
        oldUser.username = username;
        oldUser.full_name = full_name;
        oldUser.bio = bio;
        oldUser.image = "localhost:2000/uploads/" + filePath;
        await oldUser.save();

        let response = {
          status: true,
          message: "Update success",
          data: oldUser,
        };

        return [200, response];
      }
    } catch (err) {
      console.log(err);
      let response = {
        status: false,
        message: err.message,
        data: null,
      };
      return [400, response];
    }
  },

  get: async (req) => {
    try {
      const user = req._user;

      let response = {
        status: true,
        data: user,
        message: "",
      };

      return [200, response];
    } catch (err) {
      console.log(err);
      let response = {
        status: false,
        message: err.message,
        data: null,
      };
      return [400, response];
    }
  },
};
