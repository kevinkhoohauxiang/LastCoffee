import React, { useState } from "react";
import Card from "../../../action/Card";
import classes from "./SBItem.module.css";
import db from "../../../firebase";
import firebase from "firebase/app";

function SBItem(props) {
  const userUID = props.userUID;
  const [DisplayName, setDisplayName] = useState("");

  const Set_values = db
    .collection("DPDB")
    .where(firebase.firestore.FieldPath.documentId(), "==", userUID)
    .get()
    .then((snapshot) =>
      snapshot.docs.forEach(
        //(doc) => console.log(doc.data()),
        (doc) => {
          setDisplayName(doc.data().Actor.display_name);
        }
      )
    );

  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.content}>
          <h3>{DisplayName}</h3>
          <h3>{props.info}</h3>
          <br />
          {props.description}
          <br />
          <br />
          Preferred number of study buddies: {props.number}
          <br />
          Preferred studying locations: {props.location}
          <br />
          Preferred study timings: {props.timing}
          <br />
          Preferred gender: {props.gender}
          <br />
          Preferred faculty: {props.subjects}
        </div>
      </Card>
    </li>
  );
}

export default SBItem;
