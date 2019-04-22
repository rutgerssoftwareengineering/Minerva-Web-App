import openSocket from 'socket.io-client';
const  socket = openSocket('http://localhost:8000');

function subscribeToGradeDataTimer(className, timer, cb) {
  socket.on('timer', gradeData => cb(null, gradeData));
  socket.emit('subscribeToGradeDataTimer', {timer: timer, class: className});
}

var isChannelReady = false;
var isInitiator = false;
var isStarted = false;
var localStream;
var pc;
var remoteStream;

const mediaStreamConstraints = {
  video: {
    mandatory: {
      maxWidth: 1280,
      maxHeight: 768,
      maxFrameRate: 30,  
    }
  }
};

function connectOrJoinRoom(){
  /////////////////////////////////////////////
  
  var room = 'foo';
  // Could prompt for room name:
  // room = prompt('Enter room name:');
  
  if (room !== '') {
    socket.emit('create or join', room);
    console.log('Attempted to create or  join room', room);
  }
  
  socket.on('created', function(room) {
    console.log('Created room ' + room);
    isInitiator = true;
  });
  
  socket.on('full', function(room) {
    console.log('Room ' + room + ' is full');
  });
  
  socket.on('join', function (room){
    console.log('Another peer made a request to join room ' + room);
    console.log('This peer is the initiator of room ' + room + '!');
    isChannelReady = true;
  });
  
  socket.on('joined', function(room) {
    console.log('joined: ' + room);
    isChannelReady = true;
  });
  
  socket.on('log', function(array) {
    console.log.apply(console, array);
  });
  
  ////////////////////////////////////////////////
  
  function sendMessage(message) {
    console.log('Client sending message: ', message);
    socket.emit('message', message);
  }
  
  // This client receives a message
  socket.on('message', function(message) {
    console.log('Client received message:', message);
    if (message === 'got user media') {
      maybeStart();
    } else if (message.type === 'offer') {
      if (!isInitiator && !isStarted) {
        maybeStartRemote();
      }
      pc.setRemoteDescription(new RTCSessionDescription(message));
      doAnswer();
    } else if (message.type === 'answer' && isStarted) {
      pc.setRemoteDescription(new RTCSessionDescription(message));
    } else if (message.type === 'candidate' && isStarted) {
      var candidate = new RTCIceCandidate({
        sdpMLineIndex: message.label,
        candidate: message.candidate
      });
      pc.addIceCandidate(candidate);
    } else if (message === 'bye' && isStarted) {
      handleRemoteHangup();
    }
  });
  
  ////////////////////////////////////////////////////
  
  var localVideo = document.querySelector('#localVideo');
  var remoteVideo = document.querySelector('#remoteVideo');
  const startButton = document.getElementById('startButton');
  const stopRecordingButton = document.getElementById('stopRecording');
  if(startButton != null){
    stopRecordingButton.disabled = true;
    startButton.addEventListener('click', startAction);
    stopRecordingButton.addEventListener('click', stopRecording);
  }
  function startAction(){
    navigator.mediaDevices.getDisplayMedia(mediaStreamConstraints)
    .then(gotStream)
    .catch(function(e) {
      alert('getUserMedia() error: ' + e.name);
    });
    stopRecordingButton.disabled = false;
    startButton.disabled = true;
  }
  if(localVideo == null){
    sendMessage('got user media');
    if (isInitiator) {
      maybeStart();
    }
  }


  function stopRecording(){
    stop()
    localVideo.srcObject = null;
    stopRecordingButton.disabled = true;
    startButton.disabled = false;
  }
  function gotStream(stream) {
    console.log('Adding local stream.');
    localStream = stream;
    localVideo.srcObject = stream;
    sendMessage('got user media');
    if (isInitiator) {
      maybeStart();
    }
  }
  
  var constraints = {
    video: true
  };
  
  console.log('Getting user media with constraints', constraints);
  
  
  function maybeStart() {
    console.log('>>>>>>> maybeStart() ', isStarted, localStream, isChannelReady);
    if (!isStarted && typeof localStream !== 'undefined' && isChannelReady) {
      console.log('>>>>>> creating peer connection');
      createPeerConnection();
      pc.addStream(localStream);
      isStarted = true;
      console.log('isInitiator', isInitiator);
      if (isInitiator) {
        doCall();
      }
    }
  }
  function maybeStartRemote() {
    console.log('>>>>>>> maybeStart() ', isStarted, isChannelReady);
    if (!isStarted && isChannelReady) {
      console.log('>>>>>> creating peer connection');
      createPeerConnection();
      isStarted = true;
      console.log('isInitiator', isInitiator);
      if (isInitiator) {
        doCall();
      }
    }
  }
  window.onbeforeunload = function() {
    sendMessage('bye');
  };
  
  /////////////////////////////////////////////////////////
  
  function createPeerConnection() {
    try {
      pc = new RTCPeerConnection(null);
      pc.onicecandidate = handleIceCandidate;
      pc.onaddstream = handleRemoteStreamAdded;
      pc.onremovestream = handleRemoteStreamRemoved;
      console.log('Created RTCPeerConnnection');
    } catch (e) {
      console.log('Failed to create PeerConnection, exception: ' + e.message);
      alert('Cannot create RTCPeerConnection object.');
      return;
    }
  }
  
  function handleIceCandidate(event) {
    console.log('icecandidate event: ', event);
    if (event.candidate) {
      sendMessage({
        type: 'candidate',
        label: event.candidate.sdpMLineIndex,
        id: event.candidate.sdpMid,
        candidate: event.candidate.candidate
      });
    } else {
      console.log('End of candidates.');
    }
  }
  
  function handleCreateOfferError(event) {
    console.log('createOffer() error: ', event);
  }
  
  function doCall() {
    console.log('Sending offer to peer');
    pc.createOffer(setLocalAndSendMessage, handleCreateOfferError);
  }
  
  function doAnswer() {
    console.log('Sending answer to peer.');
    pc.createAnswer().then(
      setLocalAndSendMessage,
      onCreateSessionDescriptionError
    );
  }
  
  function setLocalAndSendMessage(sessionDescription) {
    pc.setLocalDescription(sessionDescription);
    console.log('setLocalAndSendMessage sending message', sessionDescription);
    sendMessage(sessionDescription);
  }
  
  function onCreateSessionDescriptionError(error) {
    console.log('Failed to create session description: ' + error.toString());
  }
  
  function handleRemoteStreamAdded(event) {
    console.log('Remote stream added.');
    remoteStream = event.stream;
    remoteVideo.srcObject = remoteStream;
  }
  
  function handleRemoteStreamRemoved(event) {
    console.log('Remote stream removed. Event: ', event);
  }
  
  function handleRemoteHangup() {
    console.log('Session terminated.');
    stop();
    isInitiator = false;
  }
  
  function stop() {
    isStarted = false;
    pc.close();
    pc = null;
    if(remoteVideo != null){
      remoteVideo.srcObject = null;
    }
  }

}
export { subscribeToGradeDataTimer, connectOrJoinRoom };