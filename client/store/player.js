import axios from 'axios';

const defaultPlayer = {};

const GET_PLAYER = 'GET_PLAYER';
const SET_PLAYER = 'SET_PLAYER';
const RESET_PLAYER = 'RESET_PLAYER';

const getPlayer = () => ({ type: GET_PLAYER })
const setPlayer = (player) => ({ type: SET_PLAYER , player })
const resetPlayer = () => ({ type: RESET_PLAYER })

export const fetchPlayer = () => dispatch => {
  dispatch(getPlayer())
}
export const addPlayer = (player) => dispatch => {
  dispatch(setPlayer(player))
}

export const removePlayer = () => dispatch => {
  dispatch(resetPlayer())
}

export default function(state = defaultPlayer, action) {

  switch (action.type) {

    case SET_PLAYER:
      return action.player

    case GET_PLAYER:
      return action.player

    case RESET_PLAYER:
      return defaultPlayer

    default:
      return state;
  }
}
