import React, { useState, useEffect } from "react";
import { Col, Row, Container, Button, Card, Form } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";
import { useNavigate } from "react-router-dom";
import "./profile-view.scss";

export const ProfileView = ({ user, movies, setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setUsername(user.Username);
      setEmail(user.Email);
      const dateObject = new Date(user.Birthday);
      setBirthday(dateObject.toISOString().split("T")[0]);
    }
  }, [user]);

  const handleUpdate = (e) => {
    console.log("yo");
    e.preventDefault();
    const token = localStorage.getItem("token");
    const data = {
      Username: username,
      Password: password,
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
      .then((response) => response.json())
      .then((updatedUser) => {
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
        alert("Update was successful");
        console.log("yes", updatedUser);
      })
      .catch((error) => {
        alert("Update failed");
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

  return (
    <Container className="my-5">
      <Row>
        <Col md={4} className="text-center text-md-start ms-3">
          <Card>
            <Card.Body>
              <Card.Title>My Profile</Card.Title>
              <Card.Text>Username: {username}</Card.Text>
              <Card.Text>Password: {password}</Card.Text>
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
              <Form.Label>Password:</Form.Label>
              <Form.Control
                className="mb-3"
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
          {movies && movies.length > 0 ? (
            movies
              .filter(
                (movie) =>
                  user.FavoriteMovies && user.FavoriteMovies.includes(movie._id)
              )
              .map((movie) => (
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
                    onFavoriteToggle={() => {
                      const token = localStorage.getItem("token");
                      const isFavorite = user.FavoriteMovies.includes(
                        movie._id
                      );
                      const updatedUser = { ...user };
                      if (isFavorite) {
                        updatedUser.FavoriteMovies =
                          updatedUser.FavoriteMovies.filter(
                            (id) => id !== movie._id
                          );
                      } else {
                        updatedUser.FavoriteMovies.push(movie._id);
                      }
                      fetch(
                        `https://movie-api-joud-a1d184147f81.herokuapp.com/users/${user.Username}`,
                        {
                          method: "PUT",
                          body: JSON.stringify(updatedUser),
                          headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                          },
                        }
                      )
                        .then((response) => response.json())
                        .then((data) => {
                          setUser(data);
                        })
                        .catch((error) => {
                          console.error("Error:", error);
                        });
                    }}
                  />
                </Col>
              ))
          ) : (
            <Col>
              <p>There are no favorite movies.</p>
            </Col>
          )}
        </Row>
      </Row>
    </Container>
  );
};

export default ProfileView;
