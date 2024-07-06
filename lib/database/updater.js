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
            const coffeeId = (await this.query(connection, `
                INSERT INTO category (TITLE, AVAILABLE) VALUES ('КОФЕ, ЧАЙ, КАКАО', 1);
            `)).insertId;

            const coffeeIds = [];
            const coffeeItems = [['Эспрессо', 1], ['Американо', 1], ['Какао', 0], ['Капучино маленький', 1], ['Латте', 1],
                ['Какао холодный', 0], ['Капучино холодный', 1], ['Латте холодный', 1], ['Облепиховый чай', 0],
                ['Латте с соленой карамелью', 1], ['Малиновый чай', 0], ['Раф кофе', 1], ['Тыквенный латте', 1], ['Чай листовой', 0],
                ['Раф холодный', 1], ['Матча латте', 0], ['Фильтр кофе', 1], ['Флэт уайт', 1],
            ];
            for (const coffee of coffeeItems)
            {
                coffeeIds.push(
                    (await this.query(connection, `
                        INSERT INTO item (TITLE, CATEGORY_ID, AVAILABLE) VALUES ('${coffee[0]}', ${coffeeId}, ${coffee[1]});
                    `)).insertId,
                );
            }

            const altId = (await this.query(connection, `
                INSERT INTO category (TITLE, AVAILABLE) VALUES ('КОФЕ, ЧАЙ, КАКАО альтернатива', 1);
            `)).insertId;

            const altItems = [
                ['Капучино маленький (альтернатива)', 1], ['Латте (альтернатива)', 1], ['Какао (альтернатива)', 1],
                ['Капучино большой (альтернатива)', 1], ['Латте холодный (альтернатива)', 1], ['Какао холодный (альтернатива)', 0],
                ['Капучино холодный (альтернатива)', 0], ['Тыквенный латте (альтернатива)', 1], ['Флэт уайт (альтернатива)', 0],
                ['Латте с солёной карамелью', 1], ['Матча латте', 0],
            ];

            const altIds = [];
            for (const altItem of altItems)
            {
                altIds.push(connection.query(`
                    INSERT INTO item (TITLE, CATEGORY_ID, AVAILABLE) VALUES ('${altItem[0]}', ${altId}, '${altItem[1]}');
                `).insertId);
            }

            const coldId = (await this.query(connection, `
                INSERT INTO category (TITLE, AVAILABLE) VALUES ('ДЕСЕРТЫ ХОЛОДНЫЕ НАПИТКИ', 1);
            `)).insertId;

            const coldItems = [
                ['Мятное печенье', 0], ['Облепиховый холодный чай', 1], ['Лимонад Груша-Базилик', 0],
                ['Печенье арахис-миндаль', 1], ['Малиновый чай (холодный)', 1], ['Тропический лимонад', 0],
                ['Печенье кокосовое', 0], ['Матча тоник', 0], ['Классический лимонад Сауэр', 0],
                ['Печенье овсяное с орехом и шоколадом', 0], ['Эспрессо Тоник', 1], ['Бамбл', 1],
                ['Печенье шоколадное', 0], ['Кантуччи', 1], ['Кейк попс', 1],
            ];
            for (const coldItem of coldItems)
            {
                connection.query(`
                    INSERT INTO item (TITLE, CATEGORY_ID, AVAILABLE) VALUES ('${coldItem[0]}', ${coldId}, '${coldItem[1]}');
                `);
            }

            const modifierIds = [];
            for (const modifierItem of [
                {type: 'milk', title: 'Банановое', available: 1},
                {type: 'milk', title: 'Безлактозное', available: 1},
                {type: 'milk', title: 'Гороховое', available: 0},
                {type: 'milk', title: 'Кокосовое', available: 1},
                {type: 'milk', title: 'Миндальное', available: 1},
                {type: 'milk', title: 'Овсяное', available: 1},
                {type: 'milk', title: 'Фундучное', available: 0},

                {type: 'cup', title: 'в своей кружке', available: 1},
                {type: 'cup', title: 'в бумажном стакане', available: 1},
            ])
            {
                modifierIds.push(
                    (await this.query(connection, `
                        INSERT INTO modifier (TITLE, TYPE, AVAILABLE) VALUES ('${modifierItem.title}', '${modifierItem.type}', '${modifierItem.available}');
                    `)).insertId,
                );
            }

            for (const altId of altIds)
            {
                for (const modifierId of modifierIds)
                {
                    connection.query(`
                        INSERT INTO item_modifier (ITEM_ID, MODIFIER_ID) VALUES (${altId}, ${modifierId});
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
