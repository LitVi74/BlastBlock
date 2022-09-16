const Tile = function (x, y) {
	this.x = x;
	this.y = y;
	this._color = undefined;

	this.burnTileAnimation = function () {};
	this.ascentAndViewTile =  function () {};
}

Tile.prototype.createTileColor = function (tileColors) {
	const index = Math.floor( Math.random() * tileColors.length );
	this._color = tileColors[index];
}

Tile.prototype.getTileColor = function () {
	return this._color;
}

Tile.prototype.setNewCoordinates = function (coordinates) {
	this.x = coordinates.x;
	this.y = coordinates.y;
}

Tile.prototype.ascentTile = function (coordinates) {
	this.setNewCoordinates(coordinates);
	this.ascentAndViewTile();
}
