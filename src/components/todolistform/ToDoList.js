import ToDoItem from './ToDoItem';
import classes from './ToDoList.module.css';

function ToDoList(props) {
  return (
    <ul className={classes.list}>
      {props.meetups.map((meetup) => (
        <ToDoItem
          key={meetup.id}
          id={meetup.id}
          image={meetup.image}
          title={meetup.title}
          address={meetup.address}
          description={meetup.description}
        />
      ))}
    </ul>
  );
}

export default ToDoList;
