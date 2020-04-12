import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class Movie extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            movie: []
        }
    }
    render() {
        const img_base = "https://image.tmdb.org/t/p/w500/";
        const bg = img_base + this.props.movie.backdrop_path;

        return (
            <div>
                <Container className="movie" >
                    <Row>
                        <Col xs={3}>
                            <img src={`${img_base}${this.props.movie.poster_path}`} alt="Poster" width="200"/>
                        </Col>
                        <Col xs={5}> 
                            <Row>
                                <h2 className="movie-title">{this.props.movie.title}</h2>
                                <p className="movie-year">{this.props.movie.release_date}</p>
                            </Row>

                            <p className="movie-plot">{this.props.movie.overview}</p>
                        </Col>

                        <Col xs={4}>
                            <div class="card" style ={{ backgroundImage: "url("+bg+")" }}>
                                <img class="card-img-top" src="..." alt="Card image cap"/>
                                <div class="card-body">
                                    <h5 class="card-title">Card title</h5>
                                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                </div>
                            </div>
                        </Col>

                    </Row>
                    <Row>

                    </Row>
                </Container>
            </div>
        );
    }
}

export default Movie