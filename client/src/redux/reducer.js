import { GET_ALL_DOGS } from "./action-types";

const initialState={
  dogs:[]
}


const reducer = (state=initialState,action) => {
  switch (action.type) {
    case GET_ALL_DOGS:
      return({
        ...state,
        dogs:action.payload
      })
    
    default:return{...state};
  }
}

export default reducer;