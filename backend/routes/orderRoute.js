const express = require("express");
const authMiddleware = require("../middleware/authMiddleware.js");
const { placeOrder, getOrders } = require("../controller/orderController.js");

const router = express.Router();

router.route("/").post(authMiddleware, placeOrder);

router.route("/orders").get(authMiddleware, getOrders);

module.exports = router;
