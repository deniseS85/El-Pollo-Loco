class MovableObject {
    x = 120;
    y = 280;
    img;
    height = 150;
    width = 100;
    imageCache = {}; // Json für die Bilder vom Character


    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    // alle Bilder vom Character werden in das JSON "imageCache" gepusht
    loadImages(array) {
        array.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }


    moveRight() {
       
    }

    moveLeft() {

    }
}