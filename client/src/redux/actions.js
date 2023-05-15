import { GET_ALL_DOGS,GET_DOG } from "./action-types";
import axios from 'axios';

export const getAllDogs = () => {
  return async function(dispatch){
    try {
      const apiData = await axios.get('/dogs')
      const dogs = apiData.data
      dispatch({type:GET_ALL_DOGS,payload:dogs})
    } catch (error) {
      console.log(error.message)
    }
  }
}
/* export const getAllDogs = () => {
  //obtener todos los perros en /dogs por medio de un get
  return (dispatch) => {
      axios.get("/dogs") //trae todos los perros
      .then(response => {
          dispatch({
              type: GET_ALL_DOGS,
              payload: response.data
          });
      })
        
      
  }   
} */

export const getDog = (idRaza) => {
  return async function(dispatch){
    try {
      const apiData = await axios.get(`https://api.thedogapi.com/v1/breeds/${idRaza}`)
      const dog = apiData.data;
      dispatch({type:GET_DOG,payload:dog})
    } catch (error) {
      
    }
  }
}