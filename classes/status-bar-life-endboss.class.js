class StatusBarEndboss extends DrawableObject{
    IMAGES_LIFE_ENDBOSS = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/100.png',
    ];

    percentage = 100;

    constructor() {
        super();
        this.loadImages(this.IMAGES_LIFE_ENDBOSS);
        this.y = 45;
        this.x = 5520;
        this.width = 200;
        this.height = 50;
        this.reduceLife(100);
    }

    reduceLife(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_LIFE_ENDBOSS[this.lifeStatus()];
        this.img = this.imageCache[path];
    }

    lifeStatus() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage >= 80) {
            return 4;
        } else if (this.percentage >= 60) {
            return 3;
        } else if (this.percentage >= 40) {
            return 2;
        } else if (this.percentage >= 20) {
            return 1;
        } else { 
            return 0;
        }
    }   
}