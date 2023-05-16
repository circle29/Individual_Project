const router = require("express").Router();
const { profileControllers } = require("../controllers");
const authorize = require("../middleware/authorize");

router.post("/edit", authorize.login, profileControllers.editUser);

router.post(
  "/verify",
  authorize.login,
  profileControllers.sendVerificationUser
);

router.get("/show", authorize.login, profileControllers.getUser);

module.exports = router;
