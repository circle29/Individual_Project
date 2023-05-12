const router = require("express").Router();
const { transactionControllers } = require("../controllers");

router.post("/add", transactionControllers.createTransaction);

module.exports = router;
