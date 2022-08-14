import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import styled from "styled-components";
import db from "../../firebase";
import Header from "../header/components/Header";
import SBNotificationsList from "../studyBuddies/studybuddy_notifications/SBNotificationsList";

const Container = styled.div`
  max-width: 100%;
`;

//home page upon signing in
function StudyBuddyNotifications(props) {
  const userUID = props.user.uid;
  const [LoadedRequests, setLoadedRequests] = useState([]);
  const [IsLoading, setIsLoading] = useState(false);

  //we first query out the entries that have posterUID == userUID

  useEffect(() => {
    setIsLoading(true);
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
              doc.data().Poster.userUID === userUID &&
              doc.data().Accepted === "accepted"
            ) {
              myRequests.push(SB);
              //console.log(mySBPost);
            }
          }
        );
        //console.log(myRequests);
        myRequests.sort(function (x, y) {
          return y.accepted_timestamp.seconds - x.accepted_timestamp.seconds;
        });
        setIsLoading(false);
        setLoadedRequests(myRequests);

        //console.log(myRequests);
      });
  }, []);

  return (
    <Container>
      <Header />
      {!props.user && <Redirect to="/" />}

      <SBNotificationsList events={LoadedRequests} userUID={userUID} />
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};

export default connect(mapStateToProps)(StudyBuddyNotifications);
