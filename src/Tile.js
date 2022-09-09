const Tile = cc.Node.extend({
	ctor: function (width, height) {
		this._super();
		this._tileColor = this.getRandomColor();

		this.setContentSize(cc.size(width, height));

		this.addSprite();
	},

	addSprite: function () {
		const sprite = cc.Sprite.create(resources[this._tileColor + '_tile']);
		sprite.setVertexRect(cc.rect(0, 0, this.width, this.height));
		sprite.setPosition(cc.p(this.width / 2, this.height / 2));
		sprite.setContentSize(this.width, this.height);

		this.addChild(sprite, -1);
	},

	getRandomColor: function () {
		const tileColors = defaultSetting.tile.colors;

		const index = Math.floor( Math.random() * tileColors.length );
		return tileColors[index];
	},

})
