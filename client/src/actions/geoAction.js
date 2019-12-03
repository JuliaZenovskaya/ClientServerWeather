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
     fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=e972dcd233bab1ebce419c370711921f`)
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
