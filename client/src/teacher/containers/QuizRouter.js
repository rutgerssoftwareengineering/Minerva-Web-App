import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class QuizRouter extends Component{
    constructor(){
        super()
        this.state = {
            quizData: []
        }
        this.getQuizData();
    }

    componentDidMount(){
        this.getQuizData();
    }


    getQuizData = () => {
        axios.get('http://localhost:3001/api/getQuizzes', {params: {class: "12345"}})
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
            <div>
                <div style={{border: '3px red solid'}}>
                <label>
                    Edit Saved Quizzes
                    <br/><br/>
                    {this.state.quizData.map((key, index) => {
                        if(key.quizTitle != null && key.quizTitle !== ""){
                            return(
                                <div key={index}>
                                    <Link to={{pathname: '/createQuiz', state: {quizData: key, newQuiz: false, class: "12345"}}}>
                                        <button>
                                            {key.quizTitle}
                                        </button>
                                    </Link>
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
                    <Link to={{pathname: '/createQuiz', state: {quizData: null, newQuiz: true, className: "12345"}}}>
                        <button>Create New Quiz</button>
                    </Link>
                </div>

            </div>
        )
    }
    
}
   

export default QuizRouter;