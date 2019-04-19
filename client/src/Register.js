import React, {Component} from 'react';
import StudentApp from './student/containers/StudentApp';
import axios from 'axios'
import Cookies from 'universal-cookie';
const cookies = new Cookies();

class Register extends Component{
    constructor(props) {
        super(props)
        this.state = {
              fullname: "",
              username: "",
              password: "",
              userData: [],
              unmountStudent: true
        };  
    }
    unmountChild = ()=>{
        this.setState({
            unmountStudent: true
        })
    }

    handleSignUp(e) {
        e.preventDefault()
        let fullname = this.refs.fullname.value;
        let username = this.refs.username.value;
        let password = this.refs.password.value;
        let passwordconf = this.refs.passwordconf.value;
        if (fullname === "" || username === "" || password === "" || passwordconf === ""){
            console.log("must enter values in all required fields...")
        }
        else if (password !== passwordconf){
            console.log("passwords dont match");
        }
        else{
         //ADD THAT SHIT TO THE DATABASE
         axios.post("http://localhost:3001/api/registerUser", {
            name: fullname,
            id: username,
            password: password
          })
          .then(res => this.setState({userData: {name: fullname, id: username}}))
        }
      }
      
      render() {
        if(this.state.userData.length !== 0){
            cookies.set('userId', this.state.userData.id, {path: '/'})
            cookies.set('userName', this.state.userData.name, {path: '/'})
        }
        if (!cookies.get('userId')) {
        return (
          <form onSubmit={this.handleSignUp.bind(this)}>
            <h3>Register</h3>
            <div>
                <label>Name:</label>
                <div>
                    <input type="text" ref="fullname" placeholder="enter full name"></input>
                </div>
            </div>
            <div>
                <label>NetID:</label>
                <div>
                    <input type="text" ref="username" placeholder="enter NetID"></input>
                </div>
            </div>
            <div>
                <label>Password:</label>
                <div>
                    <input type="password" ref="password" placeholder="enter password"></input>
                </div>
            </div>
            <div>
                <label>Confirm Password:</label>
                <div>
                    <input type="password" ref="passwordconf" placeholder="enter password again"></input>
                </div>
            </div>
            <input type="submit" value="Sign Up" />
          </form>
        )}else{
            if(!!this.state.unmountStudent){
                this.setState({
                    unmountStudent: false
                })
            }
            return !this.state.unmountStudent ? <StudentApp unmountIt={this.unmountChild}/> : null;
        }
      }
    
}

export default Register;
