import reducer from '../reducers/announcementReducer';
import * as actions from '../actions/types';
import * as types from '../actions/announcementActions';
import axios from 'axios';

const initalState= {
  announcements:[],
  loading: false
}

describe('announcement reducer', () => {
  //NO ACTIONS
  it('should handle no action with no announcements', () => {
    expect(reducer(initalState, {})).toEqual(
        {
          announcements:[],
          loading: false
        }
    )
  })
  it('should handle no action with one announcements', () => {
    expect(
      reducer(
      {
        announcements:[{_id:'5ca671213eae681dad230eff',message:'tgyhr',date:'2019-04-04T21:03:29.337Z',__v:0} ],
        loading:false
      }, {}))
      .toEqual(
      {
        announcements:[{_id:'5ca671213eae681dad230eff',message:'tgyhr',date:'2019-04-04T21:03:29.337Z',__v:0} ],
        loading: false
      }
    )
  })

  // GET announcements

  it('should handle GET_ANNOUNCEMENTS with preset announcements', () => {
    expect(
      reducer(initalState,  {type:'GET_ANNOUNCEMENTS',payload:[{_id:'5ca671213eae681dad230eff',message:'tgyhr',date:'2019-04-04T21:03:29.337Z',__v:0},{_id:'5c99482779d90038e49cf3ae',message:'HI',date:'2019-03-25T21:29:11.436Z',__v:0},{_id:'5c95cfc6e04013248a619117',message:'dogs dig ',date:'2019-03-23T06:18:46.128Z',__v:0},{_id:'5c95c1bb2063b014711dc310',message:'hey',date:'2019-04-04T22:02:14.501Z'}]})
    ).toEqual({announcements:[{_id:'5ca671213eae681dad230eff',message:'tgyhr',date:'2019-04-04T21:03:29.337Z',__v:0},{_id:'5c99482779d90038e49cf3ae',message:'HI',date:'2019-03-25T21:29:11.436Z',__v:0},{_id:'5c95cfc6e04013248a619117',message:'dogs dig ',date:'2019-03-23T06:18:46.128Z',__v:0},{_id:'5c95c1bb2063b014711dc310',message:'hey',date:'2019-04-04T22:02:14.501Z'}],loading:false});
  })
  it('should handle GET_ANNOUNCEMENTS with no announcements', () => {
    expect(
      reducer(initalState,  {type:'GET_ANNOUNCEMENTS',payload:[]})
    ).toEqual(initalState);
  })

  // ADD announcements
  it('should handle ADD_ANNOUNCEMENTS with no announcements', () => {
    expect(
      reducer(initalState,  {type:'GET_ANNOUNCEMENTS',payload:[{_id:'5ca689a7d4d79a22edbb82bc',message:'dogs',date:'2019-04-04T22:48:07.985Z',__v:0}]})
    ).toEqual({announcements:[{_id:'5ca689a7d4d79a22edbb82bc',message:'dogs',date:'2019-04-04T22:48:07.985Z',__v:0}],loading:false});
  })

  it('should handle ADD_ANNOUNCEMENT with announcements', () => {
    let state;
    state = reducer({announcements:[{_id:'5ca671213eae681dad230eff',message:'tgyhr',date:'2019-04-04T21:03:29.337Z',__v:0},{_id:'5c99482779d90038e49cf3ae',message:'HI',date:'2019-03-25T21:29:11.436Z',__v:0},{_id:'5c95cfc6e04013248a619117',message:'dogs dig ',date:'2019-03-23T06:18:46.128Z',__v:0},{_id:'5c95c1bb2063b014711dc310',message:'hey',date:'2019-04-04T22:48:03.788Z'}],loading:false}, {type:'ADD_ANNOUNCEMENT',payload:{_id:'5ca689a7d4d79a22edbb82bc',message:'dogs',date:'2019-04-04T22:48:07.985Z',__v:0}});
    expect(state).toEqual({announcements:[{_id:'5ca689a7d4d79a22edbb82bc',message:'dogs',date:'2019-04-04T22:48:07.985Z',__v:0},{_id:'5ca671213eae681dad230eff',message:'tgyhr',date:'2019-04-04T21:03:29.337Z',__v:0},{_id:'5c99482779d90038e49cf3ae',message:'HI',date:'2019-03-25T21:29:11.436Z',__v:0},{_id:'5c95cfc6e04013248a619117',message:'dogs dig ',date:'2019-03-23T06:18:46.128Z',__v:0},{_id:'5c95c1bb2063b014711dc310',message:'hey',date:'2019-04-04T22:48:03.788Z'}],loading:false});
  })

  // DELETE announcement 
  it('should handle Delete_ANNOUNCEMENT with announcements', () => {
    let state;
    state = reducer({announcements:[{_id:'5ca689a7d4d79a22edbb82bc',message:'dogs',date:'2019-04-04T22:48:07.985Z',__v:0},{_id:'5ca671213eae681dad230eff',message:'tgyhr',date:'2019-04-04T21:03:29.337Z',__v:0},{_id:'5c99482779d90038e49cf3ae',message:'HI',date:'2019-03-25T21:29:11.436Z',__v:0},{_id:'5c95cfc6e04013248a619117',message:'dogs dig ',date:'2019-03-23T06:18:46.128Z',__v:0},{_id:'5c95c1bb2063b014711dc310',message:'hey',date:'2019-04-04T22:52:26.022Z'}],loading:false}, {type:'DELETE_ANNOUNCEMENT',payload:'5ca671213eae681dad230eff'});
    expect(state).toEqual({announcements:[{_id:'5ca689a7d4d79a22edbb82bc',message:'dogs',date:'2019-04-04T22:48:07.985Z',__v:0},{_id:'5c99482779d90038e49cf3ae',message:'HI',date:'2019-03-25T21:29:11.436Z',__v:0},{_id:'5c95cfc6e04013248a619117',message:'dogs dig ',date:'2019-03-23T06:18:46.128Z',__v:0},{_id:'5c95c1bb2063b014711dc310',message:'hey',date:'2019-04-04T22:52:26.022Z'}],loading:false});
  })

  

})
