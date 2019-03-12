import React, { Component } from 'react';
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import Weather from './components/Weather';


class App extends Component {

  state = {
    data: []
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

  searchForWeatherByName = (name) => {
    this.setState({
      data: `https://api.apixu.com/v1/current.json?key=5d1d8a019a1b42f2bd983655191203&q=${name}`
    })
  };

  render() {
    return (
      <div className="container">
        <Header />
        <SearchForm searchForWeatherByName={this.searchForWeatherByName} />
        <Weather data={this.state.data} />
      </div>
    );
  }
}

export default App;
