import React, {Component} from 'react';
import Video from '../components/video/Video';
class VideoPage extends Component {

    componentDidMount(){
        Video()
    }
    render(){
        return(
            <div>
                <video autoPlay playsInline></video>
            </div>
        )
    }
}

export default VideoPage;