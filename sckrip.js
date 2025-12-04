const dino = document.getElementById('dino');
const cactus = document.getElementById('cactus');
const scoreElement = document.getElementById('score');

let gameStarted = false;
let isAlive;
let score = 0;
let cactusPassed = false;
let cactusSpeed = 1.5;
let lastSpeedUpScore = 0;


document.addEventListener('keydown', function(event) {
    if (event.code === "Space") {
        if (!gameStarted) {
            startGame();
        }
        jump();
    }
});

document.addEventListener('touchstart', function() {
    if (!gameStarted) startGame();
    jump();
});

function jump () {
    if (dino.classList != 'jump') {
        dino.classList.add('jump')
        setTimeout(function() {
            dino.classList.remove('jump')
        }, 300)
    }; 
};

function startGame() {
    gameStarted = true;
    score = 0;
    cactusPassed = false;
    scoreElement.textContent = score;

    cactus.style.animation = `cactusMov ${cactusSpeed}s infinite linear`;


    isAlive = setInterval(function() {
        let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue('top'));
        let cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue('left'));

        if (cactusLeft < 40 && cactusLeft > 0 && dinoTop >= 140) {
            alert(`GAME OVER!\nYour score: ${score}`);
            resetGame();
        }

        if (cactusLeft < 0 && !cactusPassed) {
            score++;
            scoreElement.textContent = score;
            cactusPassed = true;
        }

        if (score % 5 === 0 && score !== 0 && score !== lastSpeedUpScore && cactusSpeed > 0.5) {
            lastSpeedUpScore = score;
            cactusSpeed -= 0.1;

            cactus.style.animation = `none`;
            setTimeout(() => {
                cactus.style.animation = `cactusMov ${cactusSpeed}s infinite linear`;
            }, 10);
        }

        if (cactusLeft > 500) {
            cactusPassed = false;
        }

    }, 10);
}

function resetGame() {
    cactus.style.animation = "none";
    cactus.style.left = "560px";
    clearInterval(isAlive);
    gameStarted = false;
}