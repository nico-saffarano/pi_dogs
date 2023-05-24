import SearchBar from "../SearchBar/SearchBar.jsx";
import style from "./NavBar.module.css";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return <div>
     <SearchBar className={style.searchBar} />
     
      <button className={style.createBtn}>
        <NavLink className={style.linkCreate} to='/create'>Create</NavLink>
      </button>
  </div>;
};

export default NavBar;
