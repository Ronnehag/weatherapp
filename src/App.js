import React, { Component } from 'react';
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import Weather from './components/Weather';
import FavoriteLocations from './components/FavoriteLocations';

// Move to JSON?
const APIKEY = "5d1d8a019a1b42f2bd983655191203";


class App extends Component {

  static initialState = () => ({
    weatherData: [],
    storedLocations: []
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
        id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
      }
      console.log(location);
      this.setState(prevState => ({
        storedLocations: [...this.state.storedLocations, location]
      }), () => {
        localStorage.setItem("locations", JSON.stringify(this.state.storedLocations));
      });
    } else {
      this.createStorage(name);
    }
  }

  createStorage = (name) => {
    const location = {
      name: name,
      id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
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

  searchForWeatherByName = async (name) => {
    if (name !== null) {
      const data =
        await this.fetchData(`https://api.apixu.com/v1/current.json?key=${APIKEY}&q=${name}`);
      this.setState({
        weatherData: data
      });
    }
  };

  render() {
    const { weatherData, storedLocations } = this.state;

    return (
      <div className="container" style={mainBg}>
        <Header />
        <SearchForm searchForWeatherByName={this.searchForWeatherByName} />
        <div className="row">
          <div className="col s8">
            <Weather addToLocalStorage={this.addToLocalStorage} weatherData={weatherData} />
          </div>
          <div className="col s4">
            <FavoriteLocations locations={storedLocations} remove={this.removeFromLocalStorage} searchWeather={this.searchForWeatherByName} />
          </div>
        </div>
      </div>
    );
  }
}

const mainBg = {
  background: "#031196"
}

export default App;
