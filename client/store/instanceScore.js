const defaultScore = {};

const GET_SCORE = 'GET_SCORE';
const UPDATE_SCORE = 'SET_SCORE';
const RESET_SCORE = 'RESET_SCORE';

export const getScore = () => ({ type: GET_SCORE })
export const updateScore = (score) => ({ type: UPDATE_SCORE, score })
export const resetScore = () => ({ type: RESET_SCORE })

export default function(state = defaultScore, action) {

  switch(action.type) {

    case GET_SCORE:
      return state;

    case UPDATE_SCORE:
      return action.score

    case RESET_SCORE:
      return defaultScore;

    default:
      return state;
  }
}
