const Product = require("../models/products");

const getAllProducts = async (req, res) => {
    const { company, name, feature, sort, select } = req.query;
    const queryObject = {};

    if (company) {
        queryObject.company = company;
    }

    if (feature) {
        queryObject.feature = feature;
    }

    if (name) {
        queryObject.name = { $regex: name, $options: "i" };
    }

    let apiData = Product.find(queryObject);

    if (sort) {
        let sortFix = select.split(",").join(" ");
        apiData = apiData.sort(sortFix);
    }

    if (select) {
        // let selectFix = select.replace(",", " ");
        let selectFix = select.split(",").join(" ");
        apiData = apiData.select(selectFix);
    }

    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 3;

    let skip = (page - 1) * limit;

    apiData = apiData.skip(skip).limit(limit);

    console.log(queryObject);


    const myData = await apiData;
    res.status(200).json({ myData, nbHits: myData.length });
};

const getAllProductsTesting = async (req, res) => {
    console.log(req.query);
    const Products = await Product.find(req.query);
    res.status(200).json({ Products, nbHits: Products.length });
};

module.exports = { getAllProducts, getAllProductsTesting };