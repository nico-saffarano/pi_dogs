import About from "../../components/About/About";
import Login from "../../components/Login/Login";

import style from "./Landing.module.css";

const Landing = ({ login }) => {
  return (
    <div className={style.landingContainer}>
      <About />

      <div className={style.textContainer}>
        <h4 className={style.miniTitle}>Let’s take a walk through</h4>
        <h1 className={style.mainTitle}>Dog Planet</h1>
      </div>

      <Login className={style.loginForm} login={login} />
    </div>
  );
};

export default Landing;
