const Game = cc.Scene.extend({
	ctor: function () {
		this._super();

		this.addBackGround();
		this.addField();
	},

	addBackGround: function () {
		const startColor = cc.color(10, 38, 74);
		const endColor = cc.color(16, 61, 121);

		const background = new cc.LayerGradient(startColor, endColor);

		this.addChild(background, -1);
	},

	addField: function (
		rowCount = defaultSetting.rowCount,
		columnCount = defaultSetting.columnCount,
		tileColors = defaultSetting.tile.colors,
		minGroupSize = defaultSetting.minGroupSize,
		minGroupSizeForBomb = defaultSetting.minGroupSizeForBomb,
		tileWidth = defaultSetting.tile.width,
		tileHeight = defaultSetting.tile.height,
	) {
		const size = cc.winSize;

		this.field = new Field(rowCount, columnCount, tileColors, minGroupSize, minGroupSizeForBomb);

		const fieldView = new FieldView(tileWidth, tileHeight, this.field);
		fieldView.setAnchorPoint(cc.p(0, 0));
		fieldView.setPosition(cc.p(size.width / 2, size.height / 5));

		this.addChild(fieldView, 0);
	}
})
