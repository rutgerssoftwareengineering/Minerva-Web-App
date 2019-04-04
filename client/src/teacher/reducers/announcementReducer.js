import { GET_ANNOUNCEMENTS, ADD_ANNOUNCEMENT, DELETE_ANNOUNCEMENT, ANNOUNCEMENTS_LOADING} from '../actions/types';
//import { allResolved } from 'q';
const initalState= {
    announcements:[],
    loading: false
}

export default function (state= initalState, action) {
   
    switch(action.type){
        case GET_ANNOUNCEMENTS:
            return {
                ...state,
                announcements: action.payload,
                loading: false
            }
        case DELETE_ANNOUNCEMENT:
            return {
                ...state,
                announcements: state.announcements.filter( announcement => announcement._id !== action.payload)
            };
        case ADD_ANNOUNCEMENT:
            return {
                ...state,
                announcements: [action.payload, ...state.announcements]
            };
        case ANNOUNCEMENTS_LOADING:
            return {
                ...state,
                loading: true
            };
        default:
            return state;

    }
}