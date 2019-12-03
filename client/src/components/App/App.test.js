import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import renderer from "react-test-renderer";
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux'
import thunk from "redux-thunk";

const tempStore = configureMockStore([thunk]);
const response = {
    "coord":{"lon":37.62,"lat":55.75},
    "weather":[{"id":701,"main":"Mist","description":"mist","icon":"50n"}],
    "base":"stations",
    "main":{"temp":4.38,"pressure":1015,"humidity":100,"temp_min":2,"temp_max":5.56},
    "visibility":3000,
    "wind":{"speed":4,"deg":90},
    "clouds":{"all":90},
    "dt":1573170827,
    "sys":{"type":1,"id":9027,"country":"RU","sunrise":1573188558,"sunset":1573220232},
    "timezone":10800,
    "id":524901,
    "name":"Moscow",
    "cod":200
  };

describe("Weather in displaying with favourite cities", () => {
  it("Weather exists and is not loading", () => {
    let cities = new Map([["Moscow", response]]);
    const store = tempStore({
      geo: {
        weather: response,
        isloading: false
        },
      fav_cities: {
        cities: cities
      }
    });

    const htmlTree = renderer.create(
      <Provider store={store}>
        <App/>
     </Provider>).toJSON();
    expect(htmlTree).toMatchSnapshot();
  });

  it("Weather exists but is loading", () => {
    let cities = new Map([["Moscow", response]]);
    const store = tempStore({
      geo: {
        weather: response,
        isloading: true
        },
      fav_cities: {
        cities: cities
      }
    });

    const htmlTree = renderer.create(
      <Provider store={store}>
        <App/>
     </Provider>).toJSON();
    expect(htmlTree).toMatchSnapshot();
  });

  it("Weather is not exists and is loading", () => {
    let cities = new Map([["Moscow", response]]);
    const store = tempStore({
      geo: {
        isloading: true
        },
      fav_cities: {
        cities: cities
      }
    });

    const htmlTree = renderer.create(
      <Provider store={store}>
        <App/>
     </Provider>).toJSON();
    expect(htmlTree).toMatchSnapshot();
  });

  it("Some error with displaying weather", () => {
    let cities = new Map([["Moscow", response]]);
    const store = tempStore({
      geo: {
        error: 'error'
        },
      fav_cities: {
        cities: cities
      }
    });

    const htmlTree = renderer.create(
      <Provider store={store}>
        <App/>
     </Provider>).toJSON();
    expect(htmlTree).toMatchSnapshot();
  });
});

describe("Weather in displaying without favourite cities", () => {
  it("Weather exists and is not loading", () => {
    let cities = new Map();
    const store = tempStore({
      geo: {
        weather: response,
        isloading: false
        },
      fav_cities: {
        cities: cities
      }
    });

    const htmlTree = renderer.create(
      <Provider store={store}>
        <App/>
     </Provider>).toJSON();
    expect(htmlTree).toMatchSnapshot();
  });

  it("Weather exists but is loading", () => {
    let cities = new Map();
    const store = tempStore({
      geo: {
        weather: response,
        isloading: true
        },
      fav_cities: {
        cities: cities
      }
    });

    const htmlTree = renderer.create(
      <Provider store={store}>
        <App/>
     </Provider>).toJSON();
    expect(htmlTree).toMatchSnapshot();
  });

  it("Weather is not exists and is loading", () => {
    let cities = new Map();
    const store = tempStore({
      geo: {
        isloading: true
        },
      fav_cities: {
        cities: cities
      }
    });

    const htmlTree = renderer.create(
      <Provider store={store}>
        <App/>
     </Provider>).toJSON();
    expect(htmlTree).toMatchSnapshot();
  });

  it("Some error with displaying weather", () => {
    let cities = new Map();
    const store = tempStore({
      geo: {
        error: 'error'
        },
      fav_cities: {
        cities: cities
      }
    });

    const htmlTree = renderer.create(
      <Provider store={store}>
        <App/>
     </Provider>).toJSON();
    expect(htmlTree).toMatchSnapshot();
  });
});
