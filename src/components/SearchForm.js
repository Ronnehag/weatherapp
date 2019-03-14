import React, { Component } from 'react';
import M from 'materialize-css';

const APIKEY = "5d1d8a019a1b42f2bd983655191203";

export class SearchForm extends Component {
    static initialState = () => ({
        country: "",
        data: {}
    })
    state = SearchForm.initialState();

    handleChange = (e) => {
        if (e.target.value < 3) return;
        this.setState({
            [e.target.name]: e.target.value
        }, (async () => {
            let options = { data: {} };
            let node = document.querySelector(".autocomplete");
            const data = await this.getSuggestions();
            for (let key in data) {
                if (data.hasOwnProperty(key)) {
                    const element = data[key];
                    options.data[element.name] = null;
                }
            }

            M.Autocomplete.init(node, { data: options.data, limit: 5});
        }));

    }

    getSuggestions = async () => {

        return await this.fetchSuggestions(`https://api.apixu.com/v1/search.json?key=${APIKEY}&q=${this.state.country}`);
    }

    fetchSuggestions = async (url) => {
        try {
            const res = await fetch(url);
            const json = await res.json();
            return json;
        } catch (err) {
            console.log(err);
        }
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
            <form className="row" autoComplete="off">
                <div className="col s12">
                    <div className="row">
                        <div className="input-field col s5 offset-s3">
                            <input
                                type="text"
                                name="country"
                                value={this.state.country}
                                onChange={this.handleChange}
                                className="searchInput autocomplete" />
                            <label htmlFor="country">Location name</label>
                        </div>
                        <div className="input-field col s2">
                            <button type="submit" onClick={this.handleSubmit}
                                className="btn waves-effect waves-light btn-search">
                                Search
                                <i className="material-icons right">send</i>
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        )
    }
}

export default SearchForm
