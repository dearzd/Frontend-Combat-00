process.on('message', (message, server) => {
  // console.log(`child process message: ${message}`);

  if (message === 'server') {
    server.on('connection', (socket) => {
      console.log(`Worker: ${process.pid} received connection.`);
      setTimeout(() => {
        socket.end('Process handled by worker: ' + process.pid);
      }, 1000);
    });
  }
});
