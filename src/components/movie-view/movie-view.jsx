import { Container, Row, Col, Button } from "react-bootstrap";
import React, { useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./movie-view.scss";

export const MovieView = ({ movies, onFavoriteToggle }) => {
  const { movieId } = useParams();
  const [isFavorite, setIsFavorite] = useState(false);

  const movie = movies.find((m) => m._id === movieId);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    onFavoriteToggle(movieId);
  };

  return (
    <Container>
      <Row>
        <Col md={12} className="movie-image">
          <img src={movie.ImagePath} alt="movie Poster" />
        </Col>
      </Row>
      <Row>
        <Col md={12} className="movie-details">
          <div className="title">
            <span>
              <b>Title:</b> {movie.Title}
            </span>
          </div>
          <div className="description">
            <span>
              <b>Description:</b> {movie.Description}
            </span>
          </div>
          <div className="director">
            <span>
              <b>Director:</b> {movie.Director.Name}
            </span>
          </div>
          <div className="genre">
            <span>
              <b>Genre:</b> {movie.Genre.Name}
            </span>
          </div>
          <div className="button-container">
            <Link to={`/`}>
              <button className="back-button">Back</button>
            </Link>
            <Button onClick={toggleFavorite} className="favorite-button">
              {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

MovieView.propTypes = {
  movies: PropTypes.array.isRequired,
  onFavoriteToggle: PropTypes.func.isRequired,
};

export default MovieView;
