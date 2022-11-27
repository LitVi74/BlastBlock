const ProgressBar = cc.Node.extend({
	ctor: function () {
		this._super();
		this.progress = undefined;

		const size = cc.winSize;
		this.setContentSize(cc.size(
			Math.max(size.width / 3, 400),
			size.height * 0.05,
		))

		this.setAnchorPoint(cc.p(0, 0.5));
		this.setPosition(size.width / 2, size.height - this.height);

		this.addBackGround();
		this.addProgressBar();
		this.addProgressText();
	},

	addBackGround: function () {
		const progressBarBackground = new ccui.Scale9Sprite(
			resources.Progress_Bar_BG_png
		);
		progressBarBackground.setAnchorPoint(cc.p(0.5, 0.5));
		progressBarBackground.setPosition(cc.p(0, this.height / 2))

		const backgroundSize = progressBarBackground.getContentSize();
		progressBarBackground.setCapInsets(
			cc.rect(
				backgroundSize.width / 2 - 1,
				backgroundSize.width / 2 - 1,
				2,
				backgroundSize.height - backgroundSize.width + 2
			)
		);
		progressBarBackground.setContentSize(cc.size(
			this.width + backgroundSize.width / 2,
			this.height + backgroundSize.height / 2));

		this.addChild(progressBarBackground,-1);
	},

	addProgressBar: function () {
		const progressBackground = new ccui.Scale9Sprite(
			resources.Progress_BG_png);
		this.progress = new ccui.Scale9Sprite(
			resources.Progress_png);

		const backgroundSize = progressBackground.getContentSize();
		const progressSize = this.progress.getContentSize();

		progressBackground.setCapInsets(
			cc.rect(
				backgroundSize.width / 2 - 1,
				backgroundSize.height / 2 - 1,
				2,
				2));
		this.progress.setCapInsets(
			cc.rect(
				progressSize.width / 2 - 1,
				progressSize.height / 2 - 1,
				2,
				2));

		progressBackground.setContentSize(cc.size(
			this.width * 0.9 + backgroundSize.width / 2,
			backgroundSize.height));

		progressBackground.setAnchorPoint(cc.p(0.5, 0));
		this.progress.setAnchorPoint(cc.p(0,0.5));
		this.progress.setPosition(cc.p(
			0,
			progressBackground.height / 2));

		progressBackground.addChild(this.progress);
		this.addChild(progressBackground,1);
	},

	addProgressText: function () {
		const label = new cc.LabelTTF('Прогресс', 'Marvin');
		label.setPosition(cc.p(0, this.height))

		this.addChild(label);
	}
});
