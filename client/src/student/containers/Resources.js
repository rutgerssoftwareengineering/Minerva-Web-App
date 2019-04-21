import React, { PropTypes, Component } from 'react'
import axios from 'axios'
import { saveAs } from 'file-saver';

class Resources extends Component {
    constructor (props) {
        super(props);
        this.state = {
            files: props.files,
            file: '',
            fileDownloading: false
        }
        this.getFiles = this.getFiles.bind(this);
        console.log(props.files)
    }

    componentWillMount() {
        this.getFiles();
    }

    downloadFile(event) {
      event.preventDefault();
      const id = event.target.id;
      axios({
        method: "GET",
        url: "/api/downloadFile/"+id,
        responseType: "blob"
      })
    .then(
        res => {
            console.log(res.data)
            this.setState({ fileDownloading: true }, () => {
            saveAs(res.data, res.headers.filename);
        });
    })
    .then(() => {
        this.setState({ fileDownloading: false });
        console.log("Completed");
      });
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

    render() {
        const files = this.state.files;
        return (
            <div>
            {files.map((file, index) => {
                var date = new Date(file.uploadDate);
                return (
                    <tr key={index} style={{position: 'relative', left: '100%' }}>
                    <td><a href={`http://localhost:3001/api/files/${file.filename}`} style={{color:'rgba(123, 230, 96, 0.692)'}}>{file.filename}</a></td>
                    <td>{`${date.toLocaleDateString()} ${date.toLocaleTimeString()}`}</td>
                    <td>{(Math.round(file.length/100) / 10)+'KB'}</td>
                    <td><button onClick={this.downloadFile.bind(this)} id={file._id}>download</button></td>
                    </tr>
                )
            })}
            </div>
        )
    }
}

export default Resources