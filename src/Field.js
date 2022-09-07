const Field = cc.DrawNode.extend({
	ctor: function (columnCount, rowCount, tileWidth, tileHeight) {
		this._super();
		this.columnCount = columnCount;
		this.rowCount = rowCount;
		this.tileWidth = tileWidth;
		this.tileHeight = tileHeight;

		this.setName('Field');
		this.setContentSize(
			cc.size(
				this.columnCount * this.tileWidth,
				this.rowCount * this.tileHeight
			)
		);
		this.drawRect(
			cc.p(0,0),
			cc.p(this.width,this.height),
			cc.color(255,0,0,0),
			3,
			cc.color(0,255,0,255)
		);

		this.addBackGround();
	},

	addBackGround: function () {
		const background = new ccui.Scale9Sprite(
			resources.Field_png
		);

		const backgroundSize = background.getContentSize();
		background.setCapInsets(
			cc.rect(
				backgroundSize.width / 2 - 1,
				backgroundSize.height / 2 - 1,
				2,
				2
			)
		);
		background.setContentSize(cc.size(
			this.width + backgroundSize.width / 2,
			this.height + backgroundSize.height / 2));
		background.setPosition(this.width / 2, this.height / 2)

		this.addChild(background, -1);
	}
})

/* import { Tile } from './tile.js';
import { Position } from './position.js';
import { Canvas } from './canvas.js';

export class Field {
    constructor (config) { //создание поля 
        this.width = config.width;
        this.height = config.height;
        this.colors = config.colors;
        this.minGroup = config.minGroup;

        this.cells = [];
        for (let x = 0; x < this.height ; x++ ) {
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
        for (let x = 0; x < this.height ; x++) {
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
        
        if(neightbors.length >= this.minGroup){
            this.canvas.burn(neightbors, () =>{
                neightbors.forEach(posit => {
                    this.cells[posit.x][posit.y].color = 'black';
                })
                this.move();
            });
        }
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

    move() {

        let cols = [];
        this.forCell(point => {
            if (!cols[point.x]) cols[point.x] = [];
            cols[point.x][point.y] = this.cells[point.x][point.y];
        })

        for (let x = 0; x < this.height; x++) {
            for (let y = 0; y < this.width; y++){

            }
        }

        cols.forEach((col, x) => {
            col.forEach((cell, y) =>{
                cell.from = cell.position;

                if (cell.color == 'black') {
                    if (y !== 0) {
                        col.unshift(col.splice(y, 1)[0]); 
                    }
                }
            })

            for (let i = 0; i < this.height; i++) {
                col[i].position = new Position(x, i);
            }
        })

        cols.forEach((col, x) => {
            col.forEach((cell, y) => {                
                this.cells[x][y] = cell;
            })
        })

        console.log(this.cells);

        this.canvas.move(this.cells, () => this.canvas.fill())
    }

} */
