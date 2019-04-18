const VideoServer = () =>{

    const io = require('socket.io')();

    const PORT = 8000;
    io.listen(PORT);
    console.log('');
    console.log('LISTENING ON PORT ', PORT);
    console.log('Awaiting video connection...');
    console.log('');

}

module.exports = VideoServer;