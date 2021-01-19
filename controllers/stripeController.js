const stripe_secret_key = process.env.STRIPE_SECRET_KEY;
const stripe_public_key = process.env.STRIPE_PUBLIC_KEY;

const stripe = require('stripe');
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    indexView: (req, res, next) => {
        res.render('../views/stripe/index.pug', {stripe_secret_key});
    },

    chargeView: (req, res, next) => {
        let amount = 500;

        stripe.customers.create({
            email: req.body.stripeEmail,
            source: req.body.stripeToken
        })
        .then(customer =>
            stripe.charges.create({
                amount,
                description: 'Sample charge',
                currency: 'eur',
                customer: customer.id
            }))
        .then(charge => res.render('../views/stripe/charge.pug'));
    }
}