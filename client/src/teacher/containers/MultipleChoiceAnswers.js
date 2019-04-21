import React, {Component} from 'react';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
// Component which stores and displays all the answers for a particular question
class MultipleChoiceAnswers extends Component {
    constructor(props){
        super(props);
        this.state = {
            answers: props.answers,
            numAnswers: props.answers.length,
            correctAnswer: props.correctAnswer
        };

        this.handleAddAnswerClick = this.handleAddAnswerClick.bind(this);
        this.handleRemoveAnswerClick = this.handleRemoveAnswerClick.bind(this);
        this.selectCorrectAnswer = this.selectCorrectAnswer.bind(this);
    }

    //function to run if the parent sends new props to this component
    componentWillReceiveProps(newProps) {
        this.setState({ 
            answers: newProps.answers, 
            numAnswers: newProps.answers.length,
            correctAnswer: newProps.correctAnswer
        });  
    }

    // add answer and corresponding state to display that answer
    handleAddAnswerClick(event){
        event.preventDefault();
        const num = this.state.numAnswers + 1;
        var tempAnswers = this.state.answers.concat('');
        this.setState({
            answers: tempAnswers,
            numAnswers: num
        });

        this.props.updateQuestionAnswerData(tempAnswers, this.props.questionNumber, this.state.correctAnswer);


    }

    // when answer text box is changed, change the saved answer data in the state
    // update the parent component
    handleAnswerChange(event, answerNum){
        const newAnswers = this.state.answers.map((key, index) => {
            if (answerNum === index) {
              return event.target.value;
            } else {
              return key;
            }
        });

        this.setState({
            answers: newAnswers
        });



        this.props.updateQuestionAnswerData(newAnswers, this.props.questionNumber, this.state.correctAnswer);

    }

    
    // remove answer from this.state and update the parent component
    handleRemoveAnswerClick(event, index){
        event.preventDefault();
        const newAnswers = this.state.answers.filter((_, j) => j !== index);
        const newNumAnswers = this.state.numAnswers - 1;
        var newCorrectAnswer = -1;
        if(index < this.state.correctAnswer){
            newCorrectAnswer = this.state.correctAnswer - 1;
        } else if(index > this.state.correctAnswer){
            newCorrectAnswer = this.state.correctAnswer;
        }

        this.setState({
            answers: newAnswers,
            numAnswers: newNumAnswers,
            correctAnswer: newCorrectAnswer
        });
        
        this.props.updateQuestionAnswerData(newAnswers, this.props.questionNumber, newCorrectAnswer);
    }


    // update parent component and this.state when correct answer is selected
    selectCorrectAnswer(index){
        console.log('answer ' + index + ' selected');
        this.setState({
            correctAnswer: index
        });

        this.props.updateQuestionAnswerData(this.state.answers, this.props.questionNumber, index);
    }


    // renders this.state.answers into answer fields
    // first is a select correct answer, then a text input, and then a delete
    render(){
        const answers = this.state.answers;

        return(
            <div>
                <label>
                {answers.map((key, index) => (
                    <div key={index}>
                        <label style={{paddingRight:'10px',color:'blue'}}>
                            
                            Mark Answer {index + 1} as correct:
                        </label>
                        <input
                            type="radio"
                            checked={this.state.correctAnswer === index}
                            onChange={() => {this.selectCorrectAnswer(index)}}
                            style={{marginRight:'10px'}}
                        />
                        <input 
                            type="text" 
                            name={index} 
                            onChange={(event) => {this.handleAnswerChange(event, index)}}
                            value={key}
                            style={{ width:"300px", marginRight:"10px" }}
                        />
                        <Button   onClick={(event) => {this.handleRemoveAnswerClick(event, index)}}><DeleteIcon fontSize="small"/></Button>
                    </div>
                ))}
                </label>
                <Fab color="white" variant="extended" onClick={this.handleAddAnswerClick}>Add Answer</Fab>
           </div>
        )
    } 
  
}

export default MultipleChoiceAnswers;