class Chicken extends MovableObject {
    chickenEnergy = 10;
    y = 355;
    width = 80;
    height = 80;
    offset = {
        top: 18,
        left: 0,
        right: 0,
        bottom: 10,
    };
   
    IMAGES_CHICKEN = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    IMAGE_CHICKEN_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_CHICKEN);
        this.loadImage(this.IMAGE_CHICKEN_DEAD[0]);
        // Jedes Chicken ist an einer anderes Stelle an der x-Achse
        this.x = 400 + Math.random() * 5000;
        // Jedes Chicken hat eine andere Geschwindigkeit
        this.speed = 0.2 + Math.random() * 0.5;
        this.animate();
    }


    animate() {
        this.move_left();
       
        setInterval(() => {
            if (this.chickenEnergy == 0) {
                this.speed = 0;
                this.loadImage(this.IMAGE_CHICKEN_DEAD);
            } else {
                this.playAnimation(this.IMAGES_CHICKEN);
            }
        }, 200); 
    
      
    }
}



