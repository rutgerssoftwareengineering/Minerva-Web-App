import React, {Component} from 'react';
import Feedback from '../hub_components/Feedback';
import AdministerQuizComponent from '../hub_components/AdministerQuizComponent';
import axios from 'axios';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

class Hub extends Component {
    constructor(props){
        super(props)
        this.state = {
        }
    }
    render(){
        return(
            <div>
                    <h1>Teacher Hub</h1>
                    <h1>Teacher Hub</h1>
                    <AdministerQuizComponent/>
            </div>

        )
    } 
  
}
export default Hub;