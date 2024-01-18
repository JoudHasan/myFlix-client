import React, { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../SignupView/SignupView.jsx";
import { Row, Col } from "react-bootstrap"; // Assuming you're using react-bootstrap

export const MainView = () => {

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const storedToken = localStorage.getItem("token");

  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
<<<<<<< HEAD
  const [token, setToken] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]); // Assuming similarMovies is a state variable
=======
>>>>>>> refs/remotes/origin/solveConfilct

  useEffect(() => {

    if (!storedToken) {
      return;
    }

    fetch("https://movie-api-joud-a1d184147f81.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${storedToken}` },

    })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => ({
          _id: movie._id,
          Title: movie.Title,
          ImagePath: movie.ImagePath,
          Description: movie.Description,
          Genre: {
            Name: movie.Genre.Name,
          },
          Director: {
            Name: movie.Director.Name,
          },
        }));
        setMovies(moviesFromApi);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  }, [token]);

<<<<<<< HEAD
  return (
    <Row className="justify-content-md-center">
      <Col md={5}>
        {user ? (
          <button
            onClick={() => {
              setUser(null);
              setToken(null);
            }}
          >
            Logout
          </button>
        ) : (
          <>
            <LoginView onLoggedIn={(user) => setUser(user)} />
            or
            <SignupView />
          </>
        )}
      </Col>

      {selectedMovie ? (
        <>
          <Col md={8} style={{ border: "1px solid black" }}>
            <MovieView
              style={{ border: "1px solid green" }}
              movie={selectedMovie}
              onBackClick={() => setSelectedMovie(null)}
            />
          </Col>
          <Col md={4}>
            <div>
              <h2>Similar Movies</h2>
              {similarMovies.length === 0 ? (
                <p>There are no similar movies.</p>
              ) : (
                similarMovies.map((movie) => (
                  <MovieCard
                    key={movie._id}
                    movie={movie}
                    onMovieClick={(newSelectedMovie) => {
                      setSelectedMovie(newSelectedMovie);
                    }}
                  />
                ))
              )}
            </div>
          </Col>
        </>
      ) : movies.length === 0 ? (
        <div>The list is empty!</div>
      ) : (
        movies.map((movie) => (
          <Col className="mb-5" key={movie._id} md={3}>
=======
  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  };
import React, { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../SignupView/SignupView.jsx";
import { Row, Col } from "react-bootstrap"; // Assuming you're using react-bootstrap

export const MainView = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const storedToken = localStorage.getItem("token");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [token, setToken] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]); // Assuming similarMovies is a state variable

  useEffect(() => {
    if (!storedToken) {
      return;
    }

    fetch("https://movie-api-joud-a1d184147f81.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${storedToken}` },
    })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => {
          return {
            _id: movie._id,
            Title: movie.Title,
            ImagePath: movie.ImagePath,
            Description: movie.Description,
            Genre: {
              Name: movie.Genre.Name,
            },
            Director: {
              Name: movie.Director.Name,
            },
          };
        });
        setMovies(moviesFromApi);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  }, [token]);

  return (
    <Row className="justify-content-md-center">
      <Col md={5}>
        {user ? (
          <button
            onClick={() => {
              setUser(null);
              setToken(null);
            }}
          >
            Logout
          </button>
        ) : (
          <>
            <LoginView onLoggedIn={(user) => setUser(user)} />
            or
            <SignupView />
          </>
        )}
      </Col>

      {selectedMovie ? (
        <>
          <Col md={8} style={{ border: "1px solid black" }}>
            <MovieView
              style={{ border: "1px solid green" }}
              movie={selectedMovie}
              onBackClick={() => setSelectedMovie(null)}
            />
          </Col>
          <Col md={4}>
            <div>
              <h2>Similar Movies</h2>
              {similarMovies.length === 0 ? (
                <p>There are no similar movies.</p>
              ) : (
                similarMovies.map((movie) => (
                  <MovieCard
                    key={movie._id}
                    movie={movie}
                    onMovieClick={(newSelectedMovie) => {
                      setSelectedMovie(newSelectedMovie);
                    }}
                  />
                ))
              )}
            </div>
          </Col>
        </>
      ) : movies.length === 0 ? (
        <div>The list is empty!</div>
      ) : (
        movies.map((movie) => (
          <Col className="mb-5" key={movie._id} md={3}>
            <MovieCard
              movie={movie}
              onMovieClick={(newSelectedMovie) => {
                setSelectedMovie(newSelectedMovie);
              }}
            />
          </Col>
        ))
      )}
    </Row>
  );
};

  if (!user) {
    return (
      <>
        <LoginView
          onLoggedIn={(user, token) => {
            setUser(user);
            setToken(token);
          }}
        />
        or
        <SignupView />
      </>
    );
  }

  if (selectedMovie) {
    const similarMovies = movies.filter(
      (movie) =>
        movie._id.toString() !== selectedMovie._id.toString() &&
        movie.Genre.Name === selectedMovie.Genre.Name
    );

    return (
      <>
        <MovieView
          movie={selectedMovie}
          onBackClick={() => setSelectedMovie(null)}
        />
        <br />
        <h2>Similar Movies</h2>
        {similarMovies.length === 0 ? (
          <p>There are no similar movies.</p>
        ) : (
          similarMovies.map((movie) => (
>>>>>>> refs/remotes/origin/solveConfilct
            <MovieCard
              movie={movie}
              onMovieClick={(newSelectedMovie) =>
                setSelectedMovie(newSelectedMovie)
              }
            />
<<<<<<< HEAD
          </Col>
        ))
      )}
    </Row>
  );
};
=======
          ))
        )}
      </>
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie._id}
          movie={movie}
          onMovieClick={(newSelectedMovie) =>
            setSelectedMovie(newSelectedMovie)
          }
        />
      ))}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};


<button
  onClick={() => {
    setUser(null);
    setToken(null);
  }}
>
  Logout
</button>;

>>>>>>> refs/remotes/origin/solveConfilct
