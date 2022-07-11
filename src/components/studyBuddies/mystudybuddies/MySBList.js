import MySBItem from "./MySBItem";
import classes from "./SBList.module.css";

function MySBList(props) {
  return (
    <ul className={classes.list}>
      {props.events.map((event) => (
        // if (event.Accepted == "new") {
        <MySBItem
          key={event.id}
          // *bug solved* note: userUID not passed into the db
          userUID={props.userUID}
          id={event.id}
          posterUID={event.posterUID}
          accepted={event.Accepted}
          actor_contact_info={event.Actor.contact_info}
          actor_display_info={event.Actor.display_info}
          actor_display_name={event.Actor.display_name}
          actor_display_picture={event.Actor.display_picture}
          actor_userUID={event.Actor.userUID}
          timestamp={event.timestamp}
        />
      ))}
    </ul>
  );
}

export default MySBList;
