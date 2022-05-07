// On défini les variables nécessairzs
const result = document.getElementById("resultats")
const rep1 = document.getElementById(`c1-3`)
const rep2 = document.getElementById(`c2-1`)
const rep3 = document.getElementById(`c3-2`)
const rep4 = document.getElementById(`c4-3`)
const rep5 = document.getElementById(`c5-2`)


/**
 * La fonction est appelée par un bouton, 
 * elle redirige vers une autre page.
 * @returns {void}
 */
function homeLink() {
    window.location.href = "/";
}


function Submit() {
    // On reset la couleur des textes
    for (let k = 1; k <=4; k++) {
        document.getElementById(`ch1-${k}`).style.color = "black"
        document.getElementById(`ch2-${k}`).style.color = "black"
        document.getElementById(`ch3-${k}`).style.color = "black"
        document.getElementById(`ch4-${k}`).style.color = "black"
        document.getElementById(`ch5-${k}`).style.color = "black"
    }

    // On reset la couleur des résultats
    result.style.color = "black"
    var choix_1 = false;
    var choix_2 = false;
    var choix_3 = false;
    var choix_4 = false;
    var choix_5 = false;

    var reponses = {}

    var score = 0

    // On vérifie s'il y a au moins une case cochée par question
    for (let i = 1; i <=4; i++) {
        if (document.getElementById(`c1-${i}`).checked) { choix_1 = true; reponses.ch1 = `ch1-${i}`; }
        if (document.getElementById(`c2-${i}`).checked) { choix_2 = true; reponses.ch2 = `ch2-${i}`; }
        if (document.getElementById(`c3-${i}`).checked) { choix_3 = true; reponses.ch3 = `ch3-${i}`; }
        if (document.getElementById(`c4-${i}`).checked) { choix_4 = true; reponses.ch4 = `ch4-${i}`; }
        if (document.getElementById(`c5-${i}`).checked) { choix_5 = true; reponses.ch5 = `ch5-${i}`; }
    }

    // N'est bon que si tous est sur true
    var isGood = choix_1 && choix_2 && choix_3 && choix_4 && choix_5

    if (!isGood) {
        result.style.color = "red"
        result.innerHTML = "Tout n'est pas coché."
    } else {
        // Si c'est bon
        // On met en vert les bonnes réponse
        document.getElementById("ch1-3").style.color = "#00ff2a"
        document.getElementById("ch2-1").style.color = "#00ff2a"
        document.getElementById("ch3-2").style.color = "#00ff2a"
        document.getElementById("ch4-3").style.color = "#00ff2a"
        document.getElementById("ch5-2").style.color = "#00ff2a"

        // Pour chaque question, on regarde si c'est la bonne réponse
        // Sinon on regarde la réponse donnée et on la met en rouge
        if (rep1.checked) score += 20;
        else { score -=8; document.getElementById(reponses.ch1).style.color = "#ff0000" }

        if (rep2.checked) score += 20;
        else { score -=8; document.getElementById(reponses.ch2).style.color = "#ff0000" }

        if (rep3.checked) score += 20;
        else { score -=8; document.getElementById(reponses.ch3).style.color = "#ff0000" }

        if (rep4.checked) score += 20;
        else { score -=8; document.getElementById(reponses.ch4).style.color = "#ff0000" }

        if (rep5.checked) score += 20;
        else { score -=8; document.getElementById(reponses.ch5).style.color = "#ff0000" }


        result.innerHTML = `Votre score : ${score}`
    }
}