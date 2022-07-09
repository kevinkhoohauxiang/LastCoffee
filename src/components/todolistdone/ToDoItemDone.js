//import { useContext } from 'react';
import Card from "./Card";
import classes from "./ToDoItem.module.css";
import { useHistory } from "react-router-dom";

function ToDoItemDone(props) {
  const history = useHistory();
  const userUID = props.userUID;
  const id = props.id;
  console.log(props.id);
  console.log(userUID);

  /*
  const mPostReference = FirebaseDatabase.getInstance().getReference()
                        .child("quotes").child(mPostKey);
                mPostReference.removeValue();
  */

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
        history.replace("/todolistdone");
      });
    //this.setState("yeet");
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
