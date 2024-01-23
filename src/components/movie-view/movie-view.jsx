import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./movie-view.scss";

export const MovieView = ({ movie, onBackClick }) => {
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
            <span>Title: </span>
            <span>{movie.Title}</span>
          </div>
          <div className="description">
            <span>Description: </span>
            <span>{movie.Description}</span>
          </div>
          <div className="director">
            <span>Director: </span>
            <span>{movie.Director.Name}</span>
          </div>
          <div className="genre">
            <span>Genre: </span>
            <span>{movie.Genre.Name}</span>
          </div>
          <div className="back-button-container">
            <Button
              onClick={onBackClick}
              className="back-button"
              style={{ cursor: "pointer" }}
            >
              Back
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

MovieView.propTypes = {
  movie: PropTypes.shape({
    ImagePath: PropTypes.string,
    Title: PropTypes.string,
    Description: PropTypes.string,
    Director: PropTypes.shape({
      Name: PropTypes.string,
    }),
    Genre: PropTypes.shape({
      Name: PropTypes.string,
    }),
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};
