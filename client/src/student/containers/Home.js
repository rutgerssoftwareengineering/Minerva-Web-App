import React, {Component} from 'react';
import axios from 'axios'
import Cookies from 'universal-cookie';

const cookies = new Cookies();
class Home extends Component{
    constructor(props) {
        super(props)
        this.state = {
            userData: [],
        forumData: [],
        quizzesData: [],
        completedQuizzesData: [],
        gradesData: []
        };  
    }

    submitMe = () => {
        const user = (cookies.get('userId'))
        const classes = cookies.get('userClasses')
        classes.push('56271')
        axios.post("http://localhost:3001/api/registerClass", {
          id: user,
          newClasses: classes
        })
    };

    render(){
        if(!!cookies.get('userId')){
            return(
                <div>
                    <div>Welcome, {cookies.get('userName')}!</div>
                    <button onClick={this.submitMe}>click me</button>
                </div>
            )
        }
        return(
            <div>
                relogged in
            </div>
        )   
    } 
    
}

export default Home;