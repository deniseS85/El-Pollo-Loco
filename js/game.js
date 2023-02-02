let canvas;
let world;
let keyboard = new Keyboard();
let game_music = new Audio('audio/game-loop.mp3');
let isMusic = false;


function init() {
    canvas = document.getElementById('canvas');
    changeClasses();
    world = new World(canvas, keyboard);
    //game_music.play('audio/game-loop.mp3');
    isMusic = true;
}

function playAudio(url) {
    new Audio(url);
}

function changeClasses() {
    document.getElementById('initPage').style.display = 'none';
    canvas.style.display = 'block';
    canvas.classList.add('startGameAnimation');
    document.getElementById('canvas-container').classList.remove('d-none');
}


function openPopUp() {
    document.getElementById('popUp').classList.toggle('d-none');
    document.getElementById('startImage').classList.toggle('overlay-bg');
}

function fullscreen() {
    canvas.requestFullscreen();
}

function stopMusic() {
    if (isMusic == true) {
        game_music.pause();
        isMusic = false
    } else {
        game_music.play();
        isMusic = true;
    }
}


window.addEventListener('keydown', (event) => {
    if(event.key == " ") {
        keyboard.SPACE = true;
    }
    if(event.key == "ArrowLeft") {
        keyboard.LEFT = true;
    }
    if(event.key == "ArrowUp") {
        keyboard.UP = true;
    }
    if(event.key == "ArrowRight") {
        keyboard.RIGHT = true;
    }
    if(event.key == "ArrowDown") {
        keyboard.DOWN = true;
    }
});


window.addEventListener('keyup', (event) => {
    if(event.key == " ") {
        keyboard.SPACE = false;
    }
    if(event.key == "ArrowLeft") {
        keyboard.LEFT = false;
    }
    if(event.key == "ArrowUp") {
        keyboard.UP = false;
    }
    if(event.key == "ArrowRight") {
        keyboard.RIGHT = false;
    }
    if(event.key == "ArrowDown") {
        keyboard.DOWN = false;
    }
});