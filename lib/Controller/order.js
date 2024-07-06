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
			orders: [
				{
				id: 1,
				title: 'Бамбл',
			},
				{
					id: 2,
					title: 'Фильтр',
				}
			],
		};

		this.sender.send('onItemsOrdered', data);
	}
}