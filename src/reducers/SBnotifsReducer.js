import { SET_LOADING_STATUS, GET_SB_NOTIFS } from "../action/actionType";

export const initialState = {
  loading: false,
  SBnotifs: [],
};

function SBnotifsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SB_NOTIFS:
      return {
        ...state,
        SBnotifs: action.payload,
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

export default SBnotifsReducer;
