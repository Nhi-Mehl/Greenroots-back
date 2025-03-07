# greenroots-back

# 🚀 Le Back-End du projet GreenRoots

Ce projet est une application back-end construite avec Node.js, utilisant **Express** pour le serveur, **Sequelize** pour l'ORM, et une base de données PostgreSQL. Des outils de développement comme **nodemon**, **ESLint** et **Prettier** sont configurés pour un développement fluide et structuré.

## 📋 Prérequis

Assurez-vous que les éléments suivants sont installés sur votre machine :

- **Node.js** (v14 ou supérieur)
- **npm** (v6 ou supérieur)
- **PostgreSQL** (v12 ou supérieur)

Dans le terminal, exécutez ces lignes de code pour vérifier la présence et la version de ces éléments :

```
node -v
npm -v
pg_config --version
```

## 🛠️ Installation

1. **Clonez le dépôt :**

   Se rendre sur GitHub (https://github.com/O-clock-Pancakes/greenroots-back) et recopier la clé SSH.

   ```
   git clone clé_SSH_coréspondante_à_mon_projet_backend
   ```

2. **Installez les dépendances :**

   ```
   npm install
   ```

   Les principales dépendances installées sont :

   - `express` : Framework minimaliste pour créer le serveur.
   - `cors` : Middleware pour gérer les politiques de partage de ressources cross-origin.
   - `dotenv` : Module pour charger les variables d'environnement depuis un fichier `.env`.
   - `sequelize` : ORM pour interagir avec la base de données PostgreSQL.
   - `pg` : Pilote PostgreSQL pour Node.js.
   - `pg-hstore` : Utilisé pour sérialiser et désérialiser les types de données JSONB dans PostgreSQL.
   - `zod` : Bibliothèque de validation de schémas pour gérer la validation des données.
   - `nodemon` : Outil pour redémarrer automatiquement le serveur lors de modifications du code en développement.
   - `eslint` : Outil de linting pour garantir la qualité du code.
   - `prettier` : Formateur de code pour assurer la cohérence du style de codage.

3. **Création d’un utilisateur et d’une base de données**

- **Se connecter au Système (OS) avec l’utilisateur postgres**

  `sudo -i -u postgres `
  ou sur MacOsX
  `sudo su postgres`

  => on récupère une invite de commande du type `postgres@nomDeLaMachine~$`

  - **Se connecter au server PostGres dans le terminal**

  Une fois connecté au système en tant que postgres, on tape : `psql`

  => on a une invite de commande PostGres : postgres=#

  - **Créer un utilisateur**

  `CREATE ROLE nomDeLutilisateur WITH LOGIN PASSWORD 'leMotDePasse';`

  LOGIN : donne le droit à l’utilisateur de se connecter

  PASSWORD 'leMotDePasse' : donne un mot de passe à l’utilisateur.

  - **Créer une base de données**

  `CREATE DATABASE nomDeLaBase OWNER nomDeLutilisateur;`

  on crée une base de données, et on déclare l’utilisateur comme « propriétaire » (donc il a tous les droits) de cette base.

  - **Se connecter à la base de données nouvellement créée, avec l’utilisateur nouvellement créé**

  Dans un nouveau terminal après avoir entré la commande `\q` :

  `psql -U nomDeLutilisateur -d nomDeLaBase`

  Note : par défaut, si on ne met pas -d nomDeLaBase, on se connecte automatiquement à la base de données qui porte le même nom que l’utilisateur.

  - **Exécuter les instructions SQL contenues dans le fichier création de BDD**

  Ce fichier crée la structure de la BDD.

  `psql -U nomDeLutilisateur -d nomDeLaBase -f data/create_tables.sql`

  - **Exécuter les instructions SQL contenues dans le fichier de seeding de la BDD**

  Ce fichier alimente la BDD créée avec des valeurs prédéfinies.

  `psql -U nomDeLutilisateur -d nomDeLaBase -f data/seed_database.sql`

4. **Configurez les variables d'environnement :**

   Créez un fichier `.env` à la racine du projet et ajoutez vos configurations spécifiques en vous basant sur le fichier `.env.example`:

   Ajoutez les variables d'environnement nécessaires dans ce fichier :

   ```
   PORT=3000
   DATABASE_URL=postgres://user:password@localhost:5432/nom_de_la_base_de_donnees
   ```

   - `PORT` : Le port sur lequel le serveur va tourner.
   - `DATABASE_URL` : URL de connexion à la base de données PostgreSQL.

## 🚀 Démarrer le serveur

Pour démarrer le serveur en mode développement (avec redémarrage automatique grâce à **nodemon**) :

```
npm run dev
```

Le serveur sera lancé par défaut sur `http://localhost:3000`.

## 📂 Structure du Projet

Voici un aperçu de la structure du projet :

```
greenroots-back/
├── node_modules/
├── data/                 # Fichiers relatifs à la BDD (création et seeding)
│   ├── create_tables.sql/
│   ├── seed_database.sql/
├── src/
│   ├── controllers/      # Contrôleurs pour gérer la logique des routes
│   ├── database   /      # Configuration du client Sequelize
│   ├── middlewares/      # Middlewares personnalisés
│   ├── models/           # Modèles Sequelize
│   ├── router/           # Définition des routes Express
│   ├── utils/            # Gestion des erreurs
│   ├── validations/      # Validation des schémas avec Zod
│   └── server.js         # Point d'entrée du serveur
├── .env                  # Variables d'environnement (ignorées)
├── .env.example          # Variables d'environnement (fixes)
├── package-lock.json     # Dépendances et scripts npm
├── .gitignore            # Fichiers non commités
├── index.js              # Notre serveur
├── package.json          # Dépendances et scripts npm
└── README.md             # Ce fichier
```

## ✨ Contributions

Les contributions sont les bienvenues ! Merci de suivre les règles du projet et de soumettre des pull requests bien documentées.

## Login backoffice

user: testAdmin@example.com
mdp: testAdmin123
