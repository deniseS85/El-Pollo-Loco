class Level {
    enemies;
    clouds;
    background;
    level_end_x = 5127;

    constructor(enemies, clouds, background) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.background = background;
    }
}