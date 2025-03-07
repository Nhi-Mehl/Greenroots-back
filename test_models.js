import { Project } from './src/models/index.js';




(async () => {
    const order = await Project.findAll({
        include: [
            {
                association: 'project_trees',
                include: [
                    {
                        association: 'user',

                    }
                ]
            }
        ]

    });

    console.log(JSON.stringify(order, null, 2));
})();