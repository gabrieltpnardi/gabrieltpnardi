// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Minesweeper
// Video: https://youtu.be/LFU5ZlrR21E

const phaseOneWin = document.querySelector('#phaseOneWin');
const alcoolP1 = document.querySelector('#alcoolP1');
const mascaraP1 = document.querySelector('#mascaraP1');
const remedioP1 = document.querySelector('#remedioP1');
const phaseOneLost = document.querySelector('#phaseOneLost')
const tryAgainP1 = document.querySelector('#tryAgainP1')


let userLost = false;
let userLostAGame = false;

let img;
let fonte;

function preload(){
  img = loadImage('telaverde.png');  
  fonte = loadFont('SyneMono.ttf');

}

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
var contaAbertas = 0;
var metaParaGanhar; // armazena quantas células são necessárias para ganhar
var gameOverBlock = false; // estabelece uma variável para o final da fase
var canvas;

var totalBees = 5;

function setup() {
  
  createCanvas(700, 600);
  //var canvas = 501;


  cols = floor(501 / w);
  rows = floor(501 / w);
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

function gameOver() {
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].revealed = true;
      userLostAGame = true;

      phaseOneLost.style.display = 'block'

      tryAgainP1.addEventListener('click', () => {
        setup();
        contaAbertas = 0;
        gameOverBlock = false;
        userLost = false;
        setup();
        window.localStorage.setItem('gamePhase', 2);
        window.location.reload();
        phaseOneLost.style.display = 'none';
    })
    

    }
  }

  //fill('#28256B');
  //rect(0, 200, 700, 300);

  //textSize(25);
  //fill(255);
  //text('Foi Contaminado :(', 350, 250);
  //text("Infelizmente você não conseguiu se prevenir contra a COVID-19. Mas podemos te ajudar para na proxima vez que sair para trabalhar não correr riscos", 10, 290, 680, 300);
  //let buttonPrevenir = createButton('Como prevenir?')
  //buttonPrevenir.class('buttonF1');
  //buttonPrevenir.position(windowWidth/2 - 200, windowHeight/2 + 100)
  //buttonPrevenir.mousePressed(() => {
    //window.open("https://g1.globo.com/");
  //});

  //let buttonTryAgain = createButton('Tentar novamente');
  //buttonTryAgain.class('buttonF1');
  //buttonTryAgain.position(windowWidth/2, windowHeight/2 + 100);
  //buttonTryAgain.size(250, 30);
  //buttonTryAgain.mousePressed(() => {
    //setup();
    //contaAbertas = 0;
    //gameOverBlock = false;
    //userLost = false;
  //});

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
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].show();
      if (grid[i][j].revealed && grid[i][j].bee == false) contaAbertas++;  // na contagem, adcionei uma condição para ele contar somente células reveladas que noã soã bees
    }
  }

  if (contaAbertas == metaParaGanhar) {
    if (!userLost) {
      gameOverBlock = true;
      //text('VOCÊ GANHOU', 333, 550);

      phaseOneWin.style.display = 'block';

      alcoolP1.addEventListener('click', () => {
        window.localStorage.setItem('gamePhase', 3);
        window.location.reload(); 
        phaseOneWin.style.display = 'none';
      })

      mascaraP1.addEventListener('click', () => {
        window.localStorage.setItem('gamePhase', 4);
        window.location.reload(); 
        phaseOneWin.style.display = 'none';
      })

      remedioP1.addEventListener('click', () => {
        window.localStorage.setItem('gamePhase', 5);
        window.location.reload(); 
        phaseOneWin.style.display = 'none';
      })

      //fill('#28256B');
      //rect(0, 200, 700, 300);

      //textSize(25);
      //fill(255);
      //text('VOCÊ GANHOU', 350, 250);
      //text("Parabéns! Não foi contaminado.", 10, 290, 680, 300);
      //textSize(20);
      //text("Escolha uma recompensa para te ajudar na segunda fase:", 10, 350, 680, 300);


      //let buttonAlcool = createButton('Alcool em Gel');
      //buttonAlcool.class('buttonF1');
      //buttonAlcool.position(windowWidth/2 - 300, windowHeight/2 + 100);
      //buttonAlcool.size(250, 30);
      //buttonAlcool.mousePressed(() => {
        //window.localStorage.setItem('gamePhase', 3);
        //window.location.reload();
      //});

      //let buttonMascara = createButton('Máscara');
      //buttonMascara.class('buttonF1');
      //buttonMascara.position(windowWidth/2 - 100, windowHeight/2 + 100);
      //buttonMascara.size(250, 30);
      //buttonMascara.mousePressed(() => {
        //window.localStorage.setItem('gamePhase', 4);
        //window.location.reload();
      //})

      //let buttonRemedio = createButton('Remédio');
      //buttonRemedio.class('buttonF1');
      //buttonRemedio.position(windowWidth/2 + 100, windowHeight/2 + 100);
      //buttonRemedio.size(250, 30);
      //buttonRemedio.mousePressed(() => {
        //window.localStorage.setItem('gamePhase', 5);
        //window.location.reload();
      //})

    } else {
      gameOverBlock = true;
    }
  }
}

