class MovableObject extends DrawableObject{
    speed = 0.2;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHurt = 0;


    // Lauf-Animation
    playAnimation(images) {
        let index = this.currentImage % images.length; //setIntervall geht nur bis zum letzten Bild im Array (i = 0,1,2,3,4,5,0,1,2,3,4,5,...)
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
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 150;
        }
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

    // Berechnung Koordinaten für die Kollision der Objekte
    isColliding(moveObject) {
        return  this.x + this.width > moveObject.x &&
                this.y + this.height > moveObject.y &&
                this.x < moveObject.x &&
                this.y < moveObject.y + moveObject.height
    
        /* (this.x + this.width) >= moveObject.x && 
                this.x <= (moveObject.x + moveObject.width) && 
                (this.y + this.offsetY + this.height) >= moveObject.y &&
                (this.y + this.offsetY) <= (moveObject.y + moveObject.height) && 
                moveObject.onCollisionCourse; // Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt. Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann. */
    }

    hurt() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHurt = new Date().getTime();
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHurt;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }

     isDead() {
        return this.energy == 0;
    }

   
}