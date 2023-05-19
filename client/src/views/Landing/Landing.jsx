import Login from "../../components/Login/Login";

import style from './Landing.module.css'

const Landing = ({ onSearch,login }) => {
 
  return (
    <div className={style.landingContainer}>

     <div className={style.textContainer}> 
      <h1>Landing</h1>
      <h2>Aca deberia mostrar el boton para ir al home</h2>
     </div>
    
    <Login login={login}/> 

    </div>
  );
};

export default Landing;
