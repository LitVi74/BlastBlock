import { Field } from './field.js';
import { defaultSetting } from './default.js';
import { Canvas } from './canvas.js';
import { HTMLBinder } from './html-binder.js'

export class Game {
    constructor(config){

        this.points = 0;
        this.roundPoints = 100;
        this.steps = 15;

        this.default = defaultSetting;

        new HTMLBinder(this, 'data-bind', [
            'roundPoints', 'points', 'steps', 'percent'
        ]);
        this.points = 0;
        this.roundPoints = 100;
        this.steps = 15;
        this.percent = 0;
        
        let params = {
            type: Phaser.CANVAS,
            width: config.cols || this.default.cols * this.default.tile.width,
            height: config.rows || this.default.rows * this.default.tile.height,
            backgroundColor: '#0d233d',
            parent: 'field-game',
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
        this.steps--;

        this.points += event.detail.count;
        this.percent = this.points/this.roundPoints * 100;

        if (this.points >= this.roundPoints) this.finish();

        if (this.steps <= 0) this.finish();
    }

    finish() {
        let fieldGame = document.getElementById('field-game');
        fieldGame.style.pointerEvents = 'none';
        let div = '<div class="end">';
        if (this._percent >= 100) {
            div += '<span>Поздравляем <br> Вы победили</span>';
        } else {
            div += '<span>Упс <br> Вы проиграли :(</span>';
        }
        div += '</div>';
        fieldGame.insertAdjacentHTML('afterend', div);
    }
}