import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Cookies from 'universal-cookie';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import history from '../../History';

const cookies = new Cookies();

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  table: {
    minWidth: 700,
  },
  book: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  button: {
    marginLeft: theme.spacing.unit,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 60,
  },

});





class Gradebook extends Component{
  constructor(){
    super()
    this.state = {
        gradeInfo: [],
        currentClass: [],
        value: 0
    }
  }

  // Changes value when tabs are selected
  handleTabChange = (event, value) => {
    this.setState({  
      value
    })
  };

  handleChange = (kef,kef2,e) => {
    const newgrades=this.state.gradeInfo[this.state.value].grades
    newgrades[kef][kef2] = e.target.value 
    const changedClass ={
      _id: this.state.gradeInfo[this.state.value]._id,
      className: this.state.gradeInfo[this.state.value].className,
      classid: this.state.gradeInfo[this.state.value].classid,
      members: this.state.gradeInfo[this.state.value].members,
      grades: newgrades,
      assignments: this.state.gradeInfo[this.state.value].assignments,
      feedback: this.state.gradeInfo[this.state.value].feedback,
    }  
    this.setState({ currentClass: changedClass });
  };


  _handleEnter = (e) => {
    if (e.key === 'Enter') {
      alert("enter")
      this.udpateGrade()
      history.push('/grades');
    }
  }

   //triggers database gathering on mount
  componentWillMount(){
     this.getGrades();
  }
   //queries database using user data
   getGrades = () => {
     axios.get('http://localhost:3001/api/getGrades', {params: {
         member: cookies.get('userId'),
         classes: cookies.get('userClasses')
     }})
     .then(res => {
        this.setState({
          gradeInfo: res.data.data,
        });
     });
  };

  udpateGrade = () => {
    const newgrades = this.state.currentClass.grades
    const cid = this.state.currentClass.classid
    console.log(this.state.currentClass.grades)
     axios.post('http://localhost:3001/api/updateGrade',{
        newgrades: newgrades,
        classid: cid
     })
     .then(res => console.log(res.data));
  };
  
  render(){
    
    // Get Classes
    const { classes } = this.props;
    const { value } = this.state;
    const clas = this.state.gradeInfo;
    return(
      <div>
        {/* Spacing */}
        <div className={classes.drawerHeader} />
        <h1>Gradebook</h1>
        <button onClick={this.udpateGrade}>click</button>
        {/* Tabbar */}
        <Paper className={classes.root}>       
          <Tabs
            value={this.state.value}
            onChange={this.handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            {/* Map classes to tabs */}
            {clas.map( (classInfo,key) => (
              <Tab label={classInfo.className} value = {key}/>  
            ))}
          </Tabs>
        </Paper>
        <div className={classes.drawerHeader} />
          {/* Map classes to gradebook */}
          {clas.map( (classInfo,key) => (
            <div>      
              {value === key && 
              // Grade Book
                  <Paper className={classes.book} >
                    <Table className={classes.table}>
                      <TableHead>
                        <TableRow>
                          <TableCell>Students</TableCell>
                          {classInfo.assignments.map( (name) => (
                            <TableCell align="right">{name}</TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {classInfo.members.map( (name,key) => (
                          <TableRow key={key}>
                            <TableCell component="th" scope="row">
                              {name}
                            </TableCell>
                            {classInfo.assignments.map( (assignment, key2) => { 
                              if(classInfo.grades[key][key2]){   
                                return (
                                  <TableCell align="right">                           
                                    <TextField
                                      id="standard-number"
                                      type="number"
                                      className={classes.textField}
                                      InputLabelProps={{
                                        shrink: true,
                                      }}
                                      value={classInfo.grades[key][key2]}
                                      margin="normal"
                                      onKeyDown={this._handleEnter}
                                      onChange={this.handleChange.bind(this,key,key2)}
                                    />
                                  </TableCell>
                                )                     
                              }else{
                                return(
                                  <TableCell align="right">
                                    <TextField
                                      id="standard-number"
                                      type="number"
                                      className={classes.textField}
                                      InputLabelProps={{
                                        shrink: true,
                                      }}
                                      margin="normal"
                                    />        
                                  </TableCell>
                                ) 
                              }
                            })}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Paper>              
              }
            </div>
          ))}
      </div>  
    );
  }
}

Gradebook.propTypes = {
  sty: PropTypes.object.isRequired,
};

export default  withStyles(styles)(Gradebook);