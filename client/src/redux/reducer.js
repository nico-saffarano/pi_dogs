import {
  GET_ALL_DOGS,
  GET_DOG_DETAIL,
  CLEAR_DETAIL,
  GET_DOG_BY_NAME,
  GET_TEMPERAMENTS,
  CREATE_DOG_SUCCESS,
  CREATE_DOG_FAILURE,
  FILTER_BY_NAME,
  FILTER_BY_WEIGHT,
  FILTER_BY_TEMPERAMENT,
  FILTER_BY_ORIGIN,
} from "./action-types";

const initialState = {
  allDog: [],
  dogs: [],
  dogDetail: [],
  temperaments: [],
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_DOGS:
      return {
        ...state,
        dogs: action.payload,
        allDogs: action.payload,
      };
    case GET_DOG_DETAIL:
      return {
        ...state,
        dogDetail: action.payload,
      };
    case GET_DOG_BY_NAME:
      return {
        ...state,
        dogs: action.payload,
      };
    case CLEAR_DETAIL:
      return {
        ...state,
        dogDetail: [],
      };
    case GET_TEMPERAMENTS:
      return {
        ...state,
        temperaments: action.payload,
      };
      case CREATE_DOG_SUCCESS:
        return {
          ...state,
          dog: action.payload,
          error: null,
        };
      case CREATE_DOG_FAILURE:
        return {
          ...state,
          dog: null,
          error: action.payload,
        };

    case FILTER_BY_NAME:
      let dogs = state.dogs;
      let dogsList = [];
      let orderedDogs = [];
      if (action.payload === "All") {
        dogsList = dogs;
      } else {
        dogsList =
          action.payload === "A-Z"
            ? state.dogs.sort((a, b) => {
                if (a.name > b.name) {
                  return 1;
                }
                if (b.name > a.name) {
                  return -1;
                }
                return 0;
              })
            : state.dogs.sort((a, b) => {
                if (a.name > b.name) {
                  return -1;
                }
                if (b.name > a.name) {
                  return 1;
                }
                return 0;
              });
      }
      dogsList.forEach((dog) => {
        orderedDogs.push(dog);
      });

      return {
        ...state,
        dogs: orderedDogs,
      };

    case FILTER_BY_WEIGHT:
      const dogsByWeight = state.dogs.filter(
        (dog) => dog.weight_min !== undefined
      );
      const filterWeight =
        action.payload === "min_weight"
          ? dogsByWeight.sort((a, b) => {
              return a.weight_min - b.weight_min;
            })
          : dogsByWeight
              .sort((a, b) => {
                return a.weight_min - b.weight_min;
              })
              .reverse();

      return {
        ...state,
        dogs: filterWeight,
      };

    case FILTER_BY_TEMPERAMENT:
      const allDogs = state.dogs;
      let filterDogsTemp = [];
      if (action.payload === "All") {
        filterDogsTemp = allDogs;
      } else {
        allDogs.forEach((dog) => {
          let found = dog.temperament?.includes(action.payload);
          if (found) {
            filterDogsTemp.push(dog);
          }
        });
      }

      return {
        ...state,
        dogs: filterDogsTemp,
      };

    case FILTER_BY_ORIGIN:
      const todosPerros = state.dogs;
      let filterDogsData = [];
      if (action.payload === "all") {
        filterDogsData = todosPerros;
      } else if (action.payload === "api") {
        todosPerros.forEach((dog) => {
          if (typeof dog.id === "number") {
            filterDogsData.push(dog);
          }
        });
      } else {
        todosPerros.forEach((dog) => {
          if (isNaN(dog.id)) {
            filterDogsData.push(dog);
          }
        });
      }

      return {
        ...state,
        dogs: filterDogsData,
      };

    default:
      return { ...state };
  }
};

export default reducer;


/* 

Case GET_ALL_DOGS -> funcionando
Se actualiza el estado con la lista completa de perros obtenida desde action.payload.
dogs y allDogs se establecen como action.payload.

Case GET_DOG_DETAIL -> funcionando
Se actualiza el estado con los detalles de un perro específico obtenidos desde action.payload.
dogDetail se establece como action.payload.

Case GET_DOG_BY_NAME -> funcionando
Se actualiza el estado con una lista de perros filtrada por nombre, obtenida desde action.payload.
dogs se establece como action.payload.

Case CLEAR_DETAIL -> funcionando
Se limpia la información de dogDetail, estableciéndolo como un arreglo vacío.

Case GET_TEMPERAMENTS -> funcionando
Se actualiza el estado con la lista de temperamentos de perros obtenida desde action.payload.
temperaments se establece como action.payload

Case CREATE_DOG_SUCCESS -> funcionando
Se actualiza el estado con los detalles de un nuevo perro creado exitosamente, obtenidos desde action.payload.
dog se establece como action.payload.
error se establece como null.

Case CREATE_DOG_FAILURE-> funcionando
Se actualiza el estado en caso de que ocurra un error al crear un perro.
dog se establece como null.
error se establece como action.payload, que contiene el mensaje de error.

Case FILTER_BY_NAME -> funcionando
Se realiza una filtración de la lista de perros (state.dogs) basada en el nombre.
Si el valor de action.payload es "All", no se aplica ningún filtro y se establece dogs como la lista original.
Si el valor es "A-Z", se ordena la lista de perros de forma ascendente según el nombre.
Si el valor es "Z-A", se ordena la lista de perros de forma descendente según el nombre.

sort:
Si payload = a A-Z:
Se compara el nombre de dos perros, a y b.
Si el nombre de a > nombre de b,devuelve 1. Esto indica que a debe colocarse después de b en el orden ascendente.
Si el nombre de b > nombre de a,devuelve -1. Esto indica que a debe colocarse antes de b en el orden ascendente.
Si los nombres son iguales, se devuelve 0. Esto significa que el orden entre a y b no cambia.

Si payload != A-Z:
Se realiza el mismo proceso que el anterior, pero al reves
Si el nombre de a > nombre de b, devuelve -1. Esto indica que a debe colocarse antes de b en el orden descendente.
Si el nombre de b > nombre de a, devuelve 1. Esto indica que a debe colocarse después de b en el orden descendente.

Case FILTER_BY_WEIGHT -> funcionando
Se realiza una filtración de la lista de perros (state.dogs) basada en el peso mínimo.
Se crea una nueva lista llamada dogsByWeight que contiene solo los perros que tienen un peso mínimo definido.
Si el valor de action.payload es "min_weight", se ordena la lista dogsByWeight de forma ascendente según el peso mínimo.
Si el valor es distinto de "min_weight", se ordena la lista de forma descendente según el peso mínimo.
El resultado se asigna a filterWeight.
Finalmente, se actualiza el estado con dogs establecido como filterWeight

Case FILTER_BY_TEMPERAMENT -> funcionando
Se realiza una filtración de la lista de perros (state.dogs) basada en el temperamento.
Si el valor de action.payload es "All", no se aplica ningún filtro y se establece filterDogsTemp como la lista original.
Para cada perro en allDogs, se verifica si el temperamento incluye el valor de action.payload.
Si es así, se agrega el perro a la lista filterDogsTemp.
Al finalizar, se actualiza el estado con dogs establecido como filterDogsTemp

Case FILTER_BY_ORIGIN -> funcionando
Se realiza una filtración de la lista de perros (state.dogs) basada en el origen.
Si el valor de action.payload es "all", no se aplica ningún filtro y se establece filterDogsData como la lista original.
Si el valor es "api", se agregan a filterDogsData solo los perros que tienen un id numérico.
Si el valor es distinto de "api" (suponiendo que sea "database" en este caso), se agregan a filterDogsData solo los perros que tienen un id no numérico.
Al finalizar, se actualiza el estado con dogs establecido como filterDogsData.

Case default 
Si ninguna de las acciones coincide con los casos anteriores, se devuelve el estado actual sin cambios.
*/