//import { useContext } from 'react';
import Card from "../../../action/Card";
import classes from "./ToDoItem.module.css";
import db from "../../../firebase";

function ToDoItemDone(props) {
  const userUID = props.userUID;
  console.log(props.id);
  console.log(userUID);

  function changeDeleteState() {
    db.collection("TDLDB").doc(props.id).delete();
  }

  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.content}>
          <h3>{props.title}</h3>
          Deadline: {props.deadline}
          <br />
          {props.completed}
          {props.description}
        </div>

        <img src="/images/checkbox.svg" onClick={changeDeleteState} />
      </Card>
    </li>
  );
}

export default ToDoItemDone;
