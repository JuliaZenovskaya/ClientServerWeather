

export function addCity(id, name) {
  return {
    type: 'ADD_CITY',
    payload: {
      id,
      name
    }
  };
}

export function deleteCity(id) {
  return {
    type: 'DELETE_CITY',
    payload: id
  };
}

export function getCity(cities) {
  return {
    type: 'GET_CITY',
    payload: cities
  }
}

export function fetchAddedCitiesSuccess(response, id, city) {
  return {
    type: 'FETCH_ADDED_CITY_SUCCESS',
    payload: {
      response,
      id,
      city
    }
  }
}

export function fetchAddedCitiesError(error, id) {
  return {
    type: 'FETCH_ADDED_CITY_ERROR',
    payload: {
      error,
      id
    }
  }
}

export function getWeatherByCity(id, name) {
 return function(dispatch) {
    fetch(`/weather?city=` + name)
      .then(response => {
        response.json()
          .then(json => {
            if (response.ok) {
              dispatch(fetchAddedCitiesSuccess(json, id, name));
            } else {
              let error = json.message;
              dispatch(fetchAddedCitiesError(error, id));
            }
          });
      },
      error => dispatch(fetchAddedCitiesError(error, id)))
  }
}
