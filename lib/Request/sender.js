const Config = require('../Config');
// const fetch = require('node-fetch');

module.exports = class Sender {
	send(action, data)
	{
		const config = new Config();

		fetch(config.getBitrixUrl() + action, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data),
		});
	}
}