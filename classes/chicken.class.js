class Chicken extends MovableObject {
    y = 345;
    height = 80;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        // Jedes Chicken ist an einer anderes Stelle an der x-Achse
        this.x = 200 + Math.random() * 500; // Zahl zwischen 200 und 700
        // Jedes Chicken hat eine andere Geschwindigkeit
        this.speed = 0.2 + Math.random() * 0.5;
        this.animate();
    }


    animate() {
        this.moveLeft();

        setInterval(() => {
            let index = this.currentImage % this.IMAGES_WALKING.length; //setIntervall geht nur bis zum letzten Bild im Array (i = 0,1,2,3,4,5,0,1,2,3,4,5,...)
            let path = this.IMAGES_WALKING[index];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 200);
    }
}