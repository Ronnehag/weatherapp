import React from 'react'

export default function LoadingBar() {
    return (
        <div className="row">
            <div className="col s4 offset-s4">
                <div className="progress">
                    <div className="indeterminate"></div>
                </div>
            </div>
        </div>
    )
}
