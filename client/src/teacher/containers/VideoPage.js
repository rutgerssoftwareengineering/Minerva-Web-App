import React, {Component} from 'react';
import ScreenShareOutlined from '@material-ui/icons/ScreenShareOutlined';
import StopScreenShareOutlined from '@material-ui/icons/StopScreenShareOutlined';
import PlayCircleOutline from '@material-ui/icons/PlayCircleOutline';
import Stop from '@material-ui/icons/Stop';
import {connectOrJoinRoom } from '../socketAPI.js';
class VideoPage extends Component {

    componentDidMount(){
        connectOrJoinRoom()
    }
    render(){
        return(
            <div>
            <h1 id="title">Office Hours:  </h1>
            <h1 id="video-status">OFFLINE</h1>
            <div id="videoContainer">
                <video id="localVideo" autoPlay playsInline></video>
                <video id="remoteVideo" autoPlay playsInline></video>
                <div id="streamingControls">
                    <button id="startButton" className="streamingButtons button"><ScreenShareOutlined fontSize="large" /></button>
                    <button id="callButton" className="streamingButtons button"><PlayCircleOutline fontSize="large"/></button>
                    <button id="hangupButton" className="streamingButtons button"><Stop fontSize="large"/></button>
                    <button id="stopRecording" className="streamingButtons button"><StopScreenShareOutlined fontSize="large" /></button>
                </div>
            </div>
           
            </div>
        )
    }
}

export default VideoPage;