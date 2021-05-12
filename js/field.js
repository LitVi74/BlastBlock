import { Tile } from './tile.js'; 
import { Position } from './position.js';
import { Canvas } from './canvas.js';

export class Field {
    constructor (config) { //создание поля 
        this.cols = config.cols;
        this.rows = config.rows;
        this.colors = config.colors;
        this.minGroup = config.minGroup;

        this.cells = [];
        for (let x = 0; x < this.rows ; x++ ) {
            this.cells[x] = [];

            for (let y = 0; y < this.cols; y++ ) {
                this.cells[x].push(null);
            }
        }

        this.canvas = new Canvas(config.canvas);
    }

    fill(obj) {// отрисовка поля
        this.forCell(posit => {
            let cell = this.cells[posit.x][posit.y];
            if(!cell) {
                let tile = new Tile(this.getRandomColor());
                tile.position = posit;
                this.cells[posit.x][posit.y] = tile;
            }
        })

        this.canvas.draw(this.cells, obj);
    }

    forCell(callback) {
        for (let x = 0; x < this.rows ; x++) {
            for (let y = 0; y < this.cols; y ++){
                callback(new Position(x, y));
            }
        }
    }

    getRandomColor(){
        let index = Math.floor( Math.random() * this.colors.length );
        return this.colors[index];
    }
}