import axios from 'axios';

const defaultTracks = [];

// ACTION TYPES

const GET_TRACKS = 'GET_TRACKS';
const DELETE_TRACKS = 'DELETE_TRACKS';

// ACTION CREATORS

const getTracks = (tracks) => ({ type: GET_TRACKS, tracks })
const deleteTracks = () => ({ type: DELETE_TRACKS })

//THUNKS

export const fetchTracks = (endpoint) => dispatch => {
  axios
    .get(`/api/spotify/${endpoint}`)
    .then(res => {
      dispatch(getTracks(res.data))
    })
    .catch(err => console.error('Fetching songs unsuccessful', err))
}

export const removeTracks = () => dispatch => {
  dispatch(deleteTracks())
}

// REDUCER

export default function(state = defaultTracks, action) {

  switch(action.type) {

    case GET_TRACKS:
      return state.tracks ? [...state, ...action.tracks] : action.tracks;

    case DELETE_TRACKS:
      return defaultTracks

    default:
      return state
  }
}
