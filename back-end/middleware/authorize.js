const jwt = require("jsonwebtoken");
const db = require("../models");
const user = db.User;

module.exports = {
  login: async (req, res, next) => {
    try {
      let token = req.headers.authorization;
      if (!token)
        throw {
          message: "Unauthorized",
        };
      token = token.split(" ")[1];

      const verifiedUser = jwt.verify(token, "auth");
      console.log(verifiedUser);

      const userExist = await user.findOne({
        where: {
          id: verifiedUser.id,
        },
      });

      req.userId = userExist.id;
      req._user = userExist;

      next();
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
};
