import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import styled from "styled-components";
import Left from "./Left";
import Main from "./Main";
import Header from "./Header";
import Card from "./calendarform/Card";
import classes from "./calendarform/CalendarItem.module.css";
import db from "../firebase";
import SBRequestList from "./studybuddyrequests/SBRequestList";
import { loadingButtonClasses } from "@mui/lab";

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

const WLbuttons = styled.div`
  button {
    border: 0.0625rem solid rgb(17, 109, 255);
    background-color: rgb(17, 109, 255);
    border-radius: 1.875rem;
    font-family: var(--main-text-font);
    width: 20rem;
    height: 3.5rem;
    cursor: pointer;
    color: #ffffff;
    font-size: 1.5rem;
    font-weight: 300;
    margin-top: 2rem;
    align-items: center;
    margin-right: 20px;
    margin-left: 20px;
  }
`;

//home page upon signing in
function StudyBuddiesRequests(props) {
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
            console.log(doc.data().posterUID);
            console.log(userUID);
            //console.log(doc.data());
            if (
              // we fetch and show only "new" requests
              doc.data().posterUID == userUID &&
              doc.data().Accepted == "new"
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
      <Content>
        <Section>
          <h5>
            <a>THIS IS STUDY BUDDIES REQUESTS</a>
          </h5>
        </Section>
        {
          // Need to have the notifications pop up here, copy facebook friend requests
        }
      </Content>

      <SBRequestList events={LoadedRequests} userUID={userUID} />
      {/*
        <Card>
          <div className={classes.content}>
            <h3>Wendy has sent you a request to be a study buddy!</h3>
            <br />
            <h3>Info: Y2 CS student</h3>

            <WLbuttons>
              <button>Accept</button>
              <button>Reject</button>
            </WLbuttons>
          </div>
        </Card>
      */}
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};

export default connect(mapStateToProps)(StudyBuddiesRequests);
