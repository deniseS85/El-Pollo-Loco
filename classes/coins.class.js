class Coins extends MovableObject { 
  height = 130;
  width = 130;
  offset = {
    top: 10,
    left: 10,
    right: 10,
    bottom: 10,
  };

  IMAGES_COIN = [
      'img/8_coin/coin_1.png',
      'img/8_coin/coin_2.png',
  ];

  constructor(x, y) {
      super();
      this.loadImage('img/8_coin/coin_1.png');
      this.loadImages(this.IMAGES_COIN);
      this.animate();
      this.x = x;
      this.y = y;
  }

  animate() {
      setInterval(() => {
        this.playAnimation(this.IMAGES_COIN);
      }, 250);
    }
}
