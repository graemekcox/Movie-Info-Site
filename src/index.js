import React from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.min.css'
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';

const Movie = ({movie}) => {
     const img_base = "https://image.tmdb.org/t/p/w500/";

    return (
    <div>
        <Container className="movie">
            <div className="movie-body">
                <h2 className="movie-title">{JSON.stringify(movie.title)}</h2>
                <img src={`${img_base}${movie.poster_path}`} alt="Poster" width="200"/>
                <h5 className="movie-year">{JSON.stringify(movie.release_date)}</h5>
                <h4 className="movie-plot">{JSON.stringify(movie.overview)}</h4>
            </div>
        </Container>
    </div>
    )
}

class MovieForm extends React.Component {

    render() {
        return (
            <nav className="navbar navbar-light bg-light justify-content-betwee">
            <a className="navbar-brand">Movie Info</a>
            <form className="form-inline">
                <input className="form-control mr-sm-2" type="search" placeholder="Movie title" aria-label="Movie title"
                    onChange={this.props.change_action}/>
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={this.props.submit_action}>Search</button>
            </form>
            </nav>
        );
    }
}

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            movies: [],
            title: '',
            search_title: 'Her',
            search_data: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount(){
        console.log("COMPONENT DID MOUNT");
        console.log(this.state.search_title)
        this.searchMovie()
    }

    async searchMovie() {
        const API_KEY = 'api_key=007d7263d6c65904a9285e1a3754a64c';
        const BASE_URL = 'https://api.themoviedb.org/3/movie/';
        const SEARCH_URL = 'https://api.themoviedb.org/3/search/movie?';
        const search_id = 0;

        console.log(this.state.search_title)
        const url = SEARCH_URL + API_KEY + '&query=' + this.state.search_title;
        const response = await fetch(url);
        const data = await response.json();

        console.log(this.state.movie_id);

        if (response.ok){
            console.log("Fetch movie details")
            // console.log(data.results[0]);
            // Now grab movie details based on search

            fetch(BASE_URL+data.results[0].id + '?' + API_KEY)
            .then(res => res.json()) // parse GET output to JSON
            .then(
                (data) => {
                this.setState({ movies: data}) // updata state to our movie
            })
            .catch(console.log)
        }
    }


    handleChange(event) {
        this.setState({search_title: event.target.value});
        // console.log("Updated text")
        // console.log(this.state.search_title)
    }

    async handleSubmit(event) {
        event.preventDefault()
        this.searchMovie()
    }

    handleInputTitle = (event) => {
        event.preventDefault();
        const {title} = event.target.value;
        this.setState({title});
    }

    render() {
        const {title} = this.state;
        return (
            <div className="app">
                <Jumbotron>
                </Jumbotron>

                <MovieForm change_action={this.handleChange} submit_action={this.handleSubmit}></MovieForm>
                <Movie movie={this.state.movies}/>

            </div>
        )
    }
}


ReactDOM.render(
    <App />,
    document.getElementById('root')
);

