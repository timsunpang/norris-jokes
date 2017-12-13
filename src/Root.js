import React from 'react';
import { Provider } from 'react-redux';
// import { ConnectedRouter } from 'react-router-redux';
// import createHistory from 'history/createBrowserHistory'

import App from './App';

// const history = createHistory()

const Root = ({store}) => (
  <Provider store={store}>
      <App />
  </Provider>
);

export default Root;
// export { history, Root }
