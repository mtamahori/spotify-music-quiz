import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import user from './user';
import instanceScore from './instanceScore';
import tracks from './tracks';
import player from './player'

const reducer = combineReducers({ user, instanceScore, tracks, player })

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
)

const store = createStore(reducer, middleware)

export * from './user';
export * from './instanceScore';
export * from './tracks';
export * from './player';

export default store;
