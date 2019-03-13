import React, { Component } from 'react';
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import Weather from './components/Weather';


class App extends Component {

  state = {
    weaterData: [],
  }

  fetchData = async (url) => {
    const res = await fetch(url);
    const json = await res.json();
    return json;
  }

  // Fetch current longitude / latitude
  getLocation = (cb) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(cb);
    } else {
      cb(null);
    }
  }

  searchForWeatherByName = async (name) => {
    if (name !== null) {
      const data =
        await this.fetchData(`https://api.apixu.com/v1/current.json?key=5d1d8a019a1b42f2bd983655191203&q=${name}`);
      this.setState({
        weatherData: data
      });
    }
    console.log(name, this.state.weatherData);
  };

  render() {
    return (
      <div className="container" style={mainBg}>
        <Header />
        <SearchForm searchForWeatherByName={this.searchForWeatherByName} />
        <Weather weatherData={this.state.weatherData} />
      </div>
    );
  }
}

const mainBg = {
  background: "#031196"
}

export default App;
