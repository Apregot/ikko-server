module.exports = class Item {
    constructor(req)
    {
        this.req = req;
    }

    async getAction()
    {
        const id = parseInt(this.req.body.id) || 0;

        const row = (await this.query(this.req.db, `
            SELECT * FROM item WHERE ID = ${id}
        `))[0];

        const modifiers = await this.query(this.req.db, `SELECT * FROM modifier INNER JOIN item_modifier ON item_modifier.MODIFIER_ID = modifier.ID AND item_modifier.ITEM_ID = ${row.ID}`);
        const category = (await this.query(this.req.db, `SELECT * FROM category WHERE ID = ${row.CATEGORY_ID}`))[0];

        return {
            id: row.ID,
            description: '<b>Бамбл</b><br> Бамбл — это освежающий кофейный напиток, который сочетает в себе крепкий эспрессо и сладкий апельсиновый сок. Напиток отличается своим контрастным вкусом, где горечь кофе гармонично сочетается с цитрусовой свежестью апельсина. Бамбл часто подается в прозрачном стакане, чтобы подчеркнуть его слоистую структуру, где темный эспрессо плавает на поверхности яркого апельсинового сока.<br> <br> <b>Состав:</b><br> - Эспрессо<br> - Апельсиновый сок<br> - Карамельный сироп<br> - Лед<br> <br> <b>Калорийность:</b> 161-193 ккал на порцию.',
            imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/Atlantic_near_Faroe_Islands.jpg',
            title: row.TITLE,
            categoryId: row.CATEGORY_ID,
            category: {
                id: category.ID,
                title: category.TITLE,
                available: category.AVAILABLE,
            },
            available: row.AVAILABLE > 0,
            modifiers: modifiers.map((it) => ({
                id: it.ID,
                title: it.TITLE,
                type: it.TYPE,
                available: it.AVAILABLE > 0,
            })),
        };
    }

    enableAction()
    {
        return true;
    }

    disableAction()
    {
        return false;
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
