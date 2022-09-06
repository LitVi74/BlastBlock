const Game = cc.Scene.extend({
	ctor: function () {
		this._super();

		this._addBackGround();
	},

	_addBackGround: function () {
		const startColor = cc.color(10, 38, 74);
		const endColor = cc.color(16, 61, 121);

		const background = new cc.LayerGradient(startColor, endColor);
		background.setLocalZOrder(-1);

		this.addChild(background);
	},
})
