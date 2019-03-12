import React, { Component } from 'react'
import Card from './Card';

export class WeatherCard extends Component {

    static initialState = () => ({
        data: []
    });
    state = WeatherCard.initialState();

    loadWeatherData = () => {
        if (this.state.data.length === 0) {
            return (
                <h6>Loading data...</h6>
            )
        } else {
            console.log(this.state.data);
            const { name, country } = this.state.data.location;
            const { last_updated, temp_c } = this.state.data.current;
            const { text, icon } = this.state.data.current.condition;
            return (
                <Card
                    name={name}
                    country={country}
                    updated={last_updated}
                    tempC={temp_c}
                    icon={icon}
                    text={text}
                />
            )
        }
    }

    // Fetch API data on mount, set state to Stockholms weather
    async componentDidMount() {
        try {
            const res = await fetch(Stockholm.API);
            const json = await res.json();
            this.setState({ data: json });
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


const Stockholm = {
    API: "https://api.apixu.com/v1/current.json?key=5d1d8a019a1b42f2bd983655191203&q=Stockholm"
}

export default WeatherCard
