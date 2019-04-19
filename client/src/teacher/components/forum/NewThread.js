//internal component to create new thread
import React, {Component} from 'react';
import axios from 'axios'
import Cookies from 'universal-cookie';
import TextField from '@material-ui/core/TextField'
const cookies = new Cookies();

class NewThread extends Component{
    constructor(props) {
        super(props)
        this.state = {
            title:"", //title of post
            post: "", //content of post
        };  
    }

    //actively updates title state from form input
    handleTitleChange = title => event => {
        this.setState({
          title: event.target.value,
        });
    };

    //actively updates post state from form input
    handlePostChange = name => event => {
        this.setState({
          post: event.target.value,
        });
    };

    //post request using component state
    postThread = () => {
        const title = this.state.title
        const post = this.state.post
        const user = (cookies.get('userId'))
        const classId = cookies.get('currentClass')
        axios.post("http://localhost:3001/api/submitThread", {
          title: title,
          posts: post,
          users: user,
          class: classId
        })
    };


    render(){
        return(
            <div style={{backgroundColor:'white'}}>
            <form>
                {/*input for title */}
                <TextField
                id="title"
                label="Title"
                value={this.state.title}
                onChange={this.handleTitleChange('title')}
                margin="normal"
                variant="filled"
                />
                <p>
                {/*input for post content */}
                <TextField
                id="post"
                label="Post"
                value={this.state.name}
                onChange={this.handlePostChange('name')}
                margin="normal"
                variant="filled"
                />
                </p>
                {/*active previews of post */}
                <p style={{color:'black'}}>{this.state.title}</p>
                <p style={{color:'black'}}>{this.state.post}</p>
            </form>

            <button onClick={this.postThread}>Post</button>
            </div>
        )   
    } 
    
}

export default NewThread;