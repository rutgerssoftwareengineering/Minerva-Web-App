//internal forum component, renders all appropriate thread previews
import React, {Component} from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios'
import TextField from '@material-ui/core/TextField'
const cookies = new Cookies();


class RegisterClass extends Component {
  constructor(props) {
    super(props)
    this.state = {
        classId:"", //number identifier for class
        classes: cookies.get('userClasses')
    };  
}


handleInputChange = name => event => {
  this.setState({
    classId: event.target.value,
  });
};
removeClass = (classRemove) => {
  const user = (cookies.get('userId'))
  const classes = this.state.classes
  var update = false
  var Id
  classes.map((classId, index) => {
    if(classId == classRemove){
        update = true
        Id = index
    }
  })
  if(update){
  classes.splice(Id, 1)
    cookies.remove('userClasses', {path: '/'})
    cookies.set('userClasses', classes, {path: '/'})
    console.log(classes)
  axios.post("http://localhost:3001/api/removeClass", {
    id: user,
    newClasses: classes
  })
  .then(this.setState({
    classes: classes
  }))
  }
};
registerClass = () => {
  const user = (cookies.get('userId'))
  const classes = this.state.classes
  var update = true
  classes.map((classId, index) => {
    if(classId == this.state.classId){
        update = false
    }
  })
  if(update){
  classes.push(this.state.classId)
    cookies.remove('userClasses', {path: '/'})
    cookies.set('userClasses', classes, {path: '/'})
  axios.post("http://localhost:3001/api/registerClass", {
    id: user,
    newClasses: classes
  })
  .then(this.setState({
    classes: classes
  }))
  }
};

  render(){
    if(!this.props.show){
        return null;
    }

    const backdropStyle = {
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.3)',
        padding: 50
      };
  
      const modalStyle = {
        backgroundColor: '#fff',
        borderRadius: 5,
        maxWidth: 500,
        minHeight: 300,
        margin: '0 auto',
        padding: 30
      };
      const classes = this.state.classes
    return(
        <div style={backdropStyle}>
        <div style={modalStyle}>
          {classes.map(classId => 
            <div>
              <label style={{color:'black'}}>{classId}</label>
              <button onClick={this.removeClass.bind(this, classId)}>x</button>
            </div>
          )}
          <form>
                {/*input for title */}
                <TextField
                id="class"
                label="Class ID"
                value={this.state.classId}
                onChange={this.handleInputChange('class')}
                margin="normal"
                variant="filled"
                />
                {/*active previews of post */}
                <p style={{color:'black'}}>{this.state.title}</p>
                <p style={{color:'black'}}>{this.state.post}</p>
            </form>
            <button onClick={this.registerClass}>Register</button>
          <div className="footer">
            <button onClick={this.props.onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    )
  }
}
 
export default RegisterClass;
 