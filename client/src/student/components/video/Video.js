import openSocket from 'socket.io-client';
const Video = () => {
  let room = 'foo';
  const socket = openSocket("http://localhost:8000/");

  if (room !== '') {
    socket.emit('create or join', room);
    console.log('Attempted to create or  join room', room);
  }
}

export default Video;