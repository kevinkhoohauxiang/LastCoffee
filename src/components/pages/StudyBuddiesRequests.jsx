import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import styled from "styled-components";
import Header from "../header/components/Header";
import db from "../../firebase";
import SBRequestList from "../studyBuddies/studybuddy_requests/SBRequestList";
import MainSBreq from "../studyBuddies/MainSBreq";

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

//home page upon signing in
function StudyBuddiesRequests(props) {
  const userUID = props.user.uid;
  const [LoadedRequests, setLoadedRequests] = useState([]);
  const [IsLoading, setLoading] = useState(false);
  //console.log(LoadedRequests);
  //console.log(userUID);

  //we first query out the entries that have posterUID == userUID

  useEffect(() => {
    db.collection("SBDB")
      .get()
      .then((snapshot) => {
        const myRequests = [];
        snapshot.docs.forEach(
          //(doc) => console.log(doc.data()),
          (doc) => {
            const SB = {
              id: doc.id,
              ...doc.data(),
            };
            //console.log(doc.data().posterUID);
            //console.log(userUID);
            //console.log(doc.data());
            if (
              // we fetch and show only "new" requests
              doc.data().posterUID === userUID &&
              doc.data().Accepted === "new"
            ) {
              myRequests.push(SB);
              //console.log(mySBPost);
            }
          }
        );
        setLoading(false);
        setLoadedRequests(myRequests);
        myRequests.sort(function (x, y) {
          return y.timestamp.seconds - x.timestamp.seconds;
        });
      });
  }, []);

  return (
    <Container>
      <Header />
      {!props.user && <Redirect to="/" />}

      <MainSBreq />
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};

export default connect(mapStateToProps)(StudyBuddiesRequests);
