/*constants */
const audioPlayer = document.querySelector('audio'); //audioPlayer
const startButton = document.querySelector("#start"); //start button
const gameBlock = document.querySelector('#game');// game button
const player = document.querySelector('#player');//player's element

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
        player.style.top = `${player.offsetTop - 10}px`
    if (
        (event.key == 'ArrowDown' || event.key == 's') &&
        player.offsetTop <= (document.querySelector("html").clientHeight - player.clientHeight)
    )
        player.style.top = `${player.offsetTop + 10}px`
})

/*start game function */
function startGame() {
    const startBlock = document.querySelector('#start');
    startBlock.style.display = 'none';
    gameBlock.style.display = 'block';

    const enemy1 = document.querySelector(".enemy.type-1");
    setInterval(() => { moveEnemy(enemy1) }, 200);

    const enemy2 = document.querySelector(".enemy.type-2");
    setInterval(() => { moveEnemy(enemy2) }, 400);

    const bullet = document.querySelector(".bullet");
    setInterval(() => { moveBullet(bullet) }, 50);
}

/*enemy move function */
function moveEnemy(enemy) {
    enemy.style.left = `${enemy.offsetLeft - 25}px`;
    if (enemy.offsetLeft < -100) {
        enemy.style.left = `${document.querySelector("body").clientWidth + 200}px`
    }
}

/*move bullet function*/
function moveBullet(bullet) {
    bullet.style.left = `${bullet.offsetLeft + 25}px`;
    if (bullet.offsetLeft > document.body.clientWidth) {
        bullet.style.left = 130 + "px";
    }
}


