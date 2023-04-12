const router = require("express").Router();
const { merchantControllers } = require("../controllers");

router.post("/register", merchantControllers.register);

module.exports = router;
