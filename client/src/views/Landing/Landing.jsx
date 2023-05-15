
import { Link } from "react-router-dom";



const Landing = ({ onSearch }) => {
 
  return (
    <div>
      <h1>Landing</h1>
      <h2>Aca deberia mostrar el boton para ir al home</h2>
      <h2>El boton para ir al home deberia mostrar el form del login</h2>
      <h2>Necesito:</h2>
      <h3>un fondo de pantalla</h3>
      <h3>Texto que explique de que se trata la web</h3>
      <button>
        <Link to="/login">Login</Link>
      </button>
    </div>
  );
};

export default Landing;
