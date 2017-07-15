import express from 'express';
import path from 'path';
import http from 'http';
import socket from 'socket.io';
import bodyParser from 'body-parser';
import _ from 'lodash';

const app = express();
const port = 3001;

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'static')));

// socket.io
const server = http.Server(app);
const io = socket(server);

server.listen(process.env.PORT || port, function() {
  console.log(`Server listening on port ${port}!`);
});

let cards = [];
let options = {};

app.put('/api/cards/:id', (req, res) => {
  const card = req.body;
  const id = req.params.id;
  const combined = {
    id,
    card
  };

  cards.push(combined);
  io.sockets.emit('card', combined);

  res.json(combined);
});

app.get('/api/options', (req, res) => {
  const fixedOptions = _.chain(options)
    .flatMap((votedOptions, username) =>
      votedOptions.map(option => ({
        ...option,
        username
      }))
    )
    .groupBy(o => o.cardId)
    .mapValues(cardOptions => {
      let options = _.chain(cardOptions)
        .groupBy(cardOption => cardOption.name)
        .map((votesForName, name) =>
          votesForName.reduce(
            (votesSoFar, voteForName) => ({
              name: votesSoFar.name,
              votes: votesSoFar.votes + voteForName.votes,
              users: votesSoFar.users.concat({
                name: voteForName.username,
                votes: voteForName.votes
              })
            }),
            {
              name,
              votes: 0,
              users: []
            }
          )
        )
        .orderBy(v => v.votes, 'desc')
        .value();

      if (options.length <= 1 || options[0].votes > options[1].votes) {
        options[0].active = true;
      }

      return options;
    })
    .value();

  io.sockets.emit('finish');

  res.json(fixedOptions);
});

app.put('/api/options/:username', (req, res) => {
  const username = req.params.username;
  options[username] = req.body;
  res.json({
    username: username,
    options: req.body
  });
});

app.delete('/api/cards', (req, res) => {
  cards = [];
  io.sockets.emit('allCardsDeleted');

  res.json(cards);
});

app.delete('/api/cards/:id', (req, res) => {
  const id = req.params.id;
  const card = cards.find(c => c.id === id);
  cards = cards.filter(c => c.id !== id);
  io.sockets.emit('cardDeleted', { id });

  res.json(card);
});

io.on('connection', function(socket) {
  console.info('Socket connected, id:', socket.id);
  console.info(`Sharing ${cards.length} cards.`);
  socket.emit('cards', cards);
});
