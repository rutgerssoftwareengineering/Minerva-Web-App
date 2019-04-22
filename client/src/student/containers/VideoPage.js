import React, {Component} from 'react';
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