const Field = function (row, column, tileColors, minGroupSize, minGroupSizeForBomb) {
	this.row = row;
	this.column = column;
	this.tileColors = tileColors;
	this.minGroupSize = minGroupSize;
	this.minGroupSizeForBomb = minGroupSizeForBomb;
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

	pressedTile.checkBomb() ? this.selectBurningTilesForBomb(pressedTile) : this.selectBurningTiles(pressedTile);

	if (this._burningTiles.size >= this.minGroupSize) {
		if (
			this._burningTiles.size >= this.minGroupSizeForBomb &&
			!pressedTile.checkBomb()
		) {
			pressedTile.setIsBomb(true);
			this._burningTiles.delete(pressedTile);
		}

		this.burnTiles();
		const columnNumbers = this.ascentTiles();
		this.dropTiles(columnNumbers);
	}

	this._burningTiles.clear();
};

Field.prototype.selectBurningTilesForBomb = function (startTile) {
	for (let coordinateX = startTile.x - 1; coordinateX <= startTile.x + 1; coordinateX++) {
		for (let coordinateY = startTile.y - 1; coordinateY <= startTile.y + 1; coordinateY ++) {
			const currentTile = this.tiles.find(function (tile) {
				return tile.x === coordinateX && tile.y === coordinateY;
			});

			if (!currentTile || this._burningTiles.has(currentTile)) continue;
			this._burningTiles.add(currentTile);

			if (currentTile.checkBomb()) this.selectBurningTilesForBomb(currentTile);
		}
	}
}

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
		tile.setIsBomb(false);
		tile.burnTileAnimation();
		tile.createTileColor(tileColors);
	})
};

/*
	Поднимает сгоревшие плитки за пределы поля
	Возврашает номера колонок, в которых сгорели плитки
 */
Field.prototype.ascentTiles = function () {
	const row = this.row;
	const columnNumbers = new Set();

	this._burningTiles.forEach(function (tile, tileKey, set) {
		if (!columnNumbers.has(tile.x)) {
			columnNumbers.add(tile.x);
		}

		const columnOfTileCount = Array.from(set).filter(function (elem) {
			return elem.x === tile.x;
		}).length;

		tile.ascentTile(cc.p(tile.x, row + columnOfTileCount - 1));

		set.delete(tile);
	});

	this._burningTiles.clear();

	return columnNumbers;
};

Field.prototype.dropTiles = function (columnNumbers) {
	const tiles = this.tiles;

	columnNumbers.forEach(function (numbers) {
		const columnOfTile = tiles.filter(function (tile) {
			return tile.x === numbers;
		}).sort(function (tileA, tileB) {
			if (tileA.y < tileB.y) return -1;
		});

		columnOfTile.forEach(function (tile, index) {
			if (tile.y > index)
				tile.dropTile(tile.y - index);
		})
	})
}
