var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;
var users = [];

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static('public'));
app.use(express.static('public/views'));

io.on('connect', function(socket){
  var client = socket.request.connection._peername;
  console.log("new connection from: ", client);

  socket.on("new-message", function(msg){
    console.log(msg);
    io.emit("receive-message", msg);
  });

  socket.on("new-user", function(username){
    if (users.indexOf(username) < 0) {
      users.push(username);
      io.emit("receive-user", username);
    } else {
      io.emit("reject-user", username);
    }
    console.log("Registered users: ", users);
  });

});

server.listen(port, function(){
  console.log("starting server on port: " + port);
});

