//import { useContext } from 'react';
import React from "react";
import Card from "../../../action/Card";
import classes from "./SBItem.module.css";
import db from "../../../firebase";

import Firebase from "firebase";

function SBRequestItem(props) {
  function changeAccept() {
    db.collection("SBDB").doc(props.id).update({
      Accepted: "accepted",
      accepted_timestamp: Firebase.firestore.Timestamp.now(),
    });
  }
  function changeReject() {
    db.collection("SBDB").doc(props.id).update({
      Accepted: "rejected",
      accepted_timestamp: Firebase.firestore.Timestamp.now(),
    });
  }
  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.content}>
          <h3>{props.actor_display_name}</h3>
          <h3>Info: {props.actor_display_info}</h3>
          <br />
          <br />
          <img src="/images/Acceptbtn1.svg" alt="" onClick={changeAccept} />
          <img src="/images/Rejectbtn1.svg" alt="" onClick={changeReject} />
        </div>
      </Card>
    </li>
  );
}

export default SBRequestItem;
