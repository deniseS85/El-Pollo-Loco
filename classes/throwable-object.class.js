class ThrowableObject extends MovableObject {

    IMAGES_BOTTLES_ROTATION = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];
    IMAGES_BOTTLES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ]

    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES_BOTTLES_ROTATION);
        this.loadImages(this.IMAGES_BOTTLES_SPLASH);
        this.x = x;
        this.y = y;
        this.height = 80;
        this.width = 70;
        this.animate();
        this.throw();
    }

    throw() {
        this.speedY = 30; // Höhe des Wurfes
        this.gravity();
        setInterval(() => {
            this.x += 8; // Weite des Wurfes
        }, 25);
        setTimeout(function(){ 
            playAudio('audio/bottle-splash.mp3');
        }, 800) 
    }

    animate() {
        setInterval(() => {
            if (this.y > 250 || this.endbossIsHurt) {
                this.playAnimation(this.IMAGES_BOTTLES_SPLASH);
                this.x += 5;
                /* playAudio('audio/bottle-splash.mp3'); */
            } else {
                this.playAnimation(this.IMAGES_BOTTLES_ROTATION);
            }
        }, 80);
    }



}