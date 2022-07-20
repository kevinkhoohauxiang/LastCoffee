import { SET_LOADING_STATUS, GET_TDL_DONE } from "../action/actionType";

export const initialState = {
  loading: false,
  TDLdone: [],
};

function TDLdoneReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TDL_DONE:
      return {
        ...state,
        TDLdone: action.payload,
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

export default TDLdoneReducer;
