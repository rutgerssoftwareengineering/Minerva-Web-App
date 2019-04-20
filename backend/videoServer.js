const VideoServer = () =>{
    const io = require('socket.io')();
    const PORT = 3002;
    io.listen(PORT);

    console.log('');
    console.log('LISTENING ON PORT ', PORT);
    console.log('Awaiting video connection...');
    console.log('');

    io.sockets.on('connection', function(socket) {
      console.log('SOMEONE LOGGED IN')
        // convenience function to log server messages on the client
      
      });
}

module.exports = VideoServer;