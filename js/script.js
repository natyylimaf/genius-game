// Cores do jogo
const COLORS = ["green", "red", "yellow", "blue"];
// Chave utilizada para salvar o recorde no armazenamento do navegador
const BEST_KEY = "genius-best-score";
// Frequência (em Hz) do som de cada cor
const TONES = { green: 392, red: 330, yellow: 262, blue: 523 };

// Elementos da página
const board = document.getElementById("board");
const pads = document.querySelectorAll(".pad");
const startButton = document.getElementById("start");
const statusText = document.getElementById("status");
const roundText = document.getElementById("round");
const bestText = document.getElementById("best");
const muteButton = document.getElementById("mute");

// Armazena a sequência de cores que o jogo gera
let sequence = [];
// Indica a posição da próxima cor que o jogador deve clicar
let playerIndex = 0;

// Indica se o som está ligado
let soundOn = true;

// Carrega o recorde salvo e exibe na tela
let bestScore = loadBestScore();
bestText.textContent = bestScore;

// Pausa o código por alguns milissegundos
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));


// Recupera o recorde salvo no armazenamento local do navegador
function loadBestScore() {
  try {
    return Number(localStorage.getItem(BEST_KEY)) || 0;
  } catch {
    return 0;
  }
}


// Salva o novo recorde no armazenamento local do navegador
function saveBestScore(score) {
  try {
    localStorage.setItem(BEST_KEY, String(score));
  } catch {
    // sem localStorage: o recorde vale só até fechar a página
  }
}


// Recebe o nome de uma cor e devolve o botão correspondente
function getPad(color) {
  return document.querySelector(`.pad[data-color="${color}"]`);
}


// O navegador só libera áudio depois de um clique do usuário,
// então o contexto de áudio é criado na primeira vez que um som toca
let audioCtx;

// Toca um tom na frequência e duração (em ms) informadas
function playTone(frequency, duration, type = "sine") {
  if (!soundOn) return; // som desligado
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }

  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  const end = audioCtx.currentTime + duration / 1000;

  osc.type = type;
  osc.frequency.value = frequency;

  // Volume baixo, que some suavemente no fim
  gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, end);

  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start();
  osc.stop(end);
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
  playTone(TONES[color], duration);
  await sleep(duration);
  pad.classList.remove("active");
  await sleep(150);
}


// Habilita ou desabilita todos os botões de cores
function setPadsEnabled(enabled) {
  pads.forEach((pad) => (pad.disabled = !enabled));
}


// A cada rodada a sequência fica um pouco mais rápida
function getSpeed() {
  return Math.max(150, 400 - (sequence.length - 1) * 20);
}


// Mostra a sequência inteira para o jogador
async function playSequence() {
  setPadsEnabled(false);
  statusText.textContent = "Observe a sequência...";
  await sleep(600);

  for (const color of sequence) {
    await flash(color, getSpeed());
  }

  playerIndex = 0;
  statusText.textContent = "Sua vez!";
  setPadsEnabled(true);
}


// Inicia uma nova rodada adicionando uma cor à sequência
async function nextRound() {
  addRandomColor();
  roundText.textContent = sequence.length;
  await playSequence();
}


// Inicia ou reinicia uma partida
function startGame() {
  sequence = [];
  roundText.textContent = "0";
  startButton.disabled = true;
  nextRound();
}


// Termina o jogo, atualiza o recorde e libera o botão de reiniciar
function gameOver() {
  const score = sequence.length - 1; // rodadas completadas
  setPadsEnabled(false);
  playTone(110, 600, "sawtooth"); // som grave e "áspero" de erro

  board.classList.add("shake");
  setTimeout(() => board.classList.remove("shake"), 400);

  if (score > bestScore) {
    bestScore = score;
    bestText.textContent = bestScore;
    saveBestScore(bestScore);
    statusText.textContent = `Game over! Novo recorde: ${score} rodadas`;
  } else {
    statusText.textContent = `Game over! Você completou ${score} rodadas`;
  }

  startButton.textContent = "Jogar de novo";
  startButton.disabled = false;
}


// Trata o clique do jogador e confere se acertou
async function handlePadClick(event) {
  const color = event.currentTarget.dataset.color;
  setPadsEnabled(false);
  await flash(color, 200);

  if (color !== sequence[playerIndex]) {
    gameOver();
    return;
  }

  playerIndex++;

  if (playerIndex === sequence.length) {
    statusText.textContent = "Muito bem!";
    await sleep(800);
    nextRound();
  } else {
    setPadsEnabled(true);
  }
}


// Liga ou desliga o som e atualiza o texto do botão
function toggleSound() {
  soundOn = !soundOn;
  muteButton.textContent = soundOn ? "🔊 Som ligado" : "🔇 Som desligado";
  muteButton.setAttribute("aria-pressed", String(!soundOn));
}

muteButton.addEventListener("click", toggleSound);


pads.forEach((pad) => pad.addEventListener("click", handlePadClick));
startButton.addEventListener("click", startGame);