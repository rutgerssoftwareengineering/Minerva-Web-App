import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
//import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import {
  usePopupState,
  bindTrigger,
  bindMenu,
} from 'material-ui-popup-state/hooks'

const styles = {
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginLeft: -18,
      marginRight: 10,
    },
  };
  
function TopBar(props) {
    const popupState = usePopupState({ variant: 'popover', popupId: 'demoMenu' })
    const { classes } = props;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar variant="dense">
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" {...bindTrigger(popupState)} >
              <MenuIcon />
            </IconButton>

            <Menu {...bindMenu(popupState)}>
                <MenuItem onClick={popupState.close}>Sugma</MenuItem>
                <MenuItem onClick={popupState.close}>Ligma</MenuItem>
                <MenuItem onClick={popupState.close}>Updog</MenuItem>
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