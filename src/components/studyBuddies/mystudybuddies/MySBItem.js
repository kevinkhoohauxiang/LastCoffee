//import { useContext } from 'react';
import React, { useState } from "react";
import classes from "./SBItem.module.css";
import db from "../../../firebase";
import Firebase from "firebase";
import Card from "../../../action/Card";

function MySBItem(props) {
  const ActorUID = props.actor_userUID;
  const PosterUID = props.posterUID;
  const UID1 = ActorUID + PosterUID;
  const UID2 = PosterUID + ActorUID;

  function deleteRequest() {
    db.collection("SBDB").doc(UID1).update({
      Accepted: "booo",
      accepted_timestamp: Firebase.firestore.Timestamp.now(),
    });
    db.collection("SBDB").doc(UID2).update({
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
          <img src="/images/Deletebtn1.svg" alt="" onClick={deleteRequest} />
          <br />
        </div>
      </Card>
    </li>
  );
}

export default MySBItem;
