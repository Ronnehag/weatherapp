import React, { Component } from 'react'
import WeatherDetailsItem from './WeatherDetailsItem'
import Loadingbar from './Layout/LoadingBar';

export class WeatherDetails extends Component {

    forecastList = () => {
        return this.props.forecast.length ?
            (
                this.props.forecast.map(forecast => {
                    const { date, date_epoch } = forecast;
                    const { maxtemp_c, mintemp_c, maxwind_kph, avgtemp_c } = forecast.day;
                    const { text, icon } = forecast.day.condition;
                    return (
                        <WeatherDetailsItem key={date}
                            date={date}
                            maxtemp={maxtemp_c}
                            mintemp={mintemp_c}
                            maxwind={maxwind_kph}
                            description={text}
                            icon={icon}
                            epoch={date_epoch}
                            avgtemp={avgtemp_c}
                        />
                    )
                })
            ) : (<Loadingbar />);
    }

    render() {
        return (
            <div className="row">
                <div className="col s12 flex-box">
                    {this.forecastList()}
                </div>
            </div>
        )
    }
}

export default WeatherDetails
