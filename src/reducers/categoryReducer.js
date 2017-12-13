import merge from 'lodash/merge';
import {
  RECEIVE_JOKE_CATEGORIES
} from '../actions/actions';

const defaultState = {
  store: [],
  selectedCategories: []
}

const CategoryReducer = (state = defaultState, action) => {
  Object.freeze(state);
  let newState = merge({}, state);

  switch(action.type) {
    case RECEIVE_JOKE_CATEGORIES:
      console.log("STATE: ", state)
      let categories, store;
      if (!state.store.length) {
        categories = action.categories;
        store = categories;
      } else {
        store = state.store;
        categories = store;
      }
      console.log(RECEIVE_JOKE_CATEGORIES, action.categories)
      return {...state, store};
    default:
      return state;
  }
}

export default CategoryReducer;
