import { z } from "zod";
import { User } from "../models/index.js";
import { NotFoundError } from "../utils/errors.js";

const userSchema = z.object({
  email: z.string().email("Doit être un email valide"),
  password: z.string().min(6),
  confirmation: z.string().min(6),
  first_name: z.string("Doit être une chaîne de caractères").min(1),
  last_name: z.string("Doit être une chaîne de caractères").min(1),
  role: z.string("Doit être une chaîne de caractères").optional(),
  address: z.string("Doit être une chaîne de caractères").min(1),
  zip_code: z.string("Doit être une chaîne de caractères").min(1),
  country: z.string("Doit être une chaîne de caractères").min(1),
  city: z.string("Doit être une chaîne de caractères").min(1),
  phone_number: z.string("Doit être une chaîne de numéros").min(10).max(10),
});

const userController = {
  // on récupère toutes les informations d'un utilisateur
  async getProfile(req, res) {
    // find user by req.user.id
    const user = await User.findByPk(req.user.id, {
      attributes: [
        "id",
        "first_name",
        "last_name",
        "role",
        "address",
        "zip_code",
        "city",
        "country",
        "phone_number",
        "email",
      ],
    });

    // respond with user
    res.json(user);
  },

  // Modifier les informations d'un utilisateur
  async updateUser(req, res) {
    const id = req.params.id;

    // On utilise safeParse pour gérer l'erreur
    const result = userSchema.partial().safeParse(req.body);
    console.log("result", result);

    // Si le resultat n'est pas correct, on renvoie une erreur 400
    if (!result.success) {
      return res.status(400).json(result.error);
    }

    // Permet de retrouver son utilisateur
    const userUpdate = await User.findByPk(id);
    console.log("userUpdate", userUpdate);

    // Si l'utilisateur n'existe pas, renvoyer l'erreur 404
    if (!userUpdate) {
      return res.status(404).json({ message: `User with id ${id} not found` });
    }

    // on met à jour les données
    await userUpdate.update(result.data);

    // Supprimer le mot de passe de l'objet renvoyé
    // Convertit l'objet Sequelize en un objet simple. avec plain: true
    const userWithoutPassword = userUpdate.get({ plain: true });
    delete userWithoutPassword.password;

    // Envoyer la réponse avec l'utilisateur mis à jour (sans le password)
    return res.json({
      success: true,
      message: "User updated successfully",
      data: userWithoutPassword,
    });
  },

  // Supprimer son compte utilisateur
  async deleteAccount(req, res) {
    const id = req.params.id;

    // Permet de retrouver son utilisateur
    const user = await User.findByPk(id);

    // Si l'utilisateur n'existe pas, renvoyer l'erreur 404
    if (!user) {
      return res.status(404).json({ message: `User with id ${id} not found` });
    }

    // on supprime son compte
    await user.destroy();

    // Envoyer une réponse avec le message de suppression
    return res.json({
      success: true,
      message: "Account deleted successfully",
    });
  },
};

export default userController;
