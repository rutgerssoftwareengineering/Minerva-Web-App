import React, { Component } from 'react';
import {Router, Route, Link, Redirect} from 'react-router-dom';
import Home from './Home';
import Register from '../../Register';
import ForumContainer from './ForumContainer';
import GradesContainer from './GradesContainer';
import QuizIndex from '../components/quiz/QuizIndex';
import VideoPage from '../../student/containers/VideoPage';
import NavBar from './NavBar';
import history from '../../History'; 
import axios from 'axios';
import Cookies from 'universal-cookie'
import Login from '../../Login'
const cookies = new Cookies();

class StudentApp extends Component {
    constructor(props){
        super(props)
        this.state={
            quizzesData: []
    }}

    componentDidMount(){
        this.getQuizDataFromDb();
    }
    //gets quizzes from database
    getQuizDataFromDb = () => {
        let classId = cookies.get('currentClass')
        axios.get("http://localhost:3001/api/getQuizzes", {params: {class: classId}})
            .then(res =>{
                const quizzes = res.data.data 
                this.setState({ quizzesData: quizzes })
                console.log(this.state.quizzesData)
            })
            //.catch(error => console.log(error));
    };

    render(){
        //routes all paths in page
        return(
        <Router history={history}>
            <React.Fragment>
                <NavBar unmountIt={this.props.unmountIt}/>
                <Route exact path='/' component={Login} />
                <Route exact path='/home' component={Home} />
                <Route exact path='/register' component={Register} />
                <Route exact path='/grades' render={routerProps => <GradesContainer {...routerProps}/>} />
                <Route path='/forum' render={routerProps => <ForumContainer {...routerProps}/> }/>
                <Route path='/quizzes' render={routerProps => <QuizIndex {...routerProps} quizzes={this.state.quizzesData}/>} />
                <Route path='/officehours' component={VideoPage}/>
            </React.Fragment>    
        </Router>
        );
    }
};

export default StudentApp;
