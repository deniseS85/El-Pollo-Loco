class Bottles extends MovableObject { 
    height = 100;
    width = 100;
    offset = {
        top: 0,
        bottom: 0,
        left: 30,
        right: 30
    }

    constructor(imagePath, x, y) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = y;
    }

}
