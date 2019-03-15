import React, { Component } from 'react';
import M from 'materialize-css';

export class SearchForm extends Component {
    static initialState = () => ({
        country: "",
    })
    state = SearchForm.initialState();

    // Sets the state based on the input while typing.
    // Fetching suggestions from the API and fills the materialize autocomplete component.
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        }, (async () => {
            if (this.state.country < 3) return;
            let options = { data: {} };
            let node = document.querySelector(".autocomplete");
            const data = await this.fetchSuggestions(`https://api.apixu.com/v1/search.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=${this.state.country}`);
            for (let key in data) {
                if (data.hasOwnProperty(key)) {
                    const element = data[key];
                    options.data[element.name] = null;
                }
            }
            M.Autocomplete.init(node, options);
        }));

    }

    // General method to fetch from API since URL will change depending on input
    fetchSuggestions = async (url) => {
        try {
            const res = await fetch(url);
            const json = await res.json();
            return json;
        } catch (err) {
            console.log(err);
            return { err: "error" };
        }
    }

    // Removes any whitespace and replaces åäö with a and o to match the API search query
    validateInput = (input) => {
        input = this.state.country.trim().toLowerCase();
        input = input.replace(/å|ä/g, "a");
        input = input.replace(/ö/g, "o");
        return input;
    }

    // Submits the search form, validates the input field and invokes the 
    // function passed on by props so that App changes it's state and re-render components.
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
                        <div className="input-field col s12 m5 l5 offset-m3 offset-l3">
                            <input
                                type="text"
                                name="country"
                                value={this.state.country}
                                onChange={this.handleChange}
                                className="searchInput autocomplete" />
                            <label htmlFor="country">Location name</label>
                        </div>
                        <div className="input-field col s2 m2 l2">
                            <button type="submit" onClick={this.handleSubmit}
                                className="btn waves-effect waves-light btn-search">
                                Search
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        )
    }
}

export default SearchForm
