import React, { Component } from 'react';
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import Weather from './components/Weather';


class App extends Component {


  searchForWeatherByName = (name) => {
    console.log(name);
  };

  render() {
    return (
      <div className="container">
        <Header />
        <SearchForm searchForWeatherByName={this.searchForWeatherByName}/>
        <Weather />
      </div>
    );
  }
}

export default App;
