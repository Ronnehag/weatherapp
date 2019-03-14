import React from 'react'

export default function WeatherCard({ name, country, icon, text, updated, tempC, addToFav }) {
    return (
        <div className="row" id="currentWeather">
            <div className="col s12 m4 offset-m7">
                <div className="row">
                    <div className="col s12 center-align">
                        <img src={icon} alt="weather" />
                        <p>{text}</p>
                        <p><i className="fas fa-temperature-low"></i> {tempC} °C</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col s12 center-align">
                        <span>{name}, {country} </span>
                        <i className="material-icons color-yellow" title="Add to favourites" onClick={() => addToFav(name)}>star</i>
                        <br />
                        <small>Last updated: {updated}</small>
                    </div>
                </div>
            </div>
        </div>

    )
}
