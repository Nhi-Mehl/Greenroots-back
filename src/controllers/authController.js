import { z } from 'zod';
import Scrypt from '../utils/scrypt.js';
import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';



// const passwordSchema = z
//   .string()
//   .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
//   .regex(/[0-9]/, 'Le mot de passe doit contenir au moins un chiffre')
//   .regex(/[A-Z]/, 'Le mot de passe doit contenir au moins une majuscule')
//   .regex(/[a-z]/, 'Le mot de passe doit contenir au moins une minuscule');


const userSchema = z.object({
  email: z.string().email('Doit être un email valide'),
  password: z.string().min(6),
  confirmation: z.string().min(6),
  first_name: z.string('Doit être une chaîne de caractères').min(1),
  last_name: z.string('Doit être une chaîne de caractères').min(1),
  role: z.string('Doit être une chaîne de caractères').optional(),
  address: z.string('Doit être une chaîne de caractères').min(1),
  zip_code: z.string('Doit être une chaîne de caractères').min(1),
  country: z.string('Doit être une chaîne de caractères').min(1),
  city: z.string('Doit être une chaîne de caractères').min(1),
  phone_number: z.string('Doit être une chaîne de numéros').min(10).max(10)
});


const authController = {
  async create(req, res) {
    // Using safeParse so we can handle the error
    const result = userSchema.partial().safeParse(req.body);
    console.log(result);

    // If the result is not successful, we respond with a 400 status code
    if (!result.success) {
      return res.status(400).json(result.error);
    }

    // Else we get data from the result
    const { email, password, first_name, last_name, role, confirmation, address, zip_code, country, city, phone_number } = result.data;

    // Ici je vais vérifier que le mot de passe et la confirmation sont les mêmes
    if (password !== confirmation) {
      return res.status(400).json({
        errors: [{ message: 'Les mots de passe ne correspondent pas' }],
      });
    }

    // Check if the user already exists
    const userExists = await User.findOne({ where: { email } });

    // If the user already exists, we respond with a 409 status code
    if (userExists) {
      return res.status(409).json({ message: 'User already exists' });
    }

    try {
      // Hash the password
      const hashedPassword = await Scrypt.hash(password);

      // Create the user
      const user = await User.create({ email, password: hashedPassword, first_name, last_name, role, address, zip_code, country, city, phone_number });

      delete user.password;

      // Respond with the user
      return res.status(201).json({
        message: 'User created. Please login to get your access token.',
      });

    } catch (error) {
      // If an error occurs, we respond with a 500 status code
      return res.status(500).json({ message: error.message });
    }

  }
}

export default authController;