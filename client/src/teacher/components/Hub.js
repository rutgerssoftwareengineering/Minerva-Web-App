import React, {Component} from 'react';
import Feedback from '../hub_components/Feedback';
import AdministerQuizComponent from '../hub_components/AdministerQuizComponent';
import Grid from '@material-ui/core/Grid';
import axios from 'axios'
import Cookies from 'universal-cookie';
const cookies = new Cookies();


class Hub extends Component {
    constructor(props){
        super(props)
        this.state = {
            className: cookies.get('currentClass')
        }
    }

    componentDidMount(){
        console.log("hub mounted");
        this.setThisClassInSession();
        this.getClassData();
    }


    // sets all other classes in db insession to false and sets this class to true
    setThisClassInSession = () => {
        axios.post("http://localhost:3001/api/setAllClassInSession", {
            inSession: false
        })
        .then(() =>{
            axios.post("http://localhost:3001/api/setClassInSession", {
                classId: cookies.get('currentClass'),
                inSession: true
            })
        })
    }

    getClassData = () => {
        axios.get('http://localhost:3001/api/getClassData', {params: {
                classId: cookies.get('currentClass')}})
            .then(res => {
                console.log("getting response data", res.data.data[0].name)
                this.setState({
                    className: res.data.data[0].name
                });
            })
    }

    

    render(){
        return(
            <div>
                    <h1>Teacher Hub</h1>
                    <h1>Teacher Hub</h1>
                    <br/>
                    <label>
                        Class: {this.state.className}
                    </label>
                    <br/>
                    <Grid 
                        container
                        justify="center"
                        alignItems="center"
                        spacing={24}
                        item
                    >
                        <Grid item xs>
                        <AdministerQuizComponent/>
                        </Grid>
                        <Grid item xs>
                        <Feedback/>
                        </Grid>
                    </Grid>
            </div>

        )
    } 
  
}
export default Hub;