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
      if (days === 1) {
        return `~ 1 day ago`;
      } else {
        return `~ ${days} days ago`;
      }
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

  if (props.accepter === true) {
    return (
      <li className={classes.item}>
        <Card>
          <div className={classes.content}>
            <h3>
              {props.actor_display_name} accepted your request to be a study
              buddy!
            </h3>
            <h3>Info: {props.actor_display_info}</h3>
            <br />
            <br />
            {secondsToString(time)}
          </div>
        </Card>
      </li>
    );
  } else {
    return (
      <li className={classes.item}>
        <Card>
          <div className={classes.content}>
            <h3>{props.actor_display_name} is now your study buddy!</h3>
            <h3>Info: {props.actor_display_info}</h3>
            <br />
            <br />
            {secondsToString(time)}
          </div>
        </Card>
      </li>
    );
  }
}

export default SBNotificationsItem;
