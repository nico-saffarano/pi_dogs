import {
  GET_ALL_DOGS,
  GET_DOG_DETAIL,
  CLEAR_DETAIL,
  GET_DOG_BY_NAME,
  GET_TEMPERAMENTS,
  CREATE_DOG,
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
    case CREATE_DOG:
      return {
        ...state,
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
