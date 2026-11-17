// Cores do jogo
const COLORS = ["green", "red", "yellow", "blue"];

// Elementos da página
const board = document.getElementById("board");
const pads = document.querySelectorAll(".pad");
const startButton = document.getElementById("start");
const statusText = document.getElementById("status");
const roundText = document.getElementById("round");
const bestText = document.getElementById("best");

let sequence = [];
let playerIndex = 0;

// Pausa o código por alguns milissegundos
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));


// Recebe o nome de uma cor e devolve o botão correspondente
function getPad(color) {
  return document.querySelector(`.pad[data-color="${color}"]`);
}


// Gera uma cor aleatória e adiciona ao fim da sequência
function addRandomColor() {
  const index = Math.floor(Math.random() * COLORS.length);
  sequence.push(COLORS[index]);
}