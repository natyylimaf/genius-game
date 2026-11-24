// Cores do jogo
const CORES = ["verde", "vermelho", "amarelo", "azul"];
// Chave utilizada para salvar o recorde no armazenamento do navegador
const CHAVE_RECORDE = "genius-recorde";
// Frequência (em Hz) do som de cada cor
const TONS = { verde: 392, vermelho: 330, amarelo: 262, azul: 523 };

// Elementos da página
const tabuleiro = document.getElementById("tabuleiro");
const botoes = document.querySelectorAll(".botao");
const botaoIniciar = document.getElementById("iniciar");
const textoStatus = document.getElementById("status");
const textoRodada = document.getElementById("rodada");
const textoRecorde = document.getElementById("recorde");
const botaoSom = document.getElementById("som");

// Armazena a sequência de cores que o jogo gera
let sequencia = [];
// Indica a posição da próxima cor que o jogador deve clicar
let indiceJogador = 0;

// Indica se o som está ligado
let somLigado = true;

// Carrega o recorde salvo e exibe na tela
let recorde = carregarRecorde();
textoRecorde.textContent = recorde;

// Pausa o código por alguns milissegundos
const esperar = (ms) => new Promise((resolve) => setTimeout(resolve, ms));


// Recupera o recorde salvo no armazenamento local do navegador
function carregarRecorde() {
  try {
    return Number(localStorage.getItem(CHAVE_RECORDE)) || 0;
  } catch {
    return 0;
  }
}


// Salva o novo recorde no armazenamento local do navegador
function salvarRecorde(pontuacao) {
  try {
    localStorage.setItem(CHAVE_RECORDE, String(pontuacao));
  } catch {
    // sem localStorage: o recorde vale só até fechar a página
  }
}


// Recebe o nome de uma cor e devolve o botão correspondente
function obterBotao(cor) {
  return document.querySelector(`.botao[data-cor="${cor}"]`);
}


// O navegador só libera áudio depois de um clique do usuário,
// então o contexto de áudio é criado na primeira vez que um som toca
let contextoAudio;

// Toca um tom na frequência e duração (em ms) informadas
function tocarTom(frequencia, duracao, tipo = "sine") {
  if (!somLigado) return; // som desligado
  if (!contextoAudio) {
    contextoAudio = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (contextoAudio.state === "suspended") {
    contextoAudio.resume();
  }

  const oscilador = contextoAudio.createOscillator();
  const ganho = contextoAudio.createGain();
  const fim = contextoAudio.currentTime + duracao / 1000;

  oscilador.type = tipo;
  oscilador.frequency.value = frequencia;

  // Volume baixo, que some suavemente no fim
  ganho.gain.setValueAtTime(0.2, contextoAudio.currentTime);
  ganho.gain.exponentialRampToValueAtTime(0.0001, fim);

  oscilador.connect(ganho);
  ganho.connect(contextoAudio.destination);
  oscilador.start();
  oscilador.stop(fim);
}


// Gera uma cor aleatória e adiciona ao fim da sequência
function adicionarCorAleatoria() {
  const indice = Math.floor(Math.random() * CORES.length);
  sequencia.push(CORES[indice]);
}


// Acende um botão por um instante
async function acender(cor, duracao = 400) {
  const botao = obterBotao(cor);
  botao.classList.add("aceso");
  tocarTom(TONS[cor], duracao);
  await esperar(duracao);
  botao.classList.remove("aceso");
  await esperar(150);
}


// Habilita ou desabilita todos os botões de cores
function habilitarBotoes(habilitado) {
  botoes.forEach((botao) => (botao.disabled = !habilitado));
}


// A cada rodada a sequência fica um pouco mais rápida
function obterVelocidade() {
  return Math.max(150, 400 - (sequencia.length - 1) * 20);
}


// Mostra a sequência inteira para o jogador
async function mostrarSequencia() {
  habilitarBotoes(false);
  textoStatus.textContent = "Observe a sequência...";
  await esperar(600);

  for (const cor of sequencia) {
    await acender(cor, obterVelocidade());
  }

  indiceJogador = 0;
  textoStatus.textContent = "Sua vez!";
  habilitarBotoes(true);
}


// Inicia uma nova rodada adicionando uma cor à sequência
async function proximaRodada() {
  adicionarCorAleatoria();
  textoRodada.textContent = sequencia.length;
  await mostrarSequencia();
}


// Inicia ou reinicia uma partida
function iniciarJogo() {
  sequencia = [];
  indiceJogador = 0;
  textoRodada.textContent = "0";
  botaoIniciar.textContent = "Iniciar";
  botaoIniciar.disabled = true;
  proximaRodada();
}


// Termina o jogo, atualiza o recorde e libera o botão de reiniciar
function fimDeJogo() {
  const pontuacao = sequencia.length - 1; // rodadas completadas
  habilitarBotoes(false);
  tocarTom(110, 600, "sawtooth"); // som grave e "áspero" de erro

  tabuleiro.classList.add("tremer");
  setTimeout(() => tabuleiro.classList.remove("tremer"), 400);

  if (pontuacao > recorde) {
    recorde = pontuacao;
    textoRecorde.textContent = recorde;
    salvarRecorde(recorde);
    textoStatus.textContent = `Game over! Novo recorde: ${pontuacao} rodadas`;
  } else {
    textoStatus.textContent = `Game over! Você completou ${pontuacao} rodadas`;
  }

  botaoIniciar.textContent = "Jogar de novo";
  botaoIniciar.disabled = false;
}


// Trata o clique do jogador e confere se acertou
async function tratarCliqueBotao(evento) {
  const cor = evento.currentTarget.dataset.cor;
  habilitarBotoes(false);
  await acender(cor, 200);

  if (cor !== sequencia[indiceJogador]) {
    fimDeJogo();
    return;
  }

  indiceJogador++;

  if (indiceJogador === sequencia.length) {
    textoStatus.textContent = "Muito bem!";
    await esperar(800);
    proximaRodada();
  } else {
    habilitarBotoes(true);
  }
}


// Liga ou desliga o som e atualiza o texto do botão
function alternarSom() {
  somLigado = !somLigado;
  botaoSom.textContent = somLigado ? "🔊 Som ligado" : "🔇 Som desligado";
  botaoSom.setAttribute("aria-pressed", String(!somLigado));
}

botaoSom.addEventListener("click", alternarSom);


botoes.forEach((botao) => botao.addEventListener("click", tratarCliqueBotao));
botaoIniciar.addEventListener("click", iniciarJogo);