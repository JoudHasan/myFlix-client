import React, { useState } from "react";

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
<<<<<<< Updated upstream
      Username: username,
      Password: password,
    };

    fetch("https://movie-api-joud-a1d184147f81.herokuapp.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
=======
      access: username,
      secret: password,
    };

    fetch("https://openlibrary.org/account/login.json", {
      method: "POST",
>>>>>>> Stashed changes
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Login response: ", data);
        if (data.user) {
          // Store user and token in localStorage
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);

          onLoggedIn(data.user, data.token);
        } else {
          alert("No such user");
        }
      })
      .catch((e) => {
<<<<<<< Updated upstream
        console.log(e);
=======
>>>>>>> Stashed changes
        alert("Something went wrong");
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          maxLength="9"
          required
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};