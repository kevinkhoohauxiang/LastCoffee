import Card from "../../../action/Card";
import classes from "./ToDoItem.module.css";
import db from "../../../firebase";

function ToDoItem(props) {
  function changeDoneState() {
    console.log("changed");
    //props.completed = true;
    db.collection("TDLDB").doc(props.id).update({
      completed: true,
    });
  }
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
        <button onClick={changeDoneState}>Done</button>
        <button onClick={changeDeleteState}>Delete</button>
      </Card>
    </li>
  );
}

export default ToDoItem;
