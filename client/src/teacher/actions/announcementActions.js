import axios from 'axios';
import { GET_ANNOUNCEMENTS, ADD_ANNOUNCEMENT, DELETE_ANNOUNCEMENT, ANNOUNCEMENTS_LOADING,  GET_FEEDBACK, FEEDBACK_LOADING} from './types';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
export const getAnnouncements  =  () => dispatch => {
    dispatch(setAnnouncementsLoading());
    axios  
        .get('/api/announcements', {params: {class: cookies.get('currentClass')}})
        .then(res=> dispatch({
            type: GET_ANNOUNCEMENTS,
            payload: res.data 
        })) 
};

export const getFeedback =  () => dispatch => {
    dispatch(setFeedbackLoading());
    axios  
        .get('/api/feedback')
        .then(res=> dispatch({
            type: GET_FEEDBACK,
            payload: res.data 
        })) 
};

export const deleteAnnouncement = id  => dispatch => {
    axios  
        .delete(`/api/announcements/${id}`)
        .then(res=>
            dispatch({
                type: DELETE_ANNOUNCEMENT,
                payload: id
            })
        )
    
};

export const addAnnouncement = announcement  => dispatch => {
    axios  
        .post('/api/announcements', announcement)
        .then(res=>
            dispatch({
                type: ADD_ANNOUNCEMENT,
                payload: res.data
            })
        )
};

export const setAnnouncementsLoading = ()  => {
    return{
        type: ANNOUNCEMENTS_LOADING,
    };
};

export const setFeedbackLoading = ()  => {
    return{
        type: FEEDBACK_LOADING,
    };
};