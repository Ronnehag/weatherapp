import React, { Component } from 'react';
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import WeatherCard from './components/WeatherCard';


class App extends Component {
  render() {
    return (
      <div className="container">
        <Header />
        <SearchForm />
        <WeatherCard />
      </div>
    );
  }
}

export default App;
