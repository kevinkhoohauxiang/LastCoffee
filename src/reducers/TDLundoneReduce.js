import { SET_LOADING_STATUS, GET_TDL_UNDONE } from "../action/actionType";

export const initialState = {
  loading: false,
  TDLundone: [],
};

function TDLundoneReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TDL_UNDONE:
      return {
        ...state,
        TDLundone: action.payload,
        ids: action.id,
      };
    case SET_LOADING_STATUS:
      return {
        ...state,
        loading: action.status,
      };
    default:
      return state;
  }
}

export default TDLundoneReducer;
