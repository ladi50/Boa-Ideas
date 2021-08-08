const router = require("express").Router();
const itemsController = require("../controllers/items");

router.get("/order/:orderId", itemsController.getOrder);

module.exports = router;