import { useState } from "react";
import style from "./SearchBar.module.css";

const SearchBar= ({ onSearch }) => {
  let [id, setId] = useState("");

  const handleChange = (event) => {
    setId(event.target.value);
  };

  return (
    <div className={style.container}>
      <input //input para buscar las razas de perros
        type="search"
        className={style.input}
        onChange={handleChange}
        value={id}
      />
      {/* boton de busqueda */}
      <button onClick={()=>onSearch(id)} className={style.button}>
        Agregar
      </button>
    </div>
  );
}

export default SearchBar;