module.exports = class Config {
	getBitrixUrl()
	{
		return 'http://dev.bx/bitrix/services/main/ajax.php?action=ikkomodule.Ikko.';
	}
	getDatabaseConfig()
	{
		return {
			host: 'localhost',
            user: 'root',
            password: '',
            database: 'coffee',
		};
	}
}