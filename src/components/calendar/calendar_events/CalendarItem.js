import Card from "../../../action/Card";
import classes from "./CalendarItem.module.css";
import { useHistory } from "react-router-dom";
import db from "../../../firebase";

function CalendarItem(props) {
  const history = useHistory();
  const id = props.id;
  console.log(id);

  function changeDeleteState() {
    //console.log(props.id);
    db.collection("CLDDB")
      .doc(props.id)
      .delete()
      .then(() => {
        history.replace("/calendarevents");
      });
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
