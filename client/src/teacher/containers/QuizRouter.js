import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class QuizRouter extends Component{
    constructor(){
        super()
        this.state = {
            quizData: [],
            quizDataLoaded: false
        }
        this.getQuizData();

        this.handleRemoveQuestionClick = this.handleRemoveQuestionClick.bind(this);
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
        axios.get('http://localhost:3001/api/getQuizzes', {params: {class: "12345"}})
        .then(res => {
            console.log(res.data.data);
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
        )
    }
    
}
   

export default QuizRouter;