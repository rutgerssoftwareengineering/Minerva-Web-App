import openSocket from 'socket.io-client';
const  socket = openSocket('http://localhost:8000');

function subscribeToGradeDataTimer(className, timer, cb) {
  socket.on('timer', gradeData => cb(null, gradeData));
  socket.emit('subscribeToGradeDataTimer', {timer: timer, class: className});
}

export { subscribeToGradeDataTimer };