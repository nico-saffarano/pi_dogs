import { NavLink } from "react-router-dom";
import { useState } from "react";
import Login from "../../components/Login/Login";
import logo from '../../assets/svg/logo.svg'

import style from "./Landing.module.css";

const Landing = ({ login }) => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  
 

  const handleLoginButtonClick = () => {
    setShowLoginForm(true);
    
  };
  return (
    <div className={style.landingContainer}>
      <div className={style.barContainer}>
        <NavLink className={style.link} to="/about">
          About the page
        </NavLink>
        <NavLink className={style.link} to="/contact">
          Contac me
        </NavLink>
      </div>

      <div className={style.textContainer}>
        <h4 className={style.miniTitle}>Let’s take a walk through</h4>
        <img src={logo} className={style.mainTitle} alt="Dog Planet" />
      </div>
      {!showLoginForm && (<button className={style.btnShowLogin} onClick={handleLoginButtonClick}>Go Home</button>)}
      {showLoginForm && <Login className={style.loginForm} login={login} />}
      
    </div>
  );
};

export default Landing;
