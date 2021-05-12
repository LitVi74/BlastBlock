import { Position } from "./position.js";

export class Canvas{
    constructor (canvas, tile = { width: 60, height: 60 }) {

        this.canvas = canvas;
        
        this.tile = tile;
        this.width = 0;
        this.height = 0;
        this.cols = 0;
        this.rows = 0;

        this.subscribers = {};
    }
    
    draw(field, obj) { // закрвшиваем поле
        if (!field || !field.length || !field[0].length) {
            return;
        }

        if (this.rows !== field.length) {

            this.height = field.length * this.tile.height;
            this.canvas.height = `${this.height}`;
            this.rows = field.length;
        }

        if (this.cols !== field[0].length) {

            this.width = field[0].length * this.tile.width;
            this.canvas.width = `${this.width}`;
            this.cols = field[0].length;
        }


        for (let x = 0; x < this.rows; x++) {
            for (let y = 0; y < this.cols; y++) {
                this.drawTile(field[x][y].position, field[x][y].color, obj);
            }
        }
    }

    /* !!!!! Подумать как избежать переноса obj !!!!! */
    
    drawTile(posit, color, obj) {// закрашиваем один тайл
        let coords = this.getCoordsByPosit(posit);
        let graphics = obj.add.graphics();
        graphics.fillStyle(color);
        graphics.fillRect(coords.x, coords.y, this.tile.width, this.tile.height);

        //--- Прорисовка для всех возможных вариантов ---
    }

    getCoordsByPosit(posit) {// координаты верхнего правого угла тайла
        let x = posit.x * this.tile.width;
        let y = posit.y * this.tile.height;

        return new Position(x, y);
    }
}