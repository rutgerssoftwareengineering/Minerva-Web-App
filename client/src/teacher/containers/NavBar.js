import React, {useState} from 'react';
import { useSpring, animated } from 'react-spring';
import { NavLink } from 'react-router-dom';
import Cookies from 'universal-cookie';
import ClassBox from './ClassBox';
const cookies = new Cookies();

const NavBar = (props) => {
    const [toggle, set] = useState(true)
    const move = useSpring({
        marginLeft: toggle ? -320 : -20,
        opacity: toggle ? 1 : 1,
        from: { marginLeft: -320, opacity: 0},
    })

    const logout = () => {
        console.log('hi')
        cookies.remove('userId', {path: '/'})
        cookies.remove('userName', {path: '/'});
        cookies.remove('userClasses', {path: '/'});
        cookies.remove('userType', {path: '/'})
        cookies.remove('currentClass', {path: '/'})
        this.props.unmountIt()
        set(state => !state)
    }
    
    return(
        <animated.div
        className='sideBar'
        onMouseEnter={() => set(state => !state)}
        onMouseLeave={() => set(state => !state)}
        style={move}>
        <NavLink className='navButton' to="/home" exact>Home</NavLink>
        <NavLink className='navButton' to="/forum" exact>Forum</NavLink>
        <NavLink className='navButton' to="/quizzes" exact>Quizzes</NavLink> 
        <NavLink className='navButton' to="/announcements/view" exact>View Announcements</NavLink> 
        <NavLink className='navButton logout' to="/" exact onClick={logout}>Log Out</NavLink>
        <ClassBox/>
        <button onClick={props.toggle}>Register</button>
        </animated.div>
    )
}

export default NavBar