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

    // Loading weather data from current state, passing down the props to 
    // WeatherCard to render the main weather card.
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
                <p>Ops! Couldn't fetch weather data :(</p>
            )
        }
    }

    // Fetch current longitude / latitude using HTML5 geolocation, callbacks the value
    getLocation = (cb) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(cb);
        } else {
            cb(null);
        }
    }

    // Update the card after search is invoked from App.js, passes the name back up to start timer
    // checks if the prev props isn't the same as this props, sets the state and callbacks
    // the timeout from app.js to restart with the current name
    componentDidUpdate(prevprops) {
        if (this.props.weatherData !== prevprops.weatherData) {
            this.setState({
                weatherData: this.props.weatherData
            }, () => this.props.startTimer(this.state.weatherData.location.name));
        }
    }

    // Fetching the weather data from current position (longitude/latitude) on mounting.
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
            // If user hasn't accepted HTML5 geolocations, call the API to get Stockholms weather instead.
            const res = await fetch(`https://api.apixu.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=Stockholm`);
            const json = await res.json();
            this.setState({ weatherData: json });
            const { name } = this.state.weatherData.location;
            this.props.search(name);
        }
    }

    render() {
        return (
            <div className="row">
                <div className="col s12">
                    {this.loadWeatherData()}
                </div>
            </div>

        )
    }
}
export default Weather
