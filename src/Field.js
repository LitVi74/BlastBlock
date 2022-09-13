const Field = function (row, column, tileColors) {
	this.tiles = [];

	for(let index = 0; index < column * row; index ++) {
		const coordinateX = index % row;
		const coordinateY = Math.floor(index / column);

		const tile = new Tile(coordinateX, coordinateY);
		tile.createTileColor(tileColors);

		this.tiles.push(tile);
	}
}
