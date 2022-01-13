/*constants */
const audioPlayer = document.querySelector('audio'); //audioPlayer
const startButton = document.querySelector("#start"); //start button
const gameBlock = document.querySelector('#game');// game button
const player = document.querySelector('#player');//player's element

const min = 100;
const max = 500;
const enemies = { 'type-1': 200, 'type-2': 400 };

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
        const bullet = document.createElement('div');
        bullet.classList.add('bullet');
        gameBlock.appendChild(bullet);
        moveBullet(bullet);
    }
})

/*start game function */
function startGame() {
    const startBlock = document.querySelector('#start');
    startBlock.style.display = 'none';
    gameBlock.style.display = 'block';

    createEnemy();

    // const bullet = document.querySelector(".bullet");
    // setInterval(() => { moveBullet(bullet) }, 50);
}

/*enemy move function */
function moveEnemy(enemy, speed) {
    const interval = setInterval(() => {
        enemy.style.left = `${enemy.offsetLeft - 25}px`;
        if (enemy.offsetLeft < -100) {
            enemy.remove();
            createEnemy();
            clearInterval(interval);
        }
    }, speed)
}

/*move bullet function*/
function moveBullet(bullet) {
    setInterval(() => {
        bullet.style.left = `${bullet.offsetLeft + 25}px`;
        if (bullet.offsetLeft > document.body.clientWidth) {
            bullet.remove();
        }
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

function getEnemy() {
    const amount = Object.entries(enemies).length - 1;
    const index = Math.floor(Math.random() * (amount - 0 + 1)) + 0;
    return Object.entries(enemies)[index];
}
