import React, {useState} from 'react';
import { useSpring, animated } from 'react-spring';
import { NavLink } from 'react-router-dom';
import Cookies from 'universal-cookie';
import ClassBox from './ClassBox'
//import RegisterClass from '../components/RegisterClass'
const cookies = new Cookies();

const NavBar = (props) => {
    //spring consts
    const [toggle, set] = useState(true)
    const move = useSpring({
        marginLeft: toggle ? '-15%' : '-2%',
        from: { marginLeft: '-15%'},
    })
    //removes user data from cookies on logout
    const logout = () => {
        console.log('hi')
        cookies.remove('userId', {path: '/'})
        cookies.remove('userName', {path: '/'});
        cookies.remove('userClasses', {path: '/'});
        cookies.remove('userType', {path: '/'})
        cookies.remove('currentClass', {path: '/'})
        cookies.remove('forumInfo', {path: '/'})
        this.props.unmountIt()
        set(state => !state)
    }
    //if user is not signed in only shows login
    if(!cookies.get('userId')){
        return(
            <animated.div
            className='sideBar'
            onMouseEnter={() => set(state => !state)}
            onMouseLeave={() => set(state => !state)}
            style={move}>
            <NavLink className='navButton' to="/home" exact>Login</NavLink>
            </animated.div>
        )
    }
    //renders navbar
    return(
        <animated.div
        className='sideBar'
        onMouseEnter={() => set(state => !state)}
        onMouseLeave={() => set(state => !state)}
        style={move}>
        <NavLink className='navButton' to="/home" exact>Home</NavLink>
        <NavLink className='navButton' to="/forum" exact>Forum</NavLink>
        <NavLink className='navButton' to="/quizzes" exact>Quizzes</NavLink> 
        <NavLink className='navButton' to="/grades" exact>Grades</NavLink>
        <NavLink className='navButton' to="/resources" exact>Resources</NavLink>
        <NavLink className='navButton' to="/officehours" exact> Office Hours </NavLink>
        <NavLink className='navButton logout' to="/" exact onClick={logout}>Log Out</NavLink>
        <ClassBox/>
        <button onClick={props.toggle}>Register</button>
        </animated.div>
    )
}

export default NavBar
