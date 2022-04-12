# Projet Piiquante

## Index
* Description
* Project tree
* Installation

### Description
 Si la responsable produit de Piiquante souhaite à terme transformer l'application d'évaluation en une boutique en ligne, elle souhaite que la première version soit une « galerie de sauces » permettant aux utilisateurs de télécharger leurs sauces piquantes préférées et de liker ou disliker les sauces que d'autres partagent.

### Project tree
```
│   .gitignore
│   app.js
│   package-lock.json
│   package.json
│   readme.md
│   server.js
│
├───controllers
│       sauce-controller.js
│       user-controller.js
│
├───middleware
│       auth.js
│       multer-config.js
│
├───routes
│       sauce-router.js
│       user-router.js
│
└───schemas
        sauce.js
        user.js
```

### Installation
1. Dans un dossier vide, créez un dossier nommé "frontend" et clonez le repository du frontend depuis : https://github.com/OpenClassrooms-Student-Center/Web-Developer-P6. Une fois cloné, exécutez la commande **npm install** depuis le dossier frontend puis **npm start** depuis un premier terminal pour démarrer le server côté client. Attention à bien utiliser le port 4200.

2. À la racine du dossier vide, créez également un dossier nommé "backend" et clonez ce repository.

3. À la racine du dossier backend, créez un dossier nommé "environment" dans lequel vous devez créer le fichier "default.env". Dans ce fichier, ajoutez les lignes suivantes à l'aide d'un éditeur de code :
    1. DATABASE=mongodb+srv://P6Course:1234@hottakes.d5cp0.mongodb.net/HotTakes?retryWrites=true&w=majority
    2. TOKENSALT=RANDOM_TOKEN_SECRET

4. À la racine du dossier backend, créez également un dossier nommé "images".

5. Depuis le dossier backend, exécutez la commande **npm install** depuis un deuxième terminal. Pour s'assurer que les modules Node.js sont à jour, exécutez la commande **npx npm-check-updates**. Si nécessaire, exécutez à nouveau **npm install** pour installer les mises à jour des modules Node.js.

6. Exécutez la commande **nodemon server** depuis le deuxième terminal puis ouvrez une fenêtre de votre navigateur web à l'adresse : http://localhost:4200.
