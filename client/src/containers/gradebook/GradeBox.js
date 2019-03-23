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
        return(
            <div className='gradebox'>
                {(this.state.assignments).map( (assignment, index) => (
                    <>
                    <div className='grade left'> 
                        {assignment}
                    </div>
                    <div className='grade right'>
                        {this.state.grades[index]}
                    </div>
                    </>
                ))}
            </div>
            )
    }
}

export default GradeBox;