class SmallChicken extends MovableObject {
    chickenEnergy = 10;
    y = 380;
    width = 50;
    height = 50;
    offset = {
        top: 9,
        bottom: 10,
        left: 5,
        right: 5,
      };

    IMAGES_CHICKEN_SMALL = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];
    
    IMAGE_SMALL_CHICKEN_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_CHICKEN_SMALL);
        this.loadImage(this.IMAGE_SMALL_CHICKEN_DEAD[0]);
        // Jedes Chicken ist an einer anderes Stelle an der x-Achse
        this.x = 400 + Math.random() * 5000;
        // Jedes Chicken hat eine andere Geschwindigkeit
        this.speed = 0.4 + Math.random() * 0.5;
        this.animate();
    }

    animate() {
        this.move_left();
        setStoppableInterval(() => this.littleChickenAnimation(), 200);
    }


    littleChickenAnimation() {
        if (this.chickenEnergy == 0) {
            this.speed = 0;
            this.loadImage(this.IMAGE_SMALL_CHICKEN_DEAD);
        } else {
            this.playAnimation(this.IMAGES_CHICKEN_SMALL);
        }
    }
    
}