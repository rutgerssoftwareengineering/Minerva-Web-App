import Grid from '@material-ui/core/Grid';
import React, {Component} from 'react';
import ThumbDown from '../assets/thumb_down.png';
import ThumbUp from '../assets/thumb_up.png';
import VolDown from '../assets/vol_down.png';
import VolUp from '../assets/vol_up.png';
import SlowDown from '../assets/slow_down.png';
import SpeedUp from '../assets/speed_up.png';

import ThumbDownGlow from '../assets/thumb_down_glow.png';
import ThumbUpGlow from '../assets/thumb_up_glow.png';
import VolDownGlow from '../assets/vol_down_glow.png';
import VolUpGlow from '../assets/vol_up_glow.png';
import SlowDownGlow from '../assets/slow_down_glow.png';
import SpeedUpGlow from '../assets/speed_up_glow.png';

import { subscribeToGradeDataTimer } from '../socketAPI';

// Component which has 6 feedback options to view, updating based on database
class Feedback extends Component {
    constructor(props){
        super(props);
        this.state = {
            thumbDownActive: false,
            thumpUpActive: false,
            volDownActive: false,
            volUpActive: false,
            slowDownActive: false,
            speedUpActive: false,
            feedbackData: [1000,1000,1000,1000,1000,1000]
        };
        
        // subscribe to getting data on interval
        // args: class name, interval in ms, callback function
        // Thresh for feedback blinking is set within this function!
        subscribeToGradeDataTimer("52314", 15000, ((err, gradeData) =>  {
            let classSize = gradeData[0].members.length;
            let newFeedbackData = gradeData[0].feedback;
            let feedbackThreshold = .1 * classSize;

            let thumbDownActive = false;
            let thumpUpActive =false;
            let volDownActive = false;
            let volUpActive = false;
            let slowDownActive = false;
            let speedUpActive = false;
            if((newFeedbackData[0] - this.state.feedbackData[0]) > feedbackThreshold){
                thumbDownActive = true;
            }
            if((newFeedbackData[1] - this.state.feedbackData[1]) > feedbackThreshold){
                thumpUpActive = true;
            }
            if((newFeedbackData[2] - this.state.feedbackData[2]) > feedbackThreshold){
                volDownActive = true;
            }
            if((newFeedbackData[3] - this.state.feedbackData[3]) > feedbackThreshold){
                volUpActive = true;
            }
            if((newFeedbackData[4] - this.state.feedbackData[4]) > feedbackThreshold){
                slowDownActive = true;
            }
            if((newFeedbackData[5] - this.state.feedbackData[5]) > feedbackThreshold){
                speedUpActive = true;
            }
            this.setState({ 
                feedbackData: gradeData[0].feedback,
                thumbDownActive: thumbDownActive,
                thumpUpActive: thumpUpActive,
                volDownActive: volDownActive,
                volUpActive: volUpActive,
                slowDownActive: slowDownActive,
                speedUpActive: speedUpActive,
            }) 
        }));

    }

    //function to run if the parent sends new props to this component
    componentWillReceiveProps(newProps) {
        
    }


    // when answer text box is changed, change the saved answer data in the state
    // update the parent component
    handleAnswerChange(event){
        

    }



    // renders this.state.answers into answer fields
    // first is a select correct answer, then a text input, and then a delete
    render(){
        

        return(
            <div>

                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                    spacing={24}
                >


                    <Grid 
                        container
                        justify="center"
                        alignItems="center"
                        spacing={24}
                        item
                    >
                        <Grid item xs>
                            <img src={this.state.thumbDownActive ? ThumbDownGlow : ThumbDown} alt="Thumbs Down"/>
                        </Grid>
                        <Grid item xs>
                            <img src={this.state.thumpUpActive ? ThumbUpGlow : ThumbUp} alt="Thumbs Up"/>
                        </Grid>
                    </Grid>

                    <Grid 
                        container
                        justify="center"
                        alignItems="center"
                        spacing={24}
                        item
                    >
                        <Grid item xs>
                            <img src={this.state.volDownActive ? VolDownGlow : VolDown} alt="Vol Down"/>
                        </Grid>
                        <Grid item xs>
                            <img src={this.state.volUpActive ? VolUpGlow : VolUp} alt="Vol Up"/>
                        </Grid>
                    </Grid>

                    <Grid 
                        container
                        justify="center"
                        alignItems="center"
                        spacing={24}
                        item
                    >
                        <Grid item xs>
                            <img src={this.state.slowDownActive ? SlowDownGlow : SlowDown} alt="Slow Down"/>
                        </Grid>
                        <Grid item xs>
                            <img src={this.state.speedUpActive ? SpeedUpGlow : SpeedUp} alt="Speed Up"/>
                        </Grid>
                    </Grid>


                </Grid>
           </div>
        )
    } 
  
}

export default Feedback;