class Character extends MovableObject {
    y = 150;
    height = 280;
    width = 140;
    speed = 7;
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];
    world; // zugreifen auf Variablen von world
    walk_sound = new Audio('audio/walk.mp3');
   
    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
    }

    animate() {
        // nach rechts laufen
        setInterval(() => {
            this.walk_sound.pause();
            if(this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.x += this.speed;
                this.otherDirection = false;
                this.walk_sound.play();
            }
        }, 1000 / 60);

        //nach links laufen
        setInterval(() => {
            if(this.world.keyboard.LEFT && this.x > 0) {
                this.x -= this.speed;
                this.otherDirection = true;
                this.walk_sound.play();
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);

        setInterval(() => {
            // bewegen nur beim Drücken der Pfeiltaste rechts oder links
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                // Lauf-Animation
                let index = this.currentImage % this.IMAGES_WALKING.length; //setIntervall geht nur bis zum letzten Bild im Array (i = 0,1,2,3,4,5,0,1,2,3,4,5,...)
                let path = this.IMAGES_WALKING[index];
                this.img = this.imageCache[path];
                this.currentImage++;
            }
        }, 80);
        
    }

    jump() {

    }
}