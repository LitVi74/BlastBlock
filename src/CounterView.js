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
		counter.updateExperience = this.updateExperienceCounter.bind(this);

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
		));

		background.setAnchorPoint(0.5, 0.5);
		background.setPosition(this.width / 4.5, this.height / 2);

		this.addStepsCounter(background);
		this.addExperienceCounter(background);

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

		ball.addChild(this.steps);
		Node.addChild(ball);
	},

	addExperienceCounter: function (Node) {
		const experienceBackground = new ccui.Scale9Sprite(
			resources.Experience_png);

		const experienceBackgroundSize = experienceBackground.getContentSize();
		experienceBackground.setCapInsets(cc.rect(
			experienceBackgroundSize.width / 2 - 1,
			experienceBackgroundSize.height / 2 - 1,
			2,
			2
		));
		experienceBackground.setContentSize(cc.size(
			Node.width * 0.6 + experienceBackgroundSize.width / 2,
			Node.height / 4 + experienceBackgroundSize.height / 2
		))

		experienceBackground.setAnchorPoint(0.5, 1);
		experienceBackground.setPosition( cc.p(
			Node.width / 2,
			Node.height / 2
		));

		const experienceText = new cc.LabelTTF('Опыт', 'Marvin');
		experienceText.fontSize = 32;
		experienceText.setAnchorPoint(0.5, 0.5)
		experienceText.setPosition(cc.p(
			experienceBackground.width / 2,
			experienceBackground.height * 0.7
		))

		this.experience = new cc.LabelTTF(String(this.counter.experience), 'Marvin');
		this.experience.fontSize = 24;
		this.experience.setPosition(cc.p(
			experienceBackground.width / 2,
			experienceBackground.height * 0.4
		));

		experienceBackground.addChild(experienceText);
		experienceBackground.addChild(this.experience);
		Node.addChild(experienceBackground);
	},

	addProgressBar: function () {
		this.addChild(this.progressBar,0);
	},

	updateStepsCounter: function () {
		this.steps.setString(this.counter.steps);
	},

	updateExperienceCounter: function () {
		this.experience.setString(this.counter.experience);
	},

	setNewProgressBarValue: function (newProgressValue) {
		this.progressBar.setProgress(newProgressValue);
	},
})
