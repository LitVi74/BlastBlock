const Counter = function (
	maxSteps,
	necessaryExperience,
	experienceUnit)
{
	this.experience = 0;
	this.steps = maxSteps;
	this.necessaryExperience = necessaryExperience;
	this.experienceUnit = experienceUnit;

	this.setNewProgressValue = function () {};
	this.updateSteps = function () {};
	this.updateExperience = function () {};
}

Counter.prototype.addExperience = function (burnedTilesCount) {
	this.steps = this.steps - 1;
	this.experience = this.experience + this.experienceUnit * burnedTilesCount;

	const progressValue = Math.min(this.experience / this.necessaryExperience * 100, 100);
	this.setNewProgressValue(progressValue);
	this.updateSteps();
	this.updateExperience();
}
