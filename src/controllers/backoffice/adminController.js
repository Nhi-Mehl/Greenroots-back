import z from 'zod';
import {
    User
} from '../../models/index.js';
import Scrypt from '../../utils/scrypt.js';

const adminSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});

const adminController = {

    async loginAction(req, res) {
        const resultValidation = adminSchema.safeParse(req.body);
        if (!resultValidation.success) {
            return res.status(400).json(resultValidation.error.errors);
        }
        const dataValidated = resultValidation.data;

        try {
            const user = await User.findOne({
                where: {
                    email: dataValidated.email,
                },
            });
            if (!user) {
                return res.status(401).json('Utilisateur non trouvé');
            }

            const isValidPassword = Scrypt.verify(
                dataValidated.password,
                user.password,
            );

            if (!isValidPassword) {
                return res.status(401).json('Mot de passe incorrect');
            }

            req.session.user = user;
            console.log(req.session.user);
            res.redirect('/admin/index');
        } catch (error) {
            console.error(error);
            res.status(500).json('Erreur serveur');
        };


    },


    async logoutAction(req, res) {
        req.session.destroy();
        res.redirect('/admin/');
    },

};

export default adminController;
