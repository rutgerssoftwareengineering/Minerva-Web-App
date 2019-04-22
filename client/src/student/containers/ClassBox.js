//internal forum component, renders all appropriate thread previews
import React, {Component} from 'react';
import Cookies from 'universal-cookie';
import history from '../../History'
import Button from '@material-ui/core/Button'
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
    history.push('/home')
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
            {if(numId === cookies.get('currentClass')){
              return(
              <Button variant='contained' style={{display:'inline-block', margin:'7px', backgroundColor:'rgb(212, 212, 216)', margin:'10px'}} onClick={this.changeClass.bind(this, numId)}>{numId}</Button>
              )}else {
                return(
              <Button variant='contained' style={{display:'inline-block', margin:'7px', backgroundColor:'rgb(170, 170, 170)', margin:'10px'}} onClick={this.changeClass.bind(this, numId)}>{numId}</Button>
                )}}
            ) : null}
        </div>
    )
  }
}
 
export default ClassBox;
 