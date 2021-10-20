const app = require('express');

app.get('/', function (req, res) {
  res.send('Okay');
});

app.listen(3000);
