window.localStorage.setItem('gamePhase', 1);

var tela = 1;
var largura = 300;
var altura = 50;
var xMenu = 700/2;
var yMenu1 = 185;
var yMenu2 = 245;
var yMenu3 = 305

//let img;
let fonte;

let bubbles = [];
let coronaBolha;

function preload(){
  //img = loadImage('telaverde.png');  
  fonte = loadFont('SyneMono.ttf');
  coronaBolha = loadImage('corona-bolha.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < 10; i++) {
    let x = random(width);
    let y = random(height);
    let r = random(50, 160);
    let b = new Bubble(x, y, r);
    bubbles.push(b);
  }
}

function mousePressed() {
  for (let i = bubbles.length - 1; i >= 0; i--) {
    if (bubbles[i].contains(mouseX, mouseY)) {
      bubbles.splice(i, 1);
    }
  }
}

function draw() {
  //fundo
  if (tela == 1){
    //background(14,143,40);
    background('#28256B');
    for (let i = 0; i < bubbles.length; i++) {
      if (bubbles[i].contains(mouseX, mouseY)) {
        bubbles[i].changeColor(255);
      } else {
        bubbles[i].changeColor(0);
      }
      bubbles[i].move();
      bubbles[i].show();
    }

    //titulo
    textAlign(CENTER);
    textFont(fonte);
    textSize(60);
    fill(255);
    noStroke();
    text( "Virus Minado", windowWidth/2, windowHeight/5);
   
    //Iniciar Jogo
    textSize(36);
    fill(255);
    noStroke();
    text( "Iniciar Jogo", windowWidth/2, windowHeight/3);
    
    //let buttonPlay = createButton('Iniciar Jogo');
    //buttonPlay.class('play');
    //buttonPlay.position(windowWidth/2 , windowHeight/3);
    //buttonRemedio.size(250, 30);
    //buttonPlay.mousePressed(() => {
      //tela = 2;
    //})

      //retangulo1
      if (mouseX > windowWidth/2 -150 && mouseX < windowWidth/2 - 150 + largura && mouseY > windowHeight/3 - 50 && mouseY < windowHeight/3 - 50 + altura){
        stroke(255);
        noFill();   
        rect(windowWidth/2 - 150, windowHeight/3 - 40 , largura, altura);
        if (mouseIsPressed){
        tela = 2;
        }
      }

    //botão2
    fill(255);
    noStroke();
    text( "Sobre", windowWidth/2, windowHeight/2 - 80);
      //retangulo2
      if (mouseX > windowWidth/2 - 150 && mouseX < windowWidth/2 - 150 + largura && mouseY > windowHeight/2 - 117 && mouseY < windowHeight/2 - 117 + altura){
        stroke(255);
        noFill();
        rect(windowWidth/2 - 150, windowHeight/2 - 117 , largura, altura);
        if (mouseIsPressed){
          tela = 4;
        }
      }
    
    }

  //tela de aviso
  else if(tela == 2){
    //background(10, 143, 40);
    background('#28256B');
    for (let i = 0; i < bubbles.length; i++) {
      if (bubbles[i].contains(mouseX, mouseY)) {
        bubbles[i].changeColor(255);
      } else {
        bubbles[i].changeColor(0);
      }
      bubbles[i].move();
      bubbles[i].show();
    }

    //aviso antes do jogo
    fill(240);
    noStroke();
    textSize (30);
    text('Você é um trabalhador dos serviços essenciais e portanto não pode viver o isolamento social da forma ideal. Para ganhar o jogo, você deve evitar ao máximo o contato com o vírus.', windowWidth/2 - 300, windowHeight/3, 600, 600 );

    //botão3
    //fill(255);
    //noStroke();
    //textSize(20);
    //text('Começar', windowWidth/2, windowHeight/2 + 150);

    let buttonStart = createButton('Começar');
    buttonStart.class('start');
    buttonStart.position(windowWidth/2 - 100 , windowHeight/2 + 100);
    //buttonRemedio.size(250, 30);
    buttonStart.mousePressed(() => {
      window.localStorage.setItem('gamePhase', 2);
      window.location.reload();
      removeElements();
    })

      //if (mouseX > windowWidth/2 - 150 && mouseX < windowWidth/2 - 150 + largura && mouseY > windowHeight/2 - 117 && mouseY < windowHeight/2 - 117 + altura){
        //stroke (255);
        //noFill();
        //rect(windowWidth/2, windowHeight/2 + 150, 200, 50);
  
        //if (mouseIsPressed){
        
          //window.localStorage.setItem('gamePhase', 2);
          //window.location.reload();
  
          //}
        //}
    
  }
 
  //Informações
  else if(tela == 4){
    //background(10, 143, 40);
    background('#28256B');
    for (let i = 0; i < bubbles.length; i++) {
      if (bubbles[i].contains(mouseX, mouseY)) {
        bubbles[i].changeColor(255);
      } else {
        bubbles[i].changeColor(0);
      }
      bubbles[i].move();
      bubbles[i].show();
    }

    textAlign (CENTER);
    textSize (20);
    fill(240);
    text('"Vírus Minado" é um jogo desenvolvido por alunos de Comunicação Social - Midialogia na Universidade Estadual de Campinas (UNICAMP), sob orientação do Professor César Baio, para a disciplina de projeto final em Narrativas Digitais, durante o ano de 2020. Trata-se de um jogo educativo que visa conscientizar o jogador acerca da importância da prevenção e dos cuidados com a nova pandemia do Coronavírus. Através da lógica de um jogo de bombas, buscamos traçar uma analogia entre a lógica do contágio e o gameplay típico dessa modalidade de jogo virtual.', windowWidth/2 - 350, windowHeight/3, 700, 700);

    let buttonBack = createButton('Voltar');
    buttonBack.class('start');
    buttonBack.position(windowWidth/2 - 100 , windowHeight/2 + 120);
    //buttonRemedio.size(250, 30);
    buttonBack.mousePressed(() => {
      tela = 1;
      removeElements();
    })
    //botão4
    //fill(255);
    //noStroke();
    //text('Voltar', 700/2 - 10, 500);
      //if (mouseX > 290 && mouseX < 390 && mouseY > 470 && mouseY < 520){
        //stroke (255);
        //noFill();
        //rect(290,470,100,50);
        //if (mouseIsPressed){
          //tela = 1;
          //}
        //}

    
    
  }
}

class Bubble {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.brightness = 0;
  }

  changeColor(bright) {
    this.brightness = bright;
  }

  contains(px, py) {
    let d = dist(px, py, this.x, this.y);
    if (d < this.r) {
      return true;
    } else {
      return false;
    }
  }

  move() {
    this.x = this.x + random(-2, 2);
    this.y = this.y + random(-2, 2);
  }

  show() {
    image(coronaBolha, this.x, this.y, this.r, this.r);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}