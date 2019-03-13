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
        this.setState(SearchForm.initialState());
    }

    render() {
        return (
            <form className="row">
                <div className="col s12">
                    <div className="row">
                        <div className="input-field col s6 offset-s2">
                            <input type="text" name="country" value={this.state.country} onChange={this.handleChange} className="searchInput" />
                            <label htmlFor="country">City/Location:</label>
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
