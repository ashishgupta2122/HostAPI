const express = require("express");
const dotenv = require("dotenv");
const dbConnect = require('./db/dbConnect')

// Load environment variables from .env file
dotenv.config();

const app = express();

const products_routes = require("./routes/products");

app.get("/", (req, res) => {
    res.status(200).send('Ok from server');
});

app.use("/api/products", products_routes);

const PORT = process.env.PORT || 4001;
dbConnect();
app.listen(PORT, () => {
    console.log(`listening on port: ${PORT}`);
});
