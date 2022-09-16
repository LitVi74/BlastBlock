const Game = cc.Scene.extend({
	ctor: function () {
		this._super();

		const size = cc.winSize;

		this.field = new FieldView(
			defaultSetting.columnCount,
			defaultSetting.rowCount,
			defaultSetting.tile.width,
			defaultSetting.tile.height,
			defaultSetting.tile.colors,
			defaultSetting.minGroupSize
		);
		this.field.setAnchorPoint(cc.p(0, 0))
		this.field.setPosition(cc.p(size.width / 2, size.height / 5))
		this.addChild(this.field, 0);

		this.addBackGround();
	},

	addBackGround: function () {
		const startColor = cc.color(10, 38, 74);
		const endColor = cc.color(16, 61, 121);

		const background = new cc.LayerGradient(startColor, endColor);

		this.addChild(background, -1);
	},
})
