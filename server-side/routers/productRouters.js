const router = require("express").Router();
const { productControllers } = require("../controllers");

router.post("/add", productControllers.addProducts);

module.exports = router;
