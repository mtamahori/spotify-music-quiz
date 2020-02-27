const defaultScore = { correct: 0, rounds: 0 };

const UPDATE_SCORE = 'SET_SCORE';
const RESET_SCORE = 'RESET_SCORE';

export const updateScore = (score) => ({ type: UPDATE_SCORE, score })
export const resetScore = () => ({ type: RESET_SCORE })

export default function(state = defaultScore, action) {

  switch(action.type) {

    case UPDATE_SCORE:
      return action.score

    case RESET_SCORE:
      return { correct: 0, rounds: 0 };

    default:
      return state;
  }
}
