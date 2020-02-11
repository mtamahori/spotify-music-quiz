import axios from 'axios';
import SpotifyWebApi from 'spotify-web-api-node';

const spotifyApi = new SpotifyWebApi();

// TOKEN HELPER FUNCTION

// export const setSpotifyToken = () => {
//   return axios.get('/api/spotify/refreshToken')
//   .then(res => res.data)
//   .then(token => {
//     spotifyApi.setAccessToken(token)
//     console.log('NEW TOKEN IN SPOTIFY STORE', token)
//   })
// }
// DEFAULT

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

export const fetchTracks = () => dispatch => {
  axios
    .get('/api/spotify/getTracks')
    .then(res => {
      console.log('SERVER RESPONSE', res)
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
