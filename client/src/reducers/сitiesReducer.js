import getCitiesFromStorage from "../index";

export default function citiesReducer(currentState = {cities: getCitiesFromStorage()}, action) {
  let state = {
    ...currentState,
    error: false,
    cities: new Map(currentState.cities)
  };

  switch (action.type) {
    case 'ADD_CITY':
      if (!state.cities.has(action.payload))
        state.cities.set(action.payload);
      break;
    case 'DELETE_CITY':
      state.cities.delete(action.payload);
      break;
    case 'FETCH_ADDED_CITY_SUCCESS':
      state.cities.delete(action.payload.city);
      state.cities.set(action.payload.response.name, action.payload.response);
      break;
    case 'FETCH_ADDED_CITY_ERROR':
      state.error = action.payload.error;
      state.cities.delete(action.payload.city);
      break;
    default:
      break;
  }
  return state;
}
