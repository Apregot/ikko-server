const mysql = require('mysql');
const Config = require('../config');

module.exports = class Updater {
    static update()
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

        connection.query('SELECT ID FROM category', (error, rows, fields) => {
            if (error)
            {
                throw error;
            }
            
            if (rows.length === 0)
            {
                // connection.query(`
                //     INSERT INTO category (TITLE, AVAILABLE) VALUES ('Холодные напитки', 'Кофе, чай, какао');
                // `);
            }
        });
        

        connection.end();
    }
};
