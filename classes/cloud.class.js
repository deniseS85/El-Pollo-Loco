class Cloud extends MovableObject {
    y = 20;
    height = 250;
    width = 1000;

    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.animate();
    }

    // Wolken bewegen sich jede 60 frame per second(FPS) 0.2px abzgl. von x
    animate() {
        this.move_left();
    }

    

    
}