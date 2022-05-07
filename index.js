/**
* @file Code du serveur
* @author Léo Virth
* @version 1.0
* Lien du site : {@link https://site-nsi.bathusky.repl.co/}
* @copyright Léo Virth 2022
* @license BSD-3-Clause
*/

// On défini les constantes
const express = require('express');  // express permet de créer le serveur
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");  // ici socket.io nous permet d'envoyer des variables dans le html en faisant res.render
const io = new Server(server);
const fs = require('fs');  // permet de lire et écrire des fichiers
const { faker } = require('@faker-js/faker');  // générer des mots/noms/adresses aléatoires
var bodyParser = require('body-parser');  // permet de décoder des requêtes

faker.setLocale("fr")


// Créer application/x-www-form-urlencoded parser  
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// On défini les paramètres d'express
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static("public"));


// le code à exécuter lorsqu'on reçoit une requête GET à la racine
app.get("/", (req, res) => {
    res.render("home.html");  // Faire le rendu de home.html
});


// le code à exécuter lorsqu'on reçoit une requête GET à l'adresse /scoreboard
app.get("/scoreboard", (req, res) => {
    res.render("scoreboard.html");
});


// le code à exécuter lorsqu'on reçoit une requête GET à l'adresse /game/params
app.get("/game/:name", (req, res) => {
    var username = req.params.name;
    if (req.params.name == "null") {
        // si le paramètre name dans l'url est "null"
        // on en génére un et on redirige la requête
        username = faker.name.findName();
        res.redirect(`/game/${username}`)
    } else {
        res.render("game.html", {name: username});  // Faire le rendu de game.html et envoyer une variable
    }
});


// le code à exécuter lorsqu'on reçoit une requête GET à l'adresse /qcm
app.get("/qcm", (req, res) => {
    res.render("QCM.html");
});


// le code à exécuter lorsqu'on reçoit une requête POST à l'adresse /write
app.post("/write", urlencodedParser, function (req, res) {
    //console.log(req.body.score)
    // On récupère le contenu du json
    let scores = JSON.parse(fs.readFileSync("public/data.json", "utf8"));

    var score = req.body.score

    var isPresent = false;
    var change = true;
    
    // On vérifie si le pseudo existe déjà
    for (var i = 0; i < scores.length; i++) {
        if (scores[i].name == req.body.name) {
            // s'il existe et que le score fait est plus haut que celui enregistré, on le change
            // Sinon on indique qu'il n'y a rien à changer
            if (score > scores[i].score) scores[i].score = score
            else change = false
            isPresent = true
        }
    }

    // Si le pseudo n'est pas déjà présent
    if (!isPresent) {
        let userScore = {
            name: req.body.name,
            score: score
        }
        // On l'joute aux scores
        scores.push(userScore)
    }

    // S'il y a quelque chose à changer, on enregistre
    if (change) {
        fs.writeFile("public/data.json", JSON.stringify(scores), (err) => {
            if (err) {
                console.log(err);
            }
        });
    }
})

// On lance le serveur
server.listen(3000, () => {
    console.log("server started");
});