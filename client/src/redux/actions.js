import {
  GET_ALL_DOGS,
  GET_DOG_DETAIL,
  CLEAR_DETAIL,
  GET_DOG_BY_NAME,
  GET_TEMPERAMENTS,
  FILTER_BY_NAME,
  FILTER_BY_WEIGHT,
  FILTER_BY_TEMPERAMENT,
  FILTER_BY_ORIGIN,
  CREATE_DOG_SUCCESS,
  CREATE_DOG_FAILURE
} from "./action-types";
import axios from "axios";

export const getAllDogs = () => {
  return async function (dispatch) {
    try {
      const apiData = await axios.get("http://localhost:3001/dogs");
      const dogs = apiData.data;
      dispatch({ type: GET_ALL_DOGS, payload: dogs });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const getDogDetail = (id) => {
  return async function (dispatch) {
    try {
      const apiData = await axios.get(`http://localhost:3001/dogs/${id}`);
      return dispatch({ type: GET_DOG_DETAIL, payload: apiData.data });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const clearDetail = () => {
  return {
    type: CLEAR_DETAIL,
  };
};

export const getDogByName = (name) => {
  return async function (dispatch) {
    try {
      var apiData = await axios.get(`http://localhost:3001/dogs?name=${name}`);
      return dispatch({
        type: GET_DOG_BY_NAME,
        payload: apiData.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export function getTemperaments() {
  return async function (dispatch) {
    const apiData = await axios.get("http://localhost:3001/temperaments");
    return dispatch({
      type: GET_TEMPERAMENTS,
      payload: apiData.data,
    });
  };
}

export const filterByName = (payload) => {
  return {
    type: FILTER_BY_NAME,
    payload,
  };
};

export const filterByWeight = (payload) => {
  return {
    type: FILTER_BY_WEIGHT,
    payload,
  };
};

export const FilterByTemperament = (temperament) => {
  return {
    type: FILTER_BY_TEMPERAMENT,
    payload: temperament,
  };
};

export const filterByOrigin = (origin) => {
  return {
    type: FILTER_BY_ORIGIN,
    payload: origin,
  };
};


export const createDog = (dogData) => {
  return (dispatch) => {
    axios
      .post('http://localhost:3001/dogs', dogData)
      .then((response) => {
        dispatch({
          type: CREATE_DOG_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: CREATE_DOG_FAILURE,
          payload: error.message,
        });
      });
  };
};



/* Documentacion

getAllDogs -> funcionando 
hace una peticion de tipo get a la api con axios para traer todos los perros 
Luego, se hace dispatch de una action para el reducer y se pasa en el payload los datos de los perros obtenidos. 

getDogDetail -> funcionando
Recibe el id del perro por parametrp y hace una peticion de tipo get a la api con axios
Se hace dispatch de una action y se pasa en el payload los datos del perro obtenido

clearDetail -> funcionando
Devuelve una action que es un objeto 
Se utiliza para indicar que se deben borrar los detalles del perro almacenados en el estado global.

getDogByName -> funcionando
Recibe el nombre del perro por parametro y hace una peticion de tipo get a la api con axios. 
La URL utilizada es "http://localhost:3001/dogs?name={name}", donde {name} se reemplaza con el nombre que viene por parametro 
Se hace dispatch de una action y se pasa en el payload los datos de los perros encontrados.

getTemperaments -> funcionando 
Se hace una peticion de tipo get a la api con axios
Se hace dispatch de una action y se pasa como payload los datos de los temperamentos obtenidos.

filterByName -> funcionando
Para filtrar los perros por nombre. 
Recibe un payload por parametro, que representa el nombre utilizado para filtrar. 
Retorna una action y pasa el parametro payload en el payload .

filterByWeight -> funcionando 
Para filtrar los perros por peso. 
Recibe un argumento payload, que representa el peso utilizado para filtrar. 
Retorna una action y pasa el parametro payload en el payload.

FilterByTemperament -> funcionando
Para filtrar los perros por temperamento 
Recibe un argumento temperament, que representa el temperamento utilizado para filtrar. 
Retorna una action y pasa el temperament como payload.

filterByOrigin -> funcionando
Para filtrar los perros por origen. 
Recibe un argumento origin, que representa el origen utilizado para filtrar. 
Retorna una action y pasa el origin como payload.

createDog -> funcionando
Crea un nuevo perro
Recibe los datos del perro como argumento dogData. 
Hace una peticion de tipo POST a la URL
*/
