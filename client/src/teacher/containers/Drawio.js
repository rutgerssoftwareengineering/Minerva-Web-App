import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import HomeIcon from '@material-ui/icons/Home';
import ForumIcon from '@material-ui/icons/Forum';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import AssignmentIcon from '@material-ui/icons/Assignment';
import CloseIcon from '@material-ui/icons/Close';
import GroupIcon from '@material-ui/icons/Group';
import PersonIcon from '@material-ui/icons/Person'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import Cookies from 'universal-cookie';
import { NavLink } from 'react-router-dom';
import ClassBox from './ClassBox'

const cookies = new Cookies();


const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  usericon: {
    marginLeft: 'auto',
    marginRight: 10,
  },
  username: {
    marginRight: 20,
  },
});

const logout = () => {
    console.log('hi')
    cookies.remove('userId', {path: '/'})
    cookies.remove('userName', {path: '/'});
    cookies.remove('userClasses', {path: '/'});
    cookies.remove('userType', {path: '/'})
    this.props.unmountIt()
}

class PersistentDrawerLeft extends React.Component {
    
  state = {
    open: false,
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, theme } = this.props;
    const { open } = this.state;

    return (
      <div className={classes.root}>
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar disableGutters={!open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              Minerva
            </Typography>
            <PersonIcon  className={classes.usericon} />
            <Typography variant="h8" color="inherit" noWrap className={classes.username} >
              {cookies.get('userName')}
            </Typography>

          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>
                <NavLink className="Link" to="/home" exact>
                  <ListItem button  > 
                        <ListItemIcon><HomeIcon/></ListItemIcon>
                        <ListItemText primary="Home" />
                  </ListItem>
                </NavLink>
                <NavLink className="Link" to="/forum" exact>
                  <ListItem button > 
                        <ListItemIcon><ForumIcon/></ListItemIcon>
                        <ListItemText primary="Forum" />
                  </ListItem>
                </NavLink>
                <NavLink className="Link" to="/quizzes" exact>
                  <ListItem button > 
                        <ListItemIcon><AssignmentIcon/></ListItemIcon>
                        <ListItemText primary="Quizzes" />
                  </ListItem>
                </NavLink> 
                <NavLink className="Link" to="/announcements/view" exact>
                  <ListItem button > 
                        <ListItemIcon><AnnouncementIcon/></ListItemIcon>
                        <ListItemText primary="Announcements" />
                  </ListItem>
                </NavLink> 
                <NavLink className="Link" to="/hub" exact>
                  <ListItem button > 
                        <ListItemIcon><AnnouncementIcon/></ListItemIcon>
                        <ListItemText primary="Hub" />
                  </ListItem>
                </NavLink>
                <NavLink className="Link" to="/" exact onClick={logout}>
                  <ListItem button > 
                      <ListItemIcon><CloseIcon/></ListItemIcon>
                      <ListItemText primary="Log Out" />
                  </ListItem>
                </NavLink>

          </List>
          <Divider />
          <List>
              <ListItem button onClick={this.props.toggle} >
                  <ListItemIcon ><GroupIcon/></ListItemIcon>
                  <ListItemText primary="Register" />
              </ListItem>
          </List>
        </Drawer>
      </div>
    );
  }
}

PersistentDrawerLeft.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(PersistentDrawerLeft);