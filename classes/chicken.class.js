class Chicken extends MovableObject {
    y = 345;
    height = 80;

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');

        // Jedes Chicken ist an einer anderes Stelle an der x-Achse
        this.x = 200 + Math.random() * 500; // Zahl zwischen 200 und 700
    }
}