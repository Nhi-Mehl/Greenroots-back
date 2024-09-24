import { z } from 'zod';
import { Species } from '../../models/index.js';
import { Sequelize } from 'sequelize';


// const speciesSchema = z.object({
//     name: z.string().min(1),
//     scientific_name: z.string().min(1),
//     description: z.string().min(1),
//     price: z.number().min(1),
//     picture: z.string().min(1),
//     co2_compensation: z.number().min(1),
// });


const speciesController = {
    // controller pour récupérer toutes les espèces de la BDD
    async getAll(req, res) {
        const species = await Species.findAll({
            order: [['name', 'ASC']],
        });
        res.render('species/index', { species });
    },

    // controller pour récupérer une seule espèce en fonction de son id

    async getOne(req, res) {
        const { id } = req.params;

        const species = await Species.findByPk(id);

        res.render('species/view', { species });
    },

    async create(req, res) {
        await Species.create(req.body);

        // Une fois l'espèce créée, on redirige l'utilisateur vers la liste des espèces
        res.redirect('/admin/species');

    },

    async updateOne(req, res) {
        const { id } = req.params;

        // 1. Je récupère les data du form
        const { name, scientific_name, description, price, picture, co2_compensation } = req.body;

        const species = await Species.findByPk(id);

        // 2. Je les sets sur l'espèce
        species.name = name;
        species.scientific_name = scientific_name;
        species.description = description;
        species.price = price;
        species.picture = picture;
        species.co2_compensation = co2_compensation;

        // 3. Je sauvegarde le'espèce'
        await species.save();


        res.redirect('/admin/species');
    },

    async delete(req, res) {

        // Supprimer l'espèce
        await Species.destroy({
            where: {
                id: req.params.id,
            },
        });

        res.redirect('/admin/species');
    },

};

export default speciesController;