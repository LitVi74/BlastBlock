let statuses = {
    'fite': 1,  //сгорающий
    'empty': 2, //сгоевший
    'default': 3//обычный
};

class Tile {
    constructor (color) {
        this.color = color;
        this.position = null;
        this.status = statuses.default;
        this.isBomb = false;
    }
}

Tile.statuses = statuses;

export { Tile }