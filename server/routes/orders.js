const router = require("express").Router();
const ordersController = require("../controllers/orders");

router.get("/orders", ordersController.getOrders);

module.exports = router;