let data = {
  firstName: 'Some first name',
  lastName: 'Some last name',
  middleName: 'Middle name',
  age: 26,
  balance: 1000
};

var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000;
var bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(express.static('./public'))

app.get('/[^(api)]*', (request, response, next) => {
  response.sendFile(__dirname + '/public/index.html');
});

app.get('/api/user', (request, response) => {
  response.send(data);
});

app.post('/api/user', (request, response) => {
  data = JSON.parse(request.body.data);
  response.send({ status: 200 });
});

app.listen(port);
