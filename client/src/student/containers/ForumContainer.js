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
            forumInfo: []
        }
    }

    componentDidMount(){
        this.getForumDataFromDb()
}
 //queries database for forums
 getForumDataFromDb = () => {
    axios.get("http://localhost:3001/api/getForums", {params: {class:cookies.get('currentClass')}})
    .then(res => {
        this.setState({
            forumInfo: res.data.data
        })
    })
    //.catch(error => console.log(error));
};

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
             <Forum forumInfo={(this.state.forumInfo)}/>
        )} />
        <Route path={`${(this.state.match).url}/:threadId`}  render={(routerProps)=> <Thread {...routerProps} />} />

    </div>
    </>)}
}

export default ForumContainer;