import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import style3 from '../Styles/register.module.css'; // Import CSS module

function Register() {
  const [userdata, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "USER",
  });

  const changehandler = (e) => {
    setUserData({ ...userdata, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/test", userdata);
      console.log(response.data);
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <div className={style3.registerContainer}>
      <div className={style3.registerOverlay}></div>
      <div className={style3.registerWrapper}>
        <h2 className={style3.registerHeading}>Register</h2>
        <form className={style3.registerForm} onSubmit={handleRegister}>
          <input
            type="text"
            className={style3.registerInput}
            placeholder="Full Name"
            name="name"
            value={userdata.name}
            onChange={changehandler}
            required
          />
          <input
            type="email"
            className={style3.registerInput}
            placeholder="Email"
            name="email"
            value={userdata.email}
            onChange={changehandler}
            required
          />
          <input
            type="password"
            className={style3.registerInput}
            placeholder="Password"
            name="password"
            value={userdata.password}
            onChange={changehandler}
            required
          />
          <input
            type="text"
            className={style3.registerInput}
            placeholder="Phone Number"
            name="phone"
            value={userdata.phone}
            onChange={changehandler}
            required
          />
          <select
            name="role"
            className={style3.registerSelect}
            value={userdata.role}
            onChange={changehandler}
            required
          >
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
          </select>
          <button type="submit" className={style3.registerButton}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
