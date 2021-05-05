import { Field } from './field.js';
import { defaultSetting } from './default.js'

export class Game {
    constructor(config){
        this.default = defaultSetting;

        // Создаем поле
        this.field = new Field({
            width: config.width || this.default.width,
            height: config.height || this.default.height,
            colors: config.colors || this.default.colors,
            minGroup: config.minGroup || this.default.minGroup,
            canvas: config.canvas
        });

        // Заполняем поле тайлами случайного цвета
        this.field.fill();
        
    }
}