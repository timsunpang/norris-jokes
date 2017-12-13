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
      filteredJokes: []
    },
    categories: {
      store: [],
      selectedCategories: []
    }
  };
  let store = configureStore(preloadedState);
  store.subscribe(() => {console.log(store.getState())});
  ReactDOM.render(<Root store={store} />, document.getElementById('root'));
  registerServiceWorker()
})
