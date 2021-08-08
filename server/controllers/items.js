const Item = require("../models/items");
const Order = require("../models/orders");

exports.getOrder = async (req, res) => {
    const { orderId } = req.params;

    let order;
    let items;

    try {
        order = await Order.findById(orderId);

        items = await Item.find({ order_number: order.order_number });
    } catch (err) {
        res.status(500).json(err.stack);
    }

    res.status(200).json(items);
};