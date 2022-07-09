//import { useContext } from 'react';
import Card from "./Card";
import classes from "./ToDoItem.module.css";
import { useHistory } from "react-router-dom";

function ToDoItem(props) {
  const history = useHistory();
  const userUID = props.userUID;
  const id = props.id;
  console.log(props.id);

  /*
  const mPostReference = FirebaseDatabase.getInstance().getReference()
                        .child("quotes").child(mPostKey);
                mPostReference.removeValue();
  */

  function changeDoneState(props) {
    console.log("changed");
    //props.completed = true;
    fetch(
      `https://the-last-coffee-default-rtdb.asia-southeast1.firebasedatabase.app/todolist/${id}.json`,
      {
        method: "PATCH",
        body: JSON.stringify({
          completed: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((json) => console.log(json))
      .then(() => {
        history.replace("/todolist");
      });
  }
  function changeDeleteState(props) {
    console.log("deleted");
    //props.completed = true;

    fetch(
      `https://the-last-coffee-default-rtdb.asia-southeast1.firebasedatabase.app/todolist/${id}.json`,
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
        history.replace("/todolist");
      });
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
