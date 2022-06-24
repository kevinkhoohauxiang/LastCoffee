import ToDoItem from './ToDoItem';
import classes from './ToDoList.module.css';

function ToDoListList(props) {
  return (
    <ul className={classes.list}>
      {props.events.map((event) => (
        <ToDoItem
          key={event.id}
          id={event.id}
          image={event.image}
          title={event.title}
          address={event.address}
          description={event.description}
        />
      ))}
    </ul>
  );
}

export default ToDoListList;
