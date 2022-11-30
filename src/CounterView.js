const CounterView = cc.Node.extend({
	ctor: function (counter) {
		this._super();
		this.counter = counter;
		this.progressBar = new ProgressBar();
		this.steps = undefined;

		const size = cc.winSize;
		this.setContentSize(cc.size(size.width, size.height));

		counter.setNewProgressValue = this.setNewProgressBarValue.bind(this);
		counter.updateSteps = this.updateStepsCounter.bind(this);

		this.addBackGround();
		this.addProgressBar();
	},

	addBackGround: function () {
		const background = new ccui.Scale9Sprite(
			resources.Counter_BG_png);

		const backgroundSize = background.getContentSize();
		background.setCapInsets(cc.rect(
			backgroundSize.width / 2 - 1,
			backgroundSize.height / 2 - 1,
			2,
			2
		))
		background.setContentSize(cc.size(
			Math.max(this.width / 5, 400) + backgroundSize.width / 2,
			this.height / 1.8 + backgroundSize.height / 2
		))

		background.setAnchorPoint(0.5, 0.5);
		background.setPosition(this.width / 4.5, this.height / 2);

		this.addStepsCounter(background)

		this.addChild(background,0);
	},

	addStepsCounter: function (Node) {
		const ball = cc.Sprite.create(resources.Ball_png);

		ball.setPosition(cc.p(
			Node.width / 2,
			Node.height / 4 * 3
		));

		this.steps = new cc.LabelTTF(this.counter.steps, 'Marvin');
		this.steps.fontSize = 72;
		this.steps.setPosition(cc.p(
			ball.width / 2,
			ball.height / 2
		));

		ball.addChild(this.steps)
		Node.addChild(ball)
	},

	addProgressBar: function () {
		this.addChild(this.progressBar,0);
	},

	updateStepsCounter: function () {
		this.steps.setString(this.counter.steps);
	},

	setNewProgressBarValue: function (newProgressValue) {
		this.progressBar.setProgress(newProgressValue);
	},
})
