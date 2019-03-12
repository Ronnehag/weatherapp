import React from 'react'

export default function Card({ name, country, icon, text, updated, tempC }) {
    return (
        <div className="row">
            <div className="col s12 m6">
                <div className="card blue-grey darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">{name} : {country}</span>
                        <img src={icon} alt="weather" />
                        <p>{text}</p>
                        <p>Temperature: {tempC} °C</p>
                    </div>
                    <div className="card-action blue-grey lighten-3">
                        <span>Last updated: {updated}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
