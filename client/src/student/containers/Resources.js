import React, { PropTypes, Component } from 'react'
import axios from 'axios'
import { saveAs } from 'file-saver';
import Fab from '@material-ui/core/Fab';
import DownloadIcon from '@material-ui/icons/SaveAlt';
import ListItem from '@material-ui/core/ListItem';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

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
      const id = event.currentTarget.id;
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
        axios.get('/getFiles')
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
            <div style={{top: '10%', position: 'fixed', left: '50%', transform: 'translate(-50%, 0)'}}>
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
                  <Fab color="secondary" aria-label="Delete" style={{marginLeft:'10px'}} onClick={this.downloadFile.bind(this)} id={file._id}>
                    <DownloadIcon />
                  </Fab>
                  </ListItem>
                  </tr>
                )
            })}
            </div>
        )
    }
}

export default Resources