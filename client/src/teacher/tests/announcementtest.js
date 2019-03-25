import announcementReducer from '../reducers/announcementReducer'
import  * as types from '../actions/types'

describe('announcement reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual([
        {
            announcements:[],
            loading: false
        }
    ])
  })

  it('should handle GET_ANNOUNCEMENTS', () => {
    expect(
      reducer([], {
        type: types.GET_ANNOUNCEMENTS,
      })
    ).toEqual([
      {
        
      }
    ])

    expect(
      reducer(
        [
          {
            text: 'Use Redux',
            completed: false,
            id: 0
          }
        ],
        {
          type: types.ADD_TODO,
          text: 'Run the tests'
        }
      )
    ).toEqual([
      {
        text: 'Run the tests',
        completed: false,
        id: 1
      },
      {
        text: 'Use Redux',
        completed: false,
        id: 0
      }
    ])
  })
})