import React from 'react';
import { Route, Link, Redirect } from 'react-router-dom'
import QuizContainer from '../../containers/QuizContainer'
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const QuizIndex = ({match, quizzes}) => {
      //authentication
      if(!cookies.get('userId')){
        cookies.set('redirectPath', '/quizzes', {path: '/'} )
        return(<Redirect to='/login'/>)
      }
        const renderQuizIndex = !!quizzes && quizzes.length !== 0 ? quizzes.map((quiz, index) => <Link className="quiz-link" 
                                                                    key={index} 
                                                                    to={`/quizzes/${quiz.quizid}`}>Quiz {index+1}</Link>) : null
       
        if(!!cookies.get('quizCompleted')){
            cookies.remove('quizCompleted')
            return(
                <div>
                    <h3 className="flash-message">Quiz Answers Submitted</h3>
                    <Link className="back-button" to='/quizzes'>Back</Link>
                </div>
            )
        }
        return(
            <div> 
                <Route exact path={match.url} render={()=>(
                    renderQuizIndex
                )} />
                {quizzes.map((quiz, index) => (
                 <Route key={index} path={`${match.url}/${quiz.quizid}`}  render={(routerProps)=> <QuizContainer quizzes={quizzes} quizNum={index} />} />
                ))}
            </div>
        )
    
}
export default QuizIndex;