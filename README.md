# AssignEquipment
## Introduction
Ce projet à pour but d'attribuer du matériel informatique à des collaborateurs.

## IHM
La solution WEB contient 6 écrans :

- Login
- Accueil
- Gestion des collaborateurs
- Gestion des types d'équipements
- Gestion des équipements
- Affectation des équipements à des collaborateurs

## SPEC
Trois dossiers sont à disposition :
- API back-end qui va s'occuper de faire des requêtes à la BDD et renvoyer les résultats au front.
- React qui va s'occuper de gérer tout le front-end pour l'affichage utilisteur.
- SQL qui contient le script pour créer la base de données avec des insert pour créer les utilisateurs par défaut.

L'API fonctionne à partir d'un token JWT généré lors de la connexion de l'utilisateur.
Pour pouvoir pinger l'API sur les différentes routes, il faut être logué au site.
Elle est donc protégée pour ne pas être pinguée si la requête ne comporte pas de token valable.
Des tests unitaires ont été ajoutés afin de vérifier le bon fonctionnement de l'application.

Côté React, du Bootstrap et du Redux à été mit en place.

Pour faire fonctionner le projet correctement il faut :
- Exécuter le script SQL.
- Lancer l'API.
- Démarrer le projet React.
- Connectez vous sur l'application avec le compte utilisateur admin.

Pour lancer le projet REACT il faut installer Node.js : https://nodejs.org/.

Pour démarrer le serveur, il faut executer la commande suivante dans le terminal du projet sur VSCode par exemple :
```sh
npm start
```

⚠️ Le serveur Node se lance par défaut sur le port 3000.

Enjoy 😀
