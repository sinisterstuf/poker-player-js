var player;
try {
    player = require('./player');
}
catch(any) {};
var express = require('express');
var app = express();

app.use(express.json());
app.use(express.urlencoded());

app.get('/', function(req, res){
  res.send(200, 'OK')
});

app.post('/', function(req, res){
  try {
    if(req.body.action == 'bet_request') {
      res.send(200, player.bet_request(JSON.parse(req.body.game_state)).toString());
    } else if(req.body.action == 'showdown') {
      player.showdown(JSON.parse(req.body.game_state));
      res.send(200, 'OK');
    } else if(req.body.action == 'version') {
      res.send(200, player.VERSION);
    } else {
      res.send(200, 'OK')
    }
  }
  catch(any) {
    console.log(any);
    res.send(200, 'OK')
  };
});

port = 1338;
app.listen(port);
console.log('Listening at http://localhost:' + port)
