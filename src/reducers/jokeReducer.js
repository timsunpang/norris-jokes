import merge from 'lodash/merge';
import {
  RECEIVE_ALL_JOKES,
  RECEIVE_JOKE,
  RECEIVE_FILTERED_JOKES,
  RECEIVE_SEARCH_MATCHES
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
      let jokes, jokeStore;
      if (!state.store.length) {
        jokes = action.jokes;
        jokeStore = jokes;
      } else {
        jokeStore = state.store;
        jokes = jokeStore;
      }
      return {...state, jokes, store: jokeStore, filteredJokes: jokeStore};
    case RECEIVE_JOKE:
      if (action.jokes) {
        return {...state, jokes: [action.jokes], filteredJokes: [action.jokes]};
      } else {
        return {...state, jokes: [], filteredJokes: []};
      }
    case RECEIVE_FILTERED_JOKES:
      return {...state, filteredJokes: action.jokes, jokes: action.jokes};
    case RECEIVE_SEARCH_MATCHES:
      return {...state, jokes: action.jokes}
    default:
      return state;
  }
}

export default JokeReducer;
