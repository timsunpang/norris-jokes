import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import Root from './Root';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './store/store';

document.addEventListener('DOMContentLoaded', () => {
  let preloadedState = {
    jokes: {
      jokes: [],
      query: '',
      store: [],
      filteredJokes: [],
      isFetching: false
    },
    categories: {
      store: [],
      selectedCategories: [],
      isFetching: false
    }
  };
  let store = configureStore(preloadedState);
  ReactDOM.render(<Root store={store} />, document.getElementById('root'));
  registerServiceWorker()
})
