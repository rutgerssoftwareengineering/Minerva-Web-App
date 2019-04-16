import React, {Component} from 'react';
import Video from '../components/video/Video';
class VideoPage extends Component {

    componentDidMount(){
        Video()
    }
    render(){
        return(
            <div>
            <div>
                <video id="localVideo" autoPlay playsInline></video>
                <video id="remoteVideo" autoPlay playsInline></video>
            </div>
            <div>
                <button id="startButton"> Start </button>
                <button id="callButton">Call</button>
                <button id="hangupButton">Hang Up </button>
            </div>
            </div>
        )
    }
}

export default VideoPage;