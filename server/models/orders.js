const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    order_number: {
        type: String,
        required: true,
        unique: true
    },
    customer_name: {
        type: String,
        required: true
    },
    order_date: {
        type: Date,
        required: true
    },
    summary_amount: {
        type: Number,
        required: true
    }
});

const order = mongoose.model("Order", orderSchema);

module.exports = order;