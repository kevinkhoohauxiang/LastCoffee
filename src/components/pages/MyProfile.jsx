import React, { useState, useRef } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Left from "./Left";
import Header from "../header/components/Header";
import db from "../../firebase";
import Card from "../../action/Card";
import firebase from "firebase/app";

const Container = styled.div`
  max-width: 100%;
`;

const Content = styled.div`
  max-width: 1128px;
  margin: auto;
`;

const Portrait = styled.div`
  img {
    margin-top: 5px;
    width: 830px;
    border-radius: 100px;
    float: left;
    margin-right: 10px;
    object-fit: cover;
  }
`;

function MyProfile(props) {
  const userUID = props.user.uid;
  const [ContactInfo, setContactInfo] = useState("");
  const [DisplayInfo, setDisplayInfo] = useState("");
  const [DisplayName, setDisplayName] = useState("");
  const [DisplayPicture, setDisplayPicture] = useState("");
  const [Gender, setGender] = useState("");
  const [Faculty, setFaculty] = useState("");
  const [Year, setYear] = useState("");

  function renderDoc(doc) {
    setContactInfo(doc.data().Actor.contact_info);
    setDisplayInfo(doc.data().Actor.display_info);
    setDisplayName(doc.data().Actor.display_name);
    setDisplayPicture(doc.data().Actor.display_picture);
    setGender(doc.data().Actor.gender);
    setFaculty(doc.data().Actor.faculty);
    setYear(doc.data().Actor.year);

    //console.log(DisplayPicture);
  }

  const Set_Values = db
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

  return (
    <Container>
      <Header />
      {!props.user && <Redirect to="/" />}
      <Content>
        <Left />

        <Card>
          <Portrait>
            <h1>{DisplayName}</h1>
            <h2>{Faculty}</h2>
            <br />

            <h2>{DisplayInfo}</h2>
          </Portrait>
        </Card>

        <Link to="/editprofile">
          <a href="/editprofile">
            <img src="/images/EditProfilebtn1.svg" alt="" />
          </a>
        </Link>
      </Content>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};

export default connect(mapStateToProps)(MyProfile);
