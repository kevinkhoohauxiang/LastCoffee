//import { useContext } from 'react';
import React, { useState } from "react";
import Card from "../../../action/Card";
import classes from "./SBItem.module.css";
import db from "../../../firebase";
import firebase from "firebase";
import Firebase from "firebase";

function SBRequestItem(props) {
  const ActorUID = props.actor_userUID;
  const PosterUID = props.posterUID;
  const [ContactInfo, setContactInfo] = useState("");
  const [DisplayInfo, setDisplayInfo] = useState("");
  const [DisplayName, setDisplayName] = useState("");
  const [DisplayPicture, setDisplayPicture] = useState("");

  function renderDoc(doc) {
    setContactInfo(doc.data().Actor.contact_info);
    setDisplayInfo(doc.data().Actor.display_info);
    setDisplayName(doc.data().Actor.display_name);
    setDisplayPicture(doc.data().Actor.display_picture);
  }

  const Set_values = db
    .collection("DPDB")
    .where(firebase.firestore.FieldPath.documentId(), "==", PosterUID)
    .get()
    .then((snapshot) =>
      snapshot.docs.forEach(
        //(doc) => console.log(doc.data()),
        (doc) => {
          renderDoc(doc);
        }
      )
    );

  function changeAccept() {
    db.collection("SBDB").doc(props.id).update({
      accepted_timestamp: Firebase.firestore.Timestamp.now(),
      Accepted: "accepted",
    });
    //logic: we add a corresponding "accepted" entry for the switched userUIDs

    db.collection("SBDB")
      .doc(ActorUID + PosterUID)
      .set({
        Actor: {
          userUID: PosterUID,
          display_name: DisplayName,
          contact_info: ContactInfo,
          display_picture: DisplayPicture,
          display_info: DisplayInfo,
        },
        posterUID: ActorUID,
        Accepted: "accepted",
        sent_timestamp: props.sent_timestamp,
        accepted_timestamp: Firebase.firestore.Timestamp.now(),
        accepter: true,
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
