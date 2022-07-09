//import { useContext } from 'react';
import Card from "./Card";
import classes from "./CalendarItem.module.css";
import { useHistory } from "react-router-dom";

function CalendarItem(props) {
  const history = useHistory();
  const id = props.id;

  function changeDeleteState(props) {
    console.log("deleted");
    //props.completed = true;

    fetch(
      `https://the-last-coffee-default-rtdb.asia-southeast1.firebasedatabase.app/Calendar/${id}.json`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((json) => console.log(json))
      .then(() => {
        history.replace("/calendarevents");
      });
    this.setState("yeet");
  }
  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.content}>
          <h3>{props.title}</h3>
          {props.startDate}
          {props.startTime}

          <br />
          {props.endDate}
          {props.endTime}
          <br />
        </div>
        <button onClick={changeDeleteState}>Delete</button>
      </Card>
    </li>
  );
}

export default CalendarItem;
