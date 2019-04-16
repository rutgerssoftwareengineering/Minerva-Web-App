//individual thread component
import React from 'react';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const Thread = ({match}) => {
        //gets the whole rendered forum and the index of the appropriate thread to be rendered from match passed down from Forum component
        const forum = (cookies.get('forumInfo'))
        const currentThread = forum[match.params.threadId];
        return(
                    <div>
                    <h1>{currentThread.title}</h1> {/*displays title */}
                    {/*maps out every post in the thread and colors the outline green if its the endorsed post, otherwise outline is grey */}
                    {currentThread.posts.map((posts, index) => 
                        <>
                        {(index === currentThread.endorsed) ?
                                <>
                                        <div className='nameBar endorsed'>
                                                {currentThread.users[index]}
                                        </div>
                                        <div className='post endorsed'>
                                                {posts}
                                        </div>
                                        <br/>
                                </> 
                        :
                                <>
                                        <div className='nameBar'>
                                                {currentThread.users[index]}
                                        </div>
                                        <div className='post'>
                                                {posts}
                                        </div>
                                        <br/>
                                </>
                        }</>)}
                    </div>
        )
}
            

export default Thread;