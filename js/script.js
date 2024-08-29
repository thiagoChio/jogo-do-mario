const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const startButton = document.querySelector('.start');
const gameOverScreen = document.querySelector('.game-over');
const scoreDisplay = document.querySelector('.score'); // Novo elemento de pontuação
const restartButton = gameOverScreen.querySelector('button'); // Seleciona o botão de reinício

const audioStart = new Audio('./audio/Sonic The Hedgehog OST - Green Hill Zone.mp3');
const audioGameOver = new Audio('./audio/Sonic 1 Music_ Game Over.mp3');

let gameInterval;
let score = 0; // Variável de pontuação

const startGame = () => {
    // Definindo a animação do cano e ocultando o botão de iniciar
    pipe.classList.add('pipe-animation');
    startButton.style.display = 'none';
    gameOverScreen.style.display = 'none';

    // Garantir que o Mario e o cano comecem nas posições seguras
    mario.src = './images/mario.gif';
    mario.style.width = '150px';
    mario.style.bottom = '0';

    // Definir a posição inicial do cano fora da tela à direita
    pipe.style.right = '100vw'; // Coloca o cano bem fora da tela

    // Reiniciar a pontuação
    score = 0;
    updateScore();

    audioStart.play();
    
    // Reiniciar o loop do jogo
    if (gameInterval) {
        clearInterval(gameInterval);
    }
    gameInterval = setInterval(gameLoop, 10);
};

const restartGame = () => {
    location.reload(); // Recarregar a página para reiniciar o jogo
};

const jump = () => { 
    mario.classList.add('jump');

    setTimeout(() => {
        mario.classList.remove('jump');
    }, 500);
};

const updateScore = () => {
    scoreDisplay.textContent = `Score: ${score}`; // Atualiza o elemento de pontuação
};

const gameLoop = () => {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = parseInt(window.getComputedStyle(mario).bottom, 10);

    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
        // Para a animação do cano e Mario
        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;

        mario.src = './images/game-over.png';
        mario.style.width = '75px';
        mario.style.marginLeft = '50px';

        audioStart.pause();
        audioGameOver.play();

        gameOverScreen.style.display = 'flex';

        clearInterval(gameInterval);
    } else if (pipePosition < 0) {
        // Quando o cano sai da tela, aumenta a pontuação
        score++;
        updateScore();
        
        // Reposiciona o cano para o início
        pipe.style.right = '100vw';
    }
};

// Escuta eventos de teclado e toque
document.addEventListener('keypress', e => {
    if (e.key === ' ') {
        jump();
    } else if (e.key === 'Enter') {
        startGame();
    }
});

document.addEventListener('touchstart', e => {
    // Evita que múltiplos eventos de toque acionem o pulo
    if (e.touches.length && !mario.classList.contains('jump')) {
        jump();
    }
});

// Adiciona os eventos de clique para os botões
startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', restartGame);
