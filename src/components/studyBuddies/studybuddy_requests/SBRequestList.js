import SBRequestItem from "./SBRequestItem";
import classes from "./SBList.module.css";
import { Link } from "react-router-dom";

function SBRequestList(props) {
  if (props.events.length === 0) {
    //console.log(props.events.length);
    return (
      <div>
        <h1>
          <br />
          You have not added any Requests for now!
          <br />
          <br />
          Let's go find more Study Buddies :D
          <br />
        </h1>
        <Link to="/findstudybuddy">
          <a href="/findstudybuddy">
            <img src="/images/Postbtn1.svg" alt="" />
          </a>
        </Link>
      </div>
    );
  } else {
    return (
      <ul className={classes.list}>
        {props.events.map((event) => (
          // if (event.Accepted s== "new") {
          <SBRequestItem
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

export default SBRequestList;
