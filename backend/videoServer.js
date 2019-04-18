const VideoServer = () =>{

    const io = require('socket.io')();

    io.on('connection', (client) => {
        client.on('subscribeToTimer', (interval) => {
            console.log('client is subscribing to timer with interval ', interval);
            setInterval(() => {
            client.emit('timer', new Date());
            }, interval);
        });
    })

    const PORT = 8000;
    io.listen(PORT);
    console.log('');
    console.log('LISTENING ON PORT ', PORT);
    console.log('Awaiting video connection...');
    console.log('');

}

module.exports = VideoServer;