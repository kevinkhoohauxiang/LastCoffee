import ToDoItemDone from "./ToDoItemDone";
import classes from "./ToDoList.module.css";

function ToDoListListDone(props) {
  return (
    <ul className={classes.list}>
      {props.events.map((event) => (
        <ToDoItemDone
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

export default ToDoListListDone;
