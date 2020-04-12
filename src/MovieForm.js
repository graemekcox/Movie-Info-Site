import React from 'react';

class MovieForm extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-light bg-light justify-content-betwee">
            <form className="form-inline">
                <input className="form-control mr-sm-2" type="search" placeholder="Movie title" aria-label="Movie title"
                    onChange={this.props.change_action}/>
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={this.props.submit_action}>Search</button>
            </form>
            </nav>
        );
    }
}
export default MovieForm