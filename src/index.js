import React from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.min.css'
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';

import Movie from './Movie.js'
import NavBar from './NavBar.js'




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
        this.searchMovie()
    }

    async searchMovie() {
        const API_KEY = 'api_key=007d7263d6c65904a9285e1a3754a64c';
        const BASE_URL = 'https://api.themoviedb.org/3/movie/';
        const SEARCH_URL = 'https://api.themoviedb.org/3/search/movie?';

        const url = SEARCH_URL + API_KEY + '&query=' + this.state.search_title;
        const response = await fetch(url);
        const data = await response.json();

        if (response.ok){
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
                <NavBar change_action={this.handleChange} submit_action={this.handleSubmit}/>
                <Jumbotron/>
                <Movie movie={this.state.movies}/>
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);

