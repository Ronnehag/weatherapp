import React, { Component } from 'react'
import Card from './Card';

export class WeatherCard extends Component {

    static initialState = () => ({
        data: []
    });
    state = WeatherCard.initialState();

    showDetails = () => {

    }

    // Loads the data and generate the card
    loadWeatherData = () => {
        if (this.state.data.length === 0) {
            return (
                <h6>Loading data...</h6>
            )
        } else {
            const { name, country } = this.state.data.location;
            const { last_updated, temp_c, temp_f } = this.state.data.current;
            const { text, icon } = this.state.data.current.condition;
            return (
                <Card
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
    // Fetch API data on mount, set state to Stockholms weather
    async componentDidMount() {
        try {
            this.getLocation(async (position) => {
                const { longitude, latitude } = position.coords;
                let cordUrl = `https://api.apixu.com/v1/current.json?key=5d1d8a019a1b42f2bd983655191203&q=${latitude},${longitude}`;
                const res = await fetch(cordUrl);
                const json = await res.json();
                this.setState({ data: json });
            });

        } catch (err) {
            console.log(err);
            const res = await fetch(Stockholm.API);
            const json = await res.json();
            this.setState({ data: json });
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
// Search longitude/latitude
//https://api.apixu.com/v1/current.json?key=5d1d8a019a1b42f2bd983655191203&q=59.349898,18.0230882
export default WeatherCard
