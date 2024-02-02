import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./movie-card.scss";

export const MovieCard = ({ movie, onFavoriteToggle }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    console.log(user.FavoriteMovies);
    user.FavoriteMovies.includes(movie._id)
      ? setIsFavorite(true)
      : setIsFavorite(false);
  }, [isFavorite]);

  const toggleFavorite = () => {
    //setIsFavorite(!isFavorite);
    if (!isFavorite) {
      setIsFavorite(true);
      onFavoriteToggle(movie._id);
      return;
    } else {
      setIsFavorite(false);
      onFavoriteToggle(movie._id);
      return;
    }
    //onFavoriteToggle(movie._id);
  };

  return (
    <Card className="movie-card h-100">
      <Card.Img
        className="movie-card-image"
        variant="top"
        src={movie.ImagePath}
      />
      <Card.Body className="movie-card-body">
        <Card.Title className="movie-card-title">{movie.Title}</Card.Title>
        <Card.Text className="movie-card-director">
          {movie.Director.Name}
        </Card.Text>
        <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
          <Button variant="link">Open</Button>
        </Link>
        <Button variant="primary" onClick={toggleFavorite}>
          {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        </Button>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }).isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
  onFavoriteToggle: PropTypes.func.isRequired,
};

export default MovieCard;
