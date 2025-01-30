# Nachet-Frontend

([*Le français est disponible au bas de la page*](#nachet-frontend-fr))

This project was initialized with [Vite](https://vitejs.dev/), a build tool that
aims to provide a faster and leaner development experience for modern web
projects.

## Setting up @saithodev/ts-appversion

To ensure a smooth development experience, it's crucial to manage the
application versioning right from the start. We use @saithodev/ts-appversion for
this purpose. Please install it by executing the command below before moving
forward with the development or build process:

```bash
npm install @saithodev/ts-appversion
```

After installing @saithodev/ts-appversion, run the prestart script to ensure
your application version is correctly set based on the latest git tag:

```bash
npm run prestart
```

After installing, you can proceed with the development or build processes of
your project.

```bash
npm run dev
```

This will serve your application on localhost:5173, where you can view it in
your preferred browser. The server is configured to automatically reload upon
any changes to your code, providing instant feedback on your development
progress. Additionally, build errors and lint warnings will be prominently
displayed in the console, helping you maintain a clean and efficient codebase.

The app will automatically reload if you make changes to the code. You will see
the build errors and lint warnings in the console.

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Starts the development server. Open localhost:5173 to view it in your browser.

The app will automatically reload if you make changes to the code. You will see
the build errors and lint warnings in the console.

### `npm run prebuild`

Prepares the application versioning before building. It's an essential step to
ensure that the build includes the correct version of your application.

### `npm run build`

Builds the app for production to the `dist` folder. It correctly bundles React
in production mode and optimizes the build for the best performance. Your app is
ready to be deployed!

### `npm run preview`

Locally preview production build.

### `npm run lint`

Runs eslint to find and fix problems in your JavaScript code.

### `npm run test`

Launches the test runner in the interactive watch mode.

## Code Formatting with Prettier

To ensure your codebase remains clean and consistent, we use
[Prettier](https://prettier.io/) for automatic code formatting. Before
committing your changes, you can format your code by running the following
command:

```bash
npx prettier --write .
```

Executing this command automatically formats the specified files. You can
replace `.` with the relative path of any specific file or directory you wish to
format. This allows for targeted formatting, ensuring that only the desired
sections of your codebase are adjusted.

### Running the application with docker

1. Build the docker image:

   ```bash
   docker build -t finesse-frontend .
   ```

2. Run the image: `docker run -p 3000:3000 finesse-frontend`.

### Docker-compose (optional)

You can also use `docker-compose` to run the API with the client. The API is the
backend that this client uses and is available at
<https://github.com/ai-cfia/finesse-backend>.

To run the API and the client together, make sure you have all the environment
variables required from the backend (see .env.template in the repository) and
then you can use the following command:

```bash
docker-compose up --build
```

You can then access the client at `http://localhost`. Take note that the backend
image is being pulled from our Github registry and the frontend image is being
built from the Dockerfile in the repository. This enables preview of local
changes in the frontend.

## Deployment Environment Configuration Management

For managing and configuring different deployment environments (development,
staging, production), we follow a structured approach to ensure consistency and
reliability across all stages of deployment. Detailed guidelines and practices
can be found in our [Deployment Environment Configuration Management
documentation](https://github.com/ai-cfia/dev-rel-docs/blob/103-documentation-request-environment-configuration-guidelines/TypeScript-AppVersion/DEPLOYMENT_ENV_CONFIG_MANAGEMENT.md).

This documentation covers:

- Overview and purpose of different environment files (`environment.ts`,
`environment.staging.ts`, `environment.prod.ts`).
- The process for selecting and applying the correct environment configuration
during the build and deployment.
- Best practices for maintaining clear, consistent, and secure configuration
management across all frontend components.

Refer to this documentation to understand how to effectively manage and utilize
environment configurations in your project.

## Environment Variable Setup

To run the application correctly, certain environment variables need to be set.
These variables control various aspects of how the application behaves in
different environments (development, staging, production).

### Required Variables

1. `VITE_BACKEND_URL`: URL of the backend server. This is used to make API calls
from the frontend.
2. `VITE_APP_MODE`: Determines the mode in which the application runs. Set to
`"test"` for using test data, any other value will use real data from the
backend.

### Setting Up Environment Variables

You can set these variables in a `.env` file in the root of your project.

Remember to replace the values with the appropriate URLs and modes for your
specific environment. Also, ensure that you do not commit sensitive information
like production URLs or credentials in the `.env` file to your version control
system.

### Accessing Environment Variables in the Application

In your React application, you can access these variables using `process.env`.
For example:

- `process.env.VITE_BACKEND_URL` to get the backend URL.
- `process.env.VITE_APP_MODE` to check the current mode of the application.

Note: After changing the values in your `.env` file, you will need to restart
your development server for the changes to take effect.

## Learn More

To learn more about Vite, check out the [Vite
documentation](https://vitejs.dev/guide/).

To learn React, check out the [React documentation](https://reactjs.org/).

---

## Nachet-Frontend (FR)

Ce projet a été initialisé avec [Vite](https://vitejs.dev/), un outil de
construction conçu pour offrir une expérience de développement plus rapide et
allégée pour les projets web modernes.

## Configuration de @saithodev/ts-appversion

Pour garantir une expérience de développement fluide, il est essentiel de gérer
la version de l'application dès le départ. Nous utilisons
@saithodev/ts-appversion à cet effet. Installez-le en exécutant la commande
ci-dessous avant de poursuivre avec le développement ou le processus de
construction :

```bash
npm install @saithodev/ts-appversion
```

Après avoir installé @saithodev/ts-appversion, exécutez le script `prestart`
pour vous assurer que la version de votre application est correctement définie
en fonction du dernier tag Git :

```bash
npm run prestart
```

Après l'installation, vous pouvez poursuivre le développement ou les processus
de construction de votre projet.

```bash
npm run dev
```

Cela servira votre application sur `localhost:5173`, où vous pourrez la
consulter dans votre navigateur préféré. Le serveur est configuré pour recharger
automatiquement à chaque modification de votre code, offrant un retour
instantané sur vos progrès de développement.

Les erreurs de compilation et les avertissements de lint seront affichés en
évidence dans la console, vous aidant à maintenir une base de code propre et
efficace.

## Scripts Disponibles

Dans le répertoire du projet, vous pouvez exécuter les scripts suivants :

### `npm run dev`

Lance le serveur de développement. Ouvrez `localhost:5173` dans votre navigateur
pour visualiser l'application.

L'application se rechargera automatiquement si vous apportez des modifications
au code. Les erreurs de compilation et les avertissements de lint s'afficheront
dans la console.

### `npm run prebuild`

Prépare la version de l'application avant la construction. C'est une étape
essentielle pour s'assurer que la version correcte de l'application est incluse
dans la build.

### `npm run build`

Construit l'application pour la production dans le dossier `dist`. Elle regroupe
correctement React en mode production et optimise la build pour offrir les
meilleures performances. Votre application est prête à être déployée !

### `npm run preview`

Prévisualise localement la build de production.

### `npm run lint`

Exécute eslint pour détecter et corriger les problèmes dans votre code
JavaScript.

### `npm run test`

Lance le testeur en mode interactif avec surveillance des modifications.

## Formatage du Code avec Prettier

Pour garantir que votre base de code reste propre et cohérente, nous utilisons
[Prettier](https://prettier.io/) pour le formatage automatique du code. Avant de
valider vos modifications, vous pouvez formater votre code en exécutant la
commande suivante :

```bash
npx prettier --write .
```

L'exécution de cette commande formatte automatiquement les fichiers spécifiés.
Vous pouvez remplacer `.` par le chemin relatif d'un fichier ou d'un répertoire
spécifique que vous souhaitez formater. Cela permet un formatage ciblé,
garantissant que seules les sections souhaitées de votre base de code sont
ajustées.

### Exécution de l'application avec Docker

1. Construisez l'image Docker :

   ```bash
   docker build -t finesse-frontend .
   ```

2. Exécutez l'image : `docker run -p 3000:3000 finesse-frontend`.

### Docker-compose (optionnel)

Vous pouvez également utiliser `docker-compose` pour exécuter l'API avec le
client. L'API correspond au backend utilisé par ce client et est disponible à
l'adresse suivante : <https://github.com/ai-cfia/finesse-backend>.

Pour exécuter l'API et le client ensemble, assurez-vous que toutes les variables
d'environnement nécessaires au backend sont configurées (voir `.env.template`
dans le dépôt), puis utilisez la commande suivante :

```bash
docker-compose up --build
```

Vous pouvez ensuite accéder au client à `http://localhost`. Notez que l'image du
backend est récupérée depuis notre registre GitHub et que l'image du frontend
est construite à partir du Dockerfile dans le dépôt. Cela permet de
prévisualiser les modifications locales du frontend.

## Gestion de la configuration des environnements de déploiement

Pour gérer et configurer différents environnements de déploiement
(développement, staging, production), nous suivons une approche structurée afin
d'assurer la cohérence et la fiabilité à chaque étape du déploiement. Vous
trouverez des directives détaillées dans notre [documentation sur la gestion des
configurations des environnements de
déploiement](https://github.com/ai-cfia/dev-rel-docs/blob/103-documentation-request-environment-configuration-guidelines/TypeScript-AppVersion/DEPLOYMENT_ENV_CONFIG_MANAGEMENT.md).

Cette documentation couvre :

- Vue d'ensemble et objectifs des différents fichiers d'environnement
  (`environment.ts`, `environment.staging.ts`, `environment.prod.ts`).
- Processus pour sélectionner et appliquer la configuration d'environnement
  correcte lors de la construction et du déploiement.
- Bonnes pratiques pour maintenir une gestion claire, cohérente et sécurisée des
  configurations sur tous les composants frontend.

Consultez cette documentation pour comprendre comment gérer et utiliser
efficacement les configurations d'environnement dans votre projet.

## Configuration des variables d'environnement

Pour exécuter correctement l'application, certaines variables d'environnement
doivent être configurées. Ces variables contrôlent divers aspects du
comportement de l'application selon les environnements (développement, staging,
production).

### Variables requises

1. `VITE_BACKEND_URL` : URL du serveur backend. Cette variable est utilisée pour
   effectuer des appels API depuis le frontend.
2. `VITE_APP_MODE` : Détermine le mode dans lequel l'application s'exécute.
   Réglez sur `"test"` pour utiliser les données de test, ou une autre valeur
   pour utiliser des données réelles du backend.

### Configuration des variables d'environnement

Vous pouvez configurer ces variables dans un fichier `.env` à la racine de votre
projet.

N'oubliez pas de remplacer les valeurs par les URL et modes appropriés à votre
environnement spécifique. Assurez-vous également de ne pas commettre
d'informations sensibles comme des URL de production ou des identifiants dans le
fichier `.env` dans votre système de gestion de version.

### Accès aux variables d'environnement dans l'application

Dans votre application React, vous pouvez accéder à ces variables en utilisant
`process.env`. Par exemple :

- `process.env.VITE_BACKEND_URL` pour obtenir l'URL du backend.
- `process.env.VITE_APP_MODE` pour vérifier le mode actuel de l'application.

**Note** : Après avoir modifié les valeurs dans votre fichier `.env`, vous
devrez redémarrer votre serveur de développement pour que les modifications
prennent effet.

## En savoir plus

Pour en savoir plus sur Vite, consultez la [documentation de
Vite](https://vitejs.dev/guide/).

Pour apprendre React, consultez la [documentation de
React](https://reactjs.org/).
