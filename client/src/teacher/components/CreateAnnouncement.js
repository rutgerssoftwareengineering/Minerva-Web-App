import React, {Component} from 'react';
import { connect } from 'react-redux' 
import { getAnnouncements, addAnnouncement} from '../actions/announcementActions';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class CreateAnnouncement extends Component {
    componentDidMount(){
        this.props.getAnnouncements();
    }
    constructor(props){
        super(props)
        this.state = {
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        alert('An announcement was submitted: ' + this.state.value);
        event.preventDefault();
        const newAnnouncement ={
            message: this.state.value
        }
        this.props.addAnnouncement(newAnnouncement);
        this.props.history.push('/announcements/view');
    }

    render(){
        return (
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
                style={{ minHeight: '10vh' }}
            >
                <h1>Create Announcement</h1>
                <div>
                    <form>
                    <TextField
                        color = "white"
                        label="New Announcement"
                        multiline
                        rows="4"
                        margin="normal"
                        variant="filled"
                        style = {{ backgroundColor: "white",}}
                        value = {this.state.value}
                        onChange={this.handleChange}
                    >
                    </TextField>
                    </form>
                </div>  
                <Button variant="contained" onClick={this.handleSubmit}>
                    Sumbit
                </Button>       
            </Grid>        
        );
    } 
}

CreateAnnouncement.propTypes= {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    announcement: state.announcement
})


export default connect(mapStateToProps, {getAnnouncements, addAnnouncement})(CreateAnnouncement);