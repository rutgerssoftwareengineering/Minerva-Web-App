import React, {Component} from 'react';
import ScreenShareOutlined from '@material-ui/icons/ScreenShareOutlined';
import StopScreenShareOutlined from '@material-ui/icons/StopScreenShareOutlined';
import PlayCircleOutline from '@material-ui/icons/PlayCircleOutline';
import Stop from '@material-ui/icons/Stop';
import {connectOrJoinRoom } from '../../teacher/socketAPI.js';
class VideoPage extends Component {

    componentDidMount(){
      connectOrJoinRoom()
    }
    render() {
        return (
          <div className="App">
          
             <video id="remoteVideo" autoPlay playsInline></video>
          </div>
        );
    }
}

export default VideoPage;