import openSocket from 'socket.io-client';

const Video = () =>{
  const socket = openSocket("http://localhost:8000/");
  const mediaStreamConstraints = {
    video: {
      mandatory: {
        maxWidth: 1920,
        maxHeight: 1080,
        maxFrameRate: 30,  
      }
    }
  };

  function handleLocalMediaStreamError(error) {
    console.log(`navigator.getUserMedia error: ${error.toString()}.`);
  }
  const video = document.getElementById('localVideo');
const peerConnection = new RTCPeerConnection();

navigator.mediaDevices.getDisplayMedia(mediaStreamConstraints)
.then((mediaStream) =>{
    video.srcObject = mediaStream;
    console.log('Received local stream.');
    peerConnection.addStream(mediaStream);
    peerConnection.createOffer()
    .then(sdp => peerConnection.setLocalDescription(sdp))
    .then(()=>{ 
      socket.emit('offer', peerConnection.localDescription);
    });
}).catch(handleLocalMediaStreamError);

socket.on('answer', function(message){
  peerConnection.setRemoteDescription(message);
})
 /* const mediaStreamConstraints = {
    audio: true,
    video: {
      mandatory: {
        maxWidth: 1920,
        maxHeight: 1080,
        maxFrameRate: 30,  
      }
    }
  };
  
  const offerOptions = {
    offerToReceiveVideo: 1,
  };
  let startTime = null;
  
  // Video element where stream will be placed.
  const localVideo = document.getElementById('localVideo');
  const remoteVideo = document.getElementById('remoteVideo');
  const videoStatus = document.getElementById('video-status');
  videoStatus.className = "offline";
  // Local stream that will be reproduced on the video.
  let localStream;
  let remoteStream;

  let localPeerConnection;
  let remotePeerConnection; 
  
  // Handles success by adding the MediaStream to the video element.
  function gotLocalMediaStream(mediaStream) {
    localVideo.srcObject = mediaStream;
    localStream = mediaStream;
    trace('Received local stream.');
    callButton.disabled = false;  // Enable call button.
    videoStatus.className = "recording";
    videoStatus.innerHTML = "Recording";
  }
  
  // Handles error by logging a message to the console with the error message.
  function handleLocalMediaStreamError(error) {
    trace(`navigator.getUserMedia error: ${error.toString()}.`);
  }

  function gotRemoteMediaStream(event) {
    const mediaStream = event.stream;
    remoteVideo.srcObject = mediaStream;
    remoteStream = mediaStream;
    trace('Remote peer connection received remote stream.');
    videoStatus.className = "streaming";
    videoStatus.innerHTML = "Streaming...";
  }

  function logVideoLoaded(event) {
    const video = event.target;
    trace(`${video.id} videoWidth: ${video.videoWidth}px, ` +
          `videoHeight: ${video.videoHeight}px.`);
  }

  function logResizedVideo(event) {
    logVideoLoaded(event);
  
    if (startTime) {
      const elapsedTime = window.performance.now() - startTime;
      startTime = null;
      trace(`Setup time: ${elapsedTime.toFixed(3)}ms.`);
    }
  }

  localVideo.addEventListener('loadedmetadata', logVideoLoaded);
  remoteVideo.addEventListener('loadedmetadata', logVideoLoaded);
  remoteVideo.addEventListener('onresize', logResizedVideo);
  
  function handleConnection(event) {
    const peerConnection = event.target;
    const iceCandidate = event.candidate;
  
    if (iceCandidate) {
      const newIceCandidate = new RTCIceCandidate(iceCandidate);
      const otherPeer = getOtherPeer(peerConnection);
  
      otherPeer.addIceCandidate(newIceCandidate)
        .then(() => {
          handleConnectionSuccess(peerConnection);
        }).catch((error) => {
          handleConnectionFailure(peerConnection, error);
        });
  
      trace(`${getPeerName(peerConnection)} ICE candidate:\n` +
            `${event.candidate.candidate}.`);
    }
  }

  
// Logs that the connection succeeded.
function handleConnectionSuccess(peerConnection) {
  trace(`${getPeerName(peerConnection)} addIceCandidate success.`);
};

// Logs that the connection failed.
function handleConnectionFailure(peerConnection, error) {
  trace(`${getPeerName(peerConnection)} failed to add ICE Candidate:\n`+
        `${error.toString()}.`);
}

// Logs changes to the connection state.
function handleConnectionChange(event) {
  const peerConnection = event.target;
  console.log('ICE state change event: ', event);
  trace(`${getPeerName(peerConnection)} ICE state: ` +
        `${peerConnection.iceConnectionState}.`);
}
// Logs error when setting session description fails.
function setSessionDescriptionError(error) {
  trace(`Failed to create session description: ${error.toString()}.`);
}

// Logs success when setting session description.
function setDescriptionSuccess(peerConnection, functionName) {
  const peerName = getPeerName(peerConnection);
  trace(`${peerName} ${functionName} complete.`);
}

// Logs success when localDescription is set.
function setLocalDescriptionSuccess(peerConnection) {
  setDescriptionSuccess(peerConnection, 'setLocalDescription');
}

// Logs success when remoteDescription is set.
function setRemoteDescriptionSuccess(peerConnection) {
  setDescriptionSuccess(peerConnection, 'setRemoteDescription');
}

// Logs offer creation and sets peer connection session descriptions.
function createdOffer(description) {
  trace(`Offer from localPeerConnection:\n${description.sdp}`);

  trace('localPeerConnection setLocalDescription start.');
  localPeerConnection.setLocalDescription(description)
    .then(() => {
      setLocalDescriptionSuccess(localPeerConnection);
    }).catch(setSessionDescriptionError);

  trace('remotePeerConnection setRemoteDescription start.');
  remotePeerConnection.setRemoteDescription(description)
    .then(() => {
      setRemoteDescriptionSuccess(remotePeerConnection);
    }).catch(setSessionDescriptionError);

  trace('remotePeerConnection createAnswer start.');
  remotePeerConnection.createAnswer()
    .then(createdAnswer)
    .catch(setSessionDescriptionError);
}

// Logs answer to offer creation and sets peer connection session descriptions.
function createdAnswer(description) {
  trace(`Answer from remotePeerConnection:\n${description.sdp}.`);

  trace('remotePeerConnection setLocalDescription start.');
  remotePeerConnection.setLocalDescription(description)
    .then(() => {
      setLocalDescriptionSuccess(remotePeerConnection);
    }).catch(setSessionDescriptionError);

  trace('localPeerConnection setRemoteDescription start.');
  localPeerConnection.setRemoteDescription(description)
    .then(() => {
      setRemoteDescriptionSuccess(localPeerConnection);
    }).catch(setSessionDescriptionError);
}

// Define action buttons.
const startButton = document.getElementById('startButton');
const callButton = document.getElementById('callButton');
const hangupButton = document.getElementById('hangupButton');
const stopRecordingButton = document.getElementById('stopRecording');

// Set up initial action buttons status: disable call and hangup.
callButton.disabled = true;
hangupButton.disabled = true;
stopRecordingButton.disabled = true;


// Handles start button action: creates local MediaStream.
function startAction() {
  startButton.disabled = true;
  stopRecordingButton.disabled = false;
  navigator.mediaDevices.getDisplayMedia(mediaStreamConstraints)
    .then(gotLocalMediaStream).catch(handleLocalMediaStreamError);
  trace('Requesting local stream.');
}

// Handles call button action: creates peer connection.
function callAction() {
  trace('Starting call.');
  startTime = window.performance.now();

  // Get local media stream tracks.
  const videoTracks = localStream.getVideoTracks();
  const audioTracks = localStream.getAudioTracks();
  if (videoTracks.length > 0) {
    trace(`Using video device: ${videoTracks[0].label}.`);
  }
  if (audioTracks.length > 0) {
    trace(`Using audio device: ${audioTracks[0].label}.`);
  }

  const servers = null;  // Allows for RTC server configuration.

  // Create peer connections and add behavior.
  localPeerConnection = new RTCPeerConnection(servers);
  trace('Created local peer connection object localPeerConnection.');

  localPeerConnection.addEventListener('icecandidate', handleConnection);
  localPeerConnection.addEventListener(
    'iceconnectionstatechange', handleConnectionChange);

  remotePeerConnection = new RTCPeerConnection(servers);
  trace('Created remote peer connection object remotePeerConnection.');

  remotePeerConnection.addEventListener('icecandidate', handleConnection);
  remotePeerConnection.addEventListener(
    'iceconnectionstatechange', handleConnectionChange);
  remotePeerConnection.addEventListener('addstream', gotRemoteMediaStream);

  // Add local stream to connection and create offer to connect.
  localPeerConnection.addStream(localStream);
  trace('Added local stream to localPeerConnection.');

  trace('localPeerConnection createOffer start.');
  localPeerConnection.createOffer(offerOptions)
    .then(createdOffer).catch(setSessionDescriptionError);
    callButton.disabled = true;
    hangupButton.disabled = false;
}

// Handles hangup action: ends up call, closes connections and resets peers.
function hangupAction() {
  localPeerConnection.close();
  remotePeerConnection.close();
  localPeerConnection = null;
  remotePeerConnection = null;
  hangupButton.disabled = true;
  callButton.disabled = true;
  remoteVideo.srcObject = null;
  videoStatus.className = "recording";
  videoStatus.innerHTML = "Recording";
  trace('Ending call.');
}

function stopRecording(){
  if(!hangupButton.disabled){
    alert('Must end call before stopping the recording.')
    return;
  }
  const track = localStream.getTracks();
  const arrLen = track.length;
  for(let i = 0; i< arrLen; i++){
    track[i].stop();
  }
  localVideo.srcObject = null;
  hangupButton.disabled=true;
  callButton.disabled= true;
  stopRecordingButton.disabled = true;
  startButton.disabled = false;
  videoStatus.className = "offline";
  videoStatus.innerHTML = "OFFLINE";
}

// Add click event handlers for buttons.
startButton.addEventListener('click', startAction);
callButton.addEventListener('click', callAction);
hangupButton.addEventListener('click', hangupAction);
stopRecordingButton.addEventListener('click', stopRecording);


// Define helper functions.

// Gets the "other" peer connection.
function getOtherPeer(peerConnection) {
  return (peerConnection === localPeerConnection) ?
      remotePeerConnection : localPeerConnection;
}

// Gets the name of a certain peer connection.
function getPeerName(peerConnection) {
  return (peerConnection === localPeerConnection) ?
      'localPeerConnection' : 'remotePeerConnection';
}

// Logs an action (text) and the time when it happened on the console.
function trace(text) {
  text = text.trim();
  const now = (window.performance.now() / 1000).toFixed(3);

  console.log(now, text);
}
*/
}

export default Video;