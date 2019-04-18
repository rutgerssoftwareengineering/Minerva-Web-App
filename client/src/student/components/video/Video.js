import openSocket from 'socket.io-client';
const Video = () => {
const mediaStreamConstraints = {
    audio: true,
    video: {
      mandatory: {
        maxWidth: 1920,
        maxHeight: 1080,
        maxFrameRate: 30,  
      }
    }
  };
const socket = openSocket("http://localhost:8000/");
const peerConnection = new RTCPeerConnection();
const video = document.getElementById('localVideo');
socket.on('offer', (message)=>{
    peerConnection.setRemoteDescription(message)
    .then(()=> peerConnection.createAnswer())
    .then(sdp => peerConnection.setLocalDescription(sdp))
    .then(()=>{
      socket.emit('answer', peerConnection.localDescription)
    })
    .catch(console.log("REMOTE CONNECTION ERROR"));
  });
  
  peerConnection.ontrack = function(event){
    video.srcObject = event.stream;
  }
}

export default Video;