require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const ordersRoutes = require("./routes/orders");
const itemsRoutes = require("./routes/items");

const app = express();

app.use(express.json());
app.use(cors());

app.use(ordersRoutes);
app.use(itemsRoutes);

mongoose.connect(process.env.MONGO_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
    .then(() => app.listen(process.env.PORT || 8000, () => {
        console.log("Server is running!");
    }))
    .catch((err) => console.log(err));

