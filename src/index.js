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
    constructor(props){
        super(props);
        this.state = {search_title: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({search_title: event.target.value});
    }

    handleSubmit(event) {
        // alert('A movie was submitted: '  + this.state.value);
        fetch('https://api.themoviedb.org/3/movie/76341?api_key=007d7263d6c65904a9285e1a3754a64c')
        .then(res => res.json()) // parse GET output to JSON
        .then(
            (data) => {
            this.setState({ movies: data}) // updata state to our movie
        })
        .catch(console.log)




        event.preventDefault();
    }

    render() {
        return (
            <nav className="navbar navbar-light bg-light justify-content-betwee">
            <a className="navbar-brand">Movie Info</a>
            <form className="form-inline">
                <input className="form-control mr-sm-2" type="search" placeholder="Movie title" aria-label="Movie title"
                    onChange={this.handleChange}/>
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={this.handleSubmit}>Search</button>
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
            search_title: 'Mad Max',
            search_id: 76341 // Mad max
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount(){
        const API_KEY = 'api_key=007d7263d6c65904a9285e1a3754a64c';
        const BASE_URL = 'https://api.themoviedb.org/3/movie/';
        const SEARCH_URL = 'https://api.themoviedb.org/3/search/movie?';

        console.log(this.state.search_title)
        const url = SEARCH_URL + API_KEY + '&query=' + this.state.search_title;
        const response = await fetch(url);
        const data = await response.json();
        this.setState({search_id: data.results[0].id})
        console.log(data.results[0]);

        // Now grab movie details based on search
        fetch(BASE_URL+data.results[0].id + '?' + API_KEY)
        .then(res => res.json()) // parse GET output to JSON
        .then(
            (data) => {
            this.setState({ movies: data}) // updata state to our movie
        })
        .catch(console.log)

    }


    handleChange(event) {
        this.setState({search_title: event.target.value});
    }

    handleSubmit(event) {
        alert('A movie was submitted: '  + this.state.search_title);
        fetch('https://api.themoviedb.org/3/movie/152601?api_key=007d7263d6c65904a9285e1a3754a64c')
        .then(res => res.json()) // parse GET output to JSON
        .then( (data) => {
            this.setState({ movies: data}) // updata state to our movie
        })
        .catch(console.log)
    }

    handleInputTitle = (event) => {
        event.preventDefault();
        const {title} = event.target.value;
        this.setState({title});
    }

    render() {
        const {title} = this.state;
        console.log("I am rendering");
        return (
            <div className="app">
                <Jumbotron>
                </Jumbotron>

                {/* <MovieForm></MovieForm> */}
                <nav className="navbar navbar-light bg-light justify-content-betwee">
                    <a className="navbar-brand">Movie Info</a>
                    <form className="form-inline">
                        <input className="form-control mr-sm-2" type="search" placeholder="Movie title" aria-label="Movie title"
                            onChange={this.handleChange}/>
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={this.handleSubmit}>Search</button>
                    </form>
                </nav>


                <Movie movie={this.state.movies}/>

            </div>
        )
    }
}


ReactDOM.render(
    <App />,
    document.getElementById('root')
);

