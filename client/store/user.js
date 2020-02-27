import axios from 'axios';
import history from '../history';

// INITIAL STATE

const defaultUser = {};

// ACTION TYPES

const GET_USER = 'GET_USER';
const EDIT_USER = 'EDIT_USER';
const REMOVE_USER = 'REMOVE_USER';

// ACTION CREATORS

const getUser = user => ({ type: GET_USER, user })
const editUser = user => ({ type: EDIT_USER, user })
const removeUser = () => ({ type: REMOVE_USER })

// THUNKS

export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser ))
  } catch (err) {
    console.error(err)
  }
}

export const updateUser = (user) => dispatch => {
  axios
    .put(`/api/user/${user.id}`, user)
    .then(res => dispatch(editUser(res.data)))
    .catch(err => console.error('Updating user info unsuccessful', err))
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

// REDUCER

export default function(state = defaultUser, action) {
  switch (action.type) {

    case GET_USER:
      return action.user

    case EDIT_USER:
      return action.user

    case REMOVE_USER:
      return defaultUser

    default:
      return state

  }
}
