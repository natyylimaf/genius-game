// Cores do jogo
const COLORS = ["green", "red", "yellow", "blue"];

// Elementos da página
const board = document.getElementById("board");
const pads = document.querySelectorAll(".pad");
const startButton = document.getElementById("start");
const statusText = document.getElementById("status");
const roundText = document.getElementById("round");
const bestText = document.getElementById("best");

// Armazena a sequência de cores que o jogo gera
let sequence = [];
// Indica a posição da próxima cor que o jogador deve clicar
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


// Acende um botão por um instante
async function flash(color, duration = 400) {
  const pad = getPad(color);
  pad.classList.add("active");
  await sleep(duration);
  pad.classList.remove("active");
  await sleep(150);
}

function setPadsEnabled(enabled) {
  pads.forEach((pad) => (pad.disabled = !enabled));
}


// Mostra a sequência inteira para o jogador
async function playSequence() {
  setPadsEnabled(false);
  statusText.textContent = "Observe a sequência...";
  await sleep(600);

  for (const color of sequence) {
    await flash(color);
  }

  playerIndex = 0;
  statusText.textContent = "Sua vez!";
  setPadsEnabled(true);
}

async function nextRound() {
  addRandomColor();
  roundText.textContent = sequence.length;
  await playSequence();
}

function startGame() {
  sequence = [];
  roundText.textContent = "0";
  startButton.disabled = true;
  nextRound();
}

startButton.addEventListener("click", startGame);