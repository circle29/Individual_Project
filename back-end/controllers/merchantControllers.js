const db = require("../models");
const jwt = require("jsonwebtoken");
const merchant = db.Merchant;
const user = db.User;
const product = db.Product;
const category = db.Category;

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
      const verifiedUser = jwt.verify(token, "auth");
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
          message: "Successfully registered as a merchant, please relog.",
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
  // merchantProducts: async (req, res) => {
  //     try {
  //         const result = await product.findAll({
  //             where: { merchant_id: req.params.id },
  //             include: [
  //                 {
  //                     model: merchant,
  //                 },
  //                 {
  //                     model: category,
  //                     attributes: ["name"],
  //                 },
  //             ],
  //         });
  //         res.status(200).send({
  //             status: true,
  //             result,
  //         });
  //     } catch (err) {
  //         console.log(err);
  //         res.status(400).send(err);
  //     }
  // },
  merchantProducts: async (req, res) => {
    try {
      const query = `SELECT Products.id, Products.name AS product_name, Products.description, Products.price, Products.image, Products.stock,
            Categories.id AS category_id, Categories.name AS category,
            Merchants.id AS merchant_id, Merchants.name AS merchant_name, Merchants.address
            FROM Products
            INNER JOIN Categories ON Products.Category_id = Categories.id
            INNER JOIN Merchants ON Products.merchant_id = Merchants.id
            WHERE Products.merchant_id = ${req.params.id};
            `;
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
};
