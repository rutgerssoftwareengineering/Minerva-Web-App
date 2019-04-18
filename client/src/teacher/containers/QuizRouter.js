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


class QuizRouter extends Component{
    constructor(){
        super()
        this.state = {
            quizData: [],
            isHidden: true
        }
        this.getQuizData();
    }
    toggleHidden () {
        this.setState({
          isHidden: !this.state.isHidden
        })
    }

    componentDidMount(){
        this.getQuizData();
    }


    getQuizData = () => {
        axios.get('http://localhost:3001/api/getQuizzes')
        .then(res => {
            console.log(res.data.data);
            this.setState({
              quizData: res.data.data
            });
        })
        
    }

    handleQuizTitleClick = (event) => {
        event.preventDefault();
        console.log('clicked');
    }

    render(){
        return(
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