import { useState } from "react";
import { getAllDogs, getDogByName } from "../../redux/actions";
import { useDispatch } from "react-redux";
import style from "./SearchBar.module.css";
import { useNavigate } from "react-router-dom";
import {RiSearchLine} from "react-icons/ri";


const SearchBar = () => {

  let [name, setName] = useState(""); // control del input
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (event) => {
    event.preventDefault();
    const value = event.target.value
    setName(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if(name) dispatch(getDogByName(name));
  };

  const handleResetSearch = (event) => {
    event.preventDefault();
    dispatch(getAllDogs());
    setName("");
    navigate('/home')
  }

  return (
    <div className={style.container}>
      
      {/* input de busqueda */}
      <input
        type="search"
        className={style.bar}
        onChange={handleChange}
        value={name}
        placeholder="Search a breed"
      />

      <div className={style.btnContainer}>
      {/* boton de busqueda */}
      <button onClick={handleSubmit} className={style.btnSearch}>
        <RiSearchLine/>
      </button>

      {/* boton de reinicio de busqueda, solo se activa si busqué algo */}
      {name && (
        <button onClick={handleResetSearch} className={style.btnReset}>
          Reset
        </button>
      )}
      </div>

    </div>
  );
};

export default SearchBar;
