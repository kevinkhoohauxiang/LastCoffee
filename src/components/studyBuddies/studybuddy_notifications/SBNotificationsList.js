import SBNotificationsItem from "./SBNotificationsItem";
import classes from "./SBList.module.css";

function SBNotificationsList(props) {
  if (props.events.length === 0) {
    //console.log(props.events.length);
    return (
      <h1>
        <br />
        You do not have any notifications for now!
        <br />
        <br />
      </h1>
    );
  } else {
    return (
      <ul className={classes.list}>
        {props.events.map((event) => (
          // if (event.Accepted == "new") {
          <SBNotificationsItem
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
            sent_timestamp={event.sent_timestamp}
            accepted_timestamp={event.accepted_timestamp}
          />
        ))}
      </ul>
    );
  }
}

export default SBNotificationsList;
