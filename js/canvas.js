import { Position } from "./position.js";

export class Canvas{

    create () {
        this.cols_ = 0;
        this.rows_ = 0;
        let cells_ = this.game.field_.fill();
        this.draw_(cells_);
    }

    draw_(field) { // закрвшиваем поле
        if (!field || !field.length || !field[0].length) {
            return;
        }

        if (this.rows_ !== field.length) {

            this.rows_ = field.length;
        }

        if (this.cols_ !== field[0].length) {

            this.cols_ = field[0].length;
        }

        let graphics = this.add.graphics();

        for (let x = 0; x < this.rows_; x++) {
            for (let y = 0; y < this.cols_; y++) {
                this.drawTile_(field[x][y].position, field[x][y].color, graphics);
            }
        }
    }

    drawTile_(posit, color, graphics) {// закрашиваем один тайл
        let coords = this.getCoordsByPosit_(posit);
        graphics.fillStyle(color);
        graphics.fillRoundedRect(coords.x + 1, coords.y - 1, this.game.field_.tile.width - 1, this.game.field_.tile.height - 1, 7);

        //--- Прорисовка для всех возможных вариантов ---
    }

    getCoordsByPosit_(posit) {// координаты верхнего правого угла тайла
        let x = posit.x * this.game.field_.tile.width;
        let y = posit.y * this.game.field_.tile.height;

        return new Position(x, y);
    }

}