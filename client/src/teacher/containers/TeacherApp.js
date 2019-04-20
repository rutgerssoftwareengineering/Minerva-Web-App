import React, { Component } from 'react';
import {Router, Route} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../store'
import Login from '../../Login'
import Home from './Home';
import QuizRouter from './QuizRouter';

import PersistentDrawerLeft from './Drawio'
import CreateQuiz from '../quiz_components/CreateQuiz';
import CreateAnnouncement from '../components/CreateAnnouncement';
import Hub from '../components/Hub';
import ViewAnnouncement from '../components/ViewAnnouncement';
import history from '../../History';
import ForumContainer from './ForumContainer'
import RegisterClass from '../components/RegisterClass'
import ManageFiles from './ManageFiles'


class TeacherApp extends Component {
    constructor(props){
        super(props)
        this.state={
            files: [],
            isOpen: false
    }}
    componentWillMount() {
        this.getFiles();
    }
    toggleRegister = () => {
        this.setState({
          isOpen: !this.state.isOpen
        })
    }
    getFiles() {
        fetch('/api/getFiles')
          .then(res => res.json())
          .then(files => {
            if (files.message) {
              console.log('No Files');
              this.setState({ files: [] })
            } else {
              this.setState({ files: files})
            }
          });
    }
    render(){
    return(
        <Provider store = {store}>
            <Router history={history}>
                <React.Fragment>
                <PersistentDrawerLeft unmountIt={this.props.unmountIt} toggle={this.toggleRegister}/>               
                <Route exact path='/' component={Login} />
                <Route exact path='/home' component={Home} />
                <Route path='/forum' render={routerProps => <ForumContainer {...routerProps}/> }/>
                <Route exact path='/quizzes' component={QuizRouter} />
                <Route exact path='/createQuiz' component={CreateQuiz} />
                <Route exact path='/hub' component={Hub} />
                <Route exact path='/announcements/new' component={CreateAnnouncement} />
                <Route exact path='/announcements/view' component={ViewAnnouncement} />
                <Route path='/manageFiles' render={(routerProps) => <ManageFiles {...routerProps} files={this.state.files}/>}/>
                <RegisterClass className='navButton'show={this.state.isOpen} onClose={this.toggleRegister}>
                        Register a new class
                </RegisterClass>
                </React.Fragment>    
            </Router>
        </Provider>
    )}
};

export default TeacherApp;
