export function setCoords(coords) {
  return {
    type: 'SET_COORDS',
    payload: coords
  }
}

export function getSuccessResponse(response) {
  return {
    type: 'GET_SUCCESS_RESPONSE',
    payload: response
  }
}

export function getErrorResponse(error) {
  return {
    type: 'GET_ERROR_RESPONSE',
    payload: error
  }
}

export function setTrue(tr){
  return {
    type: 'SET_TRUE',
    payload: tr
  }
}

export function getWeatherByCoords(coords) {
  return function(dispatch) {
     fetch(`/weather/coordinates?lat=${coords.lat}&long=${coords.lon}`)
       .then(response => {
         response.json()
           .then(json => {
             if (response.ok) {
               dispatch(getSuccessResponse(json));
             } else {
               let error = json.message;
               dispatch(getErrorResponse(error));
             }
           });
       },
       error => dispatch(getErrorResponse(error)))
   }
}
