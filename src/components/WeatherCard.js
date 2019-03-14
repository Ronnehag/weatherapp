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
                    <div className="col s12 center-align" id="mainWeather">
                        <span className="btn-floating btn-flat btn-sm waves-effect waves-light red" id="favBtn">
                            <i className="material-icons color-yellow" title="Add to favourites" onClick={() => addToFav(name)}>favorite</i></span>
                        <span>{name}, {country} </span>
                        <br />
                        <small>Last updated: {updated}</small>
                    </div>
                </div>
            </div>
        </div >

    )
}