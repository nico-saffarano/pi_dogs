import { useState } from "react";
import { getDogByName } from "../../redux/actions";
import { useDispatch } from "react-redux";
import style from "./SearchBar.module.css";

const SearchBar = () => {

  let [name, setName] = useState(""); // control del input
  const dispatch = useDispatch();

  const handleChange = (event) => {
    event.preventDefault();
    setName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if(name) dispatch(getDogByName(name));
    setName('');
  };

  return (
    <div className={style.container}>
      <input //input para buscar las razas de perros
        type="search"
        className={style.input}
        onChange={handleChange}
        value={name}
      />
      {/* boton de busqueda */}
      <button onClick={handleSubmit} className={style.button}>
        Agregar
      </button>
    </div>
  );
};

export default SearchBar;
