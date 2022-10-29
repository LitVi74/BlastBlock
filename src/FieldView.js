const FieldView = cc.Node.extend({
	ctor: function (
		columnCount,
		rowCount,
		tileWidth,
		tileHeight,
		tileColors,
		minGroupSize,
		minGroupSizeForBomb,
	) {
		this._super();
		this.fieldBusy = false;
		this.columnCount = columnCount;
		this.rowCount = rowCount;
		this.tileWidth = tileWidth;
		this.tileHeight = tileHeight;
		this.tileColors = tileColors;
		this.minGroupSize = minGroupSize;

		this.field = new Field(rowCount, columnCount, tileColors, minGroupSize, minGroupSizeForBomb);

		this.setContentSize(
			cc.size(
				this.columnCount * this.tileWidth,
				this.rowCount * this.tileHeight
			)
		);

		this.addMask();
		this.addTiles();
		this.addBackGround();

		cc.eventManager.addListener({
			event: cc.EventListener.MOUSE,
			swallowTouches: false,
			onMouseDown: function (event) {
				const target = event.getCurrentTarget();
				const locationInNode = target.convertToNodeSpace(event.getLocation());
				const targetSize = target.getContentSize();
				const rect = cc.rect(0, 0, targetSize.width, targetSize.height);
				if (cc.rectContainsPoint(rect, locationInNode) && !target.fieldBusy) {
					target.fieldBusy = true;

					const tilePosition = target.grtTilePosition(locationInNode);
					target.field.handleClickField(tilePosition);

					cc.director.getScheduler().scheduleCallbackForTarget(target, function() {
						target.fieldBusy = false;
					}, defaultSetting.animationTime.drop, 0, 0, false)
				}
			}
		}, this)
	},

	addBackGround: function () {
		const background = new ccui.Scale9Sprite(
			resources.Field_png
		);

		const backgroundSize = background.getContentSize();
		background.setCapInsets(
			cc.rect(
				backgroundSize.width / 2 - 1,
				backgroundSize.height / 2 - 1,
				2,
				2
			)
		);
		background.setContentSize(cc.size(
			this.width + backgroundSize.width / 2,
			this.height + backgroundSize.height / 2));
		background.setPosition(this.width / 2, this.height / 2);

		this.addChild(background, -1);
	},

	addMask: function () {
		const stencil = cc.DrawNode.create();
		stencil.drawRect(
			cc.p(0, 0),
			cc.p(this.width, this.height),
			cc.color(255, 0, 0, 255),
			0,
			cc.color(0, 0, 0, 0)
		);

		this.mask = cc.ClippingNode.create(stencil);

		this.addChild(this.mask, 0);
	},

	addTiles: function () {
		const tiles = this.field.tiles;

		for (let index = 0; index < tiles.length; index ++) {
			const tile = new TileView(tiles[index], this.tileWidth, this.tileHeight);
			tile.setPositionByCoordinates();
			tile.addSprite();

			this.mask.addChild(tile);
		}
	},

	grtTilePosition: function (location) {
		const tilePositionX = Math.floor(location.x / this.tileWidth);
		const tilePositionY = Math.floor( location.y / this.tileHeight);

		return cc.p(tilePositionX, tilePositionY);
	}
})
