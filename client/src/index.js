import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import './index.css';
import App from './components/App/App';
import * as serviceWorker from './serviceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import geoReducer from './reducers/geoReducer';
import сitiesReducer from './reducers/сitiesReducer';
import thunk from "redux-thunk";

const state = { cities: []};


const storeWeather = createStore (combineReducers({
geo : geoReducer,
fav_cities : сitiesReducer,
}),applyMiddleware(thunk));

/*storeWeather.subscribe(() => {
  localStorage.setItem('cities', JSON.stringify([...storeWeather.getState().fav_cities.cities.keys()]));
});*/

ReactDOM.render(
<Provider store = {storeWeather}>
  <App />
</Provider>, document.getElementById('root'));

export default function getCitiesFromStorage() {
  const localValue = localStorage.getItem('cities');
  const localStorageContent = JSON.parse(localValue);
  let cities = [];
  if (localStorageContent !== null && Array.isArray(localStorageContent)) {
    cities = localStorageContent;
  }
  return new Map(cities.map(city => [city]));
  }

serviceWorker.unregister();
