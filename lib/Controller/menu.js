module.exports = class Menu {
    constructor(req)
    {
        this.req = req;
    }

    async listAction()
    {
        const categories = await this.getCategories();
        const items = await this.getItems();
        const modifiers = await this.getModifiers();

        return {
            categories,
            items,
            modifiers,
        };
    }

    async getCategories()
    {
        return new Promise((resolve) => {
            this.req.db.query('SELECT * FROM category', (error, rows) => {
                resolve(rows.reduce((acc, row) => ({
                    ...acc,
                    [row.ID]: {
                        id: row.ID,
                        title: row.TITLE,
                        available: row.AVAILABLE,
                    },
                }), {}));
            });
        });
    }

    async getItems()
    {
        const rows = await this.query(this.req.db, 'SELECT * FROM item');

        const itemIds = rows.map((row) => row.ID);

        const modifiers = await this.query(this.req.db, `SELECT * FROM item_modifier WHERE ITEM_ID in (${itemIds.join(',')})`);

        const itemModifiers = modifiers.reduce((acc, it) => ({
            ...acc,
            [it.ITEM_ID]: [...(acc[it.ITEM_ID] ?? []), it.MODIFIER_ID],
        }), {});

        return rows.reduce((acc, row) => ({
            ...acc,
            [row.ID]: {
                id: row.ID,
                title: row.TITLE,
                categoryId: row.CATEGORY_ID,
                available: row.AVAILABLE > 0,
                modifiers: itemModifiers[row.ID] ?? [],
            },
        }), {});
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

    getModifiers()
    {
        return new Promise((resolve) => {
            this.req.db.query('SELECT * FROM modifier', (error, rows) => {
                resolve(rows.reduce((acc, row) => ({
                    ...acc,
                    [row.ID]: {
                        id: row.ID,
                        title: row.TITLE,
                        type: row.TYPE,
                        available: row.AVAILABLE,
                    },
                }), {}));
            });
        });
    }
}
