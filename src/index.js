import React from 'react';
import ReactDOM from 'react-dom'
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { logger } from 'redux-logger';
import reducer from './reducers';
import App from './components/App';
import Customer from './components/CustomerList';

import rootSaga from './sagas';
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware, logger),
);
sagaMiddleware.run(rootSaga);
const routing = (
  <Provider store={store}>
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/customer">Customer</Link>
          </li>
        </ul>
        <Route exact path="/" component={App} />
        <Route path="/customer" component={Customer} />
      </div>
    </Router>
  </Provider>

)
ReactDOM.render(
  routing,
  document.getElementById('root')
)