import { SET_LOADING_STATUS, GET_MY_SB } from "../action/actionType";

export const initialState = {
  loading: false,
  mySBs: [],
};

function mySBReducer(state = initialState, action) {
  switch (action.type) {
    case GET_MY_SB:
      return {
        ...state,
        mySBs: action.payload,
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

export default mySBReducer;
