class EndScreen extends MovableObject {
    IMAGE_END = 'img/9_intro_outro_screens/game_over/game over.png';
    IMAGE_LOST = 'img/9_intro_outro_screens/game_over/you lost.png';

    deadEnemies = false;
    lost = false;
    world;
    width = 720;
    height = 480;
    x = 0;
    y = 0;

    game_lost_audio = new Audio('audio/game-over.mp3');
    game_over_audio = new Audio('audio/game-win.mp3');

    constructor() {
        super().loadImage('');
        this.checkGameOver();
    }

    checkGameOver() {
        setInterval(() => {
            if (this.world.character.isDead()) {
                this.gameLost();
            }
            if (this.world.endboss.isDead()) {
                this.gameWon();
            }
        }, 200);
    }

    gameWon() {
        setTimeout(() => {
            this.img = new Image();
            this.img.src = this.IMAGE_END;
            this.deadEnemies = true;   
            this.game_over_audio.play();
            game_music.pause();
            clearAllIntervals();
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 3400);
        }, 1000);
    }

    gameLost() {
        setTimeout(() => {
            this.img = new Image();
            this.img.src = this.IMAGE_LOST;
            this.lost = true;     
            this.game_lost_audio.play();
            game_music.pause();
            clearAllIntervals();
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 3400);
        }, 1000);
    }
}