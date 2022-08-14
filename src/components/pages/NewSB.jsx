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
