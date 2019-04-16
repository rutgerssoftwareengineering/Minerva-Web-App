import React, { Component } from 'react';
import {Route} from 'react-router-dom'
import Quiz from '../components/quiz/Quiz';
import CountdownTimer from '../components/quiz/CountdownTimer';
import axios from "axios";
import history from '../../History'
import Cookies from 'universal-cookie';
const cookies = new Cookies();
class QuizContainer extends Component{
    constructor(props){
        super(props)
        this.state = {
            quizzes: props.quizzes,
            quizNum: props.quizNum,
            quizId: props.quizzes[props.quizNum].quizid,
            selected: [],
            correct: [],
            time: 0
        }
    }


    componentDidMount(){
        this.startInterval();
    }

    componentWillUnmount(){
        this.cleanUpInterval();
    }

    startInterval = () => {
        this.interval = setInterval(this.clockTick, 1000);
    };

    cleanUpInterval = () => {
        clearInterval(this.interval);
    };

    copyCurrentState = (current) => {
        this.setState({
            selected: current.selected,
            correct: current.correct
        })
    }

    submitQuizToDb = (numCorrect) => {
        let currentIds = this.state.quizzes.map(data => data.id);
        let idToBeAdded = 0;
        let classId = cookies.get('currentClass');
        while (currentIds.includes(idToBeAdded)) {
          ++idToBeAdded;
        }
    
        axios.post("http://localhost:3001/api/submitQuizS", {
          id: idToBeAdded,
          quizId: this.state.quizId,
          score: numCorrect,
          class: classId
        })
        .then(res => console.log(res.data))
        .catch(error => console.log(error));
    };

    handleSubmit = () => {
        const numCorrect = this.state.correct.filter(value => value).length;
        this.submitQuizToDb(numCorrect);
        cookies.remove('quizStartedAt',{ path: '/' });
        cookies.set('quizCompleted', true)
        history.push('/quizzes')
        //console.log('Number of Correct Answers: ' + this.state.correct.filter(value => value).length)
    }

    render(){
        const currentQuiz = this.state.quizzes[this.state.quizNum];
        const timeLimit = currentQuiz.timelimit;
        const currentProblems = currentQuiz.problems;

        return(
            <form id="quiz-form">
            <CountdownTimer quizId={this.state.quizId} timeLimit={timeLimit} autoSubmit={this.handleSubmit}/>
            <br/>
            <Quiz quiz={currentProblems} getCurrentState={this.copyCurrentState}/>
            <div className="link-button" onClick={this.handleSubmit}>Submit Answers</div>
            <Route path='/quizzes1' render={<h1>HELLO</h1>} />
            </form>
        )
    }
 
}
   

export default QuizContainer;