import { ZodError } from "zod";
import { NotFoundError } from "../utils/errors.js";

// eslint-disable-next-line no-unused-vars
function errorHandler(error, req, res, next) {
  console.error(error);

  // Toutes les erreurs qui provienne de la validation de Zod retourneront une 400 avec le détail.
  if (error instanceof ZodError) {
    return res.status(400).json({ error: error.errors });
  }
  // Erreurs personnalisées (par exemple, NotFoundError)
  else if (error instanceof NotFoundError) {
    return res.status(404).json({ error: error.message });
  }
  // Erreurs liées à Stripe (ex: carte refusée, insuffisance de fonds, etc.)
  else if (error.type === "StripeCardError") {
    return res
      .status(400)
      .json({ error: `Stripe Card Error: ${error.message}` });
  } else if (error.type === "StripeInvalidRequestError") {
    return res
      .status(400)
      .json({ error: `Stripe Invalid Request: ${error.message}` });
  } else if (error.type === "StripeAPIError") {
    return res
      .status(500)
      .json({ error: `Stripe API Error: ${error.message}` });
  }

  // Gestion d'autres erreurs inconnues
  res.status(500).json({ error: "Unknown error" });
}

export default errorHandler;
