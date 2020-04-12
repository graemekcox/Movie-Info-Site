import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';

class Movie extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            event: null,
            movie: [],
            credits: [],
            isLoaded: false
        }
    }

    componentDidUpdate(prevProps){
        if (prevProps.movie !== this.props.movie) {
            // this.setState({movie: this.props.movie});
            console.log("DID UPDATE")
            // console.log(this.state.movie)
            // console.log(this.props.movie)
            this.searchCast()
            this.render()
        }
    }

    async searchCast() {
        const API_KEY = 'api_key=007d7263d6c65904a9285e1a3754a64c';
        const BASE_URL = 'https://api.themoviedb.org/3/movie/';
        const URL = BASE_URL+ this.state.movie.id + '/credits?' + API_KEY;
        console.log(URL)
        // console.log(data.results[0]);
        // Now grab movie details based on search

        fetch(BASE_URL+ this.state.movie.id + '/credits?' + API_KEY)
        .then(res => res.json()) // parse GET output to JSON
        .then(
            (data) => {
            this.setState({ credits: data}) // updata state to our movie
        })
        .catch(console.log)

    }

    componentWillReceiveProps(nextProps){
        if (nextProps.movie){
            const {movie} = nextProps;
            console.log("Received props")

            this.setState({movie: nextProps.movie})

                      // this.setState({movie: nextProps.movie});
            console.log(this.state.movie)
            
        }
    }


    render() {

        const img_base = "https://image.tmdb.org/t/p/w500/";

        const bg = img_base + this.props.movie.backdrop_path;
        // console.log(this.props.movie)
        if (this.state.credits.cast === undefined){ // Wait until cast has been updated before rendering
            console.log("Cast has not been updated")
            return null;
        }
        console.log(this.state.credits.cast)
 
        return (
            <div>
                <Container className="movie" >
                    <Row>
                        <Col xs={3}>
                            <img src={`${img_base}${this.props.movie.poster_path}`} alt="Poster" width="200"/>
                        </Col>
                        <Col xs={5}> 
                            <Row>
                                <Col xs={4}><h2 className="movie-title">{this.props.movie.title}</h2></Col>
                                <Col xs={4}><p className="movie-year">{this.props.movie.release_date}</p></Col>
                                <Col xs={4}><p className="movie-year">{this.props.movie.vote_average}</p></Col>
                            </Row>

                            <p className="movie-plot">{this.props.movie.overview}</p>
                        </Col>

                        <Col xs={4}>
                            <div className="card">
                                <img className="card-img-top" src={`${img_base}${this.props.movie.backdrop_path}`} alt="This will have more info"/>
                                <div className="card-body">
                                    <h5 className="card-title">{this.props.movie.title}</h5>
                                    <p className="card-text">{this.props.movie.tagline}</p>
                                </div>
                            </div>
                        </Col>

                    </Row>
                    <Row className="cast_carosel">
                        <ListGroup>
                            {
                            this.state.credits.cast.map(function(item, i) {
                                // <ListGroup.item>Name</ListGroup.item>
                                // console.log(item)
                                return <ListGroupItem>{item.character}</ListGroupItem>;
                                // <ListGroupItem>{item.name}</ListGroupItem>
                            })}
                        </ListGroup>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Movie