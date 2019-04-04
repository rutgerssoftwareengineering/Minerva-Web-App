//new thread moving window base
import React, {useState} from 'react';
import { useSpring, animated } from 'react-spring';
import NewThread from './NewThread'

function NewThreadBar() {
    const [toggle, set] = useState(true)
    //spring hook to create moving menu
    //normally hidden off screen, comes into view when tag is clicked
    const move = useSpring({
        marginLeft: toggle ? '100%' : '60%',
        from: { marginLeft: '100%'},
    })
    
    
    return(
        <>
        {/*tag extends out from edge of screen, when clicked the whole window slides into view */}
        <animated.div
            className='postTag'
            style={move}>
                <button onClick={() => set(state => !state)} style={{float:'left', width:'100%', 'textAlign': 'left', height:'100%',}}>
                    New Post
                </button></animated.div>
        <animated.div
        className='newPost'
        style={move}>
            <NewThread/>
        </animated.div>
        </>
    )
}

export default NewThreadBar