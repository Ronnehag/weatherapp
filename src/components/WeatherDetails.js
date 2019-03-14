import React, { Component } from 'react'
import WeatherDetailsItem from './WeatherDetailsItem'

export class WeatherDetails extends Component {

    forecastList = () => {
        return this.props.forecast.length ?
            (
                this.props.forecast.map(forecast => {
                    const { date } = forecast;
                    const { maxtemp_c, mintemp_c, maxwind_kph } = forecast.day;
                    const { text, icon } = forecast.day.condition;
                    return (
                        <WeatherDetailsItem
                            date={date}
                            maxtemp={maxtemp_c}
                            mintemp={mintemp_c}
                            maxwind={maxwind_kph}
                            description={text}
                            icon={icon}
                        />
                    )
                })
            ) : (<div className="center-align"><p>Loading data...</p></div>);
    }

    render() {
        return (
            <div className="row">
                <div className="col s12">
                    {this.forecastList()}
                </div>
            </div>
        )
    }
}

export default WeatherDetails
