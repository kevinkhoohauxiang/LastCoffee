import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import styled from "styled-components";
import Header from "../header/components/Header";
import { Link } from "react-router-dom";
import NewSBPage from "../studyBuddies/studybuddy_form/NewSBPage";
import db from "../../firebase";
import firebase from "firebase/app";

// import { compose, withState, withHandlers } from 'recompose';
// need to npm install recompose

const Container = styled.div`
  max-width: 100%;
`;

const Content = styled.div`
  max-width: 1128px;
  margin: auto;
`;

const Section = styled.section`
  min-height: 50px;
  margin: 16px 0 -30px;
  box-sizing: content-box;
  text-align: center;
  text-decoration: underline;
  display: flex;
  justify-content: center;
  h5 {
    color: #0a66c2;
    font-size: 14px;
    margin-block-start: 0;
    margin-block-end: 0;
    a {
      font-weight: 700;
    }
  }
  p {
    font-size: 14px;
    color: #434649;
    margin-block-start: 0;
    margin-block-end: 0;
    font-weight: 600;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 0 5px;
    margin: 16px 0;
  }
`;

const Layout = styled.div`
  display: grid;
  grid-template-areas: "left main right";
  grid-template-columns: minmax(0, 5fr) minmax(0, 12fr) minmax(300px, 7fr);
  column-gap: 25px;
  row-gap: 25px;
  margin: 25px 0;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    padding: 0 5px;
  }
`;

const NewForm = styled.section`
  margin-bottom: 0.5rem;
  input,
  textarea {
    display: block;
    font: inherit;
    border-radius: 4px;
    border: 1px solid #ccc;
    padding: 0.25rem;
    width: 100%;
  }
`;

//home page upon signing in
function NewSB(props) {
  const userUID = props.user.uid;
  const [Actor, setActor] = useState(null);

  // get actor, pass to new calendar form
  const Set_values = db
    .collection("DPDB")
    .where(firebase.firestore.FieldPath.documentId(), "==", userUID)
    .get()
    .then((snapshot) =>
      snapshot.docs.forEach(
        //(doc) => console.log(doc.data()),
        (doc) => {
          setActor(doc.data());
        }
      )
    );

  const [newEvent, setNewEvent] = useState({
    userUID: "",
    myInfo: "",
    description: "",
    numberBuddies: "",
    locations: "",
    timings: "",
    course: "",
    gender: "",
  });

  return (
    <Container>
      <Header />
      {!props.user && <Redirect to="/" />}
      <Content>
        <NewForm>
          <Link to="/findstudybuddy">
            <a href="/findstudybuddy">
              <img src="/images/Backbtn1.svg" alt="" />
            </a>
          </Link>
        </NewForm>
        <NewSBPage userUID={userUID} />
      </Content>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};

export default connect(mapStateToProps)(NewSB);
