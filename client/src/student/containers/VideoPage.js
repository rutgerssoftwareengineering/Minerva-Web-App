import React, {Component} from 'react';
import ScreenShareOutlined from '@material-ui/icons/ScreenShareOutlined';
import StopScreenShareOutlined from '@material-ui/icons/StopScreenShareOutlined';
import PlayCircleOutline from '@material-ui/icons/PlayCircleOutline';
import Stop from '@material-ui/icons/Stop';
import { subscribeToTimer } from '../../api';
class VideoPage extends Component {

    constructor(props){
        super(props)
        subscribeToTimer((err, timestamp) => this.setState({ 
            timestamp 
        }));
        this.state = {
            timestamp: 'no timestamp yet'
        };
    }
    render() {
        return (
          <div className="App">
            <p className="App-intro">
            This is the timer value: {this.state.timestamp}
            </p>
          </div>
        );
      }
}

export default VideoPage;