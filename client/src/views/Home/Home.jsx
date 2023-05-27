import Cards from "../../components/Cards/Cards";
import NavBar from "../../components/NavBar/NavBar";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./Home.module.css";
import logo from "../../assets/svg/logo.svg";
import loader from "../../assets/loader/loader.gif";
import { NavLink } from "react-router-dom";

import {
  getAllDogs,
  getTemperaments,
  filterByName,
  filterByWeight,
  FilterByTemperament,
  filterByOrigin,
} from "../../redux/actions";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  const dispatch = useDispatch();

  const allTemperaments = useSelector((state) => {
    return state.temperaments;
  });

  const handlerFilterByOrigin = async (event) => {
    await dispatch(getAllDogs());
    dispatch(filterByOrigin(event.target.value));
  };

  const handlerFilterByTemperament = async (event) => {
    event.preventDefault();
    await dispatch(getAllDogs());
    dispatch(FilterByTemperament(event.target.value));
  };

  const handlerFilterByName = (event) => {
    dispatch(filterByName(event.target.value));
  };

  const handlerFilterByWeight = (event) => {
    dispatch(filterByWeight(event.target.value));
  };

  const handleResetFilters = () => {
    dispatch(getAllDogs());
  };

  useEffect(() => {
    setIsLoading(true);
    dispatch(getAllDogs());
    dispatch(getTemperaments());
    setTimeout(() => {
      setIsLoading(false); // Establecer isLoading en false después del retraso
    }, 1500);
  }, [dispatch]);
  
  return (
    <div>
      {isLoading ? (
        <div className={style.loaderContainer}>
          <img className={style.loader} src={loader} alt="Loading..." />
        </div>
      ) : (
        <div>
          <div className={style.filterContainer}>
            <NavLink to="/">
              <img className={style.logo} src={logo} alt="" />
            </NavLink>
            <select className={style.select} onChange={handlerFilterByName}>
              <option className={style.option}>Order by name</option>
              <option className={style.option} value="A-Z">
                A-Z
              </option>
              <option className={style.option} value="Z-A">
                Z-A
              </option>
            </select>

            <select
              className={style.select}
              onChange={(event) => handlerFilterByWeight(event)}
            >
              <option className={style.option}>Order by weight</option>
              <option className={style.option} key={1} value="max_weight">
                Max
              </option>
              <option className={style.option} key={2} value="min_weight">
                Min
              </option>
            </select>

            <select className={style.select} onChange={handlerFilterByOrigin}>
              <option className={style.option}>Order by origin</option>
              <option className={style.option} key={1} value="all">
                All
              </option>
              <option className={style.option} key={2} value="db">
                Created
              </option>

              <option className={style.option} key={3} value="api">
                Api
              </option>
            </select>

            <select
              className={style.select}
              onChange={(event) => handlerFilterByTemperament(event)}
            >
              <option className={style.option}>Temperaments</option>
              <option className={style.option} key={1 + "e"} value="All">
                All
              </option>
              {allTemperaments.map((temp) => (
                <option
                  className={style.option}
                  value={temp.name}
                  key={temp.id}
                >
                  {temp.name}
                </option>
              ))}
            </select>
            <button className={style.resetButton} onClick={handleResetFilters}>
              Reset Filters
            </button>
            <NavBar />
          </div>
          <Cards />
        </div>
      )}
    </div>
  );
};

export default Home;

/* Documentacion

estado local isLoading -> para controlar si se está cargando la información o no, y se inicializa en true
useDispatch de react-redux para despachar acciones en el store de redux
useSelector de React Redux para obtener el estado temperaments desde el store de redux y guardarlo en allTemperaments
handlers para los diferentes filtros -> se utilizan para despachar acciones en el store de Redux cuando se selecciona una option de algun <select>.
useEffect para cargar los perros y los temperamentos una vez que el componente esté montado.Se setea isLoading en true para mostrar el cargador. 
Se despachan las acciones getAllDogs y getTemperaments para obtener los perros y los temperamentos

Se renderiza el componente:
Si isLoading es true, se muestra un loader. 
si isLoading es false, se muestra el componente.
El contenedor de filtros contiene un <select> para cada filtro y un botón de reinicio de filtros
El componente Cards se renderiza dentro del componente Home y es responsable de mostrar la información de las tarjetas de los perros.
 */