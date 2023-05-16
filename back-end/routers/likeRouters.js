const router = require("express").Router();
const { likeControllers } = require("../controllers");
const authorize = require("../middleware/authorize");

router.post("/:id", authorize.login, likeControllers.like);
router.delete("/:id", authorize.login, likeControllers.unlike);

module.exports = router;
