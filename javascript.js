const DEFAULT_GRIDBOXSIZE = "540px";
const container = document.querySelector('.container');
container.style.width = DEFAULT_GRIDBOXSIZE;
container.style.height = DEFAULT_GRIDBOXSIZE;

let size = 0;

let color = "black";

function setColor(e, color){
    e.style.backgroundColor = color;
}

function draw(e){
    switch(color){
        case "black":
            e.style.backgroundColor = "black";
            break;
        case "random":
            let red = Math.floor(Math.random() * 256);
            let green = Math.floor(Math.random() * 256);
            let blue = Math.floor(Math.random() * 256);
            e.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
            break;

        case "pencil":
            pencilDraw(e);
            break;
        default:
            e.style.backgroundColor = "white";

    }
    
}

function pencilDraw(e) {
    let currentOpacity = Number(e.style.backgroundColor.slice(-4, -1));
    if (currentOpacity <= 0.9) {
     e.style.backgroundColor = `rgba(0, 0, 0, ${currentOpacity + 0.1})`;
    }
   
}

function setGrid(x)
{
   
    container.style.setProperty('--grid-rows', x);
    container.style.setProperty('--grid-columns', x);
    
    for (c = 1; c < (x*x)+1; c++) {
        let cell = document.createElement("div");
        cell.className = "cell";
        //cell.style.backgroundColor = "rgb(187, 170, 170);"
        //cell.textContent = "CELL" + c;
        cell.style.cssText = "border: 1px solid grey";  
        container.appendChild(cell);
        cell.addEventListener('mouseover', () => {
            draw(cell);
         });
    }
    
}

function clearGrid() {
    let cells = Array.from(document.querySelectorAll(".cell"));
    cells.forEach ((cell) => {
        cell.style.backgroundColor = "white";
    });
}

function resetGrid() {
   
    let cells = Array.from(document.querySelectorAll(".cell"));
    cells.forEach ((cell) => {
        container.removeChild(cell);
    });
    clearGrid();
    do {
        size = parseInt(prompt("Enter number of cells per side (max 100)"));
    } while ((size > 100)||(size < 1))
    setGrid( size );
}

const sizeButton = document.querySelector(".sizeButton")
sizeButton.textContent = "Grid size";
sizeButton.addEventListener('click', () => {
   resetGrid();
});

const blackButton = document.querySelector(".blackButton")
blackButton.textContent = "Black";
blackButton.addEventListener('click', () => {
    color = "black";
});

const rainbowButton = document.querySelector(".rainbowButton")
rainbowButton.textContent = "Random colors";
rainbowButton.addEventListener('click', () => {
    color = "random";
});

const pencilButton = document.querySelector(".pencilButton")
pencilButton.textContent = "Pencil";
pencilButton.addEventListener('click', () => {
    color = "pencil";
});

const clearButton = document.querySelector(".clearButton")
clearButton.textContent = "Clear";
clearButton.addEventListener('click', () => {
    clearGrid();
});

setGrid(16);