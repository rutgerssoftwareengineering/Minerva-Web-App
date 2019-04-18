//internal forum component, renders all appropriate thread previews
import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import Cookies from 'universal-cookie';
import history from '../../History'
const cookies = new Cookies();


class ClassBox extends Component {
  constructor(props){
    super(props)
    this.state = {
      classes: (cookies.get('userClasses')), //retrieves current forum data from cookies
    }
  }

  changeClass = Id => {
    cookies.remove('currentClass', {path: '/'})
    cookies.set('currentClass', Id, {path: '/'} )
    };

  render(){
    return(
        <div className='navButton'>
          {(this.state.classes).map(numId =>
          <div>
                <button onClick={this.changeClass.bind(this, numId)}>{numId}</button>
        </div>)}
        </div>
    )
  }
}
 
export default ClassBox;
 