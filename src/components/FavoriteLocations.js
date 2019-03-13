import React from 'react'

export default function FavoriteLocations({ locations, remove }) {

    console.log(locations);
    const locationList = locations.length ? (
        locations.map(location => {
            const { name, id } = location;
            return (
                <li key={id} style={{ padding: "5px" }}>
                    <span className="btn waves-light waves-effect">{name}
                        <i className="tiny material-icons right red-text text-darken-2 remove-icon" onClick={() => remove(id)}>remove_circle</i></span>
                </li>
            )
        })
    ) : (<p className="center">No favorites</p>);


    // Add fav location buttons with del and click event
    return (
        <div className="card blue-grey darken-1">
            <div className="card-content white-text">
                <span className="card-title center-align" style={{ fontSize: "20px" }}>Favorites</span>
                <ul>
                    {locationList}
                </ul>
            </div>
        </div>
    )
}