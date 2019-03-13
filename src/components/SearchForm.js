import React, { Component } from 'react';
import axios from 'axios';


export class SearchForm extends Component {
    static initialState = () => ({
        country: "",
        data: []
    })
    state = SearchForm.initialState();

    getSuggestions = () => {
        axios.get(`https://api.apixu.com/v1/search.json?key=5d1d8a019a1b42f2bd983655191203&q=${this.state.country}`)
            .then(({ data }) => {
                this.setState({
                    data: data.data
                });
            });
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.searchForWeatherByName(this.state.country);
        this.setState(SearchForm.initialState());
    }

    render() {
        return (
            <form className="row">
                <div className="col s12">
                    <div className="row">
                        <div className="input-field col s6 offset-s2">
                            <input
                                ref={input => this.search = input}
                                type="text"
                                name="country"
                                value={this.state.country}
                                onChange={this.handleChange}
                                className="searchInput" />
                            <label htmlFor="country">City name:</label>
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
