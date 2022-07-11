import { useHistory } from "react-router-dom";
import NewCalendarForm from "./NewCalendarForm";
import db from "../../../firebase";

function NewCalendarPage(props) {
  const history = useHistory();
  const userUID = props.userUID;

  function addCalendarHandler(CalendarData) {
    db.collection("CLDDB")
      .add(CalendarData)
      .then(() => {
        history.replace("/mycalendar");
      });
  }

  // dates are parsed as a string to the database. when we query the date from the db, we need to
  // convert the string to a date class using a function in index.js
  return (
    <section>
      <h1>Add New Calendar Event</h1>
      <NewCalendarForm onAddCalendar={addCalendarHandler} userUID={userUID} />
    </section>
  );
}

export default NewCalendarPage;
