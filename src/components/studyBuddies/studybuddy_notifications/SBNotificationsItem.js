import React from "react";
import Card from "../../../action/Card";
import classes from "./SBItem.module.css";
import Firebase from "firebase";

function SBNotificationsItem(props) {
  const currTime = Firebase.firestore.Timestamp.now().seconds;
  const acceptedTime = props.accepted_timestamp.seconds;
  const time = currTime - acceptedTime;

  function secondsToString(time) {
    const days = Math.floor(time / 86400);
    const hours = Math.floor(time / 3600);
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time);
    if (days !== 0) {
      return `~ ${days} days ago`;
    } else if (hours !== 0) {
      const newMins = Math.floor((time - hours * 3600) / 60);
      if (hours === 1 && newMins !== 0) {
        return `~ ${hours} hour, ${newMins} mins ago`;
      } else if (hours === 1 && newMins === 0) {
        return `~ ${hours} hour ago`;
      } else if (newMins === 0) {
        return `~ ${hours} hours ago`;
      } else {
        return `~ ${hours} hours, ${newMins} mins ago`;
      }
    } else if (mins !== 0) {
      const newSeconds = time - mins * 60;
      if (mins === 1 && newSeconds !== 0) {
        return `~ ${mins} min, ${newSeconds} seconds ago`;
      } else if (mins === 1 && newSeconds === 0) {
        return `~ ${mins} min ago`;
      } else if (newSeconds === 0) {
        return `~ ${mins} mins ago`;
      } else {
        return `~ ${mins} mins, ${newSeconds} seconds ago`;
      }
    } else {
      return `~${secs} seconds ago`;
    }
  }

  //console.log(props.id);

  /* key={event.id}
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
          */

  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.content}>
          <h3>
            {props.actor_display_name} accepted your request to be a study
            buddy!
          </h3>
          <h3>Info: {props.actor_display_info}</h3>
          <h3>Contact Info: {props.actor_contact_info}</h3>
          <br />
          <br />
          {secondsToString(time)}
        </div>
      </Card>
    </li>
  );
}

export default SBNotificationsItem;
