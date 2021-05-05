import { Position } from "./position.js";
export { Tile } from "./tile.js";

export class Canvas {
    constructor (canvas, tile = { width: 60, height: 60 }) {

        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');

        let canvasCoords = this.canvas.getBoundingClientRect();

        this.canvasX = canvasCoords.x;
        this.canvasY = canvasCoords.y;

        this.canvas.addEventListener('click', (event) => this.onClick(event));

        this.tile = tile;
        this.width = 0;
        this.height = 0;
        this.cols = 0;
        this.rows = 0;

        this.subscribers = {};
    }

    draw(field) { // закрвшиваем поле

        if (!field || !field.length || !field[0].length) {
            return;
        }

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

    drawTile(tile) {// закрашиваем один тайл

        let coords = this.getCoordsByPosit(tile.position);
        this.ctx.fillStyle = tile.color;
        this.ctx.fillRect(coords.x, coords.y, this.tile.width, this.tile.height);
        this.ctx.fill();

        //--- Прорисовка для всех возможных вариантов ---
    }

    getCoordsByPosit(posit) {// координаты верхнего правого угла тайла
        let x = posit.x * this.tile.width;
        let y = posit.y * this.tile.height;

        return new Position(x, y);
    }

    getPositByCoords(coords) {
        let x = Math.floor(coords.x / this.tile.width);
        let y = Math.floor(coords.y / this.tile.height);
        return new Position(x, y);
    }

    onClick(event) {//передает позицию тайла при клике
        let x = event.clientX - this.canvasX;
        let y = event.clientY - this.canvasY;
        let position = this.getPositByCoords(new Position(x, y));
        this.publish('click', position);
    }

    subscribe(event, callback) {// связка событие <=> функция 
        if (!this.subscribers[event]) this.subscribers[event] = [];

        this.subscribers[event].push(callback);
    }

    publish(event, data) {
        let subscribers = this.subscribers[event];
        subscribers.forEach(callback => callback(data));
    }
}