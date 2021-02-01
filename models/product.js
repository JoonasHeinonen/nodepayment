const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var productSchema = new Schema({
    productName: {
        type: String,
    },
    productPrice: {
        major: {
            type: Number,
        },
        minor: {
            type: Number,
        },
    },
    productDescription: {
        type: String,
    },
    productImage: {
        data: Buffer,
        contentType: String
    },
    productQuantity: {
        type: Number
    }
});

module.exports = mongoose.model("Product", productSchema);