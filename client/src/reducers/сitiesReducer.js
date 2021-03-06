import { getCities } from "../components/Cities/Cities";
import axios from 'axios';

export default function citiesReducer(currentState = {cities: [], error: false}, action) {

  let state = {
    ...currentState,
    error: false
  };

  let newCities = [];

  switch (action.type) {

    case 'SOME_ERROR':
      state  = {
        ...state,
        error: action.payload
      };
      break;

    case 'GET_CITY':
      state = {
        ...state,
        cities: action.payload
      };
      break;

    case 'ADD_CITY':
    newCities = state.cities.filter(city => city.name == action.payload.name);
    console.log(newCities);
    if (newCities.length === 0) {
      newCities = [...state.cities, { id: action.payload.id, name: action.payload.name }];
      state = {
        ...state,
        cities: newCities
      };
    } else {
      axios
        .delete('favourites/' + action.payload.id);
    }
      break;

    case 'DELETE_CITY':
      newCities = state.cities.filter(city => city.id !== action.payload);
      state = {
        ...state,
        cities: newCities
      };
      break;

    case 'FETCH_ADDED_CITY_SUCCESS':
      newCities = state.cities.filter(city => city.id !== action.payload.id);
      state = {
        ...state,
        cities: newCities
      };
      newCities = [...state.cities, { id: action.payload.id, name: action.payload.city, weather: action.payload.response}];
      state = {
        ...state,
        cities: newCities
      };
      break;

    case 'FETCH_ADDED_CITY_ERROR':
      state = {
        ...state,
        error: action.payload.error
      };
      newCities = state.cities.filter(city => city.id !== action.payload.id);
      state = {
        ...state,
        cities: newCities
      };
      axios
        .delete('favourites/' + action.payload.id);
      break;

    default:
      break;
  }

  return state;
}
