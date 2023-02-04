class World {
    character = new Character();
    level = startLevel1();
    canvas;
    ctx; //Sammlung an Funktionen von JS, um Objekte im Canvas hinzuzufügen
    keyboard;
    camera_x = 0;
    statusBarLife = new StatusBarLife();
    statusBarBottle = new StatusBarBottle();
    statusBarCoin = new StatusBarCoin();
    coins = new Coins();
    bottles = new Bottles();
    throwableObjects = [];
    amountCollectBottles = 0;

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
            this.checkCollisionsChicken();
            this.checkThroughObject();
            this.checkCollectCoins();
            this.checkCollectBottles();
        }, 200);
    }

    checkCollisionsChicken() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isCollidingChicken(enemy)) {
                this.character.hurt();
                this.statusBarLife.reduceLife(this.character.energy);
                playAudio('audio/hurt.mp3');
            }
        });
    }

    checkCollectCoins() {
        this.level.coins.forEach((coin, i) => {
            if (this.character.isCollidingCollectables(coin)) {
                this.character.collectCoin();
                this.statusBarCoin.collectCoins(this.character.coin);
                this.level.coins.splice(i, 1);
                playAudio('audio/coins.mp3');
            }
        });
    }

    checkCollectBottles() {
        this.level.bottles.forEach((bottle, i) => {
            if (this.character.isCollidingCollectables(bottle)) {
                this.character.collectBottle();
                this.statusBarBottle.collectBottles(this.character.bottle);
                this.level.bottles.splice(i, 1);
                this.amountCollectBottles++;
                playAudio('audio/bottle.mp3');
            }
        });
    }

    checkThroughObject() {
        if (this.keyboard.SPACE && this.amountCollectBottles > 0) {
            let bottle = new ThrowableObject(this.character.x + 80, this.character.y + 110);
            this.throwableObjects.push(bottle); 
            this.character.reduceBottleByThrowing();
            this.statusBarBottle.collectBottles(this.character.bottle);
            this.amountCollectBottles--;
        }
    }
    
    draw() {
        // Bild wird vor dem Neuladen gelöscht
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this. camera_x, 0);
        // Objekte werden hinzugefügt zum Canva
        this.addObjectsToMap(this.level.background);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBarLife);
        this.addToMap(this.statusBarCoin);
        this.addToMap(this.statusBarBottle);
        

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