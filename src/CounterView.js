const CounterView = cc.Node.extend({
	ctor: function (counter) {
		this._super();
		this.counter = counter;
		this.progressBar = new ProgressBar();

		counter.setNewProgressValue = this.setNewProgressBarValue.bind(this);

		this.addProgressBar();
	},

	addProgressBar: function () {
		this.addChild(this.progressBar);
	},

	setNewProgressBarValue: function (newProgressValue) {
		this.progressBar.setProgress(newProgressValue);
	}
})
