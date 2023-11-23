const Subscription = require('./models/subscription');
const stripe = require('stripe')('sk_test_51M6AduSJVCB993v3gA3C5zHfGtwHMRKfToujVBOPpSQedPRafEj9zsbMi8YTI2p8tMzRIVNv4SsTXtO9dxUfxsFN00DwhQu1hS');
const express = require('express');
const cors = require('cors');
const app = express();
const connectToDatabase = require('./db/connection');
connectToDatabase();
app.use(cors());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

async function handler(req, res) {
    console.log(req.body);
    try {
        if (req.method !== 'POST') {
            return res.status(500).end();
        }

        const { name, email, paymentMethod, coupon } = req.body;
        let discount = 0;

        if (coupon === 'INTERN') {
            discount = 0.5; 
        }

        const customer = await stripe.customers.create({
            email,
            name,
            payment_method: paymentMethod,
            invoice_settings: { default_payment_method: paymentMethod },
        });

        const product = await stripe.products.create({
            name: 'Monthly Subscription',
        });

        const subscription = await stripe.subscriptions.create({
            customer: customer.id,
            items: [
                {
                    price_data: {
                        currency: 'INR',
                        product: product.id,
                        unit_amount: parseInt('1000') * 100 * (1 - discount), // Apply discount
                        recurring: {
                            interval: 'month',
                        },
                    },
                },
            ],
            payment_settings: {
                payment_method_types: ['card'],
                save_default_payment_method: 'on_subscription',
            },
            expand: ['latest_invoice.payment_intent'],
        });




        const subscriptionDetails = {
            name: req.body.name,
            email: req.body.email,
            paymentMethod: req.body.paymentMethod,
            coupon: req.body.coupon,
        };

        const newSubscription = new Subscription(subscriptionDetails);
        await newSubscription.save();
        res.json({
            message: 'Subscription successful!',
            clientSecret: subscription.latest_invoice.payment_intent.client_secret,
            subscriptionId: subscription.id,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

app.post('/api/subscribe', handler);

app.listen(8800, () => console.log('Running on port 8800'));
