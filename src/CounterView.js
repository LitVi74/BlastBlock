const CounterView = cc.Node.extend({
	ctor: function (counter) {
		this._super();
		this.counter = counter;
		this.progressBar = new ProgressBar();

		this.addProgressBar()
	},

	addProgressBar: function () {
		this.addChild(this.progressBar);
	},
})
