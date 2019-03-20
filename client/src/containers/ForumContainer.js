import React from 'react';
import {Route} from 'react-router-dom';
import Thread from '../components/forum/Thread'
import { NavLink } from 'react-router-dom';
import Forum from '../components/forum/Forum';

const ForumContainer = ({match, forum}) => (
    <div>
        <Route exact path={match.url} render={()=>(
             <Forum forum={forum} />
        )} />
        <Route path={`${match.url}/:threadId`}  render={(routerProps)=> <Thread forum={forum} {...routerProps} />} />

    </div>
)

export default ForumContainer;