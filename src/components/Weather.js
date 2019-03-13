import React, { Component } from 'react'
import WeatherCard from './WeatherCard';
import LoadingBar from './Layout/LoadingBar';

export class Weather extends Component {

    static initialState = () => ({
        weatherData: []
    });
    state = Weather.initialState();

    showDetails = () => {
        // Show more details
    }

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
    // Fetch current longitude / latitude
    getLocation = (cb) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(cb);
        } else {
            cb(null);
        }
    }

    componentDidUpdate(prevprops, prevstate){
        if(this.props.weatherData !== prevprops.weatherData){
            this.setState({
                weatherData: this.props.weatherData
            });
        } else{
            // Do smth
        }
    }

    // Fetch API data on mount, set state to Stockholms weather
    async componentDidMount() {
        try {
            this.getLocation(async (position) => {
                const { longitude, latitude } = position.coords;
                let cordUrl = `https://api.apixu.com/v1/current.json?key=5d1d8a019a1b42f2bd983655191203&q=${latitude},${longitude}`;
                const res = await fetch(cordUrl);
                const json = await res.json();
                this.setState({ weatherData: json });
            });
        } catch (err) {
            const res = await fetch(Stockholm.API);
            const json = await res.json();
            this.setState({ weatherData: json });
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


const Stockholm = {
    API: "https://api.apixu.com/v1/current.json?key=5d1d8a019a1b42f2bd983655191203&q=Stockholm"
}
export default Weather
