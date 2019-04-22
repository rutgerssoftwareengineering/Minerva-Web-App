import React, {Component} from 'react';
import MultipleChoiceAnswers from './MultipleChoiceAnswers';
import TimeField from 'react-simple-timefield';
import DatePicker from "react-datepicker";
import axios from 'axios';
import { Link } from 'react-router-dom';
import history from '../../History';
import OpenEndedAnswer from './OpenEndedAnswer';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputBase from '@material-ui/core/InputBase';
import InputLabel from '@material-ui/core/InputLabel';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

//import "react-datepicker/dist/react-datepicker.css";

const styles = theme => ({
fab:{
    margin: theme.spacing.unit,
},
textField:{
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
},
});

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
        const {classes} = this.props;
        return(
            <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{minHeight: '120vh'}}
            >
            <div>
                <form>
                    <label>

                        <TextField
                        color="blue"
                        label="Quiz Title"
                        variant="filled"
                        value={this.state.changeQuizTitle}
                        onChange={this.changeQuizTitle}
                        />
                        {/* <h1>Quiz Title:
                        <input 
                                type="text" 
                                onChange={this.changeQuizTitle}
                                value={this.state.quizTitle}
                                style={{ width:"300px", marginLeft:"10px"}}
                        />
                        </h1>
                        */}
                       <br/><br/> 
                    </label>
                     <label>

                    {questions.map((key, index) => (
                        <div key={index}>
                                                 <Card style={{marginBottom:5}}>
                                                <CardContent>
                            <h3 style={{textDecoration:'underline', color:'blue'}}>
                                Problem {index + 1}
                            </h3>
                            <br/>
                            <h4 style={{paddingRight:'10px', color: 'blue'}}>
                                Select Question Type:
                            </h4>
                            <label style={{paddingRight:'10px',color:'blue'}}>
                                Multiple Choice
                                <input
                                type="radio"
                                checked={this.state.questionTypes[index] === 'MC'}
                                onChange={() => {this.changeQuestionType(index, 'MC')}}
                                style={{marginRight:'10px'}}
                                />
                            </label>

                            <label style={{paddingRight:'10px',color:'blue'}}>
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

                            <label style={{paddingRight:'10px',color:'blue'}}>
                                Question:
                            </label>
                            <input 
                                type="text" 
                                name={index} 
                                onChange={(event) => {this.handleQuestionChange(event, index)}}
                                value={key}
                                style={{ width:"480px", marginRight:"10px"}}
                            /> 
                            <Fab color="secondary" aria-label="RemoveQuestion" onClick={(event) => {this.handleRemoveQuestionClick(event, index)}}><DeleteIcon /></Fab>
                            
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
                            </CardContent>  
                            </Card>
                        </div>
                                       
                    ))}

                    </label>
                    
                    <br/><br/>
                    <Fab color="primary" variant="extended" aria-label="AddQuestion" onClick={this.handleAddQuestionClick}>Add Question</Fab>

                    <label>
                    <br/><br/>

<Card >
    <CardContent>

                <h3 style={{color:'blue'}}>    Set Time Limit (hh:mm:ss):
                    <TimeField 
                        value={this.state.timeLimit} 
                        showSeconds={true} 
                        onChange={this.handleTimeChange} 
                        style={{marginLeft:'10px'}}
                    />
                    </h3>
                    <br/><br/>

                     <h3 style={{color:'blue'}}>  Select Exam Date:  
                     </h3>
                    <TextField
                        label="Exam Date"
                        type="date"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        selected={this.state.date}
                        onChange={this.handleDateChange}
                    />

                    <br/><br/>
                    </CardContent></Card>
                </label>

                </form>
<div></div>
                <Link to={{pathname: '/quizzes', state: {update: true}}}>
                        <Fab color="primary" variant = "extended" onClick={this.submitQuizToDb}>Publish Quiz</Fab>
                </Link>

           </div>
           </Grid>
        )
    } 
  
}

export default CreateQuiz;