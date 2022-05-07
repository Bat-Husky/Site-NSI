// Définition des variables utilisées dans tout le code
const checkBox = document.getElementById("check");
const resultats = document.getElementById("resultat");
const pseudo = document.getElementById("pseudo");

const info = {
    coord: [],
    vainqueur: -1,
    finalScore: -1,
    errors: -1,
    malus: {
        trouve: -1,
        nombre: -1,
        coord: []
    },
    bonus: {
        trouve: -1,
        nombre: -1,
        coord: []
    }
}

const coefs = {
    bonus: [1, 0.5],
    malus: [1, 3]
}
var coef = 0;




function sendData(data) {
    var XHR = new XMLHttpRequest();
    var urlEncodedData = "";
    var urlEncodedDataPairs = [];
    var name;
  
    // Transformez l'objet data en un tableau de paires clé/valeur codées URL.
    for (name in data) {
        urlEncodedDataPairs.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
    }
  
    // Combinez les paires en une seule chaîne de caractères et remplacez tous
    // les espaces codés en % par le caractère'+' ; cela correspond au comportement
    // des soumissions de formulaires de navigateur.
    urlEncodedData = urlEncodedDataPairs.join('&').replace(/%20/g, '+');
  
    // Définissez ce qui se passe en cas de succès de soumission de données
    XHR.addEventListener('load', function(event) {
        console.log('Ouais ! Données envoyées et réponse chargée.');
    });

    // Définissez ce qui arrive en cas d'erreur
    XHR.addEventListener('error', function(event) {
        console.log('Oups! Quelque chose s\'est mal passé.');
    });
  
    // Configurez la requête
    XHR.open('POST', '/write');
  
    // Ajoutez l'en-tête HTTP requise pour requêtes POST de données de formulaire
    XHR.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  
    // Finalement, envoyez les données.
    XHR.send(urlEncodedData);
}


/**
 * La fonction est appelée par un bouton, 
 * elle redirige vers une autre page.
 * @returns {void}
 */
function scoreLink() {
    window.location.href = "/scoreboard";
}

/**
 * La fonction est appelée par un bouton, 
 * elle redirige vers une autre page.
 * @returns {void}
 */
function homeLink() {
    window.location.href = "/";
}

/**
 * Choisi un nombre entier au hasard entre 1 et max,
 * répète l'opération si le nombre choisi se trouve dans exception
 * @param {Number} max 
 * @param {Int32Array} exception
 * @returns 
 */
function getRandomIntExcept(max, exception = []) {
    var randInt = Math.floor(Math.random() * max)+1;
    while (exception.includes(randInt)) randInt = Math.floor(Math.random() * max)+1;
    return randInt;
}


/**
 * Lorsque que la checkbox est chequé
 * @returns {void}
 */
function check() {
    load()
}


/**
 * Charge le jeu,
 * défini tout ce dont on a besoin
 * @returns {void}
 */
function load() {
    // On défini le coefficient
    if (checkBox.checked == true) {
        coef = 1
    } else {
        coef = 0
    }

    // On reset tous les boutons
    for (let i = 1; i < 17; i++) {
        let loadButton = document.getElementById(`${i}`);
        loadButton.innerHTML = "???"
        loadButton.className = "gameButton";
        loadButton.disabled = false;
    }

    // on reset toutes les infos
    info.coord = [];
    info.bonus.coord = [];
    info.malus.coord = [];
    info.errors = 0;
    info.malus.trouve = 0;
    info.bonus.trouve = 0;


    pseudo.innerHTML = `Bonjour ${username}`
    
    // On défini le nombre de point et le bouton vainqueur
    info.finalScore = 7500 + (2500*coefs.malus[coef]);
    info.vainqueur = getRandomIntExcept(16);
    info.coord.push(info.vainqueur)

    // On défini le nombre de malus et les coordonnées
    if (getRandomIntExcept(3)-1 > 0 || coefs.malus[coef] == 3) info.malus.nombre = Math.floor(coefs.malus[coef])
    else info.malus.nombre = 0
    for (let k = 0; k < info.malus.nombre; k++) {
        info.malus.coord.push(getRandomIntExcept(16, info.coord));
        info.coord.push(info.malus.coord[k])
    }
    
    // On défini le nombre de bonus et les coordonnées
    info.bonus.nombre = Math.floor(getRandomIntExcept(3)*coefs.bonus[coef]);
    for (let i = 0; i < info.bonus.nombre; i++) {
        info.bonus.coord.push(getRandomIntExcept(16, info.coord))
        info.coord.push(info.bonus.coord[i])
    }

    console.log(info.vainqueur, info.bonus.coord, info.malus.coord, coef)
}

/**
 * Est appelée lorsqu'un bouton est cliqué
 * @param {Number} id 
 */
function button(id) {
    var actualButton = document.getElementById(id.toString());

    // On désactive le bouton
    actualButton.disabled = true
    
    // détermine ce qu'il est
    if (id == info.vainqueur) {
        // si c'est le bouton vainqueur
        actualButton.innerHTML = "Gagné !"
        actualButton.className = "win"

        // On désactive les autres bouton
        for (let i = 1; i < 17; i++) {
            document.getElementById(`${i}`).disabled = true;
        }

        // On écrit les données de la partie
        resultats.innerHTML = `Bravo !<br>Voici votre score :<br> ${info.finalScore}.<br>Vous avez trouvé ${info.bonus.trouve} bonus sur ${info.bonus.nombre}.<br>Nombre d'erreurs : ${info.errors}`
        
        if (info.malus.trouve > 0) {
            resultats.innerHTML += ` + ${info.malus.trouve} malus.`
        }

        // On envoie les données au serveur
        sendData({score: info.finalScore, name: username})

        // On reset le jeu
        setTimeout(() => {
            window.scrollTo(0,0);
            load();
        }, 800);
        
    } else if (info.bonus.coord.includes(id)) {
        // Si c'est un bonus
        info.finalScore += Math.floor(info.finalScore*(0.30*coefs.malus[coef]**1.5))
        actualButton.innerHTML = "Bonus !"
        actualButton.className = "bonus"
        info.bonus.trouve++
    } else if (info.malus.coord.includes(id)) {
        // Si c'est un malus
        info.finalScore -= Math.floor(info.finalScore*0.35)
        actualButton.innerHTML = "Malus !"
        actualButton.className = "malus"
        info.malus.trouve++
    } else {
        // Si c'est juste un bouton perdant
        info.finalScore -= Math.floor(info.finalScore*0.15)
        actualButton.innerHTML = "Perdu !"
        actualButton.className = "duper"
        info.errors++
    }
}