import { Field } from './field.js';
import { defaultSetting } from './default.js';
import { Canvas } from './canvas.js';


export class Game {
    constructor(config){

        this.default = defaultSetting;
        
        let params = {
            type: Phaser.CANVAS,
            width: config.cols || this.default.cols * this.default.tile.width,
            height: config.rows || this.default.rows * this.default.tile.height,
            backgroundColor: '#2d2d2d',
            parent: 'background',
            scene: {
                create: this.create,
            },
            // Создаем поле
            
        };
        
        this.game = new Phaser.Game(params);

        this.game.field_ = new Field({
            cols: config.cols || this.default.cols,
            rows: config.rows || this.default.rows,
            colors: config.colors || this.default.colors,
            minGroup: config.minGroup || this.default.minGroup,
            canvas: this.game
        });
    }

    create () {
        this.game.field_.fill(this);
    }
}