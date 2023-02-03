class Bottles extends MovableObject { 
    height = 100;
    width = 100;

    constructor(imagePath, x, y) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = y;
    }

}
