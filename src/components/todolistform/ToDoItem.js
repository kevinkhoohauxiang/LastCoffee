//import { useContext } from 'react';
import Card from './Card';
import classes from './ToDoItem.module.css';


function ToDoItem(props) {

  /*
  const mPostReference = FirebaseDatabase.getInstance().getReference()
                        .child("quotes").child(mPostKey);
                mPostReference.removeValue();
  */

  function changeState(props) {
    console.log("changed")
    props.completed = true;
    console.log(props.completed)
  }
  

  return (
    <li className={classes.item}>
      <Card>
        
        <div className={classes.content}>
          <h3>{props.title}</h3>
          {props.deadline}
          <br/>
          {props.completed}
          {props.description}
        </div>
        <button onClick={changeState}>Done</button>
        
      </Card>
    </li>
  );
}

export default ToDoItem;
