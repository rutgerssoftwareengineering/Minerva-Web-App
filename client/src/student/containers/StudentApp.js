import React, { Component } from 'react';
import {Router, Route} from 'react-router-dom';
import Home from './Home';
import Register from '../../Register';
import ForumContainer from './ForumContainer';
import GradesContainer from './GradesContainer';
import ViewAnnouncement from '../components/ViewAnnouncement';
import QuizIndex from '../components/quiz/QuizIndex';
import PersistentDrawerLeft from './Drawio';
import NavBar from './NavBar';
import history from '../../History'; 
import axios from 'axios';
import Cookies from 'universal-cookie'
import Login from '../../Login'
import RegisterClass from '../components/RegisterClass'
import Resources from './Resources'
import VideoPage from '../../student/containers/VideoPage';
const cookies = new Cookies();

class StudentApp extends Component {
    constructor(props){
        super(props)
        this.state={
            quizzesData: [],
            isOpen: false,
            files: []
    }}

    componentWillMount(){
        this.getQuizDataFromDb();
        this.getFiles();
        this.getGradesDataFromDb()
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
    toggleRegister = () => {
        this.setState({
          isOpen: !this.state.isOpen
        })
      }
      getGradesDataFromDb = () => {
        axios.get('http://localhost:3001/api/getGrades', {params: {
            member: cookies.get('userId'),
            classes: cookies.get('userClasses')
        }})
        .then(res => {
            const gradeInfo = res.data.data
            cookies.remove('gradeInfo', gradeInfo, { path: '/' })
            cookies.set('gradeInfo', gradeInfo, { path: '/' });
        });
      };
    render(){
        //routes all paths in page
        return(
        <Router history={history}>
            <React.Fragment>
                <PersistentDrawerLeft unmountIt={this.props.unmountIt} toggle={this.toggleRegister}/>
                <Route exact path='/' component={Login} />
                <Route exact path='/home' component={Home} />
                <Route exact path='/register' component={Register} />
                <Route exact path='/grades' render={routerProps => <GradesContainer {...routerProps}/>} />
                <Route exact path='/announcements/view' component={ViewAnnouncement} />
                <Route path='/forum' render={routerProps => <ForumContainer {...routerProps}/> }/>
                <Route path='/quizzes' render={routerProps => <QuizIndex {...routerProps} quizzes={this.state.quizzesData}/>} />
                <Route path='/resources' render={(routerProps) => <Resources {...routerProps} files={this.state.files}/>}/>
                <Route path='/officehours' component={VideoPage}/>
                <RegisterClass className='navButton'show={this.state.isOpen} onClose={this.toggleRegister}>
                        Register a new class
                </RegisterClass>
            </React.Fragment>    
        </Router>
        );
    }
};

export default StudentApp;
