// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Minesweeper
// Video: https://youtu.be/LFU5ZlrR21E

const phaseSixWin = document.querySelector('#phaseSixWin');
const contP6 = document.querySelector('#contP6');
const phaseSixLost = document.querySelector('#phaseSixLost')
const tryAgainP6 = document.querySelector('#tryAgainP6')

let userLost = false;
let userLostAGame = false;

function make2DArray(cols, rows) {
  var arr = new Array(cols);
  for (var i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

var grid;
var cols;
var rows;
var w = 40;
var show;
var UTIUsado = 0;
var contaAbertas = 0;
var metaParaGanhar; // armazena quantas células são necessárias para ganhar
var gameOverBlock = false; // estabelece uma variável para o final da fase

var totalBees = 30;



function setup() {
  createCanvas(701, 600);
  var canvasCols = 501;
  var canvasRows = 501;
  
  setTimeout(fake1,7000);
  setTimeout(fake2, 20000);
  setTimeout(fake3,30000);
  setTimeout(fake4,40000);

  cols = floor(canvasCols / w);
  rows = floor(canvasRows / w);
  grid = make2DArray(cols, rows);
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j] = new Cell(i, j, w);
    }
  }

  metaParaGanhar = cols * rows - totalBees; //calcula total de células é necessário abrir para ganhar

  // Pick totalBees spots
  var options = [];
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      options.push([i, j]);
    }
  }

  for (var n = 0; n < totalBees; n++) {
    var index = floor(random(options.length));
    var choice = options[index];
    var i = choice[0];
    var j = choice[1];
    // Deletes that spot so it's no longer an option
    options.splice(index, 1);
    grid[i][j].bee = true;
  }

  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].countBees();
    }
  }
}


function fake1(){
  //createP('Vitamina C com água e limão cura coronavírus');
  var newSpan = createSpan('Vitamina C com água e limão cura coronavírus');
  newSpan.class("");
  newSpan.position(random(50, 200), random(50, 300));

  let botao  = createButton('Confira!');

  botao.position(320, 560);
  botao.size(250, 30);
  botao.mousePressed(() => {
    removeElements();
  });
}
  
function fake2 (){
  createP('Beber muita água e fazer gargarejo com água morna sal e vinagre previne o contágio.');

  let botao2  = createButton('Veja Mais!');

  botao2.position(320, 560);
  botao2.size(250, 30);
  botao2.mousePressed(() => {
    removeElements();
  }); 
  
}
  
function fake3(){
  createP('Fake News: isolamento social é ineficaz e 80% da população é imune à Covid-19. ');
 
  let botao3  = createButton('Veja o estudo!');

  botao3.position(320, 560);
  botao3.size(250, 30);
  botao3.mousePressed(() => {
    removeElements();
  });
}

function fake4(){
  createP('Nano chip será implantado através da vacina chinesa');

  let botao4 = createButton('Confira mais aqui!')
      
  botao4.position(320, 560);
  botao4.size(250, 30);
  botao4.mousePressed(() => {
    removeElements();
  });  
}

function clearCanvas(){
   for (var i = 0; i < cols; i++) {
   for (var j = 0; j < rows; j++) {
     grid.splice([i], [j]);
      //remove();
      //noCanvas();
      
  }
 }
}
  

function gameOver() {
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].revealed = true;
      userLostAGame = true;

      phaseSixLost.style.display = 'block'

      tryAgainP6.addEventListener('click', () => {
        setup();
        contaAbertas = 0;
        gameOverBlock = false;
        userLost = false;
        window.localStorage.setItem('gamePhase', 8);
        window.location.reload();
        phaseSixLost.style.display = 'none';
    })
      
      //let buttonTryAgain = createButton('Tentar novamente');

      //buttonTryAgain.position(320, 560);
      //buttonTryAgain.size(250, 30);
      //buttonTryAgain.mousePressed(() => {
        //setup();
        //contaAbertas = 0;
        //gameOverBlock = false;
        //userLost = false;
      //});
    }
  }
}

function mousePressed() {
  if (gameOverBlock == false) {
    for (var i = 0; i < cols; i++) {
      for (var j = 0; j < rows; j++) {
        if (grid[i][j].contains(mouseX, mouseY)) {
          grid[i][j].reveal();

          if (grid[i][j].bee) {
              userLost = true;
              gameOverBlock = true;
              gameOver();
            }
          }
        }
      }
    }
}

function draw() {
  contaAbertas = 0;
  //background(10, 143, 40)
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].show();
      if (grid[i][j].revealed && grid[i][j].bee == false) contaAbertas++; // na contagem, adcionei uma condição para ele contar somente células reveladas que noã soã bees
    }
  }
  //text (contaAbertas, 100,100);
  // text (metaParaGanhar, 100,120);
  if (contaAbertas == metaParaGanhar) {
    if (!userLost) {
      gameOverBlock = true;
      //text('VOCÊ GANHOU', 333, 550);

      phaseSixWin.style.display = 'block';

      contP6.addEventListener('click', () => {
        setup();
        contaAbertas = 0;
        gameOverBlock = false;
        userLost = false;
        window.localStorage.setItem('gamePhase', 1);
        window.location.reload();
        phaseSixWin.style.display = 'none';
    })

    } else {
      gameOverBlock = true;
      //text('VOCÊ PERDEU', 333, 550);
    }
  }
}
