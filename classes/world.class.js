class World {
    character = new Character();
    level = startLevel1();
    canvas;
    ctx; //Sammlung an Funktionen von JS, um Objekte im Canvas hinzuzufügen
    keyboard;
    camera_x = 0;
    endboss = new Endboss();
    statusBarLife = new StatusBarLife();
    statusBarBottle = new StatusBarBottle();
    statusBarCoin = new StatusBarCoin();
    statusBarEndboss = new StatusBarEndboss();
    statusBarEndbossIcon = new StatusBarEndbossIcon();
    endScreen = new EndScreen();
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
        this.endScreen.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollisionChicken();
            this.checkJumpOnChicken();
            this.checkThroughObject();
            this.checkCollectCoins();
            this.checkCollectBottles();
            this.checkCollisionEndboss();
            this.checkHitbyBottle();
            this.checkGameOver();
        }, 100);
    }

    checkCollisionChicken() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isCollidingChicken(enemy) && !this.character.isJumping()) {
                this.character.hurt();
                this.statusBarLife.reduceLife(this.character.energy);
                playAudio('audio/hurt.mp3');
            }
        });
    }

    checkJumpOnChicken() {
        this.level.enemies.forEach((enemy, i) => {
            if (this.character.isCollidingChicken(enemy) && this.character.isJumping()) {
                enemy.killChicken();
                this.character.jump();
                setTimeout(() => {
                    this.level.enemies.splice(i, 1);
                }, 900);
                playAudio('audio/chicken.wav');
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

    checkCollisionEndboss() {
        if (this.character.isCollidingChicken(this.endboss)) {
            this.character.hurt();
            this.statusBarLife.reduceLife(this.character.energy);
        }  
    }

    checkHitbyBottle() {
        this.throwableObjects.forEach((bottle, i) => {
            if (this.endboss.isCollidingCollectables(bottle)) {
                this.endboss.hurt();
                this.statusBarEndboss.reduceLife(this.endboss.energy);
                bottle.endbossIsHurt = true;
                setTimeout(() => {
                    this.throwableObjects.splice(i, 1);
                    playAudio('audio/endboss-scream.mp3');
                }, 300);  
            }
        }); 
    }

    checkGameOver() {
        if(this.endScreen.deadEnemies) {
            this.enemies = [];
        }
        if (this.endScreen.lost) {
            this.character.isDead();
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
        this.addToMap(this.endboss);
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBarLife);
        this.addToMap(this.statusBarCoin);
        this.addToMap(this.statusBarBottle);
        this.addToMap(this.endScreen);
        if (this.character.x > 4943 || this.endboss.x < 5400) {
            this.addToMap(this.statusBarEndboss);
            this.addToMap(this.statusBarEndbossIcon);
        }
        
        // Draw() wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        });
    }

    // Arrays werden durchlaufen, damit alle Objekte zum Canvas hinzugefügt werden
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