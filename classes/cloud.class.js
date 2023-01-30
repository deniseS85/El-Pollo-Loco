class Cloud extends MovableObject {
    y = 20;
    height = 250;
    width = 500;

    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');

        this.x = Math.random() * 500;
        this.animate();
    }

    // Wolken bewegen sich jede 60 frame per second(FPS) 0.2px abzgl. von x
    animate() {
        setInterval( () => {
            this.x -= 0.2;
        }, 1000 / 60);
    }
    
}