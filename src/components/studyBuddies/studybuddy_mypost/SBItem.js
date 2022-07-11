//import { useContext } from 'react';
import React, { useState } from "react";
import Card from "../../../action/Card";
import classes from "./SBItem.module.css";
import db from "../../../firebase";
import firebase from "firebase/app";

function SBItem(props) {
  const userUID = props.userUID;
  const posterUID = props.posterUID;

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

  //console.log("my userUID", props.userUID);
  /*
  const [ContactInfo, setContactInfo] = useState("");
  const [DisplayInfo, setDisplayInfo] = useState("");
  const [DisplayName, setDisplayName] = useState("");
  const [DisplayPicture, setDisplayPicture] = useState("");
  const [PosterContactInfo, setPosterContactInfo] = useState("");
  const [PosterDisplayInfo, setPosterDisplayInfo] = useState("");
  const [PosterDisplayName, setPosterDisplayName] = useState("");
  const [PosterDisplayPicture, setPosterDisplayPicture] = useState("");

  function renderDoc(doc) {
    setContactInfo(doc.data().Actor.contact_info);
    setDisplayInfo(doc.data().Actor.display_info);
    setDisplayName(doc.data().Actor.display_name);
    setDisplayPicture(doc.data().Actor.display_picture);
    //console.log(DisplayPicture);
  }

  const Set_values = db
    .collection("DPDB")
    .where(firebase.firestore.FieldPath.documentId(), "==", userUID)
    .get()
    .then((snapshot) =>
      snapshot.docs.forEach(
        //(doc) => console.log(doc.data()),
        (doc) => {
          renderDoc(doc);
        }
      )
    );

  function renderPosterDoc(doc) {
    setPosterContactInfo(doc.data().Actor.contact_info);
    setPosterDisplayInfo(doc.data().Actor.display_info);
    setPosterDisplayName(doc.data().Actor.display_name);
    setPosterDisplayPicture(doc.data().Actor.display_picture);
    //console.log(DisplayPicture);
  }

  const Set_postervalues = db
    .collection("DPDB")
    .where(firebase.firestore.FieldPath.documentId(), "==", posterUID)
    .get()
    .then((snapshot) =>
      snapshot.docs.forEach(
        //(doc) => console.log(doc.data()),
        (doc) => {
          renderPosterDoc(doc);
        }
      )
    );

  function addRequest() {
    console.log("changed");
    // need to define a function so that they wont be spammed
    db.collection("SBDB").add({
      Actor: {
        display_name: DisplayName,
        contact_info: ContactInfo,
        display_picture: DisplayPicture,
        display_info: DisplayInfo,
      },
      // states of acceptance:
      // "new" - have not accepted nor rejected
      // "accepted" - accepted
      // "rejected" - rejected
      accepted: "new",
      posterUID: posterUID,
      timestamp: Firebase.firestore.Timestamp.now(),
    });
  }
  */
  //console.log(props.info);

  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.content}>
          <h2>{DisplayName}</h2>
          <h3>Info: {props.info}</h3>
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
          Preferred course / modules: {props.subjects}
        </div>
      </Card>
    </li>
  );
}

export default SBItem;
