const Sender = require('../Request/sender');

module.exports = class Order {
	constructor(req)
	{
		this.sender = new Sender();
		this.req = req;
	}

	async orderAction()
	{
		const { order } = this.req.body;

		const ids = order.map((it) => it.itemId);

		const rows = await this.query(this.req.db, `
            SELECT * FROM item WHERE ID in (${ids.join(',')})
        `);

		const titles = rows.reduce((acc, it) => ({
            ...acc,
            [it.ID]: it.TITLE,
        }), {});

		const data = {
			orders: order.map((item) => ({
				id: item.itemId,
				title: titles[item.itemId],
			})),
		};

		this.sender.send('onItemsOrdered', data);
	}

    query(connection, sql)
    {
        return new Promise((resolve, reject) => {
            connection.query(sql, (error, rows) => {
                if (error)
                {
                    reject(error);
                }

                resolve(rows);
            });
        });
    }
}