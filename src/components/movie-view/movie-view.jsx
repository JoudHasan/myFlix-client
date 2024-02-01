import { Container, Row, Col, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./movie-view.scss";

export const MovieView = ({ movies, onFavoriteToggle }) => {
  const { movieId } = useParams();
  const [isFavorite, setIsFavorite] = useState(false);

  const movie = movies.find((m) => m.id === movieId);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    onFavoriteToggle(movieId); // Notify parent component about favorite toggle
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
            <Link to={`/`}>
              <button className="back-button">Back</button>
            </Link>
          </div>
          <div className="favorite-button-container">
            <Button onClick={toggleFavorite}>
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
