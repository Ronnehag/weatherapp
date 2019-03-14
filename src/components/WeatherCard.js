import React from 'react'

export default function WeatherCard({ name, country, icon, text, updated, tempC, tempF, details, addToFav }) {
    return (
        <div className="row">
            <div className="col s12 m4 offset-m7">
                <div className="row">
                    <div className="col s12 center-align">
                        <span style={cardTitle}>{name}, {country}</span>
                        <i className="material-icons color-yellow" title="Add to favourites" onClick={() => addToFav(name)}>star</i>
                    </div>
                </div>
                <div className="row">
                    <div className="col s12 center-align">
                        <img src={icon} alt="weather" />
                        <p>{text}</p>
                        <p>{tempC} °C / {tempF} °F</p>
                        <p>Last updated: {updated}</p>
                    </div>
                </div>
            </div>
        </div>

    )
}

const cardTitle = {
    fontSize: "20px"
}