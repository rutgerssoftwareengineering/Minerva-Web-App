import React, {Component} from 'react';
import { Container, ListGroup, ListGroupItem, Button} from 'reactstrap';
import {CSSTransition, TransitionGroup } from 'react-transition-group';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux' 
import { getAnnouncements, deleteAnnouncement } from '../actions/announcementActions';
import PropTypes from 'prop-types'

class ViewAnnouncement extends Component{
    componentDidMount(){
        this.props.getAnnouncements();
    }

    onDeleteClick = id => {
       
        this.props.deleteAnnouncement(id);
    };

    render(){ 
        const{announcements}  = this.props.announcement;
        return(
            <Container>
                <NavLink to="/announcements/new">
                    <Button style={{marginBottom: '2rem '}}>
                        Create New Announcement
                    </Button>
               </NavLink>

                <ListGroup>
                    <TransitionGroup className= "announcementlist">
                    {announcements.map(({_id,message}) =>( 
                        <CSSTransition key={_id} timeout={500} classNames = "fade">
                            <ListGroupItem color = 'dark'>
                                <Button 
                                    className="remove-announcement"
                                    color = "danger"
                                    size = "sm"
                                    style={{marginRight: '2em '}}
                                    onClick = { this.onDeleteClick.bind(this,_id)}
                                >
                                    &times;
                                </Button>
                                {message}
                            </ListGroupItem>
                         </CSSTransition>
                    ))}
                    </TransitionGroup> 
                </ListGroup>
            </Container>

        );
    }
}

ViewAnnouncement.propTypes= {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    announcement: state.announcement
})


export default connect(mapStateToProps, {getAnnouncements, deleteAnnouncement})(ViewAnnouncement);