//import { useContext } from 'react';
import Card from './Card';
import classes from './ToDoItem.module.css';


function ToDoItem(props) {
  

  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <img src={props.image} alt={props.title} />
        </div>
        <div className={classes.content}>
          <h3>{props.title}</h3>
          <address>{props.address}</address>
          <p>{props.description}</p>
        </div>
        <div className={classes.actions}>
          
        </div>
      </Card>
    </li>
  );
}

export default ToDoItem;
