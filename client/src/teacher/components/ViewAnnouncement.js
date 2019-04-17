import React, {Component} from 'react';
import {CSSTransition, TransitionGroup } from 'react-transition-group';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux' 
import { getAnnouncements, deleteAnnouncement } from '../actions/announcementActions';
import PropTypes from 'prop-types'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import DeleteIcon from '@material-ui/icons/Delete';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';


class ViewAnnouncement extends Component{
    constructor () {
        super()
        this.state = {
          isHidden: true
        }
      }
      toggleHidden () {
        this.setState({
          isHidden: !this.state.isHidden
        })
      }

    componentDidMount(){
        this.props.getAnnouncements();
        
    }
    onDeleteClick = id => {
       
        this.props.deleteAnnouncement(id);
    };

    render(){ 

        const{announcements}  = this.props.announcement;
        return(
    
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
                style={{ minHeight: '100vh' }}
            >
                <h1>Announcements</h1>
                <div>
                     <NavLink to="/announcements/new">
                        <Fab color="primary" aria-label="Add" style = {{ margin: 5, }}>
                            <AddIcon />
                        </Fab>
                    </NavLink>
                    <Fab color="secondary" aria-label="Delete" onClick={this.toggleHidden.bind(this)} >
                            <DeleteIcon />
                    </Fab>
                </div>

              
               <List align="center">
                    <TransitionGroup className= "announcementlist">
                    {announcements.map(({_id,message}) =>( 
                        <CSSTransition key={_id} timeout={500} classNames = "fade">
                        <ListItem 
                        
                        alignItems="flex-start" >
                        <Card style = {{ minWidth: 500,}}>
                            <CardContent style={{color : "black"}}>
                                {message}
                            </CardContent>
                            <CardActions>
                                {!this.state.isHidden && 
                                <IconButton 
                                    aria-label="Delete" 
                                    color = "secondary"
                                    onClick = { this.onDeleteClick.bind(this,_id)}
                                >
                                    <DeleteIcon fontSize="small" />
                                </IconButton>
                                }
                            </CardActions>
                        </Card>
                        </ListItem>

                        </CSSTransition>
                    ))}
                    </TransitionGroup> 

                </List>
                
            </Grid>

        );
    }
}

ViewAnnouncement.propTypes= {
    classes: PropTypes.object.isRequired,
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    announcement: state.announcement
})


export default connect(mapStateToProps, {getAnnouncements, deleteAnnouncement})(ViewAnnouncement);


/*

                            <ListItem alignItems="flex-start">
                               <IconButton 
                                    aria-label="Delete" 
                                    color = "secondary"
                                    onClick = { this.onDeleteClick.bind(this,_id)}
                                >
                                    <DeleteIcon fontSize="small" />
                                </IconButton>
                                <ListItemText
                                    primary="Summer BBQ"
                                    secondary={
                                        <React.Fragment>
                                            <Typography component="span" color="textPrimary">
                                                
                                            </Typography>
                                            {message}
                                        </React.Fragment>
                                    }
                                 />
                            </ListItem>

*/