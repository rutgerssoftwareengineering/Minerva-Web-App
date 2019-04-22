import React, { Component } from 'react';
import {Router, Route} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../store'
import Login from '../../Login'
import Home from './Home';
import QuizRouter from './QuizRouter';
import GradesContainer from '../components/Gradebook';
import axios from 'axios'
import PersistentDrawerLeft from './Drawio'
import CreateQuiz from '../quiz_components/CreateQuiz';
import CreateAnnouncement from '../components/CreateAnnouncement';
import Hub from '../components/Hub';
import VideoPage from './VideoPage';
import ViewAnnouncement from '../components/ViewAnnouncement';
import history from '../../History';
import ForumContainer from './ForumContainer'
import RegisterClass from '../components/RegisterClass'
import ManageFiles from './manageFiles'
import Cookies from 'universal-cookie';
const cookies = new Cookies();


class TeacherApp extends Component {
    constructor(props){
        super(props)
        this.state={
            files: [],
            isOpen: false
    }}
    componentWillMount() {
        this.getFiles();
        this.getFeedbackFromDb()
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
    getFeedbackFromDb = () => {
      axios.get("http://localhost:3001/api/getFeedback"/*, {params: {class:cookies.get('currentClass')}}*/)
      .then(res => {
          const feedback = res.data.data
          console.log(feedback)
          cookies.set('feedback', feedback, {path: '/'})
    })}
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
                <Route exact path='/grades' component={GradesContainer} />
                <Route exact path='/announcements/new' component={CreateAnnouncement} />
                <Route exact path='/announcements/view' component={ViewAnnouncement} />
                <Route path='/manageFiles' render={(routerProps) => <ManageFiles {...routerProps} files={this.state.files}/>}/>
                <Route path='/officehours' component={VideoPage}/>
                <RegisterClass className='navButton'show={this.state.isOpen} onClose={this.toggleRegister}>
                        Register a new class
                </RegisterClass>
                </React.Fragment>    
            </Router>
        </Provider>
    )}
};

export default TeacherApp;
