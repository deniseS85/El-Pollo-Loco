class World {
    character = new Character();
    level = level1;
    canvas;
    ctx; //Sammlung an Funktionen von JS, um Objekte im Canvas hinzuzufügen
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    throwableObjects = [];

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }
    // damit Charakter auf Pfeiltasten reagieren kann
    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThroughObject();
        }, 200);
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hurt();
                this.statusBar.reduceLife(this.character.energy);
            }
        });
    }

    checkThroughObject() {
        if (this.keyboard.D) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
        }
    }


    draw() {
        // Bild wird vor dem Neuladen gelöscht
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this. camera_x, 0);

        // Objekte werden hinzugefügt zum Canva
        this.addObjectsToMap(this.level.background);
        this.addObjectsToMap(this.level.clouds);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBar);

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

    addToMap(moveObject) {
         // Spiegelung vom Charakter
        if(moveObject.otherDirection) {
            this.flipImage(moveObject);
        }

        // Welt zeichnen mit Koordinaten, Breite und Höhe
        moveObject.draw(this.ctx);

        // Rahmen um Charakter, damit Kollisionen registriert werden können
        moveObject.drawFrame(this.ctx);
        
        // Spiegelung für andere Objekte deaktivieren
        if(moveObject.otherDirection) {
            this.flipImageBack(moveObject)
        }
    }

    // Spiegelung des Charakters
    flipImage(moveObject) {
        this.ctx.save(); // Eigenschaften vom Canvas werden gespeichert (wie Screenshot)
        this.ctx.translate(moveObject.width, 0); // Verschieben Weite des Characters, um die Position zu behalten (sonst springt er nach links)
        this.ctx.scale(-1, 1); //Spiegelung um die eigene Achse --> (-1/1)
        moveObject.x = moveObject.x * -1; // x-Achse wird gespiegelt
    }

    flipImageBack(moveObject) {
        moveObject.x = moveObject.x * -1; // x-Achse wird wieder ungespiegelt
        this.ctx.restore(); // reseten zu dem Punkt vor Spiegelung zurück, damit alle anderen Objekte nicht gespiegelt werden
    }
   
}