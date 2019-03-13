import React, { Component } from 'react';

export class SearchForm extends Component {
    static initialState = () => ({
        country: "",
        data: []
    })
    state = SearchForm.initialState();

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    validateInput = (input) => {
        // check for numbers, symbols etc
        input = this.state.country.trim().toLowerCase();
        input = input.replace(/å|ä/g, "a");
        input = input.replace(/ö/g, "o");
        return input;
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let searchName = this.validateInput(this.state.country);
        this.props.searchForWeatherByName(searchName);
        this.setState(SearchForm.initialState());
    }

    render() {
        return (
            <form className="row">
                <div className="col s12">
                    <div className="row">
                        <div className="input-field col s6 offset-s2">
                            <input
                                type="text"
                                name="country"
                                value={this.state.country}
                                onChange={this.handleChange}
                                className="searchInput" />
                            <label htmlFor="country">Location name</label>
                        </div>
                        <div className="input-field col s2">
                            <button type="submit" onClick={this.handleSubmit} className="btn waves-effect waves-light orange btn-orange">
                                <i className="material-icons right">send</i>Search</button>
                        </div>
                    </div>
                </div>
            </form>
        )
    }
}

export default SearchForm
