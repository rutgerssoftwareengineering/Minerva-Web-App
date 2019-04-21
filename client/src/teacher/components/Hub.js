import React, {Component} from 'react';
import Feedback from '../hub_components/Feedback';
import AdministerQuizComponent from '../hub_components/AdministerQuizComponent';

class Hub extends Component {
    constructor(props){
        super(props)
        
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