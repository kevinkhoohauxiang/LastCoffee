//import { useContext } from 'react';
import React, { useState } from "react";
import Card from "./Card";
import classes from "./SBItem.module.css";
import db from "../../firebase";
import firebase from "firebase/app";
import Firebase from "firebase";

function MySBItem(props) {
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
  function deleteRequest() {
    db.collection("SBDB").doc(props.id).update({
      Accepted: "booo",
      accepted_timestamp: Firebase.firestore.Timestamp.now(),
    });
  }

  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.content}>
          <h3>{props.actor_display_name}</h3>
          <h3>Info: {props.actor_display_info}</h3>
          Contact Info: {props.actor_contact_info}
          <br />
          <button onClick={deleteRequest}>Remove study buddy</button>
          <br />
        </div>
      </Card>
    </li>
  );
}

export default MySBItem;
