const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: [{
            // Define the type of each element in the array
            type: mongoose.Schema.Types.Mixed,
            required: true
        }],
    },
    feature: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    },
    rating: {
        type: Number,
        default: 4.8,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    company: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Product", productSchema);