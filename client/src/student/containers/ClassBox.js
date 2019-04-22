//internal forum component, renders all appropriate thread previews
import React, {Component} from 'react';
import Cookies from 'universal-cookie';
const cookies = new Cookies();


class ClassBox extends Component {
  constructor(props){
    super(props)
    this.state = {
      classes: (cookies.get('userClasses')), //retrieves current forum data from cookies
      isOpen: false
    }
  }

  changeClass = Id => {
    cookies.remove('currentClass', {path: '/'})
    cookies.set('currentClass', Id, {path: '/'} )
    };

  toggleRegister = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }
  componentDidMount() {
    this.interval = setInterval(() => this.setState({
      classes: (cookies.get('userClasses'))
    }))
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render(){
    return(
        <div>
        {this.state.classes !== undefined ?
          (this.state.classes).map(numId =>
                <button style={{display:'inline-block', margin:'7px'}} onClick={this.changeClass.bind(this, numId)}>{numId}</button>) : null}
        </div>
    )
  }
}
 
export default ClassBox;
 