const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'frontend/dist')));

app.use(express.json());

app.post('/api/:controller/:action', (req, res) => {
  const controller = require(`./lib/Controller/${req.params.controller}`);
  res.json(new controller(req)[req.params.action]());
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
