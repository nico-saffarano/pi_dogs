import SearchBar from "../SearchBar/SearchBar.jsx";
import styles from "./NavBar.module.css";
import { Link } from "react-router-dom";

const NavBar = () => {
  return <div>
     <SearchBar className={styles.searchBar} />
      <button>
        <Link to="/about">About</Link>
      </button>
      <button>
        <Link to="/home">Home</Link>
      </button>
      <button>
        <Link to='/favorites'>Favorites</Link>
      </button>
      <button>
        <Link to='/create'>Crear</Link>
      </button>
  </div>;
};

export default NavBar;
