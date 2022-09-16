const Field = function (row, column, tileColors, minGroupSize) {
	this.row = row;
	this.tileColors = tileColors;
	this.minGroupSize = minGroupSize;
	this.tiles = [];
	this._burningTiles = new Set();

	for(let index = 0; index < column * row; index ++) {
		const coordinateX = index % column;
		const coordinateY = Math.floor(index / row);

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

	if (this._burningTiles.size >= this.minGroupSize) {
		this.burnTiles();
		this.ascentTiles();
	}

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
	const tileColors = this.tileColors

	this._burningTiles.forEach(function (tile) {
		tile.burnTileAnimation();
		tile.createTileColor(tileColors);
	})
};

/*
	Поднимает сгоревшие плитки за пределы поля
	Возврашает координаты до которых должны упать плитки
 */
Field.prototype.ascentTiles = function () {
	const row = this.row;
	const stopCoordinates = new Set();

	this._burningTiles.forEach(function (tile, tileKey, set) {
		const stopCoordinate = Array.from(stopCoordinates).find(function (coordinates) {
			return coordinates.x === tile.x;
		});

		if (!stopCoordinate || stopCoordinate.y > tile.y) {
			stopCoordinates.delete(stopCoordinate);
			stopCoordinates.add(cc.p(tile.x, tile.y));
		}

		const columnOfTileCount = Array.from(set).filter(function (elem) {
			return elem.x === tile.x;
		}).length;

		tile.ascentTile(cc.p(tile.x, row + columnOfTileCount - 1));

		set.delete(tile);
	});

	this._burningTiles.clear();

	return stopCoordinates;
};
