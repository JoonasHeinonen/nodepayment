const Product = require('../models/product');

const getProductParams = body => {
        return {
            productName: body.productName,
            productPrice: {
                major: body.major,
                minor: body.minor,
            },
            productDescription: body.productDescription,
            productImage: body.productImage,
        };
    };


module.exports = {
    index: (req, res, next) => {
        Product.find()
            .then(products => {
                res.locals.products = products;
                next();
        })
        .catch(error => {
            console.log(`Error fetching products: ${error.message}`);
            next(error);
        });
    },

    indexView: (req, res, next) => {
        res.render('products/products');
    },

    show: (req, res, next) => {
        let productId = req.params.id;

        Product.findById(productId)
            .then(product => {
                res.locals.product = product;
                console.log(product);
                next();
            })
            .catch(error => {
                console.log(`Error fetching product by ID: ${error.message}`);
                next(error);
            });
    },

    showView: (req, res, next) => {
        res.render('products/show');
    },

    create: (req, res, next) => {
        if (req.skip) next();
        let newProduct = new User(getProductParams(req.body));
    },
}