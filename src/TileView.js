const TileView = cc.Node.extend({
	ctor: function (tile, width, height) {
		this._super();
		this.tile = tile;
		this.tileColor = tile.getTileColor();

		this.tile.burnTileAnimation = this.burnTileAnimation.bind(this);

		this.setContentSize(cc.size(width, height));
	},

	setPositionByCoordinates: function () {
		this.setPosition(cc.p(
			this.width * this.tile.x,
			this.height * this.tile.y
		))
	},

	addSprite: function () {
		const sprite = cc.Sprite.create(resources[this.tileColor + '_tile']);
		sprite.setVertexRect(cc.rect(0, 0, this.width, this.height));
		sprite.setPosition(cc.p(this.width / 2, this.height / 2));
		sprite.setContentSize(this.width, this.height);

		this.addChild(sprite, -1);
	},

	burnTileAnimation: function () {
		const sprites = this.getChildren()

		sprites.forEach(function (sprite) {
			sprite.runAction(new cc.Sequence(
				new cc.ScaleTo(0.5, 0),
				new cc.RemoveSelf(),
			));
		});
	},

	ascentAndViewTile: function () {
		this.setPositionByCoordinates();
		this.addSprite();
	}
})
