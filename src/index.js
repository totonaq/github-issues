import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import Issues from './Issues';
import IssuesApp from './reducers'

const middleware = [ thunk ];
const store = createStore(
	IssuesApp,
	applyMiddleware(...middleware)
)

ReactDOM.render(
  <Provider store={store}>
	  <Issues />
  </Provider>,
  document.getElementById('root')
)
