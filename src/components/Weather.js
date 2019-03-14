import React, { Component } from 'react'
import WeatherCard from './WeatherCard';
import LoadingBar from './Layout/LoadingBar';

export class Weather extends Component {

    static initialState = () => ({
        weatherData: []
    });
    state = Weather.initialState();

    addToFav = (name) => {
        this.props.addToLocalStorage(name);
    }

    // Loads the data and generate the card showing details
    loadWeatherData = () => {
        try {
            if (this.state.weatherData.length === 0) {
                return (
                    <LoadingBar />
                )
            } else {
                const { name, country } = this.state.weatherData.location;
                const { last_updated, temp_c, temp_f, is_day } = this.state.weatherData.current;
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
                        addToFav={this.addToFav}
                        isday={is_day}
                    />
                )
            }
        } catch (err) {
            return (
                <p>Couldn't fetch weather data :(</p>
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
    componentDidUpdate(prevprops) {
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
                    await fetch(`https://api.apixu.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=${latitude},${longitude}`);
                const json = await res.json();
                this.setState({ weatherData: json });
                const { name } = this.state.weatherData.location;
                this.props.search(name);
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
