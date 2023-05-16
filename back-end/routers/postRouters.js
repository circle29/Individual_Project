const router = require("express").Router();
const { postControllers } = require("../controllers");
const authorize = require("../middleware/authorize");

router.get("/", authorize.login, postControllers.fetchPosts);
router.get("/:id", authorize.login, postControllers.postDetails);
router.delete("/:id", authorize.login, postControllers.deletePost);
router.patch("/:id", authorize.login, postControllers.updatePost);
router.post("/", authorize.login, postControllers.createPost);

module.exports = router;
