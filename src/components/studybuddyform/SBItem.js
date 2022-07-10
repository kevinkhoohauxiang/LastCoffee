//import { useContext } from 'react';
import React, { useState } from "react";
import Card from "./Card";
import classes from "./SBItem.module.css";
import db from "../../firebase";
import firebase from "firebase/app";
import Firebase from "firebase";

function SBItem(props) {
  const userUID = props.userUID;
  const posterUID = props.posterUID;
  //console.log("my userUID", props.userUID);
  const [ContactInfo, setContactInfo] = useState("");
  const [DisplayInfo, setDisplayInfo] = useState("");
  const [DisplayName, setDisplayName] = useState("");
  const [DisplayPicture, setDisplayPicture] = useState("");
  const [PosterContactInfo, setPosterContactInfo] = useState("");
  const [PosterDisplayInfo, setPosterDisplayInfo] = useState("");
  const [PosterDisplayName, setPosterDisplayName] = useState("");
  const [PosterDisplayPicture, setPosterDisplayPicture] = useState("");
  const [AcceptanceState, setAcceptanceState] = useState(null);

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

  /*
  const checkState = () => {
    db.collection("SB Posts")
      .where(firebase.firestore.FieldPath.documentId(), "==", props.id)
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          setAcceptanceState(doc.data().Accepted);
        });
      });
  };
  */

  function addRequest() {
    //console.log(userUID + posterUID);
    //we create a document id that is made up of
    //firstly, the userUID of the user who posted the request,
    //secondly, the userUID of the user who sent the request

    //we need to define an if else statement. if props.Accepted == "accepted",
    //we dont submit a new request to the db

    db.collection("SBDB")
      .doc(posterUID + userUID)
      .set({
        Actor: {
          userUID: userUID,
          display_name: DisplayName,
          contact_info: ContactInfo,
          display_picture: DisplayPicture,
          display_info: DisplayInfo,
        },
        // states of acceptance:
        // "new" - have not accepted nor rejected
        // "accepted" - accepted
        // "rejected" - rejected
        Accepted: "new",
        posterUID: posterUID,
        timestamp: Firebase.firestore.Timestamp.now(),
      });
  }

  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.content}>
          <h2>{PosterDisplayName}</h2>
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
        <button onClick={addRequest}>Send Request!!!</button>
      </Card>
    </li>
  );
}

export default SBItem;
