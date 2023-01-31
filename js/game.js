let canvas;
let world;
let keyboard = new Keyboard();


function playAudio(url) {
    new Audio(url).play();
}

function init() {
    document.getElementById('menu').style.display = 'none';
    canvas = document.getElementById('canvas');
    canvas.style.display = 'block';
    canvas.classList.add('startGameAnimation');
    world =  new World(canvas, keyboard);
}

function openPopUp() {
    document.getElementById('popUp').classList.toggle('d-none');
    document.getElementById('startImage').classList.toggle('overlay-bg');
}

// Beim Drücken der Taste
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

// Beim Loslassen der Taste
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