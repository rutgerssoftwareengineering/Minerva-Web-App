import React, {Component} from 'react';
import GradeBox from '../../components/grades/GradeBox'
import Cookies from 'universal-cookie';
import { memo, useState } from 'react';
import {Redirect} from 'react-router-dom';
import { useSpring, animated } from 'react-spring'
import { useMeasure, usePrevious } from '../../components/tree list/helpers'
import { Global, Frame, Content, toggle } from '../../assets/styles'
import * as Icons from '../../assets/icons'
import axios from 'axios';
const cookies = new Cookies();


const Tree = memo(({ children, name, style, open = false }) => {
    //authentication
    if(!cookies.get('userId')){
      cookies.set('redirectPath', '/grades', {path: '/'} )
      return(<Redirect to='/login'/>)
    }
    //spring styling consts
    const [isOpen, setOpen] = useState(open)
    const previous = usePrevious(isOpen)
    const [bind, { height: viewHeight }] = useMeasure()
    const { height, opacity, transform } = useSpring({
      from: { height: 0, opacity: 0, transform: 'translate3d(20px,0,0)' },
      to: { height: isOpen ? viewHeight : 0, opacity: isOpen ? 1 : 0, transform: `translate3d(${isOpen ? 0 : 20}px,0,0)` }
    })
    const Icon = Icons[`${children ? (isOpen ? 'Minus' : 'Plus') : 'Close'}SquareO`]
    //formatting for expandable tree
    return (
      <Frame>
        <Icon style={{ ...toggle, 'font-size':'40px', opacity: children ? 1 : 0.3 }} onClick={() => setOpen(!isOpen)} />
        <span style={{ verticalAlign: 'middle', ...style }}>{name}</span>
        <Content style={{ opacity, height: isOpen && previous === isOpen ? 'auto' : height, }}>
          <animated.div style={{ transform }} {...bind}>
            {children}
          </animated.div>
        </Content>
      </Frame>
    )
  })

class GradesContainer extends Component{
    //triggers database gathering on mount
    componentWillMount(){
      this.getGradesDataFromDb();
    }
    //queries database using user data
    getGradesDataFromDb = () => {
      axios.get('http://localhost:3001/api/getGrades', {params: {
          member: cookies.get('userId'),
          classes: cookies.get('userClasses')
      }})
      .then(res => {
          const gradeInfo = res.data 
          cookies.set('gradeInfo', gradeInfo, { path: '/' });
      });
    };
    //renders tree
    render(){
      const classes = cookies.get('gradeInfo').data
      console.log(cookies.get('gradeInfo'))
    const userId = cookies.get('userId');
    return(
    <div className='gradebook'>
    <div style={{marginLeft:'10px'}}>
    <>
    <Global/>
    <Tree name="Classes" style={{ color: 'black', 'fontSize': '40px' }} open>
        {classes.map( (classInfo, key) => (
            <Tree name={classInfo.className} style={{ color: 'black', 'font-size': '40px'  }} key={key}>
            {(classInfo.members).map((member, index) => (
                <div key={index}>
                    {(member === userId) ? 
                        <GradeBox grades={classInfo.grades[index]} assignments={classInfo.assignments}/> : null
                    }
                </div>
            ))}
            </Tree>
        ))}
    </Tree>
    </>
    </div>
    </div>
    )}
}

export default GradesContainer;