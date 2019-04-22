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
                   <h1>.</h1>
            <h1></h1>
            <h1>How *did* Minerva get its name?</h1>
            <br></br>
            <br></br>
            <body>
                 <p>
                    Several Rutger Students met in January 2019 to talk about developing a Sakai copy for a Software Engineering Project. Minerva as we know it is what emerged from those talks and the subsequent development efforts.
                 </p>
                 <br></br>
                 <p>
                    Several of the students had never coded in javascript on their own prior to converging to develop Minerva. The institutions partially modeled Minerva after certain aspects of older CMS's, particularly Sakai and Canvas.
                 </p>
                 <br></br>
                 <p>
                    The name MINERVA came since the new software was expected to be better than SAKAI, which developers named the after Hiroyuki Sakai. As a play on MINERVA being on a higher plane of being, the developers of MINERVA named the CMS after Minerva the Roman godess of KNOWLEDGE.
                 </p>
            </body>
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