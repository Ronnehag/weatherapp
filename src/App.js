import React, { Component } from 'react';
import SearchForm from './components/SearchForm';
import Weather from './components/Weather';
import Navbar from './components/Layout/Navbar';
import WeatherDetails from './components/WeatherDetails';

// Move to JSON?
const APIKEY = "5d1d8a019a1b42f2bd983655191203";

class App extends Component {

  static initialState = () => ({
    weatherData: [],
    storedLocations: [],
    forecastData: [],
  });
  state = App.initialState();

  // Fetches the local storage and sets the stored objects to states storedLocations
  componentDidMount() {
    const data = JSON.parse(localStorage.getItem("locations"));
    if (data !== null) {
      this.setState({
        storedLocations: data
      });
    }
  }
  // Removes the saved ID from localstorage and updates state
  removeFromLocalStorage = (id) => {
    this.setState({
      storedLocations: [...this.state.storedLocations.filter(location => location.id !== id)]
    }, () => {
      localStorage.setItem("locations", JSON.stringify(this.state.storedLocations));
    });
  }
  // Check if storage exists, appends item. Else creates it as new.
  addToLocalStorage = (name) => {
    const exists = this.state.storedLocations.find((val) => val.name === name);
    if (exists) return;
    let data = JSON.parse(localStorage.getItem("locations"));
    if (data !== null) {
      const location = {
        name: name,
        id: getRandomId()
      }
      this.setState(prevState => ({
        storedLocations: [...this.state.storedLocations, location]
      }), () => {
        localStorage.setItem("locations", JSON.stringify(this.state.storedLocations));
      });
    } else {
      this.createStorage(name);
    }
  }

  // Will be called if localstorage isn't created when component mounts
  createStorage = (name) => {
    const location = {
      name: name,
      id: getRandomId()
    }
    this.setState(prevState => ({
      storedLocations: [...prevState.storedLocations, location]
    }));
    localStorage.setItem("locations", JSON.stringify(location));
  }

  // general fetch method
  fetchData = async (url) => {
    try {
      const res = await fetch(url);
      const json = await res.json();
      return json;
    } catch (err) {
      console.log(err);
    }
  }

  // search for weather by name, will fetch 5 day forecast and current data
  searchForWeatherByName = async (name) => {
    if (name !== null) {
      const currentWeather =
        await this.fetchData(`https://api.apixu.com/v1/current.json?key=${APIKEY}&q=${name}`);
      const { forecast } =
        await this.fetchData(`https://api.apixu.com/v1/forecast.json?key=${APIKEY}&q=${name}&days=5`);
      const { forecastday } = forecast;
      this.setState({
        weatherData: currentWeather,
        forecastData: forecastday
      });
    }
  };

  render() {
    const { weatherData, storedLocations } = this.state;
    return (
      <div>
        <Navbar favoriteLocations={storedLocations} remove={this.removeFromLocalStorage} search={this.searchForWeatherByName} />
        <br /><br />
        <div className="row">
          <div className="col s8 offset-s2">
            <SearchForm searchForWeatherByName={this.searchForWeatherByName} />
          </div>
        </div>
        <div className="row">
          <div className="col s8">
            <Weather addToLocalStorage={this.addToLocalStorage} weatherData={weatherData} search={this.searchForWeatherByName} />
          </div>
        </div>
        <div className="row">
          <div className="col s12">
            <WeatherDetails forecast={this.state.forecastData} />
          </div>
        </div>
      </div>
    );
  }
}

function getRandomId() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export default App;
