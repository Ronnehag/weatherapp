import React, { Component } from 'react'

export class SearchForm extends Component {
    static initialState = () => ({
        country: ""
    })
    state = SearchForm.initialState();

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.searchForWeatherByName(this.state.country);
        this.state = SearchForm.initialState();
    }

    render() {
        return (
            <form className="row">
                <form className="col s12">
                    <div className="row">
                        <div className="input-field col s6 offset-s2">
                            <input placeholder="Position..." type="search" name="country" value={this.state.country} onChange={this.handleChange} />
                        </div>
                        <div className="input-field col s2">
                            <button type="submit" onClick={this.handleSubmit} className="btn waves-effect waves-light orange">Search</button>
                        </div>
                    </div>
                </form>
            </form>

        )
    }
}

export default SearchForm
