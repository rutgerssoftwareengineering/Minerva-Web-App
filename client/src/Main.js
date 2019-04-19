import React, {Component} from 'react';
import Login from './Login'
import Register from './Register'
class Main extends Component {
    state={
        loginClicked: false,
        registerClicked: false
    }
    clickLogin = (event) => {
        event.preventDefault()
        this.setState({
            loginClicked: true,
            registerClicked: false
        })
    }

    clickRegister = (event) => {
        event.preventDefault()
        this.setState({
            loginClicked: false,
            registerClicked: true
        })
    }
    render(){
        if(!this.state.loginClicked && !this.state.registerClicked){
            return(
                <div>
                    <h1>Minerva</h1>
                <button className="login-button" onClick={this.clickLogin}>Login</button>
                <button className="login-button" onClick={this.clickRegister}>Register</button>
                </div>
            )
        }else if(!this.state.registerClicked && this.state.loginClicked){
            return(
                <Login />
            )
        }else if(this.state.registerClicked && !this.state.loginClicked) {
            return(
                <Register />
            )
        }
    }
}

export default Main;