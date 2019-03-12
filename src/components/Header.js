import React from 'react'

const Header = () => {
    return (
        <header>
            <h1 style={headerText} className="center-align">Weather App</h1>
        </header>

    )
}

const headerText = {
    color: "#ff9800",
    margin: "2.8rem 0 1.68rem 0"

}

export default Header
