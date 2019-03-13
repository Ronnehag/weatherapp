import React from 'react'

export default function WeatherCard({ name, country, icon, text, updated, tempC, tempF, details, addToFav }) {
    return (
        <div className="row">
            <div className="col s12 m8 offset-m3">
                <div className="card blue-grey darken-1">
                    <div className="card-content white-text">
                        <span className="card-title" style={cardTitle}>{name}, {country}
                            <span className="align-right">
                                <i className="material-icons right color-yellow" title="Add to favourites" onClick={() => addToFav(name)}>star</i></span></span>

                        <img src={icon} alt="weather" />
                        <p>{text}</p>
                        <p>{tempC} °C / {tempF} °F</p>
                        <br />
                        <button className="btn btn-waves" onClick={() => details(name)}>
                            <i className="material-icons right">details</i>
                            Further details</button>
                    </div>
                    <div className="card-action blue-grey lighten-3">
                        <span>Last updated: {updated}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

const cardTitle = {
    fontSize: "20px"
}