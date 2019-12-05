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

/*storeWeather.subscribe(() => {
  localStorage.setItem('cities', JSON.stringify([...storeWeather.getState().fav_cities.cities.keys()]));
});*/

ReactDOM.render(
<Provider store = {store}>
  <App />
</Provider>, document.getElementById('root'));

export default function getCitiesFromStorage() {
  axios
    .get('/favourites')
    .then(response => {
      const cities = response.data.map(
        city => ({
          id: city._id,
          name: city.name
        })
      );
    return cities;
    });
  }

serviceWorker.unregister();
