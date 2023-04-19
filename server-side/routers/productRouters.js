const router = require("express").Router();
const { productControllers } = require("../controllers");

router.post("/add", productControllers.addProducts);
router.get("/show", productControllers.showProducts);
// router.get("/pages", productControllers.paginationProducts);
router.get("/details/:id", productControllers.productDetails);

module.exports = router;
