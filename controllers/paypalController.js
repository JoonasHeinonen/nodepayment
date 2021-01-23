const client_id = process.env.PAYPAL_CLIENT_ID;
const client_secret = process.env.PAYPAL_CLIENT_SECRET;

const paypal = require('paypal-rest-sdk');
const dotenv = require('dotenv');

dotenv.config();

paypal.configure({
    'mode': 'sandbox',
    'client_id': client_id,
    'client_secret': client_secret
});

module.exports = {
    indexView: (req, res, next) => {
        res.render('../views/paypal/index.pug');
    },

    buyView: (req, res, next) => {
        let payment = {
            'intent': 'authorize',
            'payer': {
                'payment_method': 'paypal'
            },
            'redirect_urls': {
                'return_url': 'http://127.0.0.1:8000/paypal/buy.pug',
                'cancel_url': 'http://127.0.0.1:8000/paypal/error.pug'
            },
            'transactions': [
                    {
                    'amount': {
                        'total': 5.00,
                        'currency': 'EUR'
                    },
                    'description': 'Sample charge'
                }
            ]
        }

        createPay(payment)
            .then((transaction) => {

                let id = transaction.id;
                let links = transaction.links;
                let counter = links.length;

                console.log(id + ' - ' + links + ' - ' + counter);


                while(counter--) {
                    if (links[counter].method == 'REDIRECT') {
                        // Redirect the user to Paypal to approve transaction
                        return res.redirect(links[counter].href);
                    }
                }
            })
            .catch((error) => {
                console.log(error);
                res.redirect('/paypal/error');
            });
    },

    error: (req, res, next) => {
        console.log(req.query);
        res.render('../views/paypal/error.pug');
    },

    success: (req, res, next) => {
        console.log(req.query);
        res.render('../views/paypal/success.pug');
    }
}

let createPay = ( payment ) => {
    return new Promise((resolve, reject) => {
        paypal.payment.create(payment, function(error, payment) {
            if (error) {
                reject(error);
            } else {
                resolve(payment);
            }
        });
    });
}