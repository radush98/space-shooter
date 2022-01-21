/*constants */
const audioPlayer = document.querySelector('audio'); //audioPlayer
const startButton = document.querySelector("#start"); //start button
const gameBlock = document.querySelector('#game');// game button
const player = document.querySelector('#player');//player's element
const scoreCounter = document.querySelector('#score-counter');//our scores element

const min = 100;
const max = 500;
const enemies = { 'type-1': 200, 'type-2': 400 };

let lifesCount = 3;
let score = 0;

/*hide start menu */
startButton.addEventListener('click', startGame)

/*sound's flag*/
let sound = false;

/*switcher animation and track's control*/
const soundButton = document.querySelector('#sound img');
soundButton.addEventListener('click', () => {
    if (sound) {
        soundButton.src = 'images/mute_sound.png';
        audioPlayer.pause();
    }
    else {
        soundButton.src = 'images/sound_on.png';
        audioPlayer.play();
    }
    sound = !sound;
})

/*player's contols*/
document.addEventListener('keydown', event => {
    if (
        (event.key == 'ArrowUp' || event.key == 'w')
        && player.offsetTop >= 60
    )
        player.style.top = `${player.offsetTop - 10}px`;
    if (
        (event.key == 'ArrowDown' || event.key == 's') &&
        player.offsetTop <= (document.querySelector("html").clientHeight - player.clientHeight)
    )
        player.style.top = `${player.offsetTop + 10}px`;
    if (
        event.key == " "
    ) {
        createBullet();
    }
})

/*start game function */
function startGame() {
    const startBlock = document.querySelector('#start');
    startBlock.style.display = 'none';
    gameBlock.style.display = 'block';

    createEnemy();
}

/*enemy move function */
function moveEnemy(enemy, speed) {
    const interval = setInterval(() => {
        enemy.style.left = `${enemy.offsetLeft - 25}px`;
        if (enemy.offsetLeft < -100) {
            enemy.remove();
            createEnemy();
            clearInterval(interval);
            hit();
        }
    }, speed)
}

/*move bullet function*/
function moveBullet(bullet) {
    const interval = setInterval(() => {
        bullet.style.left = `${bullet.offsetLeft + 25}px`;
        if (bullet.offsetLeft > document.body.clientWidth) {
            bullet.remove();
            clearInterval(interval);
        }

        isBoom(bullet);
    }, 50);
}

/*create enemies*/
function createEnemy() {
    let position = Math.round(min - 0.5 + Math.random() * (max - min + 1));
    const enemy = document.createElement('div');

    const [enemyType, speed] = getEnemy(); //get our enemy and destruct an array into two constants class and type
    enemy.classList.add('enemy', enemyType);
    gameBlock.appendChild(enemy);

    enemy.style.top = `${position}px`;
    moveEnemy(enemy, speed);
}

/*create bullet*/
function createBullet() {
    const bullet = document.createElement('div');
    bullet.classList.add('bullet');
    gameBlock.appendChild(bullet);
    bullet.style.top = player.offsetTop + 140 + "px";
    moveBullet(bullet);
}

/*returns enemy*/
function getEnemy() {
    const amount = Object.entries(enemies).length - 1;
    const index = Math.floor(Math.random() * (amount - 0 + 1)) + 0;
    return Object.entries(enemies)[index];
}

/*if enemy and bullet collapse*/
function isBoom(bullet) {
    const enemy = document.querySelector(".enemy");

    if (bullet.offsetTop > enemy.offsetTop &&
        bullet.offsetTop < enemy.offsetTop + enemy.clientHeight &&
        bullet.offsetLeft > enemy.offsetLeft) {
        createBoom(bullet.offsetLeft, bullet.offsetTop);
        bullet.remove();
        enemy.remove();
        scoreCounter.innerText = ++score;
        createEnemy();
    }
}

/*when enemy passed*/
function hit() {
    lifesCount--;
    if (lifesCount === 0) {
        alert("Game over");
    }

    createLifes();
}

/*lifes generator*/
function createLifes() {
    const lifesBlock = document.querySelector("#lifes");
    lifesBlock.innerHTML = '';

    let count = 0;

    while (count < lifesCount) {
        const span = document.createElement("span");
        lifesBlock.appendChild(span);
        count++;
    }
}

function createBoom(left, top) {
    const boom = document.createElement('div');
    boom.classList.add('boom');
    console.log(top, left);
    boom.style.top = `${top - 100}px`;
    boom.style.left = `${left}px`;
    gameBlock.appendChild(boom);
    setTimeout(() => boom.remove(), 1000);
}