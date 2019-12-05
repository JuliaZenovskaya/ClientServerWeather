

export function addCity(name) {
  return {
    type: 'ADD_CITY',
    payload: name
  };
}

export function deleteCity(id) {
  return {
    type: 'DELETE_CITY',
    payload: id
  };
}

export function fetchAddedCitiesSuccess(response, city) {
  return {
    type: 'FETCH_ADDED_CITY_SUCCESS',
    payload: {
      response,
      city
    }
  }
}

export function fetchAddedCitiesError(error, city) {
  return {
    type: 'FETCH_ADDED_CITY_ERROR',
    payload: {
      error,
      city
    }
  }
}

export function getWeatherByCity(city) {
 return function(dispatch) {
    fetch(`/weather?city=${city}`)
      .then(response => {
        response.json()
          .then(json => {
            if (response.ok) {
              dispatch(fetchAddedCitiesSuccess(json, city));
            } else {
              let error = json.message;
              dispatch(fetchAddedCitiesError(error, city));
            }
          });
      },
      error => dispatch(fetchAddedCitiesError(error, city)))
  }
}
