import SearchBar from "../SearchBar/SearchBar.jsx";
import style from "./NavBar.module.css";
import { NavLink } from "react-router-dom";
import { FaDog } from "react-icons/fa";

const NavBar = () => {
  return <div>
     <SearchBar className={style.searchBar} />
     
      <button className={style.createBtn}>
        <NavLink className={style.linkCreate} to='/create'>Create{<FaDog/>}</NavLink>
      </button>
  </div>;
};

export default NavBar;
