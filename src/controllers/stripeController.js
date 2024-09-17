import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET);

const stripeController = {

async stripe(req, res) {
    let { amount, id } = req.body;

    console.log("amount & id : ", amount, id);
    try {
      const payment = await Stripe.paymentIntents.create({
        amount,
        currency: "EUR",
        description: "GreenRoots",
        payment_method: id,
        confirm: true,
        return_url: "http://localhost:5173/projects",
      });
      res.json({
        message: "paiement reussi",
        success: true,
      });
    } catch (error) {
      console.log("erreur...", error);
      res.json({ success: false, message: error.message, type: error.type });
    }
  },
}

export default stripeController;