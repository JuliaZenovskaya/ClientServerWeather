export default function geoReducer (currentState, action) {
  let state = {
    ...currentState,
    error: false
  };
  switch (action.type) {
    case 'SET_TRUE':
    state.isloading = action.payload;
    case 'SET_COORDS':
      state.coords = action.payload;
      break;
    case 'GET_SUCCESS_RESPONSE':
      state.weather =  action.payload;
      state.isloading = false;
      break;
    case 'GET_ERROR_RESPONSE':
      state.error = action.payload;
      state.isloading = false;
      break;
    default:
      break;
  }

  return state;
}
