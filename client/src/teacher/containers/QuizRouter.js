import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import DeleteIcon from '@material-ui/icons/Delete';
import Cookies from 'universal-cookie';

const cookies = new Cookies();


const styles = theme => ({
    trash: {
      align: 'right',
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 8px',
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
      },

  });

class QuizRouter extends Component{
    constructor(){
        super()
        this.state = {
            quizData: [],
            quizDataLoaded: false,
            isHidden: true
        }
        this.getQuizData();

        this.handleRemoveQuizClick = this.handleRemoveQuizClick.bind(this);
    }
    toggleHidden () {
        this.setState({
          isHidden: !this.state.isHidden
        })
    }

    componentDidMount(){
        console.log("COMPONENT DID MOUNT");
        this.getQuizData();
    }

    componentWillReceiveProps(nextProps){
        console.log("RECIEVED PROPS!!");
        this.getQuizData();
    }

    getQuizData = () => {
        //class: cookies.get('currentClass')
        axios.get('http://localhost:3001/api/getQuizzes', {params: {class: cookies.get('currentClass')}})
        .then(res => {
            console.log(res.data.data)
            this.setState({
              quizData: res.data.data,
              quizDataLoaded: true
            });
        })
        
    }

    handleQuizTitleClick = (event) => {
        event.preventDefault();
        console.log('clicked');
    }

    handleRemoveQuizClick(event, index){
        console.log("Delete question " + index + " " + this.state.quizData[index].quizTitle);

        axios.delete("http://localhost:3001/api/deleteQuiz", { data: {id: this.state.quizData[index]._id} })
        .then(res => {
            console.log(res.data);
            this.getQuizData();
        })
    }

    
    render(){
        const { classes } = this.props;
        return(    
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                style={{ minHeight: '100vh' }}
            >
                <div className={classes.drawerHeader} />
                <h1>Edit Saved Quizzes</h1>
                <div>
                    {(() => {
                            if (!this.state.quizDataLoaded) {
                                return (
                                <label>
                                    Loading Data...
                                </label>
                                );
                            }
                            return;
                        }
                    )()}
                    <Link 
                        to={{pathname: '/createQuiz', state: {quizData: null, newQuiz: true, className: "12345", quizType:"inclass"}}}
                        style={{paddingRight:'10px'}} className="Link"
                    >
                        <Fab variant="extended" color="primary" aria-label="Add" style = {{ margin: 5, }}>                      
                            <AddIcon />
                            Create New In-Class Quiz
                        </Fab>
                    </Link>
                    <Link 
                        to={{pathname: '/createQuiz', state: {quizData: null, newQuiz: true, className: "12345", quizType:"online"}}}
                        style={{paddingRight:'10px'}} className="Link"
                    >
                        <Fab variant="extended" color="primary" aria-label="Add" style = {{ margin: 5, }}>                      
                            <AddIcon />
                            Create New Online Quiz
                        </Fab>
                    </Link>

                    <Fab color="secondary" aria-label="Delete" onClick={this.toggleHidden.bind(this)} >
                        <DeleteIcon />
                    </Fab>
                </div>            
               <List align="center">
                    {this.state.quizData.map((key, index) => { 
                        if(key.quizTitle != null && key.quizTitle !== ""){
                            return (                         
                            <ListItem  alignItems="flex-start" >
                                <Card style = {{ minWidth: 500,}}>  
                                    <CardContent style={{color : "black"}}>
                                        <Link 
                                            to={{pathname: '/createQuiz', state: {quizData: key, newQuiz: false, class: "12345", quizType: key.quizType}}}
                                            style={{paddingRight:'10px'}} className="Link"
                                        >
                                            <Fab variant="extended" aria-label="Edit" style = {{ margin: 5, }}>                      
                                                <EditIcon color = "inherit" fontSize="small" />
                                                {key.quizTitle}
                                            </Fab>
                                        </Link>
                                        {!this.state.isHidden && 
                                        <IconButton 
                                            className={classes.trash}
                                            aria-label="Delete" 
                                            color = "secondary"
                                            onClick={(event) => {this.handleRemoveQuizClick(event, index)}} 
                                        >
                                            <DeleteIcon fontSize="small"  />
                                        </IconButton>
                                        }
                                    </CardContent>
                                </Card>
                            </ListItem>
                    )}})}
                </List>
            </Grid>
        )
    }   
}

export default withStyles(styles)(QuizRouter);

