const express = require('express');
const path = require('path');
const app = express();
const port = 3000;


const Config = require('./lib/config');
const config = new Config();

const mysql = require('mysql');

const Updater = require('./lib/database/updater');
Updater.update();

app.get('/images/*', (req, res) => {
  const options = {
    root: path.join(__dirname),
  };
  res.sendFile(req.path, options);
});

app.use(express.static(path.join(__dirname, 'frontend/dist')));

app.use(express.json());

const bodyParser = require('body-parser');
app.use(bodyParser.json({
  type(req) {
    return true;
  }
}));

app.post('/api/:controller/:action', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Credentials', '*');

  const controller = require(`./lib/Controller/${req.params.controller}`);

  req.db = mysql.createConnection(config.getDatabaseConfig());
  req.db.connect();
  const result = await new controller(req)[`${req.params.action}Action`]();
  res.json(result);
  req.db.end();
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
