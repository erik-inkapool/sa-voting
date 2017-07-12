import io from 'socket.io-client';

const syncService = {
  start: () => {
    const socket = io.connect('/');
    socket.on('news', function(data) {
      console.log(data);
      socket.emit('my other event', { my: 'data' });
    });
  }
};

export default syncService;
