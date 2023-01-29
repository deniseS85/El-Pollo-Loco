class BackgroundObject extends MovableObject {

    width = 720;
    height = 400;

    constructor(x, y) {
        super().loadImage('img/5_background/layers/3_third_layer/1.png');
        this.x = x;
        this.y = y;
    }

    
}