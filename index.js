//game init
let choices = [];
let results = [];
let gridMaxNb;
let giftNb;
let choicesLength;
let resultsLength;

function init() {
    gridMaxNb = parseInt(document.getElementById("grid-params").value);
    giftNb = parseInt(document.getElementById("gift-params").value);

    if(gridMaxNb == 0 || gridMaxNb == "") {
        alert("Veuillez saisir la nombre de numéros de la grille !");
        return;
    } else if(giftNb == 0 || giftNb == "") {
        alert("Veuillez saisir le nombre de lots mis en jeu !");
        return;
    }

    document.getElementById("start").style.display = "none";
    i = 1;
    document.getElementById("container").style.display = "flex";

    createGrid();
}

//grid creation
function createGrid() {
    gridMaxNb = parseInt(document.getElementById("grid-params").value);
    t = setTimeout("createGrid()", 50);
    gridBtn = document.createElement("div");
    gridBtn.className="btn grid-btn";
    gridBtn.innerHTML = i;
    gridBtn.setAttribute("id", i);
    gridBtn.setAttribute("onclick", "addChoice(this)")
    document.getElementById("grid").appendChild(gridBtn);
    if(i%8 === 0) {
        br = document.createElement("br");
        document.getElementById("grid").appendChild(br)
    }
    i += 1;
    if(i > gridMaxNb) {
        clearTimeout(t)
    }
}

//choice adding
function addChoice(choosen) {
    choosen.style.visibility = "hidden";
    nbr = choosen.textContent;
    addedNbr = document.createElement("div");
    addedNbr.className = "btn addedNbr";
    addedNbr.setAttribute("id", "ch" + nbr);
    addedNbr.innerHTML = nbr;
    document.getElementById("choices").appendChild(addedNbr);
    choices.push(parseInt(choosen.firstChild.nodeValue));

    console.log(choices);
}

//draw
rep = 0;
itr = 50;
k = 0;

function draw() {
    console.log(choices);
    console.log(results);

    choicesLength = choices.length;
    resultsLength = results.length;

    if(choicesLength == 0) {
        alert("Aucun numéro n'est disponible pour le tirage");
        return;
    } else if(giftNb === resultsLength) {
        alert("Le nombre de maximum de tirage est atteint !");
        return;
    }

    for(i = 1; i < gridMaxNb + 1; i++) {
        document.getElementById(i).removeAttribute("onclick");
    }

    drawingViewer = document.getElementById("drawing");
    drawingViewer.style.visibility = "visible";

    tx = setTimeout("draw()", 60);
    rep += 1;
    if(rep < itr) {
        drawingViewer.innerHTML = choices[Math.ceil(Math.random()*choicesLength) - 1];
    } else {
        k += 1;
        clearTimeout(tx);
        drawnNbr = parseInt(drawingViewer.innerHTML);

        results.push(drawnNbr);

        //on crée l'emplacement pour le tirage
        drawnResultDiv = document.createElement("div");
        drawnResultDiv.className = "drawn-results-div";
        drawnResultDiv.setAttribute("id", "gift" + k)
        document.getElementById("results").appendChild(drawnResultDiv);

        //on affiche le label du tirage
        drawnResultLbl = document.createElement("p");
        drawnResultLbl.className = "drawn-results-p";
        drawnResultLbl.innerHTML = "n°" + k;
        document.getElementById("gift" + k).appendChild(drawnResultLbl);

        //on affiche le numéro tiré
        drawResultBtn = document.createElement("div");
        drawResultBtn.className = "btn addedNbr";
        drawResultBtn.setAttribute("id", "res" + drawnNbr);
        drawResultBtn.innerHTML = drawnNbr;
        document.getElementById("gift" + k).appendChild(drawResultBtn);

        //on compare avec les numéros joués
        if(choices.find(number => number === drawnNbr)) {
            matchedNbr = document.getElementById("ch" + drawnNbr);
                matchedNbr.style.backgroundColor = "#C3D08B";
        }

        indexToRemove = choices.findIndex((elt) => elt == drawnNbr);
        choices.splice(indexToRemove, 1);
        rep = 0;
        
        console.log(choices);
        console.log(results);
    }
}