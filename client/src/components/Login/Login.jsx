import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import validation from "./validation";

const Login = ({login}) => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });

    const validateErrors = validation({
      ...userData,
      [event.target.name]: event.target.value,
    });

    setErrors(validateErrors);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    login(userData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
        />
        {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          value={userData.password}
          onChange={handleChange}
        />
      </div>
      {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
      <button type="submit" disabled={errors.email || errors.password}>
        Iniciar Sesión
      </button>
    </form>
  );
};

export default Login;
