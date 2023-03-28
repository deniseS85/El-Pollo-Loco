let canvas;
let world;
let keyboard = new Keyboard();
let game_music = new Audio('audio/game-loop.mp3');
let isMusic = false;
let isOpenPopUp = false;
let isSound = false;
let isPaused = false;
let intervalIds = [];
let snoring_sound = new Audio('audio/snoring.mp3');
let walk_sound = new Audio('audio/walk.mp3');
let jump_sound = new Audio('audio/jump.mp3');



function init() {
    awaitLoadingImages();
    canvas = document.getElementById('canvas');
}


function startGame(el) {
    changeClasses(el);
    world = new World(canvas, keyboard);
    requestIsSelectedSound(el);
    requestIsSelectedMusic(el);   
    touchPanel(); 
}


async function awaitLoadingImages() {
    showLoadingScreen();
    await loadAllImagesToCache();
    hideLoadingScreen();
}


function showLoadingScreen() {
    document.getElementById('loader').classList.remove('d-none');
}


function hideLoadingScreen() {
    document.getElementById('loader').classList.add('d-none');
}


function home(el) {
    document.getElementById('initPage').style.display = 'flex';
    canvas.style.display = 'none';
    canvas.classList.remove('startGameAnimation');
    document.getElementById('canvas-container').classList.add('d-none');
    document.getElementById('canvas').classList.remove('overlay-bg');
    el.closest('.game-content').querySelector('.startImage').classList.remove('overlay-bg');
    requestIsSelectedSound(el);
    requestIsSelectedMusic(el);   
    stopGame();
}


function requestIsSelectedSound(el) {
    isSound = localStorage.getItem('mute', isSound);
    if (isSound == 'true') {
       el.closest('.game-content').querySelector('.mute').src = 'img/mute.png';
       isSound = true;
    } else {
        el.closest('.game-content').querySelector('.mute').src = 'img/no-mute.png';
        isSound = false;
    } 
}


function requestIsSelectedMusic(el) {
    isMusic = localStorage.getItem('music_on', isMusic);
    if (isMusic == 'false') {
        el.closest('.game-content').querySelector('.music-off').src = 'img/music-off.png';
        game_music.pause();
    } else {
        el.closest('.game-content').querySelector('.music-off').src = 'img/music-on.png';
        isMusic = true;
        game_music.play();
    }
}


function pauseAndContinueGame(el) {
    if (el == null) {
        el = document.querySelector('.play-pause');
    }
    if (!isPaused && world) {
       pause(el);
    } else if (isPaused) {
       noPause(el);
       continueGame(el); 
    } 
}


function pause(el) {
    if (el.src.match('img/play.png')) {
        el.src = 'img/pause.png';
    }
    stopGame();
    showPauseScreen();
}


function noPause(el) {
    if (el.src.match('img/pause.png')) {
        el.src = 'img/play.png';
    } 
    closePauseScreen();
}


function stopGame() {
    intervalIds.forEach(clearInterval);
    game_music.pause();
    snoring_sound.pause();
    walk_sound.pause();
    jump_sound.pause();
    isPaused = true;  
}


function continueGame(el) {
    isMusic = localStorage.getItem('music_on', isMusic);
    if (isPaused) {
        reActivateAnimations(el);
        isPaused = false;
    }
    if (isMusic == 'false') {
        game_music.pause();
    } else {
        game_music.play();
    }
}


function reActivateAnimations(el) {
    world.level.enemies.forEach(enemy => {enemy.animate()});
    world.level.clouds.forEach(cloud => {cloud.animate()});
    world.level.coins.forEach(coin => {coin.animate()});
    world.throwableObjects.forEach(obj => {obj.throwBottle()});
    world.throwableObjects.forEach(obj => {obj.throw()});
    world.throwableObjects.forEach(obj => {obj.animate()});
    world.character.gravity();
    world.endboss.animate();
    world.character.animate();  
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


function changeClasses(el) {
    let popUp =  el.closest('.game-content').querySelectorAll('.popUp');
    for (let i = 0; i < popUp.length; i++) {
        popUp[i].classList.add('d-none');  
    }
    document.getElementById('initPage').style.display = 'none';
    canvas.style.display = 'block';
    canvas.classList.add('startGameAnimation');
    document.getElementById('canvas-container').classList.remove('d-none');
    document.getElementById('canvas').classList.remove('overlay-bg');
    el.closest('.game-content').querySelector('.play-pause').src = 'img/play.png';
}


function showPauseScreen() {
    document.getElementById('canvas').classList.add('overlay-bg');
    
}


function closePauseScreen() {
    document.getElementById('canvas').classList.remove('overlay-bg');
}


function openPopUp(el) {
    if (!isOpenPopUp) {
        let popUp =  el.closest('.game-content').querySelectorAll('.popUp');
        for (let i = 0; i < popUp.length; i++) {
            popUp[i].classList.remove('d-none');
        }
        el.closest('.game-content').querySelector('.startImage').classList.add('overlay-bg');
        isOpenPopUp = true;
    } else {
        closePopUp(el);
    }
}


function closePopUp(el) {
    let popUp =  el.closest('.game-content').querySelectorAll('.popUp');
    for (let i = 0; i < popUp.length; i++) {
        popUp[i].classList.add('d-none');  
    }
    el.closest('.game-content').querySelector('.canvas').classList.remove('overlay-bg');
    el.closest('.game-content').querySelector('.startImage').classList.remove('overlay-bg');
    isOpenPopUp = false;
   
}


function doNotClosePopup(event) {
    event.stopPropagation();
}


function openPopUpGame(el) {
    if (!isOpenPopUp) {
        pause(el);
        el.closest('.canvas-container').querySelector('.play-pause').src = 'img/pause.png';
        el.closest('.canvas-container').querySelector('.popUp').classList.remove('d-none');
        isOpenPopUp = true;
    } else {
        closePopUpGame(el);
    }
}


function closePopUpGame(el) {
    noPause(el);
    el.closest('.canvas-container').querySelector('.popUp').classList.add('d-none');
    el.closest('.canvas-container').querySelector('.play-pause').src = 'img/play.png';
    isOpenPopUp = false;
    continueGame(el);
}


function fullscreen() {
    canvas.requestFullscreen();
}


function stopMusic(el) {
    if (isMusic == true) {
        game_music.pause();
        el.src = 'img/music-off.png';
        isMusic = false;
        localStorage.setItem('music_on', isMusic);
    } else {
        game_music.play();
        el.src = 'img/music-on.png';
        isMusic = true;
        localStorage.setItem('music_on', isMusic);
    }
}


function stopSound(el) {
    if (el.src.match('img/mute.png')) {
        el.src = 'img/no-mute.png';
        isSound = false;
        localStorage.setItem('mute', isSound);
    } else {
        el.src = 'img/mute.png';
        isSound = true;
        localStorage.setItem('mute', isSound);
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
    if(event.key == "f") {
        pauseAndContinueGame(null);
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

