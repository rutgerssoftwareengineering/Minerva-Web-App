//internal forum component, renders all appropriate thread previews
import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import Cookies from 'universal-cookie';
const cookies = new Cookies();


class Forum extends Component {
  constructor(props){
    super(props)
    this.state = {
      forum: props.forumInfo, //retrieves current forum data from cookies
      query: '' //search query
    }
  }

  handleInputChange = () => {
    this.setState({
      query: this.search.value, //actively updates search query
    })
  }
  //queries database and searches titles matching query variable, then sets component state as result
  searchForum = (event) => {
    const query = this.state.query
    axios.get('http://localhost:3001/api/searchForum', {params: {title:query, class: cookies.get('currentClass')}})
     .then(res =>{
      this.setState({
        forum: res.data.data
      })
     })
     .catch(error => console.log(error));
  }

  render(){
    return(
        <div>
            {/*search box to filter forum, requeries database with new query when submitted */}
            <input
              placeholder="Search for..."
              ref={input => this.search = input} 
              onChange={this.handleInputChange}
            />
            {/*preview of query */}
            <p>{this.state.query}</p> 
            <button onClick={this.searchForum}>Search</button>
            {/*maps out each thread gathered from state, on first render its all threads, then after search it narrows it down*/}
          {Object.keys(this.state.forum).map(threadId =>
          <div key={threadId}>
          {/*individual links to each thread with variable links determined by index in total forums objec*/}
          <Link to={`/forum/${threadId}`}><button className='thread'>{this.state.forum[threadId].title}</button></Link>
            <br/>
            <br/>
        </div>)}
        </div>
    )
  }
}
 
export default Forum;
 