const Config = require('../Config');
// const fetch = require('node-fetch');

module.exports = class Sender {
	orderItem(order)
	{
		this.send('onItemsOrdered', order);
	}

	send(action, data)
	{
		const config = new Config();

		fetch(config.getBitrixUrl() + action, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data),
		}).then(response => response.json()).then(console.log);
	}
}