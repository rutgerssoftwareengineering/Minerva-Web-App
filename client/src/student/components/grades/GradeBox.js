//internal component to render individual classes grades
import React, { Component } from 'react';

class GradeBox extends Component{
    constructor(props){
        super(props)
        this.state = {
            grades: this.props.grades,
            assignments: this.props.assignments
        }
    }
    render(){
        //renders the individual class boxes that display grades
        return(
            <div className='gradebox'>
                {(this.state.assignments).map( (assignment, index) => (
                    <div key={index}>
                    <div className='grade left'> 
                        {assignment}
                    </div>
                    <div className='grade right'>
                        {this.state.grades[index]}
                    </div>
                    </div>
                ))}
            </div>
            )
    }
}

export default GradeBox;