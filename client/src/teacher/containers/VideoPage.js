import React, {Component} from 'react';
import Video from '../components/video/Video';
import ScreenShareOutlined from '@material-ui/icons/ScreenShareOutlined';
import StopScreenShareOutlined from '@material-ui/icons/StopScreenShareOutlined';
import PlayCircleOutline from '@material-ui/icons/PlayCircleOutline';
import Stop from '@material-ui/icons/Stop';
class VideoPage extends Component {

    componentDidMount(){
        Video()
    }
    render(){
        return(
            <div>
            <h1 id="title">Office Hours:  </h1>
            <h1 id="video-status">OFFLINE</h1>
            <div id="videoContainer">
                <video id="localVideo" autoPlay playsInline></video>
                <div id="streamingControls">
                    <button id="startButton" class="streamingButtons button"><ScreenShareOutlined fontSize="large" /></button>
                    <button id="callButton" class="streamingButtons button"><PlayCircleOutline fontSize="large"/></button>
                    <button id="hangupButton" class="streamingButtons button"><Stop fontSize="large"/></button>
                    <button id="stopRecording" class="streamingButtons button"><StopScreenShareOutlined fontSize="large" /></button>
                </div>
            </div>
           
            </div>
        )
    }
}

export default VideoPage;