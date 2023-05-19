import React, { useState } from "react";
import validation from "./validation";
import style from './Login.module.css'

const Login = ({ login }) => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

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
    <form onSubmit={handleSubmit} className={style.formContainer}>
      <div>
        <label htmlFor="email" className={style.labelInput}>Email:</label>
        <input
          type="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
          placeholder="nico@mail.com"
          className={style.input}
        />
        {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="password" className={style.labelInput}>Password:</label>
        <input
          type="password"
          name="password"
          value={userData.password}
          onChange={handleChange}
          placeholder="123456"
          className={style.input}
        />
      </div>

      {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
      <button type="submit" disabled={errors.email || errors.password}>
        Login
      </button>
    </form>
  );
};

export default Login;
