import { z } from 'zod';
import { Project } from '../models/index.js';
import { NotFoundError } from '../utils/errors.js';

const projectSchema = z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    picture: z.string().min(1),
    status: z.string().min(1),
    city: z.string().min(1),
    country: z.string().min(1),
    continent: z.string().min(1),
  });

const projectController = {

    async getAll(req, res) {
        const projects = await Project.findAll({
          order: [['name', 'ASC']],
        });
        res.json(projects);
        console.log(projects);
      },

};

export default projectController;