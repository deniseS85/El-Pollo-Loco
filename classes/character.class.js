class Character extends MovableObject {
    y = 50;
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
    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];
    world; // zugreifen auf Variablen von world
    walk_sound = new Audio('audio/walk.mp3');
   
    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.animate();
        this.gravity();
    }

    animate() {
        setInterval(() => {
            this.walk_sound.pause();
            if(this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
               this.walk_right();
               this.walk_sound.play();
            }

            if(this.world.keyboard.LEFT && this.x > 0) {
                this.walk_left();
                this.walk_sound.play();
            }
         
            if (this.world.keyboard.UP && !this.isJumping()) {
                this.jump();
            }
             // Kameraführung
            this.world.camera_x = -this.x + 100;

        }, 1000 / 60);

        setInterval(() => {
             // Bilder 'Jump' werden angezeigt
             if (this.isJumping()) {
                this.playAnimation(this.IMAGES_JUMPING);
            } else {
                // bewegen nur beim Drücken der Pfeiltaste rechts oder links
                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    // Lauf-Animation
                    this.playAnimation(this.IMAGES_WALKING);
                }
            }
        }, 80);
    }
}