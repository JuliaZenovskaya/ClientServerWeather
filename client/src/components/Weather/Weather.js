import React from "react";
import './Weather.css';

class Weather extends React.Component {
  componentDidMount() {
    if (this.props.getWeather) {
      this.props.getWeather();
    }
  }

  render() {
    if (!this.props.weather) {
        return <div>Загрузка...</div>
    }

    return (
      <div className="weather">
      <div className="left">
        <div>{this.props.weather.name}</div>
        <img src={`https://openweathermap.org/img/wn/${this.props.weather.weather[0].icon}.png`} />
        <div>{Math.round(this.props.weather.main.temp)-273} °C</div>
        {this.props.onDelete && <button className="button" onClick={this.props.onDelete}>Удалить</button>}
      </div>
      <div className="right">
        <div className="pressure">Давление: {this.props.weather.main.pressure} hPa</div>
        <div className="humidity">Влажность: {this.props.weather.main.humidity}%</div>
        <div className="clouds">Облачность: {this.props.weather.weather[0].description}</div>
        <div className="wind">Ветер: {this.props.weather.wind.speed} м/с</div>
        <div className="coords">Координаты: [{this.props.weather.coord.lon}, {this.props.weather.coord.lat}]</div>
      </div>
      </div>
    );
  }
}

export default Weather
