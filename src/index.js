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
            <div class="movie-body">
                <h2 className="movie-title">{JSON.stringify(movie.title)}</h2>
                <img src={`${img_base}${movie.poster_path}`} alt="Poster" width="200"/>
                <h5 className="movie-year">{JSON.stringify(movie.release_date)}</h5>
                <h4 className="movie-plot">{JSON.stringify(movie.overview)}</h4>
            </div>
        </Container>
    </div>
)
}

class App extends React.Component {
    state = {
        movies: [],
        title: ''
    }

    componentDidMount(){
        fetch('https://api.themoviedb.org/3/movie/76341?api_key=007d7263d6c65904a9285e1a3754a64c')
        .then(res => res.json()) // parse GET output to JSON
        .then(
            (data) => {
            this.setState({ movies: data}) // updata state to our movie
        })
        .catch(console.log)
    }

    handleSubmit = () => {
        const {title} =  this.state;
        // this.props.handleSendRequest(title);
        this.setState({title: ''});
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

                <nav class="navbar navbar-light bg-light justify-content-betwee">
                    <a class="navbar-brand">Movie Info</a>
                    <form class="form-inline">
                        <input class="form-control mr-sm-2" type="search" placeholder="Movie title" aria-label="Movie title"/>
                        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
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

