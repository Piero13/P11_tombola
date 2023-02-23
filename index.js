

//game init
let choices = [];
let results = [];
let gridMaxNb;
let giftNb;


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
    document.getElementById("grid-title").style.visibility = "visible";
    document.getElementById("draw").style.visibility = "visible";

    createGrid();
}

//grid creation
function createGrid() {
    gridMaxNb = parseInt(document.getElementById("grid-params").value);
    t = setTimeout("createGrid()", 50);
    gridBtn = document.createElement("div");
    gridBtn.className="btn";
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

//add choice
function addChoice(choosen) {
    choosen.style.visibility = "hidden";
    nbr = choosen.textContent;
    addedNbr = document.createElement("div");
    addedNbr.className = "btn addedNbr";
    addedNbr.setAttribute("id", "ch" + nbr);
    addedNbr.innerHTML = nbr;
    document.getElementById("choices").appendChild(addedNbr);
    choices.push(parseInt(choosen.firstChild.nodeValue));

    // console.log (choices[nbr]);
    console.log(choices);
}

//draw
rep = 0;
itr = 30;

function draw() {
    if(choices.length == 0) {
        alert("Aucun numéro n'a été choisi");
        return;
    } else if(giftNb === results.length || results.length >= choices.length) {
        alert("Le nombre de maximum de tirage est atteint !");
        return;
    }

    drawingViewer = document.getElementById("drawing");
    drawingViewer.style.visibility = "visible";

    tx = setTimeout("draw()", 40);
    rep+=1;
    if(rep < itr) {
        drawingViewer.innerHTML = Math.ceil(Math.random()*gridMaxNb);
    } else {
        rep = 0;
        clearTimeout(tx);
        drawnNbr = parseInt(drawingViewer.innerHTML);

        if(results.find(number => number === drawnNbr)) {
            draw();
        } else if(!choices.find(number => number === drawnNbr)) {
            draw();
        } else {
            results.push(drawnNbr);

            //on affiche le numéro tiré
            drawResultBtn = document.createElement("div");
            drawResultBtn.className = "btn addedNbr";
            drawResultBtn.setAttribute("id", "res" + drawnNbr);
            drawResultBtn.innerHTML = drawnNbr;
            document.getElementById("draw-results").appendChild(drawResultBtn);

            //on compare avec les numéros joués
            if(choices.find(number => number === drawnNbr)) {
                matchedNbr = document.getElementById("ch" + drawnNbr);
                matchedNbr.style.backgroundColor = "#C3D08B";
            }
        }

        console.log(results);
    }
}