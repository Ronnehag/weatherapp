import React from 'react'

export default function WeatherDetailsItem({ date, mintemp, maxtemp, description, icon, maxwind, epoch, avgtemp }) {

    // using formula m/s = 0.277778 * wind(km/h). Rounds to one decimal
    const convertToMs = (wind) => {
        const num = 0.277778;
        return Math.round((wind * num)) / 10;
    }

    // Using epoch time to convert to new date and fetch the current day as string
    const getDay = (epoch) => {
        let d = new Date(0);
        d.setUTCSeconds(epoch);
        let day = d.getDay();
        switch (day) {
            case 0: return "Sunday";
            case 1: return "Monday";
            case 2: return "Tuesday";
            case 3: return "Wednesday";
            case 4: return "Thursday";
            case 5: return "Friday";
            case 6: return "Saturday";
            default: return "";
        }
    }

    return (
        <div className="col s12 m2 l2">
            <div className="card">
                <div className="card-content white-text center-align" style={weatherCard}>
                    <div className="row" style={{ margin: "15px" }}>
                        <div className="row">
                            <div className="col s12" style={{ padding: "0" }}>
                                <span>{getDay(epoch)}</span>
                                <br />
                                <span>{date}</span>
                                <br></br>
                                <img src={icon} alt="weather-icon" />
                                <br /><br />
                                <span><i className="fas fa-temperature-low"></i>  {avgtemp}°C</span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s12">
                                <small><i className="fas fa-temperature-low"></i> min {mintemp}°C</small>
                                <br/>
                                <small><i className="fas fa-temperature-low"></i> max {maxtemp}°C</small>
                                <br />
                                <small><i className="fas fa-wind"></i> {convertToMs(maxwind)} m/s</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

const weatherCard = {
    minHeight: "290px",
    background: "#035A96",
    padding: "5px 5px",
}