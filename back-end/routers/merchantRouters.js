const router = require("express").Router();
const { merchantControllers } = require("../controllers");

router.post("/register", merchantControllers.register);
router.get("/myProducts/:id", merchantControllers.merchantProducts);

module.exports = router;
