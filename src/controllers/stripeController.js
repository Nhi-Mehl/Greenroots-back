import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET);

const stripeController = {
  // Permet de récupérer le client secret de stripe
  async getClientSecretStripe(req, res) {
    const { amount } = req.body; // Montant en centimes

    console.log("Request body:", req.body);
    console.log("Amount:", amount);

    if (!amount) {
      return res.status(400).json({ error: "Amount is required" });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "EUR",
      description: "GreenRoots",
      payment_method_types: ["card"], // Accepter uniquement les cartes
      // confirm: true,
      // return_url: "http://localhost:5173/projects",
    });

    res.status(200).json({
      message: "paiement reussi",
      success: true,
      clientSecret: paymentIntent.client_secret,
    });
  },
};

export default stripeController;
