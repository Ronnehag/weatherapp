import React from 'react'

export default function WeatherCard({ name, country, icon, text, updated, tempC, addToFav }) {
    return (
        <div className="row">
            <div className="col s12 currentweather">
                <div className="row">
                    <div className="col s12 center-align">
                        <img src={icon} alt="weather" />
                        <p>{text}</p>
                        <p><i className="fas fa-temperature-low"></i> {tempC} °C</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col s12 center-align" style={{ position: "relative" }}>
                        <span>{name}, {country} </span>
                        <br />
                        <small>Last updated: {updated}</small>
                        <br /><br />
                        <span className="btn-small btn-fav" onClick={() => addToFav(name)}>
                            <i className="material-icons right color-yellow" title="Add to favourites">favorite</i>
                            Add to favorites
                        </span>
                    </div>
                </div>
            </div>
        </div >

    )
}