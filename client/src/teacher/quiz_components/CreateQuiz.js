import React, {Component} from 'react';
import MultipleChoiceAnswers from './MultipleChoiceAnswers';
import TimeField from 'react-simple-timefield';
import DatePicker from "react-datepicker";
import axios from 'axios';
import { Link } from 'react-router-dom';
import history from '../../History';
import OpenEndedAnswer from './OpenEndedAnswer';

//import "react-datepicker/dist/react-datepicker.css";

class CreateQuiz extends Component {

    
    constructor(props){
        super(props);

        const {quizData, newQuiz, className, quizType} = props.location.state;
        console.log(quizData);

        if(quizData != null){
            var timeLimit = quizData.timelimit / 1000;
            const hours = Math.floor(timeLimit / 3600);
            const minutes = Math.floor((timeLimit / 60) - (hours * 60));
            const seconds = timeLimit - (hours * 3600) - (minutes * 60);
            this.state = {
                id: quizData._id,
                questions: quizData.problems.map((key) => (key[0])),
                numQuestions: quizData.problems.length,
                answers: quizData.problems.map((key) => (key[1])),
                correctAnswers: quizData.problems.map((key) => (key[2])),
                questionTypes: quizData.problems.map((key) => (key[3])),
                quizTitle: quizData.quizTitle,
                timeLimit: this.padTimeZeros(hours) + ':' + this.padTimeZeros(minutes) + ':' + this.padTimeZeros(seconds),
                date: new Date(quizData.date),
                newQuiz: newQuiz,
                className: className,
                quizType: quizType
            }
        } else {
            this.state = {
                questions: [''],
                numQuestions: 1,
                answers: [[]],
                correctAnswers: [-1],
                questionTypes: ['MC'],
                quizTitle: '',
                timeLimit: '00:00:00',
                date: new Date(),
                newQuiz: newQuiz,
                className: className,
                quizType: quizType
            };
        }
        


        this.handleQuestionChange = this.handleQuestionChange.bind(this);
        this.handleAddQuestionClick = this.handleAddQuestionClick.bind(this);
        this.handleRemoveQuestionClick = this.handleRemoveQuestionClick.bind(this);
        this.updateQuestionAnswerData = this.updateQuestionAnswerData.bind(this);
        this.changeQuizTitle = this.changeQuizTitle.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.submitQuizToDb = this.submitQuizToDb.bind(this);
        this.padTimeZeros = this.padTimeZeros.bind(this);
    }

    // helper function for converting time to a string that is usuable with DB
    padTimeZeros(value){
        if(value / 10 <= 1){
            return '0' + value;
        } else{
            return value;
        }
    }


    // change state based on a date change
    handleDateChange(date) {
        this.setState({
          date: date
        });
        console.log(date.toString());
    }

    
    // change this.state based on question change
    handleQuestionChange(event, questionNum){
        const newQuestions = this.state.questions.map((key, index) => {
            if (questionNum === index) {
              return event.target.value;
            } else {
              return key;
            }
        });

        this.setState({
            questions: newQuestions
        });

        //console.log(this.state.questions);
    }

    // change this.state variables based on add question click
    handleAddQuestionClick(event){
        event.preventDefault();
        const num = this.state.numQuestions + 1;
        const tempQuestions = this.state.questions.concat('');
        const tempAnswers = this.state.answers.concat([[]]);
        const tempCorrectAnswers = this.state.correctAnswers.concat(-1);
        const tempQuestionTypes = this.state.questionTypes.concat('MC');
        this.setState({
            questions: tempQuestions,
            numQuestions: num,
            answers: tempAnswers,
            correctAnswers: tempCorrectAnswers,
            questionTypes: tempQuestionTypes
        });

        console.log(tempCorrectAnswers);
    }

    // change this.state variables when a question is removed
    handleRemoveQuestionClick(event, index){
        event.preventDefault();
        const newQuestions = this.state.questions.filter((_, j) => j !== index);
        const newAnswers = this.state.answers.filter((_, j) => j !== index);
        const newCorrectAnswers = this.state.correctAnswers.filter((_, j) => j !== index);
        const newNumQuestions = this.state.numQuestions - 1;
        const newQuestionTypes = this.state.questionTypes.filter((_, j) => j !== index);
        this.setState({
            questions: newQuestions,
            numQuestions: newNumQuestions,
            answers: newAnswers,
            correctAnswers: newCorrectAnswers,
            questionTypes: newQuestionTypes
        });

    }

    // update the answers for the inputted question number for this this.state.answer
    // passed into the child Answers component
    updateQuestionAnswerData(currAnswers, questionNumber, correctAnswer){
        const newAnswers = this.state.answers.map((key, index) => {
            if (questionNumber === index) {
              return currAnswers;
            } else {
              return key;
            }
        });

        const newCorrectAnswers = this.state.correctAnswers.map((key, index) => {
            if (questionNumber === index) {
                if(correctAnswer != null){  
                    return correctAnswer;
                }
                return key;
            } else {
                return key;
            }
        });

        console.log(newCorrectAnswers);
        this.setState({
            answers: newAnswers,
            correctAnswers: newCorrectAnswers
        });

    }

    // update quiz title in this.state
    changeQuizTitle(event){
        this.setState({quizTitle: event.target.value});
    }


    // update time variable in this.state
    handleTimeChange(time){
        this.setState({timeLimit: time});
    }

    // update parent component and this.state when question typeis selected
    changeQuestionType(questionNum, questionType){
        const newQuestionTypes = this.state.questionTypes.map((key, index) => {
            if (questionNum === index) {
              return questionType;
            } else {
              return key;
            }
        });

        this.setState({
            questionTypes: newQuestionTypes
        });
        
    }


    // push the quiz information to the DB and clean up any data in this.state for the push
    submitQuizToDb = (event) => {
        
        let quizProblems = this.state.questions.map((key, index) => {
            var currProblem = [];
            currProblem[0] = key;
            currProblem[1] = this.state.answers[index];
            currProblem[2] = this.state.correctAnswers[index];
            currProblem[3] = this.state.questionTypes[index];
            return currProblem;
        });
        
        var hms = this.state.timeLimit;   // your input string    
        var a = hms.split(':'); // split it at the colons

        // minutes are worth 60 seconds. Hours are worth 60 minutes.
        var miliSeconds = 1000 * ((+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]));
        if(this.state.newQuiz === false){
            axios.post("http://localhost:3001/api/updateQuiz", {
                quizTitle: this.state.quizTitle,
                problems: quizProblems,
                timeLimit: miliSeconds,
                date: this.state.date.toString(),
                id: this.state.id,
                className: this.state.className,
                quizType: this.state.quizType
            })
            .then(res => console.log(res.data));
        } else {
            axios.post("http://localhost:3001/api/submitQuizT", {
                quizTitle: this.state.quizTitle,
                problems: quizProblems,
                timeLimit: miliSeconds,
                date: this.state.date.toString(),
                className: this.state.className,
                quizType: this.state.quizType
            })
            .then(res => console.log(res.data));
        }

        history.push('/quizzes');
    };


    // renders questions based on this.state
    // this.state contains all the data for all the questions, so it is able
    // to map that information to the answers for every particulat question
    // This component is the whole quiz rendering component, so it includes
    // the fields for questions and answers as well as timing and callender components
    // This component also handles the submit to the database
    render(){
        const questions = this.state.questions;
        return(
            <div>
                <form>
                    <label>
                        Quiz Title:
                        <input 
                                type="text" 
                                onChange={this.changeQuizTitle}
                                value={this.state.quizTitle}
                                style={{ width:"480px", marginLeft:"10px"}}
                        />
                        <br/><br/>
                    </label>
                    <label>
                    {questions.map((key, index) => (
                        <div key={index}>
                            <label style={{textDecoration:'underline'}}>
                                Problem {index + 1}
                            </label>
                            <br/>
                            <label style={{paddingRight:'10px'}}>
                                Select Question Type:
                            </label>
                            <label>
                                Multiple Choice
                                <input
                                type="radio"
                                checked={this.state.questionTypes[index] === 'MC'}
                                onChange={() => {this.changeQuestionType(index, 'MC')}}
                                style={{marginRight:'10px'}}
                                />
                            </label>

                            <label>
                                Open Ended
                                <input
                                type="radio"
                                checked={this.state.questionTypes[index] === 'OE'}
                                onChange={() => {this.changeQuestionType(index, 'OE')}}
                                style={{marginRight:'10px'}}
                                value='Open Ended'
                                />
                            </label>

                            <br/>

                            <label style={{paddingRight:'10px'}}>
                                Question
                            </label>
                            <input 
                                type="text" 
                                name={index} 
                                onChange={(event) => {this.handleQuestionChange(event, index)}}
                                value={key}
                                style={{ width:"480px", marginRight:"10px"}}
                            /> 
                            <button onClick={(event) => {this.handleRemoveQuestionClick(event, index)}}>Remove Question</button>
                            
                            {(() => {
                                if (this.state.questionTypes[index] === 'MC') {
                                    return (
                                        <MultipleChoiceAnswers 
                                            answers={this.state.answers[index]} 
                                            updateQuestionAnswerData={this.updateQuestionAnswerData}
                                            questionNumber={index}
                                            correctAnswer={this.state.correctAnswers[index]}
                                        />
                                    );
                                }
                                return (
                                    <OpenEndedAnswer 
                                        answers={this.state.answers[index]} 
                                        updateQuestionAnswerData={this.updateQuestionAnswerData}
                                        questionNumber={index}
                                        correctAnswer={this.state.correctAnswers[index]}
                                    />

                                );
                            })
                            ()}
                            
                            <br/>
                            <br/>
                        </div>
                    ))}
                    </label>
                    <button onClick={this.handleAddQuestionClick}>Add Question</button>

                    <label>
                    <br/><br/>
                    Set Time Limit (hh:mm:ss):
                    <TimeField 
                        value={this.state.timeLimit} 
                        showSeconds={true} 
                        onChange={this.handleTimeChange} 
                        style={{marginLeft:'10px'}}
                    />
                    <br/><br/>

                    <label style={{marginRight:'10px'}}>
                        Select Exam Date
                    </label>
                    <DatePicker
                        selected={this.state.date}
                        onChange={this.handleDateChange}
                    />
                    <br/><br/>

                </label>

                </form>

                <Link to={{pathname: '/quizzes', state: {update: true}}}>
                        <button onClick={this.submitQuizToDb}>Publish Quiz</button>
                </Link>

           </div>
        )
    } 
  
}

export default CreateQuiz;