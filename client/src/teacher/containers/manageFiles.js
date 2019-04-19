import React, { PropTypes, Component } from 'react'
import axios from 'axios'

class manageFiles extends Component {
    constructor (props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            
        }
      }

    handleClick(e) {
        this.refs.fileUploader.click();
    }
    uploadFile(file) {
        console.log(file)
        axios.post("http://localhost:3001/api/uploadFile", {
          file: file
        })
    }

    onChangeFile(event) {
        event.stopPropagation();
        event.preventDefault();
        var file = event.target.files[0];
        this.setState({file}); /// if you want to upload later
        console.log(file)
        this.uploadFile(file)
    }
    render() {
        return (
            <div>
                <div className="navButton">
                    <i className="plus icon"></i>
                    <input type="file" id="file" ref={(ref) => this.upload = ref} style={{display: "none"}} onChange={this.onChangeFile.bind(this)}/>
                </div>
                <button
                className="navButton"
                label="Open File"
                primary={false}
                onClick={()=>{this.upload.click()}}
                />
                </div>
        )
    }
}

export default manageFiles