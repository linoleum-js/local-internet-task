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
var EventEmitter = require('event-emitter');
var expressWs = require('express-ws')(app);
var bodyParser = require('body-parser');
const ee = new EventEmitter();


setInterval(() => {
  data.balance = Math.floor(Math.random() * 10000);
  ee.emit('data:change', data);
}, 1000);

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
  ee.emit('data:change');
  response.send({ status: 200 });
});

app.ws('/api/user', function(ws, req) {
  const send = () => {
    ws.send(JSON.stringify(data));
  };
  ws.on('message', function() {
    ee.on('data:change', send);
    ws.send(JSON.stringify(data));
  });
  ws.on('close', () => {
    ee.off('data:change', send);
  });
});

app.listen(port);
