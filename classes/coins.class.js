class Coins extends DrawableObject { 
    IMAGES_COIN = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png',
    ];

    constructor() {
        super();
        this.loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES_COIN);
        this.animate();
        this.y = 200;
        this.x = 40;
        this.width = 130;
        this.height = 130;  
    }

    animate() {
        setInterval(() => {
          this.playAnimation(this.IMAGES_COIN);
        }, 250);
      }
}