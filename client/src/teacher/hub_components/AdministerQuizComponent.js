import Grid from '@material-ui/core/Grid';
import React, {Component} from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { Chart } from "react-google-charts";


const cookies = new Cookies();



// Component which has 6 feedback options to view, updating based on database
class AdministerQuizComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            quizData: [],
            quizDataLoaded: false,
            selectedQuiz: '',
            selectedQuestion: '',
            selectedQuestionIndex: -1,
            currQuizData: [{problems: []}],
            answers: [],
            questionActive: false,
            responses: [],
            responseCounts: [0,0,0,0]
        };

        this.getQuizData();
        
        this.handleQuizChange = this.handleQuizChange.bind(this);
        this.handleQuestionChange = this.handleQuestionChange.bind(this);
        this.administerQuestion = this.administerQuestion.bind(this);
        this.stopAdministeringQuestion = this.stopAdministeringQuestion.bind(this);
    }

    componentDidMount(){
        this.getQuizData();
    }

    componentWillReceiveProps(nextProps){
        this.getQuizData();
    }

    handleQuizChange(event, name){
        if(event.target.value === 'none selected'){
            this.setState({ 
                [name]: event.target.value, 
                currQuizData: [{problems: []}]
            });

            return;
        }

        this.setState({ 
            [name]: event.target.value,
            currQuizData: this.state.quizData.filter((key, _) => key.quizTitle === event.target.value)
        });
    };

    handleQuestionChange(event, name){
        this.setState({ 
            [name]: event.target.value,
            answers: this.state.currQuizData[0].problems.filter((key, _) => key[0] === event.target.value)[0][1]
        });
    };

    administerQuestion(event){
        this.setState({ 
            questionActive: true
        });
        this.activateQuestion();
    };

    stopAdministeringQuestion(event){
        this.setState({ 
            questionActive: false
        });
        this.deActivateQuestion();
    };
    

    activateQuestion = () => {
        axios.post("http://localhost:3001/api/submitInclassQuizData", {
            classId: cookies.get('currentClass'),
            quizTitle: this.state.selectedQuiz, 
            question: this.state.selectedQuestion,
            answers: this.state.answers,
            responses: [],
            isActive: true
        })
        .then(res => console.log(res.data))
    }

    deActivateQuestion = () => {
        axios.post("http://localhost:3001/api/updateActiveInclassQuiz", {
            classId: cookies.get('currentClass'),
            quizTitle: this.state.selectedQuiz, 
            question: this.state.selectedQuestion,
            isActive: false
        })
        .then(res => console.log(res.data))
        .then(() => {
            axios.get('http://localhost:3001/api/getInclassQuizResponseData', {params: {
                classId: cookies.get('currentClass'),
                quizTitle: this.state.selectedQuiz, 
                question: this.state.selectedQuestion}})
            .then(res => {
                console.log("getting response data", res.data.data[0].responses)
                this.setState({
                responses: res.data.data.responses,
                });
                
                var i;
                let numResponses = [0,0,0,0];
                for (i = 0; i < res.data.data[0].responses.length; i++) {
                    console.log("response", res.data.data[0].responses[i][1]);
                    if(res.data.data[0].responses[i][1] > 3 || res.data.data[0].responses[i][1] < 0){
                        continue;
                    }
                    numResponses[res.data.data[0].responses[i][1]]++;
                } 
                console.log("num responses", numResponses);
                this.setState({
                    responseCounts: numResponses,
                });
            })
        })
    }

    getQuizData = () => {
        //class: cookies.get('currentClass')
        axios.get('http://localhost:3001/api/getInclassQuizzes', {params: {class: cookies.get('currentClass')}})
        .then(res => {
            console.log(res.data.data, cookies.get('currentClass'));
            this.setState({
              quizData: res.data.data,
              quizDataLoaded: true
            });
        })
        
    }



    // renders this.state.answers into answer fields
    // first is a select correct answer, then a text input, and then a delete
    render(){
        let quizData = this.state.quizData;
        let currQuizData = this.state.currQuizData;
        
        return(
            <div>

                    <Grid 
                        container
                        justify="center"
                        alignItems="center"
                        spacing={24}
                        item
                    >
                        <Grid item xs>
                            <FormControl>
                                <InputLabel htmlFor="age-native-simple"
                                    style={{color: 'white'}}
                                >
                                    Select Quiz
                                </InputLabel>
                                    <Select
                                        native
                                        value={this.state.age}
                                        onChange={(event) => {this.handleQuizChange(event, 'selectedQuiz')}}
                                        inputProps={{
                                        name: 'selectQuiz',
                                        }}
                                        style={{
                                            color: 'red'
                                        }}
                                    >
                                        <option value="none selected" />
                                        {quizData.map((key, index) => (
                                            <option value={key.quizTitle} key={index}>{key.quizTitle}</option>
                                        ))}
                                    </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs>
                            <FormControl>
                                <InputLabel htmlFor="age-native-simple"
                                    style={{color: 'white'}}
                                >
                                    Select Question
                                </InputLabel>
                                    <Select
                                        native
                                        value={this.state.age}
                                        onChange={(event) => {this.handleQuestionChange(event, 'selectedQuestion')}}
                                        inputProps={{
                                        name: 'selectQuestion',
                                        }}
                                        style={{
                                            color: 'red'
                                        }}
                                    >
                                        <option value="" />
                                        {currQuizData[0].problems.map((key, index) => (
                                            <option value={key[0]}>{key[0]}</option>
                                            ))
                                        }
                                    </Select>
                            </FormControl>
                        </Grid>
                    </Grid>



                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                    spacing={24}
                >


                    <Grid 
                        container
                        justify="center"
                        alignItems="center"
                        spacing={24}
                        item
                    >
                        <Grid item xs>
                            <label>
                                Quiz Question
                            </label>
                        </Grid>
                    </Grid>

                    <Grid 
                        container
                        justify="center"
                        alignItems="center"
                        spacing={24}
                        item
                    >
                        <Grid item xs>
                            {(() => {
                                if(this.state.answers.length < 1){
                                    return (<label>No Answer in database</label> );
                                }
                                return (<label>A. {this.state.answers[0]}</label>);
                            })()}
                        </Grid>
                        <Grid item xs>
                            {(() => {
                                if(this.state.answers.length < 2){
                                    return (<label>No Answer in database</label> );
                                }
                                return (<label>B. {this.state.answers[1]}</label>);
                            })()}
                        </Grid>
                    </Grid>

                    <Grid 
                        container
                        justify="center"
                        alignItems="center"
                        spacing={24}
                        item
                    >
                        <Grid item xs>
                            {(() => {
                                if(this.state.answers.length < 3){
                                    return (<label>No Answer in database</label> );
                                }
                                return (<label>C. {this.state.answers[2]}</label>);
                            })()}
                        </Grid>
                        <Grid item xs>
                            {(() => {
                                if(this.state.answers.length < 4){
                                    return (<label>No Answer in database</label> );
                                }
                                return (<label>D. {this.state.answers[3]}</label>);
                            })()}
                        </Grid>
                    </Grid>

                    <Grid 
                        container
                        justify="center"
                        alignItems="center"
                        spacing={24}
                        item
                    >
                        <Grid item xs>
                            {(() => {
                                if(this.state.questionActive === false){
                                    return (<button onClick={this.administerQuestion}>Administer Question</button> );
                                }
                                return (<button onClick={this.stopAdministeringQuestion}>Stop Administering Question</button>);
                            })()}
                            
                        </Grid>
                    </Grid>

                    <Grid 
                        container
                        justify="center"
                        alignItems="center"
                        spacing={24}
                        item
                    >
                        <Chart
                            width={'500px'}
                            height={'300px'}
                            chartType="BarChart"
                            loader={<div>Loading Chart</div>}
                            data={[
                                [
                                'Element',
                                'Responses',
                                { role: 'style' },
                                {
                                    sourceColumn: 0,
                                    role: 'annotation',
                                    type: 'string',
                                    calc: 'stringify',
                                },
                                ],
                                [this.state.answers[0], this.state.responseCounts[0], 'blue', null],
                                [this.state.answers[1], this.state.responseCounts[1], 'red', null],
                                [this.state.answers[2], this.state.responseCounts[2], 'green', null],
                                [this.state.answers[3], this.state.responseCounts[3], 'yellow', null],
                            ]}
                            options={{
                                title: 'Response Frequency',
                                width: 600,
                                height: 400,
                                bar: { groupWidth: '95%' },
                                legend: { position: 'none' },
                            }}
                            // For tests
                            rootProps={{ 'data-testid': '6' }}
                            />

                    </Grid>
                    

                </Grid>
           </div>
        )
    } 
  
}

export default AdministerQuizComponent;