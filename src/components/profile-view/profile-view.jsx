import React, { useState, useEffect } from "react";
import { Col, Row, Container, Button, Card, Form } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";
import { useNavigate } from "react-router-dom";

export const ProfileView = ({ user, movies, setUser, removeFav, addFav }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setUsername(user.Username);
      setEmail(user.Email);
      setBirthday(user.Birthday);
    }
  }, [user]);

  const handleUpdate = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const data = {
      Username: username,
      Email: email,
      Birthday: birthday,
    };

    fetch(
      `https://movie-api-joud-a1d184147f81.herokuapp.com/users/${user.Username}`,
      {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then(async (response) => {
        if (response.ok) {
          const updatedUser = await response.json();
          localStorage.setItem("user", JSON.stringify(updatedUser));
          setUser(updatedUser);
          alert("Update was successful");
        } else {
          alert("Update failed");
        }
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  };

  const handleDelete = () => {
    const token = localStorage.getItem("token");
    fetch(
      `https://movie-api-joud-a1d184147f81.herokuapp.com/users/${user.Username}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ).then((response) => {
      if (response.ok) {
        setUser(null);
        alert("User has been deleted");
        localStorage.clear();
        navigate("/"); // go back to home page
      } else {
        alert("Something went wrong.");
      }
    });
  };

  const favoriteMovieList = movies
    ? movies.filter((movie) => user.FavoriteMovies.includes(movie._id))
    : [];

  return (
    <Container className="my-5">
      <Row>
        <Col md={4} className="text-center text-md-start ms-3">
          <Card>
            <Card.Body>
              <Card.Title>My Profile</Card.Title>
              <Card.Text>Username: {username}</Card.Text>
              <Card.Text>Email: {email}</Card.Text>
              <Card.Text>Birthday: {birthday}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={7} className="mt-5">
          <Form onSubmit={handleUpdate}>
            <Form.Group controlId="formUsername">
              <Form.Label>Username:</Form.Label>
              <Form.Control
                className="mb-3"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                minLength="5"
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                className="mb-3"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBirthday">
              <Form.Label>Birthday:</Form.Label>
              <Form.Control
                className="mb-2"
                type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
              />
            </Form.Group>
            <Button type="submit" className="mt-3 me-2">
              Update
            </Button>
            <Button
              onClick={handleDelete}
              className="mt-3 bg-danger border-danger text-white"
            >
              Delete User
            </Button>
          </Form>
        </Col>
      </Row>
      <Row>
        <h2 className="mt-5 text-center text-md-start">Favorite Movies</h2>
        <Row className="justify-content-center">
          {favoriteMovieList.length !== 0 ? (
            favoriteMovieList.map((movie) => (
              <Col
                sm={7}
                md={5}
                lg={3}
                xl={2}
                className="mx-2 mt-2 mb-5 col-6 similar-movies-img"
                key={movie._id}
              >
                <MovieCard
                  movie={movie}
                  removeFav={removeFav}
                  addFav={addFav}
                  isFavorite={user.FavoriteMovies.includes(movie._id)}
                />
              </Col>
            ))
          ) : (
            <Col>
              <p>There are no favorites Movies</p>
            </Col>
          )}
        </Row>
      </Row>
    </Container>
  );
};

export default ProfileView;
