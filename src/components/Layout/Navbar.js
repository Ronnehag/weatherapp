import React, { Component } from 'react'
import M from 'materialize-css'

export class Navbar extends Component {

    // Maps the favorites passed down from App, renders them in the dropdown and sidebar (mobile) in the navbar
    favoriteList = () => {
        return this.props.favoriteLocations.length ? (
            this.props.favoriteLocations.map(location => {
                const { name, id } = location;
                return (
                    <li key={id} className="center-align">
                        <i style={icon} className="tiny right material-icons red-text text-darken-2" onClick={() => this.props.remove(id)}>remove_circle</i>
                        <span style={nameSpan} onClick={() => this.props.search(name)}>{name}</span>
                    </li>
                )
            })
        ) : (<li>No favorites</li>);
    }

    // Materialize autoinits the sidebar and dropdown links on mounting
    componentDidMount() {
        M.AutoInit();
    }

    render() {
        return (
            <div>
                <nav style={{ background: "#035A96" }}>
                    <div className="nav-wrapper">
                        <a className="brand-logo" href="." style={{ marginLeft: "10px" }}> Forecast</a>
                        <a href="#!" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                        <ul className="right hide-on-med-and-down">
                            <li><a className="dropdown-trigger" href="#!" data-target="dropdown1">Saved locations<i className="material-icons right">arrow_drop_down</i></a></li>
                        </ul>
                    </div>
                </nav>
                <ul id="dropdown1" className="dropdown-content">
                    {this.favoriteList()}
                </ul>

                <div>
                    <ul className="sidenav" id="mobile-demo">
                        <li><a className="dropdown-trigger" href="#!" data-target="dropdown2">Saved locations<i className="material-icons right">arrow_drop_down</i></a></li>
                    </ul>
                    <ul id="dropdown2" className="dropdown-content">
                        {this.favoriteList()}
                    </ul>
                </div>
            </div>
        )
    }
}

const icon = {
    fontSize: "14px",
    marginRight: "14px"
}
const nameSpan = {
    padding: "19px 0 19px 10px",
    display: "inline-flex",
    fontSize: "13px"
}
export default Navbar
