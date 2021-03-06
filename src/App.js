import React, { Component } from 'react';
import SearchForm from './components/SearchForm';
import Weather from './components/Weather';
import Navbar from './components/Layout/Navbar';
import WeatherDetails from './components/WeatherDetails';

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

  // Will refetch the weather data for selected location every 15 mins (API updates every 15 min)
  startTimerForUpdate = (name) => {
    setTimeout(() => this.searchForWeatherByName(name), 1000 * 60 * 15);
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
    name = name.split(',')[0];
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
    if (name === undefined) return;
    try {
      {
        const currentWeather =
          await this.fetchData(`https://api.apixu.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=${name}`);
        const { forecast } =
          await this.fetchData(`https://api.apixu.com/v1/forecast.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=${name}&days=5`);
        const { forecastday } = forecast;
        this.setState({
          weatherData: currentWeather,
          forecastData: forecastday,
        });
      }
    } catch (err) {
      // TODO: Error handeling later
    }

  };

  render() {
    const { weatherData, storedLocations } = this.state;
    return (
      <div>
        <Navbar favoriteLocations={storedLocations} remove={this.removeFromLocalStorage} search={this.searchForWeatherByName} />
        <br /><br />
        <div className="container">
          <div className="row">
            <div className="col s12 m12 l12">
              <SearchForm searchForWeatherByName={this.searchForWeatherByName} />
            </div>
          </div>
          <div className="row">
            <div className="col s12">
              <Weather startTimer={this.startTimerForUpdate} addToLocalStorage={this.addToLocalStorage} weatherData={weatherData} search={this.searchForWeatherByName} />
            </div>
          </div>
          <div className="row">
            <div className="col s12">
              <WeatherDetails forecast={this.state.forecastData} />
            </div>
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
