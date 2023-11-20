import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "Good Bye, Lenin!",
      description:
        "In 1990, to protect his fragile mother from a fatal shock after a long coma, a young man must keep her from learning that her beloved nation of East Germany as she knew it has disappeared.",
      director: "Wolfgang Becker",
      genre: "Drama",
      image:
        "https://upload.wikimedia.org/wikipedia/en/6/63/Good_Bye_Lenin.jpg",
    },
    {
      id: 2,
      title: "The Post",
      description:
        "The Post is a 2017 American semi-fiction historical political thriller film about The Washington Post and the publication of the Pentagon Papers.",
      director: "Steven Spielberg",
      genre: "Historical drama",
      image:
        "https://upload.wikimedia.org/wikipedia/en/0/0b/The_Post_%28film%29.png",
    },
    {
      id: 3,
      title: "Perfume",
      description:
        "Set in 18th century Paris, the story of a man with an extraordinarily acute sense of smell takes a dark turn when his quest to create the ultimate fragrance leads to murder.",
      director: "John Carpenter",
      genre: "Crime Fiction",
      image: "https://upload.wikimedia.org/wikipedia/en/c/cd/Les_parfums.jpg",
    },
  ]);

  const [selectedMovie, setselectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setselectedMovie(null)}
      />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setselectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};
