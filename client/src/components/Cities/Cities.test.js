import React from "react";
import Cities from "./Cities";
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

describe("Correct display for cities", () => {
  it("There aren't any cities in the store", () => {
    let cities = new Map();
      const store = tempStore({
        fav_cities: {
          cities: cities
          }
        });

      const htmlTree = renderer.create(
        <Provider store={store}>
          <Cities/>
       </Provider>).toJSON();
      expect(htmlTree).toMatchSnapshot();
  });

  it("There are some cities in the store", () => {
    let cities = new Map([["Moscow", response]]);
      const store = tempStore({
        fav_cities: {
              cities: cities
          }
        });

      const htmlTree = renderer.create(
        <Provider store={store}>
          <Cities/>
       </Provider>).toJSON();
      expect(htmlTree).toMatchSnapshot();
  });
});

describe("Some error with displaying cities", () => {
  it("There aren't any cities in the store", () => {
    let cities = new Map();
      const store = tempStore({
        fav_cities: {
          cities: cities,
          error: 'error'
          }
        });

      const htmlTree = renderer.create(
        <Provider store={store}>
          <Cities/>
       </Provider>).toJSON();
      expect(htmlTree).toMatchSnapshot();
  });

  it("There are some cities in the store", () => {
    let cities = new Map([["Moscow", response], ["AnotherMoscow", response]]);
      const store = tempStore({
        fav_cities: {
          cities: cities,
          error: 'error'
          }
        });

      const htmlTree = renderer.create(
        <Provider store={store}>
          <Cities/>
       </Provider>).toJSON();
      expect(htmlTree).toMatchSnapshot();
  });})
