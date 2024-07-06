const Sender = require('../Request/sender');
const Menu = require('../Controller/menu');

module.exports = class Shift {
	constructor(req)
	{
		this.sender = new Sender();
		this.req = req;
	}

	async startAction()
	{
		const menu = await new Menu(this.req).listAction();

		this.sender.send('onShiftStarted', menu);
	}

	endAction()
	{
		this.sender.send('onShiftEnded', {});
	}

	resumeAction()
	{
		this.sender.send('onShiftResumed', {});
	}

	pauseAction()
	{
		this.sender.send('onShiftPaused', {});
	}
}