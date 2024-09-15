import { z } from "zod";
import Scrypt from "../utils/scrypt.js";
import jwt from "jsonwebtoken";
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

const authController = {
  async create(req, res) {
    // On utilise safeParse pour gérer l'erreur
    const result = userSchema.partial().safeParse(req.body);
    console.log(result);

    // Si le resultat n'est pas correct, on renvoie une erreur 400
    if (!result.success) {
      return res.status(400).json(result.error);
    }

    // Sinon on récupère la data du résultat
    const {
      email,
      password,
      first_name,
      last_name,
      role,
      confirmation,
      address,
      zip_code,
      country,
      city,
      phone_number,
    } = result.data;


    // On vérifie si l'utilisateur existe déjà
    const userExists = await User.findOne({ where: { email } });

    // Si l'utilisateur existe déjà, on répond avec une erreur 409
    if (userExists) {
      return res.status(409).json({ message: "User already exists" });
    }
    
    // On hâche le mot de passe
    const hashedPassword = Scrypt.hash(password);

    // On crée l'utilisateur
    const user = await User.create({
      email,
      password: hashedPassword,
      first_name,
      last_name,
      role,
      address,
      zip_code,
      country,
      city,
      phone_number,
    });

    delete user.password;

    // On renvoie un message de confirmation de la création de l'utilisateur
    return res.status(201).json({
      message: "User created. Please login to get your access token.",
    });
  },

  async login(req, res) {
    const result = userSchema.partial().safeParse(req.body);
    console.log(result);

    // Si le resultat n'est pas correct, on renvoie une erreur 400
    if (!result.success) {
      return res.status(400).json(result.error);
    }

    // Ensuite on récupère la data du résultat
    const { email, password } = result.data;

    // Je vais récupérer depuis ma base de données l'utilisateur qui a l'email donné
    const foundUser = await User.findOne({
      where: {
        email: email,
      },
    });

    if (!foundUser) {
      throw new NotFoundError("User not found");
    }


    // Si on a un utilisateur, on teste si le mot de passe est valide
    const validPwd = Scrypt.verify(password, foundUser.password);

    if (!validPwd) {
      throw new NotFoundError("Invalid password");
    }

    // On crée un token d'accès pour que l'utilisateur puisse accéder aux routes protégées
    const accessToken = jwt.sign({ id: foundUser.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // On répond avec un token d'accès
    return res.json({ accessToken });
  },
};

export default authController;
