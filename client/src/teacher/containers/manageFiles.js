import React, { PropTypes, Component } from 'react'
import axios from 'axios'

class ManageFiles extends Component {
    constructor (props) {
        super(props);
        this.state = {
            files: props.files,
            file: ''
        }
        this.getFiles = this.getFiles.bind(this);
    }

    componentWillMount() {
        this.getFiles();
    }

    deleteFile(event) {
      event.preventDefault();
      const id = event.target.id;
  
      fetch('/api/deleteFile/'+id, {
        method: 'DELETE'
      }).then(res => res.json())
        .then(response => {
          console.log(response);
          if (response.success) this.getFiles()
          else alert('Delete Failed');
        })
    }

    getFiles() {
        fetch('/api/getFiles')
          .then(res => res.json())
          .then(files => {
            if (files.message) {
              console.log('No Files');
              this.setState({ files: [] })
            } else {
              this.setState({ files: files})
            }
          });
    }

    fileChanged(event) {
        const file = event.target.files[0];
        this.setState({
          file: file
        });
      }

    uploadFile(event) {
        event.preventDefault();
        let data = new FormData();
        data.append('file', this.state.file);
    
       fetch('/api/upload', {method: 'POST', body: data})
       .then(res => res.json())
        .then(data => {
            if (data.success) {
                this.getFiles();
            } else {
                alert('Upload failed');
            }
        });
    }

    render() {
        const files = this.state.files;
        return (
            <div style={{top: '10%', position: 'fixed', left: '50%', transform: 'translate(-50%, 0)'}}>
          <div>
            <input type="file" onChange={this.fileChanged.bind(this)}/>
          </div>
          <button onClick={this.uploadFile.bind(this)}>Upload</button>
            {files.map((file, index) => {
                var date = new Date(file.uploadDate);
                return (
                    <tr key={index}>
                    <td><a href={`http://localhost:3001/api/files/${file.filename}`} style={{color:'rgba(123, 230, 96, 0.692)'}}>{file.filename}</a></td>
                    <td>{`${date.toLocaleDateString()} ${date.toLocaleTimeString()}`}</td>
                    <td>{(Math.round(file.length/100) / 10)+'KB'}</td>
                    <td><button onClick={this.deleteFile.bind(this)} id={file._id}>Remove</button></td>
                    </tr>
                )
            })}
            </div>
        )
    }
}

export default (ManageFiles)