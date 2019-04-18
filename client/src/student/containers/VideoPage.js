import React, {Component} from 'react';
import ScreenShareOutlined from '@material-ui/icons/ScreenShareOutlined';
import StopScreenShareOutlined from '@material-ui/icons/StopScreenShareOutlined';
import PlayCircleOutline from '@material-ui/icons/PlayCircleOutline';
import Stop from '@material-ui/icons/Stop';
import Video from '../components/video/Video';
import { subscribeToTimer } from '../../api';
class VideoPage extends Component {
    render() {
        return (
          <div className="App">
            <Video />
          </div>
        );
      }
}

export default VideoPage;