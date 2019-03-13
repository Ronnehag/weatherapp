import React, { Component } from 'react'
import WeatherCard from './WeatherCard';
import LoadingBar from './Layout/LoadingBar';

export class Weather extends Component {

    static initialState = () => ({
        weatherData: []
    });
    state = Weather.initialState();

    // Loads the data and generate the card showing details
    loadWeatherData = () => {
        if (this.state.weatherData.length === 0) {
            return (
                <LoadingBar />
            )
        } else {
            const { name, country } = this.state.weatherData.location;
            const { last_updated, temp_c, temp_f } = this.state.weatherData.current;
            const { text, icon } = this.state.weatherData.current.condition;
            return (
                <WeatherCard
                    name={name}
                    country={country}
                    updated={last_updated}
                    tempC={temp_c}
                    tempF={temp_f}
                    icon={icon}
                    text={text}
                    details={this.showDetails}
                />
            )
        }
    }
    // Fetch current longitude / latitude using HTML5 geolocation
    getLocation = (cb) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(cb);
        } else {
            cb(null);
        }
    }
    // Update the card after search is invoked from App.js
    componentDidUpdate(prevprops, prevstate) {
        if (this.props.weatherData !== prevprops.weatherData) {
            this.setState({
                weatherData: this.props.weatherData
            });
        }
    }
    // Fetching the weather data from current position (lat/lon) on mounting.
    async componentDidMount() {
        try {
            this.getLocation(async (position) => {
                if (position === null) return;
                const { longitude, latitude } = position.coords;
                const res =
                    await fetch(`https://api.apixu.com/v1/current.json?key=5d1d8a019a1b42f2bd983655191203&q=${latitude},${longitude}`);
                const json = await res.json();
                this.setState({ weatherData: json });
            });
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        return (
            <section>
                {this.loadWeatherData()}
            </section>
        )
    }
}
export default Weather
