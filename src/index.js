import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// class Movie extends React.Component {
//     constructor(props){
//         super(props);
//     }

//     render() {
//         return (
//             <div className="movie">
//                 <div class="movie-body">
//                     {/* <h2 className="movie-title">{this.props.movie.Title}</h2> */}
//                     <h2 className="movie-title">Blade Runner</h2>
//                     <h4 className="movie-plot"> Plot goes here</h4>
//                 </div>
//             </div>
//         );

//         }
// }
const Movie = ({movie}) => {
     const img_base = "https://image.tmdb.org/t/p/w500/";

    return (
    <div>
        <center><h1>Movie List</h1></center>
        <div className="movie">
            <div class="movie-body">
                <h2 className="movie-title">{JSON.stringify(movie.title)}</h2>
                <img src={`${img_base}${movie.poster_path}`} alt="Poster" width="200"/>
                <h5 className="movie-year">{JSON.stringify(movie.release_date)}</h5>
                <h4 className="movie-plot">{JSON.stringify(movie.overview)}</h4>
            </div>
        </div>
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
        // const title = "movie";
        const {title} = this.state;
        return (
            <div className="app">
                <div className="search">
                    <h3>Search movie!</h3>
                    <input className="search-box" type="text" 
                    onChange={this.handleInputTitle} value={title} />
                    <input className="button" type="submit" onClick=
                    {this.handleSubmit} value="Search" />

                </div>

                <Movie movie={this.state.movies}/>

            </div>
        )
    }
}

// sendRequest = (title) => {
//     const req = unireset("GET", "https://omdbapi.com/?t=Blade+runner");
// }

ReactDOM.render(
    <App />,
    document.getElementById('root')
);

