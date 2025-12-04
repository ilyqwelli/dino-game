const dino = document.getElementById('dino');
const cactus = document.getElementById('cactus');

let gameStarted = false;
let isAlive;

document.addEventListener('keydown', function(event) {
    if (event.code === "Space") {
        if (!gameStarted) {
            startGame();
        }
        jump();
    }
});

function jump () {
    if (dino.classList != 'jump') {
        dino.classList.add('jump')
        setTimeout(function() {
            dino.classList.remove('jump')
        }, 500)
    }; 
};

function startGame() {
    gameStarted = true;

    cactus.style.animation = "cactusMov 1.5s infinite linear";

    isAlive = setInterval(function() {
        let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue('top'));
        let cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue('left'));

        if (cactusLeft < 40 && cactusLeft > 0 && dinoTop >= 140) {
            alert('GAME OVER(');
            resetGame();
        }
    }, 10);
}

function resetGame() {
    cactus.style.animation = "none";
    cactus.style.left = "560px";
    clearInterval(isAlive);
    gameStarted = false;
}