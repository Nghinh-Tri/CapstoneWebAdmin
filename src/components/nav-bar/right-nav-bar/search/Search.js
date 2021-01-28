import React, { Component } from 'react';

class Search extends Component {
    render() {
        return (
            <form className="navbar-form">
                <div className="input-group no-border">
                    <input type="text" className="form-control" placeholder="Search..." />
                    <button type="submit" className="btn btn-white btn-round btn-just-icon">
                        <i className="material-icons">search</i>
                        <div className="ripple-container" />
                    </button>
                </div>
            </form>
        );
    }
}

export default Search;