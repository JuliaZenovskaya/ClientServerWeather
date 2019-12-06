import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import './index.css';
import App from './components/App/App';
import axios from 'axios';
import * as serviceWorker from './serviceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import geoReducer from './reducers/geoReducer';
import сitiesReducer from './reducers/сitiesReducer';
import thunk from "redux-thunk";

const store = createStore (combineReducers({
  geo : geoReducer,
  fav_cities : сitiesReducer,
}),applyMiddleware(thunk));

ReactDOM.render(
<Provider store = {store}>
  <App />
</Provider>, document.getElementById('root'));

serviceWorker.unregister();
