const router = require("express").Router();
const { commentControllers } = require("../controllers");
const authorize = require("../middleware/authorize");

router.get("/post/:id", authorize.login, commentControllers.fetchComment);
router.post("/:id", authorize.login, commentControllers.comment);

module.exports = router;
