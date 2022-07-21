import { combineReducers } from "redux";
import userReducer from "./userReducer";
import articleReducer from "./articleReducer";
import TDLdoneReducer from "./TDLdoneReducer";
import TDLundoneReducer from "./TDLundoneReduce";
import CalendarReducer from "./CalendarReducer";
import mySBReducer from "./mySBReducer";
import SBrequestsReducer from "./SBrequestsReducer";
import SBnotifsReducer from "./SBnotifsReducer";

const rootReducer = combineReducers({
  userState: userReducer,
  articleState: articleReducer,
  TDLdoneState: TDLdoneReducer,
  TDLundoneState: TDLundoneReducer,
  calendarState: CalendarReducer,
  mySBState: mySBReducer,
  SBrequestsState: SBrequestsReducer,
  SBnotifsState: SBnotifsReducer,
});

export default rootReducer;
