import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Icon from '@material-ui/core/Icon';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Cookies from 'universal-cookie';
const cookies = new Cookies();


class QuizRouter extends Component{
    constructor(){
        super()
        this.state = {
            quizData: [],
<<<<<<< HEAD
            quizDataLoaded: false
=======
            isHidden: true
>>>>>>> d0b69b3ef61dee3eb907d8fa5bd8537ca7f00c17
        }
        this.getQuizData();

        this.handleRemoveQuestionClick = this.handleRemoveQuestionClick.bind(this);
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
<<<<<<< HEAD
        axios.get('http://localhost:3001/api/getQuizzes', {params: {class: "12345"}})
=======
        axios.get('http://localhost:3001/api/getQuizzes', {params: {class: cookies.get('currentClass')}})
>>>>>>> d0b69b3ef61dee3eb907d8fa5bd8537ca7f00c17
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

    handleRemoveQuestionClick(event, index){
        console.log("Delete question " + index + " " + this.state.quizData[index].quizTitle);

        axios.delete("http://localhost:3001/api/deleteQuiz", { data: {id: this.state.quizData[index]._id} })
        .then(res => {
            console.log(res.data);
            this.getQuizData();
        })
    }

    

    
    render(){
        return(
            <div>
                <div style={{border: '3px red solid'}}>
                <label>
                    Edit Saved Quizzes
                    <br/><br/>
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

                    {this.state.quizData.map((key, index) => {
                        if(key.quizTitle != null && key.quizTitle !== ""){
                            return(
                                <div key={index}>
                                    <Link 
                                        to={{pathname: '/createQuiz', state: {quizData: key, newQuiz: false, class: "12345", quizType: key.quizType}}}
                                        style={{paddingRight:'10px'}}
                                    >
                                        <button
                                            
                                        >
                                            {key.quizTitle}
                                        </button>
                                    </Link>
                                    <button 
                                        onClick={(event) => {this.handleRemoveQuestionClick(event, index)}} 
                                    >
                                        Delete Quiz
                                    </button>
                                
                                </div>
                            )   
                        }
                        return
                    }
                    )}
                </label>
                <br/>
                </div>
                <div>
                    <Link 
                        to={{pathname: '/createQuiz', state: {quizData: null, newQuiz: true, className: "12345", quizType:"online"}}}
                        style={{paddingRight:'10px'}}
                    >
                        <button>Create New Online Quiz</button>
                    </Link>

                    <Link 
                        to={{pathname: '/createQuiz', state: {quizData: null, newQuiz: true, className: "12345", quizType:"inclass"}}}
                        style={{paddingRight:'10px'}}
                    >
                        <button>Create New In-Class Quiz</button>
                    </Link>
                    
                </div>

            </div>

            
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
                style={{ minHeight: '10vh' }}
            >
                <h1>Edit Saved Quizzes</h1>
                <div>
                    <Link to={{pathname: '/createQuiz', state: {quizData: null, newQuiz: true}}}>
                        <Fab color="primary" aria-label="Add" style = {{ margin: 5, }}>
                            <AddIcon />
                        </Fab>
                    </Link>
                    <Fab color="secondary" aria-label="Edit" onClick={this.toggleHidden.bind(this)} >
                        <EditIcon />
                    </Fab>
                </div>            
               <List align="center">
                    {this.state.quizData.map((key, index) =>( 
                            <ListItem  alignItems="flex-start" >
                                <Card style = {{ minWidth: 500,}}>
                                    <CardContent style={{color : "black"}}>
                                        {key.quizTitle}
                                    </CardContent>
                                    <CardActions>
                                        <Link to={{pathname: '/createQuiz', state: {quizData: key, newQuiz: false}}}>
                                            {!this.state.isHidden && 
                                            <IconButton 
                                                aria-label="Edit" 
                                                color = "secondary"
                                            >
                                                <EditIcon />
                                            </IconButton>
                                            }
                                        </Link>
                                    </CardActions>
                                </Card>
                            </ListItem>
                    ))}
                </List>
            </Grid>
        )
    }
    
}
   

export default QuizRouter;