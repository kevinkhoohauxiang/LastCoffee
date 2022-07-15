import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import db from "../../firebase";
import styled from "styled-components";
import Header from "../header/components/Header";
import MySBList from "../studyBuddies/mystudybuddies/MySBList";

const Container = styled.div`
  max-width: 100%;
`;

//home page upon signing in
function MyStudyBuddies(props) {
  const userUID = props.user.uid;
  const [LoadedRequests, setLoadedRequests] = useState([]);
  const [IsLoading, setIsLoading] = useState(false);
  //console.log(LoadedRequests);
  //console.log(userUID);

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
              doc.data().posterUID == userUID &&
              doc.data().Accepted == "accepted"
            ) {
              myRequests.push(SB);
              //console.log(mySBPost);
            }
          }
        );
        setIsLoading(false);
        setLoadedRequests(myRequests);
        myRequests.sort(function (x, y) {
          return y.timestamp.seconds - x.timestamp.seconds;
        });
        //console.log(myRequests);
      });
  }, []);
  return (
    <Container>
      <Header />
      {!props.user && <Redirect to="/" />}

      <MySBList events={LoadedRequests} userUID={userUID} />
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};

export default connect(mapStateToProps)(MyStudyBuddies);
