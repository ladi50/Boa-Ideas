const Shopify = require('shopify-api-node');
const Order = require("../models/orders");
const Item = require("../models/items");

exports.getOrders = async (req, res) => {
    let orders;
    const ordersArray = [];
    let itemsQty = 0;

    try {
        const shopify = new Shopify({
            shopName: process.env.SHOPIFY_STORE_NAME,
            apiKey: process.env.SHOPIFY_API_KEY,
            password: process.env.SHOPIFY_PASSWORD
        });

        orders = await shopify.order.list();

        for (const item of orders) {
            const foundOrder = await Order.findOne({ order_number: item.order_number });

            for (const listItem of item.line_items) {
                itemsQty += listItem.quantity;
            }

            if (!foundOrder) {
                const order = new Order({
                    order_number: item.order_number,
                    customer_name: item.customer.first_name + " " + item.customer.last_name,
                    order_date: item.created_at,
                    summary_amount: item.total_price
                });
                await order.save();

                for (const listItem of item.line_items) {
                    const lineItem = new Item({
                        title: listItem.title,
                        price: listItem.price,
                        order_number: item.order_number
                    });
                    await lineItem.save();
                }

                await ordersArray.push({ ...order._doc, itemsQty });
            } else {
                await ordersArray.push({ ...foundOrder._doc, itemsQty });
            }
        }
    } catch (err) {
        res.status(500).json(err.stack);
    }

    res.status(200).json({ orders: ordersArray });
};