import React from "react";
import { connect } from "react-redux";
import Weather from '../Weather/Weather';
import axios from 'axios';
import { addCity, deleteCity, getWeatherByCity } from '../../actions/сitiesAction';
import './Cities.css';

class Cities extends React.Component {
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
                  key={entry[0]}
                  getWeather={() => this.props.getWeatherByCity(entry[0])}
                  onDelete={() => this.props.deleteCity(entry[0])}
                  weather={entry[1]}/>
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
    addCity: (name) => {
      dispatch(addCityStore(name));
    },

    deleteCity: (id) => {
      dispatch(deleteCityStore(id));
    },

    getWeatherByCity: (city) => {
      dispatch(getWeatherByCity(city));
    }
  };
}

const addCityStore = name => {
  return dispatch => {
    axios
      .post('/favourites', { name })
      .then(response => {
        const city = {
          id: response.data._id,
          name: response.data.name
        };
      dispatch(addCity(city));
    });
  };
};

const deleteCityStore = id => {
  return dispatch => {
    axios
      .delete('/favourites/${id}')
      .then(response => {
        dispatch(deleteCity(id))
      })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cities);
