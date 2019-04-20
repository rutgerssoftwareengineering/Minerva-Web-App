import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Cookies from 'universal-cookie';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

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
});

let id = 0;
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];




class Gradebook extends Component{
  constructor(){
    super()
    this.state = {
        gradeInfo: [],
        value: 0
    }
  }

  // Changes value when tabs are selected
  handleChange = (event, value) => {
    this.setState({ value });
  };
   //triggers database gathering on mount
  componentWillMount(){
     this.getGradesDataFromDb();
  }
   //queries database using user data
   getGradesDataFromDb = () => {
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
  
  render(){
    
    // Get Classes
    const { classes } = this.props;
    const { value } = this.state;
    const clas = this.state.gradeInfo;
 

    console.log(cookies.get('currentClass'))
    return(
      <div>
        {/* Spacing */}
        <div className={classes.drawerHeader} />
        <h1>Gradebook</h1>
        {/* Tabbar */}
        <Paper className={classes.root}>       
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
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
              {value == key && 
              // Grade Book
                  <Paper className={classes.book} >
                    <Table className={classes.table}>
                      <TableHead>
                        <TableRow>
                          <TableCell>Students</TableCell>
                          {classInfo.assignments.map( (name,key) => (
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
                            {classInfo.grades[key].map( (grade,key) => (
                              <TableCell align="right">{grade}</TableCell>
                            ))}
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