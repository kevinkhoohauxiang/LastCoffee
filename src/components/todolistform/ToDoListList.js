import ToDoItem from "./ToDoItem";
import classes from "./ToDoList.module.css";

function ToDoListList(props) {
  return (
    <ul className={classes.list}>
      {props.events.map((event) => (
        <ToDoItem
          key={event.id}
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

export default ToDoListList;
