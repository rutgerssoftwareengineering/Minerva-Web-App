import React, { Component } from 'react';
import {Router, Route} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../store'
import Login from '../../Login'
import Home from './Home';
import QuizRouter from './QuizRouter';
import TopBar from './TopBar';
import CreateQuiz from '../quiz_components/CreateQuiz';
import CreateAnnouncement from '../components/CreateAnnouncement';
import ViewAnnouncement from '../components/ViewAnnouncement';
import history from '../../History';
import ForumContainer from './ForumContainer'
import RegisterClass from '../components/RegisterClass'
import manageFiles from './manageFiles'


class TeacherApp extends Component {
    constructor(props){
        super(props)
        this.state={
            quizzesData: [],
            isOpen: false
    }}
    toggleRegister = () => {
        this.setState({
          isOpen: !this.state.isOpen
        })
      }
    render(){
    return(
        <Provider store = {store}>
            <Router history={history}>
                <React.Fragment>
                <TopBar unmountIt={this.props.unmountIt} toggle={this.toggleRegister}/>               
                <Route exact path='/' component={Login} />
                <Route exact path='/home' component={Home} />
                <Route path='/forum' render={routerProps => <ForumContainer {...routerProps}/> }/>
                <Route exact path='/quizzes' component={QuizRouter} />
                <Route exact path='/createQuiz' component={CreateQuiz} />
                <Route exact path='/announcements/new' component={CreateAnnouncement} />
                <Route exact path='/announcements/view' component={ViewAnnouncement} />
                <Route exact path='/manageFiles' component={manageFiles} />
                <RegisterClass className='navButton'show={this.state.isOpen} onClose={this.toggleRegister}>
                        Register a new class
                </RegisterClass>
                </React.Fragment>    
            </Router>
        </Provider>
    )}
};

export default TeacherApp;
