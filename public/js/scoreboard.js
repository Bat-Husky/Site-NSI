const scoreBoard = document.getElementById("scoreBoard")


/**
 * La fonction est appelée par un bouton, 
 * elle redirige vers une autre page.
 * @returns {void}
 */
function gameLink() {
    window.location.href = `/game/null`;
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
 * 
 * @param {Function} callback 
 */
function loadJSON(callback) {
    var xobj = new XMLHttpRequest();

    // On effectue la requête
    xobj.overrideMimeType("application/json");
    xobj.open('GET', '/data.json', true);

    // on observe le changement
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            // dès qu'on observe que le statut indique une réussite,
            // On appelle la fonction passée en callback
            callback(xobj.responseText);

        }
    }
   
 
    xobj.send(null);
}

/**
 * Fonction appelée lors du chargement de la page,
 * elle s'occupe d'afficher le scoreboard.
 * @returns {void}
 */
function load() {
    // On appelle la fonction loadJSON en mettant en parametre une fonction callback
    loadJSON(function(response) {
        
        // On transforme le JSON en variable js
        let Data = JSON.parse(response);
        
        // On trie
        Data.sort(function(a, b) {
            return b.score - a.score;
        });

  

        var counter = 1;      // console.log(scoreBoard)

        // Pour chacun des scores on execute le code suivant
        Data.forEach(element => {
            // On crée un li
            li = document.createElement("li");
            li.innerHTML = ` : `
            li.id = `${element.name}`

            // On ajoute le span au début du li
            spanName = document.createElement("span");
            spanName.innerHTML = `${element.name}`
            spanName.id = "Name"
            li.insertAdjacentElement("afterbegin", spanName)

            // Pour les trois premier on ajoute un span au début du li (médaille)
            if (counter === 1) {
                li.className = "first"

                spanFirst = document.createElement("span");
                spanFirst.innerHTML = `🥇`
                li.insertAdjacentElement("afterbegin", spanFirst)

            } else if (counter === 2) {
                li.className = "second"

                spanSecond = document.createElement("span");
                spanSecond.innerHTML = `🥈`
                li.insertAdjacentElement("afterbegin", spanSecond)

            } else if (counter === 3) {
                li.className = "third"

                spanThird = document.createElement("span");
                spanThird.innerHTML = `🥉`
                li.insertAdjacentElement("afterbegin", spanThird)

            }

            // On ajoute le span du score à la fin du li
            spanScore = document.createElement("span");
            spanScore.innerHTML = `${element.score}`
            spanScore.id = "Score"
            li.insertAdjacentElement("beforeend", spanScore)
            
            // On ajoute le li au scoreboard
            scoreBoard.appendChild(li)
            scoreBoard.insertAdjacentElement("beforeend", li)

            counter++
            // console.log(element)
        });
        
    });

}