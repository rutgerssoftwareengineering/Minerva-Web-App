import React, {Component} from 'react';
import axios from 'axios'
import {Route, Link} from 'react-router-dom';
import ForumContainer from './ForumContainer';
import Cookies from 'universal-cookie';
import Login from '../../Login'
import history from '../../History'
const cookies = new Cookies();
class Home extends Component{
    constructor(props) {
        super(props)
        this.state = {
            userData: [],
        forumData: [],
        quizzesData: [],
        completedQuizzesData: [],
        gradesData: [],
        userInfo: []
        };  
    }
    //initial database query for all info
    componentDidMount(){
        setTimeout(()=>{ 
            this.getUserDataFromDb();
            this.getForumDataFromDb();
            this.getQuizDataFromDb();
        } , 1000)
    }
    //gets all users from database
    getUserDataFromDb = () => {
        fetch("http://localhost:3001/api/getUsers")
          .then(data => data.json())
          .then(res => this.setState({ userData: res.data }))
          .catch(error => console.log(error));
    };
     //queries database for forums
     getForumDataFromDb = () => {
        axios.get("http://localhost:3001/api/getForums")
        .then(res => {
            const forumInfo = res.data 
            cookies.set('forumInfo', forumInfo);
        })
        .catch(error => console.log(error));
    };
    //gets all quizzes from database
    getQuizDataFromDb = () => {
        fetch("http://localhost:3001/api/getQuizzes")
        .then(res => {
            const quizData = res.data 
            cookies.set('quizData', quizData, { path: '/' });
        })
        .catch(error => console.log(error));
    };

      
    render(){
        if(!!cookies.get('userId')){
            return(<div>Welcome, {cookies.get('userName')}!</div>)
        }
        return(
            <div>
                relogged in
            </div>
        )   
    } 
    
}

export default Home;