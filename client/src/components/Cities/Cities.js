import React from "react";
import { connect } from "react-redux";
import Weather from '../Weather/Weather';
import axios from 'axios';
import { getCity, addCity, deleteCity, getWeatherByCity } from '../../actions/сitiesAction';
import getCitiesFromStorage from '../../index';
import './Cities.css';

class Cities extends React.Component {

componentDidMount(){
  this.props.getCity();
}

  render() {
    return (
      <div>
      <div>
        <div className="fav_cities">Избранное</div>
        <form onSubmit={(e) => this.addNewCity(e)}>
          <input className="city_input" type="text" name="city" required />
          <input className="city_button" type="submit" value="Добавить"/>
        </form>
      </div >
        {this.props.error && <div className="error">Error: {this.props.error}</div>}

        <div  className="weather">
                  {
                    [...this.props.cities.entries()].map((entry) => {
                      return (
                        <Weather
                        weather={entry[1].weather}
                        key={entry[1].id}
                        getWeather={() => this.props.getWeatherByCity(entry[1].id, entry[1].name)}
                        onDelete={() => this.props.deleteCity(entry[1].id)} />
                      );
                    })
                  }
                </div>

      </div>
    );
  }

  addNewCity(e) {
    e.preventDefault();
    this.props.addCity(e.currentTarget.elements.city.value);
  }
}


function mapStateToProps(state) {
  return {
    cities: state.fav_cities.cities,
    error: state.fav_cities.error
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getCity: () => {
      dispatch(getCities());
    },

    addCity: (name) => {
      dispatch(addCityStore(name));
    },

    deleteCity: (id) => {
      dispatch(deleteCityStore(id));
    },

    getWeatherByCity: (id, name) => {
      dispatch(getWeatherByCity(id, name));
    }
  };
}

const addCityStore = name => {
  return dispatch => {
    axios
      .post('favourites', { name })
      .then(response => {
        console.log(response.data.newCity);
        dispatch(addCity(response.data.newCity._id, response.data.newCity.name));
    });
  };
};

const deleteCityStore = id => {
  return dispatch => {
    axios
      .delete('favourites/' + id)
      .then(response => {
        dispatch(deleteCity(id))
      })
  }
}

const getCities = () => {
  return dispatch => {
    axios
      .get('favourites')
      .then(response => {
        const cities = response.data.map(city => ({ id: city._id, name: city.name }));
        dispatch(getCity(cities));
      })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cities);
