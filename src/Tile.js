const Tile = function (x, y) {
	this.x = x;
	this.y = y;
	this.color = undefined;
}

Tile.prototype.createTileColor = function (tileColors) {
	const index = Math.floor( Math.random() * tileColors.length );
	this.color = tileColors[index];
}
