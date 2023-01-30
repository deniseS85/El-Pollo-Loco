class Character extends MovableObject {
    y = 150;
    height = 280;
    width = 140;
    CHARACTER_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];
    currentImage = 0;
   

    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.CHARACTER_WALKING);
        this.animate();
    }

    animate() {
        setInterval(() => {
            let index = this.currentImage % this.CHARACTER_WALKING.length; //setIntervall geht nur bis zum letzten Bild im Array
            let path = this.CHARACTER_WALKING[index];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 120);
        
    }

    jump() {

    }
}