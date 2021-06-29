import { Tile } from './tile.js'; 
import { Position } from './position.js';

export class Field {
    constructor (config) { //создание поля 
        this.cols = config.cols;
        this.rows = config.rows;
        this.colors = config.colors;
        this.minGroup = config.minGroup;
        this.tile = config.tile;

        this.pointCount = 0;
        this.cells = [];
        for (let x = 0; x < this.rows ; x++ ) {
            this.cells[x] = [];

            for (let y = 0; y < this.cols; y++ ) {
                this.cells[x].push(null);
            }
        }
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

        return this.cells;
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

    onClick(position) {

        let neightbors = this.getNeightdors(position);
        if (neightbors.length < this.minGroup) return;
        this.onPoints(neightbors.length);
        return neightbors;
    }

    getNeightdors(position) {
        let tile = this.cells[position.x][position.y];
        if (!tile) return;

        if(this.cells[position.x][position.y].isBomb){

            let neightbors = [];

            let check = (position) => {
                if( position.x < 0 || position.y < 0 || position.x > this.cols - 1 || position.y > this.rows - 1 )
                    return;
                neightbors.push(position);
            }
            check(position);
            check(new Position(position.x - 1, position.y));
            check(new Position(position.x, position.y - 1));
            check(new Position(position.x + 1, position.y));
            check(new Position(position.x, position.y + 1));
            check(new Position(position.x - 1, position.y - 1));
            check(new Position(position.x - 1, position.y + 1));
            check(new Position(position.x + 1, position.y - 1));
            check(new Position(position.x + 1, position.y + 1));


            this.cells[position.x][position.y].isBomb = false;

            return neightbors;
        }

        let color = tile.color;
        let neightbors = [];
        let check = (position) => {
            if( position.x < 0 || position.y < 0 || position.x > this.cols - 1 || position.y > this.rows - 1 )
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

        if (neightbors.length >= 6) {
            this.cells[position.x][position.y].isBomb = true;
        }

        return neightbors;
    }

    move() {

        let cols = [];
        this.forCell(posit => {
            if (!cols[posit.x]) cols[posit.x] = [];
            cols[posit.x][posit.y] = this.cells[posit.x][posit.y];
        })

        cols.forEach((col, x) => {
            col.forEach((cell, y) =>{
                if (cell == null) {
                    if (y !== 0) {
                        col.unshift(col.splice(y, 1)[0]); 
                    }
                }else{
                    cell.from = cell.position;
                }
            })

            for (let i = 0; i < this.rows; i++) {
                if (col[i] != null) col[i].position = new Position(x, i);
            }
        })

        cols.forEach((col, x) => {
            col.forEach((cell, y) => {                
                this.cells[x][y] = cell;
            })
        })

        return this.cells;
    }

    createNewTile(){
        this.forCell(posit => {
            if (this.cells[posit.x][posit.y] == null){
                let tile = new Tile(this.getRandomColor());
                tile.position = posit;
                this.cells[posit.x][posit.y] = tile;
            }
        })
    }

    onPoints(count){
        let canvas = document.getElementsByTagName("canvas");
        canvas[0].dispatchEvent(new CustomEvent("point", {
            detail: { count }
        }));
    }
}