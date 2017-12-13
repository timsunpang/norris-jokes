import { combineReducers } from 'redux';

import JokeReducer from './jokeReducer';
import CategoryReducer from './categoryReducer';

const RootReducer = combineReducers({
  jokes: JokeReducer,
  categories: CategoryReducer
})

export default RootReducer;
