import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux'
import { history } from '../components/joke-index';

import RootReducer from '../reducers/rootReducer';

const configureStore = (preloadedState = {}) => {
  return createStore(
    RootReducer,
    preloadedState,
    applyMiddleware(thunk, routerMiddleware(history))
  )
}

export default configureStore;
