const stripe = require('stripe')('sk_test_51JSF08SHJ5gJiTp7QbSMCFF8vRMgperNkJgJo07bo49pPEcrqkC57ztJI7myHFvWVTdjuqf2iW2D8xx22ylv0s0X004LREPifi');
const express = require('express');
const app = express();
app.use(express.static('.')); // to serve static files of node express
const bodyParser = require('body-parser');
// Body 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


const YOUR_DOMAIN = 'http://localhost:3000';

  app.post('/create-checkout-session', async (req, res) => {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: [
        'card'
      ],
      line_items: [
        {
          quantity: 1,
          currency: 'usd',
          name: req.body.name,
          amount: Math.round(req.body.amount * 100)
        },
      ],
      mode: 'payment',
      success_url: `${YOUR_DOMAIN}?success=true`,
      cancel_url: `${YOUR_DOMAIN}?canceled=true`,
    });

    res.json({url: session.url}) // return session url to clientside

  });

  app.post("/create-payment-intent", async (req, res) => {
    const { items } = req.body;

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(req.body.amount),
      currency: "usd",
      // name: req.body.name,
      shipping: {
        name: req.body.name,
        address: {
          line1: '510 Townsend St',
          postal_code: '98140',
          city: 'San Francisco',
          state: 'CA',
          country: 'US',
        },
      },
      description: 'E-Commerce services',
      automatic_payment_methods: {
        enabled: true,
      },
    });

    console.log(paymentIntent);
    
    res.send({
      clientSecret: paymentIntent,
    });

  });
    
app.listen(5000, () => console.log('Running on port 5000'));
   

