import Cards from "../../components/Cards/Cards";
import NavBar from "../../components/NavBar/NavBar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


import {
  getAllDogs,
  getTemperaments,
  filterByName,
  filterByWeight,
  FilterByTemperament,
  filterByOrigin,
} from "../../redux/actions";

const Home = ({ onSearch }) => {
  const dispatch = useDispatch();
  /*   const allDogs= useSelector(state=>state.dogs); */
  const allTemperaments = useSelector((state) => {
    return state.temperaments;
  });

  const handlerFilterByOrigin = async (event) => {
    await dispatch(getAllDogs());
    dispatch(filterByOrigin(event.target.value));
  };

  const handlerFilterByTemperament =async (event) => {
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

  useEffect(() => {
    dispatch(getAllDogs());
    dispatch(getTemperaments());
  }, [dispatch]);
  return (
    <div>
      <select onChange={handlerFilterByName}>
        <option>Order by name</option>
        <option value="A-Z">A-Z</option>
        <option value="Z-A">Z-A</option>
      </select>

      <select onChange={(event) => handlerFilterByWeight(event)}>
        <option>Order by weight</option>
        <option key={1} value="max_weight">
          Max
        </option>
        <option key={2} value="min_weight">
          Min
        </option>
      </select>

      <select onChange={handlerFilterByOrigin}>
        <option>Order by origin</option>
        <option key={1} value="all">
          All
        </option>
        <option key={2} value="db">
          Created
        </option>
        vent
        <option key={3} value="api">
          Api
        </option>
      </select>

      <select onChange={(event) => handlerFilterByTemperament(event)}>
        <option>Temperaments</option>
        <option key={1 + "e"} value="All">
          All
        </option>
        {allTemperaments.map((temp) => (
          <option value={temp.name} key={temp.id}>
            {temp.name}
          </option>
        ))}
      </select>
      <NavBar onSearch={onSearch} />
      <Cards />
    </div>
  );
};

export default Home;
