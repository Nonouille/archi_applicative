# TP Architecture Applicative - Applications Web et Micro-Services

## Orchestration et définition des fichiers

1. TP sur la partie client

- [index.html](client/index.html) : Une page simple avec un gros titre, une liste, un input et des buttons.

- [style.css](client/style.css) : Mise en stlyle des éléments du fichier HTML (changement de couleur possible).

    Partie importante :   
    - Définition du mode sombre avec des variables de background, de text-color, etc... Pour permettre le changement de style grâce au bouton dans le footer.   

- [script.js](client/script.js) : Permet les exécutions de scripts sur les éléments HTML et CSS comme le changement de couleurs ou le changement des messages affichés.

    Fonctions importantes :   
    - La fonction update permet de créer les divisions et les textes nécessaires pour l'affichage des messages. Elle remplit ces éléments avec le tableau de json qui lui est donné en entrée. Elle permet également d'associer la suppression du message au clic sur le texte du message.  
    - La fonction sendMessage permet de séparer l'input en pseudo et message grâce au tiret. Si aucun pseudo n'est renseigné, mettre l'auteur à anonyme. Si cela a fonctionné, rafraichir la page.  
    - Les appels automatique à chaque rechargement de page : 
        - Chargement des messages du serveur.
        - Chargement du nombre de messages et affichage dans le titre.
    
------------

2. TP sur la partie serveur

- [index.js](serveur/index.js) : Ce fichier permet de déployer une application grâce au paquet express de NodeJS sur le port 8080.

## Format des messages échangés

Les messages sont des objets JSON présentés de la sorte : 
```
{
    "msg" : "Lorem ipsum",
    "pseudo" : "userX",
    "date" : DateTime()    
}
```

## Routes disponibles sur le serveur

- **/** : Vérification que le serveur est vivant.

- **/test/\*** : Dans un **premier temps**, renvoyait un JSON multiple (JSON imbriqué, liste de strings, entier). Dans un **deuxième temps**, renvoie le chemin indiqué dans l'URL après : `/test/`.

- **/cpt/**
    - **query** : Permet de récupérer la valeur d'une variable globale `state`.

    - **inc\*** : Si pas de paramètre URL, incrémente de 1 la variable globale. Si un paramètre **v** est donné, incrémente de v la variable globale. Renvoie -1 si échec, Renvoie 0 si succès.

- **/msg/**
    - **getAll** : Renvoie tous les messages sauvegardés dans le serveur.

    - **get/\*** : Renvoie le message associé à l'index indiqué dans l'URL après `/msg/get/`.

    - **nber** : Renvoie le nombre de messages sauvegardés dans le serveur.

    - **post\*** : Prend en paramètre `msg` et `pseudo` qui permettent d'indiquer les informations pour le post.

    - **del/\*** : Supprime le message sauvegardé à l'index indiqué dans l'URL après `/msg/del/`.

## Lien GitHub du projet
[archi_applicative](https://github.com/Nonouille/archi_applicative/tree/main)

## Liens Render
- [Client](https://archi-applicative.onrender.com)
- [Server](https://archi-applicative-server.onrender.com/)

⚠️ Le serveur et le client étant déployés gratuitement sur Render, leur chargement peut prendre jusqu'à 50 secondes. Si vous ne voyez pas les messages s'afficher lors de la première visite, cela est normal.

> Arnaud PY - Étudiant ASI de Centrale Supelec - 2024/2025