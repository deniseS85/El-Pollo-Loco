class Bottles extends MovableObject { 
    height = 100;
    width = 100;

    constructor(imagePath, x, y) {
        super();
        this.loadImage(imagePath);
        this.x = x;
        this.y = y;
    }

}
