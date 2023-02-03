class DrawableObject {
    img;
    imageCache = {}; // Json für die Bilder vom Character
    currentImage = 0;
    x = 120;
    y = 280;
    height = 150;
    width = 100;


    // Welt zeichnen mit Koordinaten, Breite und Höhe
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    // Rahmen um Charakter, damit Kollisionen registriert werden können
    drawFrame(ctx) {
        // Rahmen nur beim Character, Chicken oder Endboss anzeigen
        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'transparent';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    // erste Bild vom Objekt wird geladen
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    // alle Bilder von den Objekten werden in das JSON "imageCache" gepusht
    loadImages(array) {
        array.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
}