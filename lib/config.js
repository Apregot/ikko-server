module.exports = class Config {
	getBitrixUrl()
	{
		return 'http://dev.bx/bitrix/services/main/ajax.php?action=ikkomodule.Ikko.';
	}
	getDatabaseConfig()
	{
		return {
			host: '127.0.0.1',
            user: 'root',
            password: '',
            database: 'coffee',
			port: 3306,
		};
	}
}