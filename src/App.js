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
    this.getLocalStorage();
  }

  // Fetches favorite locations from localstorage, adds it to App state
  getLocalStorage = () => {
    const data = JSON.parse(localStorage.getItem("locations"));
    if (data !== null) {
      console.log(data);
      this.setState({
        storedLocations: [...this.state.storedLocations, data]
      });
    }
  }
  // Check if storage exists, appends item. Else creates it as new.
  addToLocalStorage = (name) => {
    let data = JSON.parse(localStorage.getItem("locations"));
    if (data !== null) {
      const location = {
        name: name
      }
      this.setState(prevState => ({
        storedLocations: [...prevState.storedLocations, location]
      }));
      localStorage.setItem("locations", JSON.stringify(this.state.storedLocations));
    } else {
      this.createStorage(name);
    }
  }

  createStorage = (name) => {
    const location = {
      name: name
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
            <FavoriteLocations locations={storedLocations} />
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
