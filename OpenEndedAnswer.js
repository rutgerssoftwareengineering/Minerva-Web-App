import React, {Component} from 'react';

// Component which stores and displays all the answers for a particular question
class OpenEndedAnswer extends Component {
    constructor(props){
        super(props);
        if(props.answers.length === 0){
            this.state = {
                answers: [''],
                correctAnswer: 0
            }
                
            this.props.updateQuestionAnswerData(this.state.answers, this.props.questionNumber, 0);
            
            
        } else {
            this.state = {
                answers: props.answers,
                correctAnswer: props.correctAnswer
            };    
        }
        

    }

    //function to run if the parent sends new props to this component
    componentWillReceiveProps(newProps) {
        this.setState({ 
            answers: newProps.answers, 
            correctAnswer: newProps.correctAnswer
        });  
    }


    // when answer text box is changed, change the saved answer data in the state
    // update the parent component
    handleAnswerChange(event){
        const newAnswers = this.state.answers.map((key, index) => {
            if (0 === index) {
              return event.target.value;
            } else {
              return key;
            }
        });

        this.setState({
            answers: newAnswers
        });



        this.props.updateQuestionAnswerData(newAnswers, this.props.questionNumber, null);

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
                            Answer:
                        </label>
                        <input 
                            type="text" 
                            name={index} 
                            onChange={(event) => {this.handleAnswerChange(event, index)}}
                            value={key}
                            style={{ width:"300px", marginRight:"10px" }}
                        />
                        
                    </div>
                ))}
                </label>
           </div>
        )
    } 
  
}

export default OpenEndedAnswer;