//import { useContext } from 'react';
import React, { useEffect, useState } from "react";
import Card from "../../../action/Card";
import classes from "./SBItem.module.css";
import styled from "styled-components";
import db from "../../../firebase";
import firebase from "firebase/app";
import Firebase from "firebase";
import Home from "../../pages/Home";

const SendButton = styled.div`
  img {
    cursor: pointer;
  }
`;

function SBItem(props) {
  const userUID = props.userUID;
  const posterUID = props.posterUID;
  const newDocUID = posterUID + userUID;
  const [ContactInfo, setContactInfo] = useState("");
  const [DisplayInfo, setDisplayInfo] = useState("");
  const [DisplayName, setDisplayName] = useState("");
  const [DisplayPicture, setDisplayPicture] = useState("");
  const [PosterContactInfo, setPosterContactInfo] = useState("");
  const [PosterDisplayInfo, setPosterDisplayInfo] = useState("");
  const [PosterDisplayName, setPosterDisplayName] = useState("");
  const [PosterDisplayPicture, setPosterDisplayPicture] = useState("");
  //const [AcceptanceState, setAcceptanceState] = useState("");
  var AcceptanceState = "";

  function renderDoc(doc) {
    setContactInfo(doc.data().Actor.contact_info);
    setDisplayInfo(doc.data().Actor.display_info);
    setDisplayName(doc.data().Actor.display_name);
    setDisplayPicture(doc.data().Actor.display_picture);
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

  useEffect(() => {
    db.collection("SBDB")
      .where(firebase.firestore.FieldPath.documentId(), "==", newDocUID)
      .get()
      .then((snapshot) =>
        snapshot.docs.forEach(
          //(doc) => console.log(doc.data()),
          (doc) => {
            //setAcceptanceState(doc.data().Accepted);
            AcceptanceState = doc.data().Accepted;
            console.log(doc.data());
          }
        )
      );
  });

  function AddRequest() {
    if (AcceptanceState == "accepted") {
      return;
    } else if (AcceptanceState != "accepted") {
      db.collection("SBDB")
        .doc(newDocUID)
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
          Poster: {
            userUID: posterUID,
            display_name: PosterDisplayName,
            contact_info: PosterContactInfo,
            display_picture: PosterDisplayPicture,
            display_info: PosterDisplayInfo,
          },
          sent_timestamp: Firebase.firestore.Timestamp.now(),
          accepted_timestamp: Firebase.firestore.Timestamp.now(),
          accepter: false,
        });
    }
  }

  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.content}>
          <h3>{PosterDisplayName}</h3>
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

        <SendButton>
          <img src="/images/Sendbtn1.svg" alt="" onClick={AddRequest} />
        </SendButton>
      </Card>
    </li>
  );
}

export default SBItem;
