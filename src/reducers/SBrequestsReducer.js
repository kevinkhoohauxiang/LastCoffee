import { SET_LOADING_STATUS, GET_SB_REQ } from "../action/actionType";

export const initialState = {
  loading: false,
  SBrequests: [],
};

function SBrequestsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SB_REQ:
      return {
        ...state,
        SBrequests: action.payload,
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

export default SBrequestsReducer;
