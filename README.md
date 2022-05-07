# README

**Bonjour !**  
*Ce site n'est pas juste un site normal*, **c'est un serveur**, on ne peux donc pas le lancer
juste en cliquant sur index.html, il n'y en a même pas.

Vous avez donc les fichiers pour regarder le code, et vous pouvez voir le rendu sur [Replit](https://site-nsi.bathusky.repl.co/).

>Le site prend un peu de temps à se lancer (replit ne lance le site que quand quelqu'un essai de s'y connecter et l'éteint après un certain temps),
>environ 1 minute, s'il prend trop de temps à répondre, vous pouvez alors l'héberger sur votre pc.

<br><br>

## Marche à suivre :

### Installation

1. installer node.js

2. exécuter les commandes suivantes dans le dossier de l'index.js :
     - npm install express
     - npm install socket.io
     - npm install fs
     - npm install ejs
     - npm install @faker-js/faker

<br>

>PS : Normalement il est déjà installé par défaut, mais parfois il faut le faire manuellement,
>S'il y a une erreur "module not found" pour body-parser :
>* npm install body-parser

<br>

### Lancement

Le serveur est maintenant prêt, à chaque fois que vous voudrez le lancer il vous suffira de :
1. exécuter la commande "node index.js" dans le dossier de l'index.js
2. se rendre à l'adresse : http://localhost:3000/
