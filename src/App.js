import React, { Component } from 'react';
import Header from './components/Header';
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
    location: "",
    country: "",
    localtime: "",
    lastUpdated: "",
    tempC: "",
    icon: ""
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

  // Will only be called if localstorage isn't created
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

  fetchData = async (url) => {
    const res = await fetch(url);
    const json = await res.json();
    return json;
  }

  searchForWeatherByName = async (name2) => {
    if (name2 !== null) {
      const currentWeather =
        await this.fetchData(`https://api.apixu.com/v1/current.json?key=${APIKEY}&q=${name2}`);

      // const { name, country, localtime } = currentWeather.location;
      // const { last_updated, temp_c, is_day, condition } = currentWeather.current;
      // const { text, icon } = condition;
      // console.log(name, country, localtime, last_updated, temp_c, is_day, text, icon);

      const { forecast } =
        await this.fetchData(`https://api.apixu.com/v1/forecast.json?key=${APIKEY}&q=${name2}&days=5`);
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
        <Header />
        <div className="row">
          <div className="col s8 offset-s2">
            <SearchForm searchForWeatherByName={this.searchForWeatherByName} />
          </div>
        </div>
        <div className="row">
          <div className="col s8">
            <Weather addToLocalStorage={this.addToLocalStorage} weatherData={weatherData} />
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
