import React from 'react'

// General function component that returns a loadingbar, stretching 12 columns
export default function LoadingBar() {
    return (
        <div className="row">
            <div className="col s12 l8 offset-l2">
                <div className="progress">
                    <div className="indeterminate"></div>
                </div>
            </div>
        </div>
    )
}
