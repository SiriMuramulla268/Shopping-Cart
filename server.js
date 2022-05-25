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
    
  console.log(session);
  res.json({url: session.url})
});
    
app.listen(5000, () => console.log('Running on port 5000'));
   

