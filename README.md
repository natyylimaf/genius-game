<div align="center">

# 🟢🔴🟡🔵 Genius

**Jogo da memória Genius feito com HTML, CSS e JavaScript**

[![Jogar agora](https://img.shields.io/badge/▶_JOGAR_AGORA-1fbf4c?style=for-the-badge)](https://natyylimaf.github.io/genius-game)

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-222222?style=for-the-badge&logo=github&logoColor=white)

</div>

<!-- Quando tiver um print do jogo, salve em img/screenshot.png e tire os comentários da linha abaixo -->
<!-- <p align="center"><img src="img/screenshot.png" alt="Tela do jogo Genius" width="420"></p> -->

---

## 📚 Sobre o projeto

Trabalho final da **C3** da disciplina de **Desenvolvimento de Aplicações Web I**. A proposta era desenvolver um jogo em JavaScript, e escolhi recriar o clássico **Genius**.

🔗 **Link do jogo:** [natyylimaf.github.io/genius-game](https://natyylimaf.github.io/genius-game)

## 🎮 Como jogar

1. Clique em **Iniciar**.
2. Observe a sequência de cores que acende e toca.
3. Quando aparecer **"Sua vez!"**, repita a sequência clicando nos botões na mesma ordem.
4. A cada rodada a sequência ganha uma cor nova e fica mais rápida.
5. Errou? **Game over!** Clique em **Jogar de novo** e tente bater o seu recorde.

## ✨ Funcionalidades

| Recurso | Descrição |
|---|---|
| 🎲 Sequência aleatória | Cresce uma cor a cada rodada |
| ⚡ Dificuldade progressiva | A velocidade aumenta conforme o jogador avança |
| 🔊 Sons por cor | Um tom diferente para cada botão, gerado pela Web Audio API |
| 🔇 Botão de som | Liga e desliga o áudio a qualquer momento |
| 🏆 Recorde | Salvo no navegador com `localStorage` |
| 💥 Animações | Brilho nos botões e "tremida" no erro |
| 📱 Responsivo | O tabuleiro se adapta ao tamanho da tela |
| ♿ Acessibilidade | Respeita a opção de reduzir animações do sistema |

## 🛠️ Tecnologias

| Tecnologia | Uso |
|---|---|
| **HTML5** | Estrutura da página |
| **CSS3** | Layout com Grid, variáveis CSS, transições e animações |
| **JavaScript** | Lógica do jogo, eventos, `async`/`await` e temporizadores |
| **Web Audio API** | Sons das cores |
| **GitHub Pages** | Hospedagem |

## 🚀 Como rodar localmente

```bash
git clone https://github.com/natyylimaf/genius-game.git
cd genius-game
```

Depois, abra o `index.html` no navegador. Não é preciso instalar nada.

## 📁 Estrutura do projeto

```text
genius-game/
├── css/
│   └── style.css
├── img/
│   └── favicon.svg
├── js/
│   └── script.js
├── index.html
└── README.md
```

## 🧠 Conceitos praticados

- Arrays e geração de números aleatórios
- Manipulação do DOM e eventos
- Funções assíncronas (`async`/`await`) e `setTimeout`
- Armazenamento local com `localStorage`
- Variáveis CSS e animações
- Versionamento com Git

---
