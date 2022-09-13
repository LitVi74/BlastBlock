const TileView = cc.Node.extend({
	ctor: function (tile, width, height) {
		this._super();
		this.tile = tile;

		this.setContentSize(cc.size(width, height));
	},

	setPositionByCoordinates: function () {
		this.setAnchorPoint(cc.p(0, 0));
		this.setPosition(cc.p(
			this.width * this.tile.x,
			this.height * this.tile.y
		))
	},

	addSprite: function () {
		const sprite = cc.Sprite.create(resources[this.tile.color + '_tile']);
		sprite.setVertexRect(cc.rect(0, 0, this.width, this.height));
		sprite.setPosition(cc.p(this.width / 2, this.height / 2));
		sprite.setContentSize(this.width, this.height);

		this.addChild(sprite, -1);
	},
})