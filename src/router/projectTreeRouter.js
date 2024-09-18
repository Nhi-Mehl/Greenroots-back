import { Router } from "express";
import projectTreeController from "../controllers/projectTreeController.js";
import cw from "../utils/controllerWrapper.js";

const projectTreeRouter = Router();

// Route qui permet d'envoyer le nombre d'arbres total vendus sur l'ensemble des projets
projectTreeRouter.get(
  "/planted",
  cw(projectTreeController.plantedTreesCounter)
);
// Route qui permet de récupérer les 3 arbres les plus vendus
projectTreeRouter.get(
  "/highlights",
  cw(projectTreeController.getThreeMostBoought)
);
// Route qui permet de récupérer les 3 arbres les plus vendus pour HomePage
projectTreeRouter.get(
  "/:project_id/highlights",
  cw(projectTreeController.getThreesHomePage)
);
// route qui permet de récupérer tous les arbres d'un projet et leurs informations en fonction de l'id de ce projet
projectTreeRouter.get(
  "/:project_id",
  cw(projectTreeController.getOneProjectTrees)
);
// route qui permet de récupérer un arbre d'un projet en fonction de l'id de cet arbre
projectTreeRouter.get("/:id", cw(projectTreeController.getOne));

export default projectTreeRouter;
