export function addCity(city) {
  return {
    type: 'ADD_CITY',
    payload: city
  };
}

export function deleteCity(city) {
  return {
    type: 'DELETE_CITY',
    payload: city
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
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e972dcd233bab1ebce419c370711921f`)
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
