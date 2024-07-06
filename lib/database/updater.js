const mysql = require('mysql');
const Config = require('../config');

module.exports = class Updater {
    static async update()
    {
        const config = new Config();

        const connection = mysql.createConnection(config.getDatabaseConfig());

        connection.connect();

        connection.query(`
            CREATE TABLE IF NOT EXISTS item (
                ID int NOT NULL AUTO_INCREMENT,
                TITLE varchar(255) NOT NULL,
                CATEGORY_ID int NOT NULL,
                AVAILABLE int NOT NULL,
                PRIMARY KEY(ID)
            );
        `);

        connection.query(`
            CREATE TABLE IF NOT EXISTS category (
                ID int NOT NULL AUTO_INCREMENT,
                TITLE varchar(255) NOT NULL,
                AVAILABLE int NOT NULL,
                PRIMARY KEY(ID)
            );
        `);

        connection.query(`
            CREATE TABLE IF NOT EXISTS modifier (
                ID int NOT NULL AUTO_INCREMENT,
                TITLE varchar(255) NOT NULL,
                TYPE varchar(255) NOT NULL,
                AVAILABLE int NOT NULL,
                PRIMARY KEY(ID)
            );
        `);

        connection.query(`
            CREATE TABLE IF NOT EXISTS item_modifier (
                ID int NOT NULL AUTO_INCREMENT,
                ITEM_ID int NOT NULL,
                MODIFIER_ID int NOT NULL,
                PRIMARY KEY(ID),
                UNIQUE INDEX item_modifier1 (ITEM_ID, MODIFIER_ID)
            );
        `);

        connection.query(`
            CREATE TABLE IF NOT EXISTS \`order\` (
                ID int NOT NULL AUTO_INCREMENT,
                DATE_CREATE datetime NOT NULL DEFAULT NOW(),
                PRIMARY KEY(ID)
            );
        `);

        connection.query(`
            CREATE TABLE IF NOT EXISTS order_item (
                ID int NOT NULL AUTO_INCREMENT,
                ORDER_ID int NOT NULL,
                ITEM_ID int NOT NULL,
                PRIMARY KEY(ID),
                UNIQUE INDEX item_modifier1 (ORDER_ID, ITEM_ID)
            );
        `);

        const rows = await this.query(connection, 'SELECT ID FROM category');

        if (rows.length === 0)
        {
            const coldId = (await this.query(connection, `
                INSERT INTO category (TITLE, AVAILABLE) VALUES ('Холодные напитки', 1);
            `)).insertId;

            const coffeeId = (await this.query(connection, `
                INSERT INTO category (TITLE, AVAILABLE) VALUES ('Кофе, чай, какао', 1);
            `)).insertId;

            for (const coldItem of ['Бамбл', 'Эспрессо тоник', 'Тропический лимонад'])
            {
                connection.query(`
                    INSERT INTO item (TITLE, CATEGORY_ID, AVAILABLE) VALUES ('${coldItem}', ${coldId}, 1);
                `);
            }

            const coffeeIds = [];
            for (const coffeeTitle of ['Тыквенный латте', 'Латте с соленой карамелью', 'Капучино'])
            {
                coffeeIds.push(
                    (await this.query(connection, `
                        INSERT INTO item (TITLE, CATEGORY_ID, AVAILABLE) VALUES ('${coffeeTitle}', ${coffeeId}, 1);
                    `)).insertId,
                );
            }

            const modifierIds = [];
            for (const modifierItem of [
                {type: 'milk', title: 'банановое'},
                {type: 'milk', title: 'кокосовое'},
                {type: 'milk', title: 'ананасовое'},

                {type: 'cup', title: 'в своей кружке'},
                {type: 'cup', title: 'в бумажном стакане'},
            ])
            {
                modifierIds.push(
                    (await this.query(connection, `
                        INSERT INTO modifier (TITLE, TYPE, AVAILABLE) VALUES ('${modifierItem.title}', '${modifierItem.type}', 1);
                    `)).insertId,
                );
            }

            for (const coffeeId of coffeeIds)
            {
                for (const modifierId of modifierIds)
                {
                    connection.query(`
                        INSERT INTO item_modifier (ITEM_ID, MODIFIER_ID) VALUES (${coffeeId}, ${modifierId});
                    `);
                }
            }
        }
        

        connection.end();
    }

    static query(connection, sql)
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
};
