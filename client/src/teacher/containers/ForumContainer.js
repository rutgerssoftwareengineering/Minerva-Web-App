import React, {Component} from 'react';
import {Route, Redirect} from 'react-router-dom';
import Thread from '../components/forum/Thread'
import Forum from '../components/forum/Forum';
import NewThreadBar from '../components/forum/NewThreadBar'
import axios from 'axios'
import Cookies from 'universal-cookie';
const cookies = new Cookies();

class ForumContainer extends Component{
    constructor(props){
        super(props)
        this.state = {
            match: props.match,
        }
    }

    getForumDataFromDb = () => {
        axios.get("http://localhost:3001/api/getForums", {params: {class: cookies.get('currentClass')}})
        .then(res => {
            console.log(cookies.get('currentClass'))
            const forumInfo = res.data.data
            console.log(res.data.data)
            cookies.remove('forumInfo', {path: '/'})
            cookies.set('forumInfo', forumInfo);
        });
    };
    
    componentDidMount(){
        this.getForumDataFromDb();
    }

    render(){
          //authentication
    if(!cookies.get('userId')){
        cookies.set('redirectPath', '/forum', {path: '/'} )
        return(<Redirect to='/login'/>)
      }
    return(
        <>
        <NewThreadBar/>
    <div className='forum' style={{height: '200%'}}>
        <br/>
        <Route exact path={(this.state.match).url} render={()=>(
             <Forum />
        )} />
        <Route path={`${(this.state.match).url}/:threadId`}  render={(routerProps)=> <Thread {...routerProps} />} />

    </div>
    </>)}
}

export default ForumContainer;