import { Tile } from './tile.js'; 
import { Position } from './position.js';
import { Canvas } from './canvas.js';

export class Field {
    constructor (config) { //создание поля 
        this.width = config.width;
        this.height = config.height;
        this.colors = config.colors;

        this.cells = [];
        for (let x = 0; x < this.height; x++ ) {
            this.cells[x] = [];

            for (let y = 0; y < this.width; y++ ) {
                this.cells[x].push(null);
            }
        }
        console.log(this.cells);

        this.canvas = new Canvas(config.canvas); 
    }

    fill() {
        this.forCell(posit => {
            let cell = this.cells[posit.x][posit.y];
            if(!cell) {
                let tile = new Tile(this.getColor());
                tile.position = posit;
                this.cells[posit.x][posit.y] = tile;
            }
        })

        this.canvas.draw(this.cells);
    }

    forCell(callback) {
        for (let x = 0; x < this.height; x++) {
            for (let y = 0; y < this.width; y ++){
                callback(new Position(x, y));
            }
        }
    }

    getColor(){
        let index = Math.floor( Math.random() * this.colors.length );
        return this.colors[index];
    }
}