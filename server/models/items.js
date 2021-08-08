const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    order_number: {
        type: String,
        required: true,
        ref: "Order"
    }
});

const item = mongoose.model("Item", itemSchema);

module.exports = item;