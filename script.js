/*player */
const player = document.querySelector('audio');
const playerSource = document.querySelector('audio source');

/* controls */
const playButton = document.querySelector('#play');
const puaseButton = document.querySelector('#pause');
const audio1Btn = document.querySelector('#audio1');
const audio2Btn = document.querySelector('#audio2');

/*lifes*/
const lifes = document.querySelector('#lifes');

/*main blocks*/
const game = document.querySelector('#game');
const start = document.querySelector('#start');

/*Event listeners*/
playButton.addEventListener('click', () => {
    game.style.display = "block";
    start.style.display = "none";
})

audio1Btn.addEventListener('click', changeSource)
audio2Btn.addEventListener('click', changeSource)

/*custom functions*/
function changeSource(e) {
    player.pause();
    if (e.target.id === 'audio1') {
        playerSource.src = 'audio/music.mp3';
    }
    else if (e.target.id === 'audio2') {
        playerSource.src = 'audio/Stay.mp3';
    }
    player.load();
    player.play();
}

const lifesAmount = lifes.children.length;
const amount = 5 - lifesAmount;
for (let i = 0; i < amount; i++) {
    lifes.innerHTML += '<span></span>'
}
