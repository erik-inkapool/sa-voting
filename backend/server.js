import express from 'express';
import path from 'path';
import http from 'http';
import socket from 'socket.io';

const app = express();
const port = 3001;

app.use(express.static(path.join(__dirname, 'static')));

// socket.io
const server = http.Server(app);
const io = socket(server);

server.listen(process.env.PORT || port, function() {
  console.log(`Server listening on port ${port}!`);
});

io.on('connection', function(socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function(data) {
    console.log(data);
  });
});
