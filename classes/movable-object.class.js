class MovableObject {
    x = 120;
    y = 280;
    img;
    height = 150;
    width = 100;
    imageCache = {}; // Json für die Bilder vom Character
    currentImage = 0;
    speed = 0.2;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;

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

    playAnimation(images) {
        let index = this.currentImage % this.IMAGES_WALKING.length; //setIntervall geht nur bis zum letzten Bild im Array (i = 0,1,2,3,4,5,0,1,2,3,4,5,...)
        let path = images[index];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
    
    // Objekte bewegen sich nach links (Wolken, Hühnchen)
    move_left() {
        setInterval( () => {
            this.x -= this.speed;
        }, 1000 / 60);
    }

    // Beim Springen Berrechnung des Fallens
    gravity() {
        setInterval(() => {
            if (this.isJumping() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        },1000 / 25);
    }

    // Wenn Objekt in der Luft ist
    isJumping() {
        return this.y < 150;
    }

    // nach rechts gehen
    walk_right() {
        this.x += this.speed;
        this.otherDirection = false;
    }

    // nach links gehen
    walk_left() {
        this.x -= this.speed;
        this.otherDirection = true;
        
    }

    // springen
    jump() {
        this.speedY = 30;
    }
}