import React from 'react'

const Header = () => {
    return (
        <header>
            <h3 style={headerText} className="center-align">weather app</h3>
        </header>

    )
}

const headerText = {
    color: "#ff9800",
    padding: "15px",
    textTransform : "uppercase",
    fontWeight: "bold"


}

export default Header
