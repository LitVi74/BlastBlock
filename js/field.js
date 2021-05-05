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

        this.canvas = new Canvas(config.canvas); 
        this.canvas.subscribe('click', data => this.onClick(data) );
    }

    fill() {// отрисовка поля
        this.forCell(posit => {
            let cell = this.cells[posit.x][posit.y];
            if(!cell) {
                let tile = new Tile(this.getRandomColor());
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

    getRandomColor(){
        let index = Math.floor( Math.random() * this.colors.length );
        return this.colors[index];
    }

    onClick(position) {
        let neightbors = this.getNeightdors(position);
        console.log(neightbors);
    }

    getNeightdors(position) {
        let tile = this.cells[position.x][position.y];
        if (!tile) return;

        let color = tile.color;
        let neightbors = [];

        let check = (position) => {
            if( position.x < 0 || position.y < 0 || position.x > this.width - 1 || position.y > this.height - 1 )
                return;

            let selectTite = this.cells[position.x][position.y];

            if ( !selectTite || selectTite.checked || selectTite.color !== color ) 
                return;

            neightbors.push(position);
            selectTite.checked = true;

            check(new Position(position.x - 1, position.y));
            check(new Position(position.x + 1, position.y));
            check(new Position(position.x, position.y - 1));
            check(new Position(position.x, position.y + 1))
        }

        check(position);

        return neightbors;
    }
}