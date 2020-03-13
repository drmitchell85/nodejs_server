import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'; // React and Redux coordinator tag
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';

// 7.70: create a redux store instance
// include all of the reducers we will be using
// pass in reduxThunk into middleware call
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

// 7.70: Provider tag hooks up Redux store to React
ReactDOM.render(
    // React component 'Provider' uses Redux store with the App component as a child
    // Provider tag can read store and informs child (App)
    <Provider store={store}><App /></Provider>,
    document.querySelector('#root')
);