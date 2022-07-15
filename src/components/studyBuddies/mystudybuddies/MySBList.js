import MySBItem from "./MySBItem";
import classes from "./SBList.module.css";
import { Link } from "react-router-dom";

function MySBList(props) {
  if (props.events.length === 0) {
    return (
      <div>
        <h1>
          <br />
          You have not added any Study Buddies!
          <br />
          <br />
          Let's add your first Study Buddy :D
          <br />
          Post a request now!!
        </h1>
        <Link to="/findnewsb">
          <a href="/findnewsb">
            <img src="/images/Postbtn1.svg" alt="" />
          </a>
        </Link>
      </div>
    );
  } else {
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
}

export default MySBList;
