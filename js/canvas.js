import { Position } from "./position.js";
export { Tile } from "./tile.js";

export class Canvas {
    constructor (canvas, tile = { width: 60, height: 60 }) {

        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');

        let canvasCoords = this.canvas.getBoundingClientRect();

        this.canvasX = canvasCoords.x;
        this.canvasY = canvasCoords.y;

        this.tile = tile;
        this.width = 0;
        this.height = 0;
        this.cols = 0;
        this.rows = 0;
    }

    draw(field) {

        if (!field || !field.length || !field[0].length) {
            return;
        }

        console.log('field', field)
        if (this.rows !== field.height) {

            this.height = field.length * this.tile.height;
            this.canvas.height = `${this.height}`;
            this.rows = field.length;
        }

        if (this.cols !== field[0].length) {

            this.width = field[0].length * this.tile.width;
            this.canvas.width = `${this.width}`;
            this.cols = field[0].length;
        }

        this.ctx.clearRect(0, 0, this.width, this.height);

        for (let x = 0; x < this.rows; x++) {
            for (let y = 0; y < this.cols; y++) {
                this.drawTile(field [y][x]);
            }
        }
    }

    drawTile(tile) {

        let coords = this.getCoordsByPosit(tile.position);
        this.ctx.fillStyle = tile.color;
        this.ctx.fillRect(coords.x1, coords.y1, this.tile.width, this.tile.height);
        this.ctx.fill();

        //--- Прорисовка для всех возможных вариантов ---
    }

    getCoordsByPosit(posit) {
        let x1 = posit.x * this.tile.width;
        let y1 = posit.y * this.tile.height;

        return {x1, y1};
    }

    getBoundingClientRect(coords) {
        let x = Math.floor(coords.x / this.tile.width);
        let y = Math.floor(coords.y / this.tile.height);
        return new Position(x, y);
    }
}