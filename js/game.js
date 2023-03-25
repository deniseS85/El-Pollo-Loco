let canvas;
let world;
let keyboard = new Keyboard();
let game_music = new Audio('audio/game-loop.mp3');
let isMusic = false;
let isOpenPopUp = false;
let isSound = false;
let isPaused = false;
let intervalIds = [];


function init() {
    canvas = document.getElementById('canvas');
    /* awaitLoadingImages(); */
}
/* 
async function awaitLoadingImages() {
    showLoadingScreen();
    await loadAllImagesToCache();
    hideLoadingScreen();
} */


function startGame() {
    changeClasses();
    world = new World(canvas, keyboard);
    game_music.play('audio/game-loop.mp3');
    isMusic = true;
    touchPanel();
}


function pauseGame() {
    stopGame();
    /* showPauseScreen();
    showVolumeBtn();
    showFullscreenBtn(); */
}


function stopGame() {
    intervalIds.forEach(clearInterval);
    isPaused = true;
    
  /*    stopMusic(el);
     stopSound(el);
       */
}

function unPauseGame() {
   /*  hidePauseScreen();
    continueGame();
    hideVolumeBtn();
    hideFullscreenBtn(); */
}


function continueGame() {
    /* if (isPaused) {
        reActivateAnimations();
        isPaused = false;
        if (!isMusic) {
            startMusic();
        }
    } */
}




function reActivateAnimations() {
   /*  world.throwableObjects.forEach(obj => { obj.throw() });
    world.level.enemies.forEach(enemy => { enemy.animate() });
    world.level.clouds.forEach(cloud => { cloud.animate() });
    world.character.animate(); */
}


function setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    intervalIds.push(id);
}


function playAudio(url) {
    if(!isSound) {
        let audio = new Audio(url);
        audio.play();
    }
}


function changeClasses() {
    document.getElementById('initPage').style.display = 'none';
    canvas.style.display = 'block';
    canvas.classList.add('startGameAnimation');
    document.getElementById('canvas-container').classList.remove('d-none');
}


function openPopUp(el) {
    if (!isOpenPopUp) {
        el.closest('.game-content').querySelector('.popUp').classList.remove('d-none');
        el.closest('.game-content').querySelector('.startImage').classList.add('overlay-bg');
        isOpenPopUp = true;
    } else {
        closePopUp(el);
    }
}


function closePopUp(el) {
    el.closest('.game-content').querySelector('.popUp').classList.add('d-none');
    el.closest('.game-content').querySelector('.canvas').classList.remove('overlay-bg');
    el.closest('.game-content').querySelector('.startImage').classList.remove('overlay-bg');
    isOpenPopUp = false;
}


function openPopUpGame(el) {
    if (!isOpenPopUp) {
        el.closest('.canvas-container').querySelector('.popUp').classList.remove('d-none');
        el.closest('.canvas-container').querySelector('.canvas').classList.add('overlay-bg');
        isOpenPopUp = true;
    } else {
        closePopUpGame(el);
    }
}


function closePopUpGame(el) {
    el.closest('.canvas-container').querySelector('.popUp').classList.add('d-none');
    el.closest('.canvas-container').querySelector('.canvas').classList.remove('overlay-bg');
    isOpenPopUp = false;
}


function doNotCloseOverlay(event) {
    event.stopPropagation();
    console.log('content');
}


function fullscreen() {
    canvas.requestFullscreen();
}


function stopMusic(el) {
    if (isMusic == true) {
        game_music.pause();
        el.src = 'img/music-off.png';
        isMusic = false
    } else {
        game_music.play();
        el.src = 'img/music-on.png';
        isMusic = true;
    }
}


function stopSound(el) {
    if (el.src.match('img/no-mute.png')) {
        el.src = 'img/mute.png';
        isSound = false;
    } else {
        el.src = 'img/no-mute.png';
        isSound = true;
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


function touchPanel() {
    document.getElementById('left-touch').addEventListener('touchstart', (e) => {
        if (e.cancelable) {
            e.preventDefault();
         }
        keyboard.LEFT = true;
    });
    document.getElementById('left-touch').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    });
    document.getElementById('right-touch').addEventListener('touchstart', (e) => {
        if (e.cancelable) {
            e.preventDefault();
         }
        keyboard.RIGHT = true;
    });
    document.getElementById('right-touch').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    });
    document.getElementById('jump-touch').addEventListener('touchstart', (e) => {
        if (e.cancelable) {
            e.preventDefault();
         }
        keyboard.UP = true;
    });
    document.getElementById('jump-touch').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.UP = false;
    });
    document.getElementById('throw-touch').addEventListener('touchstart', (e) => {
        if (e.cancelable) {
            e.preventDefault();
         }
        keyboard.SPACE = true;
    });
    document.getElementById('throw-touch').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.SPACE = false;
    });
}

