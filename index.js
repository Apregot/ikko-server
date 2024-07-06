const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'frontend/dist')));

app.use(express.json());

const bodyParser = require('body-parser');
app.use(bodyParser.json({
  type(req) {
    return true;
  }
}));

app.post('/api/:controller/:action', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Credentials', '*');

  const controller = require(`./lib/Controller/${req.params.controller}`);
  res.json(new controller(req)[`${req.params.action}Action`]());
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
