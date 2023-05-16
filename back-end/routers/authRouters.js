const router = require("express").Router();
const { authControllers } = require("../controllers");

router.post("/register", authControllers.registerAuth);
router.post("/login", authControllers.loginAuth);
router.post("/verification", authControllers.verificationAuth);

module.exports = router;
