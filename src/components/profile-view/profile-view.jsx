import React, { useState, useEffect } from "react";

const ProfileView = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Get username from localStorage
        const username = localStorage.getItem("user")?.Username;

        if (username) {
          const response = await fetch(
            `https://movie-api-joud-a1d184147f81.herokuapp.com/users/${username}`
          );
          const userData = await response.json();
          setUserData(userData);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div>
      {userData ? (
        <div>
          <h2>User Profile</h2>
          <p>
            <strong>Username:</strong> {userData.Username}
          </p>
          <p>
            <strong>Password:</strong> {userData.Password}
          </p>
          <p>
            <strong>Email:</strong> {userData.Email}
          </p>
          <p>
            <strong>Birthday:</strong> {userData.Birthday}
          </p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProfileView;
