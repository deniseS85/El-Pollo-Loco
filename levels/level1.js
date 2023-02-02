function startLevel1() {
    return new Level ( 
        [
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Endboss()
        ],
        [
            new Cloud('img/5_background/layers/4_clouds/full.png', 0),
            new Cloud('img/5_background/layers/4_clouds/full.png', 1000),
            new Cloud('img/5_background/layers/4_clouds/full.png', 1000*2),
            new Cloud('img/5_background/layers/4_clouds/full.png', 1000*3),
            new Cloud('img/5_background/layers/4_clouds/full.png', 1000*4),
            new Cloud('img/5_background/layers/4_clouds/full.png', 1000*5),
            new Cloud('img/5_background/layers/4_clouds/full.png', 1000*6),
            new Cloud('img/5_background/layers/4_clouds/full.png', 1000*7)
        ],
        [
            new BackgroundObject('img/5_background/layers/air.png', -719),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719),

            new BackgroundObject('img/5_background/layers/air.png', 0),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),

            new BackgroundObject('img/5_background/layers/air.png', 719),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719),

            new BackgroundObject('img/5_background/layers/air.png', 719*2),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719*2),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719*2),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719*2),

            new BackgroundObject('img/5_background/layers/air.png', 719*3),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719*3),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719*3),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719*3),

            new BackgroundObject('img/5_background/layers/air.png', 719*4),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719*4),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719*4),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719*4),

            new BackgroundObject('img/5_background/layers/air.png', 719*5),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719*5),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719*5),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719*5),

            new BackgroundObject('img/5_background/layers/air.png', 719*6),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719*6),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719*6),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719*6),

            new BackgroundObject('img/5_background/layers/air.png', 719*7),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719*7),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719*7),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719*7)
        ],
        [
            new Coins(400, 150),
            new Coins(450, 100),
            new Coins(500, 50),
            new Coins(550, 100),
            new Coins(600, 150),

            new Coins(900, 100),
            new Coins(1000, 100),
            new Coins(1100, 100),

            new Coins(1900, 150),
            new Coins(1950, 100),
            new Coins(2000, 50),
            new Coins(2050, 100),
            new Coins(2100, 150),

            new Coins(3000, 150),
            new Coins(3050, 100),
            new Coins(3100, 50),
            new Coins(3150, 100),
            new Coins(3200, 150),

            new Coins(4000, 100),
            new Coins(4100, 100),
            new Coins(4200, 150),
            new Coins(4300, 150),
            new Coins(4400, 100),
            new Coins(4500, 100),
        ]
    );
}

