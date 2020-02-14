import axios from 'axios';

const defaultTracks = {};

// ACTION TYPES

const GET_TRACKS = 'GET_TRACKS';
const UPDATE_TRACKS = 'UPDATE_TRACKS';
const REMOVE_TRACKS = 'REMOVE_TRACKS';

// ACTION CREATORS

const getTracks = (tracks) => ({ type: GET_TRACKS, tracks })
const updateTracks = (tracks) => ({ type: UPDATE_TRACKS, tracks })
const removeTracks = () => ({ type: REMOVE_TRACKS })

//THUNKS

export const fetchTracks = (endpoint) => dispatch => {
  axios
    .get(`/api/spotify/${endpoint}`)
    .then(res => {
      console.log('RES.DATA', res.data)
      dispatch(getTracks(res.data))
    })
    .catch(err => console.error('Fetching songs unsuccessful', err))
}

// REDUCER

export default function(state = defaultTracks, action) {

  switch(action.type) {

    case GET_TRACKS:
      return action.tracks

    case UPDATE_TRACKS:
      return action.tracks

    case REMOVE_TRACKS:
      return defaultTracks

    default:
      return state
  }
}
