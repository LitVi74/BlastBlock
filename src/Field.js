const Field = function (row, column, tileColors, minGroupSize) {
	this.tileColors = tileColors;
	this.minGroupSize = minGroupSize;
	this.tiles = [];
	this._burningTiles = new Set();

	for(let index = 0; index < column * row; index ++) {
		const coordinateX = index % row;
		const coordinateY = Math.floor(index / column);

		const tile = new Tile(coordinateX, coordinateY);
		tile.createTileColor(tileColors);

		this.tiles.push(tile);
	}
}

Field.prototype.handleClickField = function (tilePosition) {
	const pressedTile = this.tiles.find(function (tile) {
		return tile.x === tilePosition.x && tile.y === tilePosition.y;
	});

	this.selectBurningTiles(pressedTile);

	if (this._burningTiles.size >= this.minGroupSize)
		this.burnTiles();

	this._burningTiles.clear();
};

Field.prototype.selectBurningTiles = function (startTile) {
	const burningTiles = this._burningTiles;
	const tiles = this.tiles;
	const color = startTile.getTileColor();

	const checkNeighbors = function (currentTile) {
		if (!currentTile || burningTiles.has(currentTile))
			return;

		const currentTileColor = currentTile.getTileColor();

		if (currentTileColor !== color)
			return;

		burningTiles.add(currentTile);

		checkNeighbors(tiles.find(function (tile) {
			return tile.x === currentTile.x - 1 && tile.y === currentTile.y;
		}));
		checkNeighbors(tiles.find(function (tile) {
			return tile.x === currentTile.x + 1 && tile.y === currentTile.y;
		}));
		checkNeighbors(tiles.find(function (tile) {
			return tile.x === currentTile.x && tile.y === currentTile.y - 1;
		}));
		checkNeighbors(tiles.find(function (tile) {
			return tile.x === currentTile.x && tile.y === currentTile.y + 1;
		}));
	};

	checkNeighbors(startTile);
};

Field.prototype.burnTiles = function () {
	this._burningTiles.forEach(function (tile) {
		tile.burnTileAnimation();
	})
}
