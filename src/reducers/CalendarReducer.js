import { SET_LOADING_STATUS, GET_CALENDAR } from "../action/actionType";

export const initialState = {
  loading: false,
  calendars: [],
};

function CalendarReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CALENDAR:
      return {
        ...state,
        calendars: action.payload,
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

export default CalendarReducer;
