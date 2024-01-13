import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
<<<<<<< Updated upstream
import { SignupView } from "../SignupView/SignupView.jsx";

export const MainView = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const storedToken = localStorage.getItem("token");
=======

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
>>>>>>> Stashed changes
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
<<<<<<< Updated upstream
    if (!storedToken) {
=======
    if (!token) {
>>>>>>> Stashed changes
      return;
    }

    fetch("https://movie-api-joud-a1d184147f81.herokuapp.com/movies", {
<<<<<<< Updated upstream
      headers: { Authorization: `Bearer ${storedToken}` },
=======
      headers: { Authorization: `Bearer ${token}` },
>>>>>>> Stashed changes
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

  if (!user) {
    return (
<<<<<<< Updated upstream
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
=======
      <LoginView
        onLoggedIn={(user, token) => {
          setUser(user);
          setToken(token);
        }}
      />
>>>>>>> Stashed changes
    );
  }

  if (selectedMovie) {
    const similarMovies = movies.filter((movie) => {
      return (
        movie._id.toString() !== selectedMovie._id.toString() &&
        movie.Genre.Name === selectedMovie.Genre.Name
      );
    });

    if (similarMovies.length === 0) {
      return (
        <>
          <MovieView
            movie={selectedMovie}
            onBackClick={() => setSelectedMovie(null)}
          />
          <br />
          <h2>Similar Movies</h2>
          <p>There are no similar movies.</p>
        </>
      );
    } else {
      return (
        <>
          <MovieView
            movie={selectedMovie}
            onBackClick={() => setSelectedMovie(null)}
          />
          <br />
          <h2>Similar Movies</h2>
          {similarMovies.map((movie) => (
            <MovieCard
              key={movie._id}
              movie={movie}
              onMovieClick={(newSelectedMovie) => {
                setSelectedMovie(newSelectedMovie);
              }}
            />
          ))}
        </>
      );
    }
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
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};

<button
  onClick={() => {
    setUser(null);
    setToken(null);
<<<<<<< Updated upstream
=======
    localStorage.clear();
>>>>>>> Stashed changes
  }}
>
  Logout
</button>;
