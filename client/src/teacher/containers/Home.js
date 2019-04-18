import React, {Component} from 'react';
import axios from 'axios'
import {Route, Link} from 'react-router-dom';
import ForumContainer from './ForumContainer';
import Cookies from 'universal-cookie';
import Login from '../../Login'
import history from '../../History'
const cookies = new Cookies();

class Home extends Component{
    componentDidMount(){
        this.getForumDataFromDb()
}
 //queries database for forums
 getForumDataFromDb = () => {
    axios.get("http://localhost:3001/api/getForums", {params: {class:cookies.get('currentClass')}})
    .then(res => {
        const forumInfo = res.data.data
        cookies.remove('forumInfo', {path: '/'})
        cookies.set('forumInfo', forumInfo);
        console.log(cookies.get('forumInfo'))
    })
    //.catch(error => console.log(error));
};
    render(){
        return(
            <div className='centered'>
                Welcome
           </div>
        )
    } 
    
}

export default Home;