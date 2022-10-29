const TileView = cc.Node.extend({
	ctor: function (tile, width, height) {
		this._super();
		this.tile = tile;

		this.tile.burnTileAnimation = this.burnTileAnimation.bind(this);
		this.tile.ascentAndViewTile = this.ascentAndViewTile.bind(this);
		this.tile.dropTileAnimation =  this.dropTileAnimation.bind(this);
		this.tile.setIsBombView = this.setIsBombView.bind(this);

		this.setContentSize(cc.size(width, height));
	},

	setPositionByCoordinates: function () {
		this.setPosition(cc.p(
			this.width * this.tile.x,
			this.height * this.tile.y
		))
	},

	addSprite: function () {
		const tileColor = this.tile.getTileColor();
		const sprite = cc.Sprite.create(resources[tileColor + '_tile']);
		sprite.setVertexRect(cc.rect(0, 0, this.width, this.height));
		sprite.setPosition(cc.p(this.width / 2, this.height / 2));
		sprite.setContentSize(this.width, this.height);

		this.addChild(sprite, -1);
	},

	burnTileAnimation: function () {
		const sprites = this.getChildren()

		sprites.forEach(function (sprite) {
			sprite.runAction(new cc.Sequence(
				new cc.RemoveSelf(false),
			));
		});
	},

	ascentAndViewTile: function () {
		this.setPositionByCoordinates();
		this.addSprite();
	},

	dropTileAnimation: function () {
		const dropAnimation = new cc.MoveTo(
			defaultSetting.animationTime.drop,
			cc.p(
				this.width * this.tile.x,
				this.height * this.tile.y
			)
		);

		this.runAction(dropAnimation);
	},

	setIsBombView: function () {
		const sprite = cc.Sprite.create(resources["Star_png"]);
		sprite.setPosition(cc.p(this.width / 2, this.height * 0.455));
		sprite.setVertexRect(
			cc.rect(0, 0, this.width * 0.65, this.height * 0.535)
		);
		sprite.setContentSize(this.width * 0.65, this.height * 0.535);
		sprite.setOpacity(100)

		this.addChild(sprite);
	},
})
