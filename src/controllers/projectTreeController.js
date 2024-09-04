import { z } from 'zod';
import { Project_tree } from '../models/index.js';
import { NotFoundError } from '../utils/errors.js';

const projectTreeSchema = z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    picture: z.string().min(1),
    status: z.string().min(1),
    city: z.string().min(1),
    country: z.string().min(1),
    continent: z.string().min(1),
});

const projectTreeController = {

    async getAll(req, res) {
        const projectTrees = await Project_tree.findAll({
            order: [['id', 'ASC']],
        });
        res.json(projectTrees);
        console.log(projectTrees);
    },
    async getOne(req, res) {
        const id = req.params.id;

        const projectTree = await Project_tree.findByPk(id, {
            include: [
                {
                    association: 'species',
                    /*include: [
                        {
                            association: 'species'
                        }
                    ]*/
                }
            ],
            // order: [['name', 'ASC']],
        });
        if (!projectTree) {
            throw new NotFoundError('Project tree not found. Please verify the provided ID.');
        }
        res.json(projectTree);
    },

};

export default projectTreeController;