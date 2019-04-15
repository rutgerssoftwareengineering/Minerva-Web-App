import React, {Component} from 'react';
import axios from 'axios';
import history from './History';
import Cookies from 'universal-cookie';
import StudentApp from './student/containers/StudentApp'
import TeacherApp from './teacher/containers/TeacherApp'
import Home from './student/containers/Home'
import {Router, Route, Link, Redirect} from 'react-router-dom';
import Register from './Register';
import ForumContainer from './student/containers/ForumContainer';
import GradesContainer from './student/containers/gradebook/GradesContainer';
import QuizIndex from './student/components/quiz/QuizIndex';
import NavBar from './student/containers/NavBar';
const cookies = new Cookies();

class Login extends Component{
    constructor(props) {
        super(props)
        this.state = {
              username: "",
              password: "",
              unmountStudent: true,
              unmountTeacher: true,
        };  
    }

    unmountChild = ()=>{
        this.setState({
            unmountStudent: true,
            unmountTeacher: true
        })
    }

    handleLogin(e) {
        e.preventDefault()
        let username = ""
        if(this.refs.username !== undefined){
            username = this.refs.username.value
        }
        let password = ""
        if(this.refs.password !== undefined){
            password = this.refs.password.value
        }
        if (username === "" || password === ""){
            console.log("must enter values in all required fields...")
        }
        else{
         console.log('id:', username, '\npassword:', password);
         //CHECK THAT SHIT IN THE DATABASE
            axios.get('http://localhost:3001/api/loginUser', {params: {id:username, password:password}})
            .then(res =>{
                return res.data
             })
             .then(data => this.setState({
                userData: data.data
            }))
            .catch(error => console.log(error));
        }
      }
      
      render() {
          if(((!!this.state.userData) && (!!cookies.get('userType'))) && (cookies.get('userType') !=  this.state.userData[0].type)){
              console.log('changed')
              cookies.remove('changeLog')
          }
        if(!!this.state.userData){
          if(this.state.userData.length !== 0){
                  cookies.set('userId', this.state.userData[0].id, {path: '/'})
                  cookies.set('userName', this.state.userData[0].name, {path: '/'})
                  cookies.set('userClasses', this.state.userData[0].classes, {path: '/'})
                  cookies.set('userType', this.state.userData[0].type, {path: '/'})
          }
        }
        {if (!cookies.get('userId')) {
        return (
            <form onSubmit={this.handleLogin.bind(this)}>
            <h3>Login</h3>
            <div>
                <label>NetID:</label>
                <div>
                    <input type="text" ref="username" placeholder="enter NetID"></input>
                </div>
                <h4>{this.state.userData}</h4>
            </div>
            <div>
                <label>Password:</label>
                <div>
                    <input type="password" ref="password" placeholder="enter password"></input>
                </div>
            </div>
            <input type="submit" value="Sign In"/>
        </form>
        )}
        else if(cookies.get('userType') === "student"){
            if(!!cookies.get('changeLog')){
                console.log('pushed at s')
                history.push('/home')
            }
            if(!!this.state.unmountStudent){
                this.setState({
                    unmountStudent: false
                })
            }
            cookies.set('changeLog')
            console.log('mounted s')
            return !this.state.unmountStudent ? <StudentApp unmountIt={this.unmountChild}/> : null;
        }
        else 
            if(!!cookies.get('changeLog')){
                console.log('pushed at t')
                history.push('/home')
            }
            if(!!this.state.unmountTeacher){
                this.setState({
                    unmountTeacher: false
                })
            }
            console.log(cookies.get('userType'))
            cookies.set('changeLog')
            console.log('mounted t')
            return !this.state.unmountTeacher ? <TeacherApp unmountIt={this.unmountChild}/> : null;
      }
}}

export default Login;