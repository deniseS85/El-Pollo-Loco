class Chicken extends MovableObject {
    y = 355;
    width = 80;
    height = 80;
    offset = {
        top: 10,
        left: 0,
        right: 0,
        bottom: 10,
    };
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        // Jedes Chicken ist an einer anderes Stelle an der x-Achse
        this.x = 400 + Math.random() * 5000;
        // Jedes Chicken hat eine andere Geschwindigkeit
        this.speed = 0.2 + Math.random() * 0.5;
        this.animate();
    }


    animate() {
        this.move_left();

        setInterval(() => {
            // Lauf-Animation
           this.playAnimation(this.IMAGES_WALKING);
        }, 200);
    }
}