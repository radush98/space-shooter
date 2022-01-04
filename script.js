/*constants */
const audioaudioPlayer = document.querySelector('audio'); //audioPlayer
const startButton = document.querySelector("#start"); //start button
const gameBlock = document.querySelector('#game');// game button

startButton.addEventListener('click', () => {
    const startBlock = document.querySelector('#start');
    startBlock.style.display = 'none';
    gameBlock.style.display = 'block';
})

let sound = false;
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

const player = document.querySelector('#player');

document.addEventListener('keydown', event => {
    if (event.key == 'ArrowUp' || event.key == 'w')
        player.style.top = `${player.offsetTop - 10}px`
    if (event.key == 'ArrowDown' || event.key == 's')
        player.style.top = `${player.offsetTop + 10}px`
})