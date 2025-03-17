import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import style3 from '../Styles/login.module.css'; // Import the CSS module

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Fetch the list of users
      const response = await axios.get("http://localhost:8080/api/users");
      const users = response.data; // This is an array

      // Find the user with the entered email
      const user = users.find(u => u.email === email);

      if (!user) {
        setError("User not found.");
        return;
      }

      // Validate password and role
      if (user.password === password) {
        if (user.role === role) {
          if (role === "ADMIN") {
            navigate("/admin");
          } else {
            navigate("/search");
          }
        } else {
          setError("Role mismatch.");
        }
      } else {
        setError("Invalid password.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className={style3.loginContainer}>
      <h2 className={style3.loginHeading}>Login</h2>
      <form className={style3.loginForm} onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={style3.loginInput}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={style3.loginInput}
          required
        />
        <select
          name="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className={style3.loginSelect}
          required
        >
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
        </select>
        <button type="submit" className={style3.loginButton}>Login</button>
        {error && <p className={style3.errorMessage}>{error}</p>}
      </form>
    </div>
  );
}

export default Login;