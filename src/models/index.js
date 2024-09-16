import Project from './Project.js';
import Order from './Order.js';
import Order_line from './Order_line.js';
import Species from './Species.js';
import Project_tree from './Project_tree.js';
import User from './User.js';
import Blacklisted_token from './Black_listed_token.js';

// Project <-> Tree_project
// one-to-many
// Un projet a plusieurs arbres de projet (hasMany)
// Un arbre appartient à un seul projet (belongsTo)

Project.hasMany(Project_tree, {
    foreignKey: 'project_id',
    as: 'project_trees',
});
Project_tree.belongsTo(Project, {
    foreignKey: 'project_id',
    as: 'project',
});

// Species <-> Project_tree
// one-to-many
// Une espèce possède plusieurs arbres de projet (hasMany)
// Un arbre d'un projet n'appartient qu'à une seule expèce (belongsTo)

Species.hasMany(Project_tree, {
    foreignKey: 'species_id',
    as: 'project_trees',
});
Project_tree.belongsTo(Species, {
    foreignKey: 'species_id',
    as: 'species',
});

// Project_tree <-> Order_line
// one-to-many
// Un arbre de projet possède plusieurs lignes de commande (hasMany)
// Une ligne de commande n'appartient qu'à un seul arbre de projet (belongsTo)

Project_tree.hasMany(Order_line, {
    foreignKey: 'project_tree_id',
    as: 'order_lines',
});
Order_line.belongsTo(Project_tree, {
    foreignKey: 'project_tree_id',
    as: 'project_tree',
});

// Order <-> Order_line
// one-to-many
// Une commande possède plusieurs lignes de commandes (hasMany)
// Une ligne de commande n'appartient qu'à une seule commande (belongsTo)

Order.hasMany(Order_line, {
    foreignKey: 'order_id',
    as: 'order_lines',
});
Order_line.belongsTo(Order, {
    foreignKey: 'order_id',
    as: 'order',
});


// User <-> Order
// one-to-many
// Un utilisateur possède plusieurs commandes (hasMany)
// Une commande n'appartient qu'à un seul utilisateur (belongsTo)


User.hasMany(Order, {
    foreignKey: 'user_id',
    as: 'orders',
});
Order.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'user',
});


export { Project, Order, Order_line, Species, Project_tree, User, Blacklisted_token };