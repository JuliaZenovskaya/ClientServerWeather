import React from "react";
import Weather from "./Weather";
import renderer from "react-test-renderer";

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

describe("Weather for geolocation", () => {
  it ("Weather has loaded", () => {
    const htmlTree = renderer.create(<Weather weather={response}/>).toJSON();
    expect(htmlTree).toMatchSnapshot();
  });
  it ("Weather is loading", () => {
    const htmlTree = renderer.create(<Weather/>).toJSON();
    expect(htmlTree).toMatchSnapshot();
  });
});

describe("Weather for the city", () => {
  it ("Weather has loaded", () => {
    const htmlTree = renderer.create(<Weather
      getWeather={()=> {}}
      onDelete={()=> {}}/>).toJSON();
    expect(htmlTree).toMatchSnapshot();
  });
  it ("Weather is loading", () => {
    const htmlTree = renderer.create(<Weather
      weather={response}
      getWeather={()=> {}}
      onDelete={()=> {}}/>).toJSON();
    expect(htmlTree).toMatchSnapshot();
  });
});
