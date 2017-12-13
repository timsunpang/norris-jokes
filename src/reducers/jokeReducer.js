import merge from 'lodash/merge';
import {
  RECEIVE_ALL_JOKES,
  RECEIVE_RANDOM_JOKE,
  RECEIVE_FILTERED_JOKES,
} from '../actions/actions';

const defaultState = {
  store: [],
  jokes: [],
  filteredJokes: [],
  query: ''
}

// jokes should not change, should always be part of store and cached
// filters will happen whenever you choose a category or random joke
// search will apply as another filter
// On page load: fetch all jokes, then get random joke

const JokeReducer = (state = defaultState, action) => {
  switch(action.type) {
    case RECEIVE_ALL_JOKES:
      console.log(RECEIVE_ALL_JOKES);
      let jokes, jokeStore;
      console.log(state);
      if (!state.store.length) {
        jokes = action.jokes;
        jokeStore = jokes;
      } else {
        jokeStore = state.store;
        jokes = jokeStore;
      }
      return {...state, jokes, store: jokeStore};
    case RECEIVE_RANDOM_JOKE:
      console.log(RECEIVE_RANDOM_JOKE)
      return {...state, jokes: action.jokes, filteredJokes: action.jokes};
    case RECEIVE_FILTERED_JOKES:
      return {...state, filteredJokes: action.jokes, jokes: action.jokes};
    default:
      return state;
  }
}

export default JokeReducer;
