import React , {useState} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
//import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu'
import { NavLink } from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem'
import ClassBox from './ClassBox'
import {
  usePopupState,
  bindTrigger,
  bindMenu,
} from 'material-ui-popup-state/hooks'
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const styles = {
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginLeft: -20,
      marginRight: 10,
    },
  };
  
function TopBar(props) {
    const logout = () => {
      console.log('hi')
      cookies.remove('userId', {path: '/'})
      cookies.remove('userName', {path: '/'});
      cookies.remove('userClasses', {path: '/'});
      cookies.remove('userType', {path: '/'})
      this.props.unmountIt()
      //set(state => !state)
    }
    const popupState = usePopupState({ variant: 'popover' })
    const { classes } = props;
    const toggleAndClose = () => {
      props.toggle()
      popupState.close()
    }
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar variant="dense">
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" {...bindTrigger(popupState)} >
              <MenuIcon />
            </IconButton>

            <Menu {...bindMenu(popupState)}>
                <NavLink  to="/home" exact>
                  <MenuItem onClick={popupState.close}>Home</MenuItem>
                </NavLink>
                <NavLink  to="/forum" exact>
                  <MenuItem onClick={popupState.close}>Forum</MenuItem>
                </NavLink>
                <NavLink  to="/quizzes" exact>
                  <MenuItem onClick={popupState.close}>Quizzes</MenuItem>
                </NavLink> 
                <NavLink to="/announcements/view" exact>
                  <MenuItem onClick={popupState.close}>Announcements</MenuItem>
                </NavLink> 
                <NavLink  to="/" exact onClick={logout}>
                  <MenuItem onClick={popupState.close}>Log Out</MenuItem>
                </NavLink>
                <button onClick={toggleAndClose}>Register</button>
                <ClassBox/>
            </Menu>
            <Typography variant="h6" color="inherit">
              Minerva
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  }

TopBar.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(TopBar);