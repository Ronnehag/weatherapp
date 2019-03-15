import React from 'react'

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
