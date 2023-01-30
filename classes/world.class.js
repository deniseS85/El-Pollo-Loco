class World {
    character = new Character();
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken()
    ];
    clouds = [
        new Cloud()
    ];
    background = [
        new BackgroundObject('img/5_background/layers/air.png'),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png'),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png'),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png')
    ];
    canvas;
    ctx;

    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
    }


    draw() {
        // Bild wird vor dem Neuladen gelöscht
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.addObjectsToMap(this.background);
        this.addObjectsToMap(this.clouds);
        this.addToMap(this.character);
        this.addObjectsToMap(this.enemies);

        // Draw() wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        });
    }

    // Arrays werden durchlaufen, damit alles zum Canvas hinzugefügt werden
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    // Werte x, y, Breite und Höhe zum Hinzufügen der Bilder
    addToMap(moveObject) {
        this.ctx.drawImage(moveObject.img, moveObject.x, moveObject.y, moveObject.width, moveObject.height);
    }
   
}