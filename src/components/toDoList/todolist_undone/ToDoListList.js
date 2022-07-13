import ToDoItem from "./ToDoItem";
import classes from "./ToDoList.module.css";

function ToDoListList(props) {
  if (props.events.length === 0) {
    console.log(props.events.length);
    return <h2>No events!</h2>;
  } else {
    return (
      <ul className={classes.list}>
        {props.events.map((event) => (
          <ToDoItem
            key={event.id}
            id={event.id}
            userUID={event.userUID}
            deadline={event.deadline}
            title={event.title}
            completed={event.completed}
            description={event.description}
          />
        ))}
      </ul>
    );
  }
}

export default ToDoListList;
