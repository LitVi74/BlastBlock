import { Field } from './field.js';
import { defaultSetting } from './default.js';
import { Canvas } from './canvas.js';
import { HTMLBinder } from './html-progress.js'

export class Game {
    constructor(config){

        this.points = 0;
        this.roundPoints = 100;
        this.steps = 15;

        this.default = defaultSetting;

        new HTMLBinder(this, 'progress-indicator', 'percent');
        this.percent = 0;
        
        let params = {
            type: Phaser.CANVAS,
            width: config.cols || this.default.cols * this.default.tile.width,
            height: config.rows || this.default.rows * this.default.tile.height,
            backgroundColor: '#2d2d2d',
            parent: 'phaser-example',
            canvas: document.getElementById('myGame'),
            scene: Canvas
        };
        
        this.game = new Phaser.Game(params);

        let elem = document.getElementsByTagName("canvas")[0];
        elem.addEventListener("point", (event) => this.onPoints(event));

        // Создаем поле
        this.game.field_ = new Field({
            cols: config.cols || this.default.cols,
            rows: config.rows || this.default.rows,
            colors: config.colors || this.default.colors,
            minGroup: config.minGroup || this.default.minGroup,
            tile: config.tile || this.default.tile
        });
    }

    onPoints(event){
        console.log(`${event.detail.count} tiles`)
        this.steps--;

        this.points += event.detail.count;
        this.percent = this.points/this.roundPoints * 100;

        if (this.points >= this.roundPoints) this.finish();

        if (this.steps <= 0) this.finish();
    }

    finish() {
        console.log('finish')
    }
}