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

export const createDog = (data) => {
  return async function () {
    const newDog = await axios.post("http://localhost:3001/dogs", data);
    console.log("el perro", newDog.config.data);
    console.log(
      "el temperamento del perro",
      JSON.parse(newDog.config.data).temperament
    );

    return newDog;
  };
};

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

//getAllDogs -> funcionando
//retorno una funcion asincrona donde:
//en apiData guardo la respuesta axios
//en dogs guardo la data
//hago dispatch para el reducer y envío en payload la data

//getDogDetail -> funcionando
//retorno una funcion asincrona donde:
//en apiData guardo la respuesta de la peticion de axios al servidor 3001 con el id
//retorno un dispatch para rel reducer , enviando en el payload la respuesta

//clearDetail
//despues de mostrar el detail, limpio el estado global
