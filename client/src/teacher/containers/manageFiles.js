import React, { PropTypes, Component } from 'react'
import axios from 'axios'
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';
import ListItem from '@material-ui/core/ListItem';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

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
      event.preventDefault()
      const id = event.currentTarget.id;
      console.log(id)
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
                  <ListItem  alignItems="flex-start" >
                  <Card style = {{ minWidth: 400,}}>
                      <CardContent style={{color : "black"}}>
                      <i style={{color:'black'}}>{file.filename}</i>&nbsp;&nbsp;&nbsp;
                    {`${date.toLocaleDateString()} ${date.toLocaleTimeString()}`}&nbsp;&nbsp;&nbsp;
                    {(Math.round(file.length/100) / 10)+'KB'}
                      </CardContent>
                  </Card>
                  <Fab color="secondary" aria-label="Delete" style={{marginLeft:'10px'}} onClick={this.deleteFile.bind(this)} id={file._id}>
                    <DeleteIcon />
                  </Fab>
                  </ListItem>
                  </tr>
                )})}
                </div>
        )
    }
}

export default (ManageFiles)