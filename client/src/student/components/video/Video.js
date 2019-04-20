import openSocket from 'socket.io-client';
const Video = () => {
  let room = 'foo';
  const url = "http://localhost:3002/";
  const socket = openSocket("http://localhost:3002/");

  if (room !== '') {
    socket.emit('create or join', room);
    console.log('Attempted to create or  join room', room);
  }
}

export default Video;