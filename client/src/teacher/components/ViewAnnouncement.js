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
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';


class ViewAnnouncement extends Component{
    constructor () {
        super()
        this.state = {
            announce: [],
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
        this.setState({
            announce: this.props.announcement
        })
        console.log(this.props.announcement)
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
                style={{ minHeight: '100vh' }}
            >
                <h1></h1>
                <h1></h1>
                <h1>Announcements</h1>
                <div>
                     <NavLink to="/announcements/new" className="Link" >
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
                    {announcements.map(({_id,Author,message,createdAt}) =>( 
                        <CSSTransition key={_id} timeout={500} classNames = "fade">
                        <ListItem  alignItems="flex-start" >
                            <Card style = {{ minWidth: 500,}}>
                                <CardHeader   
                                   title= {Author}
                                   subheader= {createdAt}              
                                />
                                <CardContent style={{color : "black"}}>
                                    {message}
                                    {!this.state.isHidden && 
                                    <IconButton 
                                        aria-label="Delete" 
                                        color = "secondary"
                                        onClick = { this.onDeleteClick.bind(this,_id)}
                                    >
                                        <DeleteIcon fontSize="small" />
                                    </IconButton>
                                    }
                                </CardContent>
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

