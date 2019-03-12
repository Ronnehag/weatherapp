import React, { Component } from 'react'

export class SearchForm extends Component {
    static initialState = () => ({
        region: ""
    })
    state = SearchForm.initialState();

    render() {
        return (
            <div className="row">
                <form className="col s12">
                    <div className="row">
                        <div className="input-field col s6 offset-s2">
                            <input placeholder="Position..." type="search" name="search" />
                        </div>
                        <div className="input-field col s2">
                            <button type="submit" className="btn waves-effect waves-light orange">Search</button>
                        </div>
                    </div>
                </form>
            </div>

        )
    }
}

export default SearchForm
