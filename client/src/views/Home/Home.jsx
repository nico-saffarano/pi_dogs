import Cards from "../../components/Cards/Cards";
import NavBar from "../../components/NavBar/NavBar";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllDogs } from "../../redux/actions";


const Home = ({onSearch}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllDogs());
  },[])
  return (
    <div>
      <NavBar/>
     <Cards/>
    </div>
  )
}

export default Home;