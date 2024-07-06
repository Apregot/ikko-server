const Sender = require('../Request/Sender');
module.exports = class Order {
	constructor(req)
	{
		this.sender = new Sender();
		this.req = req;
	}

	orderAction()
	{
		const data = {
			order: {
				id: 1,
				title: 'Бамбл',
			},
		};

		this.sender.orderItem(data);
	}
}